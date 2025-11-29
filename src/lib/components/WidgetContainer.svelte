<script>
  import { Card, Icon } from 'm3-svelte';
  import iconDragHandle from '@ktibow/iconset-material-symbols/drag-handle';

  export let title = '';
  export let headerAction = null; // Expects an icon object now
  export let startDrag = () => {};
</script>

<div class="widget-wrapper">
  <Card variant="filled">
    <div class="widget-inner">
      <div class="widget-header">
        <h3 class="m3-font-title-medium widget-title">{title}</h3>
        <div class="widget-actions">
          {#if headerAction}
             <div class="action-icon">
                <Icon icon={headerAction} />
             </div>
          {/if}
          
          <div 
            class="drag-handle"
            onmousedown={startDrag}
            ontouchstart={startDrag}
            role="button"
            tabindex="0"
            aria-label="Drag widget"
          >
            <Icon icon={iconDragHandle} />
          </div>
        </div>
      </div>
      
      <div class="widget-body">
        <slot />
      </div>
    </div>
  </Card>
</div>

<style>
  .widget-wrapper {
    height: 100%;
    /* Ensure the wrapper fills the grid cell */
  }

  /* Target the Card component's element if possible, or assume it fills. 
     Since we can't style Card directly with classes, we rely on the internal div 
     pushing the size, but that won't force it to fill the h-64 of the parent 
     if content is small. 
     
     Actually, if we put `display: grid` on .widget-wrapper, does Card fill it?
     We can try using :global(.m3-card) if we need to force height.
  */
  .widget-wrapper :global(.m3-card) {
      height: 100%;
      display: flex;
      flex-direction: column;
  }

  .widget-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1rem;
      gap: 1rem;
  }

  .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .widget-title {
      margin: 0;
      color: rgb(var(--m3-scheme-on-surface));
  }

  .widget-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      color: rgb(var(--m3-scheme-on-surface-variant));
  }

  .drag-handle {
      cursor: grab;
      padding: 0.25rem;
  }
  
  .widget-body {
      flex: 1;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
  }
</style>
