# Drawers

Persistent and temporary complementary regions at either viewport edge.

## Persistent drawer

Use `aside data-drawer` for a persistent complementary region. The drawer may contain navigation, controls, or supporting content and stays fixed at the requested viewport edge. Navigation is optional.

This preview stays inside its frame so you can inspect the drawer without covering the rest of the page.

```html
<aside data-drawer aria-label="Workspace shortcuts">
  <section class="h-48 relative bg-primary">
    <h2 data-position="absolute bottom left">Workspace</h2>
  </section>
  <nav aria-label="Workspace shortcuts">
    <ul data-list>
      <li><a href="/projects"><i class="material-icons" aria-hidden="true">folder</i> Projects</a></li>
      <li><a href="/activity"><i class="material-icons" aria-hidden="true">history</i> Recent activity</a></li>
    </ul>
  </nav>
</aside>
```

## Temporary drawer

Place a `summary` followed by a direct `aside data-drawer` inside a `details data-trigger data-drawer-trigger` disclosure. The `data-drawer-trigger` attribute is a CSS hook and adds no JavaScript behavior. The native `open` attribute is the only state and opens or closes the drawer with a click, Enter, or Space.

A click outside the open drawer closes it and consumes that click, so a covered control stays inactive. Controls inside the drawer keep their native behavior. The complementary region receives its accessible name from `aria-label` or `aria-labelledby`. Focus stays in the native document order. Escape leaves the disclosure open.

The first preview remains visible for inspection. The interactive demo below starts closed and lets you open or close the temporary drawer.

```html
<details data-trigger data-drawer-trigger>
  <summary>Open filters</summary>
  <aside data-drawer="right" aria-labelledby="project-filters-title">
    <section class="h-48 relative bg-primary">
      <h2 id="project-filters-title" data-position="absolute bottom left">Filter projects</h2>
    </section>
    <form aria-label="Project filters">
      <ul data-list>
        <li><label><i class="material-icons" aria-hidden="true">check_circle</i><input type="checkbox" name="active"> Active projects</label></li>
        <li><label><i class="material-icons" aria-hidden="true">group</i><input type="checkbox" name="shared"> Shared with me</label></li>
      </ul>
    </form>
  </aside>
</details>
```

## Position and motion

A drawer starts at the left edge. Add `data-drawer="right"` to anchor it to the right edge. The open state moves the drawer into view. Native details content and inert CSS define the entrance and exit transitions. Reduced motion changes state without a transition or spatial offset.

## API

**Drawer elements, attributes and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| aside[data-drawer] | Element | Persistent | Creates a standalone persistent drawer or a temporary drawer inside the required disclosure structure. |
| details[data-trigger][data-drawer-trigger] > summary + aside[data-drawer] | Structure | Required for temporary drawers | Marks the temporary drawer disclosure for CSS while native details state provides zero-JavaScript control. |
| data-drawer="right" | Attribute token | Left | Anchors the drawer to the right viewport edge. |
| open | Native details state | Absent | Shows the temporary drawer through its parent details. |
| --motion-duration-base / --motion-duration-fast / --motion-easing-enter / --motion-easing-exit | Motion token | 200ms / theme value / ease-out / ease-in | Control the entrance and exit transition timing. |
