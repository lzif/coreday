<script>
  let { visible = false } = $props();
</script>

{#if visible}
  <div class="overlay"></div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
</style>
