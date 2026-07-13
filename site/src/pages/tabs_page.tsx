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
      <p>
        Each disclosure can contain text or form controls. Give every sibling
        the same name so opening one panel closes the other panels in the group.
      </p>
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

    <DemoSection id="tabs-api-title" title="API">
      <ApiTable
        caption="Tab disclosure elements, attributes, tokens and states"
        rows={[
          {
            name: "section / details / summary",
            type: "Element",
            defaultValue: "Required",
            description: "Build the container, disclosure panels and controls.",
          },
          {
            name: "data-tabs",
            type: "Attribute",
            defaultValue: "Required",
            description:
              "Aligns grouped details controls and places the open content below.",
          },
          {
            name: "name",
            type: "Attribute",
            defaultValue: "Ungrouped",
            description:
              "A shared value lets the browser keep one details panel open.",
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Marks the currently expanded disclosure.",
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

    <DemoSection id="tabs-accessibility-title" title="Accessibility">
      <p>
        This component uses native <code>details</code> and
        <code> summary</code> disclosures. It is not an ARIA tablist and does
        not implement tab, arrow-key or tabpanel roles. Keep every summary
        descriptive and every panel available in the document.
      </p>
    </DemoSection>

    <DemoSection id="tabs-errors-title" title="Composition and common errors">
      <p>
        Give sibling details the same non-empty <code>name</code> when they must
        behave as a group. Keep only <code>details</code> as direct children of
        the tabs container because the enhanced layout derives each tab position
        from that sibling order.
      </p>
      <p>
        Browsers without the required modern CSS keep the native disclosures in
        a stacked layout. Do not add ARIA tab roles without implementing the
        complete keyboard and focus contract.
      </p>
    </DemoSection>
  </DocPage>
);
