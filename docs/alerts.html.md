# Alerts

Communicate important status and guidance with alerts.

## Semantic alerts

Match the tone to the outcome, then choose status for routine updates or alert for urgent information that needs immediate attention.

```html
<div data-alert="info" role="status">
  Your profile has unsaved changes.
</div>
<div data-alert="success" role="status">
  The invoice was paid successfully.
</div>
<div data-alert="warning" role="alert">
  Your storage is almost full.
</div>
<div data-alert="danger" role="alert">
  The payment method was rejected.
</div>
```

## Alert with supporting content

```html
<div data-alert="warning" role="alert">
  <strong>Review required.</strong>
  <p>The billing address has missing fields.</p>
</div>
```

## API

**Alert elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| div | Element | Example container | Provides a neutral container for the alert content. |
| data-alert | Attribute | Primary | Accepts info, success, warning or danger. |
| role=status / role=alert | Attribute | None | Selects polite status or urgent alert announcement behavior. |
| --alert-color / --alert-bg | Token | Primary theme colors | Set the accent border and alert background. |
| info / success / warning / danger | State | Primary | Maps the alert to a supported semantic tone. |

## Accessibility

Use `role="status"` for non-urgent updates and `role="alert"` for time-sensitive errors or warnings. Add a role when content appears dynamically, not merely to make static prose interrupt a screen reader.

## Composition and common errors

Apply `data-alert` to a suitable container. Put the outcome first, add recovery guidance when useful and never communicate severity by color alone.
