# CelebrationCraft Repository Instructions

## Project overview

- CelebrationCraft is a responsive, single-page React event and booking application for Karnataka-inspired celebrations.
- It uses React 19, Vite 8, Tailwind CSS v4 through the Tailwind Vite plugin, and Lucide React icons.
- The application is frontend-only. There is no API, backend, router package, or database; data is kept in React state and persisted in `localStorage`.
- Navigation is implemented with the `activeTab` state and URL hash values: `#events`, `#book`, and `#create`.

## Working in this repository

- Keep the existing Vite/ES module structure and add reusable React UI in `src/components/`.
- Use `src/App.jsx` as the application state and navigation coordinator.
- Use `src/data/initialEvents.js` for seed events, categories, and Karnataka presets.
- Use `src/main.jsx` only for React bootstrap and global CSS imports.
- Put shared or page-wide custom CSS in `src/index.css`; do not add a separate styling system.
- Do not edit generated output in `dist/` or dependency content in `node_modules/`.

## Commands

Run commands from the repository root:

- `npm install` - install dependencies
- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run lint` - run Oxlint
- `npm run preview` - preview the production build

There is currently no test runner or test script. For behavior changes, at minimum run `npm run lint` and `npm run build`. Prefer the smallest relevant manual browser verification.

## React conventions

- Write functional components and React hooks; use the existing JSX style.
- Keep component props explicit and small. Pass handlers from `App.jsx` for mutations that affect shared state.
- Preserve the current direct state-driven navigation model. Do not introduce React Router unless the task explicitly requires it.
- Use `useState` for local form/UI state, `useEffect` for persistence or browser-event synchronization, and `useMemo` for derived filtered/sorted lists.
- Initialize state lazily when reading or parsing `localStorage`.
- When parsing persisted JSON, keep an existing safe fallback and log parse/read failures with `console.error`.
- Prefer immutable state updates and derived values instead of mutating arrays or objects.
- Cleanup browser listeners in the effect that registers them.
- Use stable, unique keys for rendered lists.

## State and data rules

- Shared event, booking, filter, modal, and active-tab state belong in `App.jsx`.
- Events and bookings must continue to persist under these existing keys:
  - `celebration_craft_events`
  - `celebration_craft_bookings`
- Custom events must use a unique ID and the existing event shape from `INITIAL_EVENTS`.
- Presets belong in `KARNATAKA_PRESETS`; seed catalog data belongs in `INITIAL_EVENTS`.
- If a data shape changes, update every reader/renderer that consumes it, including event cards, details, booking, and custom preview components.
- Booking records should remain consistent with the existing booking shape and include a generated `CC-KAR-*` reference.

## UI and styling conventions

- Use Tailwind utility classes for layout and component styling.
- Keep the existing warm stone/amber/orange/emerald visual palette, serif display headings, and rounded card language.
- Preserve responsive behavior with existing `sm`, `md`, `lg`, and `xl` breakpoints.
- Use Lucide React icons through named imports; do not introduce another icon library.
- Preserve accessibility: use associated labels, keyboard-operable controls, visible focus states, button types, alt text for meaningful images, and modal close behavior.
- Images are primarily remote Unsplash URLs with fallback-image handling where available. Preserve graceful image failures instead of assuming every URL loads.
- Keep currency formatting consistent: Indian rupee notation using `toLocaleString('en-IN')`.
- Existing brand copy and culturally sensitive Karnataka terminology should be preserved unless a task explicitly changes it.

## Validation and interactions

- Perform user input validation close to the form that owns it.
- Surface field-level errors inline and clear the relevant error when the field is corrected.
- Preserve required validation for name, celebration type, event date, guest count, and phone; also validate email when supplied.
- Do not silently treat invalid form submission as success.
- Keep catalog search, category filters, sorting, live custom-event preview, and hash navigation working together.
- When changing navigation or filter behavior, verify browser back/forward hash changes and scroll behavior.

## Change discipline

- Make the smallest complete change and preserve existing behavior outside the requested scope.
- Follow patterns in neighboring components before introducing a helper or abstraction.
- Avoid broad rewrites of `App.jsx`; add or adjust existing props and handlers surgically.
- Do not add runtime dependencies without a clear need.
- Do not commit secrets or environment-specific values.
- Inspect the relevant component, data shape, and persisted-state behavior before editing.
- Add a focused test only if a test setup is introduced as part of the task; do not add testing infrastructure solely for a small UI change.
