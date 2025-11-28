<script>
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import { widgetsLayout } from '../../stores/appStores.js';
  import WidgetContainer from './WidgetContainer.svelte';
  
  // Widget Imports (Placeholders for now, will implement actual widgets next)
  import FinanceWidget from './widgets/FinanceWidget.svelte';
  import TasksWidget from './widgets/TasksWidget.svelte';
  import HabitsWidget from './widgets/HabitsWidget.svelte';
  import SavingsWidget from './widgets/SavingsWidget.svelte';
  import NotesWidget from './widgets/NotesWidget.svelte';
  import MoodWidget from './widgets/MoodWidget.svelte';
  import PomodoroWidget from './widgets/PomodoroWidget.svelte';

  const flipDurationMs = 300;
  
  // Mapping widget types to components
  const widgetComponents = {
    finance: FinanceWidget,
    tasks: TasksWidget,
    habits: HabitsWidget,
    savings: SavingsWidget,
    notes: NotesWidget,
    mood: MoodWidget,
    pomodoro: PomodoroWidget
  };

  function handleDndConsider(e) {
    $widgetsLayout = e.detail.items;
  }

  function handleDndFinalize(e) {
    $widgetsLayout = e.detail.items;
  }
</script>

<div class="h-full overflow-y-auto no-scrollbar pb-20">
  <section 
    use:dndzone={{items: $widgetsLayout, flipDurationMs, dropTargetStyle: {outline: 'none'}}} 
    on:consider={handleDndConsider} 
    on:finalize={handleDndFinalize}
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 min-h-[50vh]"
  >
    {#each $widgetsLayout as item (item.id)}
      <div 
        animate:flip={{duration: flipDurationMs}}
        class="h-64 w-full"
      >
        <!-- Dynamic Component Loading -->
        <svelte:component 
          this={widgetComponents[item.type] || WidgetContainer} 
          title={item.title}
        >
          {#if !widgetComponents[item.type]}
            <div class="text-sm text-gray-400">Widget content not found</div>
          {/if}
        </svelte:component>
      </div>
    {/each}
  </section>
</div>
