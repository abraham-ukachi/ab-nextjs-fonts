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

// 📁 package root + Mulish CSS
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'mulish/styles.css'), 'utf8')

// 🔍 the @font-face blocks for the plain 'Mulish' family
const mulishFaces = css.split('@font-face').slice(1).map((b) => b.slice(0, b.indexOf('}'))).filter((b) => /font-family:\s*'Mulish';/.test(b))

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

describe('Mulish 0.2.5 (Welcome v6 titles)', () => {
  it("the 'Mulish' family is the variable font with a real weight range + swap", () => {
    expect(mulishFaces).toHaveLength(2) // 🧍 normal + 🪶 italic
    for (const face of mulishFaces) {
      expect(face).toMatch(/font-weight:\s*200 1000;/) // 🎚️ real bold/extra-bold
      expect(face).toContain('font-display: swap') // ⚡
      expect(face).toMatch(/\.woff2'\) format\('woff2'\)/) // 📦 woff2 first
      expect(face).toMatch(/\.ttf'\) format\('truetype'\)/) // 🕰️ fallback
    }
  })
  it('every Mulish face swaps', () => {
    expect(css.match(/@font-face/g)!.length).toBe(css.match(/font-display: swap/g)!.length) // ⚡ all
  })
  it('the referenced files exist', () => {
    for (const m of css.matchAll(/url\('\.\/([^']+)'\)/g)) expect(existsSync(join(root, 'mulish', m[1])), m[1]).toBe(true) // 📦
  })
  it('the variable font covers Cyrillic (ru titles)', () => {
    const ttf = readFileSync(join(root, 'mulish/Mulish-VariableFont_wght.ttf')) // 📖
    for (const ch of 'ЖДобро пожаловать') if (ch !== ' ') expect(ttfHasCodePoint(ttf, ch.codePointAt(0)!), ch).toBe(true) // 🇷🇺
  })
})
