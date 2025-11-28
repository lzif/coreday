import { persistentStore } from './persistence.js';
import { v4 as uuidv4 } from 'uuid';

// Default Layout
const defaultLayout = [
  { id: uuidv4(), type: 'finance', title: 'Finance' },
  { id: uuidv4(), type: 'tasks', title: 'Tasks' },
  { id: uuidv4(), type: 'habits', title: 'Habits' },
  { id: uuidv4(), type: 'savings', title: 'Savings' },
  { id: uuidv4(), type: 'notes', title: 'Notes' },
  { id: uuidv4(), type: 'mood', title: 'Mood Tracker' },
  { id: uuidv4(), type: 'pomodoro', title: 'Pomodoro' },
];

export const widgetsLayout = persistentStore('coreday_layout', defaultLayout);

// Finance Store
export const finance = persistentStore('coreday_finance', {
  balance: 0,
  transactions: [] // { id, type: 'income' | 'expense', amount, category, date }
});

// Tasks Store
export const tasks = persistentStore('coreday_tasks', [
  // { id, text, completed: boolean, date }
]);

// Habits Store
export const habits = persistentStore('coreday_habits', [
  // { id, name, streak: number, history: { [date]: boolean } }
]);

// Savings Store
export const savings = persistentStore('coreday_savings', [
  // { id, name, target, current }
]);

// Notes Store
export const notes = persistentStore('coreday_notes', [
  // { id, content, tags: [], pinned: boolean, updatedAt }
]);

// Mood Store
export const mood = persistentStore('coreday_mood', [
  // { id, mood: 'happy'|'neutral'|'sad', note, date }
]);
