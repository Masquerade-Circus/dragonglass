import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const shadowSizes = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"];

const shadowExample = `<div class="shadow-base bg-white p-4">Raised surface</div>`;
const innerShadowExample = `<div class="shadow-inner-base bg-white p-4">Inset surface</div>`;
const stateExample = `<button type="button" class="shadow-base hover:shadow-3xl active:shadow-sm">Change elevation</button>
<input aria-label="Focus elevation example" class="shadow-base focus:shadow-3xl bg-white" value="Focus this field">`;
const shadowTokenExample = `<div class="shadow-base bg-white p-4">Token-backed surface</div>`;

const shadowRows = shadowSizes.flatMap((size) => [
  {
    name: `--shadow-${size}`,
    type: "CSS custom property",
    defaultValue: `shadow-${size}`,
    description: `Outer shadow token used by shadow-${size}.`,
  },
  {
    name: `--shadow-inner-${size}`,
    type: "CSS custom property",
    defaultValue: `shadow-inner-${size}`,
    description: `Inset shadow token used by shadow-inner-${size}.`,
  },
]);

const ElevationSamples = ({ inner = false }) => (
  <div class="grid-gutters">
    {shadowSizes.map((size) => {
      const shadowClass = inner ? `shadow-inner-${size}` : `shadow-${size}`;

      return (
        <div class="md:w-6/12 lg:w-4/12">
          <div class={`${shadowClass} bg-white p-4`}>{shadowClass}</div>
        </div>
      );
    })}
  </div>
);

export default () => (
  <DocPage page="Elevations">
    <DemoSection id="outer-shadows" title="Outer shadows">
      <p>
        Outer shadows range from <code>shadow-2xs</code> to
        <code> shadow-3xl</code>. Use stronger levels sparingly to indicate a
        surface that sits above nearby content.
      </p>
      <div class="shadow-base bg-white p-4">Raised surface</div>
      <CodeExample code={shadowExample} />
      <ElevationSamples />
    </DemoSection>

    <DemoSection id="inner-shadows" title="Inner shadows">
      <p>
        Inner shadows use the same scale with the <code>shadow-inner-</code>
        prefix.
      </p>
      <div class="shadow-inner-base bg-white p-4">Inset surface</div>
      <CodeExample code={innerShadowExample} />
      <ElevationSamples inner />
    </DemoSection>

    <DemoSection id="shadow-states" title="Interactive states">
      <button
        type="button"
        class="shadow-base hover:shadow-3xl active:shadow-sm"
      >
        Change elevation
      </button>
      <input
        aria-label="Focus elevation example"
        class="shadow-base focus:shadow-3xl bg-white"
        value="Focus this field"
      />
      <CodeExample code={stateExample} />
    </DemoSection>

    <DemoSection id="shadow-api" title="Shadow tokens">
      <p>
        Each outer utility reads its matching <code>--shadow-*</code> token, and
        each inset utility reads the matching <code>--shadow-inner-*</code>
        token. Override a token only when the theme needs a different elevation
        value across every use of that utility.
      </p>
      <div class="shadow-base bg-white p-4">Token-backed surface</div>
      <CodeExample code={shadowTokenExample} />
      <ApiTable caption="Outer and inner shadow tokens" rows={shadowRows} />
    </DemoSection>

    <DemoSection
      id="shadow-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Do not rely on elevation alone to communicate focus, selection or an
          error. Preserve a visible outline, label or text state.
        </li>
        <li>
          State variants only change the shadow. They do not add keyboard
          behavior to a non-interactive element.
        </li>
        <li>
          Dragonglass currently transitions every elevation automatically and
          does not include a reduced-motion override in this component.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
