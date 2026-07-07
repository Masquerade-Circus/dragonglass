import Layout from "./layout";

export default () => (
  <Layout>
    <h1>HTML first app styles</h1>
    <p>Dragonglass styles semantic HTML by default. Use utilities when a component needs a custom color, spacing, shadow, type scale or focus treatment.</p>
    <section data-card>
      <section>
        <h2>Plain HTML</h2>
        <p>A card, button and form controls can look like an app without utility-heavy markup.</p>
        <a href="/dragonglass/app-components.html" v-route="/dragonglass/app-components.html">
          App components
        </a>
      </section>
    </section>
  </Layout>
);
