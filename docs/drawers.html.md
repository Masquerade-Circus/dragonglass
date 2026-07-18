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

Place a `summary` followed by a direct `aside data-drawer` inside a `details data-trigger data-drawer-trigger` disclosure. The `data-drawer-trigger` attribute is a CSS hook and adds no JavaScript behavior. The native `open` attribute is the only state and opens or closes the drawer with a mouse click, Enter, or Space. Touch activation remains pending direct verification across the browser baseline.

A click outside the open drawer closes it and consumes that click, so a covered control does not activate by accident. Controls inside the drawer keep their native behavior. Give the complementary region a name with `aria-label` or `aria-labelledby`. This disclosure does not contain focus, restore focus, or promise Escape closure. Use it only when those limits fit the product flow.

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

A drawer starts at the left edge. Add `data-drawer="right"` to anchor it to the right edge. Browsers with native details-content and inert CSS support animate each entrance and exit. Browsers in the supported baseline without those features retain the native disclosure and change state immediately. Reduced motion also changes state without a transition or spatial offset.

## Migration for the next major release

This is a breaking change for the next major release. The former `section data-drawer` and `dialog data-drawer` structures are no longer supported. Replace either structure with `aside data-drawer`. A drawer may contain navigation, but a `nav` element is optional. The next major release removes support for the generic `[data-drawer]` selector, which is intentionally not preserved.

## API

**Drawer elements, attributes and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| aside[data-drawer] | Element | Persistent | Creates a standalone persistent drawer or a temporary drawer inside the required disclosure structure. |
| details[data-trigger][data-drawer-trigger] > summary + aside[data-drawer] | Structure | Required for temporary drawers | Marks the temporary drawer disclosure for CSS while native details state provides zero-JavaScript control. |
| data-drawer="right" | Attribute token | Left | Anchors the drawer to the right viewport edge. |
| open | Native details state | Absent | Shows the temporary drawer through its parent details. |
| --motion-duration-base / --motion-duration-fast / --motion-easing-enter / --motion-easing-exit | Motion token | 200ms / theme value / ease-out / ease-in | Control enhanced entrance and exit transitions where the browser supports them. |
