import Layout from "../pages/layout";
import { routeByPage, type DocumentationPage } from "./catalog";

type DocPageProps = {
  page: DocumentationPage;
  children?: any;
};

const DocPage = ({ page }: DocPageProps, ...children: any[]) => {
  const route = routeByPage.get(page);

  if (!route) {
    throw new Error(`Documentation metadata not found for page: ${page}`);
  }

  return (
    <Layout currentPath={route.path}>
      <h1>{route.label}</h1>
      <p>{route.description}</p>
      {children}
    </Layout>
  );
};

export default DocPage;
export { type DocPageProps };
