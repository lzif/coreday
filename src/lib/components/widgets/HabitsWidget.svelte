<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { habits } from '../../../stores/appStores.js';
  import { Plus, Flame } from 'lucide-svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { Target } from 'lucide-svelte';

  export let title;
  export let startDrag;

  let newHabitName = '';
  let showInput = false;

  function addHabit() {
    if (!newHabitName.trim()) return;

    habits.update(curr => [
      ...curr,
      { id: uuidv4(), name: newHabitName, streak: 0, completedToday: false }
    ]);

    newHabitName = '';
    showInput = false;
  }

  function toggleHabit(id) {
    habits.update(curr => curr.map(h => {
      if (h.id === id) {
        const isCompleted = !h.completedToday;
        return {
          ...h,
          completedToday: isCompleted,
          streak: isCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
        };
      }
      return h;
    }));
  }
</script>

<WidgetContainer {title} {startDrag}>
  <div class="flex flex-col h-full">
    {#if showInput}
      <div class="mb-4 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
        <input 
          type="text" 
          bind:value={newHabitName}
          placeholder="New habit..." 
          class="flex-1 bg-white/50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          onkeydown={(e) => e.key === 'Enter' && addHabit()}
        />
        <button class="text-sm bg-blue-500 text-white px-3 rounded-lg" onclick={addHabit}>Add</button>
      </div>
    {:else}
      <button 
        class="mb-4 text-xs font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 self-start"
        onclick={() => showInput = true}
      >
        <Plus size={14} /> Add Habit
      </button>
    {/if}

    <div class="flex-1 overflow-y-auto no-scrollbar space-y-3">
      {#each $habits as habit (habit.id)}
        <div class="flex items-center justify-between p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-colors">
          <div class="flex items-center gap-3">
            <button 
              class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
              {habit.completedToday ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'}"
              onclick={() => toggleHabit(habit.id)}
            >
              {#if habit.completedToday}
                <div class="w-2 h-2 bg-white rounded-full"></div>
              {/if}
            </button>
            <span class="text-sm font-medium text-gray-700 {habit.completedToday ? 'text-gray-400 line-through' : ''}">
              {habit.name}
            </span>
          </div>
          
          <div class="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-md">
            <Flame size={14} />
            <span class="text-xs font-bold">{habit.streak}</span>
          </div>
        </div>
      {/each}
      {#if $habits.length === 0}
        <div class="h-full flex flex-col items-center justify-center text-gray-400 gap-2 min-h-[100px]">
           <Target size={24} class="opacity-50" />
           <p class="text-xs">No habits tracked</p>
        </div>
      {/if}
    </div>
  </div>
</WidgetContainer>
