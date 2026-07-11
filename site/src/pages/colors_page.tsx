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
const weights = ["-bright", "-lightest", "-light", "", "-dark", "-darkest"];

const paletteExample = `<div class="bg-primary p-3">Primary background</div>
<p class="text-primary-dark">Primary dark text</p>`;
const stateExample = `<button type="button" class="bg-primary-dark hover:bg-primary active:bg-primary-light">Background states</button>
<input aria-label="Color focus example" class="p-3 text-primary-dark focus:text-primary" value="Focus this field">`;
const colorTokenExample = `<div style="background-color: var(--primary); color: var(--primary-darkest)">
  Primary token preview
</div>`;

const colorRows = colors.flatMap((color) =>
  weights.map((weight) => ({
    name: `--${color}${weight}`,
    type: "CSS color token",
    defaultValue: color,
    description: `Used by bg-${color}${weight}, text-${color}${weight}, border-${color}${weight} and outline-${color}${weight}.`,
  })),
);

export default () => (
  <DocPage page="Colors">
    <DemoSection id="color-palette" title="Background and text colors">
      <p>
        Each semantic color includes bright, lightest, light, base, dark and
        darkest tokens.
      </p>
      <div class="bg-primary p-3">Primary background</div>
      <p class="text-primary-dark">Primary dark text</p>
      <CodeExample code={paletteExample} />
      <div class="grid-gutters">
        {colors.map((color) => (
          <div class="md:w-1/4 lg:w-1/7">
            {weights.map((weight) => (
              <div class={`bg-${color}${weight} p-3`}>
                {`bg-${color}${weight}`}
              </div>
            ))}
            {weights.map((weight) => (
              <div class={`text-${color}${weight} p-3`}>
                {`text-${color}${weight}`}
              </div>
            ))}
          </div>
        ))}
      </div>
    </DemoSection>

    <DemoSection id="color-states" title="Interactive color states">
      <button
        type="button"
        class="bg-primary-dark hover:bg-primary active:bg-primary-light"
      >
        Background states
      </button>
      <input
        aria-label="Color focus example"
        class="p-3 text-primary-dark focus:text-primary"
        value="Focus this field"
      />
      <CodeExample code={stateExample} />
    </DemoSection>

    <DemoSection id="color-api" title="Color tokens">
      <p>
        Use the semantic custom properties when a component needs token values
        directly instead of a generated color utility class.
      </p>
      <div style="background-color: var(--primary); color: var(--primary-darkest)">
        Primary token preview
      </div>
      <CodeExample code={colorTokenExample} />
      <ApiTable caption="Semantic color custom properties" rows={colorRows} />
    </DemoSection>

    <DemoSection
      id="color-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Verify text and background combinations in context. A semantic token
          name does not guarantee sufficient contrast for every pairing.
        </li>
        <li>
          Never use color as the only signal for status, validation or an
          available action. Include text or another programmatic cue.
        </li>
        <li>
          Use a generated class such as <code>shadow-xs</code> for elevation.
          The unqualified <code>shadow</code> class does not exist.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
