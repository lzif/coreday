<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { mood } from '../../../stores/appStores.js';
  import { v4 as uuidv4 } from 'uuid';

  export let title;

  const moods = [
    { label: 'Happy', emoji: '😄', color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-600' },
    { label: 'Sad', emoji: '😔', color: 'bg-blue-100 text-blue-600' },
    { label: 'Angry', emoji: '😡', color: 'bg-red-100 text-red-600' },
    { label: 'Tired', emoji: '😴', color: 'bg-purple-100 text-purple-600' }
  ];

  function logMood(selectedMood) {
    mood.update(curr => [
      { id: uuidv4(), mood: selectedMood.label, emoji: selectedMood.emoji, date: new Date().toISOString() },
      ...curr
    ]);
  }
</script>

<WidgetContainer {title}>
  <div class="flex flex-col h-full">
    <div class="grid grid-cols-5 gap-2 mb-6">
      {#each moods as m}
        <button
          class="flex flex-col items-center gap-1 p-2 rounded-xl transition-transform hover:scale-110 active:scale-95"
          onclick={() => logMood(m)}
        >
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl {m.color} shadow-sm">
            {m.emoji}
          </div>
        </button>
      {/each}
    </div>

    <div class="flex-1 overflow-y-auto no-scrollbar space-y-2">
      <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">History</h4>
      {#each $mood.slice(0, 5) as log (log.id)}
        <div class="flex items-center justify-between p-2 rounded-lg bg-white/30 text-sm">
          <div class="flex items-center gap-2">
            <span>{log.emoji}</span>
            <span class="text-gray-700">{log.mood}</span>
          </div>
          <span class="text-xs text-gray-400">
            {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      {/each}
    </div>
  </div>
</WidgetContainer>
