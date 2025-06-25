import { writable } from "svelte/store";
import type { Table } from "dexie";
import type { BaseItem, ItemType } from "$lib/types/coreday";
import { nanoid } from "nanoid";

export function createStore<T extends ItemType, D>(
  table: Table<BaseItem<T, D>, string>,
) {
  const { subscribe, set, update } = writable<BaseItem<T, D>[]>([]);

  async function load() {
    const all = await table.toArray();
    set(all);
  }

  async function add(type: T, data: D) {
    const item: BaseItem<T, D> = {
      id: nanoid(),
      type,
      data,
      updatedAt: Date.now(),
    };
    await table.put(item);
    update((state) => [...state, item]);
  }

  async function updateItem(id: string, patch: Partial<BaseItem<T, D>>) {
    const existing = await table.get(id);
    if (!existing) return;

    const updated: BaseItem<T, D> = {
      ...existing,
      ...patch,
      data: { ...existing.data, ...(patch.data ?? {}) },
      updatedAt: Date.now(),
    };

    await table.put(updated);
    update((state) => state.map((i) => (i.id === id ? updated : i)));
  }

  async function remove(id: string) {
    await table.delete(id);
    update((state) => state.filter((i) => i.id !== id));
  }

  load();

  return {
    subscribe,
    add,
    updateItem,
    remove,
    reload: load,
  };
}
