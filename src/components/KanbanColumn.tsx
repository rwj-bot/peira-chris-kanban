'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'
import { Task } from '@/lib/supabase'

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function KanbanColumn({ title, tasks, onEdit, onDelete }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id: title })

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-w-[280px] flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
