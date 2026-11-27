-- Jalankan sekali di Supabase SQL Editor agar perubahan tabel aplikasi
-- dan data modul lokal dapat disimpan bersama serta disiarkan ke browser.
alter table public.infaq_settings
    add column if not exists show_feed_for_viewer boolean,
    add column if not exists show_quick_login boolean,
    add column if not exists wa_reports_data jsonb,
    add column if not exists takziah_data jsonb,
    add column if not exists jurnal_kas_data jsonb;

-- Segarkan cache PostgREST supaya kolom baru langsung dikenali oleh API.
notify pgrst, 'reload schema';

do $$
begin
    if not exists (
        select 1
        from pg_publication
        where pubname = 'supabase_realtime'
    ) then
        execute 'create publication supabase_realtime';
    end if;

    if not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = 'infaq_transactions'
    ) then
        execute 'alter publication supabase_realtime add table public.infaq_transactions';
    end if;

    if not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = 'infaq_settings'
    ) then
        execute 'alter publication supabase_realtime add table public.infaq_settings';
    end if;
end
$$;
