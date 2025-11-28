# Coreday - Modular Life Manager

Coreday is an offline-first, modular dashboard designed with a modern Apple-like aesthetic. It integrates finance tracking, task management, habit tracking, and more into a customizable interface.

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

### Offline-First Persistence
The application uses a custom store factory (`src/stores/persistence.js`) that wraps Svelte's `writable` stores. It automatically syncs state to `localStorage`, ensuring data persists across reloads and offline sessions.

### Directory Structure
- `src/stores/`: Contains the global state and persistence logic.
- `src/lib/components/`: Reusable UI components.
- `src/lib/components/widgets/`: Specific feature widgets (Finance, Tasks, etc.).
- `src/lib/utils/`: Utility functions (e.g., class name merging).

## 🎨 Design System

The design mimics macOS/iOS aesthetics:
- **Glassmorphism:** Use the `.glass` utility class for translucent backgrounds with blur.
- **Colors:** `bg-apple-gray` (#f5f5f7) for the background, `text-apple-dark` (#1d1d1f) for text.
- **Typography:** Uses system fonts (San Francisco, etc.) via Tailwind config.
- **Rounded Corners:** Generous border radius (`rounded-2xl`, `rounded-3xl`).

## 🛠 Extending the Project

To add a new widget:
1. Create a new component in `src/lib/components/widgets/`.
2. Wrap it with `<WidgetContainer title="...">`.
3. Create a new store in `src/stores/appStores.js` if it needs data persistence.
4. Import and map the new widget in `src/lib/components/Dashboard.svelte`.
5. Add a default entry to the `widgetsLayout` store in `src/stores/appStores.js`.
