const basePath = "/dragonglass";

const routes = [
  { path: basePath, label: "Home", icon: "home", color: "bg-primary", page: "Home" },
  { path: `${basePath}/layout.html`, label: "Layout", icon: "dashboard", color: "bg-accent", page: "Layouts" },
  { path: `${basePath}/grid.html`, label: "Grid", icon: "line_style", color: "bg-primary", page: "Grid" },
  { path: `${basePath}/elevations.html`, label: "Elevations", icon: "layers", color: "bg-accent", page: "Elevations" },
  { path: `${basePath}/colors.html`, label: "Colors", icon: "group_work", color: "bg-info", page: "Colors" },
  { path: `${basePath}/fonts.html`, label: "Fonts", icon: "text_format", color: "bg-success", page: "Fonts" },
  { path: `${basePath}/badges.html`, label: "Badges", icon: "chat_bubble", color: "bg-warning", page: "Badges" },
  { path: `${basePath}/buttons.html`, label: "Buttons", icon: "arrow_forward", color: "bg-danger", page: "Buttons" },
  { path: `${basePath}/app-components.html`, label: "App components", icon: "widgets", color: "bg-primary", page: "AppComponents" },
  { path: `${basePath}/toolbars.html`, label: "Toolbars", icon: "build", color: "bg-accent", page: "Toolbars" },
  { path: `${basePath}/search.html`, label: "Search", icon: "search", color: "bg-info", page: "Search" },
  { path: `${basePath}/chips.html`, label: "Chips", icon: "label", color: "bg-success", page: "Chips" },
  { path: `${basePath}/alerts.html`, label: "Alerts", icon: "priority_high", color: "bg-warning", page: "Alerts" },
  { path: `${basePath}/expansion-panels.html`, label: "Expansion panels", icon: "unfold_more", color: "bg-danger", page: "ExpansionPanels" },
  { path: `${basePath}/notifications.html`, label: "Notifications", icon: "notifications", color: "bg-accent", page: "Notifications" },
  { path: `${basePath}/steppers.html`, label: "Steppers", icon: "linear_scale", color: "bg-info", page: "Steppers" },
  { path: `${basePath}/bottom-sheets.html`, label: "Bottom sheets", icon: "vertical_align_bottom", color: "bg-success", page: "BottomSheets" },
  { path: `${basePath}/tabs.html`, label: "Tabs", icon: "tab", color: "bg-warning", page: "Tabs" },
  { path: `${basePath}/cards.html`, label: "Cards", icon: "video_label", color: "bg-primary", page: "Cards" },
  { path: `${basePath}/dialogs.html`, label: "Dialogs", icon: "web_asset", color: "bg-accent", page: "Dialogs" },
  { path: `${basePath}/lists.html`, label: "Lists", icon: "list", color: "bg-info", page: "Lists" },
  { path: `${basePath}/forms.html`, label: "Forms", icon: "font_download", color: "bg-success", page: "Forms" },
  { path: `${basePath}/menus.html`, label: "Menus", icon: "menu", color: "bg-warning", page: "Menus" },
  { path: `${basePath}/tables.html`, label: "Tables", icon: "view_list", color: "bg-danger", page: "Tables" },
  { path: `${basePath}/tooltips.html`, label: "Tooltips", icon: "label", color: "bg-info", page: "Tooltips" },
  { path: `${basePath}/progress.html`, label: "Progress", icon: "trending_flat", color: "bg-success", page: "Progress" }
];

export { basePath, routes };
