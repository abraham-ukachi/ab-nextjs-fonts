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
* @name: Inter woff2 - Tests (0.2.7)
* @file: __tests__/inter-woff2.test.ts
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
import { readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..') // 📁 package root
const css = readFileSync(join(root, 'inter/styles.css'), 'utf8') // 📖 Inter's CSS
const faces = [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0]) // 🧱 its faces
const WEIGHTS = ['ExtraLight', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black'] // 🎚️ the 8 shipped statics

// 📦 Inter ships woff2 first (≈66% smaller), the static TTF stays as the fallback (same as Mulish / Roboto Mono)
describe('📦 Inter woff2 (0.2.7)', () => {
  it('every Inter face lists woff2 first, then the TTF fallback', () => {
    expect(faces).toHaveLength(9) // 🧮 8 weights + the 'Inter' default
    for (const f of faces) expect(f, f.slice(0, 60)).toMatch(/src:\s*url\('\.\/static\/(Inter-\w+)\.woff2'\) format\('woff2'\),\s*\/\*[^*]*\*\/\s*url\('\.\/static\/\1\.ttf'\) format\('truetype'\);/) // 🥇 then 🕰️
  })
  for (const w of WEIGHTS) {
    it(`${w}: a real woff2 (wOF2 magic), well under half the TTF`, () => {
      const woff2 = readFileSync(join(root, `inter/static/Inter-${w}.woff2`)) // 📦
      expect(woff2.subarray(0, 4).toString('latin1')).toBe('wOF2') // 🪄 signature
      expect(woff2.length).toBeLessThan(statSync(join(root, `inter/static/Inter-${w}.ttf`)).size / 2) // 📉
    })
  }
})
