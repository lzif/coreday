export type ItemType =
  | 'finance'
  | 'task'
  | 'project'
  | 'habit'
  | 'saving'
  | 'note'
  | 'journal'

export interface BaseItem<T extends ItemType, D> {
  id: string
  type: T
  data: D
  updatedAt: number
}

// Finance
export interface FinanceData {
  kind: 'income' | 'expense'
  amount: number
  category: string
  date: string // ISO
  note?: string
  linkedSavingId?: string
}

// Task / Project
export interface TaskData {
  title: string
  done: boolean
  deadline?: string
  priority?: 'low' | 'medium' | 'high'
  subtasks?: TaskData[]
}

export interface ProjectData {
  title: string
  tasks: TaskData[]
  deadline?: string
}

// Habit
export interface HabitData {
  title: string
  schedule: 'daily' | 'weekly'
  history: string[] // ISO date string list
  reminderTime?: string
}

// Saving
export interface SavingData {
  title: string
  targetAmount: number
  currentAmount: number
  linkedIncomeIds?: string[]
}

// Note / Journal
export interface NoteData {
  title: string
  content: string // markdown
  tags?: string[]
  pinned?: boolean
  createdAt: string
}
