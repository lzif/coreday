<script>
  import { cn } from '../utils/cn';
  import { GripHorizontal } from 'lucide-svelte';

  export let title = '';
  export let className = '';
  export let headerAction = null;
  export let startDrag = () => {};
</script>

<div class={cn("glass rounded-3xl p-5 flex flex-col h-full transition-all duration-300 hover:shadow-lg", className)}>
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-semibold text-lg text-apple-dark tracking-tight">{title}</h3>
    <div class="flex items-center gap-2">
      {#if headerAction}
        <div class="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
          <svelte:component this={headerAction} size={18} />
        </div>
      {/if}
      <div 
        class="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none p-1"
        onmousedown={startDrag}
        ontouchstart={startDrag}
        role="button"
        tabindex="0"
        aria-label="Drag widget"
      >
        <GripHorizontal size={18} />
      </div>
    </div>
  </div>
  <div class="flex-1 overflow-hidden relative">
    <slot />
  </div>
</div>
