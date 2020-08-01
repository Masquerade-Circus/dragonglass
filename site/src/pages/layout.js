let Header = () => <header>
  <nav>
    <details data-trigger>
      <summary><span class="material-icons">menu</span></summary>
      <section data-drawer>
        <dl>
          <dt><a v-route="/grid"><i class="material-icons bg-primary">line_style</i>Grid</a></dt>
          <dt><a v-route="/elevations"><i class="material-icons bg-accent">layers</i>Elevations</a></dt>
          <dt><a v-route="/colors"><i class="material-icons bg-info">group_work</i>Colors</a></dt>
          <dt><a v-route="/fonts"><i class="material-icons bg-success">text_format</i>Fonts</a></dt>
          <dt><a v-route="/badges"><i class="material-icons bg-warning">chat_bubble</i>Badges</a></dt>
          <dt><a v-route="/buttons"><i class="material-icons bg-danger">arrow_forward</i>Buttons</a></dt>
          <dt><a v-route="/cards"><i class="material-icons bg-primary">video_label</i>Cards</a></dt>
          <dt><a v-route="/dialogs"><i class="material-icons bg-accent">web_asset</i>Dialogs</a></dt>
          <dt><a v-route="/lists"><i class="material-icons bg-info">list</i>lists</a></dt>
          <dt><a v-route="/forms"><i class="material-icons bg-success">font_download</i>Forms</a></dt>
          <dt><a v-route="/menus"><i class="material-icons bg-warning">menu</i>Menus</a></dt>
          <dt><a v-route="/tables"><i class="material-icons bg-danger">view_list</i>Tables</a></dt>
          <dt><a v-route="/tool-bars"><i class="material-icons bg-default">add</i>Toolbars</a></dt>
          <dt><a v-route="/tabs"><i class="material-icons bg-default">add</i>Tabs</a></dt>
          <dt><a v-route="/tooltips"><i class="material-icons bg-info">label</i>Tooltips</a></dt>
          <dt><a v-route="/progress"><i class="material-icons bg-success">trending_flat</i>Progress</a></dt>
          <dt><a v-route="/spinner"><i class="material-icons bg-warning">refresh</i>Spinner</a></dt>
          <dt><a v-route="/sliders"><i class="material-icons bg-default">add</i>Sliders</a></dt>
          <dt><a v-route="/toggles"><i class="material-icons bg-default">add</i>Toggles</a></dt>
          <dt><a v-route="/notifications"><i class="material-icons bg-default">add</i>Notifications</a></dt>
          <dt><a v-route="/chips"><i class="material-icons bg-default">add</i>Chips</a></dt>
          <dt><a v-route="/expansion-panels"><i class="material-icons bg-default">add</i>Expansion panels</a></dt>
          <dt><a v-route="/bottom-navigation"><i class="material-icons bg-default">add</i>Bottom navigation</a></dt>
          <dt><a v-route="/bottom-sheets"><i class="material-icons bg-default">add</i>Bottom sheets</a></dt>
          <dt><a v-route="/steppers"><i class="material-icons bg-default">add</i>Steppers</a></dt>
          <dt><a v-route="/search"><i class="material-icons bg-default">add</i>Search</a></dt>
          <dt><a v-route="/pickers"><i class="material-icons bg-default">add</i>Pickers</a></dt>
        </dl>
      </section>
    </details>
    </nav>
  <h1>Dragonglass</h1>
</header>;

let Footer = () => <footer></footer>;
let Layout = (props, ...content) => [
  <Header></Header>,
  <article>{content}</article>,
  <Footer></Footer>
];

export default Layout;
