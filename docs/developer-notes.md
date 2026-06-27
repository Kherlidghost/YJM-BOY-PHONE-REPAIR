# Developer Notes

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Database
- Supabase Storage
- Zod
- Lucide React
- Framer Motion

## Folder Structure

- `src/app` - App Router pages and routes
- `src/actions` - Server actions
- `src/components` - Public UI components
- `src/components/admin` - Admin UI components
- `src/lib` - Shared data, helpers, types, Supabase utilities
- `src/lib/supabase` - Supabase client/server/middleware/upload helpers
- `src/lib/validations` - Zod schemas
- `supabase` - Database schema and storage notes
- `docs` - Project documentation and launch checklists

## Public Routes

- `/`
- `/phone-repair`
- `/accessories`
- `/repair-tools`
- `/spare-parts`
- `/products/[id]`
- `/about`
- `/contact`

## Admin Routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/enquiries`
- `/admin/analytics`

Admin routes are protected by `src/middleware.ts` and `src/lib/supabase/middleware.ts`.

## Supabase Tables

### `products`

Main fields:

- `id`
- `name`
- `category`
- `price`
- `stock_quantity`
- `description`
- `image_url`
- `is_available`
- `created_at`
- `updated_at`

Allowed categories:

- `Phone Accessories`
- `Repair Tools`
- `Spare Parts`

### `enquiries`

Main fields:

- `id`
- `name`
- `phone`
- `message`
- `source`
- `status`
- `created_at`

Allowed statuses used by the app:

- `new`
- `contacted`
- `closed`

## Storage Bucket

Bucket name:

```text
product-images
```

Purpose:

- Stores public product images.
- Admin users upload images from product forms.
- Public pages read product images through public URLs.

See `supabase/storage.md` for setup notes.

## Environment Variables

Required:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Local development uses `.env.local`.

Vercel deployment must include both variables in Project Settings.

## Deployment Notes

Before deployment:

1. Apply `supabase/schema.sql`.
2. Create the `product-images` bucket.
3. Create an admin user in Supabase Auth.
4. Add environment variables to Vercel.
5. Run:

```bash
npm run build
```

## Commands

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Scope Notes

The app intentionally does not include:

- Repair job management
- Repair tickets
- Repair tracking
- Customer repair status
- Payments
- Custom authentication roles

Keep future changes inside the current product catalog, enquiries, and public website scope unless a new project phase is approved.
