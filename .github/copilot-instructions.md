# Copilot Instructions — Farkle Scorecard

## Project Context

This is a Farkle dice game scorecard app built as a TypeScript monorepo with NPM Workspaces. It contains a React app, an Angular app, and shared game logic packages. The apps are feature-equivalent implementations of the same scorecard UI.

## Architecture

- **Monorepo**: NPM Workspaces with `packages/*` (shared code) and `apps/*` (frontends).
- **`@fsc/types`** (`packages/types/`): Shared TypeScript interfaces and constants (`Player`, `Scorecard`, `Scores`, `WIN_SCORE`, `DEFAULT_ON_BOARD_THRESHOLD`).
- **`@fsc/state`** (`packages/state/`): Framework-agnostic pure functions for game logic — player CRUD, score updates, undo, win detection.
- **`@fsc/react`** (`apps/react/`): React 19 + Vite + Vitest. Local state via hooks. localStorage persistence.
- **`@fsc/angular`** (`apps/angular/`): Angular 21 + NgRx Store + Karma/Jasmine. Module-based (not standalone components).

## Code Style

- Prettier: 4-space indent, 100 char width, single quotes, ES5 trailing commas.
- Use single quotes for strings. Avoid double quotes.
- Sort imports: external → builtin → internal → sibling → parent → index, alphabetized.
- Angular component selectors are prefixed with `fsc-` (e.g., `fsc-player-score`).
- File naming: kebab-case for files, PascalCase for component/class names.

## Key Conventions

### Shared Logic First

Game logic (scoring, player management, win conditions) belongs in `@fsc/state` as pure functions. Never duplicate game logic in individual apps. Both apps import and use the same shared functions.

### Feature Parity

Both React and Angular apps implement identical features. When adding or modifying functionality, apply changes to both apps.

### React Patterns

- Function components with hooks only (no class components).
- State managed locally in `App.tsx` via `useState`/`useEffect`.
- Use `classnames` library for conditional CSS classes.
- Tests: `@testing-library/react` + Vitest. Co-located `*.test.tsx` files.

### Angular Patterns

- Components use `standalone: false` with `AppModule`.
- State managed via NgRx Store (`store/game/` for game state, `store/players/` for player state).
- Two-way binding with `FormsModule` and `[(ngModel)]`.
- Tests: Jasmine + Karma. Co-located `*.spec.ts` files.
- Test bed setup needs: `FormsModule` (for ngModel), `provideMockStore` (for Store), `CUSTOM_ELEMENTS_SCHEMA` (for child component selectors).

### Styling

- Bootstrap 5 is used in both apps for layout and component classes.
- Custom styles in SCSS. App-specific styles in `App.scss` (React) and `styles.scss` (Angular).
- Both apps share the same custom CSS classes: `.on-board`, `.off-board`, `.farkle-turn`, `.current-player`, `.winner-banner`, `.final-round-banner`.

## Testing

### React

```bash
npm test -w @fsc/react
```

Uses Vitest with jsdom environment. Tests use `@testing-library/react` and `userEvent`.

### Angular

```bash
cd apps/angular && npx ng test --no-watch --browsers=ChromeHeadless
```

Uses Karma with ChromeHeadless. Tests use Jasmine.

## Path Aliases

`@fsc/types` and `@fsc/state` resolve to `packages/types/` and `packages/state/` respectively. Configured in root `tsconfig.json`, Vite config, Vitest config, and Angular `tsconfig.json`.

## Game Domain Knowledge

- **Farkle**: Dice game where players roll six dice to accumulate points.
- **On-board threshold**: Minimum single-turn score to start accumulating (default 500, configurable to 500/750/1000).
- **Winning**: First player to 10,000 triggers a final round — every other player gets one more turn.
- **Farkle (zero turn)**: Scored as 0 points; displayed with red "FARKLE!" text in turn history.
- **Undo**: Last score entry can be undone per player.
