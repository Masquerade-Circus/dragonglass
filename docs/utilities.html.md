# Utilities

Compose focused spacing, layout, border, typography, elevation and color adjustments.

## Compose focused adjustments

A utility class changes one focused visual concern. Combine utilities with semantic HTML and component attributes instead of replacing the underlying element or component contract.

```html
<article class="relative z-1 p-4 shadow-base bg-default-lightest">
  <h2 class="text-xl font-semibold leading-tight text-primary-dark">Project summary</h2>
  <p class="mt-2 mb-4 text-default-dark">Utilities make focused visual adjustments.</p>
  <button class="bg-primary hover:bg-primary-dark focus:outline-2 focus:outline-primary">
    Open project
  </button>
</article>
```

## Prefixes and special characters

Interactive variants place `focus:`, `active:` or `hover:` before a supported class. Color utilities also accept `before:` and `after:`. Fractional widths accept the responsive prefixes `sm:`, `md:`, `lg:` and `xl:`.

Colons and slashes are written directly inside the HTML class attribute. Escape them only when referencing the class from authored CSS or a DOM selector.

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
| relative \| static \| absolute \| fixed \| sticky | Position | The class name is the position value | Sets the position property directly. Variants: Base only |
| z-{level} | Z-index | auto, negative-10, negative-1, 0, 1, 2, 3, 4, 6, 8, 12, 16, 1000 | Sets a documented z-index from the framework scale. Variants: Base only |
| w-{part}/{whole} | Fractional width | whole: 2 through 12; part: 1 through whole - 1 | Sets a fractional width. Responsive variants start at 576px, 768px, 992px and 1200px. Variants: Base, sm:, md:, lg:, xl: |
| inline | Inline display | No value | Uses inline-block display, resets positioned offsets and aligns the element vertically. Variants: Base only |
| u-scrollable | Height helper | max-height: 360rem | Sets a maximum height. It does not add overflow behavior by itself. Variants: Base only |

## Grid containers

Grid classes create wrapping flex rows whose direct children start at full width.

**Grid containers utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| grid | Grid container | Start alignment without gutters | Creates the base wrapping row. Variants: Base only |
| grid-center \| grid-end | Grid alignment | center, end | Aligns grid children along the row. The base grid class uses start alignment. Variants: Base only |
| grid-gutters | Guttered grid | 0.8rem child padding | Creates a grid row with consistent horizontal gutters. Variants: Base only |

## Borders and outlines

Border and outline utilities separate width, style, offset and color so each concern can be composed explicitly.

**Borders and outlines utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| border | Border shorthand | 1px-scale width and solid style | Adds the default solid border. Variants: Base, focus:, active:, hover: |
| border-{size} | Border width | 0 through 13 | Sets border width from the border scale. Variants: Base, focus:, active:, hover: |
| outline | Outline shorthand | 1px-scale width and solid style | Adds the default solid outline. Variants: Base, focus:, active:, hover: |
| outline-none | Outline removal | none | Removes the outline. Provide another visible focus indicator before using this utility. Variants: Base, focus:, active:, hover: |
| outline-{size} | Outline width | 0 through 13 | Sets outline width and a solid outline style. Variants: Base, focus:, active:, hover: |
| outline-{style} | Outline style | solid, dashed, dotted, double | Sets the outline style. Variants: Base, focus:, active:, hover: |
| outline-offset-{size} | Outline offset | 0, px, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 | Offsets the outline with a value from the spacing scale. Variants: Base, focus:, active:, hover: |

## Typography

Typography utilities control one font or text property and support interactive state variants.

**Typography utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text-{size} | Font size | 2xs, xs, sm, base, lg, xl, 2xl, 3xl | Sets font size from the framework scale. Variants: Base, focus:, active:, hover: |
| normal-style \| italic \| oblique | Font style | normal, italic, oblique | Sets font style. Variants: Base, focus:, active:, hover: |
| font-{weight} | Font weight | thin, extralight, light, normal, medium, semibold, bold, extrabold, black | Sets numeric font weight from 100 through 900. Variants: Base, focus:, active:, hover: |
| normal-case \| capitalize \| uppercase \| lowercase | Text transform | none, capitalize, uppercase, lowercase | Changes visual casing without changing source text. Variants: Base, focus:, active:, hover: |
| leading-{height} | Line height | none, tight, snug, normal, relaxed, loose | Sets line height from 1 through 2. Variants: Base, focus:, active:, hover: |
| text-{alignment} | Text alignment | left, right, center, justify | Sets physical text alignment. Variants: Base, focus:, active:, hover: |

## Elevation

Elevation utilities use token-backed outer and inset shadows and can react to interactive states.

**Elevation utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shadow-{size} | Outer shadow | 2xs, xs, sm, base, lg, xl, 2xl, 3xl | Applies an outer shadow and its matching stacking level. Variants: Base, focus:, active:, hover: |
| shadow-inner-{size} | Inset shadow | 2xs, xs, sm, base, lg, xl, 2xl, 3xl | Applies an inset shadow. Variants: Base, focus:, active:, hover: |
| shadow-none | Shadow removal | none | Removes box shadow. Variants: Base, focus:, active:, hover: |
| animated | Transition | var(--animate-all) | Applies the framework transition to all animatable properties. Variants: Base only |

## Colors

Color utilities cover backgrounds, borders, outlines and text across every semantic family and weight.

**Colors utility families**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| {kind}-{family}{weight} | Semantic color | kind: bg, border, outline, text; family: primary, accent, success, info, warning, danger, default; weight: lightest, lighter, light, base, dark, darker, darkest | Applies the selected semantic token. Base weight omits the weight suffix, such as bg-primary. Border colors require a border style to become visible. Variants: Base, focus:, active:, hover:, before:, after: |
| {kind}-white \| {kind}-black | Literal color | kind: bg, border, outline, text | Applies the literal white or black token. These utilities do not adapt between color schemes. Variants: Base, focus:, active:, hover:, before:, after: |

## Accessibility and common errors
