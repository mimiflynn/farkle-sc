# AGENTS.md — Farkle Scorecard

Instructions for AI coding agents working on this repository.

## Project Overview

Farkle Scorecard is a monorepo containing two frontend apps (React and Angular) that share game logic via internal packages. It provides a digital scorecard for the dice game Farkle, replacing pen and paper.

## Repository Structure

```
farkle-sc/
├── packages/           # Shared internal packages
│   ├── types/          # @fsc/types — TypeScript types, constants (Player, Scorecard, Scores, WIN_SCORE, DEFAULT_ON_BOARD_THRESHOLD)
│   └── state/          # @fsc/state — Game logic reducers (addPlayer, removePlayer, editPlayer, updateScores, undoLastScore, getWinner, initScorecards)
├── apps/
│   ├── react/          # @fsc/react — React + Vite app
│   └── angular/        # @fsc/angular — Angular + NgRx app
├── _templates/         # Hygen code generation templates
├── package.json        # Root workspace config
└── tsconfig.json       # Root TypeScript config with path aliases
```

## Toolchain & Dependencies

| Tool            | Version   | Purpose                        |
| --------------- | --------- | ------------------------------ |
| NPM Workspaces  | npm 7+    | Monorepo dependency management |
| TypeScript      | ~5.9.3    | Language                       |
| React           | ^19.0.0   | React app framework            |
| Vite            | ^6.0.5    | React dev server & build       |
| Vitest          | ^4.0.17   | React testing                  |
| Angular         | ^21.1.0   | Angular app framework          |
| NgRx Store      | ^21.0.1   | Angular state management       |
| Karma + Jasmine | ~6.4/~5.4 | Angular testing                |
| Bootstrap       | ^5.2.3    | CSS framework (both apps)      |
| ESLint          | ^8.36.0   | Linting                        |
| Prettier        | ^3.4.2    | Code formatting                |

## Setup

```bash
npm install        # Installs all workspace dependencies from root
```

## Running Apps

```bash
npm run start -w @fsc/react      # React dev server on port 3000
npm run start -w @fsc/angular    # Angular dev server
```

## Running Tests

```bash
# React (Vitest)
npm test -w @fsc/react

# Angular (Karma + ChromeHeadless)
cd apps/angular && npx ng test --no-watch --browsers=ChromeHeadless
```

## Linting

```bash
npm run lint    # ESLint across both apps
```

## Architecture Rules

### Shared Packages

- **`@fsc/types`** (`packages/types/`): All shared TypeScript interfaces, types, and game constants live here. Both apps import from `@fsc/types`.
- **`@fsc/state`** (`packages/state/`): Pure functions for game logic (player management, score calculation, win detection). Framework-agnostic. Both apps import from `@fsc/state`.
- When adding game logic, always put it in `@fsc/state`, not in individual app code. Duplicated logic across apps is a bug.
- Path aliases `@fsc/types` and `@fsc/state` are configured in: root `tsconfig.json`, `apps/react/vite.config.ts`, `apps/react/vitest.config.ts`, and `apps/angular/tsconfig.json`.

### React App (`apps/react/`)

- Uses function components with hooks (`useState`, `useEffect`, `useRef`, `useCallback`).
- State management is local in `App.tsx` using React hooks — no Redux or external state library.
- Game state persisted to `localStorage` (key: `farkle-sc-game`).
- Uses `classnames` library for conditional CSS classes.
- Component structure: `components/setup/` (pre-game), `components/game/` (in-game), `pages/` (page-level).
- Tests use `@testing-library/react` + `vitest`. Test files are co-located as `*.test.tsx`.
- SCSS for styles, Bootstrap 5 utility classes.

### Angular App (`apps/angular/`)

- Uses NgRx Store for state management with actions, reducers, and selectors in `src/app/store/`.
- Components use `standalone: false` (module-based architecture via `AppModule`).
- Two-way binding with `FormsModule` (`[(ngModel)]`).
- Component structure mirrors React: `components/` and `pages/`.
- Tests use Jasmine + Karma. Test files are co-located as `*.spec.ts`.
- When modifying Angular components, ensure the corresponding spec file has proper `TestBed` configuration (FormsModule, provideMockStore, CUSTOM_ELEMENTS_SCHEMA as needed).

### Feature Parity

Both apps should implement the same features. When making changes:

1. Update shared packages first (`@fsc/types`, `@fsc/state`).
2. Implement in the React app.
3. Mirror the same functionality in the Angular app.
4. Update tests in both apps.

## Code Style

- **Prettier config**: 4-space indent, 100 char print width, single quotes, trailing commas (ES5).
- **ESLint**: Standard TypeScript rules, import ordering (external → builtin → internal → sibling → parent → index), single quotes enforced.
- **Naming**: Components use PascalCase. Files use kebab-case. Angular selectors prefixed with `fsc-`.
- **Imports**: Sort imports alphabetically within groups. No duplicate imports.

## Game Logic Reference

Farkle is a dice game where players take turns rolling six dice to score points:

- **On-board threshold**: A player must score at least the threshold (default 500, configurable: 500/750/1000) in a single turn to "get on the board" and start accumulating points.
- **Win score**: First player to reach 10,000 points triggers a final round where all other players get one more turn.
- **Farkle**: A turn where a player scores 0 points (no scoring dice rolled).
- **Undo**: Players can undo their last score entry.

## Common Tasks

### Adding a new shared type

1. Add the type to `packages/types/types/` and export from `packages/types/types/index.ts`.

### Adding a new shared reducer/function

1. Add to `packages/state/reducers/index.ts` (pure function, no framework dependencies).
2. Import and use in both React and Angular apps.

### Adding a React component

1. Create component file in the appropriate `apps/react/src/components/` subdirectory.
2. Create co-located test file (`*.test.tsx`).
3. Import and use in the parent component/page.

### Adding an Angular component

1. Run `npm run ng generate component components/<name> -w @fsc/angular`.
2. Add to `AppModule` declarations if not standalone.
3. Create spec file with proper TestBed configuration.

## Testing Guidelines

- All new components and logic should have tests.
- React tests: Use `@testing-library/react`, `userEvent` for interactions, `vi.fn()` for mocks.
- Angular tests: Configure `TestBed` with required imports (`FormsModule` for ngModel, `provideMockStore` for Store, `CUSTOM_ELEMENTS_SCHEMA` to suppress child component errors).
- Always run tests after changes to verify nothing is broken.
