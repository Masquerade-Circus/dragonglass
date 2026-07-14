# Grid

Arrange content with the responsive grid system.

## Fractional columns

A grid starts mobile-first with full-width children. Fraction utilities divide a row with denominators from 2 through 12.

```html
<div class="grid">
  <div class="w-4/12"><div class="p-3 shadow-xs">Four of twelve columns</div></div>
  <div class="w-8/12"><div class="p-3 shadow-xs">Eight of twelve columns</div></div>
</div>
```

## Guttered columns

Use `grid-gutters` when columns need consistent spacing.

```html
<div class="grid-gutters">
  <div class="w-6/12"><div class="p-3 shadow-xs">First column</div></div>
  <div class="w-6/12"><div class="p-3 shadow-xs">Second column</div></div>
</div>
```

## Responsive columns

Unprefixed fractions apply at every width. Prefixed fractions take effect at their real minimum-width breakpoint and remain active until a later rule overrides them.

```html
<div class="grid-gutters">
  <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="p-3 shadow-xs">Responsive column</div></div>
  <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="p-3 shadow-xs">Responsive column</div></div>
</div>
```

## Grid API and breakpoints

**Grid classes and breakpoints**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| grid | Container class | Full-width children | Creates a wrapping flex row without gutters. |
| grid-gutters | Container class | 0.8rem gutters | Creates the same grid and adds horizontal container offsets plus 0.8rem child padding. |
| w-{part}/{whole} | Width utility | 1 through whole - 1 | Sets a fractional width. Both numbers range from 1 to 12 and part must be smaller than whole. |
| sm:w-{part}/{whole} | Responsive width | min-width: 576px | Applies the fraction at the small breakpoint and above. |
| md:w-{part}/{whole} | Responsive width | min-width: 768px | Applies the fraction at the medium breakpoint and above. |
| lg:w-{part}/{whole} | Responsive width | min-width: 992px | Applies the fraction at the large breakpoint and above. |
| xl:w-{part}/{whole} | Responsive width | min-width: 1200px | Applies the fraction at the extra-large breakpoint and above. |

## Accessibility and common errors
