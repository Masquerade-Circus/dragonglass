# Cards

Group related content and actions in flexible cards.

## Basic and elevated cards

Use a basic card for grouped content in the normal page flow. Use the elevated variant when the same structure needs stronger visual emphasis.

```html
<article data-card>
  <section>
    <h3>Release notes</h3>
    <p>Review the latest component changes.</p>
  </section>
</article>
```

```html
<article data-card="elevated">
  <section>
    <h3>Elevated card</h3>
    <p>Elevation adds emphasis without changing the content structure.</p>
  </section>
</article>
```

## Header, content and footer

Use direct header, section and footer regions when a card needs a title, supporting content and a separate action area.

```html
<article data-card>
  <header>
    <h3>Project update</h3>
    <nav aria-label="Card actions">
      <button data-button="fab" type="button" aria-label="Share project update">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </nav>
  </header>
  <section>
    <p>The accessibility review is ready.</p>
  </section>
  <footer>
    <a href="/dragonglass/alerts.html">Review alerts</a>
  </footer>
</article>
```

## Media and square cards

Use a media region for an image that supports the card content. Use the squared variant for compact, equal-ratio tiles whose content fits the constrained shape.

```html
<article data-card>
  <section data-media role="img" aria-label="Mountain ridge under a cloudy sky" style="background-image: url('https://picsum.photos/480/480')"></section>
  <section>
    <h3>Field report</h3>
    <p>The background image has an equivalent accessible name.</p>
  </section>
</article>
```

```html
<article data-card="squared">
  <section data-media class="bg-primary">
    <header>
      <h3>May release</h3>
    </header>
    <section>Available May 24 from 7 to 11 p.m.</section>
  </section>
</article>
```

## Full-width card

Use the full-width variant for summaries that need the complete content row instead of a compact card column.

```html
<article data-card="full-width">
  <header>
    <h3>Documentation status</h3>
  </header>
  <section>
    <p>Use the full available content width for longer summaries.</p>
  </section>
  <footer>
    <a href="/dragonglass">Browse documentation</a>
  </footer>
</article>
```

## API

**Card elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| article / section | Element | Contextual | Use article for standalone content or section for grouped content. |
| data-card | Attribute | Basic | Accepts elevated, squared or full-width variant tokens. |
| data-media | Attribute | Absent | Creates a cover media region inside the card. |
| --card-padding / --card-radius / --card-shadow | Token | Theme | Control content spacing, corners and elevated shadow. |
| basic / elevated / squared / full-width | State / variant | Basic | Selects border, elevation, aspect ratio or width behavior. |

## Accessibility

Preserve heading order inside each card. Give icon-only buttons an accessible name. A meaningful background image needs equivalent text, such as `role="img"` with `aria-label`. Decorative media should be hidden from assistive technology instead.

## Composition and common errors

Keep media, content and actions as direct card regions so the component selectors apply. Do not make the entire card clickable when it also contains independent buttons or links.
