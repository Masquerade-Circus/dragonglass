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
              <a v-route="/grid.html">
                <i class="material-icons bg-primary">line_style</i>Grid
              </a>
            </dt>
            <dt>
              <a v-route="/elevations.html">
                <i class="material-icons bg-accent">layers</i>Elevations
              </a>
            </dt>
            <dt>
              <a v-route="/colors.html">
                <i class="material-icons bg-info">group_work</i>Colors
              </a>
            </dt>
            <dt>
              <a v-route="/fonts.html">
                <i class="material-icons bg-success">text_format</i>Fonts
              </a>
            </dt>
            <dt>
              <a v-route="/badges.html">
                <i class="material-icons bg-warning">chat_bubble</i>Badges
              </a>
            </dt>
            <dt>
              <a v-route="/buttons.html">
                <i class="material-icons bg-danger">arrow_forward</i>Buttons
              </a>
            </dt>
            <dt>
              <a v-route="/cards.html">
                <i class="material-icons bg-primary">video_label</i>Cards
              </a>
            </dt>
            <dt>
              <a v-route="/dialogs.html">
                <i class="material-icons bg-accent">web_asset</i>Dialogs
              </a>
            </dt>
            <dt>
              <a v-route="/lists.html">
                <i class="material-icons bg-info">list</i>lists
              </a>
            </dt>
            <dt>
              <a v-route="/forms.html">
                <i class="material-icons bg-success">font_download</i>Forms
              </a>
            </dt>
            <dt>
              <a v-route="/menus.html">
                <i class="material-icons bg-warning">menu</i>Menus
              </a>
            </dt>
            <dt>
              <a v-route="/tables.html">
                <i class="material-icons bg-danger">view_list</i>Tables
              </a>
            </dt>
            <dt>
              <a v-route="/tool.html-bars">
                <i class="material-icons bg-default">add</i>Toolbars
              </a>
            </dt>
            <dt>
              <a v-route="/tabs.html">
                <i class="material-icons bg-default">add</i>Tabs
              </a>
            </dt>
            <dt>
              <a v-route="/tooltips.html">
                <i class="material-icons bg-info">label</i>Tooltips
              </a>
            </dt>
            <dt>
              <a v-route="/progress.html">
                <i class="material-icons bg-success">trending_flat</i>Progress
              </a>
            </dt>
            <dt>
              <a v-route="/spinner.html">
                <i class="material-icons bg-warning">refresh</i>Spinner
              </a>
            </dt>
            <dt>
              <a v-route="/sliders.html">
                <i class="material-icons bg-default">add</i>Sliders
              </a>
            </dt>
            <dt>
              <a v-route="/toggles.html">
                <i class="material-icons bg-default">add</i>Toggles
              </a>
            </dt>
            <dt>
              <a v-route="/notifications.html">
                <i class="material-icons bg-default">add</i>Notifications
              </a>
            </dt>
            <dt>
              <a v-route="/chips.html">
                <i class="material-icons bg-default">add</i>Chips
              </a>
            </dt>
            <dt>
              <a v-route="/expansion.html-panels">
                <i class="material-icons bg-default">add</i>Expansion panels
              </a>
            </dt>
            <dt>
              <a v-route="/bottom.html-navigation">
                <i class="material-icons bg-default">add</i>Bottom navigation
              </a>
            </dt>
            <dt>
              <a v-route="/bottom.html-sheets">
                <i class="material-icons bg-default">add</i>Bottom sheets
              </a>
            </dt>
            <dt>
              <a v-route="/steppers.html">
                <i class="material-icons bg-default">add</i>Steppers
              </a>
            </dt>
            <dt>
              <a v-route="/search.html">
                <i class="material-icons bg-default">add</i>Search
              </a>
            </dt>
            <dt>
              <a v-route="/pickers.html">
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
