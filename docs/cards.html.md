# Cards

Basic, elevated, squared and full-width card variants.

## Basic and elevated cards

A basic card groups content in the normal page flow. The elevated variant adds stronger visual emphasis to the same structure.

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
    <p>This card uses the elevated variant.</p>
  </section>
</article>
```

## Header, content and footer

Direct header, section and footer regions separate the title, supporting content and action area.

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

A media region adds an image to the card content. The squared variant creates compact, equal-ratio tiles.

```html
<article data-card>
  <section data-media role="img" aria-label="Mountain ridge under a cloudy sky" style="background-image: url('https://picsum.photos/480/480')"></section>
  <section>
    <h3>Field report</h3>
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

The full-width variant gives summaries the complete content row instead of a compact card column.

```html
<article data-card="full-width">
  <header>
    <h3>Documentation status</h3>
  </header>
  <section>
    <p>The summary spans the full available content width.</p>
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
| data-card | Attribute | Basic | Accepts elevated, squared or full-width variant tokens. |
| data-media | Attribute | Absent | Creates a cover media region inside the card. |
| --card-padding / --card-radius / --card-shadow | Token | Theme | Control content spacing, corners and elevated shadow. |
| basic / elevated / squared / full-width | State / variant | Basic | Selects border, elevation, aspect ratio or width behavior. |
