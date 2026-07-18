# Contributing to Dragonglass

## Local setup

Install Bun, then install the repository dependencies:

```sh
bun install
```

Start the documentation server and Sass watcher:

```sh
bun run dev
```

## Checks

Run the checks that match your change before opening a contribution:

```sh
bun run build
bunx tsc --noEmit
bunx prettier --check site/src README.md CONTRIBUTING.md
```

The build compiles the framework CSS and static documentation. Review the generated pages in desktop and mobile viewports when source pages or styles change.

## Source structure

- `site/public/scss/main.scss` is the stylesheet entry point.
- `site/public/scss/components/` contains component styles.
- `site/src/docs/` contains the documentation catalog and shared documentation components.
- `site/src/pages/` contains documentation page sources.
- `build.ts` compiles CSS and renders static documentation.

## Documentation changes

Documentation sources must preserve the same useful information across generated HTML, Markdown, llms.txt, and llms-full.txt. When a source changes an explanation, example, requirement, or API contract, every generated format must carry that information in a form its reader can use.

- Keep route labels, paths, categories, and descriptions in `site/src/docs/catalog.ts` as the navigation source.
- Use `DocPage` for each documentation page so the catalog supplies its title and description.
- Use `DemoSection` for titled sections and `CodeExample` for code samples.
- Write rendered copy for the developer using Dragonglass. Place internal implementation notes in source comments.
- Keep examples consistent with the current public CSS API.

## Motion changes

Dragonglass exposes semantic motion tokens for component authors:

- `--motion-duration-instant`: `0ms`.
- `--motion-duration-fast`: `120ms`.
- `--motion-duration-base`: `200ms`.
- `--motion-duration-deliberate`: `280ms`.
- `--motion-easing-standard`: `ease-in-out`.
- `--motion-easing-enter`: `ease-out`.
- `--motion-easing-exit`: `ease-in`.

Use the token that matches the state change and list each transitioned property explicitly. Never transition `all`, layout, dimensions, position, display, or focus outlines. Every component with spatial motion or continuous cycles must define a usable `prefers-reduced-motion: reduce` state that removes that motion while preserving status and content.

## Browser fallbacks

The browser baseline covers functional behavior. It does not promise identical
animation support. Treat `::details-content`, CSS `interactivity`,
`sibling-count()`, `sibling-index()`, `invoker`, and `closedby` as progressive
enhancements. Every affected component must retain a documented usable fallback
without those features.

## Generated artifacts

The build writes the core files in `dist/`, the default theme in `dist/themes/`, the development stylesheets in `site/public/css/`, and the static files in `docs/`. Source changes belong in their source files. After editing them, run `bun run build` and review the generated diff.

## Release commands

The dry run exercises the release workflow:

```sh
bun run release-test
```

The release command runs the package publication and release workflow:

```sh
bun run release
```
