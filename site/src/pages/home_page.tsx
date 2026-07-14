import CodeExample from "../docs/code_example";
import { routeByPage, type DocumentationPage } from "../docs/catalog";
import Layout from "./layout";

const installCode = `bun add dragonglass`;

const importCode = `import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";`;

const cardCode = `<section data-card class="p-4">
  <h2>Website refresh</h2>
  <p>The team is reviewing the final interface states.</p>
  <button>Open project</button>
</section>`;

const colorSchemeCode = `<html data-color-scheme="light"></html>
<html data-color-scheme="dark"></html>`;

const customThemeCode = `@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}`;

const componentGroups = [
  ["Actions", "Buttons, links and chips."],
  ["Forms", "Fields, floating labels, validation states and toggles."],
  [
    "Navigation",
    "Breadcrumbs, toolbars, expansion panels, steppers, tabs and menus.",
  ],
  ["Feedback", "Alerts, notifications and progress."],
  ["Surfaces", "Bottom sheets, cards and dialogs."],
  ["Data display", "Badges, lists, tables and tooltips."],
] as const;

const pathFor = (page: DocumentationPage) => routeByPage.get(page)!.path;

const introMeasure = "md:w-10/12 lg:w-8/12 xl:w-7/12 pt-0 pb-0 text-center";
const contentMeasure = "md:w-10/12 pt-0 pb-0";

export default () => (
  <Layout currentPath={pathFor("Home")}>
    <section
      class="grid-center grid-gutters min-h-half-screen pt-8"
      aria-labelledby="home-title"
    >
      <p class={`${introMeasure} text-sm font-semibold mt-0 mb-2`}>
        Pure CSS framework
      </p>

      <h1
        id="home-title"
        class={`${introMeasure} text-5xl font-bold leading-tight mt-0 mb-4`}
      >
        App interfaces with readable HTML.
      </h1>

      <p class={`${introMeasure} text-lg leading-relaxed mt-0 mb-4`}>
        Dragonglass styles semantic HTML with readable data-* component
        variants, responsive layout primitives and focused utilities. It ships
        as plain CSS with no client-side framework dependency.
      </p>

      <p class={`${introMeasure} mt-0 mb-0`}>
        <a
          data-button
          class="bg-primary text-lg p-3 mr-2 mb-2"
          href={pathFor("AppComponents")}
        >
          Explore app components
        </a>
        <a
          data-link="standalone"
          class="text-lg p-3 mb-2"
          href={pathFor("Layouts")}
        >
          View layout
        </a>
      </p>

      <h2
        class={`${contentMeasure} text-2xl font-semibold leading-tight mt-10 mb-3`}
      >
        Add Dragonglass
      </h2>

      <figure class="md:w-4/12" aria-labelledby="package-label">
        <h3
          id="package-label"
          class="text-lg font-semibold leading-snug mt-0 mb-2"
        >
          Package
        </h3>
        <CodeExample code={installCode} />
      </figure>

      <figure class="md:w-6/12" aria-labelledby="stylesheets-label">
        <h3
          id="stylesheets-label"
          class="text-lg font-semibold leading-snug mt-0 mb-2"
        >
          Stylesheets
        </h3>
        <p class="mt-0 mb-2">
          Import the framework first, then one compiled theme.
        </p>
        <CodeExample code={importCode} />
      </figure>
    </section>

    <hr class="mt-8 mb-8" />

    <section
      class="grid-center grid-gutters"
      aria-labelledby="composition-title"
    >
      <p class={`${contentMeasure} text-sm font-semibold mt-0 mb-2`}>
        Readable composition
      </p>

      <h2
        id="composition-title"
        class={`${contentMeasure} text-2xl font-semibold leading-tight mt-0 mb-3`}
      >
        Use attributes for components. Keep utilities focused.
      </h2>

      <p class={`${contentMeasure} mt-0 mb-6`}>
        Start with a native element. Add data-card for the component contract
        and p-4 for one explicit spacing adjustment.
      </p>

      <figure class="md:w-7/12 lg:w-6/12" aria-label="README card markup">
        <CodeExample code={cardCode} />
      </figure>

      <figure
        class="md:w-5/12 lg:w-4/12"
        aria-label="Rendered card and markup annotations"
      >
        <section data-card class="p-4">
          <h2>Website refresh</h2>
          <p>The team is reviewing the final interface states.</p>
          <button>Open project</button>
        </section>

        <dl>
          <dt>HTML structure</dt>
          <dd>
            <code>section</code>
          </dd>
          <dt>Component contract</dt>
          <dd>
            <code>data-card</code>
          </dd>
          <dt>Focused utility</dt>
          <dd>
            <code>p-4</code>
          </dd>
        </dl>
      </figure>
    </section>

    <hr class="mt-8 mb-8" />

    <section
      class="grid-center grid-gutters"
      aria-labelledby="components-title"
    >
      <p class={`${contentMeasure} text-sm font-semibold mt-0 mb-2`}>
        App components
      </p>

      <h2
        id="components-title"
        class={`${contentMeasure} text-2xl font-semibold leading-tight mt-0 mb-3`}
      >
        Common app surfaces, grouped by purpose.
      </h2>

      <p class={`${contentMeasure} mt-0 mb-6`}>
        Each component guide pairs rendered examples with markup and an API
        table for its elements, attributes, variants, states and tokens.
      </p>

      <dl class="md:w-10/12">
        {componentGroups.flatMap(([group, contents]) => [
          <dt>{group}</dt>,
          <dd>{contents}</dd>,
        ])}
      </dl>

      <h3 class="md:w-3/12 text-lg font-semibold leading-snug mt-0 mb-0">
        Focused adjustments
      </h3>

      <p class="md:w-4/12 mt-0 mb-0">
        Spacing, layout, borders, typography, elevation and color.
      </p>

      <p class="md:w-3/12 mt-0 mb-0">
        <a data-button class="text-lg p-3" href={pathFor("Utilities")}>
          View utilities
        </a>
      </p>
    </section>

    <hr class="mt-8 mb-8" />

    <section
      class="grid-center grid-gutters pb-8"
      aria-labelledby="themes-title"
    >
      <p class={`${contentMeasure} text-sm font-semibold mt-0 mb-2`}>
        12 compiled themes
      </p>

      <h2
        id="themes-title"
        class={`${contentMeasure} text-2xl font-semibold leading-tight mt-0 mb-3`}
      >
        One semantic token contract across light and dark.
      </h2>

      <p class={`${contentMeasure} mt-0 mb-6`}>
        Each theme derives light and dark structural roles from the same primary
        and follows prefers-color-scheme automatically.
      </p>

      <figure class="lg:w-5/12" aria-label="Manual color scheme control">
        <p data-alert="info">
          <strong>Manual control:</strong> set <code>data-color-scheme</code> to{" "}
          <code>light</code> or <code>dark</code> on the root element.
        </p>
        <CodeExample code={colorSchemeCode} />
      </figure>

      <figure class="lg:w-5/12" aria-labelledby="custom-theme-title">
        <h3
          id="custom-theme-title"
          class="text-lg font-semibold leading-snug mt-0 mb-2"
        >
          Custom
        </h3>
        <p class="mt-0 mb-2">
          Compile semantic families, foregrounds and progress colors from one
          supported opaque primary.
        </p>
        <CodeExample code={customThemeCode} />
        <p class="mt-4 mb-0">
          <a data-button class="text-lg p-3" href={pathFor("Colors")}>
            Explore colors
          </a>
        </p>
      </figure>
    </section>
  </Layout>
);
