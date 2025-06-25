import { db } from "$lib/db/app";
import { createStore } from "./factory";
import type {
  FinanceData,
  TaskData,
  ProjectData,
  HabitData,
  SavingData,
  NoteData,
} from "$lib/types/coreday";

export const financeStore = createStore<"finance", FinanceData>(db.finance);
export const taskStore = createStore<"task", TaskData>(db.task);
export const projectStore = createStore<"project", ProjectData>(db.project);
export const habitStore = createStore<"habit", HabitData>(db.habit);
export const savingStore = createStore<"saving", SavingData>(db.saving);
export const noteStore = createStore<"note", NoteData>(db.note);
export const journalStore = createStore<"journal", NoteData>(db.journal);
