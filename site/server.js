let micro = require("micro");
let Router = require("micro-ex-router");
let compression = require("compression");

// Require valyrian and main app
let App = require("./src/index");
let nodePlugin = require("valyrian.js/plugins/node");
v.usePlugin(nodePlugin);

const DefaultRefreshFileListTime = 1000 * 60; // 1 minute

const DefaultHeaders = {
  any: {
    "Cache-Control": "public, no-cache, no-store, must-revalidate"
  }
};

let init = async () => {
  await v.inline.js("./site/src/index.js");
  await v.inline.css("./site/public/css/main.css");

  // Create a new router
  let router = Router();

  // Add api routes
  router
    .use((req, res) => new Promise((next) => compression()(req, res, next)))
    .use(Router.serveDir("./site/public", DefaultHeaders, DefaultRefreshFileListTime))
    .get("/favicon.ico", () => "Not found");

  // Add Valyrian routes
  v.routes.get().forEach((path) => router.get(path, (req, res) => v.routes.go(App.Pages.Html, req.url)));

  // If we get to this point throw a 404 not found error
  router.use((req, res) => {
    res.statusCode = 404;
    res.end("Not found");
  });

  // Init micro server
  micro(router).listen(3004, () => process.stdout.write(`Micro listening on port ${3004}\n`));
};

init();
