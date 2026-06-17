# VMT26 Registration Portal

A Vercel-ready registration portal for the VMT26 maimai tournament.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in:

```bash
POSTGRES_URL="..."
ADMIN_PASSWORD="..."
PAYMENT_INSTRUCTIONS="..."
```

3. Start the app:

```bash
npm run dev
```

The public portal is at `/`, the confirmation page is `/register/success`, and the organizer admin page is `/admin`.
Player registration starts at `/register`. After submitting details, players are sent to a TNG payment page where they upload a payment screenshot.

## Vercel Setup

1. Create a Vercel project from this repository.
2. Add Vercel Postgres to the project.
3. Set `ADMIN_PASSWORD` in Project Settings.
4. Optionally set `PAYMENT_INSTRUCTIONS`.
5. Deploy.

The app creates the `registrations` table automatically on first database use. The same schema is also available in `migrations/001_create_registrations.sql`.

## TNG QR

The payment page currently uses `public/tng-qr-placeholder.svg`. Replace that file with the real TNG QR image, or update the image path in `app/register/payment/[token]/page.tsx`.
