# Notifications

Deliver timely, contextual messages with notifications.

## Status and alert messages

```html
<aside data-notification="info inline" role="status">Sync started.</aside>
<aside data-notification="success inline" role="status">File uploaded successfully.</aside>
<aside data-notification="warning inline" role="status">Storage is almost full.</aside>
<aside data-notification="danger inline" role="alert">Upload failed.</aside>
```

## Content and close action

```html
<aside data-notification="success inline" role="status">
  <button type="button" data-notification-close aria-label="Dismiss">
    <span aria-hidden="true">×</span>
  </button>
  <strong>Export ready.</strong>
  <p>Your report can be downloaded now.</p>
</aside>
```

## Fixed positions

Combine one vertical token with one horizontal token. The default is top right. Center can stand alone or pair with top, right, bottom or left.

```html
<aside data-notification="info top right" role="status">Saved.</aside>
<aside data-notification="warning bottom center" role="status">Storage is almost full.</aside>
<aside data-notification="danger center left" role="alert">Connection lost.</aside>
```

## Shadow

```html
<aside data-notification="info inline" role="status">Default shadow</aside>
<aside data-notification="info inline no-shadow" role="status">No shadow</aside>
```

## Composition

Use short text for a single update. Add a `strong` heading and paragraph when the message needs context. Place an optional close button with `data-notification-close` as a direct child so the notification reserves space for it. Application behavior must remove the message when that button is activated.

## Responsive behavior

Fixed notifications stay within the viewport with a maximum width based on the page gap. Inline notifications use the available content width and remain in document flow. Prefer inline placement for persistent guidance or narrow layouts where fixed messages could cover controls.

## Accessibility

Use `role="status"` for successful, informational and most warning updates. Reserve `role="alert"` for urgent failures that need immediate attention. Insert the live region when the message changes instead of rendering it long before the update. Give the close button an accessible name and mark its visual symbol `aria-hidden="true"`.

## Common mistakes

## API

**Notification elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| aside | Element | Fixed notification | Provides a complementary message container for notification content. |
| data-notification | Attribute | Primary border, top right | Activates notification layout and accepts tone, position and shadow tokens. |
| data-notification-close | Button attribute | Optional | Marks a direct child button as the close action without coupling styles to its accessible name. |
| info\|success\|warning\|danger | Attribute token | Primary | Sets the semantic border color without choosing announcement urgency. |
| inline | Attribute token | Fixed | Keeps a notification in document flow and resets position transforms. |
| top\|right\|bottom\|left\|center | Attribute token | top right | Combines vertical and horizontal placement for fixed notifications. |
| no-shadow | Attribute token | --shadow-lg | Removes elevation when a border or surrounding surface is sufficient. |
| role="status" | State | Recommended | Politely announces non-urgent updates without interrupting current speech. |
| role="alert" | State | Urgent errors only | Immediately announces a time-sensitive problem that needs attention. |
| --notification-color | Token | --primary | Controls the notification border and is set by semantic tone tokens. |
