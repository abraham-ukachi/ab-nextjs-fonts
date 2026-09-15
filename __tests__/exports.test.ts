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

const EXPECTED_EXPORTS = [
  "interStyles",
  "mulishStyles",
  "quicksandStyles",
  "robotoStyles",
  "zillaSlabStyles",
] as const;

describe("ab-nextjs-fonts exports", () => {
  it("exports the five family class-name maps from index.ts", () => {
    expect(Object.keys(interStyles).length).toBeGreaterThan(0);
    expect(Object.keys(mulishStyles).length).toBeGreaterThan(0);
    expect(Object.keys(quicksandStyles).length).toBeGreaterThan(0);
    expect(Object.keys(robotoStyles).length).toBeGreaterThan(0);
    expect(Object.keys(zillaSlabStyles).length).toBeGreaterThan(0);
  });

  it("mirrors the same named exports in types/index.d.ts", () => {
    const types = readFileSync(join(root, "types/index.d.ts"), "utf8");
    for (const name of EXPECTED_EXPORTS) {
      expect(types).toContain(`export declare const ${name}`);
    }
  });
});
