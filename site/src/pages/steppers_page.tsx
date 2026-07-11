import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const stepperExample = `<ol data-stepper>
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>`;

const stepperErrorExample = `<ol data-stepper>
  <li data-step="done">Profile</li>
  <li data-step="error" aria-current="step">Payment</li>
  <li>Receipt</li>
</ol>`;

const stepperLayoutsExample = `<ol data-stepper="vertical">
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>
<ol data-stepper="numbers" aria-label="Checkout progress">
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Receipt</li>
</ol>`;

export default () => (
  <DocPage page="Steppers">
    <DemoSection id="stepper-basic-title" title="Current and completed steps">
      <ol data-stepper>
        <li data-step="done">Account</li>
        <li aria-current="step">Billing</li>
        <li>Confirm</li>
      </ol>
      <CodeExample code={stepperExample} />
    </DemoSection>

    <DemoSection id="stepper-error-title" title="Error state">
      <p>
        Set <code>data-step="error"</code> on the failed step and keep
        <code> aria-current="step"</code> when that step still requires the
        user's attention.
      </p>
      <ol data-stepper>
        <li data-step="done">Profile</li>
        <li data-step="error" aria-current="step">
          Payment
        </li>
        <li>Receipt</li>
      </ol>
      <CodeExample code={stepperErrorExample} />
    </DemoSection>

    <DemoSection
      id="stepper-layouts-title"
      title="Vertical and numbers-only layouts"
    >
      <p>
        Use the vertical layout when labels need more room. The numbers layout
        keeps the same text labels in the markup while CSS presents a compact
        sequence.
      </p>
      <ol data-stepper="vertical">
        <li data-step="done">Account</li>
        <li aria-current="step">Billing</li>
        <li>Confirm</li>
      </ol>
      <ol data-stepper="numbers" aria-label="Checkout progress">
        <li data-step="done">Account</li>
        <li aria-current="step">Billing</li>
        <li>Receipt</li>
      </ol>
      <CodeExample code={stepperLayoutsExample} />
    </DemoSection>

    <DemoSection id="stepper-api-title" title="API">
      <ApiTable
        caption="Stepper elements, attributes, tokens and states"
        rows={[
          {
            name: "ol / li",
            type: "Element",
            defaultValue: "Required",
            description: "Represent the ordered process and each step.",
          },
          {
            name: "data-stepper",
            type: "Attribute",
            defaultValue: "Horizontal",
            description: "Accepts vertical or numbers layout tokens.",
          },
          {
            name: "aria-current=step",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Identifies the single current step.",
          },
          {
            name: "data-step=done / error",
            type: "Attribute / state",
            defaultValue: "Upcoming",
            description: "Marks completed or failed steps.",
          },
          {
            name: "--primary / --success / --danger",
            type: "Token",
            defaultValue: "Theme",
            description: "Color current, completed and failed states.",
          },
        ]}
      />
    </DemoSection>

    <DemoSection id="stepper-accessibility-title" title="Accessibility">
      <p>
        Preserve the ordered list and set <code>aria-current="step"</code> on
        exactly one item. Keep text labels in numbers-only layouts because CSS
        hides them visually while assistive technology can still announce them.
      </p>
    </DemoSection>

    <DemoSection
      id="stepper-errors-title"
      title="Composition and common errors"
    >
      <p>
        Use <code>data-step</code> only for <code>done</code> and
        <code> error</code>. Do not mark every completed step as current, and do
        not remove labels to create a visual-only numbered sequence.
      </p>
    </DemoSection>
  </DocPage>
);
