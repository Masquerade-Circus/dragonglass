import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const appShellCode = `<article>
  <header>
    <h3>Project Atlas</h3>
    <nav aria-label="Project actions">
      <a href="/projects.html">All projects</a>
      <button type="button">New task</button>
    </nav>
  </header>
  <section>
    <p>Track the work that is ready for review.</p>
  </section>
  <footer>
    <nav aria-label="Project sections">
      <a href="/overview.html" aria-current="page">Overview</a>
      <a href="/activity.html">Activity</a>
      <a href="/reports.html">Reports</a>
    </nav>
  </footer>
</article>`;

const sharedLayoutCode = `<div data-layout class="h-48">
  <header>
    <h3>Review queue</h3>
  </header>
  <section>
    <p>Items that are ready for review appear here.</p>
  </section>
  <footer>
    <nav aria-label="Queue actions">
      <button type="button">Refresh queue</button>
    </nav>
  </footer>
</div>`;

const standaloneToolbarCode = `<nav aria-label="Result actions">
  <button type="button">Filter</button>
  <a href="/exports.html">View exports</a>
</nav>`;

const apiRows = [
  {
    name: "body, main, article, dialog, [data-card]",
    type: "Element or selector",
    defaultValue: "Column container",
    description:
      "Applies the shared vertical layout contract to direct children.",
  },
  {
    name: "data-layout",
    type: "Attribute",
    defaultValue: "Absent",
    description:
      "Applies the shared vertical layout contract to another element.",
  },
  {
    name: "header, footer",
    type: "Element",
    defaultValue: "1rem padding, 3.5rem minimum height",
    description:
      "Keeps direct container chrome at its natural height and outside the scrolling content region.",
  },
  {
    name: "section",
    type: "Element",
    defaultValue: "Flexible and scrollable",
    description:
      "Fills the remaining container space and owns content padding when it is a direct child.",
  },
  {
    name: ".p-0",
    type: "Utility",
    defaultValue: "Absent",
    description: "Removes the default padding from a direct content section.",
  },
  {
    name: "nav",
    type: "Element",
    defaultValue: "Wrapping action row",
    description:
      "Lays out direct links and buttons with shared geometry and interactive states. Inside a header or footer, the row does not wrap and has no padding or divider.",
  },
  {
    name: 'aria-current="page"',
    type: "State",
    defaultValue: "Absent",
    description: "Applies the selected surface and text colors to a nav link.",
  },
  {
    name: "--container-padding",
    type: "Token",
    defaultValue: "Theme value",
    description: "Controls padding on the direct, scrollable content section.",
  },
];

export default () => (
  <DocPage page="Layouts">
    <DemoSection id="layout-shell" title="Application shell">
      <article>
        <header>
          <h3>Project Atlas</h3>
          <nav aria-label="Project actions">
            <a href="/projects.html">All projects</a>
            <button type="button">New task</button>
          </nav>
        </header>
        <section>
          <p>Track the work that is ready for review.</p>
        </section>
        <footer>
          <nav aria-label="Project sections">
            <a href="/overview.html" aria-current="page">
              Overview
            </a>
            <a href="/activity.html">Activity</a>
            <a href="/reports.html">Reports</a>
          </nav>
        </footer>
      </article>
      <CodeExample code={appShellCode} />
    </DemoSection>

    <DemoSection id="layout-toolbar" title="Standalone toolbar">
      <nav aria-label="Result actions">
        <button type="button">Filter</button>
        <a href="/exports.html">View exports</a>
      </nav>
      <CodeExample code={standaloneToolbarCode} />
    </DemoSection>

    <DemoSection id="layout-composition" title="Shared container contract">
      <p>
        <code>body</code>, <code>main</code>, <code>article</code>,{" "}
        <code>dialog</code>, <code>[data-card]</code> and{" "}
        <code>[data-layout]</code> share one structural contract. Each container
        creates a vertical flex layout, hides its own overflow and lets its
        direct children use the available space.
      </p>
      <p>
        A direct <code>section</code> fills the remaining space and owns the
        scroll when the container has a limited height. It receives{" "}
        <code>var(--container-padding)</code> by default. Add <code>.p-0</code>{" "}
        to that section when its content must reach the container edges.
      </p>
      <p>
        Direct <code>header</code> and <code>footer</code> regions remain
        outside the scrolling section. They use their natural height,{" "}
        <code>1rem</code> padding and a minimum height of <code>3.5rem</code>. A
        navigation region directly inside the footer has no outer margin.
      </p>
      <div data-layout class="h-48">
        <header>
          <h3>Review queue</h3>
        </header>
        <section>
          <p>Items that are ready for review appear here.</p>
        </section>
        <footer>
          <nav aria-label="Queue actions">
            <button type="button">Refresh queue</button>
          </nav>
        </footer>
      </div>
      <CodeExample code={sharedLayoutCode} />
    </DemoSection>

    <DemoSection id="layout-responsive" title="Responsive behavior">
      <p>
        A standalone <code>nav</code> wraps when its actions exceed the current
        width. Inside a header or footer, it stays on one row, removes its
        padding and divider, and overflows when its actions exceed the available
        width. Specialized navigation components, including breadcrumbs, replace
        the base presentation where their contract requires it. Content sections
        own vertical scrolling and keep the page shell within the viewport.
      </p>
    </DemoSection>

    <DemoSection id="layout-api" title="API">
      <ApiTable
        caption="Layout elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
