import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const inlineCode = `<p>Read the <a data-link href="/dragonglass/layout.html">layout guide</a> before composing a page.</p>`;

const standaloneCode = `<p>
  <a data-link="standalone" href="/dragonglass/app-components.html">View all components</a>
</p>`;

const quietCode = `<p>
  Updated yesterday by <a data-link="quiet" href="/dragonglass">Ana</a>.
  <a data-link="standalone quiet" href="/dragonglass/app-components.html">View activity</a>
</p>`;

const apiRows = [
  {
    name: "a[data-link]",
    type: "Element and attribute",
    defaultValue: "Inline",
    description:
      "Applies the persistent underline treatment to an anchor with an href.",
  },
  {
    name: "standalone",
    type: "Attribute token",
    defaultValue: "Absent",
    description:
      "Adds emphasis for a standalone action and reveals its underline on interaction.",
  },
  {
    name: "quiet",
    type: "Attribute token",
    defaultValue: "Absent",
    description:
      "Uses secondary text color until hover or focus restores primary text color.",
  },
  {
    name: "standalone quiet",
    type: "Combined attribute tokens",
    defaultValue: "Absent",
    description: "Combines standalone emphasis with the quieter resting color.",
  },
  {
    name: "Focus state",
    type: "State",
    defaultValue: "Global link focus",
    description:
      "Keeps the framework focus indicator in addition to each link treatment.",
  },
];

export default () => (
  <DocPage page="Links">
    <DemoSection id="link-inline" title="Inline link">
      <p>
        Inline links keep a visible underline so they remain identifiable inside
        surrounding copy.
      </p>
      <p>
        Read the{" "}
        <a data-link href="/dragonglass/layout.html">
          layout guide
        </a>{" "}
        before composing a page.
      </p>
      <CodeExample code={inlineCode} />
    </DemoSection>

    <DemoSection id="link-standalone" title="Standalone link">
      <p>
        The <code>standalone</code> token presents a link as an independent
        action without giving it button semantics.
      </p>
      <p>
        <a data-link="standalone" href="/dragonglass/app-components.html">
          View all components
        </a>
      </p>
      <CodeExample code={standaloneCode} />
    </DemoSection>

    <DemoSection id="link-quiet" title="Quiet and combined links">
      <p>
        The <code>quiet</code> token lowers resting emphasis. Tokens are
        space-separated and may be combined on the same <code>data-link</code>
        attribute.
      </p>
      <p>
        Updated yesterday by{" "}
        <a data-link="quiet" href="/dragonglass">
          Ana
        </a>
        .{" "}
        <a data-link="standalone quiet" href="/dragonglass/app-components.html">
          View activity
        </a>
      </p>
      <CodeExample code={quietCode} />
    </DemoSection>

    <DemoSection id="link-api" title="API">
      <ApiTable caption="Link elements, variants and states" rows={apiRows} />
    </DemoSection>
  </DocPage>
);
