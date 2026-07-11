import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const sizes = [
  ["2xs", "0.75rem"],
  ["xs", "0.8rem"],
  ["sm", "0.9rem"],
  ["base", "1rem"],
  ["lg", "1.25rem"],
  ["xl", "1.5rem"],
  ["2xl", "1.965rem"],
  ["3xl", "2.25rem"],
];
const styles = ["normal-style", "italic", "oblique"];
const weights = [
  "font-thin",
  "font-extralight",
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
  "font-black",
];
const transforms = ["normal-case", "capitalize", "uppercase", "lowercase"];
const lineHeights = [
  "leading-none",
  "leading-tight",
  "leading-snug",
  "leading-normal",
  "leading-relaxed",
  "leading-loose",
];
const alignments = ["text-left", "text-right", "text-center", "text-justify"];

const composedExample = `<p class="text-base italic font-light capitalize text-justify leading-loose">Readable type combines size, style, weight, casing, alignment and line height.</p>`;
const sizeExample = sizes
  .map(([size, value]) => `<p class="text-${size}">text-${size} (${value})</p>`)
  .join("\n");

const fontRows = [
  ...sizes.map(([size, value]) => ({
    name: `text-${size}`,
    type: "Font size utility",
    defaultValue: value,
    description: `Uses --font-size-${size}.`,
  })),
  {
    name: "normal-style | italic | oblique",
    type: "Font style utility",
    defaultValue: "normal-style",
    description: "Sets the font-style property.",
  },
  {
    name: "font-thin through font-black",
    type: "Font weight utility",
    defaultValue: "font-normal (400)",
    description: "Sets numeric weights from 100 through 900.",
  },
  {
    name: "normal-case | capitalize | uppercase | lowercase",
    type: "Text transform utility",
    defaultValue: "normal-case",
    description: "Changes visual casing without changing source text.",
  },
  {
    name: "leading-none through leading-loose",
    type: "Line height utility",
    defaultValue: "leading-normal (1.5)",
    description: "Sets line height from 1 through 2.",
  },
  {
    name: "text-left | text-right | text-center | text-justify",
    type: "Text alignment utility",
    defaultValue: "Browser direction",
    description: "Sets physical text alignment.",
  },
];

export default () => (
  <DocPage page="Fonts">
    <DemoSection id="composed-type" title="Composed typography">
      <p class="text-base italic font-light capitalize text-justify leading-loose">
        Readable type combines size, style, weight, casing, alignment and line
        height.
      </p>
      <CodeExample code={composedExample} />
    </DemoSection>

    <DemoSection id="font-sizes" title="Font sizes">
      {sizes.map(([size, value]) => (
        <p class={`text-${size}`}>
          {`text-${size}`} ({value})
        </p>
      ))}
      <CodeExample code={sizeExample} />
    </DemoSection>

    <DemoSection id="font-utilities" title="Style, weight and layout utilities">
      <h3>Styles</h3>
      {styles.map((item) => (
        <p class={item}>{item}</p>
      ))}
      <h3>Weights</h3>
      {weights.map((item) => (
        <p class={item}>{item}</p>
      ))}
      <h3>Text transforms</h3>
      {transforms.map((item) => (
        <p class={item}>{item}</p>
      ))}
      <h3>Line heights</h3>
      {lineHeights.map((item) => (
        <p class={item}>{item}</p>
      ))}
      <h3>Alignment</h3>
      {alignments.map((item) => (
        <p class={item}>{item}</p>
      ))}
      <p class="font-semibold leading-relaxed text-left">
        Typography utilities
      </p>
      <CodeExample
        code={`<p class="font-semibold leading-relaxed text-left">Typography utilities</p>`}
      />
    </DemoSection>

    <DemoSection id="font-api" title="Typography API">
      <ApiTable caption="Typography utilities and tokens" rows={fontRows} />
    </DemoSection>

    <DemoSection
      id="font-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Keep body copy at a readable size and line height. Smaller utilities
          are better suited to short supporting labels.
        </li>
        <li>
          Visual casing does not replace meaningful source text. Avoid long
          uppercase passages because they are harder to scan.
        </li>
        <li>
          Make the documented class match the rendered example. This page uses
          <code> text-base</code> in both the composed sample and its snippet.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
