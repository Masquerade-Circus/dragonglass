import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const alertExample = `<blockquote data-alert="warning" role="alert">
  <strong>Review required.</strong>
  <p>The billing address has missing fields.</p>
</blockquote>`;

const semanticAlertsExample = `<blockquote data-alert="info" role="status">
  Your profile has unsaved changes.
</blockquote>
<blockquote data-alert="success" role="status">
  The invoice was paid successfully.
</blockquote>
<blockquote data-alert="warning" role="alert">
  Your storage is almost full.
</blockquote>
<blockquote data-alert="danger" role="alert">
  The payment method was rejected.
</blockquote>`;

export default () => (
  <DocPage page="Alerts">
    <DemoSection id="alerts-tones-title" title="Semantic alerts">
      <p>
        Match the tone to the outcome, then choose status for routine updates or
        alert for urgent information that needs immediate attention.
      </p>
      <blockquote data-alert="info" role="status">
        Your profile has unsaved changes.
      </blockquote>
      <blockquote data-alert="success" role="status">
        The invoice was paid successfully.
      </blockquote>
      <blockquote data-alert="warning" role="alert">
        Your storage is almost full.
      </blockquote>
      <blockquote data-alert="danger" role="alert">
        The payment method was rejected.
      </blockquote>
      <CodeExample code={semanticAlertsExample} />
    </DemoSection>

    <DemoSection
      id="alerts-content-title"
      title="Alert with supporting content"
    >
      <blockquote data-alert="warning" role="alert">
        <strong>Review required.</strong>
        <p>The billing address has missing fields.</p>
      </blockquote>
      <CodeExample code={alertExample} />
    </DemoSection>

    <DemoSection id="alerts-api-title" title="API">
      <ApiTable
        caption="Alert elements, attributes, tokens and states"
        rows={[
          {
            name: "blockquote",
            type: "Element",
            defaultValue: "Required",
            description: "The current styled alert element.",
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
        Keep the real <code>blockquote[data-alert]</code> contract. Put the
        outcome first, add recovery guidance when useful and never communicate
        severity by color alone.
      </p>
    </DemoSection>
  </DocPage>
);
