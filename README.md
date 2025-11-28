# Coreday — Modular Life Manager

**Style:** Modular dashboard, offline-first, clean, modern, soft expressive colors, clear typography.

Coreday is a comprehensive life management tool designed with an Apple-like aesthetic (macOS/iOS). It features a modular, drag-and-drop dashboard that works fully offline, ensuring your data stays private and accessible anywhere.

## ✨ Features

- **Finance Tracker:** Manage income/expenses, view categories, and analyze charts.
- **Time & Task Manager:** Planner, to-dos, subtasks, and calendar integration.
- **Habit Tracker:** Build good habits with checklists, streaks, and statistics.
- **Saving Progress:** Track savings goals with visual progress indicators.
- **Notes & Journal:** Markdown support, tags, pinning, and search functionality.
- **Insight Engine:** Aggregated insights across habits, mood, and finance.
- **Reflective Journal/Mood Tracker:** Log moods and track emotions with charts.
- **Pomodoro Timer & Focus Mode:** Boost productivity with focused work sessions.
- **Widget Dashboard:** Fully modular, drag-and-drop interface. PWA-ready for mobile and desktop.

## 🎨 UI/UX

- **UX:** Intuitive, responsive, optimized for both mobile and desktop.
- **UI:** Apple-like design language (Glassmorphism, clean lines, rounded corners).
- **Persistence:** Offline-first architecture using `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗 Architecture

### Tech Stack
- **Framework:** Svelte 5 + Vite
- **Styling:** Tailwind CSS (configured for Apple/Glassmorphism style)
- **Icons:** Lucide Svelte
- **Drag & Drop:** svelte-dnd-action
- **PWA:** vite-plugin-pwa
- **Storage:** `IndexedDB`,fallback to `localStorage` (Offline-first)

### Directory Structure
- `src/stores/`: Contains the global state and persistence logic.
- `src/lib/components/`: Reusable UI components.
- `src/lib/components/widgets/`: Specific feature widgets (Finance, Tasks, etc.).
- `src/lib/utils/`: Utility functions (e.g., class name merging).

## 🛠 Extending the Project

To add a new widget:
1. Create a new component in `src/lib/components/widgets/`.
2. Wrap it with `<WidgetContainer title="...">`.
3. Create a new store in `src/stores/appStores.js` if it needs data persistence.
4. Import and map the new widget in `src/lib/components/Dashboard.svelte`.
5. Add a default entry to the `widgetsLayout` store in `src/stores/appStores.js`.

