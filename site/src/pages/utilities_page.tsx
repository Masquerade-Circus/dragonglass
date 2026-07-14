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

export default () => (
  <DocPage page="Utilities">
    <DemoSection id="utility-composition" title="Compose focused adjustments">
      <p>
        A utility class changes one focused visual concern. Combine utilities
        with semantic HTML and component attributes instead of replacing the
        underlying element or component contract.
      </p>
      <CodeExample code={compositionExample} />
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
        Colons and slashes are written directly inside the HTML class attribute.
        Escape them only when referencing the class from authored CSS or a DOM
        selector.
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

    <DemoSection
      id="utility-accessibility"
      title="Accessibility and common errors"
    >
      <ul>
        <li>
          Utilities change presentation. They do not add semantics, keyboard
          behavior, labels or state announcements.
        </li>
        <li>
          Never use <code>outline-none</code> without another visible keyboard
          focus indicator.
        </li>
        <li>
          Pair every hover-only treatment with a focus treatment when the
          element supports keyboard interaction.
        </li>
        <li>
          Do not communicate status through a color utility alone. Preserve a
          text label, icon with accessible text or another programmatic cue.
        </li>
        <li>
          Use the smallest z-index that solves the stacking problem. Arbitrary
          high values make overlays and dialogs harder to compose.
        </li>
      </ul>
    </DemoSection>
  </DocPage>
);
