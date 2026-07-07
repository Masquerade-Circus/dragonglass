import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Bottom sheets</h2>
    <hr />

    <section aria-labelledby="bottom-sheet-open-title">
      <h3 id="bottom-sheet-open-title">Open sheet</h3>
      <dialog data-bottom-sheet open>
        <header>
          <h4>Filters</h4>
        </header>
        <section>
          <fieldset>
            <legend>Status</legend>
            <label data-chip>
              <input type="checkbox" checked /> Open
            </label>{" "}
            <label data-chip>
              <input type="checkbox" /> Closed
            </label>
          </fieldset>
        </section>
        <footer>
          <nav data-toolbar aria-label="Filter actions">
            <button type="button">Apply</button>
            <button type="button">Reset</button>
          </nav>
        </footer>
      </dialog>
    </section>

    <section aria-labelledby="bottom-sheet-closed-title">
      <h3 id="bottom-sheet-closed-title">Closed sheet markup</h3>
      <dialog data-bottom-sheet>
        <header>
          <h4>Share</h4>
        </header>
        <section>
          <p>Closed dialogs keep their native hidden state.</p>
        </section>
      </dialog>
    </section>
  </Layout>
);
