import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const menuExample = `<details data-trigger open>
  <summary>Account menu</summary>
  <menu>
    <li><a href="/dragonglass/forms.html">Profile settings</a></li>
    <li><button type="button">Sign out</button></li>
  </menu>
</details>`;

const positionedMenusExample = `<details data-trigger>
  <summary>Top menu</summary>
  <menu data-menu="top">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
<details data-trigger>
  <summary>Right menu</summary>
  <menu data-menu="right">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
<details data-trigger>
  <summary>Top-right menu</summary>
  <menu data-menu="top right">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>`;

const MenuItem = () => (
  <li>
    <a href="/dragonglass/forms.html">Profile settings</a>
    <button type="button" aria-label="Add profile to favorites">
      <i class="material-icons" aria-hidden="true">
        star
      </i>
    </button>
  </li>
);

export default () => (
  <DocPage page="Menus">
    <DemoSection id="menus-basic-title" title="Action menu">
      <details data-trigger open>
        <summary>Account menu</summary>
        <menu>
          <li>
            <a href="/dragonglass/forms.html">Profile settings</a>
          </li>
          <li>
            <button type="button">Sign out</button>
          </li>
        </menu>
      </details>
      <CodeExample code={menuExample} />
    </DemoSection>

    <DemoSection id="menus-position-title" title="Menu positions">
      <p>
        Use top or right when the default bottom-left placement lacks space. Use
        both tokens when the menu must open above the trigger and align to its
        right edge.
      </p>
      <details data-trigger>
        <summary>Top menu</summary>
        <menu data-menu="top">
          <MenuItem />
        </menu>
      </details>
      <details data-trigger>
        <summary>Right menu</summary>
        <menu data-menu="right">
          <MenuItem />
        </menu>
      </details>
      <details data-trigger>
        <summary>Top-right menu</summary>
        <menu data-menu="top right">
          <MenuItem />
        </menu>
      </details>
      <CodeExample code={positionedMenusExample} />
    </DemoSection>

    <DemoSection id="menus-api-title" title="API">
      <ApiTable
        caption="Menu elements, attributes, tokens and states"
        rows={[
          {
            name: "details / summary / menu / li",
            type: "Element",
            defaultValue: "Required",
            description:
              "Provide the trigger, positioned surface and native menu rows.",
          },
          {
            name: "data-trigger",
            type: "Attribute",
            defaultValue: "Required",
            description: "Provides the positioned disclosure context.",
          },
          {
            name: "data-menu",
            type: "Attribute",
            defaultValue: "Bottom left",
            description: "Accepts top, right or the combined top right tokens.",
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Shows the menu through the parent details state.",
          },
          {
            name: "--card-radius / --default-light / --white",
            type: "Token",
            defaultValue: "Theme",
            description: "Control menu corners, border and background.",
          },
        ]}
      />
    </DemoSection>

    <DemoSection id="menus-accessibility-title" title="Accessibility">
      <p>
        Use links for navigation and buttons for commands. Give every icon-only
        button an accessible name and mark its decorative icon
        <code> aria-hidden="true"</code>. The summary remains the keyboard
        control for opening and closing the menu.
      </p>
    </DemoSection>

    <DemoSection id="menus-errors-title" title="Composition and common errors">
      <p>
        Keep the menu inside <code>details[data-trigger]</code>. Position it
        with space-separated <code>data-menu</code> tokens. Keep visible items
        as direct <code>li</code> children, and do not use an icon as the only
        unlabeled description of an action.
      </p>
    </DemoSection>
  </DocPage>
);
