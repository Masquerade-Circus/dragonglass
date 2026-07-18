# Progress

Determinate, indeterminate and spinner styles for progress elements.

## Determinate progress

Use `value` and `max` when the operation exposes measurable progress. Associate the element with a label or give it an accessible name.

Upload progress

```html
<label for="upload-progress">Upload progress</label>
<progress id="upload-progress" value="40" max="100" data-progress="primary">
  40%
</progress>
```

## Supported tones

```html
<progress value="20" max="100" data-progress="primary" aria-label="Primary progress">20%</progress>
<progress value="30" max="100" data-progress="accent" aria-label="Accent progress">30%</progress>
<progress value="40" max="100" data-progress="info" aria-label="Information progress">40%</progress>
<progress value="50" max="100" data-progress="success" aria-label="Successful progress">50%</progress>
<progress value="60" max="100" data-progress="warning" aria-label="Warning progress">60%</progress>
<progress value="70" max="100" data-progress="danger" aria-label="Danger progress">70%</progress>
```

## Indeterminate progress

Without a `value`, Dragonglass displays a continuous indeterminate bar. Give it an accessible name that describes the work in progress.

```html
<progress data-progress="primary" aria-label="Loading results"></progress>
<progress data-progress="warning" aria-label="Saving changes"></progress>
```

## Spinners

The `spinner` token creates a compact circular indicator and combines with one supported tone. Its accessible name must describe the operation instead of the visual spinner.

```html
<progress data-progress="spinner primary" aria-label="Loading"></progress>
<progress data-progress="spinner danger" aria-label="Retrying"></progress>
```

## Reduced motion

When a user requests reduced motion, indeterminate bars stop on a visible pulse and circular spinners remain visible without rotation. Dragonglass applies the same static result to WebKit and Gecko progress parts. The static indicator still means that work is in progress, not that the operation has completed.

## API

**Progress elements, attributes, tokens and states**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| progress | Element | Required | Receives the full-width base track. |
| value | Attribute | Absent | Its absence selects the continuous indeterminate presentation. |
| data-progress | Attribute | Primary bar | Accepts primary, accent, info, success, warning, danger and spinner. |
| --progress-color / --progress-track | Token | Primary / default-lighter | Set the indicator and track colors. |
| determinate / indeterminate / spinner | State | Indeterminate without value | Selects a measured bar, continuous bar or circular presentation. Continuous indicators become static when reduced motion is requested. |
