let fs = require("fs-extra");
let CleanCSS = require("clean-css");
let sass = require("sass");
require("valyrian.js/register");

let build = async () => {
  console.log("Compiling scss source start");
  let { css: scssCss } = sass.renderSync({
    file: "./site/public/scss/main.scss",
    outFile: "./site/public/css/main.css",
    includePaths: ["site/", "node_modules/"],
    precision: 4,
    sourceMap: true,
    sourceMapEmbed: true,
    sourceMapContents: true
  });

  fs.writeFileSync("./site/public/css/main.css", scssCss.toString(), "utf-8");
  console.log("Compiling scss source success");

  let { css: scssCss2 } = sass.renderSync({
    file: "./site/public/scss/main.scss",
    includePaths: ["site/", "node_modules/"],
    precision: 4,
    sourceMap: false
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
  }).minify(scssCss2.toString());

  fs.writeFileSync("./dist/dragonglass.css", scssCss2.toString(), "utf-8");
  fs.writeFileSync("./dist/dragonglass.min.css", styles, "utf-8");

  console.log("Compiling docs start");
  let App = require("./site/src/index");
  let nodePlugin = require("../valyrian.js/plugins/node");
  v.usePlugin(nodePlugin);

  await v.inline.css("./dist/dragonglass.min.css");
  await v.inline.js("./site/src/index.js");

  fs.emptyDirSync("./docs");

  for (let path of v.routes.get()) {
    let html = await v.routes.go(App.Pages.Html, path);
    let fileName = path === "/dragonglass" ? "/index.html" : path;
    fs.writeFileSync(`./docs${fileName}`, html, "utf8");
  }

  console.log("Compiling docs success");
};

build();
