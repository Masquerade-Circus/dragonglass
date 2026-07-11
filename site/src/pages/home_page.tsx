import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";
import { routeByPage, type DocumentationPage } from "../docs/catalog";

const installCode = `bun add dragonglass`;

const importCode = `import "dragonglass/dist/dragonglass.css";`;

const appShellCode = `<body>
  <header>
    <nav aria-label="Primary">
      <a href="/projects" aria-current="page">Projects</a>
      <a href="/teams">Teams</a>
    </nav>
  </header>

  <main>
    <header>
      <h1>Projects</h1>
    </header>
    <section data-card class="p-4">
      <h2>Website refresh</h2>
      <p>The team is reviewing the final interface states.</p>
      <button>Open project</button>
    </section>
  </main>
</body>`;

const quickLinks: Array<{
  label: string;
  page: DocumentationPage;
}> = [
  { label: "Foundations", page: "Layouts" },
  { label: "Forms", page: "Forms" },
  { label: "Components", page: "AppComponents" },
];

export default () => (
  <DocPage page="Home">
    <p>
      Dragonglass is HTML5-first. Start with semantic elements and native
      browser behavior, then add a declarative attribute or utility only when
      the interface needs a component variant or focused adjustment.
    </p>

    <DemoSection id="install-dragonglass" title="Install and import">
      <p>Install Dragonglass with Bun.</p>
      <CodeExample code={installCode} />
      <p>Import the distributed CSS from your application entry point.</p>
      <CodeExample code={importCode} />
    </DemoSection>

    <DemoSection id="minimal-app-shell" title="Create an app shell">
      <p>
        This shell uses native landmarks for structure, <code>data-card</code>
        for a component contract, and <code>p-4</code> for one explicit spacing
        adjustment.
      </p>
      <CodeExample code={appShellCode} />
    </DemoSection>

    <DemoSection id="choose-the-next-guide" title="Choose the next guide">
      <ul>
        {quickLinks.map(({ label, page }) => {
          const route = routeByPage.get(page)!;

          return (
            <li>
              <a href={route.path}>{label}</a>: {route.description}
            </li>
          );
        })}
      </ul>
    </DemoSection>
  </DocPage>
);
