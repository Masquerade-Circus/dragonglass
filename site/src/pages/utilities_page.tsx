import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import { utilityGroups } from "../docs/utility_catalog";
import DocPage from "../docs/doc_page";

const compositionExample = `<article class="relative z-1 p-4 shadow-base bg-default-lightest">
  <h2 class="text-xl font-semibold leading-tight text-primary-dark">Project summary</h2>
  <p class="mt-2 mb-4 text-default-dark">Utilities make focused visual adjustments.</p>
  <button class="bg-primary hover:bg-primary-dark focus:outline-2 focus:outline-primary">
    Open project
  </button>
</article>`;

const responsiveExample = `<div class="grid-gutters">
  <section class="w-6/12 md:w-4/12 xl:w-3/12 p-4">Responsive column</section>
</div>`;

const containerExample = `<section class="container">
  <h2>Application content</h2>
  <p>The container stays fluid until it reaches the configured maximum width.</p>
</section>

<p class="max-w-prose mx-auto">
  This text measure stays readable and preserves its vertical margins.
</p>`;

export default () => (
  <DocPage page="Utilities">
    <DemoSection id="utility-index" title="Find a utility">
      <p>
        The reference groups every documented utility family by purpose. Each
        table shows the class pattern, accepted values and available variants.
      </p>
      <ul>
        {utilityGroups.map((group) => (
          <li>
            <a href={`#utilities-${group.id}`}>{group.title}</a>
          </li>
        ))}
      </ul>
    </DemoSection>

    <DemoSection id="utility-composition" title="Compose focused adjustments">
      <p>A utility class changes one visual property or a small related set.</p>
      <CodeExample code={compositionExample} />
    </DemoSection>

    <DemoSection id="utility-containers" title="Constrain content width">
      <p>
        Use <code>container</code> for the common fluid and centered page width.
        Combine <code>max-w-*</code> with <code>mx-auto</code> when an element
        needs a different limit. These classes add no padding.
      </p>
      <CodeExample code={containerExample} />
    </DemoSection>

    <DemoSection id="utility-syntax" title="Prefixes and special characters">
      <p>
        Interactive variants place <code>focus:</code>, <code>active:</code> or
        <code> hover:</code> before a supported class. Color utilities also
        accept <code>before:</code> and <code>after:</code>. Fractional widths
        accept the responsive prefixes <code>sm:</code>, <code>md:</code>,
        <code> lg:</code> and <code>xl:</code>.
      </p>
      <p>
        Colons and slashes appear directly inside the HTML class attribute.
        Authored CSS and DOM selectors use their escaped forms.
      </p>
      <CodeExample code={responsiveExample} />
    </DemoSection>

    {utilityGroups.map((group) => (
      <DemoSection id={`utilities-${group.id}`} title={group.title}>
        <p>{group.description}</p>
        <ApiTable
          caption={`${group.title} utility families`}
          rows={group.families.map((family) => ({
            name: family.pattern,
            type: family.type,
            defaultValue: family.values,
            description: `${family.description} Variants: ${family.variants}`,
          }))}
        />
      </DemoSection>
    ))}
  </DocPage>
);
