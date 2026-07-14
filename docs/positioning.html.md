# Positioning

Fixed and absolute placement through directional data-position tokens.

## Fixed to the viewport

A bare `data-position` uses fixed positioning at the top right. Combine one vertical token with one horizontal token. The following examples remain as markup so they do not cover this reference page.

```html
<aside data-position>Top right by default</aside>
<aside data-position="top center">Top center</aside>
<aside data-position="bottom left">Bottom left</aside>
<aside data-position="center">Viewport center</aside>
```

## Absolute inside a container

Add `absolute` to change only the positioning mode. The parent below uses `relative` to establish the containing block.

Top left

Center

Bottom right

```html
<section class="relative min-h-64 border">
  <p data-position="absolute top left" class="bg-primary p-2">Top left</p>
  <p data-position="absolute center" class="bg-info p-2">Center</p>
  <p data-position="absolute bottom right" class="bg-success p-2">Bottom right</p>
</section>
```

## Supported combinations

Use corners, `top center`, `bottom center`, `left center`, `right center`, or `center`. Combinations with opposing edges are outside the contract.

## API

**Positioning attribute, tokens and composition requirements**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-position | Attribute | fixed top right | Activates viewport positioning with top-right offsets from the spacing scale. |
| absolute | Attribute token | fixed | Changes only the position mode to absolute. The containing block comes from an ancestor positioned by the application. |
| top \| right \| bottom \| left | Attribute token | top right | Selects one vertical edge and one horizontal edge using the standard spacing offset. |
| center | Attribute token | Absent | Centers both axes alone, or the remaining axis when paired with an edge token. |
| Positioned ancestor | Composition requirement | Application controlled | Provides the containing block for absolute positioning, commonly through the relative utility. |
