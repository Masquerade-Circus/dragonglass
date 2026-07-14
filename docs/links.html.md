# Links

Inline, standalone and quiet link treatments for navigation and supporting actions.

## Inline link

Inline links keep a visible underline so they remain identifiable inside surrounding copy.

Read the [layout guide](/dragonglass/layout.html.md) before composing a page.

```html
<p>Read the <a data-link href="/dragonglass/layout.html">layout guide</a> before composing a page.</p>
```

## Standalone link

The `standalone` token presents a link as an independent action without giving it button semantics.

[View all components](/dragonglass/app-components.html.md)

```html
<p>
  <a data-link="standalone" href="/dragonglass/app-components.html">View all components</a>
</p>
```

## Quiet and combined links

The `quiet` token lowers resting emphasis. Tokens are space-separated and may be combined on the same `data-link` attribute.

Updated yesterday by [Ana](/dragonglass/index.html.md). [View activity](/dragonglass/app-components.html.md)

```html
<p>
  Updated yesterday by <a data-link="quiet" href="/dragonglass">Ana</a>.
  <a data-link="standalone quiet" href="/dragonglass/app-components.html">View activity</a>
</p>
```

## API

**Link elements, variants and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| a[data-link] | Element and attribute | Inline | Applies the persistent underline treatment to an anchor with an href. |
| standalone | Attribute token | Absent | Adds emphasis for a standalone action and reveals its underline on interaction. |
| quiet | Attribute token | Absent | Uses secondary text color until hover or focus restores primary text color. |
| standalone quiet | Combined attribute tokens | Absent | Combines standalone emphasis with the quieter resting color. |
| Focus state | State | Global link focus | Keeps the framework focus indicator in addition to each link treatment. |
