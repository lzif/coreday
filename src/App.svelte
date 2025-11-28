<script>
  import Sidebar from './lib/components/Sidebar.svelte';
  import Dashboard from './lib/components/Dashboard.svelte';
  
  let activeTab = 'dashboard';
</script>

<div class="flex h-screen w-full overflow-hidden bg-apple-gray">
  <!-- Sidebar -->
  <Sidebar bind:activeTab />

  <!-- Main Content Area -->
  <main class="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 md:pb-8 relative">
    <div class="max-w-7xl mx-auto h-full">
      <!-- Header -->
      <header class="mb-4 md:mb-8 flex justify-between items-center transition-all duration-300">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-apple-dark capitalize tracking-tight">
            {activeTab}
          </h2>
          <p class="text-sm md:text-base text-gray-500 mt-1 hidden md:block">Welcome back to your personal space.</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 border border-white shadow-sm overflow-hidden">
             <!-- Placeholder Avatar -->
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <!-- Content Slot (Dynamic based on tab) -->
      <div class="w-full h-full">
         {#if activeTab === 'dashboard'}
             <Dashboard />
         {:else}
             <div class="p-8 rounded-2xl glass min-h-[400px] flex items-center justify-center text-gray-400">
                {activeTab} module placeholder
             </div>
         {/if}
      </div>
    </div>
  </main>
</div>

<style>
  /* Safe area for mobile devices with home indicator */
  :global(.safe-area-pb) {
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }
</style>
