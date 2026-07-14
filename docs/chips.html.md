# Chips

Represent compact values, filters and selections with chips.

## Actions, links and values

Choose a button for an action, a link for navigation and a span for a read-only value so each chip keeps the correct native behavior.

[Forms](/dragonglass/forms.html.md) Read only

```html
<p>
  <button data-chip type="button">Action</button>
  <a data-chip href="/dragonglass/forms.html">Forms</a>
  <span data-chip>Read only</span>
</p>
```

## Semantic tones

Use semantic tones to reinforce a named state or category. Keep the text meaningful because color alone does not explain the value.

Primary Accent Passed Queued Review Blocked Default

```html
<p>
  <span data-chip="primary">Primary</span>
  <span data-chip="accent">Accent</span>
  <span data-chip="success">Passed</span>
  <span data-chip="info">Queued</span>
  <span data-chip="warning">Review</span>
  <span data-chip="danger">Blocked</span>
  <span data-chip="default">Default</span>
</p>
```

## Selection states

Active [Chips](/dragonglass/chips.html.md)

```html
<label data-chip="success">
  <input type="checkbox" checked /> Active
</label>
```

## API

**Chip elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| button / a / label / span | Element | Contextual | Choose semantics that match an action, link, input or value. |
| data-chip | Attribute | Required | Accepts primary, accent, success, info, warning, danger or default. |
| --chip-border / --chip-background / --chip-text | Token | Theme | Set the resting border, background and text colors. |
| --chip-active / --chip-active-text | Token | Theme | Set selected and pressed colors. |
| input:checked / aria-pressed=true / aria-current=true | State | False | Apply the active chip appearance for supported semantics. |

## Accessibility

Use a checkbox when a chip toggles a form value, `aria-pressed` for a toggle button and `aria-current="true"` only for the current link. Keep the visible label descriptive.

## Composition and common errors

A plain `span` is display-only and must not receive click behavior. Do not set active styling without exposing the same state in the checkbox, button or link semantics.
