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
  theme,
}: {
  colorScheme: Extract<ColorScheme, "light" | "dark">;
  currentColorScheme?: ColorScheme;
  currentThemeName?: ThemeName;
  theme: (typeof bundledThemes)[number];
}) => {
  const content = theme.label;

  const path = themeRoutePath(theme.name, colorScheme);

  if (currentThemeName === theme.name && currentColorScheme === colorScheme) {
    return (
      <a href={path} aria-current="page">
        {content}
      </a>
    );
  }

  return <a href={path}>{content}</a>;
};

const ThemeMenu = ({
  colorScheme,
  currentColorScheme,
  currentThemeName,
}: ThemeMenuProps) => (
  <nav
    aria-label={
      colorScheme === "dark" ? "Dark theme previews" : "Theme previews"
    }
  >
    {bundledThemes.map((theme) => (
      <ThemeLink
        colorScheme={colorScheme}
        currentColorScheme={currentColorScheme}
        currentThemeName={currentThemeName}
        theme={theme}
      />
    ))}
  </nav>
);

export default ThemeMenu;
