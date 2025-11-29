<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { tasks } from '../../../stores/appStores.js';
  import { v4 as uuidv4 } from 'uuid';
  
  import { TextField, Button, Icon, Checkbox, ListItem } from 'm3-svelte';
  
  import iconAdd from '@ktibow/iconset-material-symbols/add';
  import iconDelete from '@ktibow/iconset-material-symbols/delete';
  import iconCheckBox from '@ktibow/iconset-material-symbols/check-box';

  export let title;
  export let startDrag;

  let newTask = '';

  function addTask() {
    if (!newTask.trim()) return;
    
    tasks.update(curr => [
      { id: uuidv4(), text: newTask.trim(), completed: false, date: new Date().toISOString() },
      ...curr
    ]);
    
    newTask = '';
  }

  function deleteTask(id) {
    tasks.update(curr => curr.filter(t => t.id !== id));
  }
</script>

<WidgetContainer {title} {startDrag}>
  <div class="tasks-widget">
    <div class="input-area">
       <TextField 
         label="Add a new task" 
         bind:value={newTask} 
         trailing={{ icon: iconAdd, onclick: addTask }}
         on:enter={addTask}
       />
    </div>

    <div class="tasks-list">
      {#each $tasks as task (task.id)}
        <div class="task-item">
            <ListItem headline={task.text}>
              <div slot="leading" class="checkbox-wrapper">
                  <Checkbox>
                      <input type="checkbox" bind:checked={task.completed} />
                  </Checkbox>
              </div>
              <div slot="trailing">
                 <Button 
                   variant="text" 
                   iconType="full" 
                   onclick={() => deleteTask(task.id)}
                 >
                    <Icon icon={iconDelete} />
                 </Button>
              </div>
            </ListItem>
        </div>
      {/each}
      {#if $tasks.length === 0}
        <div class="empty-state">
           <Icon icon={iconCheckBox} color="rgb(var(--m3-scheme-outline))" width="2rem" height="2rem" />
           <p class="m3-font-body-small" style="color: rgb(var(--m3-scheme-outline))">No tasks yet.</p>
        </div>
      {/if}
    </div>
  </div>
</WidgetContainer>

<style>
  .tasks-widget {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 1rem;
  }
  
  .tasks-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
  }
  
  .task-item {
      /* ListItem usually handles hover states */
  }

  .checkbox-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
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
