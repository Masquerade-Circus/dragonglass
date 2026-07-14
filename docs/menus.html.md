# Menus

Offer compact groups of navigation links and actions.

## Action menu

```html
<details data-trigger open>
  <summary>Account menu</summary>
  <menu>
    <li><a href="/dragonglass/forms.html">Profile settings</a></li>
    <li><button type="button">Sign out</button></li>
  </menu>
</details>
```

## Menu positions

Use top or right when the default bottom-left placement lacks space. Use both tokens when the menu must open above the trigger and align to its right edge.

```html
<details data-trigger>
  <summary>Top menu</summary>
  <menu data-menu="top">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
<details data-trigger>
  <summary>Right menu</summary>
  <menu data-menu="right">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
<details data-trigger>
  <summary>Top-right menu</summary>
  <menu data-menu="top right">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
```

## API

**Menu elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| details / summary / menu / li | Element | Required | Provide the trigger, positioned surface and native menu rows. |
| data-trigger | Attribute | Required | Provides the positioned disclosure context. |
| data-menu | Attribute | Bottom left | Accepts top, right or the combined top right tokens. |
| open | Attribute / state | Absent | Shows the menu through the parent details state. |
| --card-radius / --default-light / --white | Token | Theme | Control menu corners, border and background. |

## Accessibility

Use links for navigation and buttons for commands. Give every icon-only button an accessible name and mark its decorative icon `aria-hidden="true"`. The summary remains the keyboard control for opening and closing the menu.

## Composition and common errors

Keep the menu inside `details[data-trigger]`. Position it with space-separated `data-menu` tokens. Keep visible items as direct `li` children, and do not use an icon as the only unlabeled description of an action.
