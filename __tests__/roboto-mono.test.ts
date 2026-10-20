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
* @name: Mulish variable + Cyrillic - Tests (0.2.5)
* @file: __tests__/mulish-variable.test.ts
* @type: Vitest
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

// 🧪 vitest
import { describe, expect, it } from 'vitest'
// 📄 fs
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
// 📦 the export under test
import { robotoMonoStyles } from '../index.ts'

// 📁 package root + Roboto Mono CSS
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'roboto-mono/styles.css'), 'utf8')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { files: string[] }

// 🔍 the @font-face blocks for the 'Roboto Mono' family
const faces = css.split('@font-face').slice(1).map((b) => b.slice(0, b.indexOf('}'))).filter((b) => /font-family:\s*'Roboto Mono';/.test(b))

// 🔤 minimal TrueType cmap reader: does the font map a code point? (format 4 subtables)
function ttfHasCodePoint(buf: Buffer, cp: number): boolean {
  const numTables = buf.readUInt16BE(4) // 🔢
  let cmap = -1
  for (let i = 0; i < numTables; i++) { const rec = 12 + i * 16; if (buf.toString('latin1', rec, rec + 4) === 'cmap') cmap = buf.readUInt32BE(rec + 8) } // 🔍
  if (cmap < 0) return false
  const n = buf.readUInt16BE(cmap + 2) // 🔢 subtables
  for (let i = 0; i < n; i++) {
    const off = cmap + buf.readUInt32BE(cmap + 4 + i * 8 + 4) // 📍
    if (buf.readUInt16BE(off) !== 4) continue // 🙅 only format 4
    const segX2 = buf.readUInt16BE(off + 6) // 🔢
    for (let s = 0; s < segX2; s += 2) {
      const end = buf.readUInt16BE(off + 14 + s) // ⏹️
      const start = buf.readUInt16BE(off + 16 + segX2 + s) // ▶️
      if (cp >= start && cp <= end) return true // ✅ (glyph 0 checks skipped: fine for this guard)
    }
  }
  return false
}

describe('Roboto Mono 0.2.6 (G30, D29a) ⌨️', () => {
  it("the 'Roboto Mono' family is variable 100–700, normal + italic, woff2 first, swap", () => {
    expect(faces).toHaveLength(2) // 🧍 + 🪶
    expect(faces.some((f) => /font-style:\s*italic/.test(f))).toBe(true) // 🪶
    for (const face of faces) {
      expect(face).toMatch(/font-weight:\s*100 700;/) // 🎚️
      expect(face).toContain('font-display: swap') // ⚡
      expect(face).toMatch(/\.woff2'\) format\('woff2'\)/) // 📦
      expect(face).toMatch(/\.ttf'\) format\('truetype'\)/) // 🕰️
    }
  })
  it('the referenced files exist and are published', () => {
    for (const m of css.matchAll(/url\('\.\/([^']+)'\)/g)) expect(existsSync(join(root, 'roboto-mono', m[1])), m[1]).toBe(true) // 📦
    expect(pkg.files).toContain('roboto-mono') // 📤
  })
  it('ships the OFL licence', () => {
    const ofl = readFileSync(join(root, 'roboto-mono/OFL.txt'), 'utf8') // ⚖️
    expect(ofl).toMatch(/SIL Open Font License, Version 1\.1/)
    expect(ofl).toMatch(/Roboto Mono Project Authors/)
  })
  it('covers Latin and Cyrillic, like Mulish', () => {
    for (const f of ['RobotoMono-VariableFont_wght.ttf', 'RobotoMono-Italic-VariableFont_wght.ttf']) {
      const ttf = readFileSync(join(root, 'roboto-mono', f)) // 📖
      for (const cp of [0x41, 0x7a, 0xe9, 0x410, 0x416, 0x44f]) expect(ttfHasCodePoint(ttf, cp), `${f} U+${cp.toString(16)}`).toBe(true) // 🔤 A z é А Ж я
    }
  })
  it('exports robotoMonoStyles and every class exists in the CSS', () => {
    for (const cls of Object.values(robotoMonoStyles)) expect(css).toContain(`.${cls} {`) // 🧰
  })
})
