import { documentationAssets } from "../docs/assets";
import type { ColorScheme, ThemeName } from "../themes";

type HtmlProps = {
  content: string;
  colorScheme: ColorScheme;
  isDevelopment: boolean;
  title: string;
  themeName: ThemeName;
};

let Html = function view({
  content,
  colorScheme,
  isDevelopment,
  themeName,
  title,
}: HtmlProps) {
  return (
    <html lang="en" data-color-scheme={colorScheme}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href={
            isDevelopment
              ? "/css/main.css"
              : documentationAssets.stylesheet.path
          }
          rel="stylesheet"
        />
        <link
          id="documentation-theme-stylesheet"
          href={
            isDevelopment
              ? `/css/theme-${themeName}.css`
              : documentationAssets.themeStylesheet(themeName).path
          }
          rel="stylesheet"
        />
      </head>
      <body v-html={content} />
    </html>
  );
};

export default Html;
