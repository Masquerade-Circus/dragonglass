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

## Motion and accessibility

Starting styles, inert CSS interactivity, and the native details content pseudo-element reveal the menu from `opacity: 0` and `scale(.98)`. The open state uses `opacity: 1` and `scale(1)`. During close, the content remains visible for the animation while its actions stay inactive.

Reduced motion changes the menu state without a transition or transform. Native `details` and `summary` provide keyboard operation. Every icon-only action has an accessible name.

## API

**Menu elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| details / summary / menu / li | Element | Required | Matches the trigger, its direct menu and the menu's direct rows. |
| data-trigger | Attribute | Required | Provides the positioned disclosure context. |
| data-menu | Attribute | Bottom left | Accepts top, right or the combined top right tokens. |
| open | Attribute / state | Absent | Shows the menu through the parent details state. |
| --card-radius / --surface-raised / --text-primary / --border-default | Token | Theme | Control menu corners, surface, text and border colors. |
| --motion-duration-fast / --motion-duration-base / --motion-easing-enter / --motion-easing-exit | Motion token | 120ms / 200ms / ease-out / ease-in | Control the menu's opacity and transform transition without changing its state contract. |
