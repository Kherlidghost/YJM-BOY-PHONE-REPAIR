# YJM BOY Phone Repair and Accessories

Professional business website and admin catalog system for **YJM BOY PHONE REPAIR AND ACCESSORIES** in Biu, Borno State, Nigeria.

## Features

- Premium public landing website
- Public product catalog for phone accessories, repair tools, and spare parts
- Product search, filtering, sorting, detail pages, and WhatsApp ordering
- Public customer enquiry form
- Supabase Auth admin login
- Protected admin dashboard
- Product management with image upload, inventory controls, and availability toggles
- Customer enquiry management with status updates and WhatsApp follow-up
- Basic admin analytics
- SEO metadata, sitemap, and robots support

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Database
- Supabase Storage
- Zod validation
- Lucide React icons
- Framer Motion

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.local.example .env.local
```

Add your Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run the SQL in `supabase/schema.sql`.
4. Create a public storage bucket named `product-images`.
5. Follow the storage notes in `supabase/storage.md`.
6. Create an admin user in Supabase Auth.
7. Add the Supabase URL and anon key to `.env.local` locally and to Vercel environment variables for deployment.

## Vercel Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Keep the default build command:

```bash
npm run build
```

5. Keep the default output settings for Next.js.
6. Deploy.

## Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema applied from `supabase/schema.sql`
- [ ] Storage bucket `product-images` created
- [ ] Storage bucket configured for public product image reads
- [ ] Admin user created in Supabase Auth
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] `npm run build` passes locally
- [ ] Public pages load correctly
- [ ] Admin login works
- [ ] Product create/edit/delete works
- [ ] Product image upload works
- [ ] Customer enquiry form works

## Important Scope

This project does not include repair job management, repair tickets, repair tracking, customer repair status, payments, or user roles.
