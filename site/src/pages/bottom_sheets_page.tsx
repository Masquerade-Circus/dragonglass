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
        ]}
      />
    </DemoSection>
  </DocPage>
);
