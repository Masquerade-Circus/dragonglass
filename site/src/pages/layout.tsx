import { catalog, categoryOrder } from "../docs/catalog";

type LayoutProps = {
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
          {categoryOrder.flatMap((category) => [
            <header>{category}</header>,
            <hr />,
            <ul data-list>
              {catalog
                .filter((route) => route.category === category)
                .map(({ path, label, icon, color }) => (
                  <li>
                    <DrawerLink
                      path={path}
                      label={label}
                      icon={icon}
                      color={color}
                      currentPath={currentPath}
                    />
                  </li>
                ))}
            </ul>,
          ])}
        </section>
      </details>
    </nav>
    <span>Dragonglass</span>
  </header>
);

const Layout: any = (props: LayoutProps, ...content: any[]) => [
  <Header currentPath={props.currentPath} />,
  <main>
    <section>{content}</section>
  </main>,
];

export default Layout;
