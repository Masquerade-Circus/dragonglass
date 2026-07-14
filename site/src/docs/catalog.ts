import { bundledThemes, type ColorScheme, type ThemeName } from "../themes";

const basePath = "/dragonglass";
const themeRoutePath = (
  themeName: ThemeName,
  colorScheme: Extract<ColorScheme, "light" | "dark"> = "light",
) =>
  colorScheme === "dark"
    ? `${basePath}/themes/dark/${themeName}.html`
    : `${basePath}/themes/${themeName}.html`;

const categoryOrder = [
  "Getting started",
  "Foundations",
  "Actions",
  "Forms",
  "Navigation",
  "Feedback",
  "Surfaces",
  "Data display",
  "Utilities",
] as const;

type DocumentationCategory = (typeof categoryOrder)[number];
type DocumentationPage =
  | "Home"
  | "Layouts"
  | "Grid"
  | "Elevations"
  | "Colors"
  | "Fonts"
  | "Badges"
  | "Buttons"
  | "AppComponents"
  | "Toolbars"
  | "Chips"
  | "Alerts"
  | "ExpansionPanels"
  | "Notifications"
  | "Steppers"
  | "BottomSheets"
  | "Tabs"
  | "Cards"
  | "Dialogs"
  | "Lists"
  | "Forms"
  | "Menus"
  | "Tables"
  | "Tooltips"
  | "Progress"
  | "Theme";
type DocumentationPath = string;

type DocumentationRoute = {
  path: DocumentationPath;
  label: string;
  icon: string;
  color: string;
  page: DocumentationPage;
  category: DocumentationCategory;
  description: string;
  themeName?: ThemeName;
  colorScheme?: ColorScheme;
};

const catalog: DocumentationRoute[] = [
  {
    path: basePath,
    label: "Home",
    icon: "home",
    color: "bg-primary",
    page: "Home",
    category: "Getting started",
    description:
      "Learn how Dragonglass styles semantic HTML and where to find each component.",
  },
  {
    path: `${basePath}/layout.html`,
    label: "Layout",
    icon: "dashboard",
    color: "bg-accent",
    page: "Layouts",
    category: "Foundations",
    description:
      "Build responsive page structures with Dragonglass layout primitives.",
  },
  {
    path: `${basePath}/grid.html`,
    label: "Grid",
    icon: "line_style",
    color: "bg-primary",
    page: "Grid",
    category: "Utilities",
    description: "Arrange content with the responsive grid system.",
  },
  {
    path: `${basePath}/elevations.html`,
    label: "Elevations",
    icon: "layers",
    color: "bg-accent",
    page: "Elevations",
    category: "Utilities",
    description:
      "Apply consistent depth and emphasis with elevation utilities.",
  },
  {
    path: `${basePath}/colors.html`,
    label: "Colors",
    icon: "group_work",
    color: "bg-info",
    page: "Colors",
    category: "Utilities",
    description: "Use the color palette for backgrounds, borders and text.",
  },
  {
    path: `${basePath}/fonts.html`,
    label: "Fonts",
    icon: "text_format",
    color: "bg-success",
    page: "Fonts",
    category: "Utilities",
    description: "Set readable type sizes, weights and styles.",
  },
  {
    path: `${basePath}/badges.html`,
    label: "Badges",
    icon: "chat_bubble",
    color: "bg-warning",
    page: "Badges",
    category: "Data display",
    description: "Highlight compact statuses, counts and labels with badges.",
  },
  {
    path: `${basePath}/buttons.html`,
    label: "Buttons",
    icon: "arrow_forward",
    color: "bg-danger",
    page: "Buttons",
    category: "Actions",
    description:
      "Present primary, secondary and floating actions with buttons.",
  },
  {
    path: `${basePath}/app-components.html`,
    label: "App components",
    icon: "widgets",
    color: "bg-primary",
    page: "AppComponents",
    category: "Getting started",
    description: "Compose common application surfaces from semantic HTML.",
  },
  {
    path: `${basePath}/toolbars.html`,
    label: "Toolbars",
    icon: "build",
    color: "bg-accent",
    page: "Toolbars",
    category: "Navigation",
    description: "Group navigation, titles and actions in adaptable toolbars.",
  },
  {
    path: `${basePath}/chips.html`,
    label: "Chips",
    icon: "label",
    color: "bg-success",
    page: "Chips",
    category: "Actions",
    description: "Represent compact values, filters and selections with chips.",
  },
  {
    path: `${basePath}/alerts.html`,
    label: "Alerts",
    icon: "priority_high",
    color: "bg-warning",
    page: "Alerts",
    category: "Feedback",
    description: "Communicate important status and guidance with alerts.",
  },
  {
    path: `${basePath}/expansion-panels.html`,
    label: "Expansion panels",
    icon: "unfold_more",
    color: "bg-danger",
    page: "ExpansionPanels",
    category: "Navigation",
    description: "Reveal optional content in compact expansion panels.",
  },
  {
    path: `${basePath}/notifications.html`,
    label: "Notifications",
    icon: "notifications",
    color: "bg-accent",
    page: "Notifications",
    category: "Feedback",
    description: "Deliver timely, contextual messages with notifications.",
  },
  {
    path: `${basePath}/steppers.html`,
    label: "Steppers",
    icon: "linear_scale",
    color: "bg-info",
    page: "Steppers",
    category: "Navigation",
    description: "Guide people through ordered, multi-step tasks.",
  },
  {
    path: `${basePath}/bottom-sheets.html`,
    label: "Bottom sheets",
    icon: "vertical_align_bottom",
    color: "bg-success",
    page: "BottomSheets",
    category: "Surfaces",
    description: "Show contextual actions and content in bottom sheets.",
  },
  {
    path: `${basePath}/tabs.html`,
    label: "Tabs",
    icon: "tab",
    color: "bg-warning",
    page: "Tabs",
    category: "Navigation",
    description: "Switch between related sections with accessible tabs.",
  },
  {
    path: `${basePath}/cards.html`,
    label: "Cards",
    icon: "video_label",
    color: "bg-primary",
    page: "Cards",
    category: "Surfaces",
    description: "Group related content and actions in flexible cards.",
  },
  {
    path: `${basePath}/dialogs.html`,
    label: "Dialogs",
    icon: "web_asset",
    color: "bg-accent",
    page: "Dialogs",
    category: "Surfaces",
    description: "Focus attention on decisions and short tasks with dialogs.",
  },
  {
    path: `${basePath}/lists.html`,
    label: "Lists",
    icon: "list",
    color: "bg-info",
    page: "Lists",
    category: "Data display",
    description:
      "Display related items, details and actions in structured lists.",
  },
  {
    path: `${basePath}/forms.html`,
    label: "Forms",
    icon: "font_download",
    color: "bg-success",
    page: "Forms",
    category: "Forms",
    description: "Collect information with semantic, accessible form controls.",
  },
  {
    path: `${basePath}/menus.html`,
    label: "Menus",
    icon: "menu",
    color: "bg-warning",
    page: "Menus",
    category: "Navigation",
    description: "Offer compact groups of navigation links and actions.",
  },
  {
    path: `${basePath}/tables.html`,
    label: "Tables",
    icon: "view_list",
    color: "bg-danger",
    page: "Tables",
    category: "Data display",
    description: "Present structured data in responsive tables.",
  },
  {
    path: `${basePath}/tooltips.html`,
    label: "Tooltips",
    icon: "label",
    color: "bg-info",
    page: "Tooltips",
    category: "Data display",
    description: "Add concise supporting context with tooltips.",
  },
  {
    path: `${basePath}/progress.html`,
    label: "Progress",
    icon: "trending_flat",
    color: "bg-success",
    page: "Progress",
    category: "Feedback",
    description: "Show determinate and indeterminate progress states.",
  },
];

const themeRoutes: DocumentationRoute[] = bundledThemes.map((theme) => ({
  path: themeRoutePath(theme.name),
  label: `${theme.label} theme`,
  icon: "palette",
  color: "bg-primary",
  page: "Theme",
  category: "Utilities",
  description: `Preview the ${theme.label} theme across semantic colors and common components.`,
  themeName: theme.name,
  colorScheme: "light",
}));
const darkThemeRoutes: DocumentationRoute[] = bundledThemes.map((theme) => ({
  path: themeRoutePath(theme.name, "dark"),
  label: `${theme.label} dark theme`,
  icon: "dark_mode",
  color: "bg-primary",
  page: "Theme",
  category: "Utilities",
  description: `Preview the ${theme.label} dark theme across semantic colors and common components.`,
  themeName: theme.name,
  colorScheme: "dark",
}));
const routes = [...catalog, ...themeRoutes, ...darkThemeRoutes];
const routeByPage = new Map<DocumentationPage, DocumentationRoute>(
  catalog.map((route) => [route.page, route]),
);
const routeByPath = new Map<DocumentationPath, DocumentationRoute>(
  routes.map((route) => [route.path, route]),
);

export {
  basePath,
  catalog,
  categoryOrder,
  darkThemeRoutes,
  routeByPage,
  routeByPath,
  routes,
  themeRoutePath,
  themeRoutes,
  type DocumentationCategory,
  type DocumentationPage,
  type DocumentationPath,
  type DocumentationRoute,
};
