import fs from "fs-extra";
import CleanCSS from "clean-css";
import * as sass from "sass";
import { inline } from "valyrian.js/node";
import { router } from "./site/src/index";
import { renderHtml } from "./site/src/render_html";

let build = async () => {
  console.log("Compiling scss source start");
  let { css: scssCss } = sass.compile("./site/public/scss/main.scss", {
    loadPaths: ["site/", "node_modules/"],
    sourceMap: true,
    style: "expanded"
  });

  fs.writeFileSync("./site/public/css/main.css", scssCss, "utf-8");
  console.log("Compiling scss source success");

  let { css: scssCss2 } = sass.compile("./site/public/scss/main.scss", {
    loadPaths: ["site/", "node_modules/"],
    sourceMap: false,
    style: "expanded"
  });

  let { styles } = new CleanCSS({
    sourceMap: false,
    level: {
      1: {
        roundingPrecision: "all=3"
      },
      2: {
        restructureRules: true // controls rule restructuring; defaults to false
      }
    }
  }).minify(scssCss2);

  fs.writeFileSync("./dist/dragonglass.css", scssCss2, "utf-8");
  fs.writeFileSync("./dist/dragonglass.min.css", styles, "utf-8");

  let allhtml = "";
  const docs = fs.readdirSync("./docs");
  for (let file of docs) {
    const filePath = `./docs/${file}`;
    if (fs.lstatSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath, "utf8");
      allhtml += `\n<!-- ${file} -->\n` + content + `\n\n`;
    }
  }
  fs.writeFileSync(`./docs/all.html`, allhtml, "utf8");

  console.log("Compiling docs start");
  const assets = {
    css: [await inline("./dist/dragonglass.min.css")],
    js: [await inline("./site/src/index.ts")]
  };

  fs.emptyDirSync("./docs");

  for (let path of router.routes()) {
    let routeHtml = await router.go(path);
    let html = renderHtml({ assets, content: String(routeHtml), isDevelopment: false });
    if (path === "/dragonglass") {
      fs.writeFileSync("./docs/index.html", html, "utf8");
      continue;
    }

    let routePath = path.replace("/dragonglass", "");
    fs.writeFileSync(`./docs${routePath}`, html, "utf8");
  }
  console.log("Compiling docs success");
};

build();
