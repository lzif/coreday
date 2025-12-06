import React, { useState } from 'react';
import { ComicCard, ComicButton, ComicInput } from './ui/ComicCard';
import { DollarSign, TrendingUp, TrendingDown, Plus, Save, Edit2, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';

interface FinanceWidgetProps {
  transactions: Transaction[];
  onAddTransaction: (t: Transaction) => void;
  onEditTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  savings: { target: number; current: number; name: string };
  onUpdateSavings: (val: number) => void;
}

const COLORS = ['#86efac', '#fca5a5']; // Green (Income), Red (Expense)

export const FinanceWidget: React.FC<FinanceWidgetProps> = ({ transactions, onAddTransaction, onEditTransaction, onDeleteTransaction, savings, onUpdateSavings }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!amount || !desc) return;
    
    const transactionData = {
      id: editingId || Date.now().toString(),
      amount: parseFloat(amount),
      description: desc,
      type,
      date: editingId ? transactions.find(t => t.id === editingId)?.date || new Date().toISOString() : new Date().toISOString()
    };

    if (editingId) {
        onEditTransaction(transactionData);
        setEditingId(null);
    } else {
        onAddTransaction(transactionData);
    }
    
    setAmount('');
    setDesc('');
    setType('expense');
  };

  const handleEditClick = (t: Transaction) => {
    setEditingId(t.id);
    setAmount(t.amount.toString());
    setDesc(t.description);
    setType(t.type);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAmount('');
    setDesc('');
    setType('expense');
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  return (
    <ComicCard title="Finance" color="green" icon={<DollarSign className="w-5 h-5" />}>
      <div className="flex flex-col h-full gap-4">
        
        {/* Balance Card */}
        <div className="bg-emerald-50 border-2 border-black rounded-lg p-3 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <p className="text-xs font-bold uppercase text-emerald-900">Net Balance</p>
            <p className="text-2xl font-black text-black">${balance.toFixed(2)}</p>
          </div>
          <div className="h-12 w-12">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={chartData} cx="50%" cy="50%" innerRadius={10} outerRadius={20} fill="#8884d8" paddingAngle={5} dataKey="value">
                   {chartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="black" strokeWidth={1} />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-black">
                <span>{savings.name}</span>
                <span>${savings.current} / ${savings.target}</span>
            </div>
            <div className="h-4 w-full bg-white border-2 border-black rounded-full overflow-hidden relative">
                <div 
                    className="h-full bg-yellow-300 border-r-2 border-black transition-all duration-500"
                    style={{ width: `${Math.min((savings.current / savings.target) * 100, 100)}%` }}
                />
            </div>
            <div className="flex gap-2 mt-1">
                <button 
                  onClick={() => onUpdateSavings(savings.current + 10)} 
                  className="bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 transition-colors"
                >
                  +$10
                </button>
                <button 
                  onClick={() => onUpdateSavings(savings.current + 50)} 
                  className="bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 transition-colors"
                >
                  +$50
                </button>
            </div>
        </div>

        {/* Input Area */}
        <div className={`flex flex-col gap-2 p-3 rounded-xl border-2 border-dashed transition-colors ${editingId ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-300'}`}>
          {editingId && <p className="text-xs font-black text-yellow-800 uppercase">Editing Transaction</p>}
          <div className="flex gap-2">
             <ComicInput 
                placeholder="$0.00" 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-1/3 min-h-[48px] p-3 text-lg"
             />
             <ComicInput 
                placeholder="Coffee, Salary..." 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)}
                className="w-2/3 min-h-[48px] p-3"
             />
          </div>
          <div className="flex gap-2 h-12">
            <button 
                onClick={() => setType('income')}
                className={`flex-1 rounded-lg border-2 border-black text-sm font-bold transition-colors ${type === 'income' ? 'bg-emerald-300 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
                Income
            </button>
            <button 
                onClick={() => setType('expense')}
                className={`flex-1 rounded-lg border-2 border-black text-sm font-bold transition-colors ${type === 'expense' ? 'bg-red-300 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
                Expense
            </button>
            <ComicButton onClick={handleSubmit} className="bg-black text-white min-w-[60px] flex justify-center items-center">
                {editingId ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </ComicButton>
            {editingId && (
                <ComicButton onClick={handleCancelEdit} variant="danger" className="min-w-[40px] flex justify-center items-center">
                    <Trash2 className="w-5 h-5" />
                </ComicButton>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto space-y-3 pb-4">
            {transactions.slice().reverse().map(t => (
                <div key={t.id} className={`flex justify-between items-center p-3 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] ${editingId === t.id ? 'ring-2 ring-yellow-400' : ''}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 ${t.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                           {t.type === 'income' ? <TrendingUp className="w-5 h-5 text-emerald-700"/> : <TrendingDown className="w-5 h-5 text-red-600"/>}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-gray-900 truncate">{t.description}</span>
                            <span className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`font-black text-lg ${t.type === 'income' ? 'text-emerald-700' : 'text-red-600'}`}>
                            {t.type === 'income' ? '+' : '-'}${t.amount}
                        </span>
                        <div className="flex gap-1">
                            <button onClick={() => handleEditClick(t)} className="p-2 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600 transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDeleteTransaction(t.id)} className="p-2 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {transactions.length === 0 && <p className="text-center text-gray-500 text-sm italic font-medium py-4">No transactions yet.</p>}
        </div>

      </div>
    </ComicCard>
  );
};
