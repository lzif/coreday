import React, { useState, useEffect, useRef } from 'react';
import { AppState, INITIAL_STATE, Transaction, Task, Habit, MoodEntry, SubTask } from './types';
import { FinanceWidget } from './components/FinanceWidget';
import { TaskWidget } from './components/TaskWidget';
import { HabitWidget } from './components/HabitWidget';
import { MoodWidget } from './components/MoodWidget';
import { PomodoroWidget } from './components/PomodoroWidget';
import { InsightWidget } from './components/InsightWidget';
import { AnalyticsWidget } from './components/AnalyticsWidget';
import { GamificationWidget, BADGES as BADGE_DEFS } from './components/GamificationWidget';
import { ComicCard, ComicButton, MarkdownRenderer } from './components/ui/ComicCard';
import { LayoutGrid, Download, BookOpen, Edit3, Columns, Upload } from 'lucide-react';

const STORAGE_KEY = 'coreday_v2';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [viewMode, setViewMode] = useState<'grid' | 'tab'>('grid');
  const [activeTab, setActiveTab] = useState('profile');
  const [visibleWidgets, setVisibleWidgets] = useState({
    profile: true,
    tasks: true,
    habits: true,
    finance: true,
    analytics: true,
    mood: true,
    pomodoro: true,
    insight: true
  });
  const [showMenu, setShowMenu] = useState(false);
  const [isJournalEditing, setIsJournalEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration for gamification if missing
        if (!parsed.gamification) {
            parsed.gamification = { xp: 0, level: 1, unlockedBadges: [] };
        }
        // Migration for subtasks
        if (parsed.tasks) {
            parsed.tasks = parsed.tasks.map((t: any) => ({
                ...t,
                subtasks: t.subtasks || []
            }));
        }
        setState(parsed);
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // --- Gamification Logic ---
  const addXp = (amount: number, newState: AppState): AppState => {
    const currentXp = newState.gamification.xp + amount;
    const currentLevel = newState.gamification.level;
    const nextLevelThreshold = currentLevel * 100;
    
    let newLevel = currentLevel;
    if (currentXp >= nextLevelThreshold) {
        newLevel += 1;
        // Simple visual feedback could go here (e.g. toast)
    }

    return {
        ...newState,
        gamification: {
            ...newState.gamification,
            xp: currentXp,
            level: newLevel
        }
    };
  };

  const checkBadges = (current: AppState): AppState => {
    const unlocked = new Set(current.gamification.unlockedBadges);
    const completedTasks = current.tasks.filter(t => t.completed).length;
    const maxHabitStreak = current.habits.reduce((max, h) => Math.max(max, h.streak), 0);
    const savings = current.savingsGoal.current;
    const moodCount = current.moods.length;

    if (completedTasks >= 1 && !unlocked.has('first_step')) unlocked.add('first_step');
    if (completedTasks >= 10 && !unlocked.has('task_warrior')) unlocked.add('task_warrior');
    if (maxHabitStreak >= 5 && !unlocked.has('streak_master')) unlocked.add('streak_master');
    if (savings >= 500 && !unlocked.has('money_bags')) unlocked.add('money_bags');
    if (moodCount >= 5 && !unlocked.has('mindful')) unlocked.add('mindful');

    return {
        ...current,
        gamification: {
            ...current.gamification,
            unlockedBadges: Array.from(unlocked)
        }
    };
  };

  const updateStateWithGamification = (updater: (prev: AppState) => AppState, xpReward: number = 0) => {
    setState(prev => {
        let newState = updater(prev);
        if (xpReward > 0) {
            newState = addXp(xpReward, newState);
        }
        newState = checkBadges(newState);
        return newState;
    });
  };

  // --- Handlers ---

  const addTransaction = (t: Transaction) => updateStateWithGamification(
      prev => ({ ...prev, transactions: [...prev.transactions, t] }), 
      5 
  );
  
  const editTransaction = (updatedT: Transaction) => setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => t.id === updatedT.id ? updatedT : t)
  }));
  
  const deleteTransaction = (id: string) => setState(prev => ({ ...prev, transactions: prev.transactions.filter(t => t.id !== id) }));
  
  const updateSavings = (val: number) => updateStateWithGamification(
      prev => ({ ...prev, savingsGoal: { ...prev.savingsGoal, current: val } }),
      val > state.savingsGoal.current ? 10 : 0 
  );

  // TASK HANDLERS
  const addTask = (t: Task) => updateStateWithGamification(
      prev => ({ ...prev, tasks: [...prev.tasks, t] }),
      5
  );
  
  const editTask = (updatedTask: Task) => setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
  }));

  const toggleTask = (id: string) => updateStateWithGamification(
      prev => {
        return { 
            ...prev, 
            tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) 
        };
      },
      20
  );
  
  const deleteTask = (id: string) => setState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));

  // SUBTASK HANDLERS
  const addSubtask = (taskId: string, title: string) => setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
          if (t.id !== taskId) return t;
          // Ensure unique ID even if called rapidly (e.g. via loop)
          const newSub: SubTask = { 
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9), 
            title, 
            completed: false 
          };
          return { ...t, subtasks: [...(t.subtasks || []), newSub] };
      })
  }));

  const toggleSubtask = (taskId: string, subtaskId: string) => setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
          if (t.id !== taskId) return t;
          return {
              ...t,
              subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s)
          };
      })
  }));

  const deleteSubtask = (taskId: string, subtaskId: string) => setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
          if (t.id !== taskId) return t;
          return { ...t, subtasks: t.subtasks.filter(s => s.id !== subtaskId) };
      })
  }));

  const addHabit = (name: string) => setState(prev => ({ 
    ...prev, 
    habits: [...prev.habits, { id: Date.now().toString(), name, streak: 0, completedDates: [] }] 
  }));
  
  const toggleHabit = (id: string, date: string) => updateStateWithGamification(
      prev => ({
        ...prev,
        habits: prev.habits.map(h => {
            if (h.id !== id) return h;
            const exists = h.completedDates.includes(date);
            const newDates = exists ? h.completedDates.filter(d => d !== date) : [...h.completedDates, date].sort();
            return { ...h, completedDates: newDates, streak: newDates.length };
        })
      }),
      15
  );
  
  const deleteHabit = (id: string) => setState(prev => ({ ...prev, habits: prev.habits.filter(h => h.id !== id) }));

  const addMood = (rating: 1|2|3|4|5) => updateStateWithGamification(
      prev => ({
        ...prev,
        moods: [...prev.moods, { id: Date.now().toString(), date: new Date().toISOString(), rating, note: '' }]
      }),
      10
  );

  const editMood = (updatedMood: MoodEntry) => setState(prev => ({
      ...prev,
      moods: prev.moods.map(m => m.id === updatedMood.id ? updatedMood : m)
  }));

  const deleteMood = (id: string) => setState(prev => ({ ...prev, moods: prev.moods.filter(m => m.id !== id) }));
  
  const updateNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => setState(prev => ({ ...prev, notes: e.target.value }));

  // Import/Export Data
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "coreday_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const json = JSON.parse(event.target?.result as string);
            // Basic validation
            if (json.transactions && json.tasks && json.gamification) {
                if (window.confirm("This will overwrite your current data. Are you sure?")) {
                    setState(json);
                }
            } else {
                alert("Invalid backup file format.");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to parse file.");
        }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const widgetComponents = {
    profile: <GamificationWidget state={state.gamification} />,
    analytics: <AnalyticsWidget data={state} />,
    tasks: (
        <TaskWidget 
            tasks={state.tasks} 
            onAddTask={addTask} 
            onEditTask={editTask}
            onToggleTask={toggleTask} 
            onDeleteTask={deleteTask}
            onAddSubtask={addSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
        />
    ),
    finance: (
        <FinanceWidget 
            transactions={state.transactions} 
            onAddTransaction={addTransaction} 
            onEditTransaction={editTransaction}
            onDeleteTransaction={deleteTransaction}
            savings={state.savingsGoal}
            onUpdateSavings={updateSavings}
        />
    ),
    pomodoro: <PomodoroWidget />,
    habits: (
        <HabitWidget 
            habits={state.habits}
            onAddHabit={addHabit}
            onToggleHabit={toggleHabit}
            onDeleteHabit={deleteHabit}
        />
    ),
    insight: <InsightWidget data={state} />,
    mood: <MoodWidget moods={state.moods} onAddMood={addMood} onEditMood={editMood} onDeleteMood={deleteMood} />,
    journal: (
        <ComicCard 
            title="Journal" 
            color="blue" 
            className="h-full"
            action={
                <button 
                    onClick={() => setIsJournalEditing(!isJournalEditing)}
                    className="p-1 hover:bg-blue-200 rounded-md transition-colors"
                    title={isJournalEditing ? "View Preview" : "Edit Journal"}
                >
                    {isJournalEditing ? <BookOpen className="w-4 h-4 text-black" /> : <Edit3 className="w-4 h-4 text-black" />}
                </button>
            }
        >
            {isJournalEditing ? (
                <textarea 
                    className="w-full h-full resize-none outline-none text-sm font-mono font-medium text-gray-900 bg-yellow-50/50 p-2 rounded-lg placeholder:text-gray-500 border-2 border-transparent focus:border-black/10 transition-colors"
                    value={state.notes}
                    onChange={updateNotes}
                    placeholder="# Daily Journal\n\nStart writing here..."
                    autoFocus
                />
            ) : (
                <div className="h-full overflow-auto bg-yellow-50/30 p-2 rounded-lg" onClick={() => setIsJournalEditing(true)}>
                    <MarkdownRenderer content={state.notes || "Click edit to start writing..."} />
                </div>
            )}
        </ComicCard>
    )
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".json"
      />

      {/* Header */}
      <header className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black drop-shadow-sm">Coreday<span className="text-emerald-600">.</span></h1>
           <p className="text-gray-800 font-bold">Design your day, own your life.</p>
        </div>
        <div className="flex gap-2">
           <ComicButton onClick={() => setViewMode(viewMode === 'grid' ? 'tab' : 'grid')} variant="ghost" className="h-10 px-3 flex items-center justify-center gap-2">
               {viewMode === 'grid' ? <Columns className="w-5 h-5"/> : <LayoutGrid className="w-5 h-5"/>}
               <span className="hidden md:inline">{viewMode === 'grid' ? 'Tab View' : 'Grid View'}</span>
           </ComicButton>
           {viewMode === 'grid' && (
               <ComicButton onClick={() => setShowMenu(!showMenu)} variant="ghost" className="h-10 w-10 flex items-center justify-center p-0">
                   <LayoutGrid className="w-5 h-5" />
               </ComicButton>
           )}
           <ComicButton onClick={handleImportClick} variant="ghost" className="h-10 w-10 flex items-center justify-center p-0" title="Import Data">
               <Upload className="w-5 h-5" />
           </ComicButton>
           <ComicButton onClick={handleExport} variant="ghost" className="h-10 w-10 flex items-center justify-center p-0" title="Export Backup">
               <Download className="w-5 h-5" />
           </ComicButton>
        </div>
      </header>

      {/* Widget Toggle Menu (Only in Grid) */}
      {showMenu && viewMode === 'grid' && (
        <div className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 animate-in slide-in-from-top-4">
            {Object.keys(visibleWidgets).map(key => (
                <label key={key} className="flex items-center gap-2 font-bold cursor-pointer select-none hover:bg-gray-50 p-2 rounded">
                    <input 
                        type="checkbox" 
                        checked={visibleWidgets[key as keyof typeof visibleWidgets]}
                        onChange={() => setVisibleWidgets(prev => ({...prev, [key]: !prev[key as keyof typeof visibleWidgets]}))}
                        className="w-5 h-5 border-2 border-black rounded text-black focus:ring-black accent-black"
                    />
                    <span className="capitalize text-black">{key}</span>
                </label>
            ))}
        </div>
      )}

      {/* --- CONTENT AREA --- */}

      {viewMode === 'tab' ? (
          <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-160px)] min-h-[500px]">
              {/* Tab Sidebar */}
              <div className="md:w-48 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                  {Object.keys(widgetComponents).map(key => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`
                            px-4 py-3 rounded-lg border-2 border-black font-bold text-sm text-left capitalize transition-all whitespace-nowrap
                            ${activeTab === key ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-gray-800 hover:bg-gray-100'}
                        `}
                      >
                          {key}
                      </button>
                  ))}
              </div>
              
              {/* Active Tab Content */}
              <div className="flex-1 h-full overflow-hidden">
                  <div className="h-full animate-in fade-in duration-300">
                     {widgetComponents[activeTab as keyof typeof widgetComponents]}
                  </div>
              </div>
          </div>
      ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
            
            {visibleWidgets.profile && <div className="md:col-span-1">{widgetComponents.profile}</div>}

            {visibleWidgets.analytics && <div className="md:col-span-2">{widgetComponents.analytics}</div>}

            {visibleWidgets.tasks && <div className="md:row-span-2">{widgetComponents.tasks}</div>}

            {visibleWidgets.finance && <div className="md:col-span-1">{widgetComponents.finance}</div>}

            {visibleWidgets.pomodoro && <div className="md:col-span-1 h-64">{widgetComponents.pomodoro}</div>}

            {visibleWidgets.habits && <div className="md:col-span-2">{widgetComponents.habits}</div>}

            {visibleWidgets.insight && <div className="md:col-span-1 md:row-span-2">{widgetComponents.insight}</div>}

            {visibleWidgets.mood && <div className="md:col-span-1">{widgetComponents.mood}</div>}

            <div className="md:col-span-2 lg:col-span-1 h-full min-h-[300px]">
                {widgetComponents.journal}
            </div>

          </div>
      )}

      <footer className="text-center py-8 text-gray-800 text-sm font-bold">
        <p>Coreday © {new Date().getFullYear()} — Your data lives locally.</p>
      </footer>

    </div>
  );
};

export default App;