import Layout from "./layout";

let items = ["Overview", "Activity", "Reports", "Settings"];

export default () => (
  <Layout>
    <h1>Layout</h1>

    <h2>Navigation</h2>
    <p>Semantic nav with a current page.</p>
    <nav>
      {items.map((item) => (
        <a href="#" aria-current={item === "Overview" ? "page" : false}>
          {item}
        </a>
      ))}
      <button type="button">Refresh</button>
    </nav>

    <h2>Navigation inside a header</h2>
    <header>
      <h1>Project</h1>
      <nav>
        {items.map((item) => (
          <a href="#" aria-current={item === "Reports" ? "page" : false}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  </Layout>
);
