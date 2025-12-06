import React, { useState } from 'react';
import { ComicCard, ComicButton } from './ui/ComicCard';
import { BarChart2, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, Area, AreaChart 
} from 'recharts';
import { AppState } from '../types';

interface AnalyticsWidgetProps {
  data: AppState;
}

export const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'correlation' | 'finance'>('correlation');

  // PREPARE DATA: Mood vs Spending Correlation
  // We group expenses by date and match them with the average mood for that date
  const correlationData = (() => {
    const map = new Map<string, { date: string; expense: number; mood: number | null }>();
    
    // Get last 14 days
    for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        map.set(dateStr, { date: dayName, expense: 0, mood: null });
    }

    // Sum expenses
    data.transactions.forEach(t => {
        const dateStr = t.date.split('T')[0];
        if (map.has(dateStr) && t.type === 'expense') {
            const entry = map.get(dateStr)!;
            entry.expense += t.amount;
        }
    });

    // Avg Mood
    data.moods.forEach(m => {
        const dateStr = m.date.split('T')[0];
        if (map.has(dateStr)) {
            const entry = map.get(dateStr)!;
            // Simplified: just taking the last mood rating for the day for visual clarity
            entry.mood = m.rating;
        }
    });

    return Array.from(map.values());
  })();

  // PREPARE DATA: Financial Trend (Income vs Expense)
  const financeData = (() => {
      const map = new Map<string, { date: string; income: number; expense: number }>();
       // Get last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        map.set(dateStr, { date: dayName, income: 0, expense: 0 });
      }

      data.transactions.forEach(t => {
          const dateStr = t.date.split('T')[0];
          if (map.has(dateStr)) {
              const entry = map.get(dateStr)!;
              if (t.type === 'income') entry.income += t.amount;
              else entry.expense += t.amount;
          }
      });
      return Array.from(map.values());
  })();

  return (
    <ComicCard title="Analytics Lab" color="blue" icon={<Activity className="w-5 h-5" />}>
      <div className="flex flex-col h-full">
        
        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-blue-50 p-1 rounded-lg border-2 border-blue-200">
            <button 
                onClick={() => setActiveTab('correlation')}
                className={`flex-1 py-1 px-2 rounded font-bold text-xs transition-all ${activeTab === 'correlation' ? 'bg-blue-500 text-white shadow-md transform -translate-y-0.5' : 'text-blue-900 hover:bg-blue-100'}`}
            >
                Mood vs. Spend
            </button>
            <button 
                onClick={() => setActiveTab('finance')}
                className={`flex-1 py-1 px-2 rounded font-bold text-xs transition-all ${activeTab === 'finance' ? 'bg-blue-500 text-white shadow-md transform -translate-y-0.5' : 'text-blue-900 hover:bg-blue-100'}`}
            >
                Money Flow
            </button>
        </div>

        {/* Charts */}
        <div className="flex-1 min-h-[200px] w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-2 relative">
            
            <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'correlation' ? (
                    <ComposedChart data={correlationData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                        <XAxis dataKey="date" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" orientation="left" stroke="#ef4444" tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <YAxis yAxisId="right" orientation="right" stroke="#fbbf24" domain={[0, 6]} hide />
                        <Tooltip 
                            contentStyle={{ border: '2px solid black', borderRadius: '8px', boxShadow: '4px 4px 0px 0px black' }}
                            labelStyle={{ fontWeight: 'black', textTransform: 'uppercase' }}
                            formatter={(value, name) => {
                                if (name === 'Mood (1-5)') {
                                    const v = value as number;
                                    const label = v >= 4 ? 'Happy' : v <= 2 ? 'Sad' : 'Neutral';
                                    return [label, 'Mood'];
                                }
                                return [`$${value}`, name];
                            }}
                        />
                        <Bar yAxisId="left" dataKey="expense" barSize={20} fill="#fca5a5" stroke="#ef4444" strokeWidth={2} radius={[4, 4, 0, 0]} name="Spending" />
                        <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#fbbf24" strokeWidth={4} dot={{r: 4, fill: "white", stroke: "black", strokeWidth: 2}} name="Mood (1-5)" />
                    </ComposedChart>
                ) : (
                    <AreaChart data={financeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                        <XAxis dataKey="date" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickFormatter={(val) => `$${val}`} />
                         <Tooltip 
                            contentStyle={{ border: '2px solid black', borderRadius: '8px', boxShadow: '4px 4px 0px 0px black' }}
                            labelStyle={{ fontWeight: 'black', textTransform: 'uppercase' }}
                        />
                        <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#86efac" strokeWidth={3} name="Income" />
                        <Area type="monotone" dataKey="expense" stackId="2" stroke="#ef4444" fill="#fca5a5" strokeWidth={3} name="Expense" />
                    </AreaChart>
                )}
            </ResponsiveContainer>

            {/* Legend/Info Overlay */}
            <div className="absolute top-2 right-2 flex flex-col items-end gap-1 pointer-events-none opacity-80">
                {activeTab === 'correlation' && (
                    <>
                     <span className="text-[10px] font-black bg-yellow-100 px-1 border border-black text-black">● Mood</span>
                     <span className="text-[10px] font-black bg-red-100 px-1 border border-black text-black">▮ Spending</span>
                    </>
                )}
                 {activeTab === 'finance' && (
                    <>
                     <span className="text-[10px] font-black bg-emerald-100 px-1 border border-black text-black">▲ Income</span>
                     <span className="text-[10px] font-black bg-red-100 px-1 border border-black text-black">▼ Expense</span>
                    </>
                )}
            </div>
        </div>
        
        <p className="mt-2 text-xs font-medium text-gray-500 text-center">
            {activeTab === 'correlation' ? 'See how your mood affects your wallet.' : 'Track your cash flow trends.'}
        </p>
      </div>
    </ComicCard>
  );
};