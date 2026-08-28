import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const toolbarExample = `<nav aria-label="Editor actions">
  <button type="button">Save</button>
  <button type="button">Preview</button>
  <a href="/dragonglass/cards.html">Cards</a>
</nav>`;

const filterToolbarExample = `<nav aria-label="Issue filters">
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
  <nav aria-label="Project actions">
    <button type="button">Share</button>
    <button type="button">Export</button>
  </nav>
</header>
<footer>
  <nav aria-label="Form actions">
    <button type="button">Cancel</button>
    <button type="submit">Save changes</button>
  </nav>
</footer>`;

export default () => (
  <DocPage page="Toolbars">
    <DemoSection id="toolbar-actions-title" title="Actions and links">
      <p>
        Every <code>nav</code> provides a wrapping action row. Direct links and
        buttons share the same height, spacing, alignment, hover treatment and
        current-page state. Give each navigation region an accessible name, as
        these examples do with <code>aria-label</code>.
      </p>
      <nav aria-label="Editor actions">
        <button type="button">Save</button>
        <button type="button">Preview</button>
        <a href="/dragonglass/cards.html" v-route="/dragonglass/cards.html">
          Cards
        </a>
      </nav>
      <CodeExample code={toolbarExample} />
    </DemoSection>

    <DemoSection id="toolbar-chips-title" title="Filter chips">
      <nav aria-label="Issue filters">
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
        <code> flex-wrap: nowrap</code>, removes its padding and divider, and
        overflows when its actions exceed the available width.
      </p>
      <header>
        <h3>Project settings</h3>
        <nav aria-label="Project actions">
          <button type="button">Share</button>
          <button type="button">Export</button>
        </nav>
      </header>
      <footer>
        <nav aria-label="Form actions">
          <button type="button">Cancel</button>
          <button type="submit">Save changes</button>
        </nav>
      </footer>
      <CodeExample code={containerToolbarsExample} />
    </DemoSection>

    <DemoSection id="toolbar-api-title" title="API">
      <ApiTable
        caption="Toolbar elements, tokens, contexts and overrides"
        rows={[
          {
            name: "nav",
            type: "Element",
            defaultValue: "Required",
            description:
              "Creates a wrapping action row with shared geometry and states for direct links and buttons.",
          },
          {
            name: "--spacing-2 / --spacing-3",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the gap and default toolbar padding.",
          },
          {
            name: "--border-size-1 / --border-default",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the toolbar divider.",
          },
          {
            name: "header or footer ancestor",
            type: "State",
            defaultValue: "Wrapping",
            description:
              "Prevents wrapping and removes the nav padding and divider.",
          },
          {
            name: "Specialized nav component",
            type: "Override",
            defaultValue: "Base nav presentation",
            description:
              "Replaces the base presentation where a component such as breadcrumbs defines its own geometry and states.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
