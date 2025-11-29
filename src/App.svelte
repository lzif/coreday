<script>
  import { NavCMLX, NavCMLXItem } from 'm3-svelte';
  import Dashboard from './lib/components/Dashboard.svelte';

  // Icons
  import iconDashboard from '@ktibow/iconset-material-symbols/dashboard';
  import iconWallet from '@ktibow/iconset-material-symbols/account-balance-wallet';
  import iconCheckBox from '@ktibow/iconset-material-symbols/check-box';
  import iconTrackChanges from '@ktibow/iconset-material-symbols/track-changes';
  import iconSavings from '@ktibow/iconset-material-symbols/savings';
  import iconStickyNote from '@ktibow/iconset-material-symbols/sticky-note-2';
  import iconMood from '@ktibow/iconset-material-symbols/mood';
  import iconTimer from '@ktibow/iconset-material-symbols/timer';

  let activeTab = 'dashboard';

  const menuItems = [
    { id: 'dashboard', icon: iconDashboard, label: 'Dashboard' },
    { id: 'finance', icon: iconWallet, label: 'Finance' },
    { id: 'tasks', icon: iconCheckBox, label: 'Tasks' },
    { id: 'habits', icon: iconTrackChanges, label: 'Habits' },
    { id: 'savings', icon: iconSavings, label: 'Savings' },
    { id: 'notes', icon: iconStickyNote, label: 'Notes' },
    { id: 'mood', icon: iconMood, label: 'Mood' },
    { id: 'pomodoro', icon: iconTimer, label: 'Focus' },
  ];
</script>

<div class="app-container">
  <div class="nav">
    <NavCMLX variant="auto">
      {#each menuItems as item}
        <NavCMLXItem
          variant="auto"
          icon={item.icon}
          text={item.label}
          selected={activeTab === item.id}
          click={() => activeTab = item.id}
        />
      {/each}
    </NavCMLX>
  </div>

  <main class="main-content">
     <header class="header">
        <h1 class="m3-font-display-small capitalize" style="margin: 0;">{activeTab}</h1>
        <div class="avatar">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
     </header>

     <div class="content-area">
         {#if activeTab === 'dashboard'}
             <Dashboard />
         {:else}
             <div class="placeholder">
                <p class="m3-font-body-large">{activeTab} module placeholder</p>
             </div>
         {/if}
     </div>
  </main>
</div>

<style>
  .app-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: rgb(var(--m3-scheme-background));
    color: rgb(var(--m3-scheme-on-background));
  }

  .nav {
      /* Z-index to ensure it sits above content if needed */
      z-index: 10;
  }

  .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      overflow-y: auto;
      background: rgb(var(--m3-scheme-surface));
      gap: 1rem;
  }

  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
  }
  
  .avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgb(var(--m3-scheme-surface-container-high));
  }
  
  .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  .content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
  }

  .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: rgb(var(--m3-scheme-on-surface-variant));
  }

  /* Responsive Logic for NavCMLX layout */
  @media (width < 52.5rem) {
    .app-container {
      flex-direction: column-reverse; /* Bottom nav */
      --m3-util-bottom-offset: 5rem;
    }
    .main-content {
        /* Add padding at bottom if content is long, but column-reverse might handle the bar position. 
           Usually bottom nav is fixed or sticky. 
           If column-reverse is used, the nav is at the bottom of the flex container.
        */
    }
  }

  @media (width >= 52.5rem) {
      .nav {
          width: 5rem; /* Rail width */
      }
  }
</style>
