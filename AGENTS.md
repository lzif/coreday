# Coreday AI Agents

Coreday utilizes the Google Gemini API to power two distinct intelligent agents that assist users with productivity and life management. This document outlines their specific roles, configurations, and interaction models.

## 1. The Insight Engine (Life Coach)

The Insight Engine acts as a holistic analyst, correlating data across different modules (Finance, Habits, Mood) to provide actionable life advice.

*   **Role:** Analytical Life Coach
*   **Model:** `gemini-2.5-flash`
*   **Location:** `components/InsightWidget.tsx` / `services/geminiService.ts`
*   **Trigger:** Manual user request via the "Generate Insights" button.

### Data Context (Input)
The agent receives a sanitized, privacy-focused JSON summary of the user's current state:
```json
{
  "financeBalance": -150.00,
  "recentTransactions": [...],
  "pendingTasks": 4,
  "habitStreaks": [{"name": "Meditation", "streak": 5}],
  "recentMoods": [{"rating": 2, "note": "Tired"}],
  "savingsProgress": 45
}
```

### System Instruction (Prompt)
> You are Coreday's AI Insight Engine. Your goal is to act as a supportive, analytical, and slightly witty life coach.
> Analyze the user's provided JSON data (finance, tasks, habits, mood).
> Provide a structured response with 3 distinct sections:
> 1. **Trendspotting**: Identify patterns (e.g., "You spend more when your mood is low").
> 2. **Actionable Advice**: Give 2 concrete, small steps to improve their week.
> 3. **Motivation**: A short, punchy encouraging quote or thought based on their progress.
>
> Keep the tone conversational and the output in Markdown format.

### Output
Returns formatted Markdown text rendered via the `MarkdownRenderer` component.

---

## 2. The Productivity Agent (Magic Wand)

This agent focuses specifically on executive function, helping users overcome "task paralysis" by breaking down large, vague goals into manageable steps.

*   **Role:** Task Decomposer
*   **Model:** `gemini-2.5-flash`
*   **Location:** `components/TaskWidget.tsx` / `services/geminiService.ts`
*   **Trigger:** User clicks the "Magic Wand" icon (`Wand2`) on a specific task.

### Data Context (Input)
*   **Task Title**: e.g., "Plan a birthday party"

### Prompt Structure
> Break down the task "${taskTitle}" into 3 to 5 smaller, actionable subtasks.

### Configuration
*   **Response Format**: `application/json`
*   **Schema**:
    ```typescript
    {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
    ```

### Output
Returns a pure JSON array of strings (e.g., `["Create guest list", "Buy decorations", "Order cake"]`), which are immediately hydrated into `SubTask` objects in the application state.
