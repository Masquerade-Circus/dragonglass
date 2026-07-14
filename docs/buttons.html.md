# Buttons

Base button styles, semantic color utilities and FAB variants.

## Plain and unavailable buttons

```html
<button type="button">Plain button</button>
<button type="button" disabled>Disabled button</button>
<button type="button" aria-disabled="true">ARIA-disabled button</button>
```

## Semantic tones

```html
<button type="button" class="bg-primary">Primary</button>
<button type="button" class="bg-accent">Accent</button>
<button type="button" class="bg-info">Info</button>
<button type="button" class="bg-success">Success</button>
<button type="button" class="bg-warning">Warning</button>
<button type="button" class="bg-danger">Danger</button>
<button type="button" class="bg-default">Default</button>
```

## Borders and focus outlines

```html
<button type="button" class="border-primary">Primary outline</button>
<button type="button" class="border-success-dark">Success outline</button>
<button type="button" class="border-danger-light">Danger outline</button>
<button
  type="button"
  class="bg-info focus:outline-2 focus:outline-offset-1 focus:outline-info-light"
>
  Visible focus outline
</button>
```

## Sizes

```html
<button type="button" class="bg-primary text-2xs">Compact</button>
<button type="button" class="bg-primary text-base">Default</button>
<button type="button" class="bg-primary text-xl">Large</button>
```

## Floating actions

```html
<button type="button" data-button="fab" class="bg-primary inline" aria-label="Add item">
  <i class="material-icons" aria-hidden="true">add</i>
</button>
<button
  type="button"
  data-button="fab no-shadow"
  class="bg-accent inline"
  aria-label="Edit item"
>
  <i class="material-icons" aria-hidden="true">edit</i>
</button>
```

## Responsive behavior

Buttons keep their labels on one line. A surrounding toolbar wraps when space is limited. FAB dimensions scale with their text size.

## API

**Button elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| button | Element | Plain | Receives the base button styling. |
| disabled | State | Absent | Applies unavailable opacity, cursor and pointer-event styles. |
| aria-disabled="true" | State | Absent | Applies the same visual unavailable state as disabled. |
| data-button="fab" | Attribute | Absent | Creates a circular floating action button with default elevation. |
| no-shadow | Attribute token | Shadow | Removes the default FAB elevation when included in data-button. |
| bg-{tone} | Class token | Transparent | Applies a semantic background tone such as primary, success or danger. |
| border-{tone}{weight} | Class token | No border | Creates an outlined treatment with an optional light or dark weight. |
| text-{size} | Class token | Inherited | Scales button text and the em-based button dimensions. |
| --button-disabled-opacity | Token | Theme value | Controls the visual emphasis of unavailable buttons. |
