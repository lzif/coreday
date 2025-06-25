import Dexie, { type Table } from "dexie";
import type {
  FinanceData,
  TaskData,
  ProjectData,
  HabitData,
  SavingData,
  NoteData,
  BaseItem,
} from "$lib/types/coreday";

export type FinanceItem = BaseItem<"finance", FinanceData>;
export type TaskItem = BaseItem<"task", TaskData>;
export type ProjectItem = BaseItem<"project", ProjectData>;
export type HabitItem = BaseItem<"habit", HabitData>;
export type SavingItem = BaseItem<"saving", SavingData>;
export type NoteItem = BaseItem<"note", NoteData>;
export type JournalItem = BaseItem<"journal", NoteData>

class AppDB extends Dexie {
  finance!: Table<FinanceItem, string>;
  task!: Table<TaskItem, string>;
  project!: Table<ProjectItem, string>;
  habit!: Table<HabitItem, string>;
  saving!: Table<SavingItem, string>;
  note!: Table<NoteItem, string>;
  journal!: Table<JournalItem, string>;
  constructor() {
    super("app");
    this.version(1).stores({
      finance: "id, updatedAt",
      task: "id, updatedAt",
      project: "id, updatedAt",
      habit: "id, updatedAt",
      saving: "id, updatedAt",
      note: "id, updatedAt",
      journal: "id, updatedAt",
    });
  }
}

export const db = new AppDB();
