# Menus

Positioned menus inside details[data-trigger].

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

The top and right tokens change the default bottom-left placement. Their combination opens the menu above the trigger and aligns it to the right edge.

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
| details / summary / menu / li | Element | Required | Matches the trigger, its direct menu and the menu's direct rows. |
| data-trigger | Attribute | Required | Provides the positioned disclosure context. |
| data-menu | Attribute | Bottom left | Accepts top, right or the combined top right tokens. |
| open | Attribute / state | Absent | Shows the menu through the parent details state. |
| --card-radius / --default-light / --white | Token | Theme | Control menu corners, border and background. |
