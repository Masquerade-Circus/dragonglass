import { themeRoutePath } from "./catalog";
import { bundledThemes, type ColorScheme, type ThemeName } from "../themes";

type ThemeMenuProps = {
  colorScheme: Extract<ColorScheme, "light" | "dark">;
  currentColorScheme?: ColorScheme;
  currentThemeName?: ThemeName;
};

const ThemeLink = ({
  currentThemeName,
  colorScheme,
  currentColorScheme,
  theme
}: {
  colorScheme: Extract<ColorScheme, "light" | "dark">;
  currentColorScheme?: ColorScheme;
  currentThemeName?: ThemeName;
  theme: (typeof bundledThemes)[number];
}) => {
  const content = theme.label;

  const path = themeRoutePath(theme.name, colorScheme);
  const isCurrentTheme =
    currentThemeName === theme.name && currentColorScheme === colorScheme;

  return (
    <span data-markdown="include-descendants" class="p-1">
      <a v-if={isCurrentTheme} href={path} v-route={path} aria-current="page">
        {content}
      </a>
      <a v-if={!isCurrentTheme} href={path} v-route={path}>
        {content}
      </a>
    </span>
  );
};

const ThemeMenu = ({
  colorScheme,
  currentColorScheme,
  currentThemeName
}: ThemeMenuProps) => (
  <nav
    aria-label={
      colorScheme === "dark" ? "Dark theme previews" : "Theme previews"
    }
    v-for={bundledThemes}
  >
    {(theme: any) => (
      <ThemeLink
        colorScheme={colorScheme}
        currentColorScheme={currentColorScheme}
        currentThemeName={currentThemeName}
        theme={theme}
      />
    )}
  </nav>
);

export default ThemeMenu;
