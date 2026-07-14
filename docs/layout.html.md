# Layout

Responsive containers, direct-child content regions and toolbar layouts.

## Application shell

```html
<article>
  <header>
    <h3>Project Atlas</h3>
    <nav data-toolbar aria-label="Project actions">
      <a href="/projects.html">All projects</a>
      <button type="button">New task</button>
    </nav>
  </header>
  <section>
    <p>Track the work that is ready for review.</p>
  </section>
  <footer>
    <nav aria-label="Project sections">
      <a href="/overview.html" aria-current="page">Overview</a>
      <a href="/activity.html">Activity</a>
      <a href="/reports.html">Reports</a>
    </nav>
  </footer>
</article>
```

## Standalone toolbar

```html
<nav data-toolbar aria-label="Result actions">
  <button type="button">Filter</button>
  <a href="/exports.html">View exports</a>
</nav>
```

## Composition

A container is a `main` or `article` with direct `header`, `section` and `footer` children. The header and footer keep their natural height. The section receives the remaining height, padding and overflow.

The `data-toolbar` attribute turns a nav into a wrapping row with toolbar spacing and a divider.

## Responsive behavior

Standalone toolbars wrap when their actions exceed the current width. A toolbar nested in a header or footer stays on one row and overflows when its actions exceed the available width. Content sections own vertical scrolling and keep the page shell within the viewport.

## API

**Layout elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| main, article | Element | Column container | Establishes the container contract for direct header, section and footer children. |
| header, footer | Element | Intrinsic height | Keeps page-level or container-level chrome outside the scrolling content region. |
| section | Element | Flexible and scrollable | Fills the remaining container space and owns content padding when it is a direct child. |
| nav | Element | Horizontal row | Applies a horizontal, non-wrapping layout to links and buttons. |
| data-toolbar | Attribute | Absent | Turns a nav into a wrapping action row. Toolbars inside a header or footer stay on one row. |
| aria-current="page" | State | Absent | Applies the selected surface and text colors to a nav link. |
| --container-padding | Token | Theme value | Controls padding on the direct, scrollable content section. |
