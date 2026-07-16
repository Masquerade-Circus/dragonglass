# Utilities

Find focused spacing, layout, border, typography, elevation and color adjustments.

## Find a utility

The reference groups every documented utility family by purpose. Each table shows the class pattern, accepted values and available variants.

- [Spacing](#utilities-spacing)
- [Layout and stacking](#utilities-layout)
- [Grid containers](#utilities-grid)
- [Images and backgrounds](#utilities-media)
- [Borders and outlines](#utilities-borders)
- [Typography](#utilities-typography)
- [Elevation](#utilities-elevation)
- [Colors](#utilities-colors)

## Compose focused adjustments

A utility class changes one visual property or a small related set.

```html
<article class="relative z-1 p-4 shadow-base bg-default-lightest">
  <h2 class="text-xl font-semibold leading-tight text-primary-dark">Project summary</h2>
  <p class="mt-2 mb-4 text-default-dark">Utilities make focused visual adjustments.</p>
  <button class="bg-primary hover:bg-primary-dark focus:outline-2 focus:outline-primary">
    Open project
  </button>
</article>
```

## Constrain content width

Use `container` for the common fluid and centered page width. Combine `max-w-*` with `mx-auto` when an element needs a different limit. These classes add no padding.

```html
<section class="container">
  <h2>Application content</h2>
  <p>The container stays fluid until it reaches the configured maximum width.</p>
</section>

<p class="max-w-prose mx-auto">
  This text measure stays readable and preserves its vertical margins.
</p>
```

## Prefixes and special characters

Interactive variants place `focus:`, `active:` or `hover:` before a supported class. Color utilities also accept `before:` and `after:`. Fractional widths accept the responsive prefixes `sm:`, `md:`, `lg:` and `xl:`.

Colons and slashes appear directly inside the HTML class attribute. Authored CSS and DOM selectors use their escaped forms.

```html
<div class="grid-gutters">
  <section class="w-6/12 md:w-4/12 xl:w-3/12 p-4">Responsive column</section>
</div>
```

## Spacing

Spacing utilities read the shared spacing scale and apply one physical side or every side.

**Spacing utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| p-{size} \| pt-{size} \| pr-{size} \| pb-{size} \| pl-{size} | Padding | 0, px, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 | Sets padding on every side, top, right, bottom or left respectively. Variants: Base only |
| m-{size} \| mt-{size} \| mr-{size} \| mb-{size} \| ml-{size} | Margin | 0, px, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 | Sets margin on every side, top, right, bottom or left respectively. Variants: Base only |

## Layout and stacking

Layout utilities control positioning, stacking, fractional width and compact display behavior.

**Layout and stacking utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container | Centered container | 100% width, var(--container-max-width) maximum | Centers content with logical auto margins and adds no padding. Variants: Base only |
| max-w-{size} | Maximum width | sm (36rem), md (48rem), lg (64rem), xl (80rem), prose (65ch) | Limits width without changing the element width or margins. Variants: Base only |
| mx-auto | Horizontal centering | margin-inline: auto | Centers a width-constrained element without changing vertical margins. Variants: Base only |
| relative \| static \| absolute \| fixed \| sticky | Position | The class name is the position value | Sets the position property directly. Variants: Base only |
| z-{level} | Z-index | auto, negative-10, negative-1, 0, 1, 2, 3, 4, 6, 8, 12, 16, 1000 | Sets a documented z-index from the framework scale. Variants: Base only |
| w-{part}/{whole} | Fractional width | whole: 2 through 12; part: 1 through whole - 1 | Sets a fractional width. Responsive variants start at 576px, 768px, 992px and 1200px. Variants: Base, sm:, md:, lg:, xl: |
| inline | Inline display | No value | Uses inline-block display, resets positioned offsets and aligns the element vertically. Variants: Base only |
| w-full \| h-full \| h-auto | Full and automatic sizing | 100% width, 100% height, automatic height | Controls the media box before applying object-fit or background utilities. Variants: Base only |
| h-{size} \| min-h-{size} | Height and minimum height | 8 (2rem), 12 (3rem), 16 (4rem), 24 (6rem), 32 (8rem), 48 (12rem), 64 (16rem), 96 (24rem), 128 (32rem) | Sets height or minimum height from the quarter-rem framework scale. Variants: Base only |
| h-{viewport} \| min-h-{viewport} | Viewport height and minimum height | half-screen (50svh), three-quarter-screen (75svh), screen (100svh) | Sets height or minimum height relative to the small viewport. Variants: Base only |
| u-scrollable | Height helper | max-height: 360rem | Sets a maximum height while overflow behavior remains unchanged. Variants: Base only |

## Grid containers

Grid classes create wrapping flex rows whose direct children start at full width.

**Grid containers utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| grid | Grid container | Start alignment without gutters | Creates the base wrapping row. Variants: Base only |
| grid-center \| grid-end | Grid alignment | center, end | Aligns grid children along the row. The base grid class uses start alignment. Variants: Base only |
| grid-gutters | Guttered grid | 0.8rem child padding | Creates a grid row with consistent horizontal gutters. Variants: Base only |

## Images and backgrounds

Media utilities control image fitting, focal position, background sizing and repetition.

**Images and backgrounds utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| object-{fit} | Object fit | cover, contain, fill, none, scale-down | Sets object-fit on replaced elements such as img. Variants: Base only |
| object-{position} | Object position | top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right | Selects the visible focal point inside an image box. Variants: Base only |
| bg-auto \| bg-cover \| bg-contain | Background size | auto, cover, contain | Sets background-size without changing the image source. Variants: Base only |
| bg-{position} | Background position | top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right | Selects the background image focal point. Variants: Base only |
| bg-repeat \| bg-no-repeat | Background repeat | repeat, no-repeat | Controls background image repetition. Variants: Base only |

## Borders and outlines

Border and outline utilities separate width, style, offset and color for explicit composition.

**Borders and outlines utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| border | Border shorthand | 1px-scale width and solid style | Adds the default solid border. Variants: Base, focus:, active:, hover: |
| border-{size} | Border width | 0 through 13 | Sets border width from the border scale. Variants: Base, focus:, active:, hover: |
| outline | Outline shorthand | 1px-scale width and solid style | Adds the default solid outline. Variants: Base, focus:, active:, hover: |
| outline-none | Outline removal | none | Removes the outline. Variants: Base, focus:, active:, hover: |
| outline-{size} | Outline width | 0 through 13 | Sets outline width and a solid outline style. Variants: Base, focus:, active:, hover: |
| outline-{style} | Outline style | solid, dashed, dotted, double | Sets the outline style. Variants: Base, focus:, active:, hover: |
| outline-offset-{size} | Outline offset | 0, px, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 | Offsets the outline with a value from the spacing scale. Variants: Base, focus:, active:, hover: |

## Typography

Typography utilities control one font or text property and support interactive state variants.

**Typography utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text-{size} | Font size | 2xs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl | Sets font size from the framework scale. Variants: Base, focus:, active:, hover: |
| normal-style \| italic \| oblique | Font style | normal, italic, oblique | Sets font style. Variants: Base, focus:, active:, hover: |
| font-{weight} | Font weight | thin, extralight, light, normal, medium, semibold, bold, extrabold, black | Sets numeric font weight from 100 through 900. Variants: Base, focus:, active:, hover: |
| normal-case \| capitalize \| uppercase \| lowercase | Text transform | none, capitalize, uppercase, lowercase | Changes visual casing without changing source text. Variants: Base, focus:, active:, hover: |
| leading-{height} | Line height | none, tight, snug, normal, relaxed, loose | Sets line height from 1 through 2. Variants: Base, focus:, active:, hover: |
| text-{alignment} | Text alignment | left, right, center, justify | Sets physical text alignment. Variants: Base, focus:, active:, hover: |

## Elevation

Elevation utilities use token-backed outer and inset shadows with interactive state variants.

**Elevation utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shadow-{size} | Outer shadow | 2xs, xs, sm, base, lg, xl, 2xl, 3xl | Applies an outer shadow and its matching stacking level. Variants: Base, focus:, active:, hover: |
| shadow-inner-{size} | Inset shadow | 2xs, xs, sm, base, lg, xl, 2xl, 3xl | Applies an inset shadow. Variants: Base, focus:, active:, hover: |
| shadow-none | Shadow removal | none | Removes box shadow. Variants: Base, focus:, active:, hover: |
| text-shadow-sm \| text-shadow-base \| text-shadow-lg | Text shadow | sm, base, lg | Applies a compact token-colored shadow to improve text separation over media. Variants: Base only |
| text-shadow-none | Text shadow removal | none | Removes text shadow, including low-specificity defaults. Variants: Base only |
| animated | Transition | var(--animate-all) | Applies the framework transition to all animatable properties. Variants: Base only |

## Colors

Color utilities cover backgrounds, borders, outlines and text across every semantic family and weight.

**Colors utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| {kind}-{family}{weight} | Semantic color | kind: bg, border, outline, text; family: primary, accent, success, info, warning, danger, default; weight: lightest, lighter, light, base, dark, darker, darkest | Applies the selected semantic token. Base weight omits the weight suffix, such as bg-primary. Border colors require a border style to become visible. Variants: Base, focus:, active:, hover:, before:, after: |
| {kind}-white \| {kind}-black | Literal color | kind: bg, border, outline, text | Applies the literal white or black token. These utilities remain unchanged across color schemes. Variants: Base, focus:, active:, hover:, before:, after: |
| bg-transparent \| bg-scrim \| bg-media-scrim | Transparent background | transparent, var(--scrim), var(--media-scrim) | Sets only the background color and preserves the current text color. Variants: Base only |
