import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const toolbarExample = `<nav data-toolbar aria-label="Editor actions">
  <button type="button">Save</button>
  <button type="button">Preview</button>
  <a href="/dragonglass/cards.html">Cards</a>
</nav>`;

const filterToolbarExample = `<nav data-toolbar aria-label="Issue filters">
  <label data-chip>
    <input type="checkbox" checked> Open
  </label>
  <label data-chip>
    <input type="checkbox"> Assigned
  </label>
  <button type="button">Apply</button>
</nav>`;

const containerToolbarsExample = `<header>
  <h3>Project settings</h3>
  <nav data-toolbar aria-label="Project actions">
    <button type="button">Share</button>
    <button type="button">Export</button>
  </nav>
</header>
<footer>
  <nav data-toolbar aria-label="Form actions">
    <button type="button">Cancel</button>
    <button type="submit">Save changes</button>
  </nav>
</footer>`;

export default () => (
  <DocPage page="Toolbars">
    <DemoSection id="toolbar-actions-title" title="Actions and links">
      <nav data-toolbar aria-label="Editor actions">
        <button type="button">Save</button>
        <button type="button">Preview</button>
        <a href="/dragonglass/cards.html" v-route="/dragonglass/cards.html">
          Cards
        </a>
      </nav>
      <CodeExample code={toolbarExample} />
    </DemoSection>

    <DemoSection id="toolbar-chips-title" title="Filter chips">
      <nav data-toolbar aria-label="Issue filters">
        <label data-chip>
          <input type="checkbox" checked /> Open
        </label>
        <label data-chip>
          <input type="checkbox" /> Assigned
        </label>
        <button type="button">Apply</button>
      </nav>
      <CodeExample code={filterToolbarExample} />
    </DemoSection>

    <DemoSection
      id="toolbar-containers-title"
      title="Header and footer toolbars"
    >
      <p>
        A toolbar wraps by default. Inside a header or footer it uses
        <code> flex-wrap: nowrap</code> and overflows when its actions exceed
        the available width.
      </p>
      <header>
        <h3>Project settings</h3>
        <nav data-toolbar aria-label="Project actions">
          <button type="button">Share</button>
          <button type="button">Export</button>
        </nav>
      </header>
      <footer>
        <nav data-toolbar aria-label="Form actions">
          <button type="button">Cancel</button>
          <button type="submit">Save changes</button>
        </nav>
      </footer>
      <CodeExample code={containerToolbarsExample} />
    </DemoSection>

    <DemoSection id="toolbar-api-title" title="API">
      <ApiTable
        caption="Toolbar elements, attributes, tokens and states"
        rows={[
          {
            name: "nav",
            type: "Element",
            defaultValue: "Required",
            description: "Provides the nav[data-toolbar] selector host.",
          },
          {
            name: "data-toolbar",
            type: "Attribute",
            defaultValue: "Required",
            description: "Applies the flexible toolbar layout to a nav.",
          },
          {
            name: "--spacing-2 / --spacing-3",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the gap and default toolbar padding.",
          },
          {
            name: "--border-size-1 / --default-light",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the toolbar divider.",
          },
          {
            name: "header or footer ancestor",
            type: "State",
            defaultValue: "Wrapping",
            description: "Removes padding and divider and prevents wrapping.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
