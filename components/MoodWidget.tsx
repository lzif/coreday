import React, { useState } from 'react';
import { ComicCard, ComicButton, ComicInput } from './ui/ComicCard';
import { Smile, Meh, Frown, Sun, Edit2, Trash2, Save, X } from 'lucide-react';
import { MoodEntry } from '../types';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface MoodWidgetProps {
  moods: MoodEntry[];
  onAddMood: (rating: 1 | 2 | 3 | 4 | 5) => void;
  onEditMood: (mood: MoodEntry) => void;
  onDeleteMood: (id: string) => void;
}

export const MoodWidget: React.FC<MoodWidgetProps> = ({ moods, onAddMood, onEditMood, onDeleteMood }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<1|2|3|4|5>(3);
  const [editNote, setEditNote] = useState('');

  const chartData = moods.slice(-7).map((m) => ({
    name: new Date(m.date).toLocaleDateString('en-US', {weekday: 'narrow'}),
    rating: m.rating,
    fullDate: new Date(m.date).toLocaleDateString()
  }));

  const startEditing = (m: MoodEntry) => {
      setEditingId(m.id);
      setEditRating(m.rating);
      setEditNote(m.note || '');
  };

  const saveEdit = () => {
      if (editingId) {
          const original = moods.find(m => m.id === editingId);
          if (original) {
            onEditMood({ ...original, rating: editRating, note: editNote });
          }
          setEditingId(null);
      }
  };

  const MoodButton = ({ rating, icon, color, onClick, selected }: { rating: 1|2|3|4|5, icon: React.ReactNode, color: string, onClick?: () => void, selected?: boolean }) => (
    <button
        onClick={onClick || (() => onAddMood(rating))}
        className={`
            flex-1 h-10 flex items-center justify-center rounded-lg border-2 border-black
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
            transition-all 
            ${selected ? 'ring-2 ring-black ring-offset-1 ' + color : 'bg-white hover:bg-gray-50'}
        `}
    >
        {icon}
    </button>
  );

  return (
    <ComicCard title="Mood" color="yellow" icon={<Sun className="w-5 h-5" />}>
      <div className="flex flex-col h-full gap-4">
        
        {/* Input / Buttons */}
        <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg border-2 border-black">
            <span className="text-xs font-bold uppercase text-yellow-800">How are you?</span>
            <div className="flex gap-2 w-2/3">
                <MoodButton rating={1} icon={<Frown className="w-4 h-4 text-red-600"/>} color="bg-red-200" />
                <MoodButton rating={3} icon={<Meh className="w-4 h-4 text-yellow-600"/>} color="bg-yellow-200" />
                <MoodButton rating={5} icon={<Smile className="w-4 h-4 text-green-600"/>} color="bg-green-200" />
            </div>
        </div>

        {/* Chart */}
        <div className="min-h-[100px] h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg p-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                    <YAxis domain={[1, 5]} hide />
                    <Tooltip 
                        contentStyle={{ border: '2px solid black', borderRadius: '8px', boxShadow: '4px 4px 0px 0px black' }}
                        itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="rating" stroke="#fbbf24" strokeWidth={3} dot={{r: 4, fill: 'black', strokeWidth: 0}} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-auto space-y-2 max-h-48 border-t-2 border-black/10 pt-2">
            <h4 className="text-xs font-black uppercase text-gray-500 mb-1">Recent Logs</h4>
            {moods.slice().reverse().map(mood => (
                <div key={mood.id} className="bg-white border-2 border-gray-200 p-2 rounded-lg flex flex-col gap-2">
                    {editingId === mood.id ? (
                        <div className="space-y-2">
                            <div className="flex gap-2 justify-center">
                                <MoodButton rating={1} icon={<Frown className="w-4 h-4"/>} color="bg-red-200" onClick={() => setEditRating(1)} selected={editRating === 1} />
                                <MoodButton rating={3} icon={<Meh className="w-4 h-4"/>} color="bg-yellow-200" onClick={() => setEditRating(3)} selected={editRating === 3} />
                                <MoodButton rating={5} icon={<Smile className="w-4 h-4"/>} color="bg-green-200" onClick={() => setEditRating(5)} selected={editRating === 5} />
                            </div>
                            <div className="flex gap-2">
                                <ComicInput value={editNote} onChange={(e) => setEditNote(e.target.value)} placeholder="Add a note..." className="h-8 text-sm" />
                                <button onClick={saveEdit} className="p-1 bg-green-100 rounded border border-green-600"><Save className="w-4 h-4 text-green-700"/></button>
                                <button onClick={() => setEditingId(null)} className="p-1 bg-red-100 rounded border border-red-600"><X className="w-4 h-4 text-red-700"/></button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                             <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full border-2 border-black flex items-center justify-center ${mood.rating > 3 ? 'bg-green-200' : mood.rating < 3 ? 'bg-red-200' : 'bg-yellow-200'}`}>
                                    {mood.rating > 3 ? <Smile className="w-3 h-3"/> : mood.rating < 3 ? <Frown className="w-3 h-3"/> : <Meh className="w-3 h-3"/>}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-bold">{new Date(mood.date).toLocaleString()}</span>
                                    {mood.note && <span className="text-xs font-medium text-gray-800">{mood.note}</span>}
                                </div>
                             </div>
                             <div className="flex gap-1">
                                <button onClick={() => startEditing(mood)} className="text-gray-400 hover:text-blue-600"><Edit2 className="w-3 h-3"/></button>
                                <button onClick={() => onDeleteMood(mood.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-3 h-3"/></button>
                             </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </ComicCard>
  );
};