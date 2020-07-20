let Header = () => <header>
  <h1>Dragonglass</h1>
  <nav>
    <a v-route="/grid" title="Grid">Grid</a>
    <a v-route="/elevations" title="Elevations">Elevations</a>
    <a v-route="/colors" title="Colors">Colors</a>
    <a v-route="/fonts" title="Fonts">Fonts</a>
    <a v-route="/badges" title="Badges">Badges</a>
    <a v-route="/buttons" title="Buttons">Buttons</a>
    <a v-route="/cards" title="Cards">Cards</a>
    <a v-route="/dialogs" title="Dialogs">Dialogs</a>
    <a v-route="/lists" title="Lists">Lists</a>
    <a v-route="/forms" title="Forms">Forms</a>
    <a v-route="/tooltips" title="Tooltips">Tooltips</a>
    <a v-route="/menus" title="Menus">Menus</a>
    <a v-route="/tables" title="Tables">Tables</a>
    <a v-route="/progress" title="Progress">Progress</a>
  </nav>
</header>;

let Footer = () => <footer></footer>;
let Layout = (props, ...content) => [
  <Header></Header>,
  <article>{content}</article>,
  <Footer></Footer>
];

export default Layout;
