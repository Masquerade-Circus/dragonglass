const bundledThemes = [
  {
    name: "default",
    label: "Default",
    primary: "#1d4ed8",
    use: "General product interfaces",
  },
  {
    name: "indigo",
    label: "Indigo",
    primary: "#4338ca",
    use: "SaaS, finance and developer tools",
  },
  {
    name: "violet",
    label: "Violet",
    primary: "#7c3aed",
    use: "AI, developer and creative products",
  },
  {
    name: "magenta",
    label: "Magenta",
    primary: "#a21caf",
    use: "Media, community and consumer products",
  },
  {
    name: "ruby",
    label: "Ruby",
    primary: "#be123c",
    use: "Events, entertainment and campaign products",
  },
  {
    name: "amber",
    label: "Amber",
    primary: "#92400e",
    use: "Commerce, hospitality and editorial products",
  },
  {
    name: "moss",
    label: "Moss",
    primary: "#3f6212",
    use: "Health, sustainability and field operations",
  },
  {
    name: "emerald",
    label: "Emerald",
    primary: "#047857",
    use: "Finance, healthcare and sustainability products",
  },
  {
    name: "teal",
    label: "Teal",
    primary: "#0f766e",
    use: "Healthcare, collaboration and operational tools",
  },
  {
    name: "ocean",
    label: "Ocean",
    primary: "#0369a1",
    use: "Education, logistics and data products",
  },
  {
    name: "graphite",
    label: "Graphite",
    primary: "#475569",
    use: "Admin panels, documentation and public services",
  },
  {
    name: "stone",
    label: "Stone",
    primary: "#57534e",
    use: "Archives, publishing and content-heavy tools",
  },
] as const;

type Theme = (typeof bundledThemes)[number];
type ThemeName = Theme["name"];
type ColorScheme = "auto" | "light" | "dark";

const themeByName = new Map<ThemeName, Theme>(
  bundledThemes.map((theme) => [theme.name, theme]),
);

export {
  bundledThemes,
  themeByName,
  type ColorScheme,
  type Theme,
  type ThemeName,
};
