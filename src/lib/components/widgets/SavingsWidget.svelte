<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { savings } from '../../../stores/appStores.js';
  import { v4 as uuidv4 } from 'uuid';
  
  import { Button, Icon, LinearProgress } from 'm3-svelte';
  
  import iconAdd from '@ktibow/iconset-material-symbols/add';
  import iconSavings from '@ktibow/iconset-material-symbols/savings';

  export let title;
  export let startDrag;

  function addGoal() {
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

<WidgetContainer {title} {startDrag}>
  <div class="savings-widget">
    <div class="actions">
       <Button variant="text" onclick={addGoal} iconType="left">
          <Icon icon={iconAdd} />
          New Goal
       </Button>
    </div>

    <div class="goals-list">
      {#if $savings.length === 0}
        <div class="empty-state">
           <Icon icon={iconSavings} color="rgb(var(--m3-scheme-outline))" width="2rem" height="2rem" />
           <p class="m3-font-body-small" style="color: rgb(var(--m3-scheme-outline))">No savings goals</p>
        </div>
      {/if}

      {#each $savings as goal (goal.id)}
        <div class="goal-item">
          <div class="goal-header">
            <div>
              <h4 class="m3-font-title-small" style="margin: 0;">{goal.name}</h4>
              <div class="m3-font-body-small" style="color: rgb(var(--m3-scheme-secondary))">
                ${goal.current} / ${goal.target}
              </div>
            </div>
            <Button 
               variant="tonal" 
               iconType="full" 
               onclick={() => addSavings(goal.id)}
            >
               <Icon icon={iconAdd} />
            </Button>
          </div>

          <div class="progress-wrapper">
             <LinearProgress percent={(goal.current / goal.target) * 100} />
          </div>
        </div>
      {/each}
    </div>
  </div>
</WidgetContainer>

<style>
  .savings-widget {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 1rem;
  }
  
  .goals-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
  }
  
  .goal-item {
      padding: 1rem;
      border-radius: var(--m3-util-rounding-medium);
      background-color: rgb(var(--m3-scheme-surface-container-high));
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }
  
  .goal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
