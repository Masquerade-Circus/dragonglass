# Dialogs

Centered dialogs with shape, width and elevation variants.

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
  <section>Settings use the available viewport width.</section>
</dialog>

<dialog open class="static" data-dialog="no-shadow" aria-labelledby="embedded-dialog-title">
  <header><h3 id="embedded-dialog-title">Embedded decision</h3></header>
  <section>The surrounding surface supplies separation without elevation.</section>
</dialog>
```

## Composition

A dialog accepts direct `header`, `section` and `footer` children. The `static` utility keeps these open previews in the document flow. The default position centers the dialog.

## Responsive behavior

Standard dialogs size to their content. The `full-width` token leaves a one-rem viewport gap. Long body content scrolls without moving the header or footer actions.

## API

**Dialog elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dialog | Element | Closed | Receives centered, elevated surface styling. |
| open | State | Absent | Displays the dialog with its flex layout. |
| data-dialog="squared" | Attribute token | Standard shape | Applies the squared card dimensions and media layout. |
| full-width | Attribute token | Content width | Expands the dialog to the available viewport width with an outer gap. |
| no-shadow | Attribute token | --shadow-2xl | Removes dialog elevation. |
| --dialog-radius | Token | Theme value | Controls the corner radius of standard dialogs. |
