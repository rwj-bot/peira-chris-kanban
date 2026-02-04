'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priorityColors = {
    P1: 'bg-red-500 text-white',
    P2: 'bg-yellow-500 text-black',
    P3: 'bg-green-500 text-white',
  }

  const tagColors = {
    Unitus: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Book: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Product: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Personal: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-shadow',
        isDragging && 'opacity-50 shadow-lg'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
          {task.title}
        </h3>
        <span className={cn('text-xs font-bold px-2 py-1 rounded', priorityColors[task.priority])}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={cn('text-xs px-2 py-0.5 rounded', tagColors[tag as keyof typeof tagColors])}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {task.assignee && (
        <div className="flex items-center gap-1 mt-2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {task.assignee.charAt(0)}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">{task.assignee}</span>
        </div>
      )}

      <div className="flex gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
