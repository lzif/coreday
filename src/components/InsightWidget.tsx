import React, { useState } from 'react';
import { ComicCard, ComicButton, MarkdownRenderer } from './ui/ComicCard';
import { Sparkles, Loader2, RefreshCw, AlertTriangle, Settings, Brain, PlugZap } from 'lucide-react';
import { AppState } from '../types';
import { generateLifeInsights } from '../services/geminiService';

interface InsightWidgetProps {
  data: AppState;
}

export const InsightWidget: React.FC<InsightWidgetProps> = ({ data }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
        const result = await generateLifeInsights(data);
        if (!result) {
            throw new Error("No insight generated");
        }
        setInsight(result);
    } catch (err: any) {
        console.error("Insight generation error:", err);
        // Check for common API key errors or empty responses
        if (err.message?.includes('API key') || err.message?.includes('401') || err.message?.includes('403')) {
            setError('API_KEY_MISSING');
        } else {
            setError('GENERIC_ERROR');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <ComicCard title="Life Coach" color="pink" icon={<Sparkles className="w-5 h-5" />} className="h-[400px]">
      <div className="flex flex-col h-full">
        {!insight && !loading && !error && (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="bg-pink-200 p-4 rounded-full border-2 border-black mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <Sparkles className="w-8 h-8 text-black" />
              </div>
              <p className="font-bold text-gray-800 mb-6">
                Ready for some brutal honesty? I'll analyze your finance, habits, and mood to give you personalized advice.
              </p>
              <ComicButton onClick={handleGenerate} className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white border-black text-lg">
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

        {error && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-gray-100 p-4 rounded-full border-2 border-black mb-4 relative">
                    <Brain className="w-8 h-8 text-gray-400" />
                    {error === 'API_KEY_MISSING' && <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border border-white"><PlugZap className="w-3 h-3 text-white" /></div>}
                </div>
                <h3 className="font-black text-xl mb-2 text-black">
                    {error === 'API_KEY_MISSING' ? "AI Brain Offline" : "Oops, brain freeze."}
                </h3>
                <p className="text-gray-600 font-medium mb-6 text-sm">
                    {error === 'API_KEY_MISSING' 
                        ? "Connect your API Key to unlock insights." 
                        : "Something went wrong while thinking. Try again?"}
                </p>
                {error === 'API_KEY_MISSING' ? (
                     <ComicButton onClick={() => window.alert('Settings modal would open here (Add GEMINI_API_KEY)')} className="flex items-center gap-2 bg-black text-white">
                        <Settings className="w-4 h-4" /> Connect API Key
                     </ComicButton>
                ) : (
                    <ComicButton onClick={handleGenerate} variant="primary">
                        Try Again
                    </ComicButton>
                )}
            </div>
        )}

        {insight && !loading && !error && (
            <div className="flex-1 overflow-auto bg-white pr-2">
                <MarkdownRenderer content={insight} />
                <div className="mt-4 pt-4 border-t-2 border-black/10">
                    <button 
                        onClick={handleGenerate}
                        className="min-h-[44px] w-full flex items-center justify-center gap-2 text-sm font-black text-gray-500 hover:text-black transition-colors hover:bg-gray-50 rounded-lg"
                    >
                        <RefreshCw className="w-4 h-4" /> Refresh Analysis
                    </button>
                </div>
            </div>
        )}
      </div>
    </ComicCard>
  );
};
