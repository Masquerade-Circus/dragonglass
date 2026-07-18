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
  <section>Settings use the available viewport width.</section>
</dialog>

<dialog open class="static" data-dialog="no-shadow" aria-labelledby="embedded-dialog-title">
  <header><h3 id="embedded-dialog-title">Embedded decision</h3></header>
  <section>The surrounding surface supplies separation without elevation.</section>
</dialog>`;

const apiRows = [
  {
    name: "dialog",
    type: "Element",
    defaultValue: "Closed",
    description: "Receives centered, elevated surface styling.",
  },
  {
    name: "open",
    type: "State",
    defaultValue: "Absent",
    description: "Displays the dialog with its flex layout.",
  },
  {
    name: 'data-dialog="squared"',
    type: "Attribute token",
    defaultValue: "Standard shape",
    description: "Applies the squared card dimensions and media layout.",
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
    description: "Removes dialog elevation.",
  },
  {
    name: "--dialog-radius",
    type: "Token",
    defaultValue: "Theme value",
    description: "Controls the corner radius of standard dialogs.",
  },
  {
    name: "--motion-duration-base / --motion-easing-enter / --motion-easing-exit",
    type: "Motion token",
    defaultValue: "200ms / ease-out / ease-in",
    description:
      "Control supported opening and closing transitions for the dialog surface and backdrop.",
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
        <section>Settings use the available viewport width.</section>
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
          The surrounding surface supplies separation without elevation.
        </section>
      </dialog>
      <CodeExample code={dialogVariantsCode} />
    </DemoSection>

    <DemoSection id="dialog-composition" title="Composition">
      <p>
        A dialog accepts direct <code>header</code>, <code>section</code> and
        <code>footer</code> children. The <code>static</code> utility keeps
        these open previews in the document flow. The default position centers
        the dialog.
      </p>
    </DemoSection>

    <DemoSection id="dialog-responsive" title="Responsive behavior">
      <p>
        Standard dialogs size to their content. The <code>full-width</code>
        token leaves a one-rem viewport gap. Long body content scrolls without
        moving the header or footer actions.
      </p>
    </DemoSection>

    <DemoSection id="dialog-motion" title="Motion and fallback behavior">
      <p>
        Browsers that support transitions and starting styles reveal a
        non-static dialog through opacity and a short vertical translation. To
        animate its exit, keep the modal open, add <code>data-closing</code>,
        wait for its surface and backdrop animations, and then call
        <code> close()</code>. Browsers without this support close the dialog
        immediately.
      </p>
      <p>
        The <code>static</code> utility excludes documentation previews and
        embedded dialogs from this motion. When a user requests reduced motion,
        the dialog and its backdrop change state without transitions or spatial
        movement.
      </p>
    </DemoSection>

    <DemoSection id="dialog-accessibility" title="Accessibility">
      <p>
        Give every dialog an accessible name with
        <code> aria-labelledby</code> or <code>aria-label</code>. Use the native
        modal API when the dialog must block the page, move focus into the
        dialog when it opens, keep focus inside the modal, support Escape, and
        return focus to the control that opened it after it closes.
      </p>
    </DemoSection>

    <DemoSection id="dialog-api" title="API">
      <ApiTable
        caption="Dialog elements, attributes, states and tokens"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
