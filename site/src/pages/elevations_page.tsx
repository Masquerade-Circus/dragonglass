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
const textShadowExample = `<p class="bg-primary text-white text-shadow-sm p-4">Small text shadow</p>
<p class="bg-primary text-white text-shadow-base p-4">Base text shadow</p>
<p class="bg-primary text-white text-shadow-lg p-4">Large text shadow</p>
<p class="bg-primary text-white text-shadow-none p-4">No text shadow</p>`;
const zIndexExample = `<div class="relative z-8">Navigation surface</div>
<div class="relative z-auto">Natural stacking order</div>`;

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
        <code> shadow-3xl</code>.
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
      <p>
        State precedence follows interaction intent instead of shadow size. A
        hover or focus utility overrides the base elevation, and an active
        utility overrides both while the control is pressed.
      </p>
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
      <p>
        Elevation changes transition only <code>box-shadow</code> with
        <code> --motion-duration-base</code> and
        <code> --motion-easing-standard</code>.
      </p>
    </DemoSection>

    <DemoSection id="text-shadows" title="Text shadows">
      <p>
        Text shadows separate lettering from media. Keep a scrim or another
        sufficient contrast surface behind important text.
      </p>
      <p class="bg-primary text-white text-shadow-sm p-4">Small text shadow</p>
      <p class="bg-primary text-white text-shadow-base p-4">Base text shadow</p>
      <p class="bg-primary text-white text-shadow-lg p-4">Large text shadow</p>
      <p class="bg-primary text-white text-shadow-none p-4">No text shadow</p>
      <CodeExample code={textShadowExample} />
    </DemoSection>

    <DemoSection id="shadow-api" title="Shadow tokens">
      <p>
        Each outer utility reads its matching <code>--shadow-*</code> token, and
        each inset utility reads the matching <code>--shadow-inner-*</code>
        token. A token override changes that elevation value across every use of
        the utility.
      </p>
      <div class="shadow-base bg-white p-4">Token-backed surface</div>
      <CodeExample code={shadowTokenExample} />
      <ApiTable caption="Outer and inner shadow tokens" rows={shadowRows} />
    </DemoSection>

    <DemoSection id="z-index-scale" title="Z-index scale">
      <p>
        Outer shadow utilities retain a z-index derived from their elevation
        level. Explicit stacking overrides include <code>z-auto</code>,
        <code> z-negative-10</code>,<code> z-negative-1</code>, <code>z-0</code>
        , <code>z-1</code>,<code> z-2</code>, <code>z-3</code>, <code>z-4</code>
        , <code>z-6</code>,<code> z-8</code>, <code>z-12</code>,{" "}
        <code>z-16</code> or
        <code> z-1000</code>.
      </p>
      <CodeExample code={zIndexExample} />
    </DemoSection>
  </DocPage>
);
