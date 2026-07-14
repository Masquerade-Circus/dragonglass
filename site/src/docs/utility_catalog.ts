type UtilityFamily = {
  pattern: string;
  type: string;
  values: string;
  variants: string;
  description: string;
};

type UtilityGroup = {
  id: string;
  title: string;
  description: string;
  families: UtilityFamily[];
};

const interactiveVariants = "Base, focus:, active:, hover:";
const colorVariants = `${interactiveVariants}, before:, after:`;
const spacingValues = "0, px, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16";

const utilityGroups: UtilityGroup[] = [
  {
    id: "spacing",
    title: "Spacing",
    description:
      "Spacing utilities read the shared spacing scale and apply one physical side or every side.",
    families: [
      {
        pattern: "p-{size} | pt-{size} | pr-{size} | pb-{size} | pl-{size}",
        type: "Padding",
        values: spacingValues,
        variants: "Base only",
        description:
          "Sets padding on every side, top, right, bottom or left respectively.",
      },
      {
        pattern: "m-{size} | mt-{size} | mr-{size} | mb-{size} | ml-{size}",
        type: "Margin",
        values: spacingValues,
        variants: "Base only",
        description:
          "Sets margin on every side, top, right, bottom or left respectively.",
      },
    ],
  },
  {
    id: "layout",
    title: "Layout and stacking",
    description:
      "Layout utilities control positioning, stacking, fractional width and compact display behavior.",
    families: [
      {
        pattern: "relative | static | absolute | fixed | sticky",
        type: "Position",
        values: "The class name is the position value",
        variants: "Base only",
        description: "Sets the position property directly.",
      },
      {
        pattern: "z-{level}",
        type: "Z-index",
        values:
          "auto, negative-10, negative-1, 0, 1, 2, 3, 4, 6, 8, 12, 16, 1000",
        variants: "Base only",
        description: "Sets a documented z-index from the framework scale.",
      },
      {
        pattern: "w-{part}/{whole}",
        type: "Fractional width",
        values: "whole: 2 through 12; part: 1 through whole - 1",
        variants: "Base, sm:, md:, lg:, xl:",
        description:
          "Sets a fractional width. Responsive variants start at 576px, 768px, 992px and 1200px.",
      },
      {
        pattern: "inline",
        type: "Inline display",
        values: "No value",
        variants: "Base only",
        description:
          "Uses inline-block display, resets positioned offsets and aligns the element vertically.",
      },
      {
        pattern: "w-full | h-full | h-auto",
        type: "Full and automatic sizing",
        values: "100% width, 100% height, automatic height",
        variants: "Base only",
        description:
          "Controls the media box before applying object-fit or background utilities.",
      },
      {
        pattern: "h-{size} | min-h-{size}",
        type: "Height and minimum height",
        values:
          "8 (2rem), 12 (3rem), 16 (4rem), 24 (6rem), 32 (8rem), 48 (12rem), 64 (16rem), 96 (24rem), 128 (32rem)",
        variants: "Base only",
        description:
          "Sets height or minimum height from the quarter-rem framework scale.",
      },
      {
        pattern: "h-{viewport} | min-h-{viewport}",
        type: "Viewport height and minimum height",
        values:
          "half-screen (50svh), three-quarter-screen (75svh), screen (100svh)",
        variants: "Base only",
        description:
          "Sets height or minimum height relative to the small viewport.",
      },
      {
        pattern: "u-scrollable",
        type: "Height helper",
        values: "max-height: 360rem",
        variants: "Base only",
        description:
          "Sets a maximum height while overflow behavior remains unchanged.",
      },
    ],
  },
  {
    id: "grid",
    title: "Grid containers",
    description:
      "Grid classes create wrapping flex rows whose direct children start at full width.",
    families: [
      {
        pattern: "grid",
        type: "Grid container",
        values: "Start alignment without gutters",
        variants: "Base only",
        description: "Creates the base wrapping row.",
      },
      {
        pattern: "grid-center | grid-end",
        type: "Grid alignment",
        values: "center, end",
        variants: "Base only",
        description:
          "Aligns grid children along the row. The base grid class uses start alignment.",
      },
      {
        pattern: "grid-gutters",
        type: "Guttered grid",
        values: "0.8rem child padding",
        variants: "Base only",
        description: "Creates a grid row with consistent horizontal gutters.",
      },
    ],
  },
  {
    id: "media",
    title: "Images and backgrounds",
    description:
      "Media utilities control image fitting, focal position, background sizing and repetition.",
    families: [
      {
        pattern: "object-{fit}",
        type: "Object fit",
        values: "cover, contain, fill, none, scale-down",
        variants: "Base only",
        description: "Sets object-fit on replaced elements such as img.",
      },
      {
        pattern: "object-{position}",
        type: "Object position",
        values:
          "top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right",
        variants: "Base only",
        description: "Selects the visible focal point inside an image box.",
      },
      {
        pattern: "bg-auto | bg-cover | bg-contain",
        type: "Background size",
        values: "auto, cover, contain",
        variants: "Base only",
        description: "Sets background-size without changing the image source.",
      },
      {
        pattern: "bg-{position}",
        type: "Background position",
        values:
          "top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right",
        variants: "Base only",
        description: "Selects the background image focal point.",
      },
      {
        pattern: "bg-repeat | bg-no-repeat",
        type: "Background repeat",
        values: "repeat, no-repeat",
        variants: "Base only",
        description: "Controls background image repetition.",
      },
    ],
  },
  {
    id: "borders",
    title: "Borders and outlines",
    description:
      "Border and outline utilities separate width, style, offset and color for explicit composition.",
    families: [
      {
        pattern: "border",
        type: "Border shorthand",
        values: "1px-scale width and solid style",
        variants: interactiveVariants,
        description: "Adds the default solid border.",
      },
      {
        pattern: "border-{size}",
        type: "Border width",
        values: "0 through 13",
        variants: interactiveVariants,
        description: "Sets border width from the border scale.",
      },
      {
        pattern: "outline",
        type: "Outline shorthand",
        values: "1px-scale width and solid style",
        variants: interactiveVariants,
        description: "Adds the default solid outline.",
      },
      {
        pattern: "outline-none",
        type: "Outline removal",
        values: "none",
        variants: interactiveVariants,
        description: "Removes the outline.",
      },
      {
        pattern: "outline-{size}",
        type: "Outline width",
        values: "0 through 13",
        variants: interactiveVariants,
        description: "Sets outline width and a solid outline style.",
      },
      {
        pattern: "outline-{style}",
        type: "Outline style",
        values: "solid, dashed, dotted, double",
        variants: interactiveVariants,
        description: "Sets the outline style.",
      },
      {
        pattern: "outline-offset-{size}",
        type: "Outline offset",
        values: spacingValues,
        variants: interactiveVariants,
        description: "Offsets the outline with a value from the spacing scale.",
      },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description:
      "Typography utilities control one font or text property and support interactive state variants.",
    families: [
      {
        pattern: "text-{size}",
        type: "Font size",
        values: "2xs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl",
        variants: interactiveVariants,
        description: "Sets font size from the framework scale.",
      },
      {
        pattern: "normal-style | italic | oblique",
        type: "Font style",
        values: "normal, italic, oblique",
        variants: interactiveVariants,
        description: "Sets font style.",
      },
      {
        pattern: "font-{weight}",
        type: "Font weight",
        values:
          "thin, extralight, light, normal, medium, semibold, bold, extrabold, black",
        variants: interactiveVariants,
        description: "Sets numeric font weight from 100 through 900.",
      },
      {
        pattern: "normal-case | capitalize | uppercase | lowercase",
        type: "Text transform",
        values: "none, capitalize, uppercase, lowercase",
        variants: interactiveVariants,
        description: "Changes visual casing without changing source text.",
      },
      {
        pattern: "leading-{height}",
        type: "Line height",
        values: "none, tight, snug, normal, relaxed, loose",
        variants: interactiveVariants,
        description: "Sets line height from 1 through 2.",
      },
      {
        pattern: "text-{alignment}",
        type: "Text alignment",
        values: "left, right, center, justify",
        variants: interactiveVariants,
        description: "Sets physical text alignment.",
      },
    ],
  },
  {
    id: "elevation",
    title: "Elevation",
    description:
      "Elevation utilities use token-backed outer and inset shadows with interactive state variants.",
    families: [
      {
        pattern: "shadow-{size}",
        type: "Outer shadow",
        values: "2xs, xs, sm, base, lg, xl, 2xl, 3xl",
        variants: interactiveVariants,
        description: "Applies an outer shadow and its matching stacking level.",
      },
      {
        pattern: "shadow-inner-{size}",
        type: "Inset shadow",
        values: "2xs, xs, sm, base, lg, xl, 2xl, 3xl",
        variants: interactiveVariants,
        description: "Applies an inset shadow.",
      },
      {
        pattern: "shadow-none",
        type: "Shadow removal",
        values: "none",
        variants: interactiveVariants,
        description: "Removes box shadow.",
      },
      {
        pattern: "text-shadow-sm | text-shadow-base | text-shadow-lg",
        type: "Text shadow",
        values: "sm, base, lg",
        variants: "Base only",
        description:
          "Applies a compact token-colored shadow to improve text separation over media.",
      },
      {
        pattern: "text-shadow-none",
        type: "Text shadow removal",
        values: "none",
        variants: "Base only",
        description: "Removes text shadow, including low-specificity defaults.",
      },
      {
        pattern: "animated",
        type: "Transition",
        values: "var(--animate-all)",
        variants: "Base only",
        description:
          "Applies the framework transition to all animatable properties.",
      },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    description:
      "Color utilities cover backgrounds, borders, outlines and text across every semantic family and weight.",
    families: [
      {
        pattern: "{kind}-{family}{weight}",
        type: "Semantic color",
        values:
          "kind: bg, border, outline, text; family: primary, accent, success, info, warning, danger, default; weight: lightest, lighter, light, base, dark, darker, darkest",
        variants: colorVariants,
        description:
          "Applies the selected semantic token. Base weight omits the weight suffix, such as bg-primary. Border colors require a border style to become visible.",
      },
      {
        pattern: "{kind}-white | {kind}-black",
        type: "Literal color",
        values: "kind: bg, border, outline, text",
        variants: colorVariants,
        description:
          "Applies the literal white or black token. These utilities remain unchanged across color schemes.",
      },
      {
        pattern: "bg-transparent | bg-scrim | bg-media-scrim",
        type: "Transparent background",
        values: "transparent, var(--scrim), var(--media-scrim)",
        variants: "Base only",
        description:
          "Sets only the background color and preserves the current text color.",
      },
    ],
  },
];

export {
  colorVariants,
  interactiveVariants,
  spacingValues,
  utilityGroups,
  type UtilityFamily,
  type UtilityGroup,
};
