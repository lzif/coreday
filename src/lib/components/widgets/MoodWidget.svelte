<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { mood } from '../../../stores/appStores.js';
  import { v4 as uuidv4 } from 'uuid';
  import { Icon } from 'm3-svelte';

  export let title;
  export let startDrag;

  const moods = [
    { label: 'Happy', emoji: '😄' },
    { label: 'Neutral', emoji: '😐' },
    { label: 'Sad', emoji: '😔' },
    { label: 'Angry', emoji: '😡' },
    { label: 'Tired', emoji: '😴' }
  ];

  function logMood(selectedMood) {
    mood.update(curr => [
      { id: uuidv4(), mood: selectedMood.label, emoji: selectedMood.emoji, date: new Date().toISOString() },
      ...curr
    ]);
  }
</script>

<WidgetContainer {title} {startDrag}>
  <div class="mood-widget">
    <div class="mood-grid">
      {#each moods as m}
        <button
          class="mood-btn"
          onclick={() => logMood(m)}
        >
          <div class="emoji">{m.emoji}</div>
          <span class="m3-font-label-small">{m.label}</span>
        </button>
      {/each}
    </div>

    <div class="history">
      <h4 class="m3-font-label-small label">History</h4>
      <div class="history-list">
        {#each $mood.slice(0, 5) as log (log.id)}
          <div class="history-item">
            <div class="item-content">
              <span>{log.emoji}</span>
              <span class="m3-font-body-small">{log.mood}</span>
            </div>
            <span class="m3-font-label-small time">
              {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
        {/each}
        {#if $mood.length === 0}
            <div class="empty">No logs</div>
        {/if}
      </div>
    </div>
  </div>
</WidgetContainer>

<style>
  .mood-widget {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
  }
  
  .mood-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
  }
  
  .mood-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      background: rgb(var(--m3-scheme-surface-container-high));
      border: none;
      border-radius: var(--m3-util-rounding-medium);
      padding: 0.5rem 0.25rem;
      cursor: pointer;
      transition: background 0.2s;
  }
  
  .mood-btn:hover {
      background: rgb(var(--m3-scheme-surface-container-highest));
  }
  
  .emoji {
      font-size: 1.5rem;
  }
  
  .history {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;
  }
  
  .label {
      color: rgb(var(--m3-scheme-on-surface-variant));
      margin: 0;
  }
  
  .history-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }
  
  .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border-radius: var(--m3-util-rounding-small);
      background-color: rgb(var(--m3-scheme-surface-container));
  }
  
  .item-content {
      display: flex;
      gap: 0.5rem;
  }
  
  .time {
      color: rgb(var(--m3-scheme-on-surface-variant));
  }
  
  .empty {
      text-align: center;
      color: rgb(var(--m3-scheme-outline));
      font-size: 0.75rem;
  }
</style>
