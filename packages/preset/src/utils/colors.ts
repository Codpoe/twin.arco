import { palette, PaletteName, theme, ThemeName } from '@twin.arco/colors';
import {
  cssRgb,
  cssRgba,
  cssVar,
  defaultKeyFormatter,
  normalizeCssVariable,
} from './formatter';

export type CssVariableString = `--${string}`;

export const themeKeys: ThemeName[] = theme.map(normalizeCssVariable);

export const paletteKeys: PaletteName[] = palette.map(normalizeCssVariable);

export function createRgb(
  formatter: (value: CssVariableString) => string = defaultKeyFormatter,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  cssVariables: CssVariableString[] = theme,
) {
  return cssVariables.reduce((colors, key) => {
    const _key = formatter(key);
    colors[_key] = cssVar(key);
    return colors;
  }, {} as Record<string, any>);
}

export function createRgba(
  formatter: (value: CssVariableString) => string = defaultKeyFormatter,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  cssVariables: CssVariableString[] = palette,
  opacity = true,
) {
  return cssVariables.reduce((colors, key) => {
    const _key = formatter(key);
    if (!opacity) {
      colors[_key] = cssRgb(cssVar(key));
    } else {
      colors[_key] = colorWithOpacity(cssVar(key));
    }
    return colors;
  }, {} as Record<string, any>);
}

export function colorWithOpacity(key: string) {
  return ({ opacityVariable }: { [key: string]: string }) =>
    cssRgba(key, cssVar(opacityVariable as CssVariableString, '1'));
}
