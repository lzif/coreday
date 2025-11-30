import React, { useState } from 'react';
import { ComicCard, ComicButton, ComicInput } from './ui/ComicCard';
import { Repeat, Zap } from 'lucide-react';
import { Habit } from '../types';

interface HabitWidgetProps {
  habits: Habit[];
  onAddHabit: (name: string) => void;
  onToggleHabit: (id: string, date: string) => void;
  onDeleteHabit: (id: string) => void;
}

export const HabitWidget: React.FC<HabitWidgetProps> = ({ habits, onAddHabit, onToggleHabit, onDeleteHabit }) => {
  const [newHabit, setNewHabit] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    onAddHabit(newHabit);
    setNewHabit('');
  };

  const today = new Date().toISOString().split('T')[0];
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  return (
    <ComicCard title="Habits" color="purple" icon={<Repeat className="w-5 h-5" />}>
      <div className="flex flex-col h-full gap-4">
        <form onSubmit={handleAdd} className="flex gap-2">
          <ComicInput 
            placeholder="New habit..." 
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <ComicButton type="submit">Track</ComicButton>
        </form>

        <div className="overflow-auto">
          {habits.map(habit => {
            const isCompletedToday = habit.completedDates.includes(today);
            return (
                <div key={habit.id} className="mb-4 bg-purple-50 p-3 rounded-xl border-2 border-purple-200">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-black">{habit.name}</span>
                            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-black text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                                <Zap className="w-3 h-3 fill-yellow-400 text-black" />
                                <span className="text-black">{habit.streak}</span>
                            </div>
                        </div>
                        <button onClick={() => onDeleteHabit(habit.id)} className="text-gray-500 hover:text-red-600 text-xs font-bold">remove</button>
                    </div>

                    <div className="flex justify-between items-center gap-1">
                        {last7Days.map((date, idx) => {
                            const completed = habit.completedDates.includes(date);
                            const isToday = date === today;
                            const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'narrow' });
                            
                            return (
                                <div key={date} className="flex flex-col items-center gap-1 flex-1">
                                    <span className="text-[10px] font-bold text-gray-700">{dayLabel}</span>
                                    <button 
                                        onClick={() => onToggleHabit(habit.id, date)}
                                        className={`
                                            w-8 h-8 rounded-lg border-2 border-black transition-all
                                            flex items-center justify-center
                                            ${completed 
                                                ? 'bg-purple-600 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]' 
                                                : 'bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                                            }
                                            ${isToday ? 'ring-2 ring-offset-1 ring-purple-500' : ''}
                                        `}
                                    >
                                        {completed && <span className="text-white font-bold text-xs">✓</span>}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
          })}
           {habits.length === 0 && <p className="text-center text-gray-500 italic mt-4 font-medium">Consistency is key. Start one today.</p>}
        </div>
      </div>
    </ComicCard>
  );
};