import Layout from "./layout";

const appComponentLinks = [
  ["Toolbars", "/dragonglass/toolbars.html"],
  ["Search", "/dragonglass/search.html"],
  ["Chips", "/dragonglass/chips.html"],
  ["Alerts", "/dragonglass/alerts.html"],
  ["Expansion panels", "/dragonglass/expansion-panels.html"],
  ["Notifications", "/dragonglass/notifications.html"],
  ["Steppers", "/dragonglass/steppers.html"],
  ["Bottom sheets", "/dragonglass/bottom-sheets.html"],
  ["Tabs", "/dragonglass/tabs.html"],
];

export default () => (
  <Layout>
    <h2>App components</h2>
    <hr />
    <section data-card>
      <section>
        <h3>HTML5 app patterns</h3>
        <p>Each component page shows native HTML examples with Dragonglass styles.</p>
      </section>
      <dl>
        {appComponentLinks.map(([label, path]) => (
          <dt>
            <a href={path} v-route={path}>
              {label}
            </a>
          </dt>
        ))}
      </dl>
    </section>
  </Layout>
);
