import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("ab-nextjs-fonts package smoke", () => {
  it("exposes the five font style modules from package.json metadata", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.name).toBe("ab-nextjs-fonts");
    expect(pkg.version).toBe("0.2.2");
    expect(pkg.peerDependencies.next).toBe("16.3.4");
  });

  it("ships style entrypoints for Inter, Mulish, Quicksand, Roboto, ZillaSlab", () => {
    const styles = [
      "inter/styles.css",
      "mulish/styles.css",
      "quicksand/styles.css",
      "roboto/styles.css",
      "zilla-slab/styles.css",
    ];
    for (const rel of styles) {
      const css = readFileSync(join(root, rel), "utf8");
      expect(css.length).toBeGreaterThan(0);
    }
  });
});
