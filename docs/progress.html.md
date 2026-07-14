# Progress

Show determinate and indeterminate progress states.

## Determinate progress

Upload progress

```html
<label for="upload-progress">Upload progress</label>
<progress id="upload-progress" value="40" max="100" data-progress="primary">
  40%
</progress>
```

## Supported tones

Choose a supported tone that matches the status shown beside the bar. Keep a measurable value and maximum on every determinate example.

```html
<progress value="20" max="100" data-progress="primary" aria-label="Primary progress">20%</progress>
<progress value="30" max="100" data-progress="accent" aria-label="Accent progress">30%</progress>
<progress value="40" max="100" data-progress="info" aria-label="Information progress">40%</progress>
<progress value="50" max="100" data-progress="success" aria-label="Successful progress">50%</progress>
<progress value="60" max="100" data-progress="warning" aria-label="Warning progress">60%</progress>
<progress value="70" max="100" data-progress="danger" aria-label="Danger progress">70%</progress>
```

## Indeterminate progress

Omit `value` when the remaining duration or amount is unknown. An accessible name tells assistive technology which task is active.

```html
<progress data-progress="primary" aria-label="Loading results"></progress>
<progress data-progress="warning" aria-label="Saving changes"></progress>
```

## Spinners

Add the `spinner` token for a compact circular indicator, then pair it with one supported tone and a name for the active task.

```html
<progress data-progress="spinner primary" aria-label="Loading"></progress>
<progress data-progress="spinner danger" aria-label="Retrying"></progress>
```

## API

**Progress elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| progress | Element | Required | Provides native progress semantics. |
| value / max | Attribute | Indeterminate / 1 | Define measurable completion and its upper bound. |
| data-progress | Attribute | Primary bar | Accepts primary, accent, info, success, warning, danger and spinner. |
| --progress-color / --progress-track | Token | Primary / default-lighter | Set the indicator and track colors. |
| determinate / indeterminate / spinner | State | Indeterminate without value | Selects measured, animated bar or circular presentation. |

## Accessibility

Give every progress element a visible label or an accessible name. Use `value` and `max` only when progress is measurable. Omit `value` for an unknown duration so assistive technology announces an indeterminate state.

## Composition and common errors

Choose only tones backed by existing variables. The documented set omits `secondary` because no `--secondary` token is defined. Do not report a guessed percentage as determinate progress.
