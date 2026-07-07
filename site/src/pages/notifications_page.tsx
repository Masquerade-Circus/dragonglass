import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Notifications</h2>
    <hr />

    <section aria-labelledby="notifications-colors-title">
      <h3 id="notifications-colors-title">Semantic notifications</h3>
      <aside data-notification="info" role="status">Sync started.</aside>
      <aside data-notification="success" role="status">File uploaded successfully.</aside>
      <aside data-notification="warning" role="alert">Storage is almost full.</aside>
      <aside data-notification="danger" role="alert">Upload failed.</aside>
    </section>

    <section aria-labelledby="notifications-content-title">
      <h3 id="notifications-content-title">Notification with content</h3>
      <aside data-notification="success" role="status">
        <strong>Export ready.</strong>
        <p>Your report can be downloaded now.</p>
      </aside>
    </section>

    <section aria-labelledby="notifications-close-title">
      <h3 id="notifications-close-title">Notification with close action</h3>
      <aside data-notification="info" role="status">
        <button type="button" aria-label="Close">×</button>
        <strong>Draft saved.</strong>
        <p>The close button is optional markup.</p>
      </aside>
    </section>

    <section aria-labelledby="notifications-stack-title">
      <h3 id="notifications-stack-title">Static stack</h3>
      <aside data-notification="info" role="status">One task is queued.</aside>
      <aside data-notification="warning" role="alert">Two tasks need review.</aside>
    </section>
  </Layout>
);
