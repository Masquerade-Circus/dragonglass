# Notifications

Fixed and inline notifications with tone, position and shadow tokens.

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
  <p>Your report is ready to download.</p>
</aside>
```

## Fixed positions

Combine one vertical token with one horizontal token. The default is top right. Center stands alone or pairs with top, right, bottom or left.

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

A direct close button with `data-notification-close` receives absolute positioning and reserved space. The attribute provides the presentation and does not remove the notification.

## Responsive behavior

Fixed notifications stay within the viewport with a maximum width based on the page gap. Inline notifications use the available content width and remain in document flow.

## API

**Notification elements, attributes, states and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-notification | Attribute | Primary border, top right | Activates notification layout and accepts tone, position and shadow tokens. |
| data-notification-close | Button attribute | Optional | Styles a direct close button and reserves its space without removing the notification. |
| info\|success\|warning\|danger | Attribute token | Primary | Sets the semantic border color. |
| inline | Attribute token | Fixed | Keeps a notification in document flow and resets position transforms. |
| top\|right\|bottom\|left\|center | Attribute token | top right | Combines vertical and horizontal placement for fixed notifications. |
| no-shadow | Attribute token | --shadow-lg | Removes elevation. |
| --notification-color | Token | --primary-accent | Controls the notification border and is set by semantic tone tokens. |
