# Tabs

Grouped details layout selected by data-tabs.

## Native grouped disclosures

```html
<section data-tabs>
  <details name="account-tabs" open>
    <summary>Overview</summary>
    <p>Account summary.</p>
  </details>
  <details name="account-tabs">
    <summary>Billing</summary>
    <p>Billing details.</p>
  </details>
</section>
```

## Rich panel content

```html
<section data-tabs>
  <details name="settings-tabs" open>
    <summary>Profile</summary>
    <p>Ada Lovelace</p>
  </details>
  <details name="settings-tabs">
    <summary>Contact</summary>
    <label for="tabs-email">Email</label>
    <input id="tabs-email" type="email" name="email">
  </details>
  <details name="settings-tabs">
    <summary>Security</summary>
    <p>Review sign-in settings.</p>
  </details>
</section>
```

## Layout behavior

`sibling-count()`, `sibling-index()`, and `::details-content` place the summaries in one tab row and align the open panel below them. The same markup also forms stacked native disclosures with accessible content and keyboard operation.

When a user requests reduced motion, summary color and border state changes occur without a transition.

## API

**Tab disclosure elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| section / details / summary | Element | Required | Matches direct details children and their direct summaries. |
| data-tabs | Attribute | Required | Aligns grouped details controls and places the open content below. |
| open | Attribute / state | Absent | Applies the active summary color and border. |
| --primary / --default-light / --spacing-4 | Token | Theme | Control the active marker, divider and panel spacing. |
