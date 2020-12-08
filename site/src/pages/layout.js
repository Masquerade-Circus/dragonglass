let Header = () => (
  <header>
    <nav>
      <details data-trigger>
        <summary>
          <span class="material-icons">menu</span>
        </summary>
        <section data-drawer>
          <dl>
            <dt>
              <a v-route="/dragonglass/grid.html">
                <i class="material-icons bg-primary">line_style</i>Grid
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/elevations.html">
                <i class="material-icons bg-accent">layers</i>Elevations
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/colors.html">
                <i class="material-icons bg-info">group_work</i>Colors
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/fonts.html">
                <i class="material-icons bg-success">text_format</i>Fonts
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/badges.html">
                <i class="material-icons bg-warning">chat_bubble</i>Badges
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/buttons.html">
                <i class="material-icons bg-danger">arrow_forward</i>Buttons
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/cards.html">
                <i class="material-icons bg-primary">video_label</i>Cards
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/dialogs.html">
                <i class="material-icons bg-accent">web_asset</i>Dialogs
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/lists.html">
                <i class="material-icons bg-info">list</i>lists
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/forms.html">
                <i class="material-icons bg-success">font_download</i>Forms
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/menus.html">
                <i class="material-icons bg-warning">menu</i>Menus
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/tables.html">
                <i class="material-icons bg-danger">view_list</i>Tables
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/tool.html-bars">
                <i class="material-icons bg-default">add</i>Toolbars
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/tabs.html">
                <i class="material-icons bg-default">add</i>Tabs
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/tooltips.html">
                <i class="material-icons bg-info">label</i>Tooltips
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/progress.html">
                <i class="material-icons bg-success">trending_flat</i>Progress
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/spinner.html">
                <i class="material-icons bg-warning">refresh</i>Spinner
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/sliders.html">
                <i class="material-icons bg-default">add</i>Sliders
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/toggles.html">
                <i class="material-icons bg-default">add</i>Toggles
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/notifications.html">
                <i class="material-icons bg-default">add</i>Notifications
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/chips.html">
                <i class="material-icons bg-default">add</i>Chips
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/expansion.html-panels">
                <i class="material-icons bg-default">add</i>Expansion panels
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/bottom.html-navigation">
                <i class="material-icons bg-default">add</i>Bottom navigation
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/bottom.html-sheets">
                <i class="material-icons bg-default">add</i>Bottom sheets
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/steppers.html">
                <i class="material-icons bg-default">add</i>Steppers
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/search.html">
                <i class="material-icons bg-default">add</i>Search
              </a>
            </dt>
            <dt>
              <a v-route="/dragonglass/pickers.html">
                <i class="material-icons bg-default">add</i>Pickers
              </a>
            </dt>
          </dl>
        </section>
      </details>
    </nav>
    <h1>Dragonglass</h1>
  </header>
);

let Footer = () => <footer />;
let Layout = (props, ...content) => [<Header />, <article>{content}</article>, <Footer />];

module.exports = Layout;
