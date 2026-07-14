import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const fixedCode = `<aside data-position>Top right by default</aside>
<aside data-position="top center">Top center</aside>
<aside data-position="bottom left">Bottom left</aside>
<aside data-position="center">Viewport center</aside>`;

const absoluteCode = `<section class="relative min-h-64 border">
  <p data-position="absolute top left" class="bg-primary p-2">Top left</p>
  <p data-position="absolute center" class="bg-info p-2">Center</p>
  <p data-position="absolute bottom right" class="bg-success p-2">Bottom right</p>
</section>`;

const apiRows = [
  {
    name: "data-position",
    type: "Attribute",
    defaultValue: "fixed top right",
    description:
      "Activates viewport positioning with top-right offsets from the spacing scale.",
  },
  {
    name: "absolute",
    type: "Attribute token",
    defaultValue: "fixed",
    description:
      "Changes only the position mode to absolute. The containing block comes from an ancestor positioned by the application.",
  },
  {
    name: "top | right | bottom | left",
    type: "Attribute token",
    defaultValue: "top right",
    description:
      "Selects one vertical edge and one horizontal edge using the standard spacing offset.",
  },
  {
    name: "center",
    type: "Attribute token",
    defaultValue: "Absent",
    description:
      "Centers both axes alone, or the remaining axis when paired with an edge token.",
  },
  {
    name: "Positioned ancestor",
    type: "Composition requirement",
    defaultValue: "Application controlled",
    description:
      "Provides the containing block for absolute positioning, commonly through the relative utility.",
  },
];

export default () => (
  <DocPage page="Positioning">
    <DemoSection id="positioning-fixed" title="Fixed to the viewport">
      <p>
        A bare <code>data-position</code> uses fixed positioning at the top
        right. Combine one vertical token with one horizontal token. The
        following examples remain as markup so they do not cover this reference
        page.
      </p>
      <CodeExample code={fixedCode} />
    </DemoSection>

    <DemoSection id="positioning-absolute" title="Absolute inside a container">
      <p>
        Add <code>absolute</code> to change only the positioning mode. The
        parent below uses <code>relative</code> to establish the containing
        block.
      </p>
      <section class="relative min-h-64 border">
        <p data-position="absolute top left" class="bg-primary p-2">
          Top left
        </p>
        <p data-position="absolute center" class="bg-info p-2">
          Center
        </p>
        <p data-position="absolute bottom right" class="bg-success p-2">
          Bottom right
        </p>
      </section>
      <CodeExample code={absoluteCode} />
    </DemoSection>

    <DemoSection id="positioning-combinations" title="Supported combinations">
      <p>
        Use corners, <code>top center</code>, <code>bottom center</code>,
        <code>left center</code>, <code>right center</code>, or
        <code>center</code>. Combinations with opposing edges are outside the
        contract.
      </p>
    </DemoSection>

    <DemoSection id="positioning-api" title="API">
      <ApiTable
        caption="Positioning attribute, tokens and composition requirements"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
