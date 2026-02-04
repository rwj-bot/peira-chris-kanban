# Quick Start Guide

## 🚀 Deploy in 10 Minutes

### Step 1: GitHub (2 minutes)

```bash
# Add your GitHub repo (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/peira-chris-kanban.git
git push -u origin main
```

### Step 2: Supabase (3 minutes)

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Wait 2 minutes for setup
3. Go to **SQL Editor** → New Query
4. Copy `supabase/schema.sql` contents → Paste → **Run**
5. Go to **Settings** → **API** → Copy:
   - **Project URL**
   - **anon public key**

### Step 3: Vercel (3 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Continue with GitHub**
3. Import `peira-chris-kanban`
4. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Click **Deploy**

### Step 4: Create Users (2 minutes)

1. Go to Supabase → **Authentication** → **Users**
2. Click **Add User** → **Create New User**
3. Create Chris and Peira accounts
4. Share credentials with them

## ✅ Done!

You now have a live Kanban board at `https://peira-chris-kanban.vercel.app`

## 🎯 Next Steps

1. **Share the URL** with Chris and Peira
2. **Create some initial tasks** to test
3. **Connect a custom domain** (optional) - See DEPLOYMENT.md

## 📱 Test It

- Create tasks (New Task button)
- Quick add tasks (top bar)
- Drag tasks between columns
- Edit/delete tasks
- Toggle dark mode (top right)

## 📚 More Info

- **Full docs**: README.md
- **Deployment details**: DEPLOYMENT.md
- **Project summary**: SETUP_SUMMARY.md
