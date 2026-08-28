# Tables

Responsive data tables with semantic tones, compact spacing, internal separators and generated mobile cell labels.

## Responsive table

Below 800px, each `data-label` value becomes the visible heading for its cell.

```html
<table data-table>
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

## Table colors

Set data-table to a semantic color token to apply that tone to the responsive table. Dragonglass supports primary, accent, success, info, warning, danger, and default.

```html
<table data-table="primary">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

```html
<table data-table="accent">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

```html
<table data-table="success">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

```html
<table data-table="info">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

```html
<table data-table="warning">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

```html
<table data-table="danger">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

```html
<table data-table="default">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

## Compact spacing and internal borders

Add `compact` to set `0.5rem` padding on the caption, column headers, and cells. The compact spacing remains in effect when the table switches to its responsive presentation.

Add `border` to draw separators only between body cells. The separators follow the selected semantic color family. Without a color token, they use the default border color.

Tokens compose in any order. This example combines the primary tone with compact spacing and internal separators.

```html
<table data-table="primary compact border">
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>
```

## Table API

**Responsive table attributes**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-label | td attribute | Absent | Provides the visible mobile label generated by the responsive table CSS. |
| data-table | Table attribute | Absent | Its presence enables responsive table behavior. It accepts primary, accent, success, info, warning, danger or default for a semantic tone, plus compact for 0.5rem cell padding and border for internal body-cell separators. Tokens compose in any order. |
