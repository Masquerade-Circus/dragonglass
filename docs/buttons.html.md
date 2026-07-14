# Buttons

Present primary, secondary and floating actions with buttons.

## Plain and unavailable buttons

```html
<button type="button">Plain button</button>
<button type="button" disabled>Disabled button</button>
<button type="button" aria-disabled="true">Unavailable but focusable</button>
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

## Composition

Start with a native `button`. Add one background or border utility for emphasis, then a text-size utility only when the surrounding interface needs a different scale. Reserve a FAB for the primary action associated with the current view.

## Responsive behavior

Buttons keep their labels on one line. Let a surrounding toolbar wrap when space is limited, and keep action labels concise instead of shrinking tap targets. FAB dimensions scale with their text size.

## Accessibility

Use visible text for ordinary actions. Every icon-only button needs an `aria-label`, and its icon must use `aria-hidden="true"`. Prefer `disabled` when the action should leave the focus order. Use `aria-disabled` only when people still need to discover the action, and suppress activation in application logic.

## Common mistakes

## API

**Button elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| button | Element | Plain | Provides native button semantics, keyboard behavior and styling. |
| disabled | State | Absent | Removes a native button from interaction and sequential focus. |
| aria-disabled="true" | State | Absent | Announces an unavailable action while retaining focus. Application code must prevent activation. |
| data-button="fab" | Attribute | Absent | Creates a circular floating action button with default elevation. |
| no-shadow | Attribute token | Shadow | Removes the default FAB elevation when included in data-button. |
| bg-{tone} | Class token | Transparent | Applies a semantic background tone such as primary, success or danger. |
| border-{tone}{weight} | Class token | No border | Creates an outlined treatment with an optional light or dark weight. |
| text-{size} | Class token | Inherited | Scales button text and the em-based button dimensions. |
| --button-disabled-opacity | Token | Theme value | Controls the visual emphasis of unavailable buttons. |
