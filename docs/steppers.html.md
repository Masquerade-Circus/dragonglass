# Steppers

Horizontal, vertical and numbers-only stepper presentations.

## Current and completed steps

1. Account
2. Billing
3. Confirm

```html
<ol data-stepper>
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>
```

## Error state

`data-step="error"` changes the marker to the danger state. `aria-current="step"` adds the current-step color and weight.

1. Profile
2. Payment
3. Receipt

```html
<ol data-stepper>
  <li data-step="done">Profile</li>
  <li data-step="error" aria-current="step">Payment</li>
  <li>Receipt</li>
</ol>
```

## Vertical and numbers-only layouts

The vertical layout gives labels more room. The numbers layout keeps the same text labels in the markup while CSS presents a compact sequence.

1. Account
2. Billing
3. Confirm

1. Account
2. Billing
3. Receipt

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
| ol / li | Element | Required | Matches direct li children of ol[data-stepper]. |
| data-stepper | Attribute | Horizontal | Accepts vertical or numbers layout tokens. |
| aria-current=step | Attribute / state | Absent | Applies the current-step color and weight. |
| data-step=done / error | Attribute / state | Upcoming | Marks completed or failed steps. |
| --primary / --success / --danger | Token | Theme | Color current, completed and failed states. |
