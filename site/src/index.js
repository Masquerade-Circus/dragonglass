require("valyrian.js");
const Router = require("valyrian.js/plugins/router.js");
const Pages = require("./pages");

// Create a router
v.usePlugin(Router);
let router = v.Router();
router
  .get("/dragonglass", () => Pages.Home)
  .get("/dragonglass/grid.html", () => Pages.Grid)
  .get("/dragonglass/elevations.html", () => Pages.Elevations)
  .get("/dragonglass/colors.html", () => Pages.Colors)
  .get("/dragonglass/fonts.html", () => Pages.Fonts)
  .get("/dragonglass/badges.html", () => Pages.Badges)
  .get("/dragonglass/buttons.html", () => Pages.Buttons)
  .get("/dragonglass/cards.html", () => Pages.Cards)
  .get("/dragonglass/dialogs.html", () => Pages.Dialogs)
  .get("/dragonglass/lists.html", () => Pages.Lists)
  .get("/dragonglass/forms.html", () => Pages.Forms)
  .get("/dragonglass/tooltips.html", () => Pages.Tooltips)
  .get("/dragonglass/menus.html", () => Pages.Menus)
  .get("/dragonglass/tables.html", () => Pages.Tables)
  .get("/dragonglass/progress.html", () => Pages.Progress);

// Assign routes to ValyrianJs
v.routes("body", router);

// // Export what is needed for the backend
module.exports = { Pages };
