# Fonts

Font size, style, weight, transform, line-height and alignment utilities.

## Composed typography

Dragonglass typography utility preview.

```html
<p class="text-base italic font-light capitalize text-justify leading-loose">Dragonglass typography utility preview.</p>
```

## Font sizes

text-2xs (0.75rem)

text-xs (0.8rem)

text-sm (0.9rem)

text-base (1rem)

text-lg (1.25rem)

text-xl (1.5rem)

text-2xl (1.965rem)

text-3xl (2.25rem)

text-4xl (3rem)

text-5xl (3.75rem)

text-6xl (4.5rem)

```html
<p class="text-2xs">text-2xs (0.75rem)</p>
<p class="text-xs">text-xs (0.8rem)</p>
<p class="text-sm">text-sm (0.9rem)</p>
<p class="text-base">text-base (1rem)</p>
<p class="text-lg">text-lg (1.25rem)</p>
<p class="text-xl">text-xl (1.5rem)</p>
<p class="text-2xl">text-2xl (1.965rem)</p>
<p class="text-3xl">text-3xl (2.25rem)</p>
<p class="text-4xl">text-4xl (3rem)</p>
<p class="text-5xl">text-5xl (3.75rem)</p>
<p class="text-6xl">text-6xl (4.5rem)</p>
```

## Style, weight and layout utilities

### Styles

normal-style

italic

oblique

### Weights

font-thin

font-extralight

font-light

font-normal

font-medium

font-semibold

font-bold

font-extrabold

font-black

### Text transforms

normal-case

capitalize

uppercase

lowercase

### Line heights

leading-none

leading-tight

leading-snug

leading-normal

leading-relaxed

leading-loose

### Alignment

text-left

text-right

text-center

text-justify

Typography utilities

```html
<p class="font-semibold leading-relaxed text-left">Typography utilities</p>
```

## Typography API

**Typography utilities and tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text-2xs | Font size utility | 0.75rem | Uses --font-size-2xs. |
| text-xs | Font size utility | 0.8rem | Uses --font-size-xs. |
| text-sm | Font size utility | 0.9rem | Uses --font-size-sm. |
| text-base | Font size utility | 1rem | Uses --font-size-base. |
| text-lg | Font size utility | 1.25rem | Uses --font-size-lg. |
| text-xl | Font size utility | 1.5rem | Uses --font-size-xl. |
| text-2xl | Font size utility | 1.965rem | Uses --font-size-2xl. |
| text-3xl | Font size utility | 2.25rem | Uses --font-size-3xl. |
| text-4xl | Font size utility | 3rem | Uses --font-size-4xl. |
| text-5xl | Font size utility | 3.75rem | Uses --font-size-5xl. |
| text-6xl | Font size utility | 4.5rem | Uses --font-size-6xl. |
| normal-style \| italic \| oblique | Font style utility | normal-style | Sets the font-style property. |
| font-thin through font-black | Font weight utility | font-normal (400) | Sets numeric weights from 100 through 900. |
| normal-case \| capitalize \| uppercase \| lowercase | Text transform utility | normal-case | Changes visual casing without changing source text. |
| leading-none through leading-loose | Line height utility | leading-normal (1.5) | Sets line height from 1 through 2. |
| text-left \| text-right \| text-center \| text-justify | Text alignment utility | Browser direction | Sets physical text alignment. |
