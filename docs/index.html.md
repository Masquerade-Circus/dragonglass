# Home

Learn how Dragonglass styles semantic HTML and where to find each component.

Dragonglass is HTML5-first. Start with semantic elements and native browser behavior, then add a declarative attribute or utility only when the interface needs a component variant or focused adjustment.

## Install and import

Install Dragonglass with Bun.

```sh
bun add dragonglass
```

Import the framework and one compiled theme from your application entry point.

```js
import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";
```

## Create an app shell

This shell uses native landmarks for structure, `data-card` for a component contract, and `p-4` for one explicit spacing adjustment.

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

## Choose the next guide
