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
const directions = ["bottom", "left", "right"];

const spanExample = `<span data-tooltip="This is a tooltip" class="inline">This span has a tooltip</span>`;

const tooltipRows = [
  {
    name: "data-tooltip",
    type: "HTML data attribute",
    defaultValue: "Required",
    description:
      "Supplies the visual text rendered by the ::after pseudo-element.",
  },
  {
    name: "data-tooltip-position",
    type: "HTML data attribute",
    defaultValue: "Top",
    description:
      "Accepts top, bottom, left or right. An absent attribute uses top.",
  },
  {
    name: "after:bg-{color}",
    type: "Pseudo-element color utility",
    defaultValue: "bg-white",
    description:
      "Sets the tooltip background to primary, accent, info, success, warning, danger or default.",
  },
];

export default () => (
  <DocPage page="Tooltips">
    <DemoSection id="default-tooltip" title="Default tooltip">
      <span
        data-tooltip="This is a tooltip"
        data-markdown="exclude"
        class="inline"
      >
        This span has a tooltip
      </span>
      <CodeExample code={spanExample} />
    </DemoSection>

    <DemoSection id="tooltip-colors" title="Tooltip colors">
      <p>
        Apply after:bg-{"{color}"} to select a semantic tooltip background.
        Dragonglass supports primary, accent, info, success, warning, danger,
        and default.
      </p>
      {colors.map((color) => {
        const code = `<span data-tooltip="This is a ${color} tooltip" class="inline after:bg-${color}">${color} tooltip</span>`;

        return (
          <div>
            <span
              data-tooltip={`This is a ${color} tooltip`}
              class={`inline after:bg-${color}`}
            >
              {color} tooltip
            </span>
            <CodeExample code={code} />
          </div>
        );
      })}
    </DemoSection>

    <DemoSection id="tooltip-directions" title="Tooltip directions">
      <p>
        Set data-tooltip-position to bottom, left, or right. An omitted
        attribute places the tooltip above its trigger.
      </p>
      {directions.map((direction) => {
        const code = `<span data-tooltip="This tooltip opens ${direction}" data-tooltip-position="${direction}" class="inline ml-16">${direction} tooltip</span>`;

        return (
          <div>
            <span
              data-tooltip={`This tooltip opens ${direction}`}
              data-tooltip-position={direction}
              class="inline ml-16"
            >
              {direction} tooltip
            </span>
            <CodeExample code={code} />
          </div>
        );
      })}
    </DemoSection>

    <DemoSection id="tooltip-api" title="Tooltip API">
      <ApiTable
        caption="Tooltip attributes and color utilities"
        rows={tooltipRows}
      />
    </DemoSection>
  </DocPage>
);
