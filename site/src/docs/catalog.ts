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
  | "Positioning"
  | "Images"
  | "Elevations"
  | "Colors"
  | "Fonts"
  | "Heroes"
  | "Badges"
  | "Buttons"
  | "Links"
  | "AppComponents"
  | "Toolbars"
  | "Breadcrumbs"
  | "Chips"
  | "Alerts"
  | "ExpansionPanels"
  | "Notifications"
  | "Steppers"
  | "BottomSheets"
  | "Drawers"
  | "Tabs"
  | "Cards"
  | "Dialogs"
  | "Lists"
  | "Forms"
  | "Menus"
  | "Tables"
  | "Tooltips"
  | "Progress"
  | "Utilities"
  | "Theme";
type DocumentationPath = string;
type DocumentationColorScheme = Extract<ColorScheme, "light" | "dark">;

type DocumentationRoute = {
  path: DocumentationPath;
  label: string;
  icon: string;
  color: string;
  page: DocumentationPage;
  category: DocumentationCategory;
  description: string;
  themeName?: ThemeName;
  colorScheme: DocumentationColorScheme;
};

export const catalogEntries: Omit<DocumentationRoute, "colorScheme">[] = [
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
    path: `${basePath}/app-components.html`,
    label: "App components",
    icon: "widgets",
    color: "bg-primary",
    page: "AppComponents",
    category: "Getting started",
    description:
      "Find application components by purpose and open their examples and API.",
  },
  {
    path: `${basePath}/layout.html`,
    label: "Layout",
    icon: "dashboard",
    color: "bg-accent",
    page: "Layouts",
    category: "Foundations",
    description:
      "Responsive containers, direct-child content regions and toolbar layouts.",
  },
  {
    path: `${basePath}/heroes.html`,
    label: "Hero recipes",
    icon: "view_quilt",
    color: "bg-accent",
    page: "Heroes",
    category: "Foundations",
    description:
      "Centered, split and presentation hero recipes composed from existing primitives.",
  },
  {
    path: `${basePath}/buttons.html`,
    label: "Buttons",
    icon: "arrow_forward",
    color: "bg-danger",
    page: "Buttons",
    category: "Actions",
    description:
      "Base button styles, semantic color utilities and FAB variants.",
  },
  {
    path: `${basePath}/links.html`,
    label: "Links",
    icon: "link",
    color: "bg-danger",
    page: "Links",
    category: "Actions",
    description:
      "Inline, standalone and quiet link treatments for navigation and supporting actions.",
  },
  {
    path: `${basePath}/chips.html`,
    label: "Chips",
    icon: "label",
    color: "bg-success",
    page: "Chips",
    category: "Actions",
    description: "Chip tones and checked, pressed and current visual states.",
  },
  {
    path: `${basePath}/forms.html`,
    label: "Forms",
    icon: "font_download",
    color: "bg-success",
    page: "Forms",
    category: "Forms",
    description:
      "Field, floating-label, validation-state and toggle selectors.",
  },
  {
    path: `${basePath}/breadcrumbs.html`,
    label: "Breadcrumbs",
    icon: "chevron_right",
    color: "bg-accent",
    page: "Breadcrumbs",
    category: "Navigation",
    description:
      "Wrapping breadcrumb trails built from direct link and button children.",
  },
  {
    path: `${basePath}/toolbars.html`,
    label: "Toolbars",
    icon: "build",
    color: "bg-accent",
    page: "Toolbars",
    category: "Navigation",
    description: "Wrapping nav[data-toolbar] rows and container variants.",
  },
  {
    path: `${basePath}/tabs.html`,
    label: "Tabs",
    icon: "tab",
    color: "bg-warning",
    page: "Tabs",
    category: "Navigation",
    description: "Grouped details layout selected by data-tabs.",
  },
  {
    path: `${basePath}/menus.html`,
    label: "Menus",
    icon: "menu",
    color: "bg-warning",
    page: "Menus",
    category: "Navigation",
    description: "Positioned menus inside details[data-trigger].",
  },
  {
    path: `${basePath}/expansion-panels.html`,
    label: "Expansion panels",
    icon: "unfold_more",
    color: "bg-danger",
    page: "ExpansionPanels",
    category: "Navigation",
    description:
      "Full-width details panels with a generated open-state marker.",
  },
  {
    path: `${basePath}/steppers.html`,
    label: "Steppers",
    icon: "linear_scale",
    color: "bg-info",
    page: "Steppers",
    category: "Navigation",
    description: "Horizontal, vertical and numbers-only stepper presentations.",
  },
  {
    path: `${basePath}/alerts.html`,
    label: "Alerts",
    icon: "priority_high",
    color: "bg-warning",
    page: "Alerts",
    category: "Feedback",
    description: "Alert surfaces with info, success, warning and danger tones.",
  },
  {
    path: `${basePath}/notifications.html`,
    label: "Notifications",
    icon: "notifications",
    color: "bg-accent",
    page: "Notifications",
    category: "Feedback",
    description:
      "Fixed and inline notifications with tone, position and shadow tokens.",
  },
  {
    path: `${basePath}/progress.html`,
    label: "Progress",
    icon: "trending_flat",
    color: "bg-success",
    page: "Progress",
    category: "Feedback",
    description:
      "Determinate, indeterminate and spinner styles for progress elements.",
  },
  {
    path: `${basePath}/cards.html`,
    label: "Cards",
    icon: "video_label",
    color: "bg-primary",
    page: "Cards",
    category: "Surfaces",
    description: "Basic, elevated, squared and full-width card variants.",
  },
  {
    path: `${basePath}/dialogs.html`,
    label: "Dialogs",
    icon: "web_asset",
    color: "bg-accent",
    page: "Dialogs",
    category: "Surfaces",
    description: "Centered dialogs with shape, width and elevation variants.",
  },
  {
    path: `${basePath}/bottom-sheets.html`,
    label: "Bottom sheets",
    icon: "vertical_align_bottom",
    color: "bg-success",
    page: "BottomSheets",
    category: "Surfaces",
    description: "Bottom-anchored dialog layout with an optional shadow.",
  },
  {
    path: `${basePath}/drawers.html`,
    label: "Drawers",
    icon: "vertical_split",
    color: "bg-info",
    page: "Drawers",
    category: "Surfaces",
    description:
      "Persistent and temporary complementary regions at either viewport edge.",
  },
  {
    path: `${basePath}/lists.html`,
    label: "Lists",
    icon: "list",
    color: "bg-info",
    page: "Lists",
    category: "Data display",
    description: "Styled unordered, ordered and definition-list layouts.",
  },
  {
    path: `${basePath}/badges.html`,
    label: "Badges",
    icon: "chat_bubble",
    color: "bg-warning",
    page: "Badges",
    category: "Data display",
    description: "Generated badge content selected by data-badge.",
  },
  {
    path: `${basePath}/tooltips.html`,
    label: "Tooltips",
    icon: "label",
    color: "bg-info",
    page: "Tooltips",
    category: "Data display",
    description: "Generated tooltip content, positions and color utilities.",
  },
  {
    path: `${basePath}/tables.html`,
    label: "Tables",
    icon: "view_list",
    color: "bg-danger",
    page: "Tables",
    category: "Data display",
    description:
      "Responsive data-table layout with generated mobile cell labels.",
  },
  {
    path: `${basePath}/utilities.html`,
    label: "Utilities",
    icon: "tune",
    color: "bg-default",
    page: "Utilities",
    category: "Utilities",
    description:
      "Find focused spacing, layout, border, typography, elevation and color adjustments.",
  },
  {
    path: `${basePath}/grid.html`,
    label: "Grid",
    icon: "line_style",
    color: "bg-primary",
    page: "Grid",
    category: "Utilities",
    description:
      "Wrapping flex rows, gutters and responsive fractional widths.",
  },
  {
    path: `${basePath}/positioning.html`,
    label: "Positioning",
    icon: "open_with",
    color: "bg-primary",
    page: "Positioning",
    category: "Utilities",
    description:
      "Fixed and absolute placement through directional data-position tokens.",
  },
  {
    path: `${basePath}/images.html`,
    label: "Images",
    icon: "image",
    color: "bg-primary",
    page: "Images",
    category: "Utilities",
    description: "Object-fit, focal-position and background image utilities.",
  },
  {
    path: `${basePath}/elevations.html`,
    label: "Elevations",
    icon: "layers",
    color: "bg-accent",
    page: "Elevations",
    category: "Utilities",
    description:
      "Outer shadows, inset shadows and explicit stacking utilities.",
  },
  {
    path: `${basePath}/colors.html`,
    label: "Colors",
    icon: "group_work",
    color: "bg-info",
    page: "Colors",
    category: "Utilities",
    description:
      "Semantic color tokens, utility classes, bundled themes, and custom theme compilation.",
  },
  {
    path: `${basePath}/fonts.html`,
    label: "Fonts",
    icon: "text_format",
    color: "bg-success",
    page: "Fonts",
    category: "Utilities",
    description:
      "Font size, style, weight, transform, line-height and alignment utilities.",
  },
];
const catalog: DocumentationRoute[] = catalogEntries.map((route) => ({
  ...route,
  colorScheme: "light",
}));

const themeRoutes: DocumentationRoute[] = bundledThemes.map((theme) => ({
  path: themeRoutePath(theme.name),
  label: `${theme.label} theme`,
  icon: "palette",
  color: "bg-primary",
  page: "Theme",
  category: "Utilities",
  description: `Preview the ${theme.label} theme in light mode across semantic colors, components, and interactive states.`,
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
  description: `Preview the ${theme.label} theme in dark mode across semantic colors, components, and interactive states.`,
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
