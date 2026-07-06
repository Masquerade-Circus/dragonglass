import { render } from "valyrian.js/node";
import Pages from "./pages";

type InlineAsset = {
  raw: string;
  map?: string | null;
};

type HtmlOptions = {
  assets: {
    css: InlineAsset[];
    js: InlineAsset[];
  };
  content: string;
  isDevelopment: boolean;
};

const renderHtml = ({ assets, content, isDevelopment }: HtmlOptions) => {
  const html = render(Pages.Html({ assets, content, isDevelopment }));
  const scripts = render(
    assets.js.map(({ raw, map }) => (
      <script>
        {raw}
        {isDevelopment ? map || "" : ""}
      </script>
    ))
  );

  return html.replace("</body>", `${scripts}</body>`);
};

export { renderHtml };
