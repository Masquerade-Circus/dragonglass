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
const necessaryInformationExample = `<p id="publish-help">Publishing makes the current changes visible to everyone.</p>
<button type="button" aria-describedby="publish-help" data-tooltip="Makes changes visible">Publish changes</button>`;

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
      "Accepts top, bottom, left or right. Omit it for the top position.",
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
      <span data-tooltip="This is a tooltip" class="inline">
        This span has a tooltip
      </span>
      <CodeExample code={spanExample} />
    </DemoSection>

    <DemoSection id="tooltip-colors" title="Tooltip colors">
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

    <DemoSection
      id="necessary-tooltip-information"
      title="Necessary information"
    >
      <p id="publish-help">
        Publishing makes the current changes visible to everyone.
      </p>
      <button
        type="button"
        aria-describedby="publish-help"
        data-tooltip="Makes changes visible"
      >
        Publish changes
      </button>
      <CodeExample code={necessaryInformationExample} />
    </DemoSection>

    <DemoSection id="tooltip-api" title="Tooltip API">
      <ApiTable
        caption="Tooltip attributes and color utilities"
        rows={tooltipRows}
      />
    </DemoSection>

    <DemoSection
      id="tooltip-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Focusable tooltip triggers reveal generated content on hover and
          keyboard focus. The pseudo-element still does not provide a dependable
          accessible description.
        </li>
        <li>
          Put necessary information in real markup and associate it with a
          focusable control using <code>aria-describedby</code>, as shown above.
        </li>
        <li>
          A plain <code>span</code> is suitable only for optional visual detail.
          Adding <code>data-tooltip</code> does not make it focusable.
        </li>
        <li>
          The current CSS uses top by default and supports explicit bottom, left
          and right positions. It does not provide collision detection or
          touch-specific behavior.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
