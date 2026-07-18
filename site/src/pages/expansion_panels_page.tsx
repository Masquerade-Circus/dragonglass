import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const expansionExample = `<details data-expansion-panel open>
  <summary>Account status</summary>
  <p>Your account is active.</p>
</details>`;

const expansionFormExample = `<details data-expansion-panel open>
  <summary>Contact details</summary>
  <form>
    <label for="contact-email">Email</label>
    <input id="contact-email" type="email" name="email">
    <button type="submit">Save</button>
  </form>
</details>`;

const expansionPanelColorExample = `<details class="bg-primary" data-expansion-panel open>
  <summary>Deployment status</summary>
  <p>The latest release is available.</p>
</details>`;

const expansionSummaryColorExample = `<details data-expansion-panel open>
  <summary class="bg-accent">Security settings</summary>
  <p>Two-factor authentication is active.</p>
</details>`;

export default () => (
  <DocPage page="ExpansionPanels">
    <DemoSection id="expansion-basic-title" title="Collapsed and open panels">
      <details data-expansion-panel>
        <summary>Billing details</summary>
        <p>Your plan renews next month.</p>
      </details>
      <details data-expansion-panel open>
        <summary>Account status</summary>
        <p>Your account is active.</p>
      </details>
      <CodeExample code={expansionExample} />
    </DemoSection>

    <DemoSection id="expansion-form-title" title="Panel with form content">
      <details data-expansion-panel open>
        <summary>Contact details</summary>
        <form>
          <label for="contact-email">Email</label>
          <input id="contact-email" type="email" name="email" />
          <button type="submit">Save</button>
        </form>
      </details>
      <CodeExample code={expansionFormExample} />
    </DemoSection>

    <DemoSection id="expansion-panel-color-title" title="Colored panel">
      <p>
        Apply a <code>bg-*</code> utility to <code>details</code> to color the
        complete panel, including its heading and content.
      </p>
      <details class="bg-primary" data-expansion-panel open>
        <summary>Deployment status</summary>
        <p>The latest release is available.</p>
      </details>
      <CodeExample code={expansionPanelColorExample} />
    </DemoSection>

    <DemoSection id="expansion-summary-color-title" title="Colored heading">
      <p>
        Apply a <code>bg-*</code> utility to <code>summary</code> when only the
        panel heading needs a distinct color.
      </p>
      <details data-expansion-panel open>
        <summary class="bg-accent">Security settings</summary>
        <p>Two-factor authentication is active.</p>
      </details>
      <CodeExample code={expansionSummaryColorExample} />
    </DemoSection>

    <DemoSection id="expansion-behavior-title" title="Behavior and fallback">
      <p>
        The native <code>details</code> element controls disclosure state. The
        open summary keeps a stable bottom border while its generated marker
        rotates. When a user requests reduced motion, the marker and summary
        change state without a transition. Content and keyboard operation do not
        depend on the animation.
      </p>
    </DemoSection>

    <DemoSection id="expansion-api-title" title="API">
      <ApiTable
        caption="Expansion panel elements, attributes, tokens and states"
        rows={[
          {
            name: "details / summary",
            type: "Element",
            defaultValue: "Required",
            description:
              "Matches details[data-expansion-panel] and its direct summary.",
          },
          {
            name: "data-expansion-panel",
            type: "Attribute",
            defaultValue: "Required",
            description: "Applies the full-width expansion panel treatment.",
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Rotates the generated disclosure marker.",
          },
          {
            name: "--card-radius / --border-default",
            type: "Token",
            defaultValue: "Theme",
            description: "Control panel corners and border color.",
          },
          {
            name: "--spacing-3 / --spacing-4",
            type: "Token",
            defaultValue: "Theme",
            description: "Control summary and content spacing.",
          },
          {
            name: "--motion-duration-fast / --motion-easing-standard",
            type: "Motion token",
            defaultValue: "120ms / ease-in-out",
            description:
              "Control the marker, border and summary state transitions.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
