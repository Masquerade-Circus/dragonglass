import { render } from "valyrian.js/node";
import Pages from "./pages";
import { documentationAssets } from "./docs/assets";

type InlineAsset = {
  raw: string;
  map?: string | null;
};

type HtmlOptions = {
  scripts?: InlineAsset[];
  content: string;
  isDevelopment: boolean;
  title: string;
};

const CONTENT_PLACEHOLDER = "__DRAGONGLASS_SSR_CONTENT_PLACEHOLDER_6F4C2A91__";

const renderHtml = ({
  scripts = [],
  content,
  isDevelopment,
  title,
}: HtmlOptions) => {
  const shell = render(
    Pages.Html({
      content: CONTENT_PLACEHOLDER,
      isDevelopment,
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
