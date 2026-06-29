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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read product images" on storage.objects;
drop policy if exists "Authenticated users can upload product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;

create policy "Public can read product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
);

create policy "Authenticated users can update product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
)
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
);

create policy "Authenticated users can delete product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
);
