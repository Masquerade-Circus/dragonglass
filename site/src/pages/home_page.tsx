import CodeExample from "../docs/code_example";
import { routeByPage, type DocumentationPage } from "../docs/catalog";
import { bundledThemes } from "../themes";
import Layout from "./layout";

const pathFor = (page: DocumentationPage) => routeByPage.get(page)!.path;

const installCode = `bun add dragonglass`;

const importCode = `import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";`;

const firstSurfaceCode = `<article data-card>
  <header>
    <h2>Project: Dragonglass</h2>
  </header>
  <p>The team is reviewing the final interface states.</p>
  <footer>
    <a href="${pathFor("AppComponents")}">Open project</a>
  </footer>
</article>`;

const customThemeCode = `@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}`;

const mentalModel = [
  [
    "Semantic HTML",
    "Define the interface structure with native HTML elements.",
  ],
  [
    "Component attributes",
    "Select documented components, variants, and states with readable data-* attributes.",
  ],
  [
    "Focused utilities",
    "Adjust layout and presentation while the underlying structure stays visible.",
  ],
] as const;

const frameworkSummary = [
  "Plain CSS distribution",
  "Responsive layout primitives",
  "Twelve compiled themes",
] as const;

const componentCategories = [
  ["Actions", "Buttons, links, and chips for the actions people can take."],
  [
    "Forms",
    "Fields, validation states, toggles, native pickers, and search interfaces.",
  ],
  [
    "Navigation",
    "Toolbars, breadcrumbs, expansion panels, steppers, tabs, and menus.",
  ],
  ["Feedback", "Alerts, notifications, and progress indicators."],
  ["Surfaces", "Cards, dialogs, and bottom sheets."],
  ["Data display", "Badges, lists, responsive tables, and tooltips."],
] as const;

const documentationPaths: Array<{
  title: string;
  body: string;
  href: string;
}> = [
  {
    title: "Getting started",
    body: "Install Dragonglass and build your first interface.",
    href: "#quick-start",
  },
  {
    title: "Components and API",
    body: "Find components by purpose and inspect their markup, variants, and states.",
    href: pathFor("AppComponents"),
  },
  {
    title: "Layout foundations",
    body: "Build application shells, content regions, toolbars, and responsive layouts.",
    href: pathFor("Layouts"),
  },
  {
    title: "Utilities",
    body: "Find the available classes for layout, spacing, typography, color, borders, and elevation.",
    href: pathFor("Utilities"),
  },
  {
    title: "Themes and colors",
    body: "Choose a bundled theme or compile custom color tokens.",
    href: pathFor("Colors"),
  },
  {
    title: "Forms",
    body: "Review fields, validation states, toggles, pickers, and search layouts.",
    href: pathFor("Forms"),
  },
];

export default () => (
  <Layout currentPath={pathFor("Home")} contentClass="p-0">
    <div data-markdown="include-descendants">
      <section
        class="min-h-half-screen bg-white pt-8 pb-8"
        aria-labelledby="home-title"
      >
        <div class="container pl-4 pr-4">
          <div class="grid grid-gutters">
            <div class="lg:w-7/12">
              <p class="text-sm font-semibold mt-0 mb-2">
                Pure CSS for app interfaces
              </p>
              <h1
                id="home-title"
                class="text-4xl font-bold leading-tight mt-0 mb-4"
                style="font-size: clamp(3rem, 4.2vw, 3.75rem)"
              >
                Build app interfaces with HTML that stays readable
              </h1>
              <p class="max-w-prose text-lg leading-relaxed mt-0 mb-6">
                Dragonglass is an HTML5-first CSS framework for app interfaces.
                It styles semantic HTML through readable data-* component
                contracts, responsive layout primitives, focused utilities, and
                compiled themes. Applications load plain CSS and keep their
                existing client-side stack.
              </p>
              <p class="mt-0 mb-0">
                <a
                  data-button
                  class="bg-primary text-lg p-3 mr-2 mb-2"
                  href="#quick-start"
                >
                  Get started
                </a>
                <a
                  data-link="standalone"
                  class="text-lg p-3 mb-2"
                  href={pathFor("AppComponents")}
                >
                  Browse components
                </a>
              </p>
            </div>

            <figure class="lg:w-5/12 mt-6">
              <figcaption class="text-sm font-semibold mt-0 mb-2">
                Markup and rendered result
              </figcaption>
              <CodeExample code={firstSurfaceCode} />
              <article data-card data-markdown="exclude">
                <header>
                  <h2>Project: Dragonglass</h2>
                </header>
                <p>The team is reviewing the final interface states.</p>
                <footer>
                  <a href={pathFor("AppComponents")}>Open project</a>
                </footer>
              </article>
            </figure>
          </div>
        </div>
      </section>

      <section
        class="bg-default-lightest text-black pt-12 pb-12"
        aria-labelledby="mental-model-title"
      >
        <div class="container pl-4 pr-4">
          <h2
            id="mental-model-title"
            class="max-w-prose text-3xl font-semibold leading-tight mt-0 mb-3"
          >
            Structure the HTML. Select a component contract. Refine the result.
          </h2>
          <p class="max-w-prose text-lg mt-0 mb-8">
            Dragonglass keeps the structure, component choice, and visual
            adjustments visible in your markup.
          </p>
          <div class="grid grid-gutters">
            {mentalModel.map(([title, body]) => (
              <div class="md:w-4/12">
                <h3 class="text-lg font-semibold mt-0 mb-2">{title}</h3>
                <p class="mt-0 mb-4">{body}</p>
              </div>
            ))}
          </div>
          <div class="grid grid-gutters mt-4 mb-0">
            {frameworkSummary.map((item) => (
              <span class="md:w-4/12 font-semibold mb-2">{item} </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="quick-start"
        class="bg-white pt-12 pb-12"
        aria-labelledby="quick-start-title"
      >
        <div class="container pl-4 pr-4">
          <div class="grid grid-gutters">
            <div class="md:w-4/12">
              <h2
                id="quick-start-title"
                class="text-3xl font-semibold leading-tight mt-0 mb-3"
              >
                Install Dragonglass and build your first card
              </h2>
              <p class="text-lg mt-0 mb-4">
                Install the package, import Dragonglass and one theme, then add
                semantic HTML.
              </p>
              <p class="mt-0 mb-4">
                Import the theme after <code>dragonglass.css</code> so it can
                provide the color tokens.
              </p>
            </div>
            <div class="md:w-8/12">
              <figure>
                <figcaption class="text-lg font-semibold mt-0 mb-2">
                  Step 1: Install the package
                </figcaption>
                <CodeExample code={installCode} />
              </figure>
              <figure>
                <figcaption class="text-lg font-semibold mt-0 mb-2">
                  Step 2: Import Dragonglass and a theme
                </figcaption>
                <CodeExample code={importCode} />
              </figure>
              <figure>
                <figcaption class="text-lg font-semibold mt-0 mb-2">
                  Step 3: Add your first card
                </figcaption>
                <CodeExample code={firstSurfaceCode} />
              </figure>
              <p class="mt-0 mb-4">
                Dragonglass styles the semantic regions and applies the card
                contract through data-card.
              </p>
              <p class="mt-0 mb-4">
                <a data-button class="bg-primary p-4" href={pathFor("Cards")}>
                  Explore card variants
                </a>
              </p>
              <p class="mt-0 mb-0">
                <a data-link="standalone" href={pathFor("AppComponents")}>
                  Browse all components
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="bg-default-lightest text-black pt-12 pb-12"
        aria-labelledby="components-title"
      >
        <div class="container pl-4 pr-4">
          <h2
            id="components-title"
            class="max-w-prose text-3xl font-semibold leading-tight mt-0 mb-3"
          >
            Find components by what the interface needs to do
          </h2>
          <p class="max-w-prose text-lg mt-0 mb-8">
            Component guides show the available markup, variants, and states.
          </p>
          <div class="grid grid-gutters">
            {componentCategories.map(([title, body]) => (
              <div class="md:w-6/12">
                <h3 class="text-lg font-semibold mt-0 mb-2">{title}</h3>
                <p class="mt-0 mb-5">{body}</p>
              </div>
            ))}
          </div>
          <p class="max-w-prose mt-3 mb-4">
            Use utilities for focused changes to spacing, layout, typography,
            color, borders, and elevation.
          </p>
          <p class="mt-0 mb-0">
            <a
              data-button
              class="bg-primary p-4 mr-2 mb-2"
              href={pathFor("AppComponents")}
            >
              Browse all components
            </a>
            <a
              data-link="standalone"
              class="p-3 mb-2"
              href={pathFor("Utilities")}
            >
              Open the utility reference
            </a>
          </p>
        </div>
      </section>

      <section
        class="bg-default-darkest text-white pt-12 pb-12"
        aria-labelledby="themes-title"
      >
        <div class="container pl-4 pr-4">
          <div class="grid grid-gutters">
            <div class="md:w-4/12">
              <h2
                id="themes-title"
                class="text-3xl font-semibold leading-tight mt-0 mb-3"
              >
                Change the theme. Keep the component markup
              </h2>
              <p class="mt-0 mb-5">
                Dragonglass includes twelve compiled themes built on the same
                semantic token contract. Each theme supports light and dark
                color schemes while the component markup stays unchanged.
              </p>
              <p class="mt-0 mb-6">
                <a data-button class="bg-primary p-4" href={pathFor("Colors")}>
                  Explore themes and colors
                </a>
              </p>
            </div>
            <div class="md:w-8/12">
              <ul
                data-list
                class="grid grid-gutters mt-0 mb-6"
                aria-label="Bundled themes"
              >
                {bundledThemes.map((theme) => (
                  <li class="w-1/2 md:w-1/4 mb-3">
                    <span
                      class="h-8 border border-white mb-2 w-1/2"
                      style={`display: block; background-color: ${theme.primary}`}
                      aria-hidden="true"
                    ></span>
                    <span class="w-1/2">{theme.label}</span>
                  </li>
                ))}
              </ul>
              <figure>
                <figcaption class="text-lg font-semibold mt-0 mb-2">
                  Compile a custom theme
                </figcaption>
                <div class="text-black">
                  <CodeExample code={customThemeCode} />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section
        class="bg-white pt-12 pb-12"
        aria-labelledby="documentation-title"
      >
        <div class="container pl-4 pr-4">
          <h2
            id="documentation-title"
            class="max-w-prose text-3xl font-semibold leading-tight mt-0 mb-3"
          >
            Choose where to continue
          </h2>
          <p class="max-w-prose text-lg mt-0 mb-8">
            Go directly to the part of Dragonglass you need next.
          </p>
          <div class="grid grid-gutters">
            {documentationPaths.map(({ title, body, href }, index) => (
              <article class="md:w-6/12 mb-6">
                <h3
                  class={`${index < 2 ? "text-xl" : "text-lg"} font-semibold mt-0 mb-2`}
                >
                  <a data-button class="bg-default p-3" href={href}>
                    {title}
                  </a>
                </h3>
                <p class="max-w-prose mt-0 mb-0">{body}</p>
              </article>
            ))}
          </div>

          <hr class="mt-4 mb-6" />
          <div class="max-w-prose">
            <h3 class="text-lg font-semibold mt-0 mb-2">Browser support</h3>
            <p class="mt-0 mb-0">
              Dragonglass supports Chrome 119+, Edge 119+, Firefox 121+, Safari
              16.5+, and iOS Safari 16.5+.
            </p>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
