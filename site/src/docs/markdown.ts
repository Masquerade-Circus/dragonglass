import { htmlToDom } from "valyrian.js/node";
import { basePath, categoryOrder, type DocumentationRoute } from "./catalog";

type MarkdownNode = {
  childNodes?: MarkdownNode[];
  getAttribute?: (name: string) => string | null;
  nodeType?: number;
  nodeValue?: string | null;
  tagName?: string;
  textContent?: string;
};

type MarkdownDocument = {
  markdown: string;
  markdownPath: string;
  route: DocumentationRoute;
};

const childrenOf = (node: MarkdownNode) => node.childNodes ?? [];
const tagOf = (node: MarkdownNode) =>
  (node.tagName ?? "").toLowerCase().replace(/\/$/, "");
const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&");
const textOf = (node: MarkdownNode) =>
  decodeHtmlEntities(node.textContent ?? "");
const renderChildren = (node: MarkdownNode, includeNeutralContainers = false) =>
  childrenOf(node)
    .map((child) => renderNode(child, includeNeutralContainers))
    .join("");
const renderIncludedDescendants = (node: MarkdownNode): string =>
  childrenOf(node)
    .map((child) => {
      const markdownMode = child.getAttribute?.("data-markdown");

      if (
        child.getAttribute?.("aria-hidden") === "true" ||
        markdownMode === "exclude"
      ) {
        return "";
      }

      if (
        markdownMode === "include" ||
        markdownMode === "include-descendants"
      ) {
        return renderNode(child);
      }

      return renderIncludedDescendants(child);
    })
    .join("");
const inlineText = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
const escapeTableCell = (value: string) =>
  inlineText(value).replaceAll("|", "\\|");

const descendantsByTag = (node: MarkdownNode, tagName: string) => {
  const descendants: MarkdownNode[] = [];

  for (const child of childrenOf(node)) {
    if (tagOf(child) === tagName) {
      descendants.push(child);
    }

    descendants.push(...descendantsByTag(child, tagName));
  }

  return descendants;
};

const firstByTag = (
  node: MarkdownNode,
  tagName: string,
): MarkdownNode | null => {
  if (tagOf(node) === tagName) {
    return node;
  }

  for (const child of childrenOf(node)) {
    const match = firstByTag(child, tagName);

    if (match) {
      return match;
    }
  }

  return null;
};

const codeFence = (code: string, minimumLength: number) => {
  const longestFence = Math.max(
    0,
    ...Array.from(code.matchAll(/`+/g), ([value]) => value.length),
  );
  return "`".repeat(Math.max(minimumLength, longestFence + 1));
};

const codeLanguage = (code: string) => {
  const trimmed = code.trimStart();

  if (trimmed.startsWith("<")) {
    return "html";
  }

  if (trimmed.startsWith("@use") || trimmed.startsWith(":root")) {
    return "scss";
  }

  if (trimmed.startsWith("import ")) {
    return "js";
  }

  if (/^(bun|npm|pnpm|yarn|npx|bunx)\s/m.test(trimmed)) {
    return "sh";
  }

  return "";
};

const renderCodeBlock = (node: MarkdownNode) => {
  const code = textOf(node).replace(/^\n|\n$/g, "");
  const fence = codeFence(code, 3);
  const language = codeLanguage(code);
  return `\n\n${fence}${language}\n${code}\n${fence}\n\n`;
};

const renderList = (
  node: MarkdownNode,
  ordered: boolean,
  includeNeutralContainers = false,
) => {
  const items = childrenOf(node).filter((child) => tagOf(child) === "li");
  const renderedItems = items.map((item, index) => {
    const marker = ordered ? `${index + 1}.` : "-";
    const content = inlineText(renderChildren(item, includeNeutralContainers));
    return `${marker} ${content}`;
  });

  return `\n\n${renderedItems.join("\n")}\n\n`;
};

const renderTable = (node: MarkdownNode) => {
  const rows = descendantsByTag(node, "tr")
    .map((row) =>
      childrenOf(row)
        .filter((cell) => ["th", "td"].includes(tagOf(cell)))
        .map((cell) => escapeTableCell(renderChildren(cell))),
    )
    .filter((row) => row.length > 0);

  if (rows.length === 0) {
    return "";
  }

  const columnCount = Math.max(...rows.map((row) => row.length));
  const normalizedRows = rows.map((row) => [
    ...row,
    ...Array(columnCount - row.length).fill(""),
  ]);
  const captionNode = firstByTag(node, "caption");
  const caption = captionNode
    ? `\n\n**${inlineText(renderChildren(captionNode))}**\n\n`
    : "\n\n";
  const header = normalizedRows[0];
  const separator = Array(columnCount).fill("---");
  const body = normalizedRows.slice(1);
  const markdownRows = [header, separator, ...body]
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");

  return `${caption}${markdownRows}\n\n`;
};

function renderNode(
  node: MarkdownNode,
  includeNeutralContainers = false,
): string {
  if (node.nodeType === 3) {
    return decodeHtmlEntities(node.nodeValue ?? "").replace(/\s+/g, " ");
  }

  const tagName = tagOf(node);
  const markdownMode = node.getAttribute?.("data-markdown");

  if (
    node.getAttribute?.("aria-hidden") === "true" ||
    markdownMode === "exclude"
  ) {
    return "";
  }

  if (markdownMode === "include-descendants") {
    return renderChildren(node, true);
  }

  if (/^h[1-6]$/.test(tagName)) {
    const level = Number(tagName.slice(1));
    return `\n\n${"#".repeat(level)} ${inlineText(renderChildren(node, includeNeutralContainers))}\n\n`;
  }

  if (tagName === "p") {
    return `\n\n${inlineText(renderChildren(node, includeNeutralContainers))}\n\n`;
  }

  if (tagName === "pre") {
    return renderCodeBlock(node);
  }

  if (tagName === "code") {
    const code = inlineText(textOf(node));
    const fence = codeFence(code, 1);
    return ` ${fence}${code}${fence} `;
  }

  if (tagName === "a") {
    const label = inlineText(renderChildren(node, includeNeutralContainers));
    const href = node.getAttribute?.("href") ?? "";
    const markdownHref =
      href === basePath
        ? `${basePath}/index.html.md`
        : href.startsWith(`${basePath}/`) && href.endsWith(".html")
          ? `${href}.md`
          : href;
    return markdownHref ? ` [${label}](${markdownHref}) ` : label;
  }

  if (tagName === "strong") {
    return ` **${inlineText(renderChildren(node, includeNeutralContainers))}** `;
  }

  if (includeNeutralContainers && ["article", "div"].includes(tagName)) {
    return renderChildren(node, true);
  }

  if (
    [
      "article",
      "aside",
      "button",
      "details",
      "dialog",
      "div",
      "fieldset",
      "form",
      "input",
      "menu",
      "nav",
      "option",
      "progress",
      "search",
      "select",
      "textarea",
    ].includes(tagName)
  ) {
    return renderIncludedDescendants(node);
  }

  if (
    (tagName === "ul" || tagName === "ol") &&
    typeof node.getAttribute?.("data-list") === "string" &&
    !includeNeutralContainers
  ) {
    return "";
  }

  if (tagName === "ul") {
    return renderList(node, false, includeNeutralContainers);
  }

  if (tagName === "ol") {
    return renderList(node, true, includeNeutralContainers);
  }

  if (tagName === "table") {
    return renderTable(node);
  }

  if (tagName === "dl") {
    const entries = childrenOf(node)
      .filter((child) => ["dt", "dd"].includes(tagOf(child)))
      .map((child) => {
        const content = inlineText(
          renderChildren(child, includeNeutralContainers),
        );
        return tagOf(child) === "dt" ? `- **${content}:**` : `  ${content}`;
      });
    return `\n\n${entries.join("\n")}\n\n`;
  }

  if (tagName === "hr") {
    return "\n\n---\n\n";
  }

  if (tagName === "br") {
    return "  \n";
  }

  return renderChildren(node, includeNeutralContainers);
}

const removeEmptyHeadings = (markdown: string) => {
  const lines = markdown.split("\n");
  let insideCodeFence = false;

  return lines
    .filter((line, index) => {
      if (/^(`{3,}|~{3,})/.test(line)) {
        insideCodeFence = !insideCodeFence;
        return true;
      }

      if (insideCodeFence) {
        return true;
      }

      const heading = /^(#{1,6})\s+/.exec(line);

      if (!heading) {
        return true;
      }

      let nextIndex = index + 1;

      while (nextIndex < lines.length && lines[nextIndex].trim() === "") {
        nextIndex += 1;
      }

      if (nextIndex === lines.length) {
        return false;
      }

      const nextHeading = /^(#{1,6})\s+/.exec(lines[nextIndex]);
      return !nextHeading || nextHeading[1].length > heading[1].length;
    })
    .join("\n");
};

const normalizeMarkdown = (markdown: string) =>
  `${removeEmptyHeadings(markdown)
    .replace(/[ \t]+$/gm, (whitespace) =>
      whitespace === "  " ? whitespace : "",
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;

const renderDocumentationMarkdown = (html: string) => {
  const root = htmlToDom(html) as MarkdownNode;
  const main = firstByTag(root, "main");

  if (!main) {
    throw new Error("Rendered documentation must contain a main element.");
  }

  return normalizeMarkdown(renderChildren(main));
};

const markdownPathForRoute = (path: string) => {
  if (path === basePath) {
    return "index.html.md";
  }

  return `${path.slice(basePath.length + 1)}.md`;
};

const markdownHref = (document: MarkdownDocument) =>
  `./${document.markdownPath}`;

const renderLlmsIndex = (documents: MarkdownDocument[]) => {
  const canonicalDocuments = documents.filter(
    ({ route }) => route.page !== "Theme",
  );
  const themeDocuments = documents.filter(
    ({ route }) => route.page === "Theme",
  );
  const sections = categoryOrder
    .map((category) => {
      const links = canonicalDocuments
        .filter(({ route }) => route.category === category)
        .map(
          (document) =>
            `- [${document.route.label}](${markdownHref(document)}): ${document.route.description}`,
        );

      if (links.length === 0) {
        return "";
      }

      return `## ${category}\n\n${links.join("\n")}`;
    })
    .filter(Boolean);
  const optionalThemes = themeDocuments.map(
    (document) =>
      `- [${document.route.label}](${markdownHref(document)}): ${document.route.description}`,
  );

  return normalizeMarkdown(`# Dragonglass

> Dragonglass is an HTML5-first, pure CSS framework for semantic app interfaces, compiled color themes and focused utility classes.

${sections.join("\n\n")}

## Optional

${optionalThemes.join("\n")}`);
};

const shiftHeadings = (markdown: string) =>
  markdown.replace(/^(#{1,5}) /gm, "$1# ");

const renderLlmsFull = (documents: MarkdownDocument[]) => {
  const pages = documents
    .filter(
      ({ route }) =>
        route.page !== "Theme" ||
        (route.themeName === "default" && route.colorScheme === "light"),
    )
    .map(
      (document) =>
        `---\n\nSource: ${markdownHref(document)}\n\n${shiftHeadings(document.markdown)}`,
    );

  return normalizeMarkdown(`# Dragonglass full documentation

> Complete agent-oriented reference generated from the same rendered documentation as the Dragonglass website.

${pages.join("\n\n")}`);
};

export {
  markdownPathForRoute,
  renderDocumentationMarkdown,
  renderLlmsFull,
  renderLlmsIndex,
  type MarkdownDocument,
};
