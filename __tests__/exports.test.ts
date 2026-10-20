/* 
* @license MIT
* ~~~~~~~~~~~~
* ab-nextjs-fonts
* ~~~~~~~~~~~~ 
* Copyright (c) 2026 Abraham Ukachi. The abElements Project.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the 'Software'), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions: 
*  
* The above copyright notice and this permission notice shall be included in all 
* copies or substantial portions of the Software. 
*
* THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* @project: ab-nextjs-fonts
* @name: Exports - Tests
* @file: __tests__/exports.test.ts
* @type: Vitest
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  interStyles,
  mulishStyles,
  quicksandStyles,
  robotoStyles,
  robotoMonoStyles,
  zillaSlabStyles,
} from "../index.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EXPECTED_EXPORTS = [
  "interStyles",
  "mulishStyles",
  "quicksandStyles",
  "robotoStyles",
  "robotoMonoStyles",
  "zillaSlabStyles",
] as const;

describe("ab-nextjs-fonts exports", () => {
  it("exports the five family class-name maps from index.ts", () => {
    expect(Object.keys(interStyles).length).toBeGreaterThan(0);
    expect(Object.keys(mulishStyles).length).toBeGreaterThan(0);
    expect(Object.keys(quicksandStyles).length).toBeGreaterThan(0);
    expect(Object.keys(robotoStyles).length).toBeGreaterThan(0);
    expect(Object.keys(zillaSlabStyles).length).toBeGreaterThan(0);
    expect(Object.keys(robotoMonoStyles).length).toBeGreaterThan(0); // ⌨️ 0.2.6
  });

  it("mirrors the same named exports in types/index.d.ts", () => {
    const types = readFileSync(join(root, "types/index.d.ts"), "utf8");
    for (const name of EXPECTED_EXPORTS) {
      expect(types).toContain(`export declare const ${name}`);
    }
  });
});
