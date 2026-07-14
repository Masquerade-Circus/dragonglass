# Bottom sheets

Show contextual actions and content in bottom sheets.

## Open bottom sheet

```html
<dialog data-dialog="bottom-sheet" open aria-labelledby="filter-sheet-title">
  <header>
    <h3 id="filter-sheet-title">Filters</h3>
  </header>
  <section><p>Choose the results to include.</p></section>
</dialog>
```

## Structured content and actions

A bottom sheet can contain a header, a content section and a footer. The closed markup below remains hidden until the native `open` state is applied.

```html
<dialog data-dialog="bottom-sheet no-shadow" aria-labelledby="share-sheet-title">
  <header><h3 id="share-sheet-title">Share</h3></header>
  <section><p>Choose where to share this item.</p></section>
  <footer><button type="button">Copy link</button></footer>
</dialog>
```

## API

**Bottom sheet elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dialog | Element | Required | Provides native dialog semantics and hidden state. |
| data-dialog=bottom-sheet | Attribute | Required | Anchors the dialog to the bottom edge. |
| data-dialog=no-shadow | Attribute token | Shadow | Removes the default dialog elevation. |
| open | Attribute / state | Absent | Displays the sheet. Modal behavior still requires showModal(). |
| --dialog-radius / --shadow-2xl | Token | Theme | Control the top corners and default elevation. |

## Accessibility

Give every dialog an accessible name with `aria-labelledby` or `aria-label`. The static `open` attribute shows a non-modal example. Production modal flows must also manage opening, closing and focus with the native dialog API.

## Composition and common errors

Keep the heading inside the dialog and connect its identifier to the dialog. Do not present an unnamed sheet, and do not claim that the `open` attribute alone creates modal focus behavior.
