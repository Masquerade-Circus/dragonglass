import { Router, mountRouter } from "valyrian.js/router";
import Pages from "./pages";
import { routes, type DocumentationRoute } from "./docs/catalog";

const router = new Router();
const pageForRoute = (route: DocumentationRoute) => {
  if (route.page === "Theme") {
    const themeName = route.themeName;

    if (typeof themeName !== "string") {
      throw new Error(`Theme name not found for route: ${route.path}`);
    }

    return () => Pages.Colors({ themeName });
  }

  const page = Pages[route.page];
  return () => page();
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
