'use client'

import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay as DragOverlayComponent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import KanbanColumn from './KanbanColumn'
import TaskForm from './TaskForm'
import QuickAddTask from './QuickAddTask'
import TaskCard from './TaskCard'
import { Task, TaskInsert, TaskUpdate, supabase } from '@/lib/supabase'

const COLUMNS = ['To Do', 'In Progress', 'Review', 'Done']

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedMode ? savedMode === 'true' : prefersDark
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  useEffect(() => {
    fetchTasks()

    // Set up real-time subscription
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        (payload) => {
          console.log('Real-time update:', payload)
          // Immediately fetch fresh data instead of waiting
          fetchTasks()
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as string

    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    // If dropping on a column
    if (COLUMNS.includes(newStatus) && task.status !== newStatus) {
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ status: newStatus as any, updated_at: new Date().toISOString() })
          .eq('id', taskId)

        if (error) throw error
        // Fetch immediately after update to ensure UI is in sync
        await fetchTasks()
      } catch (error) {
        console.error('Error updating task status:', error)
      }
    }
  }

  const handleQuickAdd = async (title: string) => {
    const newTask: TaskInsert = {
      title,
      description: null,
      assignee: null,
      priority: 'P2',
      tags: [],
      status: 'To Do',
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert(newTask)
        .select()
        .single()

      if (error) throw error
      // Fetch immediately after insert
      await fetchTasks()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleCreateTask = async (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    const newTask: TaskInsert = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .insert(newTask)

      if (error) throw error
      setShowForm(false)
      // Fetch immediately after insert
      await fetchTasks()
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdateTask = async (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingTask) return

    const updateData: TaskUpdate = {
      ...data,
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', editingTask.id)

      if (error) throw error
      setEditingTask(null)
      setShowForm(false)
      // Fetch immediately after update
      await fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      // Fetch immediately after delete
      await fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleSubmit = (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingTask) {
      handleUpdateTask(data)
    } else {
      handleCreateTask(data)
    }
  }

  const handleOpenForm = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mission Control</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track tasks and delegate work</p>
          </div>
          <div className="flex gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleOpenForm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              New Task
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <TaskForm
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
              task={editingTask || undefined}
            />
          </div>
        )}

        <QuickAddTask onAdd={handleQuickAdd} />

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {COLUMNS.map((column) => (
              <KanbanColumn
                key={column}
                title={column}
                tasks={tasks.filter(t => t.status === column)}
                onEdit={(task) => {
                  setEditingTask(task)
                  setShowForm(true)
                }}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <div className="rotate-3 scale-105 opacity-90">
                <TaskCard
                  task={activeTask}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
