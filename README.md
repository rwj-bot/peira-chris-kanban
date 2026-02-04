# Peira & Chris Kanban Board

A modern, executive-level Kanban board for tracking tasks and delegating work. Built with Next.js 14+, TypeScript, Tailwind CSS, and Supabase.

## Features

- 📋 **Task Management**: Create, edit, and delete tasks with rich metadata
- 🎯 **Priority Levels**: P1 (High), P2 (Medium), P3 (Low) with color-coded tags
- 👥 **Assignees**: Assign tasks to Chris or Peira
- 🏷️ **Tags**: Organize tasks by category (Unitus, Book, Product, Personal)
- 🔄 **Drag & Drop**: Intuitive drag-and-drop interface between columns
- ⚡ **Quick Add**: Create tasks in 3 seconds with the quick-add feature
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Mobile-First**: Responsive design that works on all devices
- 🔄 **Real-Time Updates**: Automatic refresh when tasks change
- 🔐 **Authentication**: Simple email/password authentication via Supabase

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Drag & Drop**: @dnd-kit/core
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Vercel account (for deployment)

## Setup Instructions

### 1. Clone and Install

```bash
cd /path/to/your/projects
git clone <repository-url>
cd peira-chris-kanban
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor in your Supabase dashboard
3. Copy and execute the contents of `supabase/schema.sql`
4. Get your Supabase credentials:
   - Go to Project Settings → API
   - Copy the **Project URL** and **anon public key**

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Set Up Authentication (Optional but Recommended)

For a production app, you'll want to set up Supabase Auth:

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email settings (SMTP or use Supabase's built-in email)
4. Create user accounts for Chris and Peira in the **Users** section

## Deploying to Vercel

### Manual Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and log in
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### Automatic Deployment (Recommended)

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

Follow the prompts and add your environment variables when asked.

## Usage

### Creating a Task

1. Click **"New Task"** for a detailed task form
2. Or use the **Quick Add** bar for instant task creation

### Editing a Task

1. Click the **"Edit"** button on any task card
2. Modify the details as needed
3. Click **"Update Task"** to save changes

### Moving Tasks

1. Drag any task card to a different column
2. The status will update automatically

### Deleting a Task

1. Click the **"Delete"** button on any task card
2. Confirm the deletion

### Dark Mode

Click the sun/moon icon in the top right corner to toggle between light and dark themes.

## Database Schema

The `tasks` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier (auto-generated) |
| title | TEXT | Task title (required) |
| description | TEXT | Task description (optional) |
| assignee | TEXT | Assignee (Chris/Peira/null) |
| priority | TEXT | Priority level (P1/P2/P3) |
| tags | TEXT[] | Array of tags |
| status | TEXT | Current status (To Do/In Progress/Review/Done) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Development

### Project Structure

```
peira-chris-kanban/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── QuickAddTask.tsx
│   │   └── DarkModeToggle.tsx
│   └── lib/              # Utility functions
│       ├── supabase.ts   # Supabase client
│       └── utils.ts      # Utility functions
├── supabase/
│   └── schema.sql        # Database schema
├── .env.example          # Environment variables template
└── README.md            # This file
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Admin Credentials (Testing)

For initial testing, create test users in Supabase:

1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Click **"Add User"** → **"Create New User"**
3. Create users for Chris and Peira with temporary passwords
4. Have them change passwords on first login

## Custom Domain

To connect a custom domain:

1. In Vercel, go to **Settings** → **Domains**
2. Add your domain (e.g., `kanban.yourdomain.com`)
3. Follow the DNS instructions provided
4. Wait for SSL certificate provisioning (usually 5-10 minutes)

## Troubleshooting

### Tasks not loading

- Check your environment variables are set correctly
- Verify Supabase project URL and anon key
- Check browser console for errors

### Real-time updates not working

- Ensure Row Level Security (RLS) policies are set up correctly
- Check Supabase Dashboard → **Realtime** to ensure subscriptions are enabled

### Authentication issues

- Verify Email provider is enabled in Supabase Auth settings
- Check email delivery logs in Supabase Dashboard
- Ensure RLS policies allow authenticated users

## License

MIT

## Support

For issues or questions, please contact the development team.
