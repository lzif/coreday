# Instructions for AI Agents

This file provides context and guidelines for future AI agents working on Coreday.

## Project Philosophy
1. **Apple-like Design:** All UI elements must adhere to the Apple design language. Clean lines, generous whitespace, subtle shadows, rounded corners, and glassmorphism. Avoid Material Design's heavy elevation or ripple effects.
2. **Offline-First:** The app must be fully functional without an internet connection. All data *must* be stored in `localStorage` using the provided `persistentStore` factory. Do not introduce backend dependencies unless explicitly requested.
3. **Modular Dashboard:** The dashboard is the core experience. Widgets must be independent, resizeable (future feature), and draggable.

## Codebase Conventions

### Stores
- Always use `persistentStore` from `src/stores/persistence.js` for any state that needs to be saved.
- **Naming:** Prefix localStorage keys with `coreday_` (e.g., `coreday_finance`).

### Styling (Tailwind)
- Use `clsx` and `tailwind-merge` (via `cn` utility) for dynamic classes.
- Prefer `bg-white/50` or `bg-white/40` with `backdrop-blur` for inner containers to maintain the glass effect.
- **Icons:** Use `lucide-svelte`.

### Components
- **WidgetContainer:** All dashboard widgets **must** be wrapped in `<WidgetContainer>`. This ensures visual consistency.
- **Icons:** Pass icon components as props or slots, do not hardcode SVGs.

## Common Tasks

### Adding a New Feature
1. **Define Store:** Add a new export in `src/stores/appStores.js`.
2. **Create Widget:** Build the UI in `src/lib/components/widgets/<Feature>Widget.svelte`.
3. **Register Widget:**
   - Import it in `src/lib/components/Dashboard.svelte`.
   - Add it to the `widgetComponents` map.
   - Add a default entry to the `defaultLayout` array in `src/stores/appStores.js`.

### Modifying the Sidebar
- Edit `src/lib/components/Sidebar.svelte`.
- Ensure mobile navigation (bottom bar) is updated alongside the desktop sidebar.

### Troubleshooting
- **Drag & Drop Issues:** Ensure `svelte-dnd-action` is correctly handling `consider` and `finalize` events.
- **Persistence Issues:** Check that `JSON.stringify` handles the data structure correctly (avoid circular references).
