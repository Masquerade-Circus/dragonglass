import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const appShellCode = `<article>
  <header>
    <h3>Project Atlas</h3>
    <nav data-toolbar aria-label="Project actions">
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

const standaloneToolbarCode = `<nav data-toolbar aria-label="Result actions">
  <button type="button">Filter</button>
  <a href="/exports.html">View exports</a>
</nav>`;

const apiRows = [
  {
    name: "main, article",
    type: "Element",
    defaultValue: "Column container",
    description:
      "Establishes the container contract for direct header, section and footer children.",
  },
  {
    name: "header, footer",
    type: "Element",
    defaultValue: "Intrinsic height",
    description:
      "Keeps page-level or container-level chrome outside the scrolling content region.",
  },
  {
    name: "section",
    type: "Element",
    defaultValue: "Flexible and scrollable",
    description:
      "Fills the remaining container space and owns content padding when it is a direct child.",
  },
  {
    name: "nav",
    type: "Element",
    defaultValue: "Horizontal row",
    description:
      "Applies a horizontal, non-wrapping layout to links and buttons.",
  },
  {
    name: "data-toolbar",
    type: "Attribute",
    defaultValue: "Absent",
    description:
      "Turns a nav into a wrapping action row. Toolbars inside a header or footer stay on one row.",
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
          <nav data-toolbar aria-label="Project actions">
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
      <nav data-toolbar aria-label="Result actions">
        <button type="button">Filter</button>
        <a href="/exports.html">View exports</a>
      </nav>
      <CodeExample code={standaloneToolbarCode} />
    </DemoSection>

    <DemoSection id="layout-composition" title="Composition">
      <p>
        A container is a <code>main</code> or <code>article</code> with direct
        <code> header</code>, <code>section</code> and <code>footer</code>
        children. The header and footer keep their natural height. The section
        receives the remaining height, padding and overflow.
      </p>
      <p>
        The <code>data-toolbar</code> attribute turns a nav into a wrapping row
        with toolbar spacing and a divider.
      </p>
    </DemoSection>

    <DemoSection id="layout-responsive" title="Responsive behavior">
      <p>
        Standalone toolbars wrap when their actions exceed the current width. A
        toolbar nested in a header or footer stays on one row and overflows when
        its actions exceed the available width. Content sections own vertical
        scrolling and keep the page shell within the viewport.
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
