import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const fractionExample = `<div class="grid">
  <div class="w-4/12"><div class="p-3 shadow-xs">Four of twelve columns</div></div>
  <div class="w-8/12"><div class="p-3 shadow-xs">Eight of twelve columns</div></div>
</div>`;

const gutterExample = `<div class="grid-gutters">
  <div class="w-6/12"><div class="p-3 shadow-xs">First column</div></div>
  <div class="w-6/12"><div class="p-3 shadow-xs">Second column</div></div>
</div>`;

const responsiveExample = `<div class="grid-gutters">
  <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="p-3 shadow-xs">Responsive column</div></div>
  <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="p-3 shadow-xs">Responsive column</div></div>
</div>`;

const gridRows = [
  {
    name: "grid",
    type: "Container class",
    defaultValue: "Full-width children",
    description: "Creates a wrapping flex row without gutters.",
  },
  {
    name: "grid-gutters",
    type: "Container class",
    defaultValue: "0.8rem gutters",
    description:
      "Creates the same grid and adds horizontal container offsets plus 0.8rem child padding.",
  },
  {
    name: "w-{part}/{whole}",
    type: "Width utility",
    defaultValue: "1 through whole - 1",
    description:
      "Sets a fractional width. Both numbers range from 1 to 12 and part must be smaller than whole.",
  },
  {
    name: "sm:w-{part}/{whole}",
    type: "Responsive width",
    defaultValue: "min-width: 576px",
    description: "Applies the fraction at the small breakpoint and above.",
  },
  {
    name: "md:w-{part}/{whole}",
    type: "Responsive width",
    defaultValue: "min-width: 768px",
    description: "Applies the fraction at the medium breakpoint and above.",
  },
  {
    name: "lg:w-{part}/{whole}",
    type: "Responsive width",
    defaultValue: "min-width: 992px",
    description: "Applies the fraction at the large breakpoint and above.",
  },
  {
    name: "xl:w-{part}/{whole}",
    type: "Responsive width",
    defaultValue: "min-width: 1200px",
    description:
      "Applies the fraction at the extra-large breakpoint and above.",
  },
];

export default () => (
  <DocPage page="Grid">
    <DemoSection id="fractional-grid" title="Fractional columns">
      <p>
        A grid starts mobile-first with full-width children. Fraction utilities
        divide a row with denominators from 2 through 12.
      </p>
      <div class="grid">
        <div class="w-4/12">
          <div class="p-3 shadow-xs">Four of twelve columns</div>
        </div>
        <div class="w-8/12">
          <div class="p-3 shadow-xs">Eight of twelve columns</div>
        </div>
      </div>
      <CodeExample code={fractionExample} />
    </DemoSection>

    <DemoSection id="guttered-grid" title="Guttered columns">
      <p>
        Use <code>grid-gutters</code> when columns need consistent spacing.
      </p>
      <div class="grid-gutters">
        <div class="w-6/12">
          <div class="p-3 shadow-xs">First column</div>
        </div>
        <div class="w-6/12">
          <div class="p-3 shadow-xs">Second column</div>
        </div>
      </div>
      <CodeExample code={gutterExample} />
    </DemoSection>

    <DemoSection id="responsive-grid" title="Responsive columns">
      <p>
        Unprefixed fractions apply at every width. Prefixed fractions take
        effect at their real minimum-width breakpoint and remain active until a
        later rule overrides them.
      </p>
      <div class="grid-gutters">
        <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
          <div class="p-3 shadow-xs">Responsive column</div>
        </div>
        <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
          <div class="p-3 shadow-xs">Responsive column</div>
        </div>
      </div>
      <CodeExample code={responsiveExample} />
    </DemoSection>

    <DemoSection id="grid-api" title="Grid API and breakpoints">
      <ApiTable caption="Grid classes and breakpoints" rows={gridRows} />
    </DemoSection>

    <DemoSection
      id="grid-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Keep the source order meaningful because width utilities only change
          presentation, not reading order.
        </li>
        <li>
          Do not use empty columns to create spacing. Use a guttered grid or
          spacing utilities instead.
        </li>
        <li>
          A prefixed width does not apply below its breakpoint, so provide an
          unprefixed fraction only when the mobile layout should also be split.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
