# Tooltips

Generated tooltip content, positions and color utilities.

## Default tooltip

```html
<span data-tooltip="This is a tooltip" class="inline">This span has a tooltip</span>
```

## Tooltip colors

Apply after:bg-{color} to select a semantic tooltip background. Dragonglass supports primary, accent, info, success, warning, danger, and default.

```html
<span data-tooltip="This is a primary tooltip" class="inline after:bg-primary">primary tooltip</span>
```

```html
<span data-tooltip="This is a accent tooltip" class="inline after:bg-accent">accent tooltip</span>
```

```html
<span data-tooltip="This is a info tooltip" class="inline after:bg-info">info tooltip</span>
```

```html
<span data-tooltip="This is a success tooltip" class="inline after:bg-success">success tooltip</span>
```

```html
<span data-tooltip="This is a warning tooltip" class="inline after:bg-warning">warning tooltip</span>
```

```html
<span data-tooltip="This is a danger tooltip" class="inline after:bg-danger">danger tooltip</span>
```

```html
<span data-tooltip="This is a default tooltip" class="inline after:bg-default">default tooltip</span>
```

## Tooltip directions

Set data-tooltip-position to bottom, left, or right. An omitted attribute places the tooltip above its trigger.

```html
<span data-tooltip="This tooltip opens bottom" data-tooltip-position="bottom" class="inline ml-16">bottom tooltip</span>
```

```html
<span data-tooltip="This tooltip opens left" data-tooltip-position="left" class="inline ml-16">left tooltip</span>
```

```html
<span data-tooltip="This tooltip opens right" data-tooltip-position="right" class="inline ml-16">right tooltip</span>
```

## Tooltip API

**Tooltip attributes and color utilities**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-tooltip | HTML data attribute | Required | Supplies the visual text rendered by the::after pseudo-element. |
| data-tooltip-position | HTML data attribute | Top | Accepts top, bottom, left or right. An absent attribute uses top. |
| after:bg-{color} | Pseudo-element color utility | bg-white | Sets the tooltip background to primary, accent, info, success, warning, danger or default. |
