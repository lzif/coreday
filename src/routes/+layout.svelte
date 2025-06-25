<script lang="ts">
  import "../app.css";
  import { fade } from "svelte/transition";
  import type { LayoutProps } from "./$types";
  import { onNavigate } from "$app/navigation";

  let { data, children }: LayoutProps = $props();

  let enableTransition = $state(false);
  onNavigate(({ from, to }) => {
    if (from?.url.pathname === "/" && to?.url.pathname === "/app") {
      enableTransition = true;
    } else {
      enableTransition = false;
    }
  });
</script>

{#if enableTransition}
  {#key data.pathname}
    <div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
      {@render children()}
    </div>
  {/key}
{:else}
  {@render children()}
{/if}
