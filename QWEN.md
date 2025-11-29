# Coreday - Modular Life Manager

## Project Overview

Coreday is a comprehensive life management tool designed with Material 3 Expressive design principles (m3-svelte). It features a modular, drag-and-drop dashboard that works fully offline, ensuring your data stays private and accessible anywhere. The application provides a clean, modern interface with soft expressive colors and clear typography, using Material 3 components throughout.

### Key Features
- **Finance Tracker:** Manage income/expenses, view categories, and analyze charts.
- **Time & Task Manager:** Planner, to-dos, subtasks, and calendar integration.
- **Habit Tracker:** Build good habits with checklists, streaks, and statistics.
- **Saving Progress:** Track savings goals with visual progress indicators.
- **Notes & Journal:** Markdown support, tags, pinning, and search functionality.
- **Insight Engine:** Aggregated insights across habits, mood, and finance.
- **Reflective Journal/Mood Tracker:** Log moods and track emotions with charts.
- **Pomodoro Timer & Focus Mode:** Boost productivity with focused work sessions.
- **Widget Dashboard:** Fully modular, drag-and-drop interface. PWA-ready for mobile and desktop.

### Architecture
- **Framework:** Svelte 5 + Vite
- **Styling:** Tailwind CSS with Material 3 design system (m3-svelte)
- **Icons:** Material Symbols from @ktibow/iconset-material-symbols
- **Drag & Drop:** svelte-dnd-action
- **PWA:** vite-plugin-pwa
- **Storage:** `IndexedDB` with fallback to `localStorage` (Offline-first)

## Technologies

### Core Dependencies
- Svelte 5: Reactive frontend framework
- Vite: Fast build tool
- m3-svelte: Material 3 component library
- Tailwind CSS: Utility-first CSS framework
- svelte-dnd-action: Drag-and-drop functionality
- Chart.js: Data visualization
- UUID: Unique identifier generation
- vite-plugin-pwa: Progressive Web App capabilities

### Development Dependencies
- @sveltejs/vite-plugin-svelte: Svelte integration for Vite
- PostCSS & Autoprefixer: CSS processing

## Directory Structure
```
src/
├── app.css: Main styles and Material 3 theme variables
├── App.svelte: Main application with navigation and routing
├── main.js: Application entry point
├── assets/: Static assets
├── lib/: Reusable components and utilities
│   ├── components/: UI components
│   │   ├── widgets/: Feature-specific widgets
│   │   ├── Dashboard.svelte: Main dashboard with drag-and-drop
│   │   └── WidgetContainer.svelte: Widget wrapper component
│   └── utils/: Utility functions
└── stores/: Application state management and persistence
    ├── appStores.js: All feature-specific stores
    └── persistence.js: localStorage sync implementation
```

## Building and Running

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation and Development
1. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

3. Build for production:
   ```bash
   pnpm build
   # or
   npm run build
   ```

4. Preview the production build:
   ```bash
   pnpm preview
   # or
   npm run preview
   ```

## Development Conventions

### Project Philosophy
1. **Material 3 Expressive Design:** The application follows the Material 3 Expressive design system. Use the `m3-svelte` library for all UI components.
   - **Visuals:** Use vibrant colors, standard M3 elevation, and shapes.
   - **Forbidden:** Do NOT use "Apple-like" design, glassmorphism (`backdrop-blur`), or large custom rounded corners.
2. **Offline-First:** The app must be fully functional without an internet connection. All data *must* be stored in `localStorage` using the provided `persistentStore` factory. Do not introduce backend dependencies unless explicitly requested.
3. **Modular Dashboard:** The dashboard is the core experience. Widgets must be independent, resizeable (future feature), and draggable.

### Libraries
- **Components:** `m3-svelte`.
- **Icons:** `@ktibow/iconset-material-symbols` (pass as objects to components).
- **Styling:** CSS Variables (`--m3-scheme-*`, `--m3-util-*`) and utility classes from `m3-svelte`.

### Styling
- **Theme:** The theme is defined in `src/app.css` using M3 CSS variables.
- **Components:** M3 components do not accept class names for styling. Use wrapper `div`s for layout (margins, sizing) if necessary, but prefer `gap` in flex/grid containers.
- **Colors:** Use CSS variables like `var(--m3-scheme-primary)`, `var(--m3-scheme-surface-container)`, etc.

### Components
- **WidgetContainer:** All dashboard widgets **must** be wrapped in `<WidgetContainer>`. This uses an M3 `Card` (Filled variant).
- **Icons:** Import icons from `@ktibow/iconset-material-symbols/<icon_name>`.

## Common Development Tasks

### Adding a New Feature
1. **Define Store:** Add a new export in `src/stores/appStores.js`.
2. **Create Widget:** Build the UI in `src/lib/components/widgets/<Feature>Widget.svelte` using `m3-svelte` components.
3. **Register Widget:**
   - Import it in `src/lib/components/Dashboard.svelte`.
   - Add it to the `widgetComponents` map.
   - Add a default entry to the `defaultLayout` array in `src/stores/appStores.js`.

### Modifying the Navigation
- The navigation is handled by `NavCMLX` in `src/App.svelte` (or a dedicated wrapper).
- Ensure it works across breakpoints (Rail on desktop, Bottom Bar on mobile).

### Troubleshooting
- **Drag & Drop Issues:** Ensure `svelte-dnd-action` is correctly handling `consider` and `finalize` events.
- **Styling Issues:** Remember `m3-svelte` components isolate styles. Do not try to override them with global classes.

### Data Persistence
The application uses a custom `persistentStore` factory that syncs data with localStorage. The store automatically saves to localStorage whenever its value changes. The key and initial value are passed as parameters to the factory.

Example usage:
```javascript
export const finance = persistentStore('coreday_finance', {
  balance: 0,
  transactions: []
});
```

### Adding New Widgets
Each widget should:
1. Be wrapped in the `<WidgetContainer>` component
2. Use m3-svelte components for consistency
3. Subscribe to the appropriate store for data
4. Handle events and user interactions appropriately