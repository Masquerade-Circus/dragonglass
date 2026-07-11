import {
  catalog,
  categoryOrder,
  type DocumentationCategory,
} from "../docs/catalog";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const excludedCategories = new Set<DocumentationCategory>([
  "Getting started",
  "Foundations",
  "Utilities",
]);

const componentPages = catalog.filter(
  ({ category, page }) =>
    !excludedCategories.has(category) &&
    page !== "Home" &&
    page !== "AppComponents",
);

const componentCategories = categoryOrder.filter((category) =>
  componentPages.some((route) => route.category === category),
);

export default () => (
  <DocPage page="AppComponents">
    <p>
      Browse component guides by purpose. Each guide documents the semantic
      markup, variants, and behavior for that component.
    </p>

    {componentCategories.map((category) => (
      <DemoSection
        id={`${category.toLowerCase().replaceAll(" ", "-")}-components`}
        title={category}
      >
        <ul>
          {componentPages
            .filter((route) => route.category === category)
            .map(({ path, label, description }) => (
              <li>
                <a href={path}>{label}</a>
                <p>{description}</p>
              </li>
            ))}
        </ul>
      </DemoSection>
    ))}
  </DocPage>
);
