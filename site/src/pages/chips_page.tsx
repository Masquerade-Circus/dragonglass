import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const chipExample = `<label data-chip="success">
  <input type="checkbox" checked /> Active
</label>`;

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
        Choose a button for an action, a link for navigation and a span for a
        read-only value so each chip keeps the correct native behavior.
      </p>
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
        Use semantic tones to reinforce a named state or category. Keep the text
        meaningful because color alone does not explain the value.
      </p>
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
            description:
              "Choose semantics that match an action, link, input or value.",
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
            description:
              "Apply the active chip appearance for supported semantics.",
          },
        ]}
      />
    </DemoSection>

    <DemoSection id="chips-accessibility-title" title="Accessibility">
      <p>
        Use a checkbox when a chip toggles a form value,{" "}
        <code>aria-pressed</code>
        for a toggle button and <code>aria-current="true"</code> only for the
        current link. Keep the visible label descriptive.
      </p>
    </DemoSection>

    <DemoSection id="chips-errors-title" title="Composition and common errors">
      <p>
        A plain <code>span</code> is display-only and must not receive click
        behavior. Do not set active styling without exposing the same state in
        the checkbox, button or link semantics.
      </p>
    </DemoSection>
  </DocPage>
);
