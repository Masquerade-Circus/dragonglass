import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const standardDialogCode = `<dialog open class="static" aria-labelledby="review-dialog-title">
  <header>
    <h3 id="review-dialog-title">Review changes</h3>
    <nav aria-label="Dialog actions">
      <button type="button" data-button="fab" class="inline" aria-label="Share review">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </nav>
  </header>
  <section>
    Confirm the title and owner before publishing this project.
  </section>
  <footer>
    <nav aria-label="Review decision">
      <button type="button">Cancel</button>
      <button type="button" class="bg-primary">Publish</button>
    </nav>
  </footer>
</dialog>`;

const dialogVariantsCode = `<dialog open class="static" data-dialog="squared" aria-labelledby="event-dialog-title">
  <section data-media class="bg-primary">
    <header>
      <h3 id="event-dialog-title">Team event</h3>
      <button type="button" data-button="fab" class="inline" aria-label="Share event">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </header>
    <section>May 24, 7:00 PM</section>
  </section>
</dialog>

<dialog open class="static" data-dialog="full-width" aria-labelledby="workspace-dialog-title">
  <header><h3 id="workspace-dialog-title">Workspace settings</h3></header>
  <section>Settings can use the available viewport width.</section>
</dialog>

<dialog open class="static" data-dialog="no-shadow" aria-labelledby="embedded-dialog-title">
  <header><h3 id="embedded-dialog-title">Embedded decision</h3></header>
  <section>Remove elevation when the surrounding surface supplies separation.</section>
</dialog>`;

const apiRows = [
  {
    name: "dialog",
    type: "Element",
    defaultValue: "Closed",
    description:
      "Provides native dialog semantics and a centered, elevated surface.",
  },
  {
    name: "open",
    type: "State",
    defaultValue: "Absent",
    description:
      "Makes a non-modal dialog visible. Use showModal() for modal behavior.",
  },
  {
    name: "aria-labelledby",
    type: "Attribute",
    defaultValue: "Required by guidance",
    description: "Associates the dialog with the id of its visible heading.",
  },
  {
    name: 'data-dialog="squared"',
    type: "Attribute token",
    defaultValue: "Standard shape",
    description:
      "Creates a compact square surface suited to concise media or content.",
  },
  {
    name: "full-width",
    type: "Attribute token",
    defaultValue: "Content width",
    description:
      "Expands the dialog to the available viewport width with an outer gap.",
  },
  {
    name: "no-shadow",
    type: "Attribute token",
    defaultValue: "--shadow-2xl",
    description:
      "Removes dialog elevation when another boundary provides separation.",
  },
  {
    name: "--dialog-radius",
    type: "Token",
    defaultValue: "Theme value",
    description: "Controls the corner radius of standard dialogs.",
  },
];

export default () => (
  <DocPage page="Dialogs">
    <DemoSection id="dialog-standard" title="Dialog with actions">
      <dialog open class="static" aria-labelledby="review-dialog-title">
        <header>
          <h3 id="review-dialog-title">Review changes</h3>
          <nav aria-label="Dialog actions">
            <button
              type="button"
              data-button="fab"
              class="inline"
              aria-label="Share review"
            >
              <i class="material-icons" aria-hidden="true">
                share
              </i>
            </button>
          </nav>
        </header>
        <section>
          Confirm the title and owner before publishing this project.
        </section>
        <footer>
          <nav aria-label="Review decision">
            <button type="button">Cancel</button>
            <button type="button" class="bg-primary">
              Publish
            </button>
          </nav>
        </footer>
      </dialog>
      <CodeExample code={standardDialogCode} />
    </DemoSection>

    <DemoSection id="dialog-variants" title="Shape, width and elevation">
      <dialog
        open
        class="static"
        data-dialog="squared"
        aria-labelledby="event-dialog-title"
      >
        <section data-media class="bg-primary">
          <header>
            <h3 id="event-dialog-title">Team event</h3>
            <button
              type="button"
              data-button="fab"
              class="inline"
              aria-label="Share event"
            >
              <i class="material-icons" aria-hidden="true">
                share
              </i>
            </button>
          </header>
          <section>May 24, 7:00 PM</section>
        </section>
      </dialog>

      <dialog
        open
        class="static"
        data-dialog="full-width"
        aria-labelledby="workspace-dialog-title"
      >
        <header>
          <h3 id="workspace-dialog-title">Workspace settings</h3>
        </header>
        <section>Settings can use the available viewport width.</section>
      </dialog>

      <dialog
        open
        class="static"
        data-dialog="no-shadow"
        aria-labelledby="embedded-dialog-title"
      >
        <header>
          <h3 id="embedded-dialog-title">Embedded decision</h3>
        </header>
        <section>
          Remove elevation when the surrounding surface supplies separation.
        </section>
      </dialog>
      <CodeExample code={dialogVariantsCode} />
    </DemoSection>

    <DemoSection id="dialog-composition" title="Composition">
      <p>
        Compose a dialog from direct <code>header</code>, <code>section</code>
        and <code>footer</code> children. Keep the decision and its actions
        short. The <code>static</code> utility in these previews only keeps
        several open examples in the document flow. Omit it when the dialog
        should use its default centered position.
      </p>
    </DemoSection>

    <DemoSection id="dialog-responsive" title="Responsive behavior">
      <p>
        Standard dialogs size to their content. The <code>full-width</code>
        token leaves a small viewport gap and works for wider tasks. Keep long
        content in the body section so it can scroll without moving the header
        or footer actions.
      </p>
    </DemoSection>

    <DemoSection id="dialog-accessibility" title="Accessibility">
      <p>
        Give every dialog a visible heading and connect it with
        <code> aria-labelledby</code>. Use the native <code>showModal()</code>
        method when the rest of the page must be inert, move focus to a useful
        control after opening, support Escape and return focus to the trigger
        after closing. Icon-only actions need an <code>aria-label</code> and a
        decorative icon marked <code>aria-hidden="true"</code>.
      </p>
    </DemoSection>

    <DemoSection id="dialog-errors" title="Common mistakes">
      <ul>
        <li>
          A <code>details</code> element does not provide dialog focus,
          dismissal or modal semantics.
        </li>
        <li>
          Styling an ordinary container to look modal leaves the background
          interactive and the surface unnamed.
        </li>
        <li>
          Opening several modal dialogs at once creates an ambiguous focus and
          dismissal order.
        </li>
        <li>
          Using <code>open</code> alone creates a non-modal dialog. Use the
          native modal method when interaction must stay inside the dialog.
        </li>
      </ul>
    </DemoSection>

    <DemoSection id="dialog-api" title="API">
      <ApiTable
        caption="Dialog elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
