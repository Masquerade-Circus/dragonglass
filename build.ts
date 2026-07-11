import fs from "fs-extra";
import CleanCSS from "clean-css";
import * as sass from "sass";
import { inline } from "valyrian.js/node";
import { documentationAssets } from "./site/src/docs/assets";
import { routeByPath } from "./site/src/docs/catalog";
import { router } from "./site/src/index";
import { renderHtml } from "./site/src/render_html";

const build = async () => {
  console.log("Compiling scss source start");
  const { css } = sass.compile("./site/public/scss/main.scss", {
    loadPaths: ["site/", "node_modules/"],
    sourceMap: false,
    style: "expanded",
  });
  const { styles: minifiedCss } = new CleanCSS({
    sourceMap: false,
    level: {
      1: {
        roundingPrecision: "all=3",
      },
      2: {
        restructureRules: true,
      },
    },
  }).minify(css);

  fs.writeFileSync("./site/public/css/main.css", css, "utf-8");
  fs.writeFileSync("./dist/dragonglass.css", css, "utf-8");
  fs.writeFileSync("./dist/dragonglass.min.css", minifiedCss, "utf-8");
  console.log("Compiling scss source success");

  console.log("Compiling docs start");
  const { raw: documentationScript } = await inline("./site/src/index.ts");
  const documentationRoutes = router.routes().map((path) => {
    const route = routeByPath.get(path);

    if (!route) {
      throw new Error(
        `Documentation metadata not found for registered route: ${path}`,
      );
    }

    return { path, route };
  });

  fs.emptyDirSync("./docs");
  fs.writeFileSync(
    `./docs/${documentationAssets.stylesheet.fileName}`,
    minifiedCss,
    "utf-8",
  );
  fs.writeFileSync(
    `./docs/${documentationAssets.script.fileName}`,
    documentationScript,
    "utf-8",
  );

  for (const { path, route } of documentationRoutes) {
    const routeHtml = await router.go(path);
    const html = renderHtml({
      content: String(routeHtml),
      isDevelopment: false,
      title: `${route.label} | Dragonglass`,
    });

    if (path === "/dragonglass") {
      fs.writeFileSync("./docs/index.html", html, "utf8");
      continue;
    }

    const routePath = path.replace("/dragonglass", "");
    fs.writeFileSync(`./docs${routePath}`, html, "utf8");
  }
  console.log("Compiling docs success");
};

build();
