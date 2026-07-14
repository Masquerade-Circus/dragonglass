# Chips

Chip tones and checked, pressed and current visual states.

## Actions, links and values

[Forms](/dragonglass/forms.html.md) Read only

```html
<p>
  <button data-chip type="button">Action</button>
  <a data-chip href="/dragonglass/forms.html">Forms</a>
  <span data-chip>Read only</span>
</p>
```

## Semantic tones

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
<p>
  <label data-chip="success">
    <input type="checkbox" checked /> Active
  </label>
  <button data-chip type="button" aria-pressed="true">Pinned</button>
  <a data-chip href="/dragonglass/chips.html" aria-current="true">Chips</a>
</p>
```

## API

**Chip elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| button / a / label / span | Element | Contextual | Receives chip styling from data-chip. |
| data-chip | Attribute | Required | Accepts primary, accent, success, info, warning, danger or default. |
| --chip-border / --chip-background / --chip-text | Token | Theme | Set the resting border, background and text colors. |
| --chip-active / --chip-active-text | Token | Theme | Set selected and pressed colors. |
| input:checked / aria-pressed=true / aria-current=true | State | False | Selects the active chip appearance. |
