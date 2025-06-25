<script lang="ts">
  import IconSun from "@ktibow/iconset-material-symbols/light-mode";
  import IconMoon from "@ktibow/iconset-material-symbols/dark-mode";
  import { Button, Icon } from "m3-svelte";

  let theme = $state(document.documentElement.getAttribute("data-theme"))

  function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
		theme = next
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  });
</script>

<Button click={toggleTheme} variant="text" iconType="full">
  {#if theme === "dark"}
    <Icon icon={IconSun} />
  {:else}
    <Icon icon={IconMoon} />
  {/if}
</Button>
