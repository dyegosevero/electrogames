-- ══════════════════════════════════════════════════════════════
-- Electro Games — Migration inicial
-- ══════════════════════════════════════════════════════════════

-- ── SETTINGS ─────────────────────────────────────────────────
create table if not exists public.settings (
  key   text primary key,
  value text not null default ''
);

insert into public.settings (key, value) values
  ('whatsapp_phone',      '5500000000000'),
  ('webhook_url',         ''),
  ('footer_script',       ''),
  ('youtube_channel_url', 'https://www.youtube.com/@eletrogames.cwb')
on conflict (key) do nothing;

-- ── PRODUCTS ─────────────────────────────────────────────────
create table if not exists public.products (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  edition      text        not null default '',
  specs        text[]      not null default '{}',
  price        text        not null default '',
  installments text        not null default '',
  condition    text        not null default 'Novo',
  image_url    text        not null default '',
  buy_url      text        not null default '',
  active       boolean     not null default true,
  sort_order   integer     not null default 0,
  created_at   timestamptz not null default now()
);

insert into public.products (name, edition, specs, price, installments, condition, image_url, sort_order) values
  ('PlayStation 5',    'Edição Digital',      array['825GB SSD', '4K 120fps', 'DualSense incluso'], 'R$ 3.499', '12x R$ 291', 'Novo',     '/consoles/ps5.jpg',   0),
  ('Xbox Series X',    '1TB — Carbono Black', array['1TB SSD',   '4K 120fps', 'Game Pass Ready'],   'R$ 3.799', '12x R$ 316', 'Seminovo', '/consoles/xbox.jpg',  1),
  ('Nintendo Switch',  'OLED — Branco',       array['Tela OLED 7"', '64GB interno', 'Portátil + TV'], 'R$ 2.199', '12x R$ 183', 'Novo',  '/consoles/switch.jpg',2),
  ('PlayStation 4 Pro','1TB — Jet Black',     array['1TB HD',    '4K Upscale', '2 controles'],       'R$ 1.599', '12x R$ 133', 'Seminovo','/consoles/ps4.jpg',  3)
on conflict do nothing;

-- ── YOUTUBE VIDEOS ───────────────────────────────────────────
create table if not exists public.youtube_videos (
  id         uuid        primary key default gen_random_uuid(),
  video_id   text        not null,
  title      text        not null default '',
  active     boolean     not null default true,
  sort_order integer     not null default 0,
  created_at timestamptz not null default now()
);

-- ── RLS ──────────────────────────────────────────────────────
alter table public.settings        enable row level security;
alter table public.products        enable row level security;
alter table public.youtube_videos  enable row level security;

-- Leitura pública (site)
create policy "public_read_settings"
  on public.settings for select using (true);

create policy "public_read_products"
  on public.products for select using (true);

create policy "public_read_youtube"
  on public.youtube_videos for select using (true);

-- Escrita apenas para usuários autenticados (admin)
create policy "auth_write_settings"
  on public.settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "auth_write_products"
  on public.products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "auth_write_youtube"
  on public.youtube_videos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
