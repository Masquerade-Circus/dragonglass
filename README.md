# Dragonglass

Dragonglass is an HTML5-first, pure CSS framework for building app interfaces with semantic markup, useful defaults, declarative component attributes, and focused utility classes.

## Why Dragonglass

- Start with native HTML elements and browser behavior.
- Build common app surfaces without utility-heavy markup.
- Add component variants through readable `data-*` attributes.
- Use utilities for explicit spacing, color, elevation, and typography adjustments.
- Ship plain CSS without a client-side framework dependency.

## Install

Install Dragonglass with Bun:

```sh
bun add dragonglass
```

Import the distributed stylesheet from your application entry point:

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";
```

The first file contains components and utilities. The second file supplies the
color tokens. Load a theme after the framework stylesheet.

## Compile a custom theme

Create `theme.scss` and provide one opaque primary color with OKLCH lightness
between `42%` and `56%`. It must also support its lightest family token as text:

```scss
@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}
```

Compile it with Dart Sass:

```sh
bunx sass --pkg-importer=node theme.scss theme.css --style=compressed
```

Load the generated theme after `dragonglass.css`. The mixin derives accent,
success, info, warning, danger, default, every light and dark step, foreground
tokens, and progress colors. Every base uses its own lightest token as
foreground. Dragonglass darkens the six derived bases until that pair reaches
`4.5:1`, while preserving the supplied primary exactly. The compiler rejects
transparent primary colors, values outside the supported lightness range, and
any set that cannot satisfy the configured contrast thresholds.

## Bundled themes

Dragonglass ships twelve compiled themes. Load exactly one after the framework
stylesheet:

| Theme      | Primary   | Useful starting point                           |
| ---------- | --------- | ----------------------------------------------- |
| `default`  | `#1d4ed8` | General product interfaces                      |
| `indigo`   | `#4338ca` | SaaS, finance and developer tools               |
| `violet`   | `#7c3aed` | AI, developer and creative products             |
| `magenta`  | `#a21caf` | Media, community and consumer products          |
| `ruby`     | `#be123c` | Events, entertainment and campaign products     |
| `amber`    | `#92400e` | Commerce, hospitality and editorial products    |
| `moss`     | `#3f6212` | Health, sustainability and field operations     |
| `emerald`  | `#047857` | Finance, healthcare and sustainability products |
| `teal`     | `#0f766e` | Healthcare, collaboration and operational tools |
| `ocean`    | `#0369a1` | Education, logistics and data products          |
| `graphite` | `#475569` | Admin panels, documentation and public services |
| `stone`    | `#57534e` | Archives, publishing and content-heavy tools    |

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/graphite.css";
```

Each theme preserves the same semantic token contract and selects foregrounds
that meet the configured text and progress contrast thresholds. Product context
still matters. Keep labels, icons or another programmatic cue on status and
validation messages instead of communicating through color alone.

## Dark mode

Every compiled theme derives light and dark structural roles from the same
primary. Without an override, `prefers-color-scheme: dark` activates dark mode
automatically. The literal palette remains stable, so utilities such as
`bg-white` and `text-primary-light` keep their original meaning.

Force a scheme on the root element when an application needs a manual choice:

```html
<html data-color-scheme="light"></html>
<html data-color-scheme="dark"></html>
```

Remove the attribute or set it to `auto` to follow the operating system again.

One stylesheet can contain several scoped themes:

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

Overriding only `--primary` in the generated CSS does not recalculate the other
tokens. Compile the mixin again when the primary changes.

## First app shell

```html
<body>
  <header>
    <nav aria-label="Primary">
      <a href="/projects" aria-current="page">Projects</a>
      <a href="/teams">Teams</a>
    </nav>
  </header>

  <main>
    <header>
      <h1>Projects</h1>
    </header>
    <section data-card class="p-4">
      <h2>Website refresh</h2>
      <p>The team is reviewing the final interface states.</p>
      <button>Open project</button>
    </section>
  </main>
</body>
```

## API model

Native elements provide the base styles and behavior. Declarative attributes such as `data-card` select component contracts and variants. Utility classes such as `p-4` make one-purpose adjustments without replacing semantic markup.

## Documentation

- [Quick start](docs/index.html)
- [Foundations](docs/layout.html)
- [Forms](docs/forms.html)
- [Components](docs/app-components.html)
- [Contributing](CONTRIBUTING.md)

## Browser baseline

Dragonglass targets current browsers with modern HTML and CSS support. It does not include legacy-browser compatibility layers.

## License

Apache-2.0. See [LICENSE](LICENSE) for the full license text.
