let Router = require('micro-ex-router');
let compression = require('compression');
require('colors');

// Require valyrian and main app
let App = require('./public/js/index.min');
let nodePlugin = require('valyrian.js/plugins/node');
v.usePlugin(nodePlugin);

// Create a new router
let router = Router();

// Add api routes
router
  .use((req, res) => new Promise((next) => compression()(req, res, next)))
  .use(Router.serveDir('./site/public'))
  .get('/favicon.ico', () => 'Not found');

// Add Valyrian routes
v.routes
  .get()
  .forEach((path) =>
    router.get(path, async (req, res) => '<!DOCTYPE html>' + (await v.routes.go(App.Pages.Html, req.url)))
  );

// Uncaught error handler
process.on('unhandledRejection', (reason) => {
  process.stderr.write(`    ${reason}\n`.italic.strikethrough.red);
  throw reason;
});

let micro = require('micro');
micro(router).listen(3001, () => {
  process.stdout.write('Micro listening on port 3001\n');
});
