# Facts

Client-side SPA that shows random / daily facts from the [Useless Facts API](https://uselessfacts.jsph.pl/). Deployed to GitHub Pages at https://fs-frost.github.io/facts (base path `/facts/`).

## Stack

- React + TypeScript, built with Vite
- Bun as package manager and script runner (`bun.lock` is the only lockfile; do not add `yarn.lock` / `package-lock.json`)
- Vitest + Testing Library (jsdom) for tests
- Tailwind CSS v4 via `@tailwindcss/vite` (no config file; setup lives in `src/index.css`)
- Dark mode: class strategy (`dark` on `<html>`, `@custom-variant dark` in `src/index.css`)
- GitHub Actions deploys `dist/` to the `gh-pages` branch on push to `master`

## Commands

```shell
bun install        # install dependencies
bun run dev        # dev server at http://localhost:5173/facts/
bun run build      # type-check + production build into dist/
bun run preview    # serve the production build
bun run test       # run tests once
```

## Structure

- `index.html` — Vite entry HTML (repo root). Inline script applies the saved theme before first paint; keep it in sync with `useTheme`
- `src/index.tsx` — React entry point
- `src/index.css` — Tailwind import, dark variant, base styles
- `src/App.tsx` — page shell (header + main)
- `src/Facts.tsx` — composes controls, fact card, history/favorites lists and debug panel. Owns `selected` (fact picked from a list; `null` = latest fetch) and history navigation
- `src/hooks/useFacts.ts` — fetch state: language (persisted), source (`today` | `random`), loading, abort of stale requests; calls `onLoaded` on each successful fetch
- `src/hooks/useStoredFacts.ts` — newest-first fact list in localStorage, unique by id, optional limit
- `src/hooks/useKeyboardShortcuts.ts` — global shortcuts by `KeyboardEvent.code`; Space skips buttons/links/summary/text entry, arrows skip only text entry
- `src/hooks/useTheme.ts` — `system` | `light` | `dark`, persisted in `localStorage["theme"]`
- `src/components/` — `Header`, `FactCard`, `FactActions` (←/→, favorite, copy, share), `FactLists` (History/Favorites tabs), `DebugPanel`, `icons`

## Features

- Today / Random tabs; Next = random
- Shortcuts: Space = next, ←/→ = older/newer in history
- History: last 50 fetched facts (`localStorage["history"]`), clearable with inline confirm
- Favorites: unlimited (`localStorage["favorites"]`)
- Copy (text + permalink) and Web Share (button hidden when unsupported)
- Remembered language (`localStorage["language"]`)
- `src/FactsClient.ts` — API v2 client (`/api/v2/facts/{random,today}`). Never throws: returns a `FactClientResponse` union discriminated by `kind` (`ok`, `rate-limited`, `http-error`, `invalid-response`, `network-error`). Accepts an `AbortSignal`
- `public/` — static assets copied as-is

## Conventions

- 4-space indentation, double quotes
- UI text in English
- No backend; everything runs in the browser
- Never hit the real API in tests: stub `fetch` with `vi.stubGlobal`
