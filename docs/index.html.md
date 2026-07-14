Pure CSS framework

# App interfaces with readable HTML.

Dragonglass styles semantic HTML with readable data-* component variants, responsive layout primitives and focused utilities. It ships as plain CSS with no client-side framework dependency.

[Explore app components](/dragonglass/app-components.html.md) [View layout](/dragonglass/layout.html.md)

## Add Dragonglass

### Package

```sh
bun add dragonglass
```

### Stylesheets

Import the framework first, then one compiled theme.

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";
```

---

Readable composition

## Use attributes for components. Keep utilities focused.

Start with a native element. Add data-card for the component contract and p-4 for one explicit spacing adjustment.

```html
<section data-card class="p-4">
  <h2>Website refresh</h2>
  <p>The team is reviewing the final interface states.</p>
  <button>Open project</button>
</section>
```

## Website refresh

The team is reviewing the final interface states.

- **HTML structure:**
  `section`
- **Component contract:**
  `data-card`
- **Focused utility:**
  `p-4`

---

App components

## Common app surfaces, grouped by purpose.

Each component guide pairs rendered examples with markup and an API table for its elements, attributes, variants, states and tokens.

- **Actions:**
  Buttons, links and chips.
- **Forms:**
  Fields, floating labels, validation states and toggles.
- **Navigation:**
  Breadcrumbs, toolbars, expansion panels, steppers, tabs and menus.
- **Feedback:**
  Alerts, notifications and progress.
- **Surfaces:**
  Bottom sheets, cards and dialogs.
- **Data display:**
  Badges, lists, tables and tooltips.

### Focused adjustments

Spacing, layout, borders, typography, elevation and color.

[View utilities](/dragonglass/utilities.html.md)

---

12 compiled themes

## One semantic token contract across light and dark.

Each theme derives light and dark structural roles from the same primary and follows prefers-color-scheme automatically.

**Manual control:** set `data-color-scheme` to `light` or `dark` on the root element.

```html
<html data-color-scheme="light"></html>
<html data-color-scheme="dark"></html>
```

### Custom

Compile semantic families, foregrounds and progress colors from one supported opaque primary.

```scss
@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}
```

[Explore colors](/dragonglass/colors.html.md)
