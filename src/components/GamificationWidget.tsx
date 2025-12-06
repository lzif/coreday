import React from 'react';
import { ComicCard } from './ui/ComicCard';
import { Trophy, Star, Shield, Zap, Target, BookOpen, Lock } from 'lucide-react';
import { Badge, GamificationState } from '../types';

export const BADGES: Badge[] = [
    { id: 'first_step', name: 'First Step', description: 'Complete your first task', icon: 'zap' },
    { id: 'streak_master', name: 'On Fire', description: 'Maintain a 5-day habit streak', icon: 'fire' },
    { id: 'money_bags', name: 'Money Bags', description: 'Save over $500', icon: 'star' },
    { id: 'task_warrior', name: 'Task Warrior', description: 'Complete 10 tasks total', icon: 'shield' },
    { id: 'mindful', name: 'Mindful', description: 'Log your mood 5 times', icon: 'book' },
];

interface GamificationWidgetProps {
  state: GamificationState;
}

const IconMap: Record<string, React.ReactNode> = {
    zap: <Zap className="w-5 h-5 text-yellow-600" />,
    fire: <Target className="w-5 h-5 text-red-600" />,
    star: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
    shield: <Shield className="w-5 h-5 text-blue-600" />,
    book: <BookOpen className="w-5 h-5 text-purple-600" />,
};

export const GamificationWidget: React.FC<GamificationWidgetProps> = ({ state }) => {
  const xpForNextLevel = state.level * 100;
  const progress = (state.xp % 100) / 100; // Simplified linear progression for visual

  return (
    <ComicCard title="Your Legacy" color="orange" icon={<Trophy className="w-5 h-5" />}>
      <div className="flex flex-col h-full gap-4">
        
        {/* Level Header */}
        <div className="flex items-center gap-4 bg-orange-50 p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="relative w-16 h-16 flex items-center justify-center bg-black rounded-full border-4 border-white shadow-inner">
                 <span className="text-3xl font-black text-white">{state.level}</span>
                 <div className="absolute -bottom-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black uppercase">
                    Level
                 </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1">
                    <span>XP: {state.xp}</span>
                    <span>Next: {state.level * 100}</span>
                </div>
                <div className="h-4 bg-white border-2 border-black rounded-full overflow-hidden relative">
                    <div 
                        className="h-full bg-yellow-400 border-r-2 border-black" 
                        style={{ width: `${(state.xp / (state.level * 100)) * 100}%` }} 
                    />
                </div>
            </div>
        </div>

        {/* Badges Grid */}
        <div className="flex-1">
            <h4 className="text-sm font-black text-black mb-2 uppercase tracking-wider">Trophy Case</h4>
            <div className="grid grid-cols-4 gap-2">
                {BADGES.map(badge => {
                    const isUnlocked = state.unlockedBadges.includes(badge.id);
                    return (
                        <div key={badge.id} className="group relative flex flex-col items-center justify-center">
                            <div className={`
                                w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center transition-all
                                ${isUnlocked ? 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-200 opacity-60'}
                            `}>
                                {isUnlocked ? IconMap[badge.icon] : <Lock className="w-4 h-4 text-gray-500" />}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover:block w-32 bg-black text-white text-xs p-2 rounded z-20 pointer-events-none">
                                <p className="font-bold text-yellow-300 mb-1">{badge.name}</p>
                                <p>{badge.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>
    </ComicCard>
  );
};