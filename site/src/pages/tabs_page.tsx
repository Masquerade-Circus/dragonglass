import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const tabsExample = `<section data-tabs>
  <details name="account-tabs" open>
    <summary>Overview</summary>
    <p>Account summary.</p>
  </details>
  <details name="account-tabs">
    <summary>Billing</summary>
    <p>Billing details.</p>
  </details>
</section>`;

const richTabsExample = `<section data-tabs>
  <details name="settings-tabs" open>
    <summary>Profile</summary>
    <p>Ada Lovelace</p>
  </details>
  <details name="settings-tabs">
    <summary>Contact</summary>
    <label for="tabs-email">Email</label>
    <input id="tabs-email" type="email" name="email">
  </details>
  <details name="settings-tabs">
    <summary>Security</summary>
    <p>Review sign-in settings.</p>
  </details>
</section>`;

export default () => (
  <DocPage page="Tabs">
    <DemoSection id="tabs-basic-title" title="Native grouped disclosures">
      <section data-tabs>
        <details name="account-tabs" open>
          <summary>Overview</summary>
          <p>Account summary.</p>
        </details>
        <details name="account-tabs">
          <summary>Billing</summary>
          <p>Billing details.</p>
        </details>
      </section>
      <CodeExample code={tabsExample} />
    </DemoSection>

    <DemoSection id="tabs-content-title" title="Rich panel content">
      <section data-tabs>
        <details name="settings-tabs" open>
          <summary>Profile</summary>
          <p>Ada Lovelace</p>
        </details>
        <details name="settings-tabs">
          <summary>Contact</summary>
          <label for="tabs-email">Email</label>
          <input id="tabs-email" type="email" name="email" />
        </details>
        <details name="settings-tabs">
          <summary>Security</summary>
          <p>Review sign-in settings.</p>
        </details>
      </section>
      <CodeExample code={richTabsExample} />
    </DemoSection>

    <DemoSection id="tabs-fallback-title" title="Layout fallback">
      <p>
        Browsers that support <code>sibling-count()</code>,
        <code>sibling-index()</code>, and <code>::details-content</code> place
        the summaries in one tab row and align the open panel below them. Other
        baseline browsers keep the same markup as stacked native disclosures.
        The fallback preserves content and keyboard operation. It does not
        promise the enhanced tab-row layout or exclusive disclosure behavior.
      </p>
      <p>
        When a user requests reduced motion, summary color and border state
        changes occur without a transition.
      </p>
    </DemoSection>

    <DemoSection id="tabs-api-title" title="API">
      <ApiTable
        caption="Tab disclosure elements, attributes, tokens and states"
        rows={[
          {
            name: "section / details / summary",
            type: "Element",
            defaultValue: "Required",
            description:
              "Matches direct details children and their direct summaries.",
          },
          {
            name: "data-tabs",
            type: "Attribute",
            defaultValue: "Required",
            description:
              "Aligns grouped details controls and places the open content below.",
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Applies the active summary color and border.",
          },
          {
            name: "--primary / --default-light / --spacing-4",
            type: "Token",
            defaultValue: "Theme",
            description:
              "Control the active marker, divider and panel spacing.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
