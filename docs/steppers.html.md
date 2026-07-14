# Steppers

Guide people through ordered, multi-step tasks.

## Current and completed steps

```html
<ol data-stepper>
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>
```

## Error state

Set `data-step="error"` on the failed step and keep `aria-current="step"` when that step still requires the user's attention.

```html
<ol data-stepper>
  <li data-step="done">Profile</li>
  <li data-step="error" aria-current="step">Payment</li>
  <li>Receipt</li>
</ol>
```

## Vertical and numbers-only layouts

Use the vertical layout when labels need more room. The numbers layout keeps the same text labels in the markup while CSS presents a compact sequence.

```html
<ol data-stepper="vertical">
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>
<ol data-stepper="numbers" aria-label="Checkout progress">
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Receipt</li>
</ol>
```

## API

**Stepper elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ol / li | Element | Required | Represent the ordered process and each step. |
| data-stepper | Attribute | Horizontal | Accepts vertical or numbers layout tokens. |
| aria-current=step | Attribute / state | Absent | Identifies the single current step. |
| data-step=done / error | Attribute / state | Upcoming | Marks completed or failed steps. |
| --primary / --success / --danger | Token | Theme | Color current, completed and failed states. |

## Accessibility

Preserve the ordered list and set `aria-current="step"` on exactly one item. Keep text labels in numbers-only layouts because CSS hides them visually while assistive technology can still announce them.

## Composition and common errors

Use `data-step` only for `done` and `error`. Do not mark every completed step as current, and do not remove labels to create a visual-only numbered sequence.
