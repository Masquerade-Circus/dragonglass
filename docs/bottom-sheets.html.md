# Bottom sheets

Bottom-anchored dialog layout with an optional shadow.

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

The bottom sheet CSS targets direct header, section and footer children. The `open` attribute displays the sheet.

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
| dialog | Element | Required | Receives the base dialog and open-state styling. |
| data-dialog=bottom-sheet | Attribute | Required | Anchors the dialog to the bottom edge. |
| data-dialog=no-shadow | Attribute token | Shadow | Removes the default dialog elevation. |
| open | Attribute / state | Absent | Displays the sheet. |
| --dialog-radius / --shadow-2xl | Token | Theme | Control the top corners and default elevation. |
