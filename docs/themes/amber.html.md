# Themes

# Dark themes

# Colors

Use the color palette for backgrounds, borders and text.

## Background and text colors

Each semantic color includes lightest, lighter, light, base, dark, darker and darkest tokens. White and black remain the global contrast extremes.

Primary dark text

```html
<div class="bg-primary p-3">Primary background</div>
<p class="text-primary-dark">Primary dark text</p>
```

## Buttons by color

Each semantic family can style an action. The visible label preserves meaning when two colors look similar.

```html
<button type="button" class="bg-primary">primary</button>
<button type="button" class="bg-accent">accent</button>
<button type="button" class="bg-info">info</button>
<button type="button" class="bg-success">success</button>
<button type="button" class="bg-warning">warning</button>
<button type="button" class="bg-danger">danger</button>
<button type="button" class="bg-default">default</button>
```

## Form fields by color

Use colored fields for documented states or categories. Keep a label and supporting text because color alone cannot explain the state.

```html
<fieldset data-field="primary">
  <label for="primary-field">primary field</label>
  <input id="primary-field" name="primary-field" type="text" aria-describedby="primary-field-help">
  <small id="primary-field-help">Uses the primary theme color.</small>
</fieldset>
<fieldset data-field="accent">
  <label for="accent-field">accent field</label>
  <input id="accent-field" name="accent-field" type="text" aria-describedby="accent-field-help">
  <small id="accent-field-help">Uses the accent theme color.</small>
</fieldset>
<fieldset data-field="info">
  <label for="info-field">info field</label>
  <input id="info-field" name="info-field" type="text" aria-describedby="info-field-help">
  <small id="info-field-help">Uses the info theme color.</small>
</fieldset>
<fieldset data-field="success">
  <label for="success-field">success field</label>
  <input id="success-field" name="success-field" type="text" aria-describedby="success-field-help">
  <small id="success-field-help">Uses the success theme color.</small>
</fieldset>
<fieldset data-field="warning">
  <label for="warning-field">warning field</label>
  <input id="warning-field" name="warning-field" type="text" aria-describedby="warning-field-help">
  <small id="warning-field-help">Uses the warning theme color.</small>
</fieldset>
<fieldset data-field="danger">
  <label for="danger-field">danger field</label>
  <input id="danger-field" name="danger-field" type="text" aria-describedby="danger-field-help">
  <small id="danger-field-help">Uses the danger theme color.</small>
</fieldset>
<fieldset data-field="default">
  <label for="default-field">default field</label>
  <input id="default-field" name="default-field" type="text" aria-describedby="default-field-help">
  <small id="default-field-help">Uses the default theme color.</small>
</fieldset>
```

## Interactive color states

```html
<button type="button" class="bg-primary-dark hover:bg-primary active:bg-primary-light">Background states</button>
<input aria-label="Color focus example" class="p-3 text-primary-dark focus:text-primary" value="Focus this field">
```

## Compile a theme from one color

The Sass theme module derives every semantic family, weight, foreground and progress color from one opaque primary. Every base uses its lightest family token as foreground. The primary must have OKLCH lightness between 42% and 56%, and that pair must reach 4.5:1. Compile the result and load it after `dragonglass.css`.

```scss
@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}
```

```sh
bunx sass --pkg-importer=node theme.scss theme.css --style=compressed
```

Place each mixin call inside a theme selector when one stylesheet must contain several themes.

```scss
@use "pkg:dragonglass/theme" as dragonglass;

[data-theme="violet"] {
  @include dragonglass.tokens(#7c3aed);
}

[data-theme="forest"] {
  @include dragonglass.tokens(#167c55);
}
```

## Automatic dark mode

Each theme derives dark structural roles from the same primary and follows `prefers-color-scheme` automatically. Set `data-color-scheme` on the root element only when the application must force light or dark mode.

```html
<html data-color-scheme="dark"></html>
```

## Color tokens

Use the semantic custom properties when a component needs token values directly instead of a generated color utility class.

```html
<div style="background-color: var(--primary); color: var(--primary-darker)">
  Primary token preview
</div>
```

**Semantic color custom properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --primary-lightest | CSS color token | primary | Used by bg-primary-lightest, text-primary-lightest, border-primary-lightest and outline-primary-lightest. |
| --primary-lighter | CSS color token | primary | Used by bg-primary-lighter, text-primary-lighter, border-primary-lighter and outline-primary-lighter. |
| --primary-light | CSS color token | primary | Used by bg-primary-light, text-primary-light, border-primary-light and outline-primary-light. |
| --primary | CSS color token | primary | Used by bg-primary, text-primary, border-primary and outline-primary. |
| --primary-dark | CSS color token | primary | Used by bg-primary-dark, text-primary-dark, border-primary-dark and outline-primary-dark. |
| --primary-darker | CSS color token | primary | Used by bg-primary-darker, text-primary-darker, border-primary-darker and outline-primary-darker. |
| --primary-darkest | CSS color token | primary | Used by bg-primary-darkest, text-primary-darkest, border-primary-darkest and outline-primary-darkest. |
| --accent-lightest | CSS color token | accent | Used by bg-accent-lightest, text-accent-lightest, border-accent-lightest and outline-accent-lightest. |
| --accent-lighter | CSS color token | accent | Used by bg-accent-lighter, text-accent-lighter, border-accent-lighter and outline-accent-lighter. |
| --accent-light | CSS color token | accent | Used by bg-accent-light, text-accent-light, border-accent-light and outline-accent-light. |
| --accent | CSS color token | accent | Used by bg-accent, text-accent, border-accent and outline-accent. |
| --accent-dark | CSS color token | accent | Used by bg-accent-dark, text-accent-dark, border-accent-dark and outline-accent-dark. |
| --accent-darker | CSS color token | accent | Used by bg-accent-darker, text-accent-darker, border-accent-darker and outline-accent-darker. |
| --accent-darkest | CSS color token | accent | Used by bg-accent-darkest, text-accent-darkest, border-accent-darkest and outline-accent-darkest. |
| --info-lightest | CSS color token | info | Used by bg-info-lightest, text-info-lightest, border-info-lightest and outline-info-lightest. |
| --info-lighter | CSS color token | info | Used by bg-info-lighter, text-info-lighter, border-info-lighter and outline-info-lighter. |
| --info-light | CSS color token | info | Used by bg-info-light, text-info-light, border-info-light and outline-info-light. |
| --info | CSS color token | info | Used by bg-info, text-info, border-info and outline-info. |
| --info-dark | CSS color token | info | Used by bg-info-dark, text-info-dark, border-info-dark and outline-info-dark. |
| --info-darker | CSS color token | info | Used by bg-info-darker, text-info-darker, border-info-darker and outline-info-darker. |
| --info-darkest | CSS color token | info | Used by bg-info-darkest, text-info-darkest, border-info-darkest and outline-info-darkest. |
| --success-lightest | CSS color token | success | Used by bg-success-lightest, text-success-lightest, border-success-lightest and outline-success-lightest. |
| --success-lighter | CSS color token | success | Used by bg-success-lighter, text-success-lighter, border-success-lighter and outline-success-lighter. |
| --success-light | CSS color token | success | Used by bg-success-light, text-success-light, border-success-light and outline-success-light. |
| --success | CSS color token | success | Used by bg-success, text-success, border-success and outline-success. |
| --success-dark | CSS color token | success | Used by bg-success-dark, text-success-dark, border-success-dark and outline-success-dark. |
| --success-darker | CSS color token | success | Used by bg-success-darker, text-success-darker, border-success-darker and outline-success-darker. |
| --success-darkest | CSS color token | success | Used by bg-success-darkest, text-success-darkest, border-success-darkest and outline-success-darkest. |
| --warning-lightest | CSS color token | warning | Used by bg-warning-lightest, text-warning-lightest, border-warning-lightest and outline-warning-lightest. |
| --warning-lighter | CSS color token | warning | Used by bg-warning-lighter, text-warning-lighter, border-warning-lighter and outline-warning-lighter. |
| --warning-light | CSS color token | warning | Used by bg-warning-light, text-warning-light, border-warning-light and outline-warning-light. |
| --warning | CSS color token | warning | Used by bg-warning, text-warning, border-warning and outline-warning. |
| --warning-dark | CSS color token | warning | Used by bg-warning-dark, text-warning-dark, border-warning-dark and outline-warning-dark. |
| --warning-darker | CSS color token | warning | Used by bg-warning-darker, text-warning-darker, border-warning-darker and outline-warning-darker. |
| --warning-darkest | CSS color token | warning | Used by bg-warning-darkest, text-warning-darkest, border-warning-darkest and outline-warning-darkest. |
| --danger-lightest | CSS color token | danger | Used by bg-danger-lightest, text-danger-lightest, border-danger-lightest and outline-danger-lightest. |
| --danger-lighter | CSS color token | danger | Used by bg-danger-lighter, text-danger-lighter, border-danger-lighter and outline-danger-lighter. |
| --danger-light | CSS color token | danger | Used by bg-danger-light, text-danger-light, border-danger-light and outline-danger-light. |
| --danger | CSS color token | danger | Used by bg-danger, text-danger, border-danger and outline-danger. |
| --danger-dark | CSS color token | danger | Used by bg-danger-dark, text-danger-dark, border-danger-dark and outline-danger-dark. |
| --danger-darker | CSS color token | danger | Used by bg-danger-darker, text-danger-darker, border-danger-darker and outline-danger-darker. |
| --danger-darkest | CSS color token | danger | Used by bg-danger-darkest, text-danger-darkest, border-danger-darkest and outline-danger-darkest. |
| --default-lightest | CSS color token | default | Used by bg-default-lightest, text-default-lightest, border-default-lightest and outline-default-lightest. |
| --default-lighter | CSS color token | default | Used by bg-default-lighter, text-default-lighter, border-default-lighter and outline-default-lighter. |
| --default-light | CSS color token | default | Used by bg-default-light, text-default-light, border-default-light and outline-default-light. |
| --default | CSS color token | default | Used by bg-default, text-default, border-default and outline-default. |
| --default-dark | CSS color token | default | Used by bg-default-dark, text-default-dark, border-default-dark and outline-default-dark. |
| --default-darker | CSS color token | default | Used by bg-default-darker, text-default-darker, border-default-darker and outline-default-darker. |
| --default-darkest | CSS color token | default | Used by bg-default-darkest, text-default-darkest, border-default-darkest and outline-default-darkest. |

## Accessibility and common errors
