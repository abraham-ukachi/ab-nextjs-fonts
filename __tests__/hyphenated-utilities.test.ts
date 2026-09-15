import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  interStyles,
  mulishStyles,
  quicksandStyles,
  robotoStyles,
  zillaSlabStyles,
} from "../index.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("hyphenated font utilities", () => {
  it("exports class-name helpers for all five families", () => {
    expect(interStyles.light).toBe("font-inter-light");
    expect(mulishStyles.medium).toBe("font-mulish-medium");
    expect(quicksandStyles.bold).toBe("font-quicksand-bold");
    expect(robotoStyles.regular).toBe("font-roboto-regular");
    expect(zillaSlabStyles.medium).toBe("font-zillaslab-medium");
  });

  it("ships hyphenated selectors in each styles.css", () => {
    const checks = [
      ["inter/styles.css", ".font-inter-light"],
      ["mulish/styles.css", ".font-mulish-medium"],
      ["quicksand/styles.css", ".font-quicksand-bold"],
      ["roboto/styles.css", ".font-roboto-light"],
      ["zilla-slab/styles.css", ".font-zillaslab-medium"],
    ];
    for (const [rel, needle] of checks) {
      const css = readFileSync(join(root, rel), "utf8");
      expect(css.includes(needle)).toBe(true);
    }
  });

  it("maps ZillaSlab medium utility to the Regular face", () => {
    const css = readFileSync(join(root, "zilla-slab/styles.css"), "utf8");
    expect(css).toMatch(/\.font-zillaslab-medium\s*\{\s*font-family:\s*'ZillaSlab-Regular'/);
  });
});
