import { routes } from "../routes";

let Header = () => (
  <header>
    <nav>
      <details data-trigger>
        <summary>
          <span class="material-icons">menu</span>
        </summary>
        <section data-drawer>
          <dl>
            {routes
              .filter(({ label }) => label !== "Home")
              .map(({ path, label, icon, color }) => (
                <dt>
                  <a href={path} v-route={path}>
                    <i class={`material-icons ${color}`}>{icon}</i>
                    {label}
                  </a>
                </dt>
              ))}
          </dl>
        </section>
      </details>
    </nav>
    <h1>Dragonglass</h1>
  </header>
);

let Footer = () => <footer />;
let Layout: any = (props: any, ...content: any[]) => [
  <Header />,
  <main>
    <section>{content}</section>
  </main>,
  <Footer />,
];

export default Layout;
