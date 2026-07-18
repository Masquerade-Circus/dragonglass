# Bottom sheets

Bottom-anchored dialog layout with an optional shadow.

## Open bottom sheet

This preview stays in the page flow so its content remains visible above the footer. In an app, mount the dialog as a direct child of the document root so fixed positioning and layering are not constrained by an ancestor stacking context.

```html
<dialog data-dialog="bottom-sheet" open aria-labelledby="filter-sheet-title">
  <header>
    <h3 id="filter-sheet-title">Filters</h3>
  </header>
  <section>
    <p>Choose the results to include.</p>
    <label class="mr-2"><input type="checkbox" name="availability"> Available now</label>
    <label class="mr-2"><input type="checkbox" name="delivery"> Free delivery</label>
  </section>
  <footer><button type="button">Apply filters</button></footer>
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

## Motion and accessibility

Discrete transitions and starting styles reveal the sheet through opacity and a short translation from the bottom. The `data-closing` state reverses those properties and keeps the backdrop synchronized. The modal stays open through the exit animation, then `close()` completes the flow.

When a user requests reduced motion, the sheet and its backdrop change state without transitions or spatial movement. The example connects the sheet to its heading with `aria-labelledby`. A sheet opened with `showModal()` blocks the page and supports Escape. Focus behavior follows the native dialog API.

## API

**Bottom sheet elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dialog | Element | Required | Receives the base dialog and open-state styling. |
| data-dialog=bottom-sheet | Attribute | Required | Anchors the dialog to the bottom edge. |
| data-dialog=no-shadow | Attribute token | Shadow | Removes the default dialog elevation. |
| open | Attribute / state | Absent | Displays the sheet. |
| --dialog-radius / --shadow-2xl | Token | Theme | Control the top corners and default elevation. |
| --motion-duration-base / --motion-easing-enter / --motion-easing-exit | Motion token | 200ms / ease-out / ease-in | Control supported opening and closing transitions for the sheet and backdrop. |
