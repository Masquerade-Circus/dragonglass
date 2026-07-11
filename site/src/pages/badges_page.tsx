import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const colors = [
  "primary",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
  "default",
];

const badgeRows = [
  {
    name: "data-badge",
    type: "HTML data attribute",
    defaultValue: "Required",
    description:
      "Supplies the short visual value rendered by the ::after pseudo-element.",
  },
  {
    name: "after:bg-{color}",
    type: "Pseudo-element color utility",
    defaultValue: "bg-white",
    description:
      "Sets the badge background to primary, accent, info, success, warning, danger or default.",
  },
];

export default () => (
  <DocPage page="Badges">
    <DemoSection id="badge-colors" title="Badge colors">
      <p>
        Keep the value in real markup because generated pseudo-element content
        is not a reliable accessible name.
      </p>
      <div class="grid-gutters">
        {colors.map((color) => {
          const code = `<span data-badge="1" class="after:bg-${color}">1 notification</span>`;

          return (
            <div class="md:w-1/3">
              <span data-badge="1" class={`after:bg-${color}`}>
                1 notification
              </span>
              <CodeExample code={code} />
            </div>
          );
        })}
      </div>
    </DemoSection>

    <DemoSection id="badge-api" title="Badge API">
      <ApiTable
        caption="Badge attributes and color utilities"
        rows={badgeRows}
      />
    </DemoSection>

    <DemoSection
      id="badge-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Include the count or status as real text. Do not leave important
          information only in <code>data-badge</code> or <code>::after</code>.
        </li>
        <li>
          Keep badge values short because the current CSS uses a fixed circular
          area and does not expand for long text.
        </li>
        <li>
          A badge does not make its host interactive. Use a link or button only
          when the surrounding content performs an action.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
