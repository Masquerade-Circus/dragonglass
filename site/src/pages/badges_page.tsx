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
  </DocPage>
);
