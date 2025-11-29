# Instructions for AI Agents

This file provides context and guidelines for future AI agents working on Coreday.

## Project Philosophy
1. **Material 3 Expressive Design:** The application follows the Material 3 Expressive design system. Use the `m3-svelte` library for all UI components.
    - **Visuals:** Use vibrant colors, standard M3 elevation, and shapes.
    - **Forbidden:** Do NOT use "Apple-like" design, glassmorphism (`backdrop-blur`), or large custom rounded corners.
2. **Offline-First:** The app must be fully functional without an internet connection. All data *must* be stored in `localStorage` using the provided `persistentStore` factory. Do not introduce backend dependencies unless explicitly requested.
3. **Modular Dashboard:** The dashboard is the core experience. Widgets must be independent, resizeable (future feature), and draggable.

## Codebase Conventions

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

## Common Tasks

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
