import React, { useState } from 'react';
import { ComicCard, ComicButton, MarkdownRenderer } from './ui/ComicCard';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { AppState } from '../types';
import { generateLifeInsights } from '../services/geminiService';

interface InsightWidgetProps {
  data: AppState;
}

export const InsightWidget: React.FC<InsightWidgetProps> = ({ data }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateLifeInsights(data);
    setInsight(result);
    setLoading(false);
  };

  return (
    <ComicCard title="Life Coach" color="pink" icon={<Sparkles className="w-5 h-5" />} className="h-[400px]">
      <div className="flex flex-col h-full">
        {!insight && !loading && (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="bg-pink-200 p-4 rounded-full border-2 border-black mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <Sparkles className="w-8 h-8 text-black" />
              </div>
              <p className="font-bold text-gray-800 mb-6">
                Ready for some brutal honesty? I'll analyze your finance, habits, and mood to give you personalized advice.
              </p>
              <ComicButton onClick={handleGenerate} className="w-full bg-pink-500 hover:bg-pink-600 text-white border-black">
                 Generate Insights
              </ComicButton>
           </div>
        )}

        {loading && (
            <div className="flex-1 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-pink-600 mb-2" />
                <p className="text-sm font-black animate-pulse text-black">Consulting the oracle...</p>
            </div>
        )}

        {insight && !loading && (
            <div className="flex-1 overflow-auto bg-white pr-2">
                <MarkdownRenderer content={insight} />
                <div className="mt-4 pt-4 border-t-2 border-black/10">
                    <button 
                        onClick={handleGenerate}
                        className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-black transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" /> Refresh Analysis
                    </button>
                </div>
            </div>
        )}
      </div>
    </ComicCard>
  );
};