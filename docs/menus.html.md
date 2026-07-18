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

Browsers that support starting styles, inert CSS interactivity and the native details content pseudo-element reveal the menu from `opacity: 0` and `scale(.98)` on every opening, then preserve its content long enough to animate each close without keeping its actions interactive. The open state uses `opacity: 1` and `scale(1)`. Browsers without this support change state immediately.

When a user requests reduced motion, the menu changes state without a transition or transform. Keep the native `details` and `summary` relationship so keyboard users can operate the disclosure, and give every icon-only action an accessible name.

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
