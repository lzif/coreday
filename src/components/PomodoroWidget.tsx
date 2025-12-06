import React, { useState, useEffect, useRef } from 'react';
import { ComicCard, ComicButton } from './ui/ComicCard';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export const PomodoroWidget: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'short') setTimeLeft(5 * 60);
    if (mode === 'long') setTimeLeft(15 * 60);
  };

  const changeMode = (m: 'work' | 'short' | 'long') => {
    setMode(m);
    setIsActive(false);
    if (m === 'work') setTimeLeft(25 * 60);
    if (m === 'short') setTimeLeft(5 * 60);
    if (m === 'long') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - (timeLeft / (mode === 'work' ? 25*60 : mode === 'short' ? 5*60 : 15*60));

  return (
    <ComicCard title="Focus" color="orange" icon={<Timer className="w-5 h-5" />}>
      <div className="flex flex-col items-center justify-center h-full gap-4 relative">
        
        <div className="flex gap-2 mb-2 w-full">
            {(['work', 'short', 'long'] as const).map((m) => (
                <button
                    key={m}
                    onClick={() => changeMode(m)}
                    className={`flex-1 text-xs font-black py-1.5 px-2 rounded border-2 border-black transition-all ${mode === m ? 'bg-orange-400 text-black shadow-none translate-y-0.5' : 'bg-white text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50'}`}
                >
                    {m === 'work' ? 'Work' : m === 'short' ? 'Break' : 'Long'}
                </button>
            ))}
        </div>

        <div className="relative w-40 h-40 flex items-center justify-center bg-orange-50 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
             {/* Progress Ring Simulation */}
            <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 pointer-events-none">
                <circle cx="50%" cy="50%" r="45%" fill="transparent" strokeWidth="8" stroke="rgba(0,0,0,0.1)" />
                <circle 
                    cx="50%" cy="50%" r="45%" 
                    fill="transparent" 
                    strokeWidth="8" 
                    stroke="#f97316" /* orange-500 */
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                    style={{ r: '45%' }} // Explicit radius for simple SVG calc
                />
            </svg>
            <span className="text-4xl font-black tabular-nums relative z-10 text-black">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex gap-4 w-full mt-2">
            <ComicButton onClick={toggleTimer} className="flex-1 flex justify-center items-center gap-2 h-12 text-lg">
                {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />} 
                {isActive ? 'Pause' : 'Start'}
            </ComicButton>
            <button onClick={resetTimer} className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] hover:bg-gray-50">
                <RotateCcw className="w-5 h-5 text-black" />
            </button>
        </div>
      </div>
    </ComicCard>
  );
};