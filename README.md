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
```

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
