# Layout

Responsive containers, direct-child content regions and toolbar layouts.

## Application shell

```html
<article>
  <header>
    <h3>Project Atlas</h3>
    <nav aria-label="Project actions">
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
<nav aria-label="Result actions">
  <button type="button">Filter</button>
  <a href="/exports.html">View exports</a>
</nav>
```

## Shared container contract

`body`, `main`, `article`, `dialog`, `[data-card]` and `[data-layout]` share one structural contract. Each container creates a vertical flex layout, hides its own overflow and lets its direct children use the available space.

A direct `section` fills the remaining space and owns the scroll when the container has a limited height. It receives `var(--container-padding)` by default. Add `.p-0` to that section when its content must reach the container edges.

Direct `header` and `footer` regions remain outside the scrolling section. They use their natural height, `1rem` padding and a minimum height of `3.5rem`. A navigation region directly inside the footer has no outer margin.

```html
<div data-layout class="h-48">
  <header>
    <h3>Review queue</h3>
  </header>
  <section>
    <p>Items that are ready for review appear here.</p>
  </section>
  <footer>
    <nav aria-label="Queue actions">
      <button type="button">Refresh queue</button>
    </nav>
  </footer>
</div>
```

## Responsive behavior

A standalone `nav` wraps when its actions exceed the current width. Inside a header or footer, it stays on one row, removes its padding and divider, and overflows when its actions exceed the available width. Specialized navigation components, including breadcrumbs, replace the base presentation where their contract requires it. Content sections own vertical scrolling and keep the page shell within the viewport.

## API

**Layout elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| body, main, article, dialog, [data-card] | Element or selector | Column container | Applies the shared vertical layout contract to direct children. |
| data-layout | Attribute | Absent | Applies the shared vertical layout contract to another element. |
| header, footer | Element | 1rem padding, 3.5rem minimum height | Keeps direct container chrome at its natural height and outside the scrolling content region. |
| section | Element | Flexible and scrollable | Fills the remaining container space and owns content padding when it is a direct child. |
| .p-0 | Utility | Absent | Removes the default padding from a direct content section. |
| nav | Element | Wrapping action row | Lays out direct links and buttons with shared geometry and interactive states. Inside a header or footer, the row does not wrap and has no padding or divider. |
| aria-current="page" | State | Absent | Applies the selected surface and text colors to a nav link. |
| --container-padding | Token | Theme value | Controls padding on the direct, scrollable content section. |
