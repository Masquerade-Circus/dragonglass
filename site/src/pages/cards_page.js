import Layout from './layout';

export default () => <Layout>
  <h2>Cards</h2>
  <hr/>
  <div>
    <h2>Simple card</h2>
    <hr />
    <section data-card>
      <section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...
      </section>
    </section>
    <h2>Card with footer</h2>
    <hr />
    <section data-card>
      <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
      <footer>
        <nav>
          <button class="color-primary">Get started</button>
        </nav>
      </footer>
    </section>
    <h2>Card with header and footer</h2>
    <hr />
    <section data-card>
      <header>
        <h2>Title</h2>
        <nav>
          <button class="fab"><i class="material-icons">share</i></button>
        </nav>
      </header>
      <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
      <footer>
        <nav>
          <button class="color-primary">Get started</button>
        </nav>
      </footer>
    </section>
    <h2>Card with media</h2>
    <hr />
    <section data-card>
      <section data-media style="background-image: url('https://picsum.photos/480/480')">
        <header>
          <h2>Title</h2>
          <nav>
            <button class="fab"><i class="material-icons">share</i></button>
          </nav>
        </header>
      </section>
      <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
      <footer>
        <nav>
          <button class="color-primary">Get started</button>
        </nav>
      </footer>
    </section>
    <h2>Card squared</h2>
    <hr />
    <section data-card="squared">
      <section data-media style="background-image: url('https://picsum.photos/200/300')">
        <header>
          <h2>Title</h2>
          <nav>
            <button class="fab"><i class="material-icons">share</i></button>
          </nav>
        </header>
      </section>
    </section>
    <h2>Card squared with text instead of media</h2>
    <hr />
    <section data-card="squared" >
      <section data-media class="bg-primary">
        <header>
          <h2>Title</h2>
          <nav>
            <button class="fab"><i class="material-icons">share</i></button>
          </nav>
        </header>
        <section>Feautred event: <br /> May 24, 2016 <br /> 7-11pm</section>
      </section>
    </section>
    <h2>Full width card</h2>
    <hr />
    <section data-card="full-width">
      <header>
        <h2>Title</h2>
        <nav>
          <button class="fab"><i class="material-icons">share</i></button>
        </nav>
      </header>
      <section>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...</section>
      <footer>
        <nav>
          <button class="color-primary">Get started</button>
        </nav>
      </footer>
    </section>
  </div>

</Layout>;
