<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { notes } from '../../../stores/appStores.js';
  import { TextFieldMultiline } from 'm3-svelte';

  export let title;
  export let startDrag;

  let content = $notes[0]?.content || '';
  let lastSaved = null;

  function saveNote() {
    notes.update(curr => {
      const existing = curr[0] || { id: 'default', tags: [], pinned: false };
      return [{ ...existing, content, updatedAt: new Date().toISOString() }];
    });
    lastSaved = new Date();
  }
  
  $: if ($notes.length > 0 && !content) {
    content = $notes[0].content;
  }
  
  // Watch for changes to trigger save (since we don't have oninput directly on component easily accessible without checking source)
  // Actually, bind:value updates immediately, so reactive statement works.
  $: if (content !== ($notes[0]?.content || '')) {
     saveNote();
  }
</script>

<WidgetContainer {title} {startDrag}>
  <div class="notes-widget">
    <div class="text-area-wrapper">
        <TextFieldMultiline 
           bind:value={content}
           label="Write your thoughts..."
        />
    </div>
    
    <div class="status {lastSaved ? 'visible' : ''}">
      <span class="m3-font-body-small">Saved</span>
    </div>
  </div>
</WidgetContainer>

<style>
  .notes-widget {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
  }
  
  .text-area-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
  }
  
  .status {
      position: absolute;
      bottom: 0;
      right: 0;
      opacity: 0;
      transition: opacity 0.3s;
      padding: 0.5rem;
      color: rgb(var(--m3-scheme-outline));
  }
  
  .status.visible {
      opacity: 1;
  }
</style>
