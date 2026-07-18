Pure CSS for app interfaces

# Build app interfaces with HTML that stays readable

Dragonglass turns semantic HTML into app interfaces with readable data-* component contracts, responsive layouts, focused utilities, and compiled themes. Install the CSS and start building.

[Get started](#quick-start) [Browse components](/dragonglass/app-components.html.md)

Markup and rendered result

```html
<article data-card>
  <header>
    <h2>Project: Dragonglass</h2>
  </header>
  <p>The team is reviewing the final interface states.</p>
  <footer>
    <a href="/dragonglass/app-components.html">Open project</a>
  </footer>
</article>
```

## Write semantic HTML. Select a component. Refine the interface.

The markup keeps the structure, component, and visual adjustments easy to read.

### Semantic HTML

Define the interface structure with native HTML elements.

### Component attributes

Select documented components, variants, and states with readable data-* attributes.

### Focused utilities

Adjust layout and presentation while the underlying structure stays visible.

Plain CSS distribution Responsive layout primitives Twelve compiled themes

## Install Dragonglass and build your first card

Install the package, import Dragonglass and one theme, then add semantic HTML.

Import the theme after `dragonglass.css` so it can provide the color tokens.

Step 1: Install the package

```sh
npm install dragonglass
```

Step 2: Import Dragonglass and a theme

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";
```

Step 3: Add your first card

```html
<article data-card>
  <header>
    <h2>Project: Dragonglass</h2>
  </header>
  <p>The team is reviewing the final interface states.</p>
  <footer>
    <a href="/dragonglass/app-components.html">Open project</a>
  </footer>
</article>
```

Dragonglass styles the semantic regions and applies the card contract through data-card.

[Explore card variants](/dragonglass/cards.html.md)

[Browse all components](/dragonglass/app-components.html.md)

## Find components by what the interface needs to do

Component guides show the available markup, variants, and states.

### Actions

Buttons, links, and chips for the actions people can take.

### Forms

Fields, validation states, toggles, native pickers, and search interfaces.

### Navigation

Toolbars, breadcrumbs, expansion panels, steppers, tabs, and menus.

### Feedback

Alerts, notifications, and progress indicators.

### Surfaces

Cards, dialogs, bottom sheets, and drawers.

### Data display

Badges, lists, responsive tables, and tooltips.

Use utilities for focused changes to spacing, layout, typography, color, borders, and elevation.

[Browse all components](/dragonglass/app-components.html.md) [Open the utility reference](/dragonglass/utilities.html.md)

## Change the theme. Keep the component markup

Dragonglass includes twelve compiled themes built on the same semantic token contract. Each theme supports light and dark color schemes while the component markup stays unchanged.

[Explore themes and colors](/dragonglass/colors.html.md)

- Default
- Indigo
- Violet
- Magenta
- Ruby
- Amber
- Moss
- Emerald
- Teal
- Ocean
- Graphite
- Stone

Compile a custom theme

```scss
@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}
```

## Choose where to continue

Go directly to the part of Dragonglass you need next.

### [Getting started](#quick-start)

Install Dragonglass and build your first interface.

### [Components and API](/dragonglass/app-components.html.md)

Find components by purpose and inspect their markup, variants, and states.

### [Layout foundations](/dragonglass/layout.html.md)

Build application shells, content regions, toolbars, and responsive layouts.

### [Utilities](/dragonglass/utilities.html.md)

Find the available classes for layout, spacing, typography, color, borders, and elevation.

### [Themes and colors](/dragonglass/colors.html.md)

Choose a bundled theme or compile custom color tokens.

### [Forms](/dragonglass/forms.html.md)

Review fields, validation states, toggles, pickers, and search layouts.

---

### Browser support

Dragonglass supports Chrome 119+, Edge 119+, Firefox 121+, Safari 16.5+, and iOS Safari 16.5+.
