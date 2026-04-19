# AI Process Documentation

## Tools

- **Claude (Anthropic)** — primary tool used throughout all stages

## How AI Was Used

### Stage 1 — Architecture and Scaffolding
Requested Claude to propose a project structure based on the specifications. Discussed the choice between Fastify and Express, in-memory storage, and the approach to CLI arguments.

### Stage 2 — Backend
Wrote the Express version, then refactored to Fastify. Claude assisted with Fastify plugin options typing and passing data via `opts` instead of global variables.

### Stage 3 — Frontend: Map
The main iteration centered around the path tile logic. The `getPathTile` algorithm was fine-tuned via a debugger — Claude suggested rendering neighbors (`TBLR`) directly on the cells instead of the console. It took ~6 iterations to correctly define the default image orientations.

### Stage 4 — Frontend: Components
Refactoring the modal: extracted `Overlay`, `BookedView`, and `SuccessView` into separate components. Fixed a bug involving modal closure on error correction (replaced `onClick` with `onMouseDown` with a check for `e.target === e.currentTarget`).

### Stage 5 — Styles
Design direction: Tropical luxury (sand, gold, azure). Cormorant Garamond font for headings + DM Sans for body text. SCSS with BEM; variables and mixins moved to `abstract/`.

### Stage 6 — Frontend Architecture
Breakdown into files: `types/`, `constants/`, and separate components for `MapCell`, `PoolImage`. Claude suggested using `ResizeObserver` for dynamic cell size calculation instead of a hardcoded constant.

## Number of Steps

~40+ iterations in a single dialogue. The majority of iterations consisted of refinements and fixes based on screenshots of the actual render.

## What I Did Personally

- Final architectural decisions
- Choice of design direction
- Verification of every step in the browser
- File structure and naming
- Integration of all components