<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { habits } from '../../../stores/appStores.js';
  import { v4 as uuidv4 } from 'uuid';
  
  import { TextField, Button, Icon, Checkbox, ListItem } from 'm3-svelte';
  
  import iconAdd from '@ktibow/iconset-material-symbols/add';
  import iconFlame from '@ktibow/iconset-material-symbols/local-fire-department';
  import iconTrackChanges from '@ktibow/iconset-material-symbols/track-changes';

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
  <div class="habits-widget">
    <div class="header-actions">
      {#if showInput}
         <TextField 
           label="New habit" 
           bind:value={newHabitName} 
           trailing={{ icon: iconAdd, onclick: addHabit }}
           on:enter={addHabit}
         />
      {:else}
         <Button variant="text" onclick={() => showInput = true} iconType="left">
             <Icon icon={iconAdd} />
             Add Habit
         </Button>
      {/if}
    </div>

    <div class="habits-list">
      {#each $habits as habit (habit.id)}
         <div class="habit-item">
            <ListItem headline={habit.name}>
               <div slot="leading" class="checkbox-wrapper">
                  <Checkbox>
                     <input 
                        type="checkbox" 
                        checked={habit.completedToday} 
                        onchange={() => toggleHabit(habit.id)}
                     />
                  </Checkbox>
               </div>
               
               <div slot="trailing" class="streak-badge">
                   <Icon icon={iconFlame} color="rgb(var(--m3-scheme-tertiary))" width="1rem" height="1rem" />
                   <span class="m3-font-label-small" style="color: rgb(var(--m3-scheme-tertiary))">{habit.streak}</span>
               </div>
            </ListItem>
         </div>
      {/each}
      {#if $habits.length === 0}
        <div class="empty-state">
           <Icon icon={iconTrackChanges} color="rgb(var(--m3-scheme-outline))" width="2rem" height="2rem" />
           <p class="m3-font-body-small" style="color: rgb(var(--m3-scheme-outline))">No habits tracked</p>
        </div>
      {/if}
    </div>
  </div>
</WidgetContainer>

<style>
  .habits-widget {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 1rem;
  }
  
  .header-actions {
      min-height: 3.5rem;
  }
  
  .habits-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
  }
  
  .checkbox-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
  }

  .streak-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--m3-util-rounding-small);
      background-color: rgb(var(--m3-scheme-tertiary-container));
  }
  
  .empty-state {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
  }
</style>
