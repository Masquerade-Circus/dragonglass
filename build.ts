import fs from "fs-extra";
import CleanCSS from "clean-css";
import * as sass from "sass";
import { inline } from "valyrian.js/node";
import { documentationAssets } from "./site/src/docs/assets";
import { routeByPath } from "./site/src/docs/catalog";
import { router } from "./site/src/index";
import { renderHtml } from "./site/src/render_html";
import { bundledThemes } from "./site/src/themes";

const build = async () => {
  console.log("Compiling scss source start");
  const compileStylesheet = (path: string) => {
    const { css } = sass.compile(path, {
      loadPaths: ["site/", "node_modules/"],
      sourceMap: false,
      style: "expanded",
    });
    const minified = new CleanCSS({
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

    if (minified.errors.length > 0) {
      throw new Error(minified.errors.join("\n"));
    }

    return { css, minifiedCss: minified.styles };
  };

  const core = compileStylesheet("./site/public/scss/main.scss");
  const themes = bundledThemes.map(({ name }) => ({
    name,
    ...compileStylesheet(`./site/public/scss/themes/${name}.scss`),
  }));

  fs.emptyDirSync("./dist/themes");
  fs.emptyDirSync("./site/public/css");
  fs.writeFileSync("./site/public/css/main.css", core.css, "utf-8");
  fs.writeFileSync("./dist/dragonglass.css", core.css, "utf-8");
  fs.writeFileSync("./dist/dragonglass.min.css", core.minifiedCss, "utf-8");

  for (const theme of themes) {
    fs.writeFileSync(
      `./site/public/css/theme-${theme.name}.css`,
      theme.css,
      "utf-8",
    );
    fs.writeFileSync(`./dist/themes/${theme.name}.css`, theme.css, "utf-8");
    fs.writeFileSync(
      `./dist/themes/${theme.name}.min.css`,
      theme.minifiedCss,
      "utf-8",
    );
  }
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
    core.minifiedCss,
    "utf-8",
  );
  for (const theme of themes) {
    fs.writeFileSync(
      `./docs/${documentationAssets.themeStylesheet(theme.name).fileName}`,
      theme.minifiedCss,
      "utf-8",
    );
  }
  fs.writeFileSync(
    `./docs/${documentationAssets.script.fileName}`,
    documentationScript,
    "utf-8",
  );

  for (const { path, route } of documentationRoutes) {
    const routeHtml = await router.go(path);
    const html = renderHtml({
      colorScheme: route.colorScheme ?? "auto",
      content: String(routeHtml),
      isDevelopment: false,
      themeName: route.themeName ?? "default",
      title: `${route.label} | Dragonglass`,
    });

    if (path === "/dragonglass") {
      fs.outputFileSync("./docs/index.html", html, "utf8");
      continue;
    }

    const routePath = path.replace("/dragonglass", "");
    fs.outputFileSync(`./docs${routePath}`, html, "utf8");
  }
  console.log("Compiling docs success");
};

build();
