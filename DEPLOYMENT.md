# Deployment Guide

This guide will walk you through deploying the Peira & Chris Kanban Board to Vercel and pushing to GitHub.

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `peira-chris-kanban` (or your preferred name)
3. Make it **Private** for personal use or **Public** if you want to share
4. Click **Create repository**
5. Copy the repository URL (e.g., `https://github.com/username/peira-chris-kanban.git`)

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
cd /home/gc_jonesy/.openclaw/workspace/projects/peira-chris-kanban

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/peira-chris-kanban.git

# Push to GitHub
git push -u origin main
```

If you need to use SSH instead of HTTPS:

```bash
git remote set-url origin git@github.com:YOUR_USERNAME/peira-chris-kanban.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Continue with GitHub"** and authorize Vercel
3. Import the `peira-chris-kanban` repository
4. Configure the project:

   **Framework Preset**: Next.js

   **Environment Variables**:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. Click **Deploy**

The deployment will take 1-2 minutes. Once complete, you'll get a Vercel URL like:
`https://peira-chris-kanban.vercel.app`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
cd /home/gc_jonesy/.openclaw/workspace/projects/peira-chris-kanban
vercel
```

4. Follow the prompts:
   - Link to existing project? No
   - Project name: `peira-chris-kanban`
   - Directory: `.`
   - Override settings? Yes
   - Add environment variables when prompted

5. Deploy to production:

```bash
vercel --prod
```

## Step 4: Set Up Supabase (If Not Already Done)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for project to be ready (~2 minutes)
3. Navigate to **SQL Editor** in your Supabase dashboard
4. Create a new query and paste the contents of `supabase/schema.sql`
5. Click **Run** to execute the schema
6. Get your credentials:
   - Go to **Project Settings** → **API**
   - Copy **Project URL** and **anon public key**
7. Update your Vercel environment variables with these values

## Step 5: Configure Custom Domain (Optional)

### Via Vercel Dashboard

1. Go to your project on Vercel
2. Navigate to **Settings** → **Domains**
3. Add your domain (e.g., `kanban.yourdomain.com`)
4. Follow the DNS instructions:

   **If using a subdomain:**
   ```
   Type: CNAME
   Name: kanban
   Value: cname.vercel-dns.com
   ```

   **If using a root domain:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

5. Wait for DNS propagation (5-10 minutes)
6. Wait for SSL certificate provisioning (5-10 minutes)

### Via Vercel CLI

```bash
vercel domains add kanban.yourdomain.com
```

## Step 6: Set Up Authentication Users

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add User"** → **"Create New User"**
4. Create users for Chris and Peira:

   ```
   Email: chris@yourdomain.com
   Password: [temporary password]
   Auto Confirm User: Yes
   ```

   ```
   Email: peira@yourdomain.com
   Password: [temporary password]
   Auto Confirm User: Yes
   ```

5. Share the credentials with Chris and Peira
6. Have them change their passwords on first login

## Step 7: Test the Application

1. Visit your Vercel URL (or custom domain)
2. Try creating a task:
   - Use the "New Task" button for a detailed task
   - Use the Quick Add bar for instant tasks
3. Test drag-and-drop between columns
4. Test editing and deleting tasks
5. Toggle dark mode
6. Test on mobile devices

## Step 8: Set Up Team Access (Optional)

If you want Chris and Peira to have direct access to the Vercel project:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Team**
3. Click **"Invite"**
4. Enter their email addresses
5. Assign roles:
   - **Owner** (only you)
   - **Developer** (Chris and Peira)

## Post-Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel deployment successful
- [ ] Supabase database schema installed
- [ ] Environment variables configured
- [ ] Custom domain configured (if applicable)
- [ ] Authentication users created
- [ ] Team members invited to Vercel (if applicable)
- [ ] Application tested on multiple devices
- [ ] Dark mode tested
- [ ] Real-time updates verified

## Monitoring

### Vercel Dashboard

- Monitor deployments at: `vercel.com/dashboard`
- View logs, analytics, and performance metrics

### Supabase Dashboard

- Monitor database queries at Supabase Dashboard
- View auth logs and user activity
- Check real-time subscription status

## Troubleshooting

### Deployment Failed

Check the build logs in Vercel. Common issues:
- Missing environment variables
- Build timeout (increase limit in Vercel settings)
- Dependency conflicts

### Environment Variables Not Working

1. Verify variables are set in Vercel Dashboard
2. Restart the deployment after adding variables
3. Check variable names match exactly (case-sensitive)

### Supabase Connection Issues

1. Verify Supabase project URL and anon key
2. Check Row Level Security (RLS) policies
3. Ensure `tasks` table exists and is accessible

### Real-time Not Working

1. Go to Supabase Dashboard → **Realtime**
2. Ensure "tasks" table is enabled for replication
3. Check browser console for subscription errors

## Support

For issues:
- Check the [Vercel documentation](https://vercel.com/docs)
- Check the [Supabase documentation](https://supabase.com/docs)
- Review the [README.md](README.md) for additional information

## Next Steps

1. **Share the URL** with Chris and Peira
2. **Set up team accounts** in Supabase Auth
3. **Create initial tasks** for your workflow
4. **Customize the app** as needed (colors, layout, etc.)
5. **Set up regular backups** of the Supabase database

Enjoy your new Kanban board! 🎉
