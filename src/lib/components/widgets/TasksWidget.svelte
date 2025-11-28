<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { tasks } from '../../../stores/appStores.js';
  import { Plus, Trash2, CheckCircle, Circle } from 'lucide-svelte';
  import { v4 as uuidv4 } from 'uuid';

  export let title;

  let newTask = '';

  function addTask() {
    if (!newTask.trim()) return;
    
    tasks.update(curr => [
      { id: uuidv4(), text: newTask, completed: false, date: new Date().toISOString() },
      ...curr
    ]);
    
    newTask = '';
  }

  function toggleTask(id) {
    tasks.update(curr => curr.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  function deleteTask(id) {
    tasks.update(curr => curr.filter(t => t.id !== id));
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') addTask();
  }
</script>

<WidgetContainer {title}>
  <div class="flex flex-col h-full">
    <!-- Add Task -->
    <div class="relative mb-4">
      <input 
        type="text" 
        bind:value={newTask}
        onkeydown={handleKeydown}
        placeholder="Add a new task..." 
        class="w-full bg-white/50 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
      <button 
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
        onclick={addTask}
      >
        <Plus size={18} />
      </button>
    </div>

    <!-- Task List -->
    <div class="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-1">
      {#each $tasks as task (task.id)}
        <div class="group flex items-center gap-3 p-2.5 rounded-xl bg-white/40 hover:bg-white/80 transition-all duration-200">
          <button 
            class="text-gray-400 hover:text-blue-500 transition-colors"
            onclick={() => toggleTask(task.id)}
          >
            {#if task.completed}
              <CheckCircle size={20} class="text-blue-500" />
            {:else}
              <Circle size={20} />
            {/if}
          </button>
          
          <span class="flex-1 text-sm text-gray-700 {task.completed ? 'line-through text-gray-400' : ''}">
            {task.text}
          </span>

          <button 
            class="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
            onclick={() => deleteTask(task.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      {/each}
      {#if $tasks.length === 0}
        <div class="text-center text-xs text-gray-400 mt-8">No tasks yet. Stay focused!</div>
      {/if}
    </div>
  </div>
</WidgetContainer>
