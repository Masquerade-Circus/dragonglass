import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Toolbars</h2>
    <hr />

    <section aria-labelledby="toolbar-actions-title">
      <h3 id="toolbar-actions-title">Action toolbar</h3>
      <nav data-toolbar aria-label="Editor actions">
        <button type="button">Save</button>
        <button type="button">Preview</button>
        <button type="button">Archive</button>
      </nav>
    </section>

    <section aria-labelledby="toolbar-links-title">
      <h3 id="toolbar-links-title">Navigation toolbar</h3>
      <nav data-toolbar aria-label="Documentation sections">
        <a href="/dragonglass/forms.html">Forms</a>
        <a href="/dragonglass/progress.html">Progress</a>
        <a href="/dragonglass/cards.html">Cards</a>
      </nav>
    </section>

    <section aria-labelledby="toolbar-header-title">
      <h3 id="toolbar-header-title">Header toolbar</h3>
      <header>
        <h4>Project settings</h4>
        <nav data-toolbar aria-label="Project actions">
          <button type="button">Share</button>
          <button type="button">Export</button>
          <button type="button" class="bg-danger">Delete</button>
        </nav>
      </header>
    </section>

    <section aria-labelledby="toolbar-chips-title">
      <h3 id="toolbar-chips-title">Toolbar with chips</h3>
      <nav data-toolbar aria-label="Filter actions">
        <label data-chip>
          <input type="checkbox" /> Open
        </label>
        <label data-chip>
          <input type="checkbox" /> Assigned
        </label>
        <button type="button">Apply</button>
      </nav>
    </section>
  </Layout>
);
