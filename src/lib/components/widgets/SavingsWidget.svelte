<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { savings } from '../../../stores/appStores.js';
  import { Plus, Target } from 'lucide-svelte';
  import { v4 as uuidv4 } from 'uuid';

  export let title;
  export let startDrag;

  function addGoal() {
    // Simple mock for now
    const name = prompt("Goal Name:");
    if (!name) return;
    const target = parseFloat(prompt("Target Amount:"));
    if (isNaN(target)) return;

    savings.update(curr => [
      ...curr,
      { id: uuidv4(), name, target, current: 0 }
    ]);
  }

  function addSavings(id) {
     const amount = parseFloat(prompt("Amount to save:"));
     if (isNaN(amount)) return;

     savings.update(curr => curr.map(s => 
       s.id === id ? { ...s, current: Math.min(s.current + amount, s.target) } : s
     ));
  }
</script>

<WidgetContainer {title} headerAction={Plus} {startDrag}>
  <div class="flex flex-col h-full gap-4 overflow-y-auto no-scrollbar pt-2">
    {#if $savings.length === 0}
      <button 
        class="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all"
        onclick={addGoal}
      >
        <Target size={24} class="mb-2" />
        <span class="text-sm">Set a Savings Goal</span>
      </button>
    {/if}

    {#each $savings as goal (goal.id)}
      <div class="bg-white/50 p-4 rounded-2xl space-y-3">
        <div class="flex justify-between items-end">
          <div>
            <h4 class="font-semibold text-gray-800">{goal.name}</h4>
            <div class="text-xs text-gray-500">
              ${goal.current} / ${goal.target}
            </div>
          </div>
          <button 
             class="bg-blue-100 text-blue-600 p-1.5 rounded-lg hover:bg-blue-200 transition-colors"
             onclick={() => addSavings(goal.id)}
          >
             <Plus size={16} />
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
            style="width: {(goal.current / goal.target) * 100}%"
          ></div>
        </div>
      </div>
    {/each}
  </div>
</WidgetContainer>
