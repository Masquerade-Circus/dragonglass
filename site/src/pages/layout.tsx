import { catalog, catalogEntries, categoryOrder } from "../docs/catalog";
import { version } from "../../../package.json";

type LayoutProps = {
  contentClass?: string;
  currentPath?: string;
};

type DrawerLinkProps = {
  path: string;
  label: string;
  icon: string;
  color: string;
  currentPath?: string;
};

const DrawerLink = ({
  path,
  label,
  icon,
  color,
  currentPath,
}: DrawerLinkProps) => {
  const content = [
    <i class={`material-icons ${color}`} aria-hidden="true">
      {icon}
    </i>,
    label,
  ];

  if (currentPath === path) {
    return (
      <a href={path} aria-current="page">
        {content}
      </a>
    );
  }

  return <a href={path}>{content}</a>;
};

const Header = ({ currentPath }: LayoutProps) => (
  <header>
    <nav>
      <details data-trigger>
        <summary aria-label="Open documentation navigation">
          <span class="material-icons" aria-hidden="true">
            menu
          </span>
        </summary>
        <section data-drawer>
          <section class="h-48 relative bg-primary">
            <h1 data-position="absolute bottom left">DragonGlass</h1>
          </section>

          <ul data-list v-for={catalogEntries}>
            {({ path, label, icon, color }) => (
              <li>
                <DrawerLink
                  path={path}
                  label={label}
                  icon={icon}
                  color={color}
                  currentPath={currentPath}
                />
              </li>
            )}
          </ul>
        </section>
      </details>
    </nav>
    <span>Dragonglass</span>
  </header>
);

const Layout: any = (props: LayoutProps, ...content: any[]) => (
  <>
    <Header currentPath={props.currentPath} />
    <main id="main-content" tabindex="-1">
      <section class={props.contentClass ?? "container"}>{content}</section>
    </main>
    <footer data-markdown="exclude">
      <small>Dragonglass v{version}</small>
    </footer>
  </>
);

export default Layout;
