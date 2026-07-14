# Tooltips

Add concise supporting context with tooltips.

## Default tooltip

This span has a tooltip

```html
<span data-tooltip="This is a tooltip" class="inline">This span has a tooltip</span>
```

## Tooltip colors

## Tooltip directions

## Necessary information

Publishing makes the current changes visible to everyone.

```html
<p id="publish-help">Publishing makes the current changes visible to everyone.</p>
<button type="button" aria-describedby="publish-help" data-tooltip="Makes changes visible">Publish changes</button>
```

## Tooltip API

**Tooltip attributes and color utilities**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-tooltip | HTML data attribute | Required | Supplies the visual text rendered by the::after pseudo-element. |
| data-tooltip-position | HTML data attribute | Top | Accepts top, bottom, left or right. Omit it for the top position. |
| after:bg-{color} | Pseudo-element color utility | bg-white | Sets the tooltip background to primary, accent, info, success, warning, danger or default. |

## Accessibility and common errors
