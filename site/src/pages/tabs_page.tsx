import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Tabs</h2>
    <hr />

    <section aria-labelledby="tabs-basic-title">
      <h3 id="tabs-basic-title">Basic tabs</h3>
      <section data-tabs>
        <details name="basic-tabs" open>
          <summary>Overview</summary>
          <p>Overview content stays in the page.</p>
        </details>
        <details name="basic-tabs">
          <summary>Usage</summary>
          <p>Usage content appears when this tab opens.</p>
        </details>
        <details name="basic-tabs">
          <summary>Limits</summary>
          <p>Details state controls which panel is visible.</p>
        </details>
      </section>
    </section>

    <section data-card aria-labelledby="tabs-card-title">
      <section>
        <h3 id="tabs-card-title">Tabs inside a card</h3>
        <section data-tabs>
          <details name="card-tabs" open>
            <summary>Profile</summary>
            <p>Ada Lovelace</p>
          </details>
          <details name="card-tabs">
            <summary>Billing</summary>
            <p>Plan renews next month.</p>
          </details>
        </section>
      </section>
    </section>

    <section aria-labelledby="tabs-form-title">
      <h3 id="tabs-form-title">Tabs with form content</h3>
      <section data-tabs>
        <details name="form-tabs" open>
          <summary>Account</summary>
          <fieldset>
            <legend>Name</legend>
            <input type="text" placeholder="Ada Lovelace" />
          </fieldset>
        </details>
        <details name="form-tabs">
          <summary>Security</summary>
          <fieldset>
            <legend>Email</legend>
            <input type="email" placeholder="ada@example.com" />
          </fieldset>
        </details>
      </section>
    </section>
  </Layout>
);
