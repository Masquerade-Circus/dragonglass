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

- Add or update route metadata in `site/src/docs/catalog.ts` instead of duplicating labels, paths, categories, or descriptions in navigation pages.
- Use `DocPage` for each documentation page so the catalog supplies its title and description.
- Use `DemoSection` for titled sections and `CodeExample` for code samples.
- Keep one `h1` per page and use semantic HTML for headings, landmarks, lists, controls, and links.
- Write visible copy for the developer using Dragonglass. Keep implementation notes out of rendered pages.
- Keep examples small, valid, and consistent with the current public CSS API.

## Generated artifacts

The build writes the core files in `dist/`, the default theme in `dist/themes/`, the development stylesheets in `site/public/css/`, and the static files in `docs/`. Do not edit these generated artifacts by hand. Change their source, run `bun run build`, and review the generated diff.

## Release commands

The dry run exercises the release workflow:

```sh
bun run release-test
```

The release command can publish the package and create a release:

```sh
bun run release
```

Do not run `bun run release` until the intended version, package metadata, generated artifacts, visual review, and release notes have been validated. Never publish from a working tree that contains unrelated or unreviewed changes.

## Contribution rules

- Keep changes focused and follow the existing HTML5-first design.
- Add or update coverage when behavior or generated documentation changes.
- Run the relevant build, typecheck, format check, and visual review.
- Do not commit secrets, credentials, tokens, private keys, personal data, production data, or real customer information.
- Use clearly fictional values in examples, fixtures, screenshots, and test data.
- Do not add dependencies unless the change requires one and the maintenance cost is justified.
