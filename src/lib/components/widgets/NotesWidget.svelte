<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { notes } from '../../../stores/appStores.js';
  import { Save } from 'lucide-svelte';

  export let title;

  let content = $notes[0]?.content || '';
  let lastSaved = null;

  function saveNote() {
    notes.update(curr => {
      // Single note mode for now
      const existing = curr[0] || { id: 'default', tags: [], pinned: false };
      return [{ ...existing, content, updatedAt: new Date().toISOString() }];
    });
    lastSaved = new Date();
  }
  
  // Auto-load
  $: if ($notes.length > 0 && !content) {
    content = $notes[0].content;
  }
</script>

<WidgetContainer {title}>
  <div class="flex flex-col h-full relative group">
    <textarea
      bind:value={content}
      oninput={saveNote}
      placeholder="Write your thoughts..."
      class="w-full h-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed text-gray-700 placeholder-gray-400 p-1"
    ></textarea>
    
    <div class="absolute bottom-0 right-0 text-xs text-gray-300 transition-opacity duration-300 {lastSaved ? 'opacity-100' : 'opacity-0'}">
      Saved
    </div>
  </div>
</WidgetContainer>
