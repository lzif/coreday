import { GoogleGenAI, Type } from "@google/genai";
import { AppState } from "../types";

const SYSTEM_INSTRUCTION = `
You are Coreday's AI Insight Engine. Your goal is to act as a supportive, analytical, and slightly witty life coach.
Analyze the user's provided JSON data (finance, tasks, habits, mood).
Provide a structured response with 3 distinct sections:
1. **Trendspotting**: Identify patterns (e.g., "You spend more when your mood is low").
2. **Actionable Advice**: Give 2 concrete, small steps to improve their week.
3. **Motivation**: A short, punchy encouraging quote or thought based on their progress.

Keep the tone conversational and the output in Markdown format.
`;

export const generateLifeInsights = async (data: AppState): Promise<string> => {
  if (!process.env.API_KEY) {
    return "## API Key Missing\n\nPlease set your Google Gemini API Key to unlock insights.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Prepare a summary of the data to avoid token limits if data is huge
    const summaryData = {
      financeBalance: data.transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0),
      recentTransactions: data.transactions.slice(0, 5),
      pendingTasks: data.tasks.filter(t => !t.completed).length,
      habitStreaks: data.habits.map(h => ({ name: h.name, streak: h.streak })),
      recentMoods: data.moods.slice(0, 7),
      savingsProgress: (data.savingsGoal.current / data.savingsGoal.target) * 100
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: JSON.stringify(summaryData),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate an insight right now. Try again later!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "## Connection Error\n\nI'm having trouble connecting to the insight engine. Please check your internet connection or API key.";
  }
};

export const generateSubtasks = async (taskTitle: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key");
    return ["Check API Key settings", "Manually add subtasks"];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Break down the task "${taskTitle}" into 3 to 5 smaller, actionable subtasks.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini Subtask Error:", error);
    return [];
  }
};