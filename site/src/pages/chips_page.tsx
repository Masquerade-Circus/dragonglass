import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const chipExample = `<p>
  <label data-chip="success">
    <input type="checkbox" checked /> Active
  </label>
  <button data-chip type="button" aria-pressed="true">Pinned</button>
  <a data-chip href="/dragonglass/chips.html" aria-current="true">Chips</a>
</p>`;

const chipElementsExample = `<p>
  <button data-chip type="button">Action</button>
  <a data-chip href="/dragonglass/forms.html">Forms</a>
  <span data-chip>Read only</span>
</p>`;

const chipTonesExample = `<p>
  <span data-chip="primary">Primary</span>
  <span data-chip="accent">Accent</span>
  <span data-chip="success">Passed</span>
  <span data-chip="info">Queued</span>
  <span data-chip="warning">Review</span>
  <span data-chip="danger">Blocked</span>
  <span data-chip="default">Default</span>
</p>`;

export default () => (
  <DocPage page="Chips">
    <DemoSection id="chips-elements-title" title="Actions, links and values">
      <p>
        <button data-chip type="button">
          Action
        </button>{" "}
        <a data-chip href="/dragonglass/forms.html">
          Forms
        </a>{" "}
        <span data-chip>Read only</span>
      </p>
      <CodeExample code={chipElementsExample} />
    </DemoSection>

    <DemoSection id="chips-tones-title" title="Semantic tones">
      <p>
        <span data-chip="primary">Primary</span>{" "}
        <span data-chip="accent">Accent</span>{" "}
        <span data-chip="success">Passed</span>{" "}
        <span data-chip="info">Queued</span>{" "}
        <span data-chip="warning">Review</span>{" "}
        <span data-chip="danger">Blocked</span>{" "}
        <span data-chip="default">Default</span>
      </p>
      <CodeExample code={chipTonesExample} />
    </DemoSection>

    <DemoSection id="chips-states-title" title="Selection states">
      <p>
        <label data-chip="success">
          <input type="checkbox" checked /> Active
        </label>{" "}
        <button data-chip type="button" aria-pressed="true">
          Pinned
        </button>{" "}
        <a data-chip href="/dragonglass/chips.html" aria-current="true">
          Chips
        </a>
      </p>
      <CodeExample code={chipExample} />
    </DemoSection>

    <DemoSection id="chips-api-title" title="API">
      <ApiTable
        caption="Chip elements, attributes, tokens and states"
        rows={[
          {
            name: "button / a / label / span",
            type: "Element",
            defaultValue: "Contextual",
            description: "Receives chip styling from data-chip.",
          },
          {
            name: "data-chip",
            type: "Attribute",
            defaultValue: "Required",
            description:
              "Accepts primary, accent, success, info, warning, danger or default.",
          },
          {
            name: "--chip-border / --chip-background / --chip-text",
            type: "Token",
            defaultValue: "Theme",
            description: "Set the resting border, background and text colors.",
          },
          {
            name: "--chip-active / --chip-active-text",
            type: "Token",
            defaultValue: "Theme",
            description: "Set selected and pressed colors.",
          },
          {
            name: "input:checked / aria-pressed=true / aria-current=true",
            type: "State",
            defaultValue: "False",
            description: "Selects the active chip appearance.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
