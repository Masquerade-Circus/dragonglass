# Alerts

Alert surfaces with info, success, warning and danger tones.

## Semantic alerts

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
| data-alert | Attribute | Primary | Accepts info, success, warning or danger. |
| --alert-color / --alert-bg | Token | Primary theme colors | Set the accent border and alert background. |
| info / success / warning / danger | State | Primary | Maps the alert to a supported semantic tone. |
