# Hero recipes

Centered, split and presentation hero recipes composed from existing primitives.

These recipes combine semantic sections with existing grid, height, typography, spacing, button and link primitives. They introduce no hero-specific attribute or stylesheet.

## Centered

Use a half-screen minimum height and centered grid content for one message with primary and secondary actions.

## Make the next decision clear.

Use one focused message and a direct path forward.

[Start now](/dragonglass/app-components.html.md) [Read the details](/dragonglass/layout.html.md)

```html
<section class="grid-center grid-gutters min-h-half-screen pt-8 pb-8 text-center">
  <h2 class="md:w-10/12 text-5xl font-bold leading-tight mt-0 mb-4">Make the next decision clear.</h2>
  <p class="md:w-8/12 text-lg leading-relaxed mt-0 mb-4">Use one focused message and a direct path forward.</p>
  <p class="md:w-8/12 mt-0 mb-0">
    <a data-button href="/dragonglass/app-components.html">Start now</a>
    <a data-link="standalone" href="/dragonglass/layout.html">Read the details</a>
  </p>
</section>
```

## Split

Use fractional grid widths to pair the opening message with a compact supporting section.

## Plan the work. Keep the context.

Bring the decision and its supporting details into one opening view.

[Open workspace](/dragonglass/app-components.html.md)

### Today

Review the launch checklist and assign the remaining owners.

[View checklist](/dragonglass/app-components.html.md)

```html
<section class="grid grid-gutters min-h-three-quarter-screen pt-8 pb-8">
  <section class="md:w-7/12 pt-8 pb-8">
    <h2 class="text-5xl font-bold leading-tight mt-0 mb-4">Plan the work. Keep the context.</h2>
    <p class="text-lg leading-relaxed mt-0 mb-4">Bring the decision and its supporting details into one opening view.</p>
    <p class="mt-0 mb-0">
      <a data-button href="/dragonglass/app-components.html">Open workspace</a>
    </p>
  </section>
  <section class="md:w-5/12 p-6 border">
    <h3 class="text-2xl font-semibold leading-tight mt-0 mb-3">Today</h3>
    <p class="mt-0 mb-4">Review the launch checklist and assign the remaining owners.</p>
    <p class="mt-0 mb-0">
      <a data-link="standalone quiet" href="/dragonglass/app-components.html">View checklist</a>
    </p>
  </section>
</section>
```

## Presentation

Use the full small viewport and the largest display size when one idea should establish the page rhythm.

Annual report

## A year of steady progress.

Present one major idea with enough space for deliberate pacing.

[Read the report](/dragonglass/index.html.md)

```html
<section class="grid-center grid-gutters min-h-screen pt-8 pb-8">
  <p class="md:w-10/12 text-lg font-semibold mt-0 mb-3">Annual report</p>
  <h2 class="md:w-10/12 text-6xl font-bold leading-none mt-0 mb-6">A year of steady progress.</h2>
  <p class="md:w-8/12 text-xl leading-relaxed mt-0 mb-6">Present one major idea with enough space for deliberate pacing.</p>
  <p class="md:w-8/12 mt-0 mb-0">
    <a data-link="standalone" href="/dragonglass">Read the report</a>
  </p>
</section>
```
