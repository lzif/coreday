<script>
  import {
    LayoutDashboard,
    Wallet,
    CheckSquare,
    Target,
    PiggyBank,
    StickyNote,
    Smile,
    Timer,
    MoreHorizontal,
    X
  } from 'lucide-svelte';

  export let activeTab = 'dashboard';
  
  let showMobileMenu = false;

  function selectTab(id) {
    activeTab = id;
    showMobileMenu = false;
  }

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'finance', icon: Wallet, label: 'Finance' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'habits', icon: Target, label: 'Habits' },
    { id: 'savings', icon: PiggyBank, label: 'Savings' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'mood', icon: Smile, label: 'Mood' },
    { id: 'pomodoro', icon: Timer, label: 'Focus' },
  ];
</script>

<aside class="hidden md:flex flex-col w-20 lg:w-64 h-screen glass border-r border-glass-border pt-8 pb-4 transition-all duration-300">
  <div class="px-6 mb-8 flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-blue-500 shadow-lg flex items-center justify-center text-white font-bold">C</div>
    <h1 class="font-bold text-xl tracking-tight hidden lg:block text-apple-dark">Coreday</h1>
  </div>

  <nav class="flex-1 px-4 space-y-2">
    {#each menuItems as item}
      <button
        class="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
        {activeTab === item.id 
          ? 'bg-white shadow-sm text-blue-600' 
          : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'}"
        onclick={() => selectTab(item.id)}
      >
        <svelte:component this={item.icon} size={20} />
        <span class="font-medium hidden lg:block">{item.label}</span>
      </button>
    {/each}
  </nav>

  <div class="px-6 mt-auto">
    <div class="text-xs text-gray-400 text-center lg:text-left">
      <span class="hidden lg:inline">v1.0.0</span>
    </div>
  </div>
</aside>

<!-- Mobile Navigation (Bottom Bar) -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-glass-border z-50 px-6 py-3 flex justify-between items-center safe-area-pb">
  {#each menuItems.slice(0, 4) as item}
     <button
        class="flex flex-col items-center gap-1 transition-colors duration-200
        {activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}"
        onclick={() => selectTab(item.id)}
      >
        <svelte:component this={item.icon} size={24} />
      </button>
  {/each}
  <button
    class="flex flex-col items-center gap-1 transition-colors duration-200 {showMobileMenu ? 'text-blue-600' : 'text-gray-400'}"
    onclick={() => showMobileMenu = !showMobileMenu}
  >
    <MoreHorizontal size={24} />
  </button>
</nav>

<!-- Mobile Menu Drawer -->
{#if showMobileMenu}
  <!-- Backdrop -->
  <div 
    class="md:hidden fixed inset-0 z-[60] flex items-end justify-center bg-black/20 backdrop-blur-sm"
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === 'Escape' && (showMobileMenu = false)}
    onclick={() => showMobileMenu = false}
  >
     <!-- Drawer -->
     <div 
        class="w-full bg-white/90 glass rounded-t-3xl p-6 pb-24 shadow-2xl border-t border-white/50 animate-slide-up"
        role="button"
        tabindex="0"
        onkeydown={() => {}} 
        onclick={(e) => e.stopPropagation()}
     >
        <div class="flex justify-between items-center mb-6">
           <h3 class="font-bold text-lg text-apple-dark">All Modules</h3>
           <button class="p-2 bg-gray-100/50 rounded-full hover:bg-gray-200/50 transition-colors" onclick={() => showMobileMenu = false}>
              <X size={20} class="text-gray-600" />
           </button>
        </div>
        <div class="grid grid-cols-4 gap-4">
           {#each menuItems as item}
              <button 
                class="flex flex-col items-center gap-2 p-2 rounded-xl transition-all active:scale-95
                {activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'}"
                onclick={() => selectTab(item.id)}
              >
                 <div class="p-3 rounded-2xl {activeTab === item.id ? 'bg-blue-100' : 'bg-gray-100'}">
                    <svelte:component this={item.icon} size={24} />
                 </div>
                 <span class="text-xs font-medium text-center leading-tight">{item.label}</span>
              </button>
           {/each}
        </div>
     </div>
  </div>
{/if}

<style>
  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slide-up {
    animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>
