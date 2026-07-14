import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import { routeByPage } from "../docs/catalog";
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
  colorScheme?: ColorScheme;
  themeName?: ThemeName;
};

const ColorsPage = ({
  colorScheme = "auto",
  themeName,
}: ColorsPageProps = {}) => {
  const route = routeByPage.get("Colors");

  if (!route) {
    throw new Error("Documentation metadata not found for page: Colors");
  }

  return (
    <Layout currentPath={route.path}>
      <header>
        <h1>Themes</h1>
        <ThemeMenu
          colorScheme="light"
          currentColorScheme={colorScheme}
          currentThemeName={themeName}
        />
      </header>
      <header>
        <h1>Dark themes</h1>
        <ThemeMenu
          colorScheme="dark"
          currentColorScheme={colorScheme}
          currentThemeName={themeName}
        />
      </header>
      <h1>{route.label}</h1>
      <p>{route.description}</p>

      <DemoSection id="color-palette" title="Background and text colors">
        <p>
          Each semantic color includes lightest, lighter, light, base, dark,
          darker and darkest tokens. White and black remain the global contrast
          extremes.
        </p>
        <div class="bg-primary p-3">Primary background</div>
        <p class="text-primary-dark">Primary dark text</p>
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

      <DemoSection id="color-buttons" title="Buttons by color">
        <p>
          Each semantic family can style an action. The visible label preserves
          meaning when two colors look similar.
        </p>
        {colors.map((color) => (
          <button type="button" class={`bg-${color}`}>
            {color}
          </button>
        ))}
        <CodeExample code={buttonExample} />
      </DemoSection>

      <DemoSection id="color-fields" title="Form fields by color">
        <p>
          Use colored fields for documented states or categories. Keep a label
          and supporting text because color alone cannot explain the state.
        </p>
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
          its lightest family token as foreground. The primary must have OKLCH
          lightness between 42% and 56%, and that pair must reach 4.5:1. Compile
          the result and load it after <code>dragonglass.css</code>.
        </p>
        <CodeExample code={customThemeExample} />
        <pre>
          <code>
            bunx sass --pkg-importer=node theme.scss theme.css
            --style=compressed
          </code>
        </pre>
        <p>
          Place each mixin call inside a theme selector when one stylesheet must
          contain several themes.
        </p>
        <CodeExample code={scopedThemesExample} />
      </DemoSection>

      <DemoSection id="dark-mode" title="Automatic dark mode">
        <p>
          Each theme derives dark structural roles from the same primary and
          follows <code>prefers-color-scheme</code> automatically. Set
          <code> data-color-scheme</code> on the root element only when the
          application must force light or dark mode.
        </p>
        <CodeExample code={darkModeExample} />
      </DemoSection>

      <DemoSection id="color-api" title="Color tokens">
        <p>
          Use the semantic custom properties when a component needs token values
          directly instead of a generated color utility class.
        </p>
        <div style="background-color: var(--primary); color: var(--primary-darker)">
          Primary token preview
        </div>
        <CodeExample code={colorTokenExample} />
        <ApiTable caption="Semantic color custom properties" rows={colorRows} />
      </DemoSection>

      <DemoSection
        id="color-accessibility"
        title="Accessibility and common errors"
      >
        <ul>
          <li>
            Verify text and background combinations in context. A semantic token
            name does not guarantee sufficient contrast for every pairing.
          </li>
          <li>
            Compile the theme again when its primary changes. Overriding only
            <code>--primary</code> does not recalculate the generated tokens.
          </li>
          <li>
            Base colors always use their lightest family token as foreground.
            The compiler rejects a primary outside the 42% to 56% OKLCH
            lightness range or one that cannot support that direction.
          </li>
          <li>
            Never use color as the only signal for status, validation or an
            available action. Include text or another programmatic cue.
          </li>
          <li>
            Use a generated class such as <code>shadow-xs</code> for elevation.
            The unqualified <code>shadow</code> class does not exist.
          </li>
        </ul>
      </DemoSection>
    </Layout>
  );
};

export default ColorsPage;
export { type ColorsPageProps };
