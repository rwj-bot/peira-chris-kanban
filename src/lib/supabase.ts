import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          assignee: string | null
          priority: 'P1' | 'P2' | 'P3'
          tags: string[] | null
          status: 'To Do' | 'In Progress' | 'Review' | 'Done'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          assignee?: string | null
          priority?: 'P1' | 'P2' | 'P3'
          tags?: string[] | null
          status?: 'To Do' | 'In Progress' | 'Review' | 'Done'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          assignee?: string | null
          priority?: 'P1' | 'P2' | 'P3'
          tags?: string[] | null
          status?: 'To Do' | 'In Progress' | 'Review' | 'Done'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Task = Database['public']['Tables']['tasks']['Row']
export type TaskInsert = Database['public']['Tables']['tasks']['Insert']
export type TaskUpdate = Database['public']['Tables']['tasks']['Update']
