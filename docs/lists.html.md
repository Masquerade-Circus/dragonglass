# Lists

Display related items, details and actions in structured lists.

## Basic combinations

### Simple row

### Avatar

### Secondary icon

### Secondary icon and information

### Details

```html
<ul data-list>
  <li><span>Bryan Cranston</span></li>
</ul>

<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>Bryan Cranston</span>
    <span aria-label="Favorite"><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>Bryan Cranston</span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span><span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span></span>
  </li>
</ul>
```

## Combined display content

### Avatar and secondary icon

### Avatar, secondary icon and information

### Details, avatar, secondary icon and information

```html
<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
    <span aria-label="Favorite"><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>
      <i class="material-icons" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>
```

## Action combinations

### Primary action

### Primary action with avatar

### Primary and secondary actions

### Secondary action with information

### Primary action with details

### Avatar and secondary action

### Avatar, secondary action and information

### Details, avatar, secondary action and information

```html
<ul data-list>
  <li><button type="button">Bryan Cranston</button></li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">Bryan Cranston</button>
    <button type="button" aria-label="Add Bryan Cranston to favorites"><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">Bryan Cranston</button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
    <button type="button" aria-label="Add Bryan Cranston to favorites"><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">
      <i class="material-icons" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>
```

## Complete list

```html
<ul data-list>
  <li>
    <button type="button">
      <i class="material-icons bg-info" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
  <li>
    <button type="button">
      <i class="material-icons bg-primary" aria-hidden="true">person</i>
      <span>Aaron Paul<small>Played Jesse Pinkman in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Aaron Paul to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
  <li>
    <button type="button">
      <i class="material-icons bg-success" aria-hidden="true">person</i>
      <span>Bob Odenkirk<small>Played Saul Goodman in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bob Odenkirk to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>
```

## Numbered list

```html
<ol data-list>
  <li><span>Create the project</span></li>
  <li><span>Invite the team</span></li>
  <li><span>Publish the first release</span></li>
</ol>
```

## Definition list

- **Status:**
  Ready for review
- **Owner:**
  Documentation team

```html
<dl>
  <dt>Status</dt>
  <dd>Ready for review</dd>
  <dt>Owner</dt>
  <dd>Documentation team</dd>
</dl>
```

## API

**List elements and row regions**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ul[data-list] | Element and attribute | Unordered | Creates application rows whose order carries no meaning. |
| ol[data-list] | Element and attribute | Numbered | Creates numbered application rows whose sequence carries meaning. |
| li | Direct child | Required per row | Creates a row with a flexible primary region and an optional compact secondary region. |
| dl > dt + dd | Definition elements | Term and detail | Uses an intrinsic term column and a flexible detail column. |
| a / button | Interactive element | Optional | Use a link for navigation and type=button for an action inside a row. |

## Accessibility

Use unordered lists for collections and ordered lists for sequences. Use links for navigation and buttons for actions. Give icon-only secondary actions a specific accessible name and hide decorative icons with `aria-hidden="true"`.

## Composition and common errors
