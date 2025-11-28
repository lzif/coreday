<script>
  import {
    LayoutDashboard,
    Wallet,
    CheckSquare,
    Target,
    PiggyBank,
    StickyNote,
    Smile,
    Timer
  } from 'lucide-svelte';

  export let activeTab = 'dashboard';
  
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
        onclick={() => activeTab = item.id}
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
  {#each menuItems.slice(0, 5) as item}
     <button
        class="flex flex-col items-center gap-1 transition-colors duration-200
        {activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}"
        onclick={() => activeTab = item.id}
      >
        <svelte:component this={item.icon} size={24} />
      </button>
  {/each}
</nav>
