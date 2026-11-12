# Changelog

All notable changes to this project will be documented in this file.

## [0.2.8](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.2.7...v0.2.8) (2026-11-12)

* Normalize the changelog format and backfill missing entries.

## [0.2.7](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.2.6...v0.2.7) (2026-11-01)

* ⚡ **`font-display: swap`** on every `@font-face` (Inter, Quicksand, Roboto, Zilla Slab; Mulish + Roboto Mono already had it), test-guarded for every family
* 📦 **Inter woff2:** the 8 shipped static weights (200–900) now load `woff2` first, with the TTF kept as fallback. Same glyphs (2505 code points) and weights, converted losslessly with fontTools. Regular is 101 KB (was 310 KB); all 8 weights 0.86 MB, was 2.51 MB (−66%)

## [0.2.6](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/bbe65c34a5ebcaeeda52d80529c14ef1b2ee5ed5...v0.2.6) (2026-10-20)

* ⌨️ **Roboto Mono (G30, D29a):** new `roboto-mono/` family, the abElements code font. Variable weight 100–700, normal + italic, Latin + Cyrillic (same coverage as Mulish), woff2 first (≈105 / 113 KB) with the variable TTFs as fallback, `font-display: swap`
* ⚖️ Upstream google/fonts `ofl/robotomono` files with their **SIL OFL 1.1** licence (`roboto-mono/OFL.txt`)
* 📦 `robotoMonoStyles` export (`font-robotomono-light` … `-bold`), README section
* 🔧 npm author email is abrahamukachi@gmail.com
* Tests: faces, files exist + published, licence, Latin + Cyrillic coverage, export ↔ CSS classes

## [0.2.5](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/1d1a5f5357a41038ce54d12410657268aefa3083...bbe65c34a5ebcaeeda52d80529c14ef1b2ee5ed5) (2026-10-14)

* **Mulish titles (§8 Q6):** the plain `'Mulish'` family is now the **variable** font (`font-weight: 200 1000`, normal + italic), so `font-weight: 700/800` render real Bold/ExtraBold instead of faux bold. Includes Cyrillic (220/256 U+04xx) for Russian titles
* **woff2:** `Mulish-VariableFont_wght.woff2` (77 KB, was 210 KB TTF) + italic (83 KB), served first; variable TTF kept as fallback
* **`font-display: swap`** on every Mulish face
* Tests: variable range, swap, files exist, Cyrillic coverage
* **Packaging:** the 23 static TTFs no CSS references are no longer published (every referenced face still ships; test-guarded)
* **Tooling:** `typecheck` script (`tsconfig.typecheck.json`)

## [0.2.4](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.2.3...1d1a5f5357a41038ce54d12410657268aefa3083) (2026-10-03)

* Publish to npm automatically from GitHub Actions with Trusted Publishing (OIDC + provenance, no NPM_TOKEN)
* Ship only package files via `files`; `next` peer is now `^16.3.4`

## [0.2.3](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.2.2...v0.2.3) (2026-09-23)

* Maintenance release; see the compare link.

## [0.2.2](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.2.1...v0.2.2) (2025-09-17)

* Maintenance release; see the compare link.

## [0.2.1](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.2.0...v0.2.1) (2024-06-10)

* Maintenance release; see the compare link.

## [0.2.0](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.10...v0.2.0) (2024-06-10)

* Maintenance release; see the compare link.

## [0.1.10](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.9...v0.1.10) (2024-06-10)

* Maintenance release; see the compare link.

## [0.1.9](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.8...v0.1.9) (2024-06-10)

* Maintenance release; see the compare link.

## [0.1.8](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.7...v0.1.8) (2024-06-10)

* Maintenance release; see the compare link.

## [0.1.7](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.6...v0.1.7) (2024-06-10)

* Maintenance release; see the compare link.

## [0.1.6](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.5...v0.1.6) (2024-06-09)

* Maintenance release; see the compare link.

## [0.1.5](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.4...v0.1.5) (2024-06-09)

* Maintenance release; see the compare link.

## [0.1.4](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.3...v0.1.4) (2024-06-09)

* Maintenance release; see the compare link.

## [0.1.3](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.2...v0.1.3) (2024-06-09)

* Maintenance release; see the compare link.

## [0.1.2](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/v0.1.1...v0.1.2) (2024-06-09)

* Maintenance release; see the compare link.

## [0.1.1](https://github.com/abraham-ukachi/ab-nextjs-fonts/compare/1bc2f880f3b57050ce4818ffa763a78eb70e2243...v0.1.1) (2024-06-09)

* Maintenance release; see the compare link.

## 0.1.0 (2024-06-03)

* Initial release
