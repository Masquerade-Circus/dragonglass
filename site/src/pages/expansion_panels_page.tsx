import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Expansion panels</h2>
    <hr />

    <section aria-labelledby="expansion-basic-title">
      <h3 id="expansion-basic-title">Basic panel</h3>
      <details data-expansion-panel>
        <summary>Billing details</summary>
        <p>Your plan renews next month.</p>
      </details>
    </section>

    <section aria-labelledby="expansion-open-title">
      <h3 id="expansion-open-title">Open by default</h3>
      <details data-expansion-panel open>
        <summary>Account status</summary>
        <p>Your account is active.</p>
      </details>
    </section>

    <section aria-labelledby="expansion-form-title">
      <h3 id="expansion-form-title">Panel with a form</h3>
      <details data-expansion-panel open>
        <summary>Contact</summary>
        <fieldset>
          <legend>Email</legend>
          <input type="email" placeholder="ada@example.com" />
        </fieldset>
        <button type="button">Save</button>
      </details>
    </section>
  </Layout>
);
