import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Alerts</h2>
    <hr />

    <section aria-labelledby="alerts-colors-title">
      <h3 id="alerts-colors-title">Semantic alerts</h3>
      <blockquote data-alert="info">Your profile has unsaved changes.</blockquote>
      <blockquote data-alert="success">The invoice was paid successfully.</blockquote>
      <blockquote data-alert="warning">Your storage is almost full.</blockquote>
      <blockquote data-alert="danger">The payment method was rejected.</blockquote>
    </section>

    <section aria-labelledby="alerts-content-title">
      <h3 id="alerts-content-title">Alert with content</h3>
      <blockquote data-alert="warning">
        <strong>Review required.</strong>
        <p>The billing address has missing fields.</p>
      </blockquote>
    </section>

    <section data-card aria-labelledby="alerts-card-title">
      <section>
        <h3 id="alerts-card-title">Alert inside a card</h3>
        <blockquote data-alert="danger">Session access changed recently.</blockquote>
      </section>
    </section>
  </Layout>
);
