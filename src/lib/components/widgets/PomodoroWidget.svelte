<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { onDestroy } from 'svelte';
  import { Button, Icon, FAB, ConnectedButtons, TogglePrimitive } from 'm3-svelte';
  
  import iconPlayArrow from '@ktibow/iconset-material-symbols/play-arrow';
  import iconPause from '@ktibow/iconset-material-symbols/pause';
  import iconRefresh from '@ktibow/iconset-material-symbols/refresh';

  export let title;
  export let startDrag;

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

<WidgetContainer {title} {startDrag}>
  <div class="pomodoro-widget">
    <div class="controls-top">
        <ConnectedButtons>
            <TogglePrimitive 
               toggle={mode === 'focus'} 
               onclick={() => setMode('focus')}
            >
               Focus
            </TogglePrimitive>
            <TogglePrimitive 
               toggle={mode === 'break'} 
               onclick={() => setMode('break')}
            >
               Break
            </TogglePrimitive>
        </ConnectedButtons>
    </div>

    <div class="timer-display m3-font-display-large">
      {formatTime(timeLeft)}
    </div>

    <div class="controls-main">
       <FAB 
         icon={isRunning ? iconPause : iconPlayArrow} 
         color="primary"
         onclick={toggleTimer}
       />
       <Button variant="tonal" onclick={resetTimer} iconType="full">
          <Icon icon={iconRefresh} />
       </Button>
    </div>
  </div>
</WidgetContainer>

<style>
  .pomodoro-widget {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
  }
  
  .timer-display {
      font-variant-numeric: tabular-nums;
      color: rgb(var(--m3-scheme-on-surface));
  }
  
  .controls-main {
      display: flex;
      align-items: center;
      gap: 1rem;
  }
</style>
