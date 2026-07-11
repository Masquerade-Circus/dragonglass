import path from "node:path";
import { inline } from "valyrian.js/node";
import { router } from "./src/index";
import { renderHtml } from "./src/render_html";
import { routeByPath } from "./src/docs/catalog";

const port = 3004;
const publicRoot = path.resolve("./site/public");
const defaultHeaders = {
  "Cache-Control": "public, no-cache, no-store, must-revalidate",
};

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ts": "text/typescript; charset=utf-8",
  ".tsx": "text/typescript; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const serveStaticFile = async (pathname) => {
  const requestedPath = path.resolve(publicRoot, `.${pathname}`);

  if (!requestedPath.startsWith(publicRoot)) {
    return new Response("Not found", { status: 404 });
  }

  const file = Bun.file(requestedPath);

  if (!(await file.exists())) {
    return null;
  }

  return new Response(file, {
    headers: {
      ...defaultHeaders,
      "Content-Type":
        contentTypes[path.extname(requestedPath)] || "application/octet-stream",
    },
  });
};

const init = async () => {
  const scripts = [await inline("./site/src/index.ts")];

  const routes = new Set(router.routes());

  Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === "/favicon.ico") {
        return new Response("Not found", { status: 404 });
      }

      const staticResponse = await serveStaticFile(url.pathname);

      if (staticResponse !== null) {
        return staticResponse;
      }

      if (routes.has(url.pathname)) {
        const route = routeByPath.get(url.pathname);

        if (!route) {
          return new Response("Documentation metadata not found", {
            status: 500,
          });
        }

        const routeHtml = await router.go(url.pathname);
        const html = renderHtml({
          scripts,
          content: String(routeHtml),
          isDevelopment: true,
          title: `${route.label} | Dragonglass`,
        });

        return new Response(html, {
          headers: {
            ...defaultHeaders,
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      }

      return new Response("Not found", { status: 404 });
    },
  });

  process.stdout.write(`Bun listening on port ${port}\n`);
};

init();
