import Layout from "./layout";

export default () => (
  <Layout>
    <h2>Search</h2>
    <hr />

    <section aria-labelledby="search-basic-title">
      <h3 id="search-basic-title">Basic search</h3>
      <search>
        <form action="/dragonglass/search.html" role="search">
          <label>
            Search docs
            <input type="search" name="q" placeholder="Forms, buttons, cards" />
          </label>
          <button type="submit">Search</button>
        </form>
      </search>
    </section>

    <section aria-labelledby="search-toolbar-title">
      <h3 id="search-toolbar-title">Search in a toolbar</h3>
      <nav data-toolbar aria-label="Search toolbar">
        <search>
          <form action="/dragonglass/search.html" role="search">
            <label>
              Filter
              <input type="search" name="filter" placeholder="Search items" />
            </label>
            <button type="submit">Filter</button>
          </form>
        </search>
      </nav>
    </section>

    <section aria-labelledby="search-results-title">
      <h3 id="search-results-title">Static results</h3>
      <search>
        <form action="/dragonglass/search.html" role="search">
          <label>
            Component
            <input type="search" name="component" value="forms" />
          </label>
          <button type="submit">Search</button>
        </form>
      </search>
      <dl>
        <dt>
          <a href="/dragonglass/forms.html">Forms</a>
        </dt>
        <dd>Inputs, selects, sliders, switches and native pickers.</dd>
      </dl>
    </section>
  </Layout>
);
