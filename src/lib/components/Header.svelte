<script>
  import ToggleTheme from "./ToggleTheme.svelte";

  let { children } = $props();
</script>

<header class="topbar">
  <div class="left">{@render children()}</div>
  <div class="right">
    <ToggleTheme />
    <!-- UserAvatar --/>
      <!-- SettingsButton -->
  </div>
</header>

<style>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0 1rem;
    background-color: rgb(var(--m3-scheme-surface-container-high));
    color: rgb(var(--m3-scheme-on-surface));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .topbar .left {
    font-weight: 600;
    font-size: 1.5rem;
  }

  .topbar .right {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
</style>
