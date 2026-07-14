# Toolbars

Wrapping nav[data-toolbar] rows and container variants.

## Actions and links

```html
<nav data-toolbar aria-label="Editor actions">
  <button type="button">Save</button>
  <button type="button">Preview</button>
  <a href="/dragonglass/cards.html">Cards</a>
</nav>
```

## Filter chips

```html
<nav data-toolbar aria-label="Issue filters">
  <label data-chip>
    <input type="checkbox" checked> Open
  </label>
  <label data-chip>
    <input type="checkbox"> Assigned
  </label>
  <button type="button">Apply</button>
</nav>
```

## Header and footer toolbars

A toolbar wraps by default. Inside a header or footer it uses `flex-wrap: nowrap` and overflows when its actions exceed the available width.

### Project settings

```html
<header>
  <h3>Project settings</h3>
  <nav data-toolbar aria-label="Project actions">
    <button type="button">Share</button>
    <button type="button">Export</button>
  </nav>
</header>
<footer>
  <nav data-toolbar aria-label="Form actions">
    <button type="button">Cancel</button>
    <button type="submit">Save changes</button>
  </nav>
</footer>
```

## API

**Toolbar elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nav | Element | Required | Provides the nav[data-toolbar] selector host. |
| data-toolbar | Attribute | Required | Applies the flexible toolbar layout to a nav. |
| --spacing-2 / --spacing-3 | Token | Theme | Control the gap and default toolbar padding. |
| --border-size-1 / --default-light | Token | Theme | Control the toolbar divider. |
| header or footer ancestor | State | Wrapping | Removes padding and divider and prevents wrapping. |
