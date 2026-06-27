create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric not null default 0,
  stock_quantity integer not null default 0,
  description text,
  image_url text,
  is_available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint products_category_check check (
    category in ('Phone Accessories', 'Repair Tools', 'Spare Parts')
  )
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  source text default 'website',
  status text default 'new',
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;

create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.enquiries enable row level security;

drop policy if exists "Anyone can read available products" on public.products;
drop policy if exists "Authenticated admins can manage products" on public.products;
drop policy if exists "Anyone can insert enquiries" on public.enquiries;
drop policy if exists "Authenticated admins can read enquiries" on public.enquiries;
drop policy if exists "Authenticated admins can update enquiries" on public.enquiries;
drop policy if exists "Authenticated admins can delete enquiries" on public.enquiries;

create policy "Anyone can read available products"
on public.products
for select
using (is_available = true);

create policy "Authenticated admins can manage products"
on public.products
for all
to authenticated
using (true)
with check (true);

create policy "Anyone can insert enquiries"
on public.enquiries
for insert
to anon, authenticated
with check (true);

create policy "Authenticated admins can read enquiries"
on public.enquiries
for select
to authenticated
using (true);

create policy "Authenticated admins can update enquiries"
on public.enquiries
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated admins can delete enquiries"
on public.enquiries
for delete
to authenticated
using (true);
