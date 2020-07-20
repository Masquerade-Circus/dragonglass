import 'valyrian.js';
import Router from 'valyrian.js/plugins/router.js';

import Pages from './pages';

// Create a router
v.usePlugin(Router);
let router = v.Router();
router
  .get('/', () => Pages.Home)
  .get('/grid', () => Pages.Grid)
  .get('/elevations', () => Pages.Elevations)
  .get('/colors', () => Pages.Colors)
  .get('/fonts', () => Pages.Fonts)
  .get('/badges', () => Pages.Badges)
  .get('/buttons', () => Pages.Buttons)
  .get('/cards', () => Pages.Cards)
  .get('/dialogs', () => Pages.Dialogs)
  .get('/lists', () => Pages.Lists)
  .get('/forms', () => Pages.Forms)
  .get('/tooltips', () => Pages.Tooltips)
  .get('/menus', () => Pages.Menus)
  .get('/tables', () => Pages.Tables)
  .get('/progress', () => Pages.Progress)
;

// Assign routes to ValyrianJs
v.routes('body', router);

// // Export what is needed for the backend
export default { Pages };
