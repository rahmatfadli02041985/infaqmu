// =====================================================================
// LOGIKA BUKU KAS, CARRY-OVER SALDO, & SINKRONISASI SUPABASE (js/ledger.js)
// =====================================================================

function getRealtimePeriods() {
    const now = new Date();
    const curYear = String(now.getFullYear());
    const curMonthNum = now.getMonth() + 1;
    const curMonth = String(curMonthNum).padStart(2, '0');

    let prevYearNum = now.getFullYear();
    let prevMonthNum = curMonthNum - 1;
    if (prevMonthNum === 0) {
        prevMonthNum = 12;
        prevYearNum -= 1;
    }
    const prevYear = String(prevYearNum);
    const prevMonth = String(prevMonthNum).padStart(2, '0');

    return {
        current: { year: curYear, month: curMonth, key: `${curYear}-${curMonth}` },
        previous: { year: prevYear, month: prevMonth, key: `${prevYear}-${prevMonth}` }
    };
}

function isValidSupabaseKey(token) {
    return typeof token === 'string' && token.trim().length >= 10;
}

function sanitizeSupabaseUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    let cleaned = rawUrl.trim().replace(/\/+$/, '');
    // Bersihkan jika pengguna tidak sengaja menempelkan path /rest/v1 atau /rest/v1/
    cleaned = cleaned.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
    return cleaned;
}

function initSupabaseCredentials() {
    let savedCreds = null;
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.SB_CONFIG);
        if (raw) savedCreds = JSON.parse(raw);
    } catch (e) {}

    const rawUrl = (savedCreds && typeof savedCreds.url === 'string' && savedCreds.url.trim())
        ? savedCreds.url.trim()
        : DEFAULT_SUPABASE_URL.trim();
    const key = (savedCreds && typeof savedCreds.key === 'string' && savedCreds.key.trim())
        ? savedCreds.key.trim()
        : DEFAULT_SUPABASE_KEY.trim();

    sbCredentials = { url: sanitizeSupabaseUrl(rawUrl), key };

    if (sbCredentials.url && sbCredentials.key && window.supabase && isValidSupabaseKey(sbCredentials.key)) {
        try {
            supabaseClient = window.supabase.createClient(sbCredentials.url, sbCredentials.key);
        } catch (e) {
            supabaseClient = null;
        }
    } else {
        supabaseClient = null;
    }
}

// Fetch helper ke Supabase REST API dengan toleransi timeout lebih tinggi & auto-retry cerdas
async function supabaseRestFetch(path, options = {}, retries = 2) {
    if (!sbCredentials.url || !sbCredentials.key) throw new Error('Kredensial Supabase kosong');

    const timeoutMs = options.timeout || 12000; // 12 detik default agar tahan di jaringan seluler/lambat

    const headers = {
        'apikey': sbCredentials.key,
        'Authorization': `Bearer ${sbCredentials.key}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    let lastError = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const res = await fetch(`${sbCredentials.url}/rest/v1/${path}`, {
                method: options.method || 'GET',
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
                signal: controller.signal
            });
            clearTimeout(timer);

            if (!res.ok) {
                const errText = await res.text();
                // Jika error 5xx dari gateway atau server Supabase cold-start, coba lagi
                if (res.status >= 500 && attempt < retries) {
                    await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
                    continue;
                }
                throw new Error(`HTTP ${res.status}: ${errText.slice(0, 120)}`);
            }

            const text = await res.text();
            return text ? JSON.parse(text) : null;
        } catch (err) {
            clearTimeout(timer);
            lastError = err;
            if (attempt < retries) {
                const backoffDelay = 600 * Math.pow(2, attempt); // 600ms, 1200ms
                await new Promise(r => setTimeout(r, backoffDelay));
            }
        }
    }

    throw lastError;
}

let autoReconnectTimer = null;
let autoReconnectAttempts = 0;

function scheduleAutoReconnect() {
    if (isCloudConnected || autoReconnectTimer) return;
    if (autoReconnectAttempts >= 6) {
        // Jika sudah 6x gagal berturut-turut, jeda 1 menit sebelum mencoba lagi
        autoReconnectTimer = setTimeout(() => {
            autoReconnectTimer = null;
            autoReconnectAttempts = 0;
            scheduleAutoReconnect();
        }, 60000);
        return;
    }

    const intervals = [3000, 6000, 12000, 20000, 30000, 60000];
    const delay = intervals[autoReconnectAttempts] || 15000;
    autoReconnectAttempts++;

    autoReconnectTimer = setTimeout(async () => {
        autoReconnectTimer = null;
        if (!isCloudConnected && (typeof navigator === 'undefined' || navigator.onLine !== false)) {
            const ok = await syncInitialData(false);
            if (ok) {
                autoReconnectAttempts = 0;
            }
        }
    }, delay);
}

// Otomatis sinkronkan ulang begitu koneksi internet browser pulih
if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
        if (!isCloudConnected) {
            autoReconnectAttempts = 0;
            syncInitialData(false).catch(() => {});
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !isCloudConnected) {
            syncInitialData(false).catch(() => {});
        }
    });
}

async function syncInitialData(showNotification = false) {
    if (!sbCredentials.url || !sbCredentials.key) {
        isCloudConnected = false;
        updateSyncStatusUI('local');
        updateDiagnosticBox('Kredensial database Cloud belum diatur.');
        return false;
    }

    updateSyncStatusUI('syncing');

    try {
        // Ambil data transaksi dan pengaturan secara paralel agar loading lebih cepat
        const [settingsResult, txResult] = await Promise.allSettled([
            supabaseRestFetch('infaq_settings?id=eq.1&select=*', { timeout: 10000 }),
            supabaseRestFetch('infaq_transactions?select=*&order=tx_date.desc,id.desc', { timeout: 15000 })
        ]);

        if (settingsResult.status === 'fulfilled' && Array.isArray(settingsResult.value) && settingsResult.value.length > 0) {
            const s = settingsResult.value[0];
            appSettings = {
                ...appSettings,
                orgName: s.org_name || appSettings.orgName,
                orgHandle: (s.org_handle || appSettings.orgHandle).replace(/^@/, ''),
                orgBio: s.org_bio || appSettings.orgBio,
                viewerPin: String(s.visitor_pin || appSettings.viewerPin),
                adminPin: String(s.admin_pin || appSettings.adminPin)
            };
        }

        if (txResult.status === 'fulfilled' && Array.isArray(txResult.value)) {
            const cloudMapped = txResult.value.map(r => ({
                id: r.id,
                type: r.type,
                category: r.category,
                title: r.title,
                description: r.description || '',
                amount: Number(r.amount) || 0,
                tx_date: r.tx_date,
                theme: r.theme || 'emerald',
                aamiin_count: Number(r.aamiin_count) || 0
            }));
            const cloudSignatures = new Set(
                cloudMapped.map(c => `${c.type}::${(c.title || '').trim().toLowerCase()}::${(c.tx_date || '').substring(0, 7)}`)
            );
            const localOnly = transactions.filter(t => {
                if (!String(t.id).startsWith('local-')) return false;
                const sig = `${t.type}::${(t.title || '').trim().toLowerCase()}::${(t.tx_date || '').substring(0, 7)}`;
                return !cloudSignatures.has(sig);
            });
            transactions = [...cloudMapped, ...localOnly];
            transactions.forEach(t => {
                if (t.type === 'news' && t.tx_date && t.tx_date <= '2026-10-31') {
                    t.category = 'Laporan Keuangan Bulanan';
                }
            });
            deduplicateMonthlyLedgerRecords();
            ensureAllMonthlyNewsPresent();
            syncWaReportsStoreFromTransactions();
        } else if (txResult.status === 'rejected') {
            throw txResult.reason;
        }

        isCloudConnected = true;
        autoReconnectAttempts = 0;
        saveLocalCache();
        applySettingsToUI();
        updateSyncStatusUI('cloud');
        updateDiagnosticBox('Terhubung ke Supabase Cloud.');

        if (currentRole) {
            populateYearFilter();
            refreshDashboard();
        }
        if (showNotification) showToast('Berhasil sinkronisasi dengan Supabase Cloud!', 'success');
        return true;
    } catch (err) {
        isCloudConnected = false;
        updateSyncStatusUI('local');
        const isTimeout = err && (err.name === 'AbortError' || (err.message && err.message.toLowerCase().includes('aborted')));
        const errDesc = isTimeout ? 'Timeout jaringan lambat' : (err.message || 'Gagal tersambung');
        updateDiagnosticBox(`Mode Lokal Aktif (${errDesc}).`);
        if (showNotification) showToast('Berjalan dalam Mode Lokal (Cloud tidak terjangkau).', 'info');

        // Jadwalkan auto-reconnect di latar belakang
        scheduleAutoReconnect();
        return false;
    }
}

function updateSyncStatusUI(state) {
    const gateBadge = document.getElementById('gate-sync-badge');
    const headerPill = document.getElementById('connection-status-pill');

    if (state === 'syncing') {
        if (gateBadge) gateBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span><span>Menyinkronkan...</span>';
        if (headerPill) headerPill.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span><span>Sinkron</span>';
    } else if (state === 'cloud') {
        if (gateBadge) gateBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>Cloud Terhubung</span>';
        if (headerPill) headerPill.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>Cloud</span>';
    } else {
        if (gateBadge) gateBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-400"></span><span>Mode Lokal</span>';
        if (headerPill) headerPill.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span><span>Lokal</span>';
    }
}

function updateDiagnosticBox(msg) {
    const el = document.getElementById('sb-diagnostic-box');
    if (el) el.textContent = msg;
}

function ensureAllMonthlyNewsPresent() {
    const periods = getRealtimePeriods();
    const defaults = getDefaultDummyData().filter(d => d.type === 'news');
    const existingIds = new Set(transactions.map(t => String(t.id)));
    const existingYearMonths = new Set(
        transactions
            .filter(t => t.type === 'news' && t.tx_date && t.tx_date.length >= 7)
            .map(t => t.tx_date.substring(0, 7))
    );

    let added = false;
    defaults.forEach(item => {
        const ym = item.tx_date.substring(0, 7);
        if (ym >= periods.current.key) return;
        if (!existingIds.has(String(item.id)) && !existingYearMonths.has(ym)) {
            transactions.push(item);
            added = true;
        }
    });
    if (added) saveLocalCache();
}

function loadLocalFallbackData() {
    try {
        const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (s) appSettings = { ...appSettings, ...JSON.parse(s) };

        const t = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        transactions = t ? JSON.parse(t) : getDefaultDummyData();

        const w = localStorage.getItem(STORAGE_KEYS.WA_REPORTS);
        const defaultReports = getDefaultWaReports();
        waReportsStore = { ...defaultReports, ...(w ? JSON.parse(w) : {}) };
        if (waReportsStore['2026-09'] && waReportsStore['2026-09'].expenses) {
            const telur = waReportsStore['2026-09'].expenses.find(e => e.name && e.name.toLowerCase().includes('telur'));
            if (telur) {
                telur.subtotal = 394000;
            }
        }

        const l = localStorage.getItem(STORAGE_KEYS.LIKED_IDS);
        if (l) likedTxIds = new Set(JSON.parse(l));

        transactions.forEach(t => {
            if (t.type === 'news' && t.tx_date && t.tx_date <= '2026-10-31') {
                t.category = 'Laporan Keuangan Bulanan';
            }
        });

        deduplicateMonthlyLedgerRecords();
        ensureAllMonthlyNewsPresent();
    } catch (e) {
        transactions = getDefaultDummyData();
        waReportsStore = getDefaultWaReports();
    }
}

function saveLocalCache() {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(appSettings));
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
        localStorage.setItem(STORAGE_KEYS.WA_REPORTS, JSON.stringify(waReportsStore));
    } catch (e) {}
}

function deduplicateMonthlyLedgerRecords() {
    const seenMonthlyKey = new Set();
    const seenNewsMonth = new Set();
    const cleaned = [];

    // Prioritaskan transaksi dari Cloud di atas data lokal, lalu ID terbaru
    const sorted = [...transactions].sort((a, b) => {
        const aIsCloud = !String(a.id).startsWith('local-') ? 1 : 0;
        const bIsCloud = !String(b.id).startsWith('local-') ? 1 : 0;
        if (aIsCloud !== bIsCloud) return bIsCloud - aIsCloud;
        return String(b.id).localeCompare(String(a.id));
    });

    for (const tx of sorted) {
        if (!tx.tx_date) {
            cleaned.push(tx);
            continue;
        }
        const ym = tx.tx_date.substring(0, 7);
        const titleNorm = (tx.title || '').trim().toLowerCase();

        if (tx.type === 'in' || tx.type === 'out') {
            if (titleNorm.includes('penerimaan infaq bulan') || titleNorm.includes('belanja sembako') || titleNorm.includes('kaleng infaqmu') || titleNorm.includes('laporan & penyaluran')) {
                const key = `${ym}-${tx.type}`;
                if (seenMonthlyKey.has(key)) continue;
                seenMonthlyKey.add(key);
            }
        } else if (tx.type === 'news') {
            // Setiap bulan hanya ada tepat 1 postingan berita (jika ada 2 atau lebih, simpan satu dan hapus yang lain)
            if (seenNewsMonth.has(ym)) {
                continue;
            }
            seenNewsMonth.add(ym);
        }
        cleaned.push(tx);
    }

    const changed = cleaned.length !== transactions.length;
    transactions = cleaned;
    if (changed) saveLocalCache();
}

function syncWaReportsStoreFromTransactions() {
    const monthsSet = new Set();
    transactions.forEach(t => {
        if ((t.type === 'in' || t.type === 'out') && t.tx_date && t.tx_date.length >= 7) {
            monthsSet.add(t.tx_date.substring(0, 7));
        }
    });

    monthsSet.forEach(ym => {
        if (!waReportsStore[ym]) {
            const [y, m] = ym.split('-');
            const inTx = transactions.find(t => t.type === 'in' && t.tx_date && t.tx_date.startsWith(ym));
            const outTx = transactions.find(t => t.type === 'out' && t.tx_date && t.tx_date.startsWith(ym));
            if (inTx || outTx) {
                const { pureIn, carryOver } = inTx ? extractCarryOverAndPureIncome(inTx) : { pureIn: 0, carryOver: 0 };
                const prevInfo = getPreviousMonthInfo(y, m);
                waReportsStore[ym] = {
                    month: m,
                    year: y,
                    incomes: [{ name: inTx?.category || 'Kaleng Infaqmu', breakdown: formatIndoDots(pureIn) }],
                    prevLabel: `Sisa saldo bulan ${prevInfo.prevMonthName}`,
                    prevAmount: carryOver,
                    expenseGroupTitle: outTx?.category || 'Belanja sembako',
                    expenses: outTx ? [{ name: outTx.title || 'Penyaluran', qty: 1, unit: 'paket', price: Number(outTx.amount) || 0 }] : []
                };
            }
        }
    });
}

function getPreviousMonthInfo(yearStr, monthStr) {
    let y = parseInt(yearStr, 10);
    let m = parseInt(monthStr, 10);
    if (m === 1) {
        m = 12;
        y -= 1;
    } else {
        m -= 1;
    }
    const prevMonthStr = String(m).padStart(2, '0');
    const prevYearStr = String(y);
    const prevMonthName = MONTH_NAMES[m - 1] || 'Sebelumnya';
    return {
        prevYear: prevYearStr,
        prevMonth: prevMonthStr,
        prevKey: `${prevYearStr}-${prevMonthStr}`,
        prevMonthName
    };
}

function extractCarryOverAndPureIncome(tx) {
    const amount = Number(tx.amount) || 0;
    if (tx.type !== 'in') return { pureIn: 0, carryOver: 0 };

    const desc = tx.description || '';
    const carryMatch = desc.match(/sisa\s+saldo[^=]*=\s*(?:rp\.?\s*)?([0-9.]+)/i);
    if (carryMatch) {
        const carryVal = parseIndoNumber(carryMatch[1]);
        if (carryVal >= 0 && carryVal <= amount) {
            return { pureIn: amount - carryVal, carryOver: carryVal };
        }
    }
    return { pureIn: amount, carryOver: 0 };
}

function computeMonthlyLedgerBreakdown(includeLiveDraft = true) {
    const periodKeys = new Set();

    Object.keys(waReportsStore).forEach(k => {
        if (/^\d{4}-\d{2}$/.test(k)) periodKeys.add(k);
    });
    transactions.forEach(t => {
        if ((t.type === 'in' || t.type === 'out') && t.tx_date && t.tx_date.length >= 7) {
            periodKeys.add(t.tx_date.substring(0, 7));
        }
    });

    const liveDraftKey = (includeLiveDraft && waFormState && waFormState.year && waFormState.month)
        ? `${waFormState.year}-${waFormState.month}`
        : null;
    if (liveDraftKey) {
        periodKeys.add(liveDraftKey);
    }

    const sortedKeys = Array.from(periodKeys).sort();
    const monthlyMap = {};
    let runningBalance = 0;
    let hasInitializedFirstBalance = false;
    let initialSeedCarryOver = 0;
    let totalPureInAll = 0;
    let totalOutAll = 0;

    sortedKeys.forEach(ym => {
        let openingBalance = 0;
        let pureIncome = 0;
        let expense = 0;

        const report = (liveDraftKey === ym) ? waFormState : waReportsStore[ym];
        const monthInTxs = transactions.filter(t => t.type === 'in' && t.tx_date && t.tx_date.startsWith(ym));
        const monthOutTxs = transactions.filter(t => t.type === 'out' && t.tx_date && t.tx_date.startsWith(ym));

        if (report) {
            pureIncome = (report.incomes || []).reduce((acc, item) => {
                return acc + parseSumExpression(item.breakdown).total;
            }, 0);

            expense = (report.expenses || []).reduce((acc, item) => {
                if (item.subtotal !== undefined && item.subtotal !== null) {
                    return acc + parseIndoNumber(item.subtotal);
                }
                return acc + Math.round((Number(item.qty) || 0) * parseIndoNumber(item.price));
            }, 0);

            if (!hasInitializedFirstBalance) {
                openingBalance = parseIndoNumber(report.prevAmount);
                initialSeedCarryOver = openingBalance;
                hasInitializedFirstBalance = true;
            } else {
                openingBalance = runningBalance;
            }
        } else {
            let explicitCarry = 0;
            monthInTxs.forEach(tx => {
                const parsed = extractCarryOverAndPureIncome(tx);
                pureIncome += parsed.pureIn;
                if (parsed.carryOver > 0) explicitCarry += parsed.carryOver;
            });
            monthOutTxs.forEach(tx => {
                expense += Number(tx.amount) || 0;
            });

            if (!hasInitializedFirstBalance) {
                openingBalance = explicitCarry;
                initialSeedCarryOver = openingBalance;
                hasInitializedFirstBalance = true;
            } else {
                openingBalance = runningBalance;
            }
        }

        const netMonthBalance = pureIncome - expense;
        const totalAvailable = openingBalance + pureIncome;
        const closingBalance = totalAvailable - expense;

        runningBalance = closingBalance;
        totalPureInAll += pureIncome;
        totalOutAll += expense;

        monthlyMap[ym] = {
            ym,
            openingBalance,
            pureIncome,
            totalAvailable,
            expense,
            netMonthBalance,
            closingBalance
        };
    });

    const latestKey = sortedKeys.length > 0 ? sortedKeys[sortedKeys.length - 1] : null;
    const latestMonthSummary = latestKey ? monthlyMap[latestKey] : null;

    return {
        sortedKeys,
        monthlyMap,
        latestKey,
        latestMonthSummary,
        initialCarryOver: initialSeedCarryOver,
        totalPureIn: totalPureInAll,
        totalOut: totalOutAll,
        overallBalance: runningBalance
    };
}

function getEndingBalanceBeforePeriod(yearStr, monthStr) {
    const targetYm = `${yearStr}-${monthStr}`;
    const ledger = computeMonthlyLedgerBreakdown(false);
    const prevInfo = getPreviousMonthInfo(yearStr, monthStr);

    if (ledger.monthlyMap[prevInfo.prevKey]) {
        return ledger.monthlyMap[prevInfo.prevKey].closingBalance;
    }

    const earlierKeys = ledger.sortedKeys.filter(k => k < targetYm);
    if (earlierKeys.length > 0) {
        const lastEarlierKey = earlierKeys[earlierKeys.length - 1];
        return ledger.monthlyMap[lastEarlierKey].closingBalance;
    }

    if (waReportsStore[targetYm]) {
        return parseIndoNumber(waReportsStore[targetYm].prevAmount);
    }
    return 0;
}

function propagateCarryOverToSubsequentMonths(fromYear, fromMonth) {
    const fromKey = `${fromYear}-${fromMonth}`;
    const ledger = computeMonthlyLedgerBreakdown(false);

    ledger.sortedKeys.forEach(ym => {
        if (ym > fromKey && waReportsStore[ym]) {
            const [y, m] = ym.split('-');
            const prevInfo = getPreviousMonthInfo(y, m);
            const prevSummary = ledger.monthlyMap[prevInfo.prevKey];
            if (prevSummary) {
                waReportsStore[ym].prevLabel = `Sisa saldo bulan ${prevInfo.prevMonthName}`;
                waReportsStore[ym].prevAmount = prevSummary.closingBalance;
            }
        }
    });
}

function syncTopKpiCardsRealtime() {
    const selectedMonthEl = document.getElementById('filter-month');
    const selectedYearEl = document.getElementById('filter-year');
    if (!selectedMonthEl || !selectedYearEl) return;

    const selectedMonth = selectedMonthEl.value;
    const selectedYear = selectedYearEl.value;
    const ledger = computeMonthlyLedgerBreakdown(true);

    let displayOpening = 0;
    let displayIn = 0;
    let displayOut = 0;
    let endingCashBalance = 0;

    if (currentMainView === 'wa' && waFormState.year && waFormState.month) {
        const activeYm = `${waFormState.year}-${waFormState.month}`;
        if (ledger.monthlyMap[activeYm]) {
            const mSummary = ledger.monthlyMap[activeYm];
            displayOpening = mSummary.openingBalance;
            displayIn = mSummary.pureIncome;
            displayOut = mSummary.expense;
            endingCashBalance = mSummary.closingBalance;
        }
    } else if (selectedMonth !== 'all') {
        const activeYm = `${selectedYear}-${selectedMonth}`;
        if (ledger.monthlyMap[activeYm]) {
            const mSummary = ledger.monthlyMap[activeYm];
            displayOpening = mSummary.openingBalance;
            displayIn = mSummary.pureIncome;
            displayOut = mSummary.expense;
            endingCashBalance = mSummary.closingBalance;
        } else {
            displayOpening = getEndingBalanceBeforePeriod(selectedYear, selectedMonth);
            endingCashBalance = displayOpening;
        }
    } else {
        const yearKeys = ledger.sortedKeys.filter(k => k.startsWith(`${selectedYear}-`));
        if (yearKeys.length > 0) {
            const firstSummary = ledger.monthlyMap[yearKeys[0]];
            const lastSummary = ledger.monthlyMap[yearKeys[yearKeys.length - 1]];
            displayOpening = firstSummary.openingBalance;
            yearKeys.forEach(k => {
                displayIn += ledger.monthlyMap[k].pureIncome;
                displayOut += ledger.monthlyMap[k].expense;
            });
            endingCashBalance = lastSummary.closingBalance;
        } else {
            displayOpening = getEndingBalanceBeforePeriod(selectedYear, '01');
            endingCashBalance = displayOpening;
        }
    }

    const totalCashAvailable = displayOpening + displayIn;
    const balEl = document.getElementById('profile-stat-balance');
    const outEl = document.getElementById('profile-stat-out');
    const storyBalEl = document.getElementById('story-balance-short');
    const storyInEl = document.getElementById('story-in-short');
    const storyOutEl = document.getElementById('story-out-short');
    const storyRatioEl = document.getElementById('story-ratio-short');
    const checkBalBtn = document.getElementById('btn-check-balance');

    // Tampilkan Saldo Kas Akhir Real secara tepat dan transparan
    if (balEl) {
        balEl.textContent = `Rp${formatIndoDots(endingCashBalance)}`;
        balEl.title = `Saldo Kas Akhir Real: ${formatRupiah(endingCashBalance)}`;
    }
    if (outEl) outEl.textContent = formatShortRupiah(displayOut);
    if (storyBalEl) {
        storyBalEl.textContent = `Rp${formatIndoDots(endingCashBalance)}`;
        storyBalEl.title = `Saldo Kas Akhir Real: ${formatRupiah(endingCashBalance)}`;
    }
    if (storyInEl) storyInEl.textContent = formatShortRupiah(displayIn);
    if (storyOutEl) storyOutEl.textContent = formatShortRupiah(displayOut);

    if (checkBalBtn) {
        checkBalBtn.title = `Saldo Kas Akhir Real: ${formatRupiah(endingCashBalance)}`;
    }

    const ratio = totalCashAvailable > 0 ? Math.round((displayOut / totalCashAvailable) * 100) : 0;
    if (storyRatioEl) storyRatioEl.textContent = `${ratio}%`;

    // Sync Panel Samping Desktop (ala TikTok)
    const rightBalEl = document.getElementById('right-panel-balance');
    const rightInEl = document.getElementById('right-panel-in');
    const rightOutEl = document.getElementById('right-panel-out');
    if (rightBalEl) rightBalEl.textContent = `Rp${formatIndoDots(endingCashBalance)}`;
    if (rightInEl) rightInEl.textContent = `+ Rp${formatIndoDots(displayIn)}`;
    if (rightOutEl) rightOutEl.textContent = `- Rp${formatIndoDots(displayOut)}`;

    if (typeof takziahState !== 'undefined') {
        const memEl = document.getElementById('right-panel-takziah-members');
        const evEl = document.getElementById('right-panel-takziah-events');
        if (memEl && takziahState.members) memEl.textContent = takziahState.members.length;
        if (evEl && takziahState.events) evEl.textContent = takziahState.events.length;
    }
}

async function testAndSyncSupabase() {
    const rawUrl = document.getElementById('set-sb-url').value;
    const rawKey = document.getElementById('set-sb-key').value;
    const cleanedUrl = sanitizeSupabaseUrl(rawUrl);
    const cleanedKey = rawKey.trim();

    // Perbarui nilai di form agar bersih
    document.getElementById('set-sb-url').value = cleanedUrl;
    document.getElementById('set-sb-key').value = cleanedKey;

    sbCredentials = {
        url: cleanedUrl,
        key: cleanedKey
    };
    localStorage.setItem(STORAGE_KEYS.SB_CONFIG, JSON.stringify(sbCredentials));
    initSupabaseCredentials();
    await syncInitialData(true);
}

async function pushLocalDataToCloud() {
    const localRows = transactions.filter(t => String(t.id).startsWith('local-'));
    if (localRows.length === 0) {
        showToast('Semua data sudah tersinkron di Cloud.', 'info');
        return;
    }
    try {
        const bodyRows = localRows.map(({ id, ...rest }) => rest);
        const chunkSize = 50;
        for (let i = 0; i < bodyRows.length; i += chunkSize) {
            const chunk = bodyRows.slice(i, i + chunkSize);
            await supabaseRestFetch('infaq_transactions', {
                method: 'POST',
                timeout: 20000,
                headers: { 'Prefer': 'return=representation' },
                body: chunk
            });
        }
        showToast(`${localRows.length} data lokal berhasil diunggah ke Supabase!`, 'success');
        await syncInitialData(false);
    } catch (err) {
        showToast('Gagal mengunggah ke Supabase: ' + err.message, 'error');
        throw err;
    }
}

function runFullBalanceAudit() {
    deduplicateMonthlyLedgerRecords();
    syncWaReportsStoreFromTransactions();
    const ledger = computeMonthlyLedgerBreakdown(false);
    if (ledger.sortedKeys.length > 0) {
        const [firstY, firstM] = ledger.sortedKeys[0].split('-');
        propagateCarryOverToSubsequentMonths(firstY, firstM);
    }
    saveLocalCache();
    refreshDashboard();
    showToast(`Audit selesai! Saldo Akhir Kas Akurat: ${formatRupiah(ledger.overallBalance)}`, 'success');
}
