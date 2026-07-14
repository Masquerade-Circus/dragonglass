# Images

Object-fit, focal-position and background image utilities.

## Fit an image inside its box

Set the image box dimensions, then use an `object-*` utility to control the fit and focal point.

```html
<img
  src="https://picsum.photos/id/1018/1200/800"
  alt="Mountain landscape"
  class="w-full h-64 object-cover object-center"
>
```

## Move the image focal point

Position utilities use a nine-point grid shared with background images.

```html
<img
  src="https://picsum.photos/id/1018/1200/800"
  alt="Mountain landscape"
  class="w-full h-64 object-cover object-bottom-right"
>
```

## Position a background image

Keep the image URL in the standard `background-image` style. Utilities control size, position and repetition.

```html
<section
  class="min-h-64 bg-cover bg-bottom-right bg-no-repeat"
  style="background-image: url('https://picsum.photos/id/1018/1200/800')"
  role="img"
  aria-label="Mountain landscape"
></section>
```

## Adjust card media

Background utilities load after card defaults, so they can move a `data-media` focal point without changing the card contract.

```html
<section
  data-media
  class="bg-cover bg-bottom-right bg-no-repeat"
  style="background-image: url('https://picsum.photos/id/1018/1200/800')"
></section>
```

## API

**Image sizing, fitting, position and background utilities**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| w-full \| h-full \| h-auto | Sizing utility | width: auto; height: auto | Controls the media box width and height. |
| object-cover \| object-contain \| object-fill \| object-none \| object-scale-down | Object-fit utility | fill | Controls how an img fits inside its content box. |
| object-{position} | Object-position utility | center | Selects one of nine focal positions from top-left through bottom-right. |
| bg-auto \| bg-cover \| bg-contain | Background-size utility | auto | Controls the rendered background image size. |
| bg-{position} | Background-position utility | top-left | Selects one of the same nine focal positions for a background image. |
| bg-repeat \| bg-no-repeat | Background-repeat utility | repeat | Enables or disables background image repetition. |
