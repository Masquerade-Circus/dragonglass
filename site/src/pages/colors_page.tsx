import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import { routeByPage, routeByPath, themeRoutePath } from "../docs/catalog";
import ThemeMenu from "../docs/theme_menu";
import type { ColorScheme, ThemeName } from "../themes";
import Layout from "./layout";

const colors = [
  "primary",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
  "default",
];
const weights = [
  "-lightest",
  "-lighter",
  "-light",
  "",
  "-dark",
  "-darker",
  "-darkest",
];
const paletteExample = `<div class="bg-primary p-3">Primary background</div>
<p class="text-primary-dark">Primary dark text</p>`;
const transparentBackgroundExample = `<div class="bg-transparent p-3">Transparent background</div>
<div class="bg-scrim text-white p-3">Scrim background</div>
<div class="bg-media-scrim text-white p-3">Media scrim background</div>`;
const stateExample = `<button type="button" class="bg-primary-dark hover:bg-primary active:bg-primary-light">Background states</button>
<input aria-label="Color focus example" class="p-3 text-primary-dark focus:text-primary" value="Focus this field">`;
const buttonExample = colors
  .map((color) => `<button type="button" class="bg-${color}">${color}</button>`)
  .join("\n");
const formExample = colors
  .map(
    (color) => `<fieldset data-field="${color}">
  <label for="${color}-field">${color} field</label>
  <input id="${color}-field" name="${color}-field" type="text" aria-describedby="${color}-field-help">
  <small id="${color}-field-help">Uses the ${color} theme color.</small>
</fieldset>`,
  )
  .join("\n");
const colorTokenExample = `<div style="background-color: var(--primary); color: var(--primary-darker)">
  Primary token preview
</div>`;
const customThemeExample = `@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}`;
const scopedThemesExample = `@use "pkg:dragonglass/theme" as dragonglass;

[data-theme="violet"] {
  @include dragonglass.tokens(#7c3aed);
}

[data-theme="forest"] {
  @include dragonglass.tokens(#167c55);
}`;
const darkModeExample = `<html data-color-scheme="dark"></html>`;
const colorRows = colors.flatMap((color) =>
  weights.map((weight) => ({
    name: `--${color}${weight}`,
    type: "CSS color token",
    defaultValue: color,
    description: `Used by bg-${color}${weight}, text-${color}${weight}, border-${color}${weight} and outline-${color}${weight}.`,
  })),
);

type ColorsPageProps = {
  colorScheme?: Extract<ColorScheme, "light" | "dark">;
  themeName?: ThemeName;
};

const ColorsPage = ({
  colorScheme = "light",
  themeName,
}: ColorsPageProps = {}) => {
  let route = routeByPage.get("Colors");

  if (typeof themeName === "string") {
    if (colorScheme !== "light" && colorScheme !== "dark") {
      throw new Error(`Color scheme not found for theme: ${themeName}`);
    }

    route = routeByPath.get(themeRoutePath(themeName, colorScheme));
  }

  if (!route) {
    throw new Error(
      "Documentation metadata not found for Colors or theme page",
    );
  }

  return (
    <Layout currentPath={route.path}>
      <h1>{route.label}</h1>
      <p>{route.description}</p>
      <header>
        <h2>Browse light themes</h2>
        <ThemeMenu
          colorScheme="light"
          currentColorScheme={colorScheme}
          currentThemeName={themeName}
        />
      </header>
      <header>
        <h2>Browse dark themes</h2>
        <ThemeMenu
          colorScheme="dark"
          currentColorScheme={colorScheme}
          currentThemeName={themeName}
        />
      </header>

      <DemoSection id="color-palette" title="Background and text colors">
        <p>
          Each semantic color includes lightest, lighter, light, base, dark,
          darker and darkest tokens. White and black remain the global contrast
          extremes.
        </p>
        <div class="bg-primary p-3">Primary background</div>
        <p class="text-primary-dark" data-markdown="exclude">
          Primary dark text
        </p>
        <CodeExample code={paletteExample} />
        <div class="grid-gutters">
          {colors.map((color) => (
            <div class="md:w-1/4 lg:w-1/7">
              {weights.map((weight) => (
                <div class={`bg-${color}${weight} p-3`}>
                  {`bg-${color}${weight}`}
                </div>
              ))}
              {weights.map((weight) => (
                <div class={`text-${color}${weight} p-3`}>
                  {`text-${color}${weight}`}
                </div>
              ))}
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection id="transparent-backgrounds" title="Transparent backgrounds">
        <p>
          These utilities change only the background color and preserve the
          current text color.
        </p>
        <div class="bg-transparent p-3">Transparent background</div>
        <div class="bg-scrim text-white p-3">Scrim background</div>
        <div class="bg-media-scrim text-white p-3">Media scrim background</div>
        <CodeExample code={transparentBackgroundExample} />
      </DemoSection>

      <DemoSection id="color-buttons" title="Buttons by color">
        {colors.map((color) => (
          <button type="button" class={`bg-${color}`}>
            {color}
          </button>
        ))}
        <CodeExample code={buttonExample} />
      </DemoSection>

      <DemoSection id="color-fields" title="Form fields by color">
        <form data-card>
          <section>
            {colors.map((color) => (
              <fieldset data-field={color}>
                <label for={`color-field-${color}`}>{color} field</label>
                <input
                  id={`color-field-${color}`}
                  name={`color-field-${color}`}
                  type="text"
                  value={`${color} value`}
                  aria-describedby={`color-field-${color}-help`}
                />
                <small id={`color-field-${color}-help`}>
                  Uses the {color} theme color.
                </small>
              </fieldset>
            ))}
          </section>
        </form>
        <CodeExample code={formExample} />
      </DemoSection>

      <DemoSection id="color-states" title="Interactive color states">
        <button
          type="button"
          class="bg-primary-dark hover:bg-primary active:bg-primary-light"
        >
          Background states
        </button>
        <input
          aria-label="Color focus example"
          class="p-3 text-primary-dark focus:text-primary"
          value="Focus this field"
        />
        <CodeExample code={stateExample} />
      </DemoSection>

      <DemoSection id="compile-theme" title="Compile a theme from one color">
        <p>
          The Sass theme module derives every semantic family, weight,
          foreground and progress color from one opaque primary. Every base uses
          its lightest family token as foreground. The compiler accepts an OKLCH
          primary lightness from 42% through 56% and a contrast ratio of at
          least 4.5:1 for that pair. The compiled theme loads after
          <code> dragonglass.css</code>.
        </p>
        <CodeExample code={customThemeExample} />
        <pre>
          <code>
            bunx sass --pkg-importer=node theme.scss theme.css
            --style=compressed
          </code>
        </pre>
        <p>
          A theme selector around each mixin call lets one stylesheet contain
          several themes.
        </p>
        <CodeExample code={scopedThemesExample} />
      </DemoSection>

      <DemoSection id="dark-mode" title="Automatic dark mode">
        <p>
          Each theme derives dark structural roles from the same primary and
          follows <code>prefers-color-scheme</code> automatically. The
          <code> data-color-scheme</code> attribute on the root element forces
          light or dark mode.
        </p>
        <CodeExample code={darkModeExample} />
      </DemoSection>

      <DemoSection id="color-api" title="Color tokens">
        <p>
          Semantic custom properties expose token values directly as an
          alternative to generated color utility classes.
        </p>
        <div style="background-color: var(--primary); color: var(--primary-darker)">
          Primary token preview
        </div>
        <CodeExample code={colorTokenExample} />
        <ApiTable caption="Semantic color custom properties" rows={colorRows} />
      </DemoSection>
    </Layout>
  );
};

export default ColorsPage;
export { type ColorsPageProps };
