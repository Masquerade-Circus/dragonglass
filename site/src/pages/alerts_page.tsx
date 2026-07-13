import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const alertExample = `<div data-alert="warning" role="alert">
  <strong>Review required.</strong>
  <p>The billing address has missing fields.</p>
</div>`;

const semanticAlertsExample = `<div data-alert="info" role="status">
  Your profile has unsaved changes.
</div>
<div data-alert="success" role="status">
  The invoice was paid successfully.
</div>
<div data-alert="warning" role="alert">
  Your storage is almost full.
</div>
<div data-alert="danger" role="alert">
  The payment method was rejected.
</div>`;

export default () => (
  <DocPage page="Alerts">
    <DemoSection id="alerts-tones-title" title="Semantic alerts">
      <p>
        Match the tone to the outcome, then choose status for routine updates or
        alert for urgent information that needs immediate attention.
      </p>
      <div data-alert="info" role="status">
        Your profile has unsaved changes.
      </div>
      <div data-alert="success" role="status">
        The invoice was paid successfully.
      </div>
      <div data-alert="warning" role="alert">
        Your storage is almost full.
      </div>
      <div data-alert="danger" role="alert">
        The payment method was rejected.
      </div>
      <CodeExample code={semanticAlertsExample} />
    </DemoSection>

    <DemoSection
      id="alerts-content-title"
      title="Alert with supporting content"
    >
      <div data-alert="warning" role="alert">
        <strong>Review required.</strong>
        <p>The billing address has missing fields.</p>
      </div>
      <CodeExample code={alertExample} />
    </DemoSection>

    <DemoSection id="alerts-api-title" title="API">
      <ApiTable
        caption="Alert elements, attributes, tokens and states"
        rows={[
          {
            name: "div",
            type: "Element",
            defaultValue: "Example container",
            description: "Provides a neutral container for the alert content.",
          },
          {
            name: "data-alert",
            type: "Attribute",
            defaultValue: "Primary",
            description: "Accepts info, success, warning or danger.",
          },
          {
            name: "role=status / role=alert",
            type: "Attribute",
            defaultValue: "None",
            description:
              "Selects polite status or urgent alert announcement behavior.",
          },
          {
            name: "--alert-color / --alert-bg",
            type: "Token",
            defaultValue: "Primary theme colors",
            description: "Set the accent border and alert background.",
          },
          {
            name: "info / success / warning / danger",
            type: "State",
            defaultValue: "Primary",
            description: "Maps the alert to a supported semantic tone.",
          },
        ]}
      />
    </DemoSection>

    <DemoSection id="alerts-accessibility-title" title="Accessibility">
      <p>
        Use <code>role="status"</code> for non-urgent updates and
        <code> role="alert"</code> for time-sensitive errors or warnings. Add a
        role when content appears dynamically, not merely to make static prose
        interrupt a screen reader.
      </p>
    </DemoSection>

    <DemoSection id="alerts-errors-title" title="Composition and common errors">
      <p>
        Apply <code>data-alert</code> to a suitable container. Put the outcome
        first, add recovery guidance when useful and never communicate severity
        by color alone.
      </p>
    </DemoSection>
  </DocPage>
);
