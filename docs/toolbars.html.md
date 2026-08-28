# Toolbars

Wrapping nav action rows and compact container variants.

## Actions and links

Every `nav` provides a wrapping action row. Direct links and buttons share the same height, spacing, alignment, hover treatment and current-page state. Give each navigation region an accessible name, as these examples do with `aria-label`.

```html
<nav aria-label="Editor actions">
  <button type="button">Save</button>
  <button type="button">Preview</button>
  <a href="/dragonglass/cards.html">Cards</a>
</nav>
```

## Filter chips

```html
<nav aria-label="Issue filters">
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

A toolbar wraps by default. Inside a header or footer it uses `flex-wrap: nowrap`, removes its padding and divider, and overflows when its actions exceed the available width.

### Project settings

```html
<header>
  <h3>Project settings</h3>
  <nav aria-label="Project actions">
    <button type="button">Share</button>
    <button type="button">Export</button>
  </nav>
</header>
<footer>
  <nav aria-label="Form actions">
    <button type="button">Cancel</button>
    <button type="submit">Save changes</button>
  </nav>
</footer>
```

## API

**Toolbar elements, tokens, contexts and overrides**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nav | Element | Required | Creates a wrapping action row with shared geometry and states for direct links and buttons. |
| --spacing-2 / --spacing-3 | Token | Theme | Control the gap and default toolbar padding. |
| --border-size-1 / --border-default | Token | Theme | Control the toolbar divider. |
| header or footer ancestor | State | Wrapping | Prevents wrapping and removes the nav padding and divider. |
| Specialized nav component | Override | Base nav presentation | Replaces the base presentation where a component such as breadcrumbs defines its own geometry and states. |
