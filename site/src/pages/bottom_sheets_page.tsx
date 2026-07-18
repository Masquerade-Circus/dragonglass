import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const bottomSheetExample = `<dialog data-dialog="bottom-sheet" open aria-labelledby="filter-sheet-title">
  <header>
    <h3 id="filter-sheet-title">Filters</h3>
  </header>
  <section>
    <p>Choose the results to include.</p>
    <label class="mr-2"><input type="checkbox" name="availability"> Available now</label>
    <label class="mr-2"><input type="checkbox" name="delivery"> Free delivery</label>
  </section>
  <footer><button type="button">Apply filters</button></footer>
</dialog>`;

export default () => (
  <DocPage page="BottomSheets">
    <DemoSection id="bottom-sheet-open-title" title="Open bottom sheet">
      <p>
        This preview stays in the page flow so its content remains visible above
        the footer. In an app, mount the dialog as a direct child of the
        document root so fixed positioning and layering are not constrained by
        an ancestor stacking context.
      </p>
      <dialog
        class="static"
        data-dialog="bottom-sheet"
        open
        aria-labelledby="filter-sheet-title"
      >
        <header>
          <h3 id="filter-sheet-title">Filters</h3>
        </header>
        <section>
          <p>Choose the results to include.</p>
          <label class="mr-2">
            <input type="checkbox" name="availability" /> Available now
          </label>
          <label class="mr-2">
            <input type="checkbox" name="delivery" /> Free delivery
          </label>
        </section>
        <footer>
          <button type="button">Apply filters</button>
        </footer>
      </dialog>
      <CodeExample code={bottomSheetExample} />
    </DemoSection>

    <DemoSection
      id="bottom-sheet-content-title"
      title="Structured content and actions"
    >
      <p>
        The bottom sheet CSS targets direct header, section and footer children.
        The <code>open</code> attribute displays the sheet.
      </p>
      <CodeExample
        code={`<dialog data-dialog="bottom-sheet no-shadow" aria-labelledby="share-sheet-title">
  <header><h3 id="share-sheet-title">Share</h3></header>
  <section><p>Choose where to share this item.</p></section>
  <footer><button type="button">Copy link</button></footer>
</dialog>`}
      />
    </DemoSection>

    <DemoSection
      id="bottom-sheet-motion-title"
      title="Motion, fallback and accessibility"
    >
      <p>
        Browsers that support discrete transitions and starting styles reveal
        the sheet through opacity and a short translation from the bottom. The
        <code>data-closing</code> state uses the same properties for exit and
        keeps the backdrop timing synchronized. Keep the modal open until those
        animations finish, then call <code>close()</code>. Browsers without this
        support open and close the sheet immediately.
      </p>
      <p>
        When a user requests reduced motion, the sheet and its backdrop change
        state without transitions or spatial movement. Give the sheet an
        accessible name, use the native modal API when it blocks the page, and
        return focus to the control that opened it after it closes.
      </p>
    </DemoSection>

    <DemoSection id="bottom-sheet-api-title" title="API">
      <ApiTable
        caption="Bottom sheet elements, attributes, tokens and states"
        rows={[
          {
            name: "dialog",
            type: "Element",
            defaultValue: "Required",
            description: "Receives the base dialog and open-state styling.",
          },
          {
            name: "data-dialog=bottom-sheet",
            type: "Attribute",
            defaultValue: "Required",
            description: "Anchors the dialog to the bottom edge.",
          },
          {
            name: "data-dialog=no-shadow",
            type: "Attribute token",
            defaultValue: "Shadow",
            description: "Removes the default dialog elevation.",
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Displays the sheet.",
          },
          {
            name: "--dialog-radius / --shadow-2xl",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the top corners and default elevation.",
          },
          {
            name: "--motion-duration-base / --motion-easing-enter / --motion-easing-exit",
            type: "Motion token",
            defaultValue: "200ms / ease-out / ease-in",
            description:
              "Control supported opening and closing transitions for the sheet and backdrop.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
