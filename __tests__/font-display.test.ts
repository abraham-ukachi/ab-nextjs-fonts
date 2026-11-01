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
* @name: font-display swap + Inter woff2 - Tests (0.2.7)
* @file: __tests__/font-display.test.ts
* @type: TypeScript (Vitest)
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

// 🧪 vitest
import { describe, expect, it } from 'vitest'
// 📁 fs + path
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 📁 the package root
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// 🔤 every font folder that has a styles.css (inter, mulish, quicksand, roboto, roboto-mono, zilla-slab, + any new one)
const families = readdirSync(root).filter((d) => !d.startsWith('.') && d !== 'node_modules' && statSync(join(root, d)).isDirectory() && readdirSync(join(root, d)).includes('styles.css'))
// 🧱 every @font-face block of one family's CSS
const faces = (fam: string) => [...readFileSync(join(root, fam, 'styles.css'), 'utf8').matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0])

// ⚡ no invisible text while a font loads (FOIT): every face swaps
describe('⚡ font-display: swap', () => {
  it('finds all the families', () => {
    for (const f of ['inter', 'mulish', 'quicksand', 'roboto', 'roboto-mono', 'zilla-slab']) expect(families).toContain(f) // 🔤
  })
  for (const fam of families) {
    it(`${fam}: every @font-face has font-display: swap`, () => {
      const all = faces(fam) // 🧱
      expect(all.length, fam).toBeGreaterThan(0) // ✅ has faces
      for (const face of all) expect(face, face.slice(0, 80)).toMatch(/font-display:\s*swap\s*;/) // ⚡
    })
  }
})
