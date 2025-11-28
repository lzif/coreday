<script>
  import { cn } from '../utils/cn';

  export let title = '';
  export let className = '';
  export let headerAction = null;
</script>

<div class={cn("glass rounded-3xl p-5 flex flex-col h-full transition-all duration-300 hover:shadow-lg", className)}>
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-semibold text-lg text-apple-dark tracking-tight">{title}</h3>
    {#if headerAction}
      <div class="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
        <svelte:component this={headerAction} size={18} />
      </div>
    {/if}
  </div>
  <div class="flex-1 overflow-hidden relative">
    <slot />
  </div>
</div>
