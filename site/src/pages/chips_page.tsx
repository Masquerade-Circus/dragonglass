import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Chips</h2>
    <hr />

    <section aria-labelledby="chips-basic-title">
      <h3 id="chips-basic-title">Basic chips</h3>
      <p>
        <button data-chip type="button">Action</button>{" "}
        <a data-chip href="/dragonglass/forms.html">Link</a>{" "}
        <span data-chip>Read only</span>
      </p>
    </section>

    <section aria-labelledby="chips-selectable-title">
      <h3 id="chips-selectable-title">Selectable chips</h3>
      <p>
        <label data-chip>
          <input type="checkbox" checked /> Active
        </label>{" "}
        <label data-chip>
          <input type="checkbox" /> Archived
        </label>{" "}
        <label data-chip>
          <input type="checkbox" /> Assigned
        </label>
      </p>
    </section>

    <section aria-labelledby="chips-toolbar-title">
      <h3 id="chips-toolbar-title">Chips in a toolbar</h3>
      <nav data-toolbar aria-label="Chip filters">
        <label data-chip>
          <input type="checkbox" checked /> Open
        </label>
        <label data-chip>
          <input type="checkbox" /> Critical
        </label>
        <button type="button">Clear</button>
      </nav>
    </section>
  </Layout>
);
