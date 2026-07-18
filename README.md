# Dragonglass

Dragonglass is an HTML5-first CSS framework for app interfaces. It styles semantic HTML through readable data-* component contracts, responsive layout primitives, focused utilities, and compiled themes. Applications load plain CSS and keep their existing client-side stack.

## Why Dragonglass

- Common app surfaces without utility-heavy markup.
- Component variants selected through readable `data-*` attributes.
- Focused utilities for spacing, color, elevation and typography.
- Plain CSS distribution without a client-side framework dependency.

## Quick start

Install Dragonglass with npm:

```sh
npm install dragonglass
```

Import the distributed stylesheet from your application entry point:

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";
```

The first file contains components and utilities. The second file supplies the
color tokens. Load a theme after the framework stylesheet.

Add your first card:

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

## Choose a bundled theme

Dragonglass ships twelve compiled themes. Replace `default` in the theme import
with any name from the table. One theme loads after the framework stylesheet.

| Theme      | Primary   |
| ---------- | --------- |
| `default`  | `#1d4ed8` |
| `indigo`   | `#4338ca` |
| `violet`   | `#7c3aed` |
| `magenta`  | `#a21caf` |
| `ruby`     | `#be123c` |
| `amber`    | `#92400e` |
| `moss`     | `#3f6212` |
| `emerald`  | `#047857` |
| `teal`     | `#0f766e` |
| `ocean`    | `#0369a1` |
| `graphite` | `#475569` |
| `stone`    | `#57534e` |

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/graphite.css";
```

Each theme preserves the same semantic token contract and selects foregrounds
that meet the configured text and progress contrast thresholds.

## Compile a custom theme

Create `theme.scss` with one opaque primary color whose OKLCH lightness falls
between `42%` and `56%`. The compiler also requires a `4.5:1` contrast ratio
between the primary and its lightest family token:

```scss
@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}
```

Compile it with Dart Sass:

```sh
npx sass --pkg-importer=node theme.scss theme.css --style=compressed
```

Load the generated theme after `dragonglass.css`. The mixin derives accent,
success, info, warning, danger, default, every light and dark step, foreground
tokens, and progress colors. Every base uses its own lightest token as
foreground. Dragonglass darkens the six derived bases until that pair reaches
`4.5:1`, while preserving the supplied primary exactly. Accepted themes use an
opaque primary within the supported lightness range and satisfy the configured
contrast thresholds.

## Dark mode

Every compiled theme derives light and dark structural roles from the same
primary. By default, `prefers-color-scheme: dark` activates dark mode
automatically. The literal palette remains stable, so utilities such as
`bg-white` and `text-primary-light` keep their original meaning.

The root element sets a scheme when the application exposes a manual choice:

```html
<html data-color-scheme="light"></html>
<html data-color-scheme="dark"></html>
```

Remove the attribute or set it to `auto` to follow the operating system again.

One stylesheet contains several scoped themes through separate selectors:

```scss
@use "pkg:dragonglass/theme" as dragonglass;

[data-theme="violet"] {
  @include dragonglass.tokens(#7c3aed);
}

[data-theme="forest"] {
  @include dragonglass.tokens(#167c55);
}
```

Apply a scoped theme on the root element:

```html
<html data-theme="forest"></html>
```

An override to `--primary` changes that custom property alone. Compile the mixin
again to derive the complete token set from a new primary.

## Documentation

- [Getting started](docs/index.html)
- [Components and API](docs/app-components.html)
- [Themes and colors](docs/colors.html)
- [Utilities](docs/utilities.html)
- [Layout foundations](docs/layout.html)
- [Positioning](docs/positioning.html)
- [Images and backgrounds](docs/images.html)
- [Hero recipes](docs/heroes.html)
- [Forms](docs/forms.html)
- [Drawers](docs/drawers.html)
- [llms.txt](docs/llms.txt)
- [llms-full.txt](docs/llms-full.txt)
- [Contributing](CONTRIBUTING.md)

## Browser baseline

Dragonglass supports Chrome 119+, Edge 119+, Firefox 121+, Safari 16.5+, and iOS Safari 16.5+.

This baseline covers functional component behavior. Enhanced motion and layout
do not have equal support across those browsers. Features such as
`::details-content`, CSS `interactivity`, `sibling-count()`, `sibling-index()`,
and native invoker attributes activate only where the browser implements them.
Menus and grouped disclosures remain operable through native `details` and
`summary`. Tabs fall back to stacked disclosures. Temporary drawers use the same
native disclosure state with a direct `aside` and keep the page behind them
interactive. Dialogs and bottom sheets open through `showModal()` and close
through `close()`. Their consumer-side closing helper preserves an animated exit
where the browser exposes one and closes immediately otherwise. The `invoker`
and `closedby` attributes remain optional progressive enhancements.

Observed animation parity in one browser does not establish parity across the
baseline. Test the functional fallback in every supported engine when a change
depends on one of these features.

## License

Apache-2.0. See [LICENSE](LICENSE) for the full license text.
