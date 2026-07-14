import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const basicCardExample = `<article data-card>
  <section>
    <h3>Release notes</h3>
    <p>Review the latest component changes.</p>
  </section>
</article>`;

const elevatedCardExample = `<article data-card="elevated">
  <section>
    <h3>Elevated card</h3>
    <p>This card uses the elevated variant.</p>
  </section>
</article>`;

const structuredCardExample = `<article data-card>
  <header>
    <h3>Project update</h3>
    <nav aria-label="Card actions">
      <button data-button="fab" type="button" aria-label="Share project update">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </nav>
  </header>
  <section>
    <p>The accessibility review is ready.</p>
  </section>
  <footer>
    <a href="/dragonglass/alerts.html">Review alerts</a>
  </footer>
</article>`;

const mediaCardExample = `<article data-card>
  <section data-media role="img" aria-label="Mountain ridge under a cloudy sky" style="background-image: url('https://picsum.photos/480/480')"></section>
  <section>
    <h3>Field report</h3>
  </section>
</article>`;

const squareCardExample = `<article data-card="squared">
  <section data-media class="bg-primary">
    <header>
      <h3>May release</h3>
    </header>
    <section>Available May 24 from 7 to 11 p.m.</section>
  </section>
</article>`;

const fullWidthCardExample = `<article data-card="full-width">
  <header>
    <h3>Documentation status</h3>
  </header>
  <section>
    <p>The summary spans the full available content width.</p>
  </section>
  <footer>
    <a href="/dragonglass">Browse documentation</a>
  </footer>
</article>`;

export default () => (
  <DocPage page="Cards">
    <DemoSection id="cards-basic-title" title="Basic and elevated cards">
      <p>
        A basic card groups content in the normal page flow. The elevated
        variant adds stronger visual emphasis to the same structure.
      </p>
      <article data-card>
        <section>
          <h3>Release notes</h3>
          <p>Review the latest component changes.</p>
        </section>
      </article>
      <CodeExample code={basicCardExample} />
      <article data-card="elevated">
        <section>
          <h3>Elevated card</h3>
          <p>This card uses the elevated variant.</p>
        </section>
      </article>
      <CodeExample code={elevatedCardExample} />
    </DemoSection>

    <DemoSection id="cards-structured-title" title="Header, content and footer">
      <p>
        Direct header, section and footer regions separate the title, supporting
        content and action area.
      </p>
      <article data-card>
        <header>
          <h3>Project update</h3>
          <nav aria-label="Card actions">
            <button
              data-button="fab"
              type="button"
              aria-label="Share project update"
            >
              <i class="material-icons" aria-hidden="true">
                share
              </i>
            </button>
          </nav>
        </header>
        <section>
          <p>The accessibility review is ready.</p>
        </section>
        <footer>
          <a href="/dragonglass/alerts.html">Review alerts</a>
        </footer>
      </article>
      <CodeExample code={structuredCardExample} />
    </DemoSection>

    <DemoSection id="cards-media-title" title="Media and square cards">
      <p>
        A media region adds an image to the card content. The squared variant
        creates compact, equal-ratio tiles.
      </p>
      <article data-card>
        <section
          data-media
          role="img"
          aria-label="Mountain ridge under a cloudy sky"
          style="background-image: url('https://picsum.photos/480/480')"
        />
        <section>
          <h3>Field report</h3>
        </section>
      </article>
      <CodeExample code={mediaCardExample} />
      <article data-card="squared">
        <section data-media class="bg-primary">
          <header>
            <h3>May release</h3>
          </header>
          <section>Available May 24 from 7 to 11 p.m.</section>
        </section>
      </article>
      <CodeExample code={squareCardExample} />
    </DemoSection>

    <DemoSection id="cards-full-width-title" title="Full-width card">
      <p>
        The full-width variant gives summaries the complete content row instead
        of a compact card column.
      </p>
      <article data-card="full-width">
        <header>
          <h3>Documentation status</h3>
        </header>
        <section>
          <p>The summary spans the full available content width.</p>
        </section>
        <footer>
          <a href="/dragonglass">Browse documentation</a>
        </footer>
      </article>
      <CodeExample code={fullWidthCardExample} />
    </DemoSection>

    <DemoSection id="cards-api-title" title="API">
      <ApiTable
        caption="Card elements, attributes, tokens and states"
        rows={[
          {
            name: "data-card",
            type: "Attribute",
            defaultValue: "Basic",
            description:
              "Accepts elevated, squared or full-width variant tokens.",
          },
          {
            name: "data-media",
            type: "Attribute",
            defaultValue: "Absent",
            description: "Creates a cover media region inside the card.",
          },
          {
            name: "--card-padding / --card-radius / --card-shadow",
            type: "Token",
            defaultValue: "Theme",
            description:
              "Control content spacing, corners and elevated shadow.",
          },
          {
            name: "basic / elevated / squared / full-width",
            type: "State / variant",
            defaultValue: "Basic",
            description:
              "Selects border, elevation, aspect ratio or width behavior.",
          },
        ]}
      />
    </DemoSection>
  </DocPage>
);
