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
            name: "--card-radius / --default-light",
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
        ]}
      />
    </DemoSection>
  </DocPage>
);
