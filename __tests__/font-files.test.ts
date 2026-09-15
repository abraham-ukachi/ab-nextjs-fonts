import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const FONTS = [
  "inter",
  "mulish",
  "quicksand",
  "roboto",
  "zilla-slab",
] as const;

describe("ab-nextjs-fonts font files", () => {
  it("ships styles.css for every supported font family", () => {
    for (const font of FONTS) {
      const stylesPath = join(root, font, "styles.css");
      expect(existsSync(stylesPath), `${font}/styles.css missing`).toBe(true);
      expect(statSync(stylesPath).size).toBeGreaterThan(0);
    }
  });

  it("keeps at least one .ttf asset under each font folder", () => {
    for (const font of FONTS) {
      const fontRoot = join(root, font);
      const entries = readdirSync(fontRoot, { withFileTypes: true });
      const topLevelTtf = entries.some(
        (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".ttf"),
      );
      const staticDir = join(fontRoot, "static");
      const staticTtf =
        existsSync(staticDir) &&
        readdirSync(staticDir).some((name) => name.toLowerCase().endsWith(".ttf"));
      expect(
        topLevelTtf || staticTtf,
        `${font} has no .ttf in root or static/`,
      ).toBe(true);
    }
  });
});
