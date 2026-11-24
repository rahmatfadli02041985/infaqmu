// =====================================================================
// LOGIKA UTAMA & UI APLIKASI INFAQMU (js/app.js)
// =====================================================================
const APP_VERSION = 'v.4';

let supabaseClient = null;
let isCloudConnected = false;
let sbCredentials = { url: DEFAULT_SUPABASE_URL, key: DEFAULT_SUPABASE_KEY };

let appSettings = {
    orgName: 'InfaqMU Peduli',
    orgHandle: 'prm.bandarmalela',
    orgBio: 'Laporan Transparansi Penerimaan & Penyaluran Infaq Sedekah • Terverifikasi Bendahara',
    viewerPin: '112233',
    adminPin: '999999',
    showFeedForViewer: false,
    showQuickLogin: true
};

let transactions = [];
let waReportsStore = {};
let likedTxIds = new Set();
let currentRole = null;
let selectedGateRole = 'viewer';
let currentMainView = 'feed';
let feedLayoutMode = 'feed';
let monthlyChartInstance = null;
let pendingDeleteId = null;
let isWaFormEditable = false;
let waEditSnapshot = null;
let currentStorySlide = 0;
let expandedPosterIds = new Set();

let waFormState = {
    month: '10',
    year: '2026',
    incomes: [{ name: 'Kaleng Infaqmu', breakdown: '686.500 + 807.500 + 612.500' }],
    prevLabel: 'Sisa saldo bulan September',
    prevAmount: 12500,
    expenseGroupTitle: 'Belanja sembako',
    isDisbursementCompleted: true,
    expenses: [
        { name: 'Beras Horas', qty: 19, unit: 'sak', price: 74000 },
        { name: 'Minyakita', qty: 19, unit: 'bks', price: 16500 },
        { name: 'Telur', qty: 190, unit: 'butir', price: 1650 }
    ]
};

function showInAppDialog({ title = 'Konfirmasi', message = '', inputDefault = null, confirmText = 'Lanjutkan', cancelText = 'Batal' }) {
    return new Promise((resolve) => {
        const modal = document.getElementById('inapp-dialog-modal');
        const titleEl = document.getElementById('inapp-dialog-title');
        const msgEl = document.getElementById('inapp-dialog-message');
        const inputEl = document.getElementById('inapp-dialog-input');
        const okBtn = document.getElementById('inapp-dialog-confirm');
        const cancelBtn = document.getElementById('inapp-dialog-cancel');

        titleEl.textContent = title;
        msgEl.textContent = message;
        okBtn.textContent = confirmText;
        cancelBtn.textContent = cancelText;

        if (inputDefault !== null) {
            inputEl.classList.remove('hidden');
            inputEl.value = inputDefault;
        } else {
            inputEl.classList.add('hidden');
            inputEl.value = '';
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (inputDefault !== null) {
            setTimeout(() => inputEl.focus(), 40);
        }

        const cleanup = (result) => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            inputEl.onkeydown = null;
            resolve(result);
        };

        okBtn.onclick = () => cleanup(inputDefault !== null ? inputEl.value : true);
        cancelBtn.onclick = () => cleanup(inputDefault !== null ? null : false);
        inputEl.onkeydown = (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                cleanup(inputEl.value);
            } else if (ev.key === 'Escape') {
                ev.preventDefault();
                cleanup(null);
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        loadLocalFallbackData();
        loadTakziahState();
        if (typeof loadJurnalKasState === 'function') loadJurnalKasState();
        ensureTakziahMenuAndViewMounted();
        deduplicateMonthlyLedgerRecords();
        syncWaReportsStoreFromTransactions();
        initSupabaseCredentials();
        setupPinInputListeners();
        setupRealtimeMoneyFormatters();
        setupStickyWaPeriodHeader();
        applySettingsToUI();

        const firstPinBox = document.querySelector('.pin-box');
        if (firstPinBox) firstPinBox.focus();

        setTimeout(() => {
            syncInitialData(false).catch(() => {});
        }, 150);
    } catch (err) {
        console.error('Init error:', err);
    }
});

// --- UTILITAS FORMATTER & PARSER INDONESIA ---
function formatIndoDots(num) {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.round(Number(num) || 0));
}

function parseIndoNumber(val) {
    if (typeof val === 'number') return isFinite(val) ? val : 0;
    if (!val) return 0;
    const cleaned = String(val).replace(/[^0-9-]/g, '');
    return Number(cleaned) || 0;
}

function formatBreakdownExpression(rawStr) {
    if (!rawStr) return '';
    return String(rawStr).replace(/\d[\d.]*/g, (match) => {
        const digitsOnly = match.replace(/\D/g, '');
        if (!digitsOnly) return '';
        return formatIndoDots(Number(digitsOnly));
    });
}

function formatMoneyInputLive(inputEl) {
    if (!inputEl) return;
    const rawDigits = String(inputEl.value).replace(/\D/g, '');
    if (!rawDigits) {
        inputEl.value = '';
        updateWaLivePreview();
        return;
    }
    const num = Number(rawDigits);
    inputEl.value = formatIndoDots(num);
    updateWaLivePreview();
}

function formatMoneyInputOnBlur(inputEl) {
    const num = parseIndoNumber(inputEl.value);
    inputEl.value = formatIndoDots(num);
    updateWaLivePreview();
}

function setupRealtimeMoneyFormatters() {
    const prevAmountEl = document.getElementById('wa-prev-amount');
    if (prevAmountEl) {
        prevAmountEl.setAttribute('inputmode', 'numeric');
        prevAmountEl.addEventListener('input', function () {
            formatMoneyInputLive(this);
        });
    }

    document.addEventListener('input', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('format-ribuan')) {
            const rawDigits = String(e.target.value).replace(/\D/g, '');
            e.target.value = rawDigits ? formatIndoDots(Number(rawDigits)) : '';
        }
    });
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.round(Number(number) || 0));
}

function formatShortRupiah(number) {
    const abs = Math.abs(number);
    const sign = number < 0 ? '-' : '';
    if (abs >= 1000000) {
        const jt = (abs / 1000000).toFixed(1).replace(/\.0$/, '').replace('.', ',');
        return `${sign}Rp${jt}Jt`;
    }
    if (abs >= 1000) {
        return `${sign}Rp${Math.round(abs / 1000)}Rb`;
    }
    return `${sign}Rp${abs}`;
}

function formatDateIndo(dateStr) {
    if (!dateStr) return '-';
    const [y, m, d] = dateStr.split('-');
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${parseInt(d, 10)} ${monthShort[parseInt(m, 10) - 1]} ${y}`;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// --- GERBANG PIN 6 DIGIT ---
function applySettingsToUI() {
    const cleanHandle = appSettings.orgHandle.replace(/^@/, '');
    document.getElementById('gate-org-name').textContent = appSettings.orgName;
    document.getElementById('gate-org-handle').textContent = `@${cleanHandle} • Berita & Transparansi`;
    document.getElementById('header-org-name').textContent = appSettings.orgName;
    document.getElementById('header-org-handle').textContent = cleanHandle;
    document.getElementById('header-org-bio').textContent = appSettings.orgBio;
    document.getElementById('hint-viewer-pin').textContent = appSettings.viewerPin;
    document.getElementById('hint-admin-pin').textContent = appSettings.adminPin;

    // Tampilkan / sembunyikan Akses Cepat pada form login
    const quickLoginEl = document.getElementById('quick-login-container');
    if (quickLoginEl) {
        const isQuickLoginVisible = appSettings.showQuickLogin !== false;
        quickLoginEl.classList.toggle('hidden', !isQuickLoginVisible);
    }

    // Tampilkan / sembunyikan menu Beranda untuk Jamaah/Viewer jika sedang login
    if (currentRole) {
        const isAdmin = currentRole === 'admin';
        const canSeeFeed = isAdmin || appSettings.showFeedForViewer === true;
        const sidebarFeedBtn = document.getElementById('sidebar-nav-btn-feed');
        if (sidebarFeedBtn) {
            sidebarFeedBtn.classList.toggle('hidden', !canSeeFeed);
        }
        const navFeedBtn = document.getElementById('nav-btn-feed');
        if (navFeedBtn) {
            navFeedBtn.classList.toggle('hidden', !canSeeFeed);
            navFeedBtn.classList.toggle('flex', canSeeFeed);
        }
    }
}

function switchGateRole(role) {
    selectedGateRole = role;
    const tabViewer = document.getElementById('tab-role-viewer');
    const tabAdmin = document.getElementById('tab-role-admin');
    const promptLabel = document.getElementById('pin-prompt-label');
    const btnUnlock = document.getElementById('btn-unlock');

    if (tabViewer) tabViewer.classList.toggle('bg-white', role === 'viewer');
    if (tabAdmin) tabAdmin.classList.toggle('bg-white', role === 'admin');
    if (promptLabel) promptLabel.textContent = 'Masukkan PIN 6 Digit untuk Log in';
    if (btnUnlock) {
        btnUnlock.className = 'w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg transition-all active:scale-[0.98]';
        btnUnlock.innerHTML = '<span>Log in ke Aplikasi</span>';
    }
    clearPinInputs();
}

function pressKeypad(digit) {
    const boxes = document.querySelectorAll('.pin-box');
    document.getElementById('pin-error-msg').classList.add('hidden');
    for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i].value) {
            boxes[i].value = digit;
            if (i < boxes.length - 1) boxes[i + 1].focus();
            else {
                const fullPin = Array.from(boxes).map(b => b.value).join('');
                if (fullPin.length === 6) verifyAndUnlock(fullPin);
            }
            break;
        }
    }
}

function backspaceKeypad() {
    const boxes = document.querySelectorAll('.pin-box');
    for (let i = boxes.length - 1; i >= 0; i--) {
        if (boxes[i].value) {
            boxes[i].value = '';
            boxes[i].focus();
            break;
        }
    }
}

function setupPinInputListeners() {
    const boxes = document.querySelectorAll('.pin-box');
    boxes.forEach((box, idx) => {
        box.addEventListener('input', (e) => {
            const val = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = val;
            if (val && idx < boxes.length - 1) boxes[idx + 1].focus();
            if (idx === boxes.length - 1 && val) {
                const fullPin = Array.from(boxes).map(b => b.value).join('');
                if (fullPin.length === 6) verifyAndUnlock(fullPin);
            }
        });
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && idx > 0) boxes[idx - 1].focus();
        });
    });
}

function clearPinInputs() {
    document.querySelectorAll('.pin-box').forEach(b => b.value = '');
    document.getElementById('pin-error-msg').classList.add('hidden');
}

function togglePinVisibility() {
    const show = document.getElementById('toggle-show-pin').checked;
    document.querySelectorAll('.pin-box').forEach(b => b.type = show ? 'text' : 'password');
}

function autoFillDemoPin(role) {
    switchGateRole(role);
    const pin = role === 'admin' ? appSettings.adminPin : appSettings.viewerPin;
    const boxes = document.querySelectorAll('.pin-box');
    pin.split('').forEach((d, i) => { if (boxes[i]) boxes[i].value = d; });
    verifyAndUnlock(pin);
}

function handlePinSubmit(e) {
    e.preventDefault();
    const enteredPin = Array.from(document.querySelectorAll('.pin-box')).map(b => b.value).join('');
    verifyAndUnlock(enteredPin);
}

function verifyAndUnlock(enteredPin) {
    const errorEl = document.getElementById('pin-error-msg');
    if (enteredPin.length !== 6) {
        errorEl.textContent = 'Harap lengkapi 6 digit angka PIN.';
        errorEl.classList.remove('hidden');
        return;
    }

    if (enteredPin === appSettings.adminPin) {
        grantAccess('admin');
    } else if (enteredPin === appSettings.viewerPin) {
        grantAccess('viewer');
    } else {
        errorEl.textContent = 'Kode PIN 6 digit salah. Silakan coba lagi.';
        errorEl.classList.remove('hidden');
        clearPinInputs();
    }
}

function grantAccess(role) {
    currentRole = role;
    document.getElementById('access-gate').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    const isAdmin = role === 'admin';
    document.getElementById('role-badge').textContent = isAdmin ? 'Admin' : 'Publik';
    document.getElementById('role-badge-mobile').textContent = isAdmin ? 'Admin' : 'Publik';
    document.getElementById('btn-open-security').classList.toggle('hidden', !isAdmin);
    document.getElementById('fab-create-post').classList.toggle('hidden', !isAdmin);
    document.getElementById('fab-create-post').classList.toggle('flex', isAdmin);

    // Sync Desktop Sidebar Nav & Role (ala TikTok)
    const sidebarRoleBadge = document.getElementById('sidebar-role-badge');
    if (sidebarRoleBadge) {
        sidebarRoleBadge.textContent = isAdmin ? 'Admin' : 'Jamaah';
    }
    const canSeeFeed = isAdmin || appSettings.showFeedForViewer === true;
    const sidebarFeedBtn = document.getElementById('sidebar-nav-btn-feed');
    if (sidebarFeedBtn) {
        sidebarFeedBtn.classList.toggle('hidden', !canSeeFeed);
    }
    const sidebarCreateBtn = document.getElementById('sidebar-btn-create-post');
    if (sidebarCreateBtn) {
        sidebarCreateBtn.classList.toggle('hidden', !isAdmin);
        sidebarCreateBtn.classList.toggle('flex', isAdmin);
    }
    const sidebarSecBtn = document.getElementById('sidebar-btn-security');
    if (sidebarSecBtn) {
        sidebarSecBtn.classList.toggle('hidden', !isAdmin);
        sidebarSecBtn.classList.toggle('flex', isAdmin);
    }

    // Navigasi Beranda: tampil jika Admin atau jika diizinkan di Pengaturan
    const navFeedBtn = document.getElementById('nav-btn-feed');
    if (navFeedBtn) {
        navFeedBtn.classList.toggle('hidden', !canSeeFeed);
        navFeedBtn.classList.toggle('flex', canSeeFeed);
    }

    // Navigasi Laporan InfaqMu: tampil untuk Admin dan Jamaah
    const navWaBtn = document.getElementById('nav-btn-wa');
    if (navWaBtn) {
        navWaBtn.classList.remove('hidden');
        navWaBtn.classList.add('flex');
    }

    // Navigasi Jurnal Kas: tampil untuk Admin dan Jamaah
    const navJurnalBtn = document.getElementById('nav-btn-jurnal');
    if (navJurnalBtn) {
        navJurnalBtn.classList.remove('hidden');
        navJurnalBtn.classList.add('flex');
    }

    // Highlight Story Laporan InfaqMu: tampil untuk Admin dan Jamaah
    const storyWaBtn = document.getElementById('story-highlight-wa');
    if (storyWaBtn) {
        storyWaBtn.classList.remove('hidden');
        storyWaBtn.classList.add('flex');
    }

    // Highlight Story Jurnal Kas: tampil untuk Admin dan Jamaah
    const storyJurnalBtn = document.getElementById('story-highlight-jurnal');
    if (storyJurnalBtn) {
        storyJurnalBtn.classList.remove('hidden');
        storyJurnalBtn.classList.add('flex');
    }

    // Header & Editor Laporan InfaqMu: Admin vs Jamaah
    const waAdminHeader = document.getElementById('wa-admin-header-card');
    const waViewerHeader = document.getElementById('wa-viewer-header-card');
    const waEditorBox = document.getElementById('wa-admin-editor-box');
    if (waAdminHeader) waAdminHeader.classList.toggle('hidden', !isAdmin);
    if (waViewerHeader) waViewerHeader.classList.toggle('hidden', isAdmin);
    if (waEditorBox) waEditorBox.classList.toggle('hidden', !isAdmin);

    const btnSecondary = document.getElementById('btn-profile-secondary');
    if (isAdmin) {
        btnSecondary.textContent = 'Rekap Laporan InfaqMU';
        btnSecondary.onclick = () => switchMainView('wa');
    } else {
        btnSecondary.textContent = 'Laporan InfaqMu';
        btnSecondary.onclick = () => switchMainView('wa');
    }

    const periods = getRealtimePeriods();
    populateYearFilter();
    document.getElementById('filter-year').value = periods.previous.year;
    document.getElementById('filter-month').value = periods.previous.month;

    loadWaReportForPeriod(periods.previous.year, periods.previous.month, false);

    ensureTakziahMenuAndViewMounted();
    setupStickyWaPeriodHeader();

    // Default view: Jamaah langsung ke 'wa' (Pratinjau Laporan InfaqMu), Admin ke 'feed'
    if (isAdmin) {
        switchMainView('feed');
    } else {
        switchMainView('wa');
    }

    const prevMonthLabel = MONTH_NAMES[parseInt(periods.previous.month, 10) - 1] || '';
    showToast(
        isAdmin
            ? `Selamat datang, Admin! Menampilkan sistem InfaqMu.`
            : `Selamat datang! Menampilkan Pratinjau Laporan InfaqMu.`,
        'success'
    );
}

function lockApplication() {
    currentRole = null;
    clearPinInputs();
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('access-gate').classList.remove('hidden');
    applySettingsToUI();
}

// --- NAVIGASI & BERANDA ALA INSTAGRAM ---
function populateYearFilter() {
    const select = document.getElementById('filter-year');
    const periods = getRealtimePeriods();
    const years = new Set(['2026', '2025', periods.current.year, periods.previous.year]);
    transactions.forEach(t => { if (t.tx_date) years.add(t.tx_date.substring(0, 4)); });
    const sorted = Array.from(years).sort((a, b) => b - a);
    select.innerHTML = sorted.map(y => `<option value="${y}">${y}</option>`).join('');
}

function toggleSearchBar() {
    const el = document.getElementById('search-bar-wrapper');
    el.classList.toggle('hidden');
    if (!el.classList.contains('hidden')) document.getElementById('search-input').focus();
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-bar-wrapper').classList.add('hidden');
    refreshDashboard();
}

function switchMainView(view) {
    if (view === 'feed' && currentRole !== 'admin') {
        const canSeeFeed = appSettings.showFeedForViewer === true;
        if (!canSeeFeed) {
            showToast('Menu Beranda sedang disembunyikan untuk Jamaah.', 'info');
            return;
        }
    }
    currentMainView = view;

    const activeCls = 'flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 text-emerald-400 font-bold text-xs transition-all';
    const inactiveCls = 'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-slate-400 hover:text-white font-semibold text-xs transition-all';

    ensureTakziahMenuAndViewMounted();
    const navFeedEl = document.getElementById('nav-btn-feed');
    if (navFeedEl) {
        const canSeeFeed = currentRole === 'admin' || appSettings.showFeedForViewer === true;
        if (!canSeeFeed) {
            navFeedEl.className = 'hidden';
        } else {
            navFeedEl.className = view === 'feed' ? activeCls : inactiveCls;
        }
    }
    const navStatsEl = document.getElementById('nav-btn-stats');
    if (navStatsEl) navStatsEl.className = view === 'stats' ? activeCls : inactiveCls;
    const navWaEl = document.getElementById('nav-btn-wa');
    if (navWaEl) navWaEl.className = view === 'wa' ? activeCls : inactiveCls;
    const navJurnalEl = document.getElementById('nav-btn-jurnal');
    if (navJurnalEl) navJurnalEl.className = view === 'jurnal' ? activeCls : inactiveCls;
    const navTakziahEl = document.getElementById('nav-btn-takziah');
    if (navTakziahEl) navTakziahEl.className = view === 'takziah' ? activeCls : inactiveCls;

    document.getElementById('feed-mode-tabs').classList.toggle('hidden', view !== 'feed');

    if (view === 'wa') {
        const periods = getRealtimePeriods();
        if (!waFormState || !waFormState.month) {
            loadWaReportForPeriod(periods.previous.year, periods.previous.month, false);
        }
        setTimeout(setupStickyWaPeriodHeader, 50);
    }

    if (view === 'jurnal') {
        if (typeof setupStickyJurnalHeader === 'function') {
            setTimeout(setupStickyJurnalHeader, 50);
        }
    }

    updateSidebarNavActive(view);
    refreshDashboard();
}

function updateSidebarNavActive(view) {
    const items = [
        { id: 'sidebar-nav-btn-feed', view: 'feed' },
        { id: 'sidebar-nav-btn-wa', view: 'wa' },
        { id: 'sidebar-nav-btn-jurnal', view: 'jurnal' },
        { id: 'sidebar-nav-btn-takziah', view: 'takziah' },
        { id: 'sidebar-nav-btn-stats', view: 'stats' }
    ];

    items.forEach(item => {
        const btn = document.getElementById(item.id);
        if (!btn) return;
        const isActive = item.view === view;
        const icon = btn.querySelector('.sidebar-icon');
        if (isActive) {
            btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-emerald-50 text-emerald-800 shadow-2xs transition-all';
            if (icon) {
                icon.classList.remove('text-slate-400');
                icon.classList.add('text-emerald-600');
            }
        } else {
            btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all';
            if (icon) {
                icon.classList.remove('text-emerald-600');
                icon.classList.add('text-slate-400');
            }
        }
    });

    // Sesuaikan lebar konten tengah agar tampilan tabel jurnal/takziah lega di desktop
    const centerCol = document.getElementById('main-content-column');
    if (centerCol) {
        if (view === 'jurnal' || view === 'takziah') {
            centerCol.classList.remove('lg:max-w-[620px]');
            centerCol.classList.add('lg:max-w-[880px]');
        } else {
            centerCol.classList.remove('lg:max-w-[880px]');
            centerCol.classList.add('lg:max-w-[620px]');
        }
    }
}

function syncSidebarSearch(query) {
    const mainSearch = document.getElementById('search-input');
    if (mainSearch) {
        mainSearch.value = query;
        refreshDashboard();
    }
}

function setFeedLayoutMode(mode) {
    feedLayoutMode = mode;
    document.getElementById('tab-subview-feed').className = mode === 'feed'
        ? 'py-2.5 flex items-center justify-center gap-1.5 border-b-2 border-slate-900 text-slate-900 font-bold text-xs'
        : 'py-2.5 flex items-center justify-center gap-1.5 border-b-2 border-transparent text-slate-400 font-semibold text-xs';
    document.getElementById('tab-subview-grid').className = mode === 'grid'
        ? 'py-2.5 flex items-center justify-center gap-1.5 border-b-2 border-slate-900 text-slate-900 font-bold text-xs'
        : 'py-2.5 flex items-center justify-center gap-1.5 border-b-2 border-transparent text-slate-400 font-semibold text-xs';
    refreshDashboard();
}

function refreshDashboard() {
    deduplicateMonthlyLedgerRecords();
    const selectedMonth = document.getElementById('filter-month').value;
    const selectedYear = document.getElementById('filter-year').value;
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();

    const newsPostsAll = transactions.filter(t => t.type === 'news');
    document.getElementById('profile-stat-posts').textContent = newsPostsAll.length;

    syncTopKpiCardsRealtime();

    const ledger = computeMonthlyLedgerBreakdown(true);
    const periodLabel = selectedMonth === 'all'
        ? `Tahun ${selectedYear}`
        : `${MONTH_NAMES[parseInt(selectedMonth, 10) - 1]} ${selectedYear}`;
    document.getElementById('active-period-badge').textContent = periodLabel;

    const periodFilterSection = document.getElementById('period-filter-section');
    if (periodFilterSection) {
        periodFilterSection.classList.toggle('hidden', currentMainView !== 'stats');
    }

    ensureTakziahMenuAndViewMounted();
    document.getElementById('feed-view').classList.add('hidden');
    document.getElementById('grid-view').classList.add('hidden');
    document.getElementById('wa-view').classList.add('hidden');
    document.getElementById('stats-view').classList.add('hidden');
    const takziahViewEl = document.getElementById('takziah-view');
    if (takziahViewEl) takziahViewEl.classList.add('hidden');
    const jurnalViewEl = document.getElementById('jurnal-view');
    if (jurnalViewEl) jurnalViewEl.classList.add('hidden');
    document.getElementById('empty-state').classList.add('hidden');

    if (currentMainView === 'jurnal') {
        if (jurnalViewEl) jurnalViewEl.classList.remove('hidden');
        if (typeof renderJurnalView === 'function') renderJurnalView();
        return;
    }

    if (currentMainView === 'takziah') {
        if (takziahViewEl) takziahViewEl.classList.remove('hidden');
        renderTakziahView();
        return;
    }

    if (currentMainView === 'wa') {
        document.getElementById('wa-view').classList.remove('hidden');
        const isAdmin = currentRole === 'admin';
        const waAdminHeader = document.getElementById('wa-admin-header-card');
        const waViewerHeader = document.getElementById('wa-viewer-header-card');
        const waEditorBox = document.getElementById('wa-admin-editor-box');
        if (waAdminHeader) waAdminHeader.classList.toggle('hidden', !isAdmin);
        if (waViewerHeader) waViewerHeader.classList.toggle('hidden', isAdmin);
        if (waEditorBox) waEditorBox.classList.toggle('hidden', !isAdmin);

        renderPublishedMonthsBar();
        updateWaLivePreview();
        return;
    }

    if (currentMainView === 'stats') {
        document.getElementById('stats-view').classList.remove('hidden');
        renderStatsView(selectedYear, selectedMonth, periodLabel, ledger);
        return;
    }

    // Filter semua berita yang ada (berdasarkan pencarian jika ada)
    const allFilteredNews = newsPostsAll.filter(tx => {
        if (!tx.tx_date) return false;
        if (!searchQuery) return true;
        return (tx.title || '').toLowerCase().includes(searchQuery) ||
               (tx.description || '').toLowerCase().includes(searchQuery) ||
               (tx.category || '').toLowerCase().includes(searchQuery);
    });

    if (allFilteredNews.length === 0) {
        document.getElementById('empty-state').classList.remove('hidden');
        return;
    }

    // Urutkan semua berita secara descending (terbaru ke terlama)
    const sortedNews = [...allFilteredNews].sort((a, b) => new Date(b.tx_date) - new Date(a.tx_date));

    if (feedLayoutMode === 'grid') {
        document.getElementById('grid-view').classList.remove('hidden');
        renderInstagramGrid(sortedNews);
    } else {
        document.getElementById('feed-view').classList.remove('hidden');
        renderInstagramFeed(sortedNews);
    }
}

function getThemeGradient(theme) {
    const map = {
        emerald: 'from-emerald-600 via-emerald-700 to-teal-900',
        blue: 'from-blue-600 via-indigo-700 to-slate-900',
        amber: 'from-amber-500 via-orange-600 to-amber-900',
        rose: 'from-rose-600 via-pink-700 to-rose-950',
        purple: 'from-purple-600 via-violet-700 to-indigo-950'
    };
    return map[theme] || map.emerald;
}

function togglePosterExpand(txKey, event) {
    if (event) event.stopPropagation();
    const key = String(txKey);
    if (expandedPosterIds.has(key)) {
        expandedPosterIds.delete(key);
    } else {
        expandedPosterIds.add(key);
    }
    refreshDashboard();
}

function renderInstagramFeed(list) {
    const container = document.getElementById('feed-view');
    const isAdmin = currentRole === 'admin';
    const handle = appSettings.orgHandle.replace(/^@/, '');

    container.innerHTML = list.map(tx => {
        const txKey = String(tx.id);
        const isLiked = likedTxIds.has(txKey);
        const isExpanded = expandedPosterIds.has(txKey);
        const grad = getThemeGradient(tx.theme);
        const waPreviewText = getWaPreviewTextForPost(tx);

        const adminActions = isAdmin ? `
            <div class="flex items-center gap-1">
                <button type="button" onclick="openNewsModal('${txKey}')" class="px-2 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700">Edit</button>
                <button type="button" onclick="promptDeleteTransaction('${txKey}')" class="px-2 py-1 rounded-lg bg-rose-50 text-[11px] font-bold text-rose-600">Hapus</button>
            </div>
        ` : `<span class="text-[11px] text-slate-400">${formatDateIndo(tx.tx_date)}</span>`;

        const expandedContent = isExpanded ? `
            <div class="mt-4 pt-3.5 border-t border-white/20 space-y-3 animate-fadeIn">
                <div class="rounded-xl bg-black/25 backdrop-blur-sm p-3.5 border border-white/15">
                    <div class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 mb-2">
                        Rincian Laporan Kas &amp; Penyaluran
                    </div>
                    <pre class="whitespace-pre-wrap font-sans text-[11px] sm:text-xs leading-relaxed text-white/95">${escapeHtml(waPreviewText)}</pre>
                </div>
            </div>
        ` : '';

        return `
            <article id="post-${txKey}" class="bg-white py-4 px-4 scroll-mt-24">
                <div class="flex items-center justify-between mb-2.5">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-full story-ring-ig">
                            <div class="w-full h-full rounded-full bg-slate-900 text-emerald-300 font-display font-extrabold text-[10px] flex items-center justify-center border border-white">MU</div>
                        </div>
                        <div>
                            <div class="text-xs font-bold text-slate-900">${escapeHtml(handle)}</div>
                            <div class="text-[11px] text-slate-500">${escapeHtml(tx.category)}</div>
                        </div>
                    </div>
                    ${adminActions}
                </div>

                <div onclick="togglePosterExpand('${txKey}', event)" ondblclick="handleDoubleTapPoster('${txKey}', this)" class="rounded-2xl ${tx.image ? 'bg-slate-900' : 'bg-gradient-to-br ' + grad} ${isExpanded ? 'p-6 sm:p-7' : 'p-6'} text-white relative overflow-hidden select-none cursor-pointer shadow-sm transition-all duration-300">
                    ${tx.image ? `
                        <img src="${escapeHtml(tx.image)}" alt="${escapeHtml(tx.title)}" class="absolute inset-0 w-full h-full object-cover pointer-events-none">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/35 pointer-events-none"></div>
                    ` : ''}
                    <div class="relative z-10">
                        <span class="inline-block px-2.5 py-1 rounded-full ${tx.image ? 'bg-black/50 backdrop-blur-sm border border-white/20' : 'bg-white/20'} text-[10px] font-extrabold uppercase tracking-wider mb-3">
                            ${escapeHtml(tx.category)}
                        </span>
                        <h3 class="font-display font-extrabold text-lg sm:text-xl leading-snug drop-shadow-sm">
                            ${escapeHtml(tx.title)}
                        </h3>
                        ${expandedContent}
                        <div class="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-white/90">
                            <a href="javascript:void(0)" onclick="togglePosterExpand('${txKey}', event)" class="underline decoration-white/70 hover:text-white font-semibold cursor-pointer">
                                ${isExpanded ? 'tutup..' : 'selengkapnya..'}
                            </a>
                            <span>${formatDateIndo(tx.tx_date)}</span>
                        </div>
                    </div>
                    <div class="double-tap-overlay hidden absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <svg class="w-20 h-20 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-3 mb-2">
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="toggleAamiin('${txKey}')" class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${isLiked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-100 text-slate-700'}">
                            ${isLiked ? '♥' : '♡'} Aamiin (${tx.aamiin_count || 0})
                        </button>
                        <button type="button" onclick="sharePostDetail('${txKey}')" class="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                            Bagikan
                        </button>
                    </div>
                    <span class="text-[11px] font-semibold text-emerald-700">#InfaqmuPeduli</span>
                </div>

                <div class="text-xs text-slate-800 leading-relaxed">
                    <span class="font-bold mr-1">${escapeHtml(handle)}</span>
                    <span>${escapeHtml(tx.description)}</span>
                </div>
            </article>
        `;
    }).join('');
}

function openPostInFullMode(txKey) {
    const key = String(txKey);
    expandedPosterIds.add(key);
    setFeedLayoutMode('feed');
    setTimeout(() => {
        const targetEl = document.getElementById(`post-${key}`);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 120);
}

function renderInstagramGrid(list) {
    const container = document.getElementById('grid-view');
    container.innerHTML = list.map(tx => {
        const txKey = String(tx.id);
        const grad = getThemeGradient(tx.theme);
        return `
            <button type="button" onclick="openPostInFullMode('${txKey}')" class="aspect-square ${tx.image ? 'bg-slate-900' : 'bg-gradient-to-br ' + grad} p-2.5 text-left text-white flex flex-col justify-between overflow-hidden relative active:scale-95 transition-transform cursor-pointer group">
                ${tx.image ? `
                    <img src="${escapeHtml(tx.image)}" alt="${escapeHtml(tx.title)}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 pointer-events-none"></div>
                ` : ''}
                <span class="relative z-10 text-[9px] font-bold uppercase bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded w-fit">${escapeHtml(tx.category)}</span>
                <div class="relative z-10 font-display font-bold text-[11px] leading-tight line-clamp-3 drop-shadow-sm">${escapeHtml(tx.title)}</div>
            </button>
        `;
    }).join('');
}

function handleDoubleTapPoster(txId, el) {
    const overlay = el.querySelector('.double-tap-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('animate-double-tap-heart');
        setTimeout(() => {
            overlay.classList.add('hidden');
            overlay.classList.remove('animate-double-tap-heart');
        }, 750);
    }
    if (!likedTxIds.has(String(txId))) toggleAamiin(txId);
}

async function toggleAamiin(txId) {
    const idx = transactions.findIndex(t => String(t.id) === String(txId));
    if (idx === -1) return;

    const key = String(txId);
    const liked = likedTxIds.has(key);
    const nextCount = liked ? Math.max(0, (transactions[idx].aamiin_count || 0) - 1) : (transactions[idx].aamiin_count || 0) + 1;

    if (liked) likedTxIds.delete(key);
    else likedTxIds.add(key);

    transactions[idx].aamiin_count = nextCount;
    try { localStorage.setItem(STORAGE_KEYS.LIKED_IDS, JSON.stringify(Array.from(likedTxIds))); } catch (e) {}
    saveLocalCache();
    refreshDashboard();

    if (isCloudConnected && !key.startsWith('local-')) {
        supabaseRestFetch(`infaq_transactions?id=eq.${transactions[idx].id}`, {
            method: 'PATCH',
            body: { aamiin_count: nextCount }
        }).catch(() => {});
    }
}

function sharePostDetail(txId) {
    const tx = transactions.find(t => String(t.id) === String(txId));
    if (!tx) return;
    const text = `*${appSettings.orgName}*\n_${tx.category} (${formatDateIndo(tx.tx_date)})_\n\n*${tx.title}*\n${tx.description}`;
    copyTextFallback(text, 'Berita berhasil disalin untuk dibagikan!');
}

// --- STORY VIEWER INTERAKTIF ---
function openStoryViewer(slideIdx = 0) {
    currentStorySlide = slideIdx;
    document.getElementById('story-viewer-modal').classList.remove('hidden');
    document.getElementById('story-viewer-modal').classList.add('flex');
    renderStorySlide();
}

function closeStoryViewer() {
    document.getElementById('story-viewer-modal').classList.add('hidden');
    document.getElementById('story-viewer-modal').classList.remove('flex');
}

function nextStorySlide() {
    if (currentStorySlide < 3) {
        currentStorySlide++;
        renderStorySlide();
    } else {
        closeStoryViewer();
    }
}

function prevStorySlide() {
    if (currentStorySlide > 0) {
        currentStorySlide--;
        renderStorySlide();
    }
}

function renderStorySlide() {
    for (let i = 0; i < 4; i++) {
        const bar = document.getElementById(`story-prog-${i}`);
        if (bar) bar.style.width = i <= currentStorySlide ? '100%' : '0%';
    }

    const selectedMonth = document.getElementById('filter-month').value;
    const selectedYear = document.getElementById('filter-year').value;
    const ledger = computeMonthlyLedgerBreakdown(true);

    let openingVal = 0;
    let pureInVal = 0;
    let outVal = 0;
    let closingBalVal = 0;
    let periodDesc = `Tahun ${selectedYear}`;

    if (currentMainView === 'wa' && waFormState.year && waFormState.month) {
        const activeYm = `${waFormState.year}-${waFormState.month}`;
        const mName = MONTH_NAMES[parseInt(waFormState.month, 10) - 1] || '';
        periodDesc = `Periode ${mName} ${waFormState.year}`;
        if (ledger.monthlyMap[activeYm]) {
            openingVal = ledger.monthlyMap[activeYm].openingBalance;
            pureInVal = ledger.monthlyMap[activeYm].pureIncome;
            outVal = ledger.monthlyMap[activeYm].expense;
            closingBalVal = ledger.monthlyMap[activeYm].closingBalance;
        }
    } else if (selectedMonth !== 'all') {
        const activeYm = `${selectedYear}-${selectedMonth}`;
        const mName = MONTH_NAMES[parseInt(selectedMonth, 10) - 1] || '';
        periodDesc = `Periode ${mName} ${selectedYear}`;
        if (ledger.monthlyMap[activeYm]) {
            openingVal = ledger.monthlyMap[activeYm].openingBalance;
            pureInVal = ledger.monthlyMap[activeYm].pureIncome;
            outVal = ledger.monthlyMap[activeYm].expense;
            closingBalVal = ledger.monthlyMap[activeYm].closingBalance;
        } else {
            openingVal = getEndingBalanceBeforePeriod(selectedYear, selectedMonth);
            closingBalVal = openingVal;
        }
    } else {
        const yearKeys = ledger.sortedKeys.filter(k => k.startsWith(`${selectedYear}-`));
        if (yearKeys.length > 0) {
            openingVal = ledger.monthlyMap[yearKeys[0]].openingBalance;
            yearKeys.forEach(k => {
                pureInVal += ledger.monthlyMap[k].pureIncome;
                outVal += ledger.monthlyMap[k].expense;
            });
            closingBalVal = ledger.monthlyMap[yearKeys[yearKeys.length - 1]].closingBalance;
        } else {
            openingVal = getEndingBalanceBeforePeriod(selectedYear, '01');
            closingBalVal = openingVal;
        }
    }

    const totalAvailVal = openingVal + pureInVal;
    const titleEl = document.getElementById('story-viewer-title');
    const subEl = document.getElementById('story-viewer-subtitle');
    const bodyEl = document.getElementById('story-viewer-body');

    if (currentStorySlide === 0) {
        titleEl.textContent = 'Posisi Saldo Kas Akhir';
        subEl.textContent = periodDesc;
        bodyEl.innerHTML = `
            <div class="text-center space-y-3">
                <div class="text-xs uppercase tracking-wider text-emerald-300 font-bold">Saldo Kas Akhir Real (Buku Kas Umum)</div>
                <div class="font-display font-extrabold text-3xl text-white">${formatRupiah(closingBalVal)}</div>
                <div class="p-3.5 rounded-2xl bg-white/10 text-left text-xs space-y-1.5">
                    <div class="flex justify-between"><span>Saldo Awal Periode:</span><span class="font-bold text-slate-200">${formatRupiah(openingVal)}</span></div>
                    <div class="flex justify-between"><span>Penerimaan Kas (+):</span><span class="font-bold text-emerald-300">+ ${formatRupiah(pureInVal)}</span></div>
                    <div class="border-t border-white/10 pt-1 flex justify-between text-slate-200"><span>Total Kas Tersedia:</span><span class="font-bold">${formatRupiah(totalAvailVal)}</span></div>
                    <div class="flex justify-between"><span>Pengeluaran Kas (-):</span><span class="font-bold text-amber-300">- ${formatRupiah(outVal)}</span></div>
                    <div class="border-t border-white/15 pt-1.5 flex justify-between font-bold text-emerald-300"><span>Saldo Kas Akhir Real:</span><span>${formatRupiah(closingBalVal)}</span></div>
                </div>
            </div>
        `;
    } else if (currentStorySlide === 1) {
        titleEl.textContent = 'Penerimaan Kas';
        subEl.textContent = periodDesc;
        bodyEl.innerHTML = `
            <div class="text-center space-y-3">
                <div class="text-xs uppercase tracking-wider text-sky-300 font-bold">Arus Kas Masuk (Cash Inflow)</div>
                <div class="font-display font-extrabold text-3xl text-white">${formatRupiah(pureInVal)}</div>
                <p class="text-xs text-slate-300 leading-relaxed">Total penerimaan infaq murni pada ${periodDesc} (di luar saldo awal ${formatRupiah(openingVal)}).</p>
            </div>
        `;
    } else if (currentStorySlide === 2) {
        titleEl.textContent = 'Pengeluaran Kas';
        subEl.textContent = periodDesc;
        bodyEl.innerHTML = `
            <div class="text-center space-y-3">
                <div class="text-xs uppercase tracking-wider text-amber-300 font-bold">Arus Kas Keluar (Cash Outflow)</div>
                <div class="font-display font-extrabold text-3xl text-white">${formatRupiah(outVal)}</div>
                <p class="text-xs text-slate-300 leading-relaxed">Total penyaluran belanja sembako dhuafa dan santunan sosial pada ${periodDesc}.</p>
            </div>
        `;
    } else {
        titleEl.textContent = 'Rasio Penyaluran Kas';
        subEl.textContent = periodDesc;
        const pct = totalAvailVal > 0 ? Math.round((outVal / totalAvailVal) * 100) : 0;
        bodyEl.innerHTML = `
            <div class="text-center space-y-3">
                <div class="font-display font-extrabold text-4xl text-emerald-400">${pct}%</div>
                <div class="text-xs font-bold text-white">Tersalurkan dari Total Kas Tersedia</div>
                <p class="text-xs text-slate-300 leading-relaxed">Dari total kas tersedia ${formatRupiah(totalAvailVal)}, tersalurkan ${formatRupiah(outVal)} sehingga saldo akhir kas berlanjut sebesar ${formatRupiah(closingBalVal)}.</p>
            </div>
        `;
    }
}

// --- STATISTIK & GRAFIK ---
function renderStatsView(year, month, periodLabel, ledger) {
    let displayCarry = 0;
    let displayIn = 0;
    let displayOut = 0;
    let displayClosing = 0;

    if (month !== 'all') {
        const activeYm = `${year}-${month}`;
        if (ledger.monthlyMap[activeYm]) {
            const mSum = ledger.monthlyMap[activeYm];
            displayCarry = mSum.openingBalance;
            displayIn = mSum.pureIncome;
            displayOut = mSum.expense;
            displayClosing = mSum.closingBalance;
        } else {
            displayCarry = getEndingBalanceBeforePeriod(year, month);
            displayClosing = displayCarry;
        }
    } else {
        const yearKeys = ledger.sortedKeys.filter(k => k.startsWith(`${year}-`));
        if (yearKeys.length > 0) {
            displayCarry = ledger.monthlyMap[yearKeys[0]].openingBalance;
            yearKeys.forEach(k => {
                displayIn += ledger.monthlyMap[k].pureIncome;
                displayOut += ledger.monthlyMap[k].expense;
            });
            displayClosing = ledger.monthlyMap[yearKeys[yearKeys.length - 1]].closingBalance;
        } else {
            displayCarry = getEndingBalanceBeforePeriod(year, '01');
            displayClosing = displayCarry;
        }
    }

    const totalAvail = displayCarry + displayIn;
    document.getElementById('stats-card-in').textContent = formatRupiah(displayIn);
    document.getElementById('stats-sub-in').textContent = `Saldo Awal: ${formatRupiah(displayCarry)} | Total Tersedia: ${formatRupiah(totalAvail)}`;
    document.getElementById('stats-card-out').textContent = formatRupiah(displayOut);
    document.getElementById('stats-sub-out').textContent = `Saldo Akhir Kas: ${formatRupiah(displayClosing)}`;
    document.getElementById('chart-year-label').textContent = year;
    document.getElementById('category-period-subtitle').textContent = `Periode ${periodLabel}`;

    const ratio = totalAvail > 0 ? Math.round((displayOut / totalAvail) * 100) : 0;
    document.getElementById('disbursement-ratio').textContent = `${ratio}% Tersalurkan`;

    const inData = Array(12).fill(0);
    const outData = Array(12).fill(0);
    for (let i = 0; i < 12; i++) {
        const mStr = String(i + 1).padStart(2, '0');
        const mSum = ledger.monthlyMap[`${year}-${mStr}`];
        if (mSum) {
            inData[i] = mSum.pureIncome;
            outData[i] = mSum.expense;
        }
    }

    const canvas = document.getElementById('monthlyChart');
    const fallbackBox = document.getElementById('fallback-bar-chart');

    if (window.Chart && canvas) {
        canvas.classList.remove('hidden');
        fallbackBox.classList.add('hidden');
        if (monthlyChartInstance) monthlyChartInstance.destroy();
        monthlyChartInstance = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                datasets: [
                    { label: 'Masuk', data: inData, backgroundColor: '#10b981', borderRadius: 4 },
                    { label: 'Salur', data: outData, backgroundColor: '#f59e0b', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    } else if (fallbackBox) {
        canvas.classList.add('hidden');
        fallbackBox.classList.remove('hidden');
        const maxVal = Math.max(1, ...inData, ...outData);
        fallbackBox.innerHTML = inData.map((v, i) => {
            const hIn = Math.round((v / maxVal) * 100);
            const hOut = Math.round((outData[i] / maxVal) * 100);
            return `
                <div class="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div class="w-full flex items-end gap-0.5 h-32">
                        <div class="flex-1 bg-emerald-500 rounded-t" style="height:${hIn}%"></div>
                        <div class="flex-1 bg-amber-500 rounded-t" style="height:${hOut}%"></div>
                    </div>
                    <span class="text-[9px] text-slate-500">${i + 1}</span>
                </div>
            `;
        }).join('');
    }

    const outMap = {};
    const filteredOuts = transactions.filter(t => {
        if (t.type !== 'out' || !t.tx_date) return false;
        if (month === 'all') return t.tx_date.startsWith(year);
        return t.tx_date.startsWith(`${year}-${month}`);
    });
    filteredOuts.forEach(t => {
        outMap[t.category] = (outMap[t.category] || 0) + (Number(t.amount) || 0);
    });

    const listBox = document.getElementById('category-breakdown-list');
    const entries = Object.entries(outMap).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
        listBox.innerHTML = '<div class="text-xs text-slate-400 text-center py-4">Belum ada data penyaluran pada periode ini.</div>';
    } else {
        listBox.innerHTML = entries.map(([cat, amt]) => {
            const pct = displayOut > 0 ? Math.round((amt / displayOut) * 100) : 0;
            return `
                <div>
                    <div class="flex justify-between text-xs mb-1">
                        <span class="font-bold text-slate-700">${escapeHtml(cat)}</span>
                        <span class="font-bold">${formatRupiah(amt)} (${pct}%)</span>
                    </div>
                    <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-600 rounded-full" style="width:${pct}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// --- HELPER UNTUK TEMA FOTO POSTER BERITA ---
function clearNewsImageState() {
    const dataEl = document.getElementById('news-image-data');
    const urlEl = document.getElementById('news-image-url');
    const inputEl = document.getElementById('news-image-input');
    const previewWrapper = document.getElementById('news-image-preview-wrapper');
    const previewImg = document.getElementById('news-image-preview');
    const btnRemove = document.getElementById('btn-remove-news-image');
    const btnText = document.getElementById('news-image-btn-text');

    if (dataEl) dataEl.value = '';
    if (urlEl) urlEl.value = '';
    if (inputEl) inputEl.value = '';
    if (previewImg) previewImg.src = '';
    if (previewWrapper) previewWrapper.classList.add('hidden');
    if (btnRemove) btnRemove.classList.add('hidden');
    if (btnText) btnText.textContent = 'Unggah Foto Poster';
}

function clearNewsImage() {
    clearNewsImageState();
    showToast('Foto poster dihapus, kembali menggunakan tema warna.', 'info');
}

function setNewsImagePreview(imgSrc) {
    const dataEl = document.getElementById('news-image-data');
    const previewWrapper = document.getElementById('news-image-preview-wrapper');
    const previewImg = document.getElementById('news-image-preview');
    const btnRemove = document.getElementById('btn-remove-news-image');
    const btnText = document.getElementById('news-image-btn-text');

    if (!imgSrc) {
        clearNewsImageState();
        return;
    }
    if (dataEl) dataEl.value = imgSrc;
    if (previewImg) previewImg.src = imgSrc;
    if (previewWrapper) previewWrapper.classList.remove('hidden');
    if (btnRemove) btnRemove.classList.remove('hidden');
    if (btnText) btnText.textContent = 'Ganti Foto Poster';
}

function handleNewsImageUrlInput(url) {
    const cleanUrl = (url || '').trim();
    if (cleanUrl) {
        setNewsImagePreview(cleanUrl);
    } else {
        clearNewsImageState();
    }
}

async function handleNewsImageSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Format file harus berupa gambar/foto.', 'error');
        return;
    }

    try {
        const compressedBase64 = await compressImageFile(file, 1080, 1080, 0.82);
        setNewsImagePreview(compressedBase64);
        const urlInput = document.getElementById('news-image-url');
        if (urlInput) urlInput.value = '';
        showToast('Foto berhasil dimuat untuk poster berita!', 'success');
    } catch (err) {
        showToast('Gagal memproses foto: ' + err.message, 'error');
    }
}

function compressImageFile(file, maxWidth = 1080, maxHeight = 1080, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;
                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// --- MODAL BERITA & PENGATURAN ADMIN ---
function openNewsModal(editId = null) {
    if (currentRole !== 'admin') return;
    const catSelect = document.getElementById('news-category');
    catSelect.innerHTML = CATEGORIES.news.map(c => `<option value="${c}">${c}</option>`).join('');

    if (editId) {
        const tx = transactions.find(t => String(t.id) === String(editId));
        if (!tx) return;
        document.getElementById('modal-news-title').textContent = 'Edit Berita Kegiatan';
        document.getElementById('news-id').value = tx.id;
        document.getElementById('news-title').value = tx.title;
        document.getElementById('news-description').value = tx.description;
        document.getElementById('news-date').value = tx.tx_date;
        document.getElementById('news-category').value = tx.category;
        document.getElementById('news-theme').value = tx.theme || 'emerald';

        const img = tx.image || '';
        if (img) {
            setNewsImagePreview(img);
            const urlInput = document.getElementById('news-image-url');
            if (urlInput && img.startsWith('http')) urlInput.value = img;
        } else {
            clearNewsImageState();
        }
    } else {
        document.getElementById('modal-news-title').textContent = 'Posting Berita Baru';
        document.getElementById('news-id').value = '';
        document.getElementById('news-form').reset();
        document.getElementById('news-date').value = new Date().toISOString().split('T')[0];
        clearNewsImageState();
    }

    document.getElementById('news-modal').classList.remove('hidden');
    document.getElementById('news-modal').classList.add('flex');
}

function closeNewsModal() {
    document.getElementById('news-modal').classList.add('hidden');
    document.getElementById('news-modal').classList.remove('flex');
}

async function handleSaveNews(e) {
    e.preventDefault();
    if (currentRole !== 'admin') return;

    const id = document.getElementById('news-id').value;
    const imageData = (document.getElementById('news-image-data')?.value || '').trim();
    const payload = {
        type: 'news',
        title: document.getElementById('news-title').value.trim(),
        description: document.getElementById('news-description').value.trim(),
        tx_date: document.getElementById('news-date').value,
        category: document.getElementById('news-category').value,
        theme: document.getElementById('news-theme').value,
        image: imageData || null,
        amount: 0
    };

    if (id) {
        const idx = transactions.findIndex(t => String(t.id) === String(id));
        if (idx !== -1) transactions[idx] = { ...transactions[idx], ...payload };
    } else {
        transactions.unshift({ id: 'local-news-' + Date.now(), ...payload, aamiin_count: 1 });
        if (isCloudConnected) {
            supabaseRestFetch('infaq_transactions', {
                method: 'POST',
                body: [{ ...payload, aamiin_count: 1 }]
            }).catch(() => {});
        }
    }

    saveLocalCache();
    closeNewsModal();
    refreshDashboard();
    showToast(id ? 'Berita kegiatan berhasil diperbarui!' : 'Berita kegiatan berhasil diterbitkan!', 'success');
}

function promptDeleteTransaction(id) {
    if (currentRole !== 'admin') return;
    pendingDeleteId = id;
    document.getElementById('delete-modal').classList.remove('hidden');
    document.getElementById('delete-modal').classList.add('flex');

    document.getElementById('confirm-delete-btn').onclick = () => {
        const target = String(pendingDeleteId);
        transactions = transactions.filter(t => String(t.id) !== target);
        saveLocalCache();
        closeDeleteModal();
        refreshDashboard();
        if (isCloudConnected && !target.startsWith('local-')) {
            supabaseRestFetch(`infaq_transactions?id=eq.${target}`, { method: 'DELETE' }).catch(() => {});
        }
        showToast('Postingan berhasil dihapus.', 'info');
    };
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    document.getElementById('delete-modal').classList.remove('flex');
}

function openSecurityModal() {
    if (currentRole !== 'admin') return;
    document.getElementById('set-sb-url').value = sbCredentials.url;
    document.getElementById('set-sb-key').value = sbCredentials.key;
    document.getElementById('set-org-name').value = appSettings.orgName;
    document.getElementById('set-org-handle').value = appSettings.orgHandle;
    document.getElementById('set-org-bio').value = appSettings.orgBio;
    document.getElementById('set-viewer-pin').value = appSettings.viewerPin;
    document.getElementById('set-admin-pin').value = appSettings.adminPin;

    const showFeedCheck = document.getElementById('set-show-feed-viewer');
    if (showFeedCheck) showFeedCheck.checked = appSettings.showFeedForViewer === true;
    const showQuickCheck = document.getElementById('set-show-quick-login');
    if (showQuickCheck) showQuickCheck.checked = appSettings.showQuickLogin !== false;

    document.getElementById('security-modal').classList.remove('hidden');
    document.getElementById('security-modal').classList.add('flex');
}

function closeSecurityModal() {
    document.getElementById('security-modal').classList.add('hidden');
    document.getElementById('security-modal').classList.remove('flex');
}

async function handleSaveSecuritySettings(e) {
    e.preventDefault();
    const newViewerPin = document.getElementById('set-viewer-pin').value.trim();
    const newAdminPin = document.getElementById('set-admin-pin').value.trim();

    if (!/^\d{6}$/.test(newViewerPin) || !/^\d{6}$/.test(newAdminPin)) {
        showToast('PIN wajib 6 digit angka!', 'error');
        return;
    }

    sbCredentials = {
        url: document.getElementById('set-sb-url').value.trim().replace(/\/+$/, ''),
        key: document.getElementById('set-sb-key').value.trim()
    };
    localStorage.setItem(STORAGE_KEYS.SB_CONFIG, JSON.stringify(sbCredentials));

    appSettings = {
        orgName: document.getElementById('set-org-name').value.trim(),
        orgHandle: document.getElementById('set-org-handle').value.trim().replace(/^@/, ''),
        orgBio: document.getElementById('set-org-bio').value.trim(),
        viewerPin: newViewerPin,
        adminPin: newAdminPin,
        showFeedForViewer: document.getElementById('set-show-feed-viewer') ? document.getElementById('set-show-feed-viewer').checked : false,
        showQuickLogin: document.getElementById('set-show-quick-login') ? document.getElementById('set-show-quick-login').checked : true
    };

    saveLocalCache();
    applySettingsToUI();
    closeSecurityModal();
    showToast('Pengaturan berhasil disimpan!', 'success');
}

function resetDemoData() {
    transactions = getDefaultDummyData();
    waReportsStore = getDefaultWaReports();
    saveLocalCache();
    closeSecurityModal();
    refreshDashboard();
    showToast('Data contoh dipulihkan.', 'info');
}

async function handleManualRefresh() {
    await syncInitialData(true);
}

function exportToCSV() {
    const rows = [['Tanggal', 'Jenis', 'Kategori', 'Judul', 'Nominal']];
    transactions.forEach(t => {
        rows.push([t.tx_date, t.type, `"${t.category}"`, `"${t.title}"`, t.amount || 0]);
    });
    const blob = new Blob(['\uFEFF' + rows.map(r => r.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Laporan_INFAQMU.csv';
    a.click();
}

function copyTextFallback(text, successMsg) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
        document.execCommand('copy');
        showToast(successMsg, 'success');
    } catch (e) {
        showToast('Gagal menyalin teks.', 'error');
    }
    document.body.removeChild(el);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bg = type === 'error' ? 'bg-rose-900 border-rose-500/40' : 'bg-slate-900 border-emerald-500/40';
    toast.className = `${bg} text-white px-4 py-2.5 rounded-full shadow-xl border text-xs font-semibold text-center transition-opacity duration-300`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}
