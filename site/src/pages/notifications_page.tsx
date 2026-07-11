import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Notifications</h2>
    <hr />

    <section aria-labelledby="notifications-colors-title">
      <h3 id="notifications-colors-title">Semantic notifications</h3>
      <aside data-notification="info inline" role="status">
        Sync started.
      </aside>
      <aside data-notification="success inline" role="status">
        File uploaded successfully.
      </aside>
      <aside data-notification="warning inline" role="alert">
        Storage is almost full.
      </aside>
      <aside data-notification="danger inline" role="alert">
        Upload failed.
      </aside>
    </section>

    <section aria-labelledby="notifications-content-title">
      <h3 id="notifications-content-title">Notification with content</h3>
      <aside data-notification="success inline" role="status">
        <strong>Export ready.</strong>
        <p>Your report can be downloaded now.</p>
      </aside>
    </section>

    <section aria-labelledby="notifications-close-title">
      <h3 id="notifications-close-title">Notification with close action</h3>
      <aside data-notification="info inline" role="status">
        <button type="button" aria-label="Close">
          ×
        </button>
        <strong>Draft saved.</strong>
        <p>The close button is optional markup.</p>
      </aside>
    </section>

    <section aria-labelledby="notifications-position-title">
      <h3 id="notifications-position-title">Fixed positions</h3>
      <code>{'<aside data-notification="info top right">...</aside>'}</code>
      <code>
        {'<aside data-notification="warning bottom center">...</aside>'}
      </code>
      <code>{'<aside data-notification="danger center left">...</aside>'}</code>
    </section>

    <section aria-labelledby="notifications-shadow-title">
      <h3 id="notifications-shadow-title">Default shadow</h3>
      <aside data-notification="info inline" role="status">
        Notifications include elevation by default.
      </aside>
      <aside data-notification="info inline no-shadow" role="status">
        This notification removes its shadow explicitly.
      </aside>
    </section>

    <section aria-labelledby="notifications-stack-title">
      <h3 id="notifications-stack-title">Inline stack</h3>
      <div>
        <aside data-notification="info inline" role="status">
          One task is queued.
        </aside>
      </div>
      <div>
        <aside data-notification="warning inline" role="alert">
          Two tasks need review.
        </aside>
      </div>
    </section>
  </Layout>
);
