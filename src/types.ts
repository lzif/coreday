export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  subtasks: SubTask[];
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDates: string[]; // ISO date strings YYYY-MM-DD
}

export interface MoodEntry {
  id: string;
  date: string; // ISO date string
  rating: 1 | 2 | 3 | 4 | 5; // 1 (Bad) to 5 (Great)
  note: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Identifier for icon rendering
}

export interface GamificationState {
  xp: number;
  level: number;
  unlockedBadges: string[];
}

export interface AppState {
  transactions: Transaction[];
  tasks: Task[];
  habits: Habit[];
  moods: MoodEntry[];
  savingsGoal: {
    target: number;
    current: number;
    name: string;
  };
  notes: string;
  gamification: GamificationState;
}

export const INITIAL_STATE: AppState = {
  transactions: [],
  tasks: [],
  habits: [],
  moods: [],
  savingsGoal: { target: 1000, current: 0, name: "New Laptop" },
  notes: "# My Journal\n\nStart writing here...",
  gamification: {
    xp: 0,
    level: 1,
    unlockedBadges: []
  }
};