# Elevations

Apply consistent depth and emphasis with elevation utilities.

## Outer shadows

Outer shadows range from `shadow-2xs` to `shadow-3xl`. Use stronger levels sparingly to indicate a surface that sits above nearby content.

```html
<div class="shadow-base bg-white p-4">Raised surface</div>
```

## Inner shadows

Inner shadows use the same scale with the `shadow-inner-` prefix.

```html
<div class="shadow-inner-base bg-white p-4">Inset surface</div>
```

## Interactive states

```html
<button type="button" class="shadow-base hover:shadow-3xl active:shadow-sm">Change elevation</button>
<input aria-label="Focus elevation example" class="shadow-base focus:shadow-3xl bg-white" value="Focus this field">
```

## Shadow tokens

Each outer utility reads its matching `--shadow-*` token, and each inset utility reads the matching `--shadow-inner-*` token. Override a token only when the theme needs a different elevation value across every use of that utility.

```html
<div class="shadow-base bg-white p-4">Token-backed surface</div>
```

**Outer and inner shadow tokens**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --shadow-2xs | CSS custom property | shadow-2xs | Outer shadow token used by shadow-2xs. |
| --shadow-inner-2xs | CSS custom property | shadow-inner-2xs | Inset shadow token used by shadow-inner-2xs. |
| --shadow-xs | CSS custom property | shadow-xs | Outer shadow token used by shadow-xs. |
| --shadow-inner-xs | CSS custom property | shadow-inner-xs | Inset shadow token used by shadow-inner-xs. |
| --shadow-sm | CSS custom property | shadow-sm | Outer shadow token used by shadow-sm. |
| --shadow-inner-sm | CSS custom property | shadow-inner-sm | Inset shadow token used by shadow-inner-sm. |
| --shadow-base | CSS custom property | shadow-base | Outer shadow token used by shadow-base. |
| --shadow-inner-base | CSS custom property | shadow-inner-base | Inset shadow token used by shadow-inner-base. |
| --shadow-lg | CSS custom property | shadow-lg | Outer shadow token used by shadow-lg. |
| --shadow-inner-lg | CSS custom property | shadow-inner-lg | Inset shadow token used by shadow-inner-lg. |
| --shadow-xl | CSS custom property | shadow-xl | Outer shadow token used by shadow-xl. |
| --shadow-inner-xl | CSS custom property | shadow-inner-xl | Inset shadow token used by shadow-inner-xl. |
| --shadow-2xl | CSS custom property | shadow-2xl | Outer shadow token used by shadow-2xl. |
| --shadow-inner-2xl | CSS custom property | shadow-inner-2xl | Inset shadow token used by shadow-inner-2xl. |
| --shadow-3xl | CSS custom property | shadow-3xl | Outer shadow token used by shadow-3xl. |
| --shadow-inner-3xl | CSS custom property | shadow-inner-3xl | Inset shadow token used by shadow-inner-3xl. |

## Z-index scale

Outer shadow utilities retain a z-index derived from their elevation level. Use `z-auto`, `z-negative-10`, `z-negative-1`, `z-0`, `z-1`, `z-2`, `z-3`, `z-4`, `z-6`, `z-8`, `z-12`, `z-16` or `z-1000` when stacking needs an explicit override.

```html
<div class="relative z-8">Navigation surface</div>
<div class="relative z-auto">Natural stacking order</div>
```

## Accessibility and common errors
