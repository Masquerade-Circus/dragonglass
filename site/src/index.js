require("valyrian.js");
const Router = require("valyrian.js/plugins/router.js");
const Pages = require("./pages");

// Create a router
v.usePlugin(Router);
let router = v.Router();
router
  .get("/", () => Pages.Home)
  .get("/grid.html", () => Pages.Grid)
  .get("/elevations.html", () => Pages.Elevations)
  .get("/colors.html", () => Pages.Colors)
  .get("/fonts.html", () => Pages.Fonts)
  .get("/badges.html", () => Pages.Badges)
  .get("/buttons.html", () => Pages.Buttons)
  .get("/cards.html", () => Pages.Cards)
  .get("/dialogs.html", () => Pages.Dialogs)
  .get("/lists.html", () => Pages.Lists)
  .get("/forms.html", () => Pages.Forms)
  .get("/tooltips.html", () => Pages.Tooltips)
  .get("/menus.html", () => Pages.Menus)
  .get("/tables.html", () => Pages.Tables)
  .get("/progress.html", () => Pages.Progress);

// Assign routes to ValyrianJs
v.routes("body", router);

// // Export what is needed for the backend
module.exports = { Pages };
