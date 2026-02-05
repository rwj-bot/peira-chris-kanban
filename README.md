# Peira-Chris Kanban Board

A custom Kanban board for Chris Jones and Peira (your Über Chief of Staff) to track tasks, delegate work, and stay organized.

**Status:** ✅ Built — Ready for deployment
**GitHub:** https://github.com/rwj-bot/peira-chris-kanban
**Deployment Guide:** See `DEPLOY_FOR_CHRIS.md` (updated February 5, 2026)

---

## Features

- **Task Management:** Create, edit, delete, move tasks between columns
- **Assignees:** Assign tasks to Chris or Peira
- **Priorities:** P1 (red), P2 (yellow), P3 (green)
- **Tags:** Unitus, Book, Product/App, Personal
- **Status:** To Do, In Progress, Review, Done
- **Real-time:** Live updates via Supabase subscriptions
- **Mobile-first:** Responsive design optimized for phone/tablet
- **Dark/Light Mode:** Toggle in top right
- **Quick Add:** 3-second task creation from top bar

---

## Tech Stack

- **Frontend:** Next.js 16.1.6 + TypeScript + Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL database, Auth, Real-time subscriptions)
- **Drag & Drop:** @dnd-kit for smooth card movement
- **Deployment:** Vercel (auto-deploys from Git)
- **Authentication:** Email/password (simple for now, upgradable to OAuth)

---

## Getting Started

### Quick Start (10 minutes)

1. **Set up Supabase** — Create project, run schema SQL, get credentials (5 minutes)
   - See `DEPLOY_FOR_CHRIS.md` for detailed instructions

2. **Create Users** — Create Chris and Peira accounts in Supabase Auth (2 minutes)

3. **Deploy to Vercel** — Import GitHub repo, add environment variables, deploy (5 minutes)

4. **Test It** — Open live URL, create tasks, drag between columns (2 minutes)

### First Time Setup

If this is your first deployment, follow the complete guide in `DEPLOY_FOR_CHRIS.md`. Everything you need is there.

### Already Have It Running?

- Open your live Vercel URL (you'll create it during deployment)
- Log in with your Chris or Peira account
- Start creating and managing tasks!

---

## Usage

### Creating Tasks

1. Click **"New Task"** in the top bar
2. Enter task title
3. Optionally add description
4. Select priority (P1/P2/P3)
5. Select assignee (Chris/Peira)
6. Select tags (optional)
7. Click **"Create"**

### Managing Tasks

- **Drag and drop** tasks between columns (To Do, In Progress, Review, Done)
- **Click task** to edit, delete, or change priority
- **Filter** by assignee or priority (coming soon)

### Real-time Collaboration

- When Chris creates a task, Peira sees it immediately (and vice versa)
- No page refresh needed — live updates via Supabase subscriptions

---

## Project Files

- `README.md` — This file
- `DEPLOY_FOR_CHRIS.md` — Complete deployment guide
- `DEPLOYMENT.md` — Original deployment documentation
- `QUICK_START.md` — Quick 10-minute deployment summary
- `SETUP_SUMMARY.md` — Project overview
- `DELIVERY_SUMMARY.md` — Original delivery summary
- `supabase/schema.sql` — Database schema
- `.env.example` — Environment variable template

---

## Customization

Want to change colors, add features, or modify the workflow? This is your project! The code is clean, documented, and ready for you to extend.

---

**Built by:** Peira (Über Chief of Staff) 🦊
**Date:** February 4-5, 2026
