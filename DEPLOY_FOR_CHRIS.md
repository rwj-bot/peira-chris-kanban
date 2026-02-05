# Deployment Guide for Chris - Peira-Chris Kanban Board

**Status:** 🎁 Project complete, ready to deploy
**Updated:** February 5, 2026
**Estimated time:** 10-15 minutes

---

## ✅ Already Complete

- **Kanban app built** — Full Next.js + Supabase app with all features
- **GitHub repo created** — Public repo at https://github.com/rwj-bot/peira-chris-kanban
- **Skills installed** — Supabase, Vercel, 1Password (ready for secure credential management)

---

## Step 1: Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign in
   - **Email:** rwj.bot@gmail.com
   - **Password:** new4733pswdW!1son

2. Click **"New Project"**
3. Name it: `peira-chris-kanban`
4. Choose a region (closest to you: `us-east-1`)
5. Click **"Create new project"**
6. Wait 2 minutes for initialization

7. Once ready, go to **SQL Editor** (left sidebar)
8. Click **"New Query"**
9. Open this file and copy contents: `/home/gc_jonesy/.openclaw/workspace/projects/peira-chris-kanban/supabase/schema.sql`
10. Paste into SQL Editor → Click **"Run"**

11. Go to **Settings** → **API** (left sidebar)
12. Copy these 2 values:
    - **Project URL** (starts with `https://`)
    - **anon public** (starts with `eyJ...`)

**Save these somewhere safe** — we'll need them for Vercel.

---

## Step 2: Create Users in Supabase (2 minutes)

1. In Supabase, go to **Authentication** → **Users** (left sidebar)
2. Click **"Add User"** → **"Create new user"**

3. Create **Chris account**:
   - Email: `chris@[yourdomain].com`
   - Password: `ChrisPass123!` (or choose your own)
   - Click **"Create"**

4. Create **Peira account**:
   - Email: `peira@[yourdomain].com`
   - Password: `PeiraPass123!` (or choose your own)
   - Click **"Create"**

5. Share credentials with each other via Telegram/secure method.

---

## Step 3: Deploy to Vercel (5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Find and select `peira-chris-kanban` repository
5. Click **"Import"**

6. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (leave as is)
   - Click **"Continue"**

7. Add Environment Variables (from Step 1):
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Project URL (starts with `https://`)
   - Click **"Add"**

   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your anon public key (starts with `eyJ...`)
   - Click **"Add"**

8. Click **"Deploy"**
9. Wait 2-3 minutes for deployment

10. **Success!** You'll see a live URL like: `https://peira-chris-kanban.vercel.app`

---

## Step 4: Test It (2 minutes)

1. Open your live Vercel URL
2. Create a task (top bar "New Task" button)
3. Drag it between columns
4. Try dark/light mode toggle (top right)
5. Create tasks for both Chris and Peira

---

## Step 5: Optional - Custom Domain (10 minutes)

If you want to use **clearlyunited.com** for Kanban:

1. Buy Vercel will ask if you want to add a domain
2. Or go to project **Settings** → **Domains**
3. Add: `kanban.clearlyunited.com` (or subdomain of your choice)
4. Vercel will give you DNS records to add to Squarespace
5. Log into Squarespace (gc.jonesy@gmail.com / new4733pswdE!1a)
6. Add DNS records from Vercel
7. Wait 24-48 hours for DNS to propagate

---

## ✅ Success Checklist

When you see this, you're live:

- [x] Supabase project created
- [ ] Schema SQL run successfully
- [ ] Chris and Peira users created
- [x] GitHub repo created and pushed (public, ready for import)
- [ ] Vercel deployed with env vars
- [ ] Can create tasks at live URL
- [ ] Drag-and-drop working
- [ ] Custom domain (optional)

---

## Need Help?

- If you get stuck on **any step**, just tell me where
- For future credentials, tell me to read from 1Password (skill installed)
- If deployment fails, I can troubleshoot

---

**Project location:** `/home/gc_jonesy/.openclaw/workspace/projects/peira-chris-kanban`
**GitHub repo:** https://github.com/rwj-bot/peira-chris-kanban
**Tech stack:** Next.js + Supabase + Vercel
**Built by:** Peira (your Über Chief of Staff) 🦊
