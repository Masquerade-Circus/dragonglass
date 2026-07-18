# Expansion panels

Full-width details panels with a generated open-state marker.

## Collapsed and open panels

```html
<details data-expansion-panel open>
  <summary>Account status</summary>
  <p>Your account is active.</p>
</details>
```

## Panel with form content

```html
<details data-expansion-panel open>
  <summary>Contact details</summary>
  <form>
    <label for="contact-email">Email</label>
    <input id="contact-email" type="email" name="email">
    <button type="submit">Save</button>
  </form>
</details>
```

## Colored panel

Apply a `bg-*` utility to `details` to color the complete panel, including its heading and content.

```html
<details class="bg-primary" data-expansion-panel open>
  <summary>Deployment status</summary>
  <p>The latest release is available.</p>
</details>
```

## Colored heading

Apply a `bg-*` utility to `summary` when only the panel heading needs a distinct color.

```html
<details data-expansion-panel open>
  <summary class="bg-accent">Security settings</summary>
  <p>Two-factor authentication is active.</p>
</details>
```

## Behavior and fallback

The native `details` element controls disclosure state. The open summary keeps a stable bottom border while its generated marker rotates. When a user requests reduced motion, the marker and summary change state without a transition. Content and keyboard operation do not depend on the animation.

## API

**Expansion panel elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| details / summary | Element | Required | Matches details[data-expansion-panel] and its direct summary. |
| data-expansion-panel | Attribute | Required | Applies the full-width expansion panel treatment. |
| open | Attribute / state | Absent | Rotates the generated disclosure marker. |
| --card-radius / --border-default | Token | Theme | Control panel corners and border color. |
| --spacing-3 / --spacing-4 | Token | Theme | Control summary and content spacing. |
| --motion-duration-fast / --motion-easing-standard | Motion token | 120ms / ease-in-out | Control the marker, border and summary state transitions. |
