<script lang="ts">
  import { FAB, NavCMLX, NavCMLXItem } from "m3-svelte";
  import iconHome from "@ktibow/iconset-material-symbols/home-outline";
  import iconHomeS from "@ktibow/iconset-material-symbols/home";
  import iconPaid from "@ktibow/iconset-material-symbols/paid-outline";
  import iconPaidS from "@ktibow/iconset-material-symbols/paid";
  import iconTask from "@ktibow/iconset-material-symbols/task-outline";
  import iconTaskS from "@ktibow/iconset-material-symbols/task";
  import iconBook from "@ktibow/iconset-material-symbols/book-outline";
  import iconBookS from "@ktibow/iconset-material-symbols/book";
  import iconEventNote from "@ktibow/iconset-material-symbols/event-note-outline";
  import iconEventNoteS from "@ktibow/iconset-material-symbols/event-note";
  import iconSavings from "@ktibow/iconset-material-symbols/savings-outline";
  import iconSavingsS from "@ktibow/iconset-material-symbols/savings";
  import iconFab from "@ktibow/iconset-material-symbols/add";
  import { page } from "$app/state";
  import Header from "$lib/components/Header.svelte";
  import { getTitle } from "$lib/title.svelte";
  let { children } = $props();

  const paths = [
    {
      path: "/app",
      icon: iconHome,
      iconS: iconHomeS,
      label: "Home",
    },
    {
      path: "/app/finance",
      icon: iconPaid,
      iconS: iconPaidS,
      label: "Finance",
    },
    {
      path: "/app/habits",
      icon: iconTask,
      iconS: iconTaskS,
      label: "Habits",
    },
    {
      path: "/app/journal",
      icon: iconBook,
      iconS: iconBookS,
      label: "Journal",
    },
    {
      path: "/app/planner",
      icon: iconEventNote,
      iconS: iconEventNoteS,
      label: "Planner",
    },
    {
      path: "/app/savings",
      icon: iconSavings,
      iconS: iconSavingsS,
      label: "Savings",
    },
  ];

  const normalizePath = (path: string) => {
    const u = new URL(path, page.url.href);
    path = u.pathname;
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  };
</script>

<Header>
  {new URL(page.url.href).pathname === "/app" ? "Hello" : getTitle()||"Hmm"}
</Header>
<div class="container">
  <!-- Header>Home</Header -->

  <div class="sidebar">
    <NavCMLX variant="auto">
      {#each paths as { path, icon, iconS, label }}
        {@const selected =
          normalizePath(path) === normalizePath(page.url.pathname)}
        <NavCMLXItem
          variant="auto"
          href={normalizePath(path)}
          {selected}
          icon={selected ? iconS : icon}
          text={label}
        />
      {/each}
    </NavCMLX>
  </div>

  <div class="content">
    {@render children()}
  </div>

  <div class="fab-button">
    <FAB color="primary" icon={iconFab} />
  </div>
</div>

<style>
  .container {
    display: grid;
    min-height: 100dvh;
  }
  .sidebar {
    display: flex;
    position: sticky;
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .fab-button {
    -webkit-tap-highlight-color: transparent;
    position: fixed; /* Use fixed for floating position */
    right: 15px; /* Adjust as needed */
    overflow: hidden;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* Additional FAB specific styles */
    z-index: 4; /* Ensure it's above other content */
  }

  @media (width < 52.5rem) {
    .container {
      grid-template-rows: 1fr auto;
      --m3-util-bottom-offset: 5rem;
    }
    .sidebar {
      flex-direction: column;
      bottom: 0;
      width: 100%;
      z-index: 3;
      grid-row: 2;
    }
    .fab-button {
      bottom: calc(var(--m3-util-bottom-offset));
    }
  }
  @media (width >= 52.5rem) {
    .container {
      grid-template-columns: auto 1fr;
    }
    .sidebar {
      grid-column: 1;
      top: 0;
      left: 0;
      flex-direction: column;
      height: 100dvh;
      @media (width < 100rem) {
        width: 6rem;
        > :global(nav) {
          position: absolute;
          top: 50%;
          translate: 0 -50%;
        }
      }
    }
    .content {
      padding: 1.5rem;
      grid-column: 2;
    }
  }
</style>
