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
        The top and right tokens change the default bottom-left placement. Their
        combination opens the menu above the trigger and aligns it to the right
        edge.
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
              "Matches the trigger, its direct menu and the menu's direct rows.",
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
  </DocPage>
);
