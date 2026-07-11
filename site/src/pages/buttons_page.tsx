import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const statesCode = `<button type="button">Plain button</button>
<button type="button" disabled>Disabled button</button>
<button type="button" aria-disabled="true">Unavailable but focusable</button>`;

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
    description:
      "Provides native button semantics, keyboard behavior and styling.",
  },
  {
    name: "disabled",
    type: "State",
    defaultValue: "Absent",
    description:
      "Removes a native button from interaction and sequential focus.",
  },
  {
    name: 'aria-disabled="true"',
    type: "State",
    defaultValue: "Absent",
    description:
      "Announces an unavailable action while retaining focus. Application code must prevent activation.",
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
        Unavailable but focusable
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

    <DemoSection id="button-composition" title="Composition">
      <p>
        Start with a native <code>button</code>. Add one background or border
        utility for emphasis, then a text-size utility only when the surrounding
        interface needs a different scale. Reserve a FAB for the primary action
        associated with the current view.
      </p>
    </DemoSection>

    <DemoSection id="button-responsive" title="Responsive behavior">
      <p>
        Buttons keep their labels on one line. Let a surrounding toolbar wrap
        when space is limited, and keep action labels concise instead of
        shrinking tap targets. FAB dimensions scale with their text size.
      </p>
    </DemoSection>

    <DemoSection id="button-accessibility" title="Accessibility">
      <p>
        Use visible text for ordinary actions. Every icon-only button needs an
        <code> aria-label</code>, and its icon must use
        <code> aria-hidden="true"</code>. Prefer <code>disabled</code> when the
        action should leave the focus order. Use <code>aria-disabled</code> only
        when people still need to discover the action, and suppress activation
        in application logic.
      </p>
    </DemoSection>

    <DemoSection id="button-errors" title="Common mistakes">
      <ul>
        <li>
          Removing the focus outline without a visible replacement makes
          keyboard position impossible to track.
        </li>
        <li>
          Using <code>aria-disabled</code> alone does not prevent activation in
          the browser.
        </li>
        <li>
          Applying multiple tone classes creates an order-dependent result and
          obscures the intended emphasis.
        </li>
        <li>
          Repeating FABs for secondary actions weakens the single prominent
          action pattern.
        </li>
      </ul>
    </DemoSection>

    <DemoSection id="button-api" title="API">
      <ApiTable
        caption="Button elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
