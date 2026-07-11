import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Progress</h2>
    <hr />
    <section aria-labelledby="progress-colors-title">
      <h3 id="progress-colors-title">Colors</h3>
      <progress value="40" max="100" data-progress="primary">
        40%
      </progress>
      <progress value="60" max="100" data-progress="success">
        60%
      </progress>
      <progress value="80" max="100" data-progress="danger">
        80%
      </progress>
    </section>

    <section aria-labelledby="progress-indeterminate-title">
      <h3 id="progress-indeterminate-title">Indeterminate</h3>
      <progress data-progress="primary" aria-label="Loading" />
      <progress data-progress="warning" aria-label="Saving" />
    </section>

    <section aria-labelledby="progress-spinner-title">
      <h3 id="progress-spinner-title">Spinner</h3>
      <progress data-progress="spinner primary" aria-label="Loading" />
      <progress data-progress="spinner danger" aria-label="Retrying" />
    </section>
  </Layout>
);
