# Dialogs

Focus attention on decisions and short tasks with dialogs.

## Dialog with actions

```html
<dialog open class="static" aria-labelledby="review-dialog-title">
  <header>
    <h3 id="review-dialog-title">Review changes</h3>
    <nav aria-label="Dialog actions">
      <button type="button" data-button="fab" class="inline" aria-label="Share review">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </nav>
  </header>
  <section>
    Confirm the title and owner before publishing this project.
  </section>
  <footer>
    <nav aria-label="Review decision">
      <button type="button">Cancel</button>
      <button type="button" class="bg-primary">Publish</button>
    </nav>
  </footer>
</dialog>
```

## Shape, width and elevation

```html
<dialog open class="static" data-dialog="squared" aria-labelledby="event-dialog-title">
  <section data-media class="bg-primary">
    <header>
      <h3 id="event-dialog-title">Team event</h3>
      <button type="button" data-button="fab" class="inline" aria-label="Share event">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </header>
    <section>May 24, 7:00 PM</section>
  </section>
</dialog>

<dialog open class="static" data-dialog="full-width" aria-labelledby="workspace-dialog-title">
  <header><h3 id="workspace-dialog-title">Workspace settings</h3></header>
  <section>Settings can use the available viewport width.</section>
</dialog>

<dialog open class="static" data-dialog="no-shadow" aria-labelledby="embedded-dialog-title">
  <header><h3 id="embedded-dialog-title">Embedded decision</h3></header>
  <section>Remove elevation when the surrounding surface supplies separation.</section>
</dialog>
```

## Composition

Compose a dialog from direct `header`, `section` and `footer` children. Keep the decision and its actions short. The `static` utility in these previews only keeps several open examples in the document flow. Omit it when the dialog should use its default centered position.

## Responsive behavior

Standard dialogs size to their content. The `full-width` token leaves a small viewport gap and works for wider tasks. Keep long content in the body section so it can scroll without moving the header or footer actions.

## Accessibility

Give every dialog a visible heading and connect it with `aria-labelledby`. Use the native `showModal()` method when the rest of the page must be inert, move focus to a useful control after opening, support Escape and return focus to the trigger after closing. Icon-only actions need an `aria-label` and a decorative icon marked `aria-hidden="true"`.

## Common mistakes

## API

**Dialog elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dialog | Element | Closed | Provides native dialog semantics and a centered, elevated surface. |
| open | State | Absent | Makes a non-modal dialog visible. Use showModal() for modal behavior. |
| aria-labelledby | Attribute | Required by guidance | Associates the dialog with the id of its visible heading. |
| data-dialog="squared" | Attribute token | Standard shape | Creates a compact square surface suited to concise media or content. |
| full-width | Attribute token | Content width | Expands the dialog to the available viewport width with an outer gap. |
| no-shadow | Attribute token | --shadow-2xl | Removes dialog elevation when another boundary provides separation. |
| --dialog-radius | Token | Theme value | Controls the corner radius of standard dialogs. |
