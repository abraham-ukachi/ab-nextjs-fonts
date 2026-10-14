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
* @name: James review fixes
* @file: __tests__/james-review.test.ts
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
// 📄 fs + paths
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 📁 root + reader
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel: string) => readFileSync(join(root, rel), 'utf8')
const pkg = JSON.parse(read('package.json')) // 📦
// 🔤 font families (folders shipped in `files`)
const families = ['inter', 'mulish', 'quicksand', 'roboto', 'zilla-slab']
// 🔗 every ./relative url() in a family's CSS → "family/path"
const referenced = new Set(families.flatMap((fam) => readdirSync(join(root, fam)).filter((f) => f.endsWith('.css')).flatMap((css) => [...read(`${fam}/${css}`).matchAll(/url\(['"]?\.\/([^'")]+)/g)].map((m) => `${fam}/${m[1]}`))))
const excluded = new Set((pkg.files as string[]).filter((f) => f.startsWith('!')).map((f) => f.slice(1))) // 🚫

describe('James review 🧐', () => {
  it('only unreferenced static TTFs are excluded from the package', () => {
    expect(excluded.size).toBe(23) // 🧮
    for (const f of excluded) {
      expect(referenced.has(f), f).toBe(false) // 🚫 never ship-break a referenced face
      expect(f).toMatch(/^[a-z-]+\/static\/[A-Za-z-]+\.ttf$/) // 📁 static TTFs only
      expect(existsSync(join(root, f)), f).toBe(true) // ✅ real file (no stale globs)
    }
  })

  it('every font file the CSS references exists', () => {
    for (const f of referenced) expect(existsSync(join(root, f)), f).toBe(true) // 🔤
  })

  it('has a typecheck script', () => {
    expect(pkg.scripts.typecheck).toBe('tsc -p tsconfig.typecheck.json') // 🧪
  })
})
