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
            name: "data-alert",
            type: "Attribute",
            defaultValue: "Primary",
            description: "Accepts info, success, warning or danger.",
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
  </DocPage>
);
