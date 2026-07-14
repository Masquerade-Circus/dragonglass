# Tooltips

Generated tooltip content, positions and color utilities.

## Default tooltip

This span has a tooltip

```html
<span data-tooltip="This is a tooltip" class="inline">This span has a tooltip</span>
```

## Tooltip colors

## Tooltip directions

## Tooltip API

**Tooltip attributes and color utilities**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-tooltip | HTML data attribute | Required | Supplies the visual text rendered by the::after pseudo-element. |
| data-tooltip-position | HTML data attribute | Top | Accepts top, bottom, left or right. An absent attribute uses top. |
| after:bg-{color} | Pseudo-element color utility | bg-white | Sets the tooltip background to primary, accent, info, success, warning, danger or default. |
