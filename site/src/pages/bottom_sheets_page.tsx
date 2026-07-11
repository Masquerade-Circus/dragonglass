import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const bottomSheetExample = `<dialog data-dialog="bottom-sheet" open aria-labelledby="filter-sheet-title">
  <header>
    <h3 id="filter-sheet-title">Filters</h3>
  </header>
  <section><p>Choose the results to include.</p></section>
</dialog>`;

export default () => (
  <DocPage page="BottomSheets">
    <DemoSection id="bottom-sheet-open-title" title="Open bottom sheet">
      <dialog
        data-dialog="bottom-sheet"
        open
        aria-labelledby="filter-sheet-title"
      >
        <header>
          <h3 id="filter-sheet-title">Filters</h3>
        </header>
        <section>
          <p>Choose the results to include.</p>
        </section>
      </dialog>
      <CodeExample code={bottomSheetExample} />
    </DemoSection>

    <DemoSection
      id="bottom-sheet-content-title"
      title="Structured content and actions"
    >
      <p>
        A bottom sheet can contain a header, a content section and a footer. The
        closed markup below remains hidden until the native
        <code> open</code> state is applied.
      </p>
      <CodeExample
        code={`<dialog data-dialog="bottom-sheet no-shadow" aria-labelledby="share-sheet-title">
  <header><h3 id="share-sheet-title">Share</h3></header>
  <section><p>Choose where to share this item.</p></section>
  <footer><button type="button">Copy link</button></footer>
</dialog>`}
      />
    </DemoSection>

    <DemoSection id="bottom-sheet-api-title" title="API">
      <ApiTable
        caption="Bottom sheet elements, attributes, tokens and states"
        rows={[
          {
            name: "dialog",
            type: "Element",
            defaultValue: "Required",
            description: "Provides native dialog semantics and hidden state.",
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
            description:
              "Displays the sheet. Modal behavior still requires showModal().",
          },
          {
            name: "--dialog-radius / --shadow-2xl",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the top corners and default elevation.",
          },
        ]}
      />
    </DemoSection>

    <DemoSection id="bottom-sheet-accessibility-title" title="Accessibility">
      <p>
        Give every dialog an accessible name with <code>aria-labelledby</code>
        or <code>aria-label</code>. The static <code>open</code> attribute shows
        a non-modal example. Production modal flows must also manage opening,
        closing and focus with the native dialog API.
      </p>
    </DemoSection>

    <DemoSection
      id="bottom-sheet-errors-title"
      title="Composition and common errors"
    >
      <p>
        Keep the heading inside the dialog and connect its identifier to the
        dialog. Do not present an unnamed sheet, and do not claim that the
        <code> open</code> attribute alone creates modal focus behavior.
      </p>
    </DemoSection>
  </DocPage>
);
