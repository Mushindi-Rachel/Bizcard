<<<<<<< HEAD
# Bizcard
A business card generator
=======
# CardCraft – Business Card Generator

A full-stack Next.js app for generating professional business cards with QR codes.

**Stack:** Next.js 14 · Clerk Auth · Neon (Postgres) · Tailwind CSS · Vercel

---

## Local Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Clerk
1. Go to [clerk.com](https://clerk.com) → create a new app
2. Copy your API keys from the Clerk dashboard
3. Copy `.env.local.example` → `.env.local` and fill in your Clerk keys

### 3. Set up Neon (Postgres)
1. Go to [neon.tech](https://neon.tech) → create a new project
2. Open the **SQL Editor** and run the contents of `sql/schema.sql`
3. Copy your connection string and add it as `DATABASE_URL` in `.env.local`

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USER/bizcard-generator.git
git push -u origin main
```

### 2. Import in Vercel
1. Go to [vercel.com/new](https://vercel.com/new) → Import your GitHub repo
2. Add all environment variables from `.env.local` in the Vercel project settings
3. Click **Deploy**

### 3. Add Vercel URL to Clerk
In Clerk dashboard → **Domains** → add your `https://your-app.vercel.app` domain

---

## Features
- 🔐 Auth with Clerk (email/social login)
- 🎨 5 card templates (Classic, Modern, Minimal, Bold, Elegant)
- 📱 Auto QR code generation (vCard format)
- ⬇️ Download as PNG (3× resolution, print-ready)
- 💾 Save, edit, delete cards — stored in Neon Postgres
- 👁 Live preview while editing

## Project Structure
```
app/
  page.tsx              # Landing page
  dashboard/            # User dashboard
  cards/
    new/                # Create card
    [id]/               # View card + download
    [id]/edit/          # Edit card
  api/cards/            # REST API (GET, POST, PATCH, DELETE)
components/
  templates/
    CardPreview.tsx     # Card visual (used for preview & PNG export)
    CardForm.tsx        # Create/edit form with live preview
  ui/
    CardListItem.tsx    # Dashboard card row
lib/
  db.ts                 # Neon SQL client
  types.ts              # Shared types
sql/
  schema.sql            # Run once in Neon SQL editor
```
>>>>>>> 26f5bd3 (first commit)
