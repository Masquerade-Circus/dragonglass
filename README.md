# dragonglass

Dragonglass is an HTML5-first, pure CSS framework for building modern app interfaces with semantic markup, useful defaults, utility classes, declarative attributes, and native browser behavior.

It starts from the HTML a developer already knows. A plain `button`, `form`, `dialog`, `details`, `progress`, `nav`, `search`, `menu`, or `dl` should look ready for an app before you reach for a pile of classes. Utilities exist for explicit adjustments, not for fixing weak defaults.

## What Dragonglass gives you

- Semantic HTML as the default UI layer.
- Pure CSS output in `dist/dragonglass.css` and `dist/dragonglass.min.css`.
- Modern app components built on native elements and declarative attributes.
- Utility classes for spacing, color, borders, outlines, shadows, typography, and responsive adjustments.
- Documentation and demos generated as static HTML in `docs/`.
- A Bun-powered local development flow for the source repo.

## Design stance

Dragonglass targets modern app development. It does not drag legacy CSS APIs or old-browser workarounds into new code. When a modern browser exposes the actual rendering surface through current CSS, Dragonglass styles that surface directly.

This keeps the framework clear for the developer who uses it:

- Modern browsers are the baseline.
- Modern CSS is allowed when it improves the component.
- Legacy class names do not stay alive after the API changes.
- The browser is the source of truth for visual behavior.
- Native pseudo-elements get styled where they actually render.
- A composed component gets adjusted or removed when it does not hold up visually.

The result is a smaller mental model. You write semantic HTML, add a declarative attribute or a utility when the interface needs one, and move on.

## Component model

Dragonglass treats native elements as the base layer.

`body`, `main`, `article`, `dialog`, and any element with `data-card` share the same container contract. Each container can have a direct `header`, content `section`, and `footer`. The header and footer are optional. A direct `main` fills the height available inside `body`, while its content section handles overflow.

```html
<body>
  <header>Application navigation</header>
  <main>
    <header>Current workspace</header>
    <section>Application content</section>
    <footer>Workspace actions</footer>
  </main>
  <footer>Application status</footer>
</body>
```

```html
<button>Save changes</button>

<progress value="64" max="100">64%</progress>

<details>
  <summary>Account settings</summary>
  <p>Update your profile, password, and notification preferences.</p>
</details>
```

Composed components inherit that base and adapt it with a more specific selector.

```html
<nav data-toolbar>
  <a href="/dashboard.html">Dashboard</a>
  <button>New project</button>
</nav>

<dialog data-dialog="bottom-sheet">
  <header>
    <h2>Confirm action</h2>
  </header>
  <section>This action changes the current workspace.</section>
  <footer>
    <button>Cancel</button>
    <button>Confirm</button>
  </footer>
</dialog>
```

This rule keeps the API honest. A drawer link can inherit from `nav a` and then adjust width, alignment, height, and radius. A bottom sheet can inherit from `dialog` and then adapt placement. The component does not pretend to be a separate universe when it lives inside another flow.

Component attributes identify the component and accept whitespace-separated variants. Native HTML and ARIA expose real state. Classes remain available for generic, one-purpose adjustments.

```html
<section data-card="full-width elevated">
  <header>Release</header>
  <section>Release details</section>
</section>

<span data-chip="warning">Review required</span>
<progress data-progress="spinner warning" aria-label="Saving"></progress>
<button data-button="fab" class="bg-primary">+</button>
```

Dragonglass uses border-only defaults for structural components. Floating dialogs, notifications, and FABs include elevation by default and accept `no-shadow`. Cards opt into elevation through `data-card="elevated"` or a generic utility such as `shadow-lg`.

Common component APIs:

| Component             | Markup                                                        |
| --------------------- | ------------------------------------------------------------- |
| Button variant        | `<button data-button="fab no-shadow">`                        |
| Card variants         | `<article data-card="full-width elevated">`                   |
| Chip tone             | `<span data-chip="warning">`                                  |
| Dialog variants       | `<dialog data-dialog="bottom-sheet full-width no-shadow">`    |
| Drawer position       | `<nav data-drawer="right">`                                   |
| Menu position         | `<menu data-menu="top right">`                                |
| Notification variants | `<aside data-notification="warning bottom center no-shadow">` |
| Progress variants     | `<progress data-progress="spinner warning">`                  |
| Stepper layout        | `<ol data-stepper="vertical numbers">`                        |
| Step status           | `<li data-step="done">`                                       |
| Table tone            | `<table data-table="primary">`                                |
| Toggle                | `<input type="checkbox" data-toggle>`                         |
| Tooltip position      | `<span data-tooltip="Help" data-tooltip-position="top">`      |

## Utility API

Use utilities when you need an explicit adjustment.

```html
<section class="bg-primary p-4 shadow-lg">
  <h2 class="text-xl font-semibold">Project status</h2>
  <p class="text-sm">Everything important is visible without custom CSS.</p>
</section>
```

The naming follows a simple rule:

- Measurable values use numbers: `p-4`, `ml-16`, `border-2`, `outline-4`.
- Visual scales use semantic names: `shadow-sm`, `shadow-base`, `shadow-xl`.
- Colors use role names: `bg-primary`, `text-danger`, `border-success`, `outline-danger-light`.
- Typography uses direct class names: `text-sm`, `text-lg`, `font-semibold`, `italic`, `uppercase`, `leading-relaxed`.
- Responsive variants use breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`.

## Components included

Dragonglass includes styles for native and composed app patterns:

- Buttons and floating action buttons.
- Forms, floating fields, validation states, sliders, and native pickers.
- Cards, dialogs, bottom sheets, drawers, menus, and lists.
- Navigation, toolbars, search, chips, alerts, notifications, tabs, steppers, and expansion panels.
- Progress bars, indeterminate progress, and spinner-style progress.
- Spacing, color, border, outline, elevation, position, and typography utilities.

## Install

Install the package with your package manager:

```sh
bun add dragonglass
```

Then load the distributed CSS from your app entry point or HTML:

```js
import "dragonglass/dist/dragonglass.css";
```

or:

```html
<link rel="stylesheet" href="./node_modules/dragonglass/dist/dragonglass.css" />
```

## Use it with plain HTML

Start with semantic markup. Add attributes and utilities only when the interface needs a variant, state, or layout adjustment.

```html
<body>
  <header>
    <nav>
      <a href="/projects.html" aria-current="page">Projects</a>
      <a href="/teams.html">Teams</a>
      <button>New project</button>
    </nav>
  </header>

  <main>
    <header>
      <h1>Projects</h1>
      <search>
        <form role="search">
          <input type="search" placeholder="Search projects" />
          <button>Search</button>
        </form>
      </search>
    </header>

    <section>
      <h2>Website refresh</h2>
      <p>The team is reviewing the final interface states.</p>
      <progress value="72" max="100">72%</progress>
    </section>
  </main>
</body>
```

## Local development from the source repo

Dragonglass uses Bun for the repo workflow.

Install dependencies:

```sh
bun install
```

Start the local docs server and Sass watcher:

```sh
bun run dev
```

Open the local docs:

```txt
http://localhost:3004/dragonglass
```

Run the build:

```sh
bun run build
```

The build writes:

- `site/public/css/main.css`.
- `dist/dragonglass.css`.
- `dist/dragonglass.min.css`.
- `docs/`.

## Source structure

```txt
dragonglass/
├── build.ts
├── package.json
├── dist/
│   ├── dragonglass.css
│   └── dragonglass.min.css
├── docs/
├── site/
│   ├── server.ts
│   ├── public/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── scss/
│   │       ├── main.scss
│   │       └── components/
│   │           └── *.scss
│   └── src/
│       ├── index.ts
│       └── pages/
│           └── *_page.tsx
└── README.md
```

The SCSS source lives in `site/public/scss/main.scss` and `site/public/scss/components/*.scss`.

The documentation pages live in `site/src/pages/*_page.tsx`. The docs site uses Valyrian.js with automatic TSX runtime through `jsxImportSource: "valyrian.js"`, and the local server uses `Bun.serve`.

## Release scripts

The repo includes release helpers:

```sh
bun run release-test
```

```sh
bun run release
```

Before publishing, verify the build output, the static docs, the package metadata, and the version you plan to ship.

## License

Apache-2.0. See `LICENSE` for the full license text.
