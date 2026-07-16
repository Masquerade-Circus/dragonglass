# Tables

Responsive data-table layout with generated mobile cell labels.

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

## Table API

**Responsive table attributes**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-label | td attribute | Absent | Provides the visible mobile label generated by the responsive table CSS. |
| data-table | Table attribute | Required for compact layout | Its presence enables the responsive layout. It accepts primary, accent, success, info, warning, danger or default for an optional tone. |
