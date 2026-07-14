import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const statesCode = `<button type="button">Plain button</button>
<button type="button" disabled>Disabled button</button>
<button type="button" aria-disabled="true">ARIA-disabled button</button>`;

const tonesCode = `<button type="button" class="bg-primary">Primary</button>
<button type="button" class="bg-accent">Accent</button>
<button type="button" class="bg-info">Info</button>
<button type="button" class="bg-success">Success</button>
<button type="button" class="bg-warning">Warning</button>
<button type="button" class="bg-danger">Danger</button>
<button type="button" class="bg-default">Default</button>`;

const outlinesCode = `<button type="button" class="border-primary">Primary outline</button>
<button type="button" class="border-success-dark">Success outline</button>
<button type="button" class="border-danger-light">Danger outline</button>
<button
  type="button"
  class="bg-info focus:outline-2 focus:outline-offset-1 focus:outline-info-light"
>
  Visible focus outline
</button>`;

const sizesCode = `<button type="button" class="bg-primary text-2xs">Compact</button>
<button type="button" class="bg-primary text-base">Default</button>
<button type="button" class="bg-primary text-xl">Large</button>`;

const fabCode = `<button type="button" data-button="fab" class="bg-primary inline" aria-label="Add item">
  <i class="material-icons" aria-hidden="true">add</i>
</button>
<button
  type="button"
  data-button="fab no-shadow"
  class="bg-accent inline"
  aria-label="Edit item"
>
  <i class="material-icons" aria-hidden="true">edit</i>
</button>`;

const apiRows = [
  {
    name: "button",
    type: "Element",
    defaultValue: "Plain",
    description: "Receives the base button styling.",
  },
  {
    name: "disabled",
    type: "State",
    defaultValue: "Absent",
    description:
      "Applies unavailable opacity, cursor and pointer-event styles.",
  },
  {
    name: 'aria-disabled="true"',
    type: "State",
    defaultValue: "Absent",
    description: "Applies the same visual unavailable state as disabled.",
  },
  {
    name: 'data-button="fab"',
    type: "Attribute",
    defaultValue: "Absent",
    description:
      "Creates a circular floating action button with default elevation.",
  },
  {
    name: "no-shadow",
    type: "Attribute token",
    defaultValue: "Shadow",
    description:
      "Removes the default FAB elevation when included in data-button.",
  },
  {
    name: "bg-{tone}",
    type: "Class token",
    defaultValue: "Transparent",
    description:
      "Applies a semantic background tone such as primary, success or danger.",
  },
  {
    name: "border-{tone}{weight}",
    type: "Class token",
    defaultValue: "No border",
    description:
      "Creates an outlined treatment with an optional light or dark weight.",
  },
  {
    name: "text-{size}",
    type: "Class token",
    defaultValue: "Inherited",
    description: "Scales button text and the em-based button dimensions.",
  },
  {
    name: "--button-disabled-opacity",
    type: "Token",
    defaultValue: "Theme value",
    description: "Controls the visual emphasis of unavailable buttons.",
  },
];

export default () => (
  <DocPage page="Buttons">
    <DemoSection id="button-states" title="Plain and unavailable buttons">
      <button type="button">Plain button</button>
      <button type="button" disabled>
        Disabled button
      </button>
      <button type="button" aria-disabled="true">
        ARIA-disabled button
      </button>
      <CodeExample code={statesCode} />
    </DemoSection>

    <DemoSection id="button-tones" title="Semantic tones">
      <button type="button" class="bg-primary">
        Primary
      </button>
      <button type="button" class="bg-accent">
        Accent
      </button>
      <button type="button" class="bg-info">
        Info
      </button>
      <button type="button" class="bg-success">
        Success
      </button>
      <button type="button" class="bg-warning">
        Warning
      </button>
      <button type="button" class="bg-danger">
        Danger
      </button>
      <button type="button" class="bg-default">
        Default
      </button>
      <CodeExample code={tonesCode} />
    </DemoSection>

    <DemoSection id="button-outlines" title="Borders and focus outlines">
      <button type="button" class="border-primary">
        Primary outline
      </button>
      <button type="button" class="border-success-dark">
        Success outline
      </button>
      <button type="button" class="border-danger-light">
        Danger outline
      </button>
      <button
        type="button"
        class="bg-info focus:outline-2 focus:outline-offset-1 focus:outline-info-light"
      >
        Visible focus outline
      </button>
      <CodeExample code={outlinesCode} />
    </DemoSection>

    <DemoSection id="button-sizes" title="Sizes">
      <button type="button" class="bg-primary text-2xs">
        Compact
      </button>
      <button type="button" class="bg-primary text-base">
        Default
      </button>
      <button type="button" class="bg-primary text-xl">
        Large
      </button>
      <CodeExample code={sizesCode} />
    </DemoSection>

    <DemoSection id="button-fab" title="Floating actions">
      <button
        type="button"
        data-button="fab"
        class="bg-primary inline"
        aria-label="Add item"
      >
        <i class="material-icons" aria-hidden="true">
          add
        </i>
      </button>
      <button
        type="button"
        data-button="fab no-shadow"
        class="bg-accent inline"
        aria-label="Edit item"
      >
        <i class="material-icons" aria-hidden="true">
          edit
        </i>
      </button>
      <CodeExample code={fabCode} />
    </DemoSection>

    <DemoSection id="button-responsive" title="Responsive behavior">
      <p>
        Buttons keep their labels on one line. A surrounding toolbar wraps when
        space is limited. FAB dimensions scale with their text size.
      </p>
    </DemoSection>

    <DemoSection id="button-api" title="API">
      <ApiTable
        caption="Button elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
