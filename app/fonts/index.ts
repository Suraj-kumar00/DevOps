import localFont from 'next/font/local';

/*
 * The site's two typefaces, committed next to this file with their licenses (SIL Open Font
 * License 1.1), so a build never downloads fonts. Both are the Latin subset of the variable font,
 * taken from Fontsource 5.3.0; characters outside Latin fall back to the system font.
 */

/**
 * Mona Sans, GitHub's open-source typeface, for all text. The file carries the weight axis
 * (200 to 900) and the width axis (75% to 125%); headings use the wider cut (see global.css).
 */
export const fontSans = localFont({
  src: './mona-sans-latin-standard-normal.woff2',
  weight: '200 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-mona-sans',
  declarations: [{ prop: 'font-stretch', value: '75% 125%' }],
});

/** JetBrains Mono, for code blocks, inline code and keyboard shortcuts. */
export const fontMono = localFont({
  src: './jetbrains-mono-latin-wght-normal.woff2',
  weight: '100 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-jetbrains-mono',
  adjustFontFallback: false,
  // Code is rarely the first thing on screen, so it should not compete with the text font.
  preload: false,
});
