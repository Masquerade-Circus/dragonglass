import { themeRoutePath } from "./catalog";
import { bundledThemes, type ThemeName } from "../themes";

type ThemeMenuProps = {
  currentThemeName?: ThemeName;
};

const ThemeLink = ({
  currentThemeName,
  theme,
}: {
  currentThemeName?: ThemeName;
  theme: (typeof bundledThemes)[number];
}) => {
  const content = theme.label;

  if (currentThemeName === theme.name) {
    return (
      <a href={themeRoutePath(theme.name)} aria-current="page">
        {content}
      </a>
    );
  }

  return <a href={themeRoutePath(theme.name)}>{content}</a>;
};

const ThemeMenu = ({ currentThemeName }: ThemeMenuProps) => (
  <nav aria-label="Theme previews">
    {bundledThemes.map((theme) => (
      <ThemeLink currentThemeName={currentThemeName} theme={theme} />
    ))}
  </nav>
);

export default ThemeMenu;
