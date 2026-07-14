# Layout

Build responsive page structures with Dragonglass layout primitives.

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

Use `nav` for destination links. Add `data-toolbar` when the same row mixes compact links, buttons or chips as controls.

## Responsive behavior

Standalone toolbars wrap when their actions need more room. A toolbar nested in a header or footer stays on one row, so keep those action sets short. Content sections scroll instead of forcing the page shell beyond the viewport.

## Accessibility

Give every navigation region a distinct `aria-label` when a page contains more than one. Mark only the active destination with `aria-current="page"`. Keep headings in document order and use buttons for actions rather than links without destinations.

## Common mistakes

## API

**Layout elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| main, article | Element | Column container | Establishes the container contract for direct header, section and footer children. |
| header, footer | Element | Intrinsic height | Keeps page-level or container-level chrome outside the scrolling content region. |
| section | Element | Flexible and scrollable | Fills the remaining container space and owns content padding when it is a direct child. |
| nav | Element | Semantic navigation | Groups links or related actions and accepts an accessible label. |
| data-toolbar | Attribute | Absent | Turns a nav into a wrapping action row. Toolbars inside a header or footer stay on one row. |
| aria-current="page" | State | Absent | Identifies the link for the current page to assistive technology. |
| --container-padding | Token | Theme value | Controls padding on the direct, scrollable content section. |
