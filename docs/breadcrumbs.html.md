# Breadcrumbs

Wrapping breadcrumb trails built from direct link and button children.

## Linked trail

Add `data-breadcrumb` to a labeled `nav`. Place each anchor directly inside the nav and mark the current location with `aria-current="page"`.

```html
<nav data-breadcrumb aria-label="Breadcrumb">
  <a href="/dragonglass/app-components.html">Components</a>
  <a href="/dragonglass/layout.html">Foundations</a>
  <a href="/dragonglass/breadcrumbs.html" aria-current="page">Breadcrumbs</a>
</nav>
```

## Links and actions

A breadcrumb may mix direct anchors and buttons. Do not place lists, list items or wrapper elements inside the breadcrumb nav.

```html
<nav data-breadcrumb aria-label="File location">
  <button type="button">Workspace</button>
  <a href="/dragonglass">Documents</a>
  <button type="button" aria-current="page">Quarterly report</button>
</nav>
```

## API

The host supports only direct `a` and `button` children. Separators are visual borders, so source markup contains no generated separator text.

**Breadcrumb elements, child contract and current state**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nav[data-breadcrumb] | Element and attribute | Required | Creates a wrapping breadcrumb trail with separators between segments. |
| Direct a child | Supported child | None | Navigates to a location in the breadcrumb hierarchy. |
| Direct button child | Supported child | None | Runs an in-page location action without adding a wrapper or list element. |
| aria-current="page" | State | Absent | Identifies the current breadcrumb segment. |
| Child structure | Contract | Direct children only | Supports only anchors and buttons directly inside the nav, with no lists or wrappers. |
