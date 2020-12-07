const Layout = require("./layout");

module.exports = () => (
  <Layout>
    <h2>Dialogs</h2>
    <hr />
    <div>
      <details data-trigger>
        <summary>Dialog with header and footer</summary>
        <dialog>
          <header>
            <h2>Title</h2>
            <nav>
              <button class="fab">
                <i class="material-icons">share</i>
              </button>
            </nav>
          </header>
          <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
          <footer>
            <nav>
              <button class="color-primary">Get started</button>
            </nav>
          </footer>
        </dialog>
      </details>
      <details data-trigger>
        <summary>Dialog with media</summary>
        <dialog>
          <section data-media style="background-image: url('https://picsum.photos/480/480')">
            <header>
              <h2>Title</h2>
              <nav>
                <button class="fab">
                  <i class="material-icons">share</i>
                </button>
              </nav>
            </header>
          </section>
          <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
          <footer>
            <nav>
              <button class="color-primary">Get started</button>
            </nav>
          </footer>
        </dialog>
      </details>
      <details data-trigger>
        <summary>Dialog squared</summary>
        <dialog data-dialog="squared">
          <section data-media style="background-image: url('https://picsum.photos/200/300')">
            <header>
              <h2>Title</h2>
              <nav>
                <button class="fab">
                  <i class="material-icons">share</i>
                </button>
              </nav>
            </header>
          </section>
        </dialog>
      </details>
      <details data-trigger>
        <summary>Dialog squared with text instead of media</summary>
        <dialog data-dialog="squared">
          <section data-media class="bg-primary">
            <header>
              <h2>Title</h2>
              <nav>
                <button class="fab">
                  <i class="material-icons">share</i>
                </button>
              </nav>
            </header>
            <section>
              Feautred event: <br /> May 24, 2016 <br /> 7-11pm
            </section>
          </section>
        </dialog>
      </details>
      <details data-trigger>
        <summary>Full width dialog</summary>
        <dialog data-dialog="full-width">
          <header>
            <h2>Title</h2>
            <nav>
              <button class="fab">
                <i class="material-icons">share</i>
              </button>
            </nav>
          </header>
          <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
          <footer>
            <nav>
              <button class="color-primary">Get started</button>
            </nav>
          </footer>
        </dialog>
      </details>
    </div>
  </Layout>
);
