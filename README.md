# Dragonglass

Dragonglass turns semantic HTML into app interfaces with readable `data-*` component contracts, responsive layouts, focused utilities, and compiled themes. Install the CSS and start building.

## Why Dragonglass

- Build common app surfaces with readable semantic markup.
- Select component variants through clear `data-*` attributes.
- Refine spacing, color, elevation, and typography with focused utilities.
- Ship plain CSS with your application.

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

The first file provides components and utilities. The second provides the color
tokens and loads after the framework stylesheet.

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

Dragonglass includes twelve compiled themes. Replace `default` with any theme
name from the table and load it after the framework stylesheet.

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

- [Getting started](https://masquerade-circus.github.io/dragonglass/)
- [Components and API](https://masquerade-circus.github.io/dragonglass/app-components.html)
- [Themes and colors](https://masquerade-circus.github.io/dragonglass/colors.html)
- [Utilities](https://masquerade-circus.github.io/dragonglass/utilities.html)
- [llms-full.txt](https://masquerade-circus.github.io/dragonglass/llms-full.txt)
- [Contributing](CONTRIBUTING.md)

## Browser baseline

Dragonglass supports Chrome 119+, Edge 119+, Firefox 121+, Safari 16.5+, and iOS Safari 16.5+.

## License

Apache-2.0. See [LICENSE](LICENSE) for the full license text.
