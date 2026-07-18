import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const linksCode = `<nav data-breadcrumb aria-label="Breadcrumb">
  <a href="/dragonglass/app-components.html">Components</a>
  <a href="/dragonglass/layout.html">Foundations</a>
  <a href="/dragonglass/breadcrumbs.html" aria-current="page">Breadcrumbs</a>
</nav>`;

const mixedCode = `<nav data-breadcrumb aria-label="File location">
  <button type="button">Workspace</button>
  <a href="/dragonglass">Documents</a>
  <button type="button" aria-current="page">Quarterly report</button>
</nav>`;

const apiRows = [
  {
    name: "nav[data-breadcrumb]",
    type: "Element and attribute",
    defaultValue: "Required",
    description:
      "Creates a wrapping breadcrumb trail with separators between segments.",
  },
  {
    name: "Direct a child",
    type: "Supported child",
    defaultValue: "None",
    description: "Navigates to a location in the breadcrumb hierarchy.",
  },
  {
    name: "Direct button child",
    type: "Supported child",
    defaultValue: "None",
    description:
      "Runs an in-page location action without adding a wrapper or list element.",
  },
  {
    name: 'aria-current="page"',
    type: "State",
    defaultValue: "Absent",
    description: "Identifies the current breadcrumb segment.",
  },
  {
    name: "Child structure",
    type: "Contract",
    defaultValue: "Direct children only",
    description:
      "Supports only anchors and buttons directly inside the nav, with no lists or wrappers.",
  },
];

export default () => (
  <DocPage page="Breadcrumbs">
    <DemoSection id="breadcrumb-links" title="Linked trail">
      <p>
        Add <code>data-breadcrumb</code> to a labeled <code>nav</code>. Place
        each anchor directly inside the nav and mark the current location with
        <code> aria-current=&quot;page&quot;</code>.
      </p>
      <nav data-breadcrumb aria-label="Breadcrumb">
        <a href="/dragonglass/app-components.html">Components</a>
        <a href="/dragonglass/layout.html">Foundations</a>
        <a href="/dragonglass/breadcrumbs.html" aria-current="page">
          Breadcrumbs
        </a>
      </nav>
      <CodeExample code={linksCode} />
    </DemoSection>

    <DemoSection id="breadcrumb-actions" title="Links and actions">
      <p>
        A breadcrumb combines anchors and buttons as direct children of the
        breadcrumb nav.
      </p>
      <nav data-breadcrumb aria-label="File location">
        <button type="button">Workspace</button>
        <a href="/dragonglass">Documents</a>
        <button type="button" aria-current="page">
          Quarterly report
        </button>
      </nav>
      <CodeExample code={mixedCode} />
    </DemoSection>

    <DemoSection id="breadcrumb-api" title="API">
      <p>
        The host supports only direct <code>a</code> and <code>button</code>
        children. Separators are visual chevrons, so source markup contains no
        generated separator text.
      </p>
      <ApiTable
        caption="Breadcrumb elements, child contract and current state"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
