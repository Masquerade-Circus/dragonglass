# Expansion panels

Reveal optional content in compact expansion panels.

## Collapsed and open panels

```html
<details data-expansion-panel open>
  <summary>Account status</summary>
  <p>Your account is active.</p>
</details>
```

## Panel with form content

Place related form controls inside the disclosed content so the summary names the task before the user opens it.

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

## API

**Expansion panel elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| details / summary | Element | Required | Provide native disclosure behavior and its visible control. |
| data-expansion-panel | Attribute | Required | Applies the full-width expansion panel treatment. |
| open | Attribute / state | Absent | Shows the panel content and rotates the disclosure marker. |
| --card-radius / --default-light | Token | Theme | Control panel corners and border color. |
| --spacing-3 / --spacing-4 | Token | Theme | Control summary and content spacing. |

## Accessibility

Keep `summary` as the first child of `details` and write a label that describes the hidden content. Native disclosure state and keyboard controls require no additional ARIA.

## Composition and common errors

Put interactive content after the summary. Do not replace the summary with a custom button, nest a second summary or add a competing click handler.
