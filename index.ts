/* 
* @license MIT
* ~~~~~~~~~~~~
* ab-nextjs-fonts
* ~~~~~~~~~~~~ 
* Copyright (c) 2026 Abraham Ukachi. The abElements Project.
*
* @project: ab-nextjs-fonts
* @name: Fonts - abElements
* @file: index.ts
* @type: TypeScript 
* @authors: Abraham Ukachi <abraham.ukachi@laplateforme.io>
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

export const zillaSlabStyles = {
  light: 'font-zillaslab-light',
  regular: 'font-zillaslab-regular',
  medium: 'font-zillaslab-medium', // maps to Regular face (no true medium)
  bold: 'font-zillaslab-bold',
} as const;
