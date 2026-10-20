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
* @name: Fonts - abElements
* @file: index.ts
* @type: TypeScript 
* @authors: Abraham Ukachi <abrahamukachi@gmail.com>
*
* Example usage:
*   1+|> // Prefer CSS @import in globals.css (Next App Router safe)
*    -|> // @import 'ab-nextjs-fonts/inter/styles.css';
*    -|> // then: className="font-inter-light"
*    -|>
*   2+|> // Optional JS class-name helpers (do not import CSS as a value)
*    -|> import { interStyles } from 'ab-nextjs-fonts';
*    -|> <p className={interStyles.light}>...</p>
*
*/

/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: We'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/** Hyphenated utility class names — pair with CSS @import of the matching styles.css */
export const interStyles = {
  extralight: 'font-inter-extralight',
  light: 'font-inter-light',
  regular: 'font-inter-regular',
  medium: 'font-inter-medium',
  semibold: 'font-inter-semibold',
  bold: 'font-inter-bold',
  extrabold: 'font-inter-extrabold',
  black: 'font-inter-black',
} as const;

export const mulishStyles = {
  extralight: 'font-mulish-extralight',
  light: 'font-mulish-light',
  regular: 'font-mulish-regular',
  medium: 'font-mulish-medium',
  semibold: 'font-mulish-semibold',
  bold: 'font-mulish-bold',
  extrabold: 'font-mulish-extrabold',
  black: 'font-mulish-black',
} as const;

export const quicksandStyles = {
  light: 'font-quicksand-light',
  regular: 'font-quicksand-regular',
  medium: 'font-quicksand-medium',
  semibold: 'font-quicksand-semibold',
  bold: 'font-quicksand-bold',
} as const;

export const robotoStyles = {
  light: 'font-roboto-light',
  regular: 'font-roboto-regular',
  medium: 'font-roboto-medium',
  bold: 'font-roboto-bold',
  black: 'font-roboto-black',
} as const;

/** ⌨️ 0.2.6 (G30): Roboto Mono, the code font — pair with `@import 'ab-nextjs-fonts/roboto-mono/styles.css'` */
export const robotoMonoStyles = {
  light: 'font-robotomono-light', // 🎚️ 300
  regular: 'font-robotomono-regular', // 🎚️ 400
  medium: 'font-robotomono-medium', // 🎚️ 500
  semibold: 'font-robotomono-semibold', // 🎚️ 600
  bold: 'font-robotomono-bold', // 🎚️ 700
} as const;

export const zillaSlabStyles = {
  light: 'font-zillaslab-light',
  regular: 'font-zillaslab-regular',
  medium: 'font-zillaslab-medium', // maps to Regular face (no true medium)
  bold: 'font-zillaslab-bold',
} as const;
