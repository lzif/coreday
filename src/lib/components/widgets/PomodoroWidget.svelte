<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { Play, Pause, RotateCcw } from 'lucide-svelte';
  import { onDestroy } from 'svelte';

  export let title;

  let timeLeft = 25 * 60; // 25 minutes
  let isRunning = false;
  let timerId = null;
  let mode = 'focus'; // 'focus' | 'break'

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function toggleTimer() {
    if (isRunning) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          clearInterval(timerId);
          isRunning = false;
          // Play sound or notify
        }
      }, 1000);
    }
    isRunning = !isRunning;
  }

  function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = mode === 'focus' ? 25 * 60 : 5 * 60;
  }

  function setMode(newMode) {
    mode = newMode;
    resetTimer();
  }

  onDestroy(() => {
    if (timerId) clearInterval(timerId);
  });
</script>

<WidgetContainer {title}>
  <div class="flex flex-col h-full items-center justify-center relative">
    <!-- Mode Switcher -->
    <div class="absolute top-0 left-0 right-0 flex justify-center gap-2 mb-4">
      <button 
        class="text-xs px-3 py-1 rounded-full transition-colors {mode === 'focus' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-400 hover:bg-gray-100'}"
        onclick={() => setMode('focus')}
      >
        Focus
      </button>
      <button 
        class="text-xs px-3 py-1 rounded-full transition-colors {mode === 'break' ? 'bg-green-100 text-green-600 font-medium' : 'text-gray-400 hover:bg-gray-100'}"
        onclick={() => setMode('break')}
      >
        Break
      </button>
    </div>

    <!-- Timer Display -->
    <div class="text-6xl font-light text-apple-dark tabular-nums tracking-tighter mb-8 mt-6">
      {formatTime(timeLeft)}
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-4">
      <button 
        class="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95
        {isRunning ? 'bg-amber-100 text-amber-600' : 'bg-blue-500 text-white shadow-lg shadow-blue-200'}"
        onclick={toggleTimer}
      >
        {#if isRunning}
          <Pause size={20} fill="currentColor" />
        {:else}
          <Play size={20} fill="currentColor" class="ml-1" />
        {/if}
      </button>

      <button 
        class="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
        onclick={resetTimer}
      >
        <RotateCcw size={16} />
      </button>
    </div>
  </div>
</WidgetContainer>
