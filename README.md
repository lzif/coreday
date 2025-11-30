<div align="center">
<img width="1200" height="475" alt="Banner" src="https://raw.githubusercontent.com/lzif/coreday-new/refs/heads/main/unnamed.jpg" />
</div>

# Coreday

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73C93?style=for-the-badge&logo=vite&logoColor=white)

Coreday is an intelligent productivity and life management application powered by the Google Gemini API. It utilizes advanced AI agents to assist users in managing their tasks, habits, finances, and mood, providing holistic insights and actionable advice.

## 🚀 Features

Coreday utilizes the Google Gemini API (`gemini-2.5-flash`) to power two distinct intelligent agents:

### 🧠 The Insight Engine (Life Coach)
The Insight Engine acts as a holistic analyst, correlating data across different modules (Finance, Habits, Mood) to provide actionable life advice.

*   **Role:** Analytical Life Coach
*   **Function:** Analyzes your finance balance, recent transactions, pending tasks, habit streaks, and recent moods.
*   **Output:** Provides trendspotting (identifying patterns), actionable advice (small steps to improve), and motivation.
*   **Location:** Access via the "Generate Insights" button.

### ✨ The Productivity Agent (Magic Wand)
This agent focuses on executive function, helping users overcome "task paralysis" by breaking down large, vague goals into manageable steps.

*   **Role:** Task Decomposer
*   **Function:** Takes a broad task (e.g., "Plan a birthday party") and breaks it down into 3-5 smaller, actionable subtasks.
*   **Trigger:** Click the "Magic Wand" icon on a specific task.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **AI Integration:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
*   **UI Icons:** [Lucide React](https://lucide.dev/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **Language:** TypeScript

## 🌐 Live Demo

View the app in AI Studio: [Coreday on AI Studio](https://ai.studio/apps/drive/1nSUI9TBFL6f_kkLc2LQUKnfjoID17dP4)

## 💻 Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/) (v20 or higher recommended)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lzif/coreday-new.git
    cd coreday-new
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.
The build workflow is defined in `.github/workflows/deploy.yml`. Changes to the `main` branch will automatically trigger a build and deployment.
