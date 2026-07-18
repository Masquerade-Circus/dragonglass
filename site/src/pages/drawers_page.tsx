import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const persistentDrawerCode = `<aside data-drawer aria-label="Workspace shortcuts">
  <section class="h-48 relative bg-primary">
    <h2 data-position="absolute bottom left">Workspace</h2>
  </section>
  <nav aria-label="Workspace shortcuts">
    <ul data-list>
      <li><a href="/projects"><i class="material-icons" aria-hidden="true">folder</i> Projects</a></li>
      <li><a href="/activity"><i class="material-icons" aria-hidden="true">history</i> Recent activity</a></li>
    </ul>
  </nav>
</aside>`;

const temporaryDrawerCode = `<details data-trigger data-drawer-trigger>
  <summary>Open filters</summary>
  <aside data-drawer="right" aria-labelledby="project-filters-title">
    <section class="h-48 relative bg-primary">
      <h2 id="project-filters-title" data-position="absolute bottom left">Filter projects</h2>
    </section>
    <form aria-label="Project filters">
      <ul data-list>
        <li><label><i class="material-icons" aria-hidden="true">check_circle</i><input type="checkbox" name="active"> Active projects</label></li>
        <li><label><i class="material-icons" aria-hidden="true">group</i><input type="checkbox" name="shared"> Shared with me</label></li>
      </ul>
    </form>
  </aside>
</details>`;

export default () => (
  <DocPage page="Drawers">
    <DemoSection id="drawer-persistent" title="Persistent drawer">
      <p>
        Use <code>aside data-drawer</code> for a persistent complementary
        region. The drawer may contain navigation, controls, or supporting
        content and stays fixed at the requested viewport edge. Navigation is
        optional.
      </p>
      <p>
        This preview stays inside its frame so you can inspect the drawer
        without covering the rest of the page.
      </p>
      <section
        aria-label="Contained persistent drawer preview"
        class="relative border border-default"
        style="min-height: 22rem; overflow: hidden; border-radius: var(--card-radius); background-color: var(--surface);"
      >
        <aside
          data-drawer
          aria-labelledby="drawer-preview-title"
          class="absolute z-auto h-full"
          style="width: min(20rem, 80%);"
        >
          <section class="h-48 relative bg-primary">
            <h3 id="drawer-preview-title" data-position="absolute bottom left">
              Workspace
            </h3>
          </section>
          <nav aria-label="Workspace shortcuts">
            <ul data-list>
              <li>
                <a href="#drawer-persistent">
                  <i class="material-icons bg-info" aria-hidden="true">
                    folder
                  </i>
                  Projects
                </a>
              </li>
              <li>
                <a href="#drawer-position">
                  <i class="material-icons bg-primary" aria-hidden="true">
                    history
                  </i>
                  Recent activity
                </a>
              </li>
            </ul>
          </nav>
          <ul data-list>
            <li>
              <button type="button">
                <i class="material-icons bg-success" aria-hidden="true">
                  add
                </i>
                Create project
              </button>
            </li>
          </ul>
        </aside>
      </section>
      <CodeExample code={persistentDrawerCode} />
    </DemoSection>

    <DemoSection id="drawer-temporary" title="Temporary drawer">
      <p>
        Place a <code>summary</code> followed by a direct
        <code> aside data-drawer</code> inside a
        <code> details data-trigger data-drawer-trigger</code> disclosure. The
        <code> data-drawer-trigger</code> attribute is a CSS hook and adds no
        JavaScript behavior. The native <code>open</code> attribute is the only
        state and opens or closes the drawer with a mouse click, Enter, or
        Space. Touch activation remains pending direct verification across the
        browser baseline.
      </p>
      <p>
        A click outside the open drawer closes it and consumes that click, so a
        covered control does not activate by accident. Controls inside the
        drawer keep their native behavior. Give the complementary region a name
        with
        <code> aria-label</code> or <code>aria-labelledby</code>. This
        disclosure does not contain focus, restore focus, or promise Escape
        closure. Use it only when those limits fit the product flow.
      </p>
      <p>
        The first preview remains visible for inspection. The interactive demo
        below starts closed and lets you open or close the temporary drawer.
      </p>
      <section
        aria-label="Static temporary drawer preview"
        class="relative border border-default"
        style="min-height: 22rem; overflow: hidden; border-radius: var(--card-radius); background-color: var(--surface);"
      >
        <aside
          data-drawer="right"
          aria-labelledby="static-temporary-drawer-title"
          class="absolute z-auto h-full"
          style="width: min(20rem, 80%);"
        >
          <section class="h-48 relative bg-primary">
            <h3
              id="static-temporary-drawer-title"
              data-position="absolute bottom left"
            >
              Project filters preview
            </h3>
          </section>
          <form aria-label="Project filters preview">
            <ul data-list>
              <li>
                <label>
                  <i class="material-icons bg-success" aria-hidden="true">
                    check_circle
                  </i>
                  <input type="checkbox" name="preview-active-projects" />
                  Active projects
                </label>
              </li>
              <li>
                <label>
                  <i class="material-icons bg-info" aria-hidden="true">
                    group
                  </i>
                  <input type="checkbox" name="preview-shared-projects" />
                  Shared with me
                </label>
              </li>
            </ul>
          </form>
        </aside>
      </section>
      <section
        aria-label="Interactive temporary drawer demo"
        class="p-4 border border-default"
        style="border-radius: var(--card-radius); background-color: var(--surface);"
      >
        <details data-trigger data-drawer-trigger>
          <summary>Open filters</summary>
          <aside data-drawer="right" aria-labelledby="temporary-drawer-title">
            <section class="h-48 relative bg-primary">
              <h3
                id="temporary-drawer-title"
                data-position="absolute bottom left"
              >
                Filter projects
              </h3>
            </section>
            <form aria-label="Project filters">
              <ul data-list>
                <li>
                  <label>
                    <i class="material-icons bg-success" aria-hidden="true">
                      check_circle
                    </i>
                    <input type="checkbox" name="active-projects" /> Active
                    projects
                  </label>
                </li>
                <li>
                  <label>
                    <i class="material-icons bg-info" aria-hidden="true">
                      group
                    </i>
                    <input type="checkbox" name="shared-projects" /> Shared with
                    me
                  </label>
                </li>
                <li>
                  <a href="#drawer-position">
                    <i class="material-icons bg-primary" aria-hidden="true">
                      open_in_new
                    </i>
                    Learn where drawers appear
                  </a>
                </li>
              </ul>
            </form>
          </aside>
        </details>
      </section>
      <CodeExample code={temporaryDrawerCode} />
    </DemoSection>

    <DemoSection id="drawer-position" title="Position and motion">
      <p>
        A drawer starts at the left edge. Add
        <code> data-drawer="right"</code> to anchor it to the right edge.
        Browsers with native details-content and inert CSS support animate each
        entrance and exit. Browsers in the supported baseline without those
        features retain the native disclosure and change state immediately.
        Reduced motion also changes state without a transition or spatial
        offset.
      </p>
    </DemoSection>

    <DemoSection
      id="drawer-migration"
      title="Migration for the next major release"
    >
      <p>
        This is a breaking change for the next major release. The former
        <code> section data-drawer</code> and
        <code> dialog data-drawer</code> structures are no longer supported.
        Replace either structure with <code>aside data-drawer</code>. A drawer
        may contain navigation, but a <code>nav</code> element is optional. The
        next major release removes support for the generic
        <code> [data-drawer]</code> selector, which is intentionally not
        preserved.
      </p>
    </DemoSection>

    <DemoSection id="drawer-api" title="API">
      <ApiTable
        caption="Drawer elements, attributes and states"
        rows={[
          {
            name: "aside[data-drawer]",
            type: "Element",
            defaultValue: "Persistent",
            description:
              "Creates a standalone persistent drawer or a temporary drawer inside the required disclosure structure.",
          },
          {
            name: "details[data-trigger][data-drawer-trigger] > summary + aside[data-drawer]",
            type: "Structure",
            defaultValue: "Required for temporary drawers",
            description:
              "Marks the temporary drawer disclosure for CSS while native details state provides zero-JavaScript control.",
          },
          {
            name: 'data-drawer="right"',
            type: "Attribute token",
            defaultValue: "Left",
            description: "Anchors the drawer to the right viewport edge.",
          },
          {
            name: "open",
            type: "Native details state",
            defaultValue: "Absent",
            description:
              "Shows the temporary drawer through its parent details.",
          },
          {
            name: "--motion-duration-base / --motion-duration-fast / --motion-easing-enter / --motion-easing-exit",
            type: "Motion token",
            defaultValue: "200ms / theme value / ease-out / ease-in",
            description:
              "Control enhanced entrance and exit transitions where the browser supports them.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
