# Tabs

Switch between related sections with accessible tabs.

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

Each disclosure can contain text or form controls. Give every sibling the same name so opening one panel closes the other panels in the group.

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

## API

**Tab disclosure elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| section / details / summary | Element | Required | Build the container, disclosure panels and controls. |
| data-tabs | Attribute | Required | Aligns grouped details controls and places the open content below. |
| name | Attribute | Ungrouped | A shared value lets the browser keep one details panel open. |
| open | Attribute / state | Absent | Marks the currently expanded disclosure. |
| --primary / --default-light / --spacing-4 | Token | Theme | Control the active marker, divider and panel spacing. |

## Accessibility

This component uses native `details` and `summary` disclosures. It is not an ARIA tablist and does not implement tab, arrow-key or tabpanel roles. Keep every summary descriptive and every panel available in the document.

## Composition and common errors

Give sibling details the same non-empty `name` when they must behave as a group. Keep only `details` as direct children of the tabs container because the enhanced layout derives each tab position from that sibling order.

Browsers without the required modern CSS keep the native disclosures in a stacked layout. Do not add ARIA tab roles without implementing the complete keyboard and focus contract.
