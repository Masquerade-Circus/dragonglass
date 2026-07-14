import {
  catalog,
  categoryOrder,
  routeByPage,
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
      Component guides are grouped by purpose. Each guide pairs rendered
      examples with their markup and an API table for the relevant elements,
      attributes, variants, states and tokens.
    </p>
    <p>
      After choosing a component, open the
      <a href={routeByPage.get("Utilities")!.path}> utility reference</a> for
      focused spacing, color, typography, layout and elevation adjustments.
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
