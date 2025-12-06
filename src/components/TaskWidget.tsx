import React, { useState } from 'react';
import { ComicCard, ComicButton, ComicInput } from './ui/ComicCard';
import { CheckSquare, Trash2, Edit2, Check, X, CornerDownRight, Plus, Wand2, Loader2, MoreVertical } from 'lucide-react';
import { Task, SubTask } from '../types';
import { generateSubtasks } from '../services/geminiService';

interface TaskWidgetProps {
  tasks: Task[];
  onAddTask: (t: Task) => void;
  onEditTask: (t: Task) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
}

export const TaskWidget: React.FC<TaskWidgetProps> = ({ 
    tasks, onAddTask, onEditTask, onToggleTask, onDeleteTask,
    onAddSubtask, onToggleSubtask, onDeleteSubtask
}) => {
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [activeSubtaskInput, setActiveSubtaskInput] = useState<string | null>(null);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAdd = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask({
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: newPriority,
      subtasks: []
    });
    setNewTask('');
    setNewPriority('medium');
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (task: Task) => {
    if (editTitle.trim()) {
        onEditTask({ ...task, title: editTitle });
    }
    setEditingTaskId(null);
  };

  const handleAddSubtask = (taskId: string) => {
      if (newSubtaskTitle.trim()) {
          onAddSubtask(taskId, newSubtaskTitle);
          setNewSubtaskTitle('');
          setActiveSubtaskInput(null);
      }
  };

  const handleMagicBreakdown = async (task: Task) => {
      setGeneratingFor(task.id);
      const subtasks = await generateSubtasks(task.title);
      subtasks.forEach(st => onAddSubtask(task.id, st));
      setGeneratingFor(null);
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const priorityConfig = {
      high: { color: 'bg-red-100 border-red-500 text-red-900', label: '!!!' },
      medium: { color: 'bg-yellow-100 border-yellow-500 text-yellow-900', label: '!!' },
      low: { color: 'bg-blue-100 border-blue-500 text-blue-900', label: '!' },
  };

  return (
    <ComicCard title="Tasks" color="blue" icon={<CheckSquare className="w-5 h-5" />}>
      <div className="flex flex-col h-full">
        <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-4">
          <div className="flex-1">
             <ComicInput 
                placeholder="What needs doing?" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <select 
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="h-[44px] min-w-[80px] border-2 border-black rounded-lg px-2 bg-white text-sm font-black uppercase cursor-pointer hover:bg-gray-50 outline-none text-black"
            >
                <option value="low">Low</option>
                <option value="medium">Med</option>
                <option value="high">High</option>
            </select>
            <ComicButton type="submit" className="min-w-[80px]">Add</ComicButton>
          </div>
        </form>

        <div className="flex-1 overflow-auto space-y-3 pb-4">
          {activeTasks.length === 0 && completedTasks.length === 0 && (
             <div className="text-center py-12 flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                   <CheckSquare className="w-12 h-12 text-gray-300" />
                </div>
                <p className="text-gray-500 font-bold">No tasks yet. Create one!</p>
             </div>
          )}

          {activeTasks.map(task => (
            <div key={task.id} className={`relative bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-3 ${task.priority === 'high' ? 'ring-2 ring-red-400 ring-offset-1' : ''}`}>
                
                {/* Priority Badge */}
                <div className={`absolute -top-2 -right-2 px-1.5 py-0.5 rounded border-2 border-black text-[10px] font-black uppercase ${priorityConfig[task.priority].color}`}>
                    {task.priority}
                </div>

                {/* Main Task Row */}
                <div className="flex items-start gap-3">
                    <button 
                        onClick={() => onToggleTask(task.id)}
                        className="w-8 h-8 border-2 border-black rounded flex-shrink-0 flex items-center justify-center hover:bg-blue-100 bg-white mt-1"
                    />
                    
                    {editingTaskId === task.id ? (
                        <div className="flex-1 flex gap-2 items-center">
                            <input 
                                autoFocus
                                className="flex-1 border-b-2 border-blue-500 outline-none font-black text-lg p-1"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task)}
                            />
                            <button onClick={() => saveEdit(task)} className="p-2 hover:bg-green-100 rounded border-2 border-transparent hover:border-green-200"><Check className="w-5 h-5 text-green-600"/></button>
                            <button onClick={() => setEditingTaskId(null)} className="p-2 hover:bg-red-100 rounded border-2 border-transparent hover:border-red-200"><X className="w-5 h-5 text-red-600"/></button>
                        </div>
                    ) : (
                        <span className="flex-1 font-black text-black break-words pt-1 leading-snug text-lg">{task.title}</span>
                    )}

                    <div className="flex gap-1 items-start">
                         <button 
                             onClick={() => handleMagicBreakdown(task)} 
                             className="min-h-[44px] min-w-[44px] text-purple-600 hover:bg-purple-50 p-1 rounded flex items-center justify-center"
                             title="AI Breakdown"
                             disabled={generatingFor === task.id}
                         >
                             {generatingFor === task.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                         </button>
                         <button 
                             onClick={() => startEditing(task)} 
                             className="min-h-[44px] min-w-[44px] text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1 rounded flex items-center justify-center"
                         >
                             <Edit2 className="w-5 h-5" />
                         </button>
                         
                         {showDeleteConfirm === task.id ? (
                            <div className="flex flex-col gap-1 absolute right-0 top-10 bg-white border-2 border-black p-2 rounded shadow-lg z-10">
                                <span className="text-xs font-bold text-center">Delete?</span>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => onDeleteTask(task.id)} 
                                        className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-600"
                                    >
                                        Yes
                                    </button>
                                    <button 
                                        onClick={() => setShowDeleteConfirm(null)} 
                                        className="bg-gray-200 px-2 py-1 rounded text-xs font-bold hover:bg-gray-300"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                         ) : (
                             <button 
                                 onClick={() => setShowDeleteConfirm(task.id)} 
                                 className="min-h-[44px] min-w-[44px] text-gray-400 hover:text-red-600 hover:bg-red-50 p-1 rounded flex items-center justify-center"
                             >
                                 <Trash2 className="w-5 h-5" />
                             </button>
                         )}
                    </div>
                </div>

                {/* Subtasks Section */}
                <div className="ml-11 mt-3 space-y-2">
                    {task.subtasks && task.subtasks.map(sub => (
                        <div key={sub.id} className="flex items-center gap-3 group/sub min-h-[32px]">
                            <CornerDownRight className="w-4 h-4 text-gray-400" />
                            <button 
                                onClick={() => onToggleSubtask(task.id, sub.id)}
                                className={`w-5 h-5 border border-black rounded flex items-center justify-center flex-shrink-0 ${sub.completed ? 'bg-black' : 'bg-white'}`}
                            >
                                {sub.completed && <Check className="w-4 h-4 text-white" />}
                            </button>
                            <span className={`text-sm font-bold flex-1 ${sub.completed ? 'text-gray-600 line-through decoration-2 decoration-gray-400' : 'text-black'}`}>
                                {sub.title}
                            </span>
                            <button 
                                onClick={() => onDeleteSubtask(task.id, sub.id)} 
                                className="min-w-[32px] min-h-[32px] flex items-center justify-center text-gray-400 hover:text-red-600 md:opacity-0 md:group-hover/sub:opacity-100"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}
                    
                    {/* Add Subtask Input */}
                    {activeSubtaskInput === task.id ? (
                         <div className="flex gap-2 items-center mt-2 pl-7">
                            <input 
                                className="flex-1 h-10 border border-gray-300 rounded px-2 outline-none focus:border-black font-medium text-black"
                                placeholder="Subtask..."
                                autoFocus
                                value={newSubtaskTitle}
                                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask(task.id)}
                            />
                            <button onClick={() => handleAddSubtask(task.id)} className="h-10 px-3 bg-blue-100 text-blue-900 rounded font-bold hover:bg-blue-200">Add</button>
                            <button onClick={() => setActiveSubtaskInput(null)} className="h-10 px-3 text-gray-500 font-bold hover:bg-gray-100 rounded">Cancel</button>
                         </div>
                    ) : (
                        <button 
                            onClick={() => setActiveSubtaskInput(task.id)}
                            className="h-8 px-2 rounded hover:bg-blue-50 text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 ml-7"
                        >
                            <Plus className="w-3 h-3" /> Add subtask
                        </button>
                    )}
                </div>

            </div>
          ))}

          {completedTasks.length > 0 && (
             <div className="mt-8">
                <h4 className="text-sm font-black uppercase text-gray-600 mb-3 border-b-2 border-gray-300 pb-1">Done</h4>
                <div className="space-y-3">
                    {completedTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-100 border-2 border-gray-400 rounded-lg opacity-75">
                           <button 
                            onClick={() => onToggleTask(task.id)}
                            className="w-6 h-6 bg-gray-800 border-2 border-gray-800 rounded flex-shrink-0 flex items-center justify-center hover:bg-black transition-colors"
                           >
                            <span className="text-white text-xs font-bold">✓</span>
                           </button>
                           <span className="flex-1 font-bold text-gray-600 line-through decoration-2 decoration-gray-500">{task.title}</span>
                           <button 
                                onClick={() => onDeleteTask(task.id)} 
                                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-red-600"
                           >
                             <Trash2 className="w-5 h-5" />
                           </button>
                        </div>
                    ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </ComicCard>
  );
};
