import { render } from "valyrian.js/node";
import Pages from "./pages";
import { documentationAssets } from "./docs/assets";
import type { ThemeName } from "./themes";

type InlineAsset = {
  raw: string;
  map?: string | null;
};

type HtmlOptions = {
  scripts?: InlineAsset[];
  content: string;
  isDevelopment: boolean;
  title: string;
  themeName: ThemeName;
};

const CONTENT_PLACEHOLDER = "__DRAGONGLASS_SSR_CONTENT_PLACEHOLDER_6F4C2A91__";

const renderHtml = ({
  scripts = [],
  content,
  isDevelopment,
  themeName,
  title,
}: HtmlOptions) => {
  const shell = render(
    Pages.Html({
      content: CONTENT_PLACEHOLDER,
      isDevelopment,
      themeName,
      title,
    }),
  );
  const placeholderIndex = shell.indexOf(CONTENT_PLACEHOLDER);

  if (
    placeholderIndex === -1 ||
    placeholderIndex !== shell.lastIndexOf(CONTENT_PLACEHOLDER)
  ) {
    throw new Error(
      "Rendered HTML shell must contain exactly one Dragonglass content placeholder",
    );
  }

  const html = `${shell.slice(0, placeholderIndex)}${content}${shell.slice(
    placeholderIndex + CONTENT_PLACEHOLDER.length,
  )}`;
  const scriptTags = isDevelopment
    ? render(
        scripts.map(({ raw, map }) => (
          <script>
            {raw}
            {map || ""}
          </script>
        )),
      )
    : `<script src="${documentationAssets.script.path}" defer></script>`;

  return `<!doctype html>${html.replace("</body>", `${scriptTags}</body>`)}`;
};

export { renderHtml };
