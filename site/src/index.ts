import { Router, mountRouter } from "valyrian.js/router";
import Pages from "./pages";
import { routes, type DocumentationRoute } from "./docs/catalog";

const router = new Router();
const themeStylesheetPattern = /theme-[^/]+\.css$/;
const syncDocumentationPresentation = (route: DocumentationRoute) => {
  if (
    typeof document === "undefined" ||
    typeof document.querySelector !== "function"
  ) {
    return;
  }

  const stylesheet = document.querySelector<HTMLLinkElement>(
    "#documentation-theme-stylesheet",
  );

  if (typeof stylesheet?.getAttribute !== "function") {
    throw new Error("Documentation theme stylesheet not found");
  }

  const currentHref = stylesheet.getAttribute("href");

  if (
    typeof currentHref !== "string" ||
    !themeStylesheetPattern.test(currentHref)
  ) {
    throw new Error("Documentation theme stylesheet path is invalid");
  }

  const themeName = route.themeName ?? "default";
  const nextHref = currentHref.replace(
    themeStylesheetPattern,
    `theme-${themeName}.css`,
  );
  document.documentElement.dataset.colorScheme = route.colorScheme;

  if (nextHref !== currentHref) {
    stylesheet.setAttribute("href", nextHref);
  }
};
const pageForRoute = (route: DocumentationRoute) => {
  let renderPage: () => unknown;

  if (route.page === "Theme") {
    const themeName = route.themeName;
    const colorScheme = route.colorScheme;

    if (
      typeof themeName !== "string" ||
      (colorScheme !== "light" && colorScheme !== "dark")
    ) {
      throw new Error(`Theme metadata not found for route: ${route.path}`);
    }

    renderPage = () => Pages.Colors({ colorScheme, themeName });
  } else {
    const page = Pages[route.page];
    renderPage = () => page();
  }

  return () => {
    syncDocumentationPresentation(route);
    return renderPage();
  };
};
const pagesByRoute = new Map(
  routes.map((route) => [route.path, pageForRoute(route)]),
);

for (const route of routes) {
  router.add(route.path, pageForRoute(route));
}

if (typeof window !== "undefined") {
  mountRouter("body", router);
}

export { Pages, pagesByRoute, router };
