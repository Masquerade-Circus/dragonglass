import { Router, mountRouter } from "valyrian.js/router";
import Pages from "./pages";
import { routes } from "./routes";

const router = new Router();
const pagesByRoute = new Map(
  routes.map(({ path, page }) => [path, Pages[page]]),
);

for (const { path, page } of routes) {
  router.add(path, Pages[page]);
}

if (typeof window !== "undefined") {
  mountRouter("body", router);
}

export { Pages, pagesByRoute, router };
