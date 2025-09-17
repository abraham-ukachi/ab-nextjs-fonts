# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- ab-nextjs-fonts is a small ESM package that ships CSS + font assets intended for use in Next.js/React apps.
- The TypeScript entrypoint (index.ts) imports each font’s styles.css and re-exports them as named exports. This ensures consumers can import the package and have the font CSS bundled.
- Each font lives in its own folder (e.g., inter/, mulish/, quicksand/, roboto/, zilla-slab/), containing:
  - static/ with TTF files for weights/styles
  - styles.css that declares @font-face rules and exposes simple classnames (e.g., .font.inter.light)
- There is no build step in this repo; source TypeScript and CSS are published directly. Linting is the only defined workflow.

Tooling and commands
- Toolchain
  - Node 20 and pnpm 9 are used in CI. Use pnpm locally for consistency.

- Install dependencies
  - pnpm install

- Lint (all files)
  - pnpm lint
  - The lint script runs: eslint . --ext .ts,.tsx --fix

- Lint a single file or path
  - pnpm exec eslint path/to/file.ts --fix
  - pnpm exec eslint path/to/dir --ext .ts,.tsx

- Tests
  - No tests or test runner are configured in this repository.

Release and publishing
- CI-driven publish (recommended)
  - Publishing is handled by .github/workflows/publish.yml on version tags matching v*.*.*.
  - The workflow: checkout main, setup Node 20 and pnpm 9, pnpm install, pnpm lint, authenticate, then pnpm publish --access public.
  - Typical flow to cut a release:
    - Bump version and create a tag (use one):
      - pnpm version patch
      - pnpm version minor
      - pnpm version major
    - Push commits and tags:
      - git push origin main --follow-tags
    - The GitHub Action will run and publish if credentials are configured in repo secrets.

Architecture details
- Entry points
  - index.ts imports: ./inter/styles.css, ./mulish/styles.css, ./quicksand/styles.css, ./roboto/styles.css, ./zilla-slab/styles.css, then re-exports them as interStyles, mulishStyles, quicksandStyles, robotoStyles, zillaSlabStyles.
  - Consumers can import these named exports to ensure the CSS is included in their bundle, or import specific styles.css files directly.

- Font style structure
  - styles.css per font defines @font-face blocks per weight (e.g., Inter-Light, Inter-Regular, Inter-Bold, etc.) and simple utility-like classes under the .font namespace, e.g.:
    - .font.inter.light { font-family: 'Inter-Light'; }
    - .font.mulish.bold { font-family: 'Mulish-Bold'; }
    - .font.roboto.medium { font-family: 'Roboto-Medium'; }
    - .font.quicksand.semibold { font-family: 'Quicksand-SemiBold'; }
    - .font.zillaslab.regular { font-family: 'ZillaSlab-Regular'; }

- Packaging signals
  - package.json: type: module; main: index.ts; scripts: { lint }.
  - ESLint is configured with @typescript-eslint (parserOptions.project points to tsconfig.json).
  - tsconfig.json sets module=ESNext, target=ES2020, minimal options; there is no outDir and no compiled output in-repo.

Notes for maintainers
- The package.json types field points to types/index.d.ts, but no types/ directory is present in the repository. Ensure type declarations are included when publishing (or remove/adjust the types field) to avoid broken typings for consumers.
- This repository intentionally has no build step; consumers’ bundlers are expected to handle TypeScript and CSS imports from this package.
