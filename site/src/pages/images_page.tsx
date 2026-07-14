import ApiTable from "../docs/api_table";
import CodeExample from "../docs/code_example";
import DemoSection from "../docs/demo_section";
import DocPage from "../docs/doc_page";

const imageSource = "https://picsum.photos/id/1018/1200/800";

const objectFitCode = `<img
  src="${imageSource}"
  alt="Mountain landscape"
  class="w-full h-64 object-cover object-center"
>`;

const objectPositionCode = `<img
  src="${imageSource}"
  alt="Mountain landscape"
  class="w-full h-64 object-cover object-bottom-right"
>`;

const backgroundCode = `<section
  class="min-h-64 bg-cover bg-bottom-right bg-no-repeat"
  style="background-image: url('${imageSource}')"
  role="img"
  aria-label="Mountain landscape"
></section>`;

const apiRows = [
  {
    name: "w-full | h-full | h-auto",
    type: "Sizing utility",
    defaultValue: "width: auto; height: auto",
    description: "Controls the media box width and height.",
  },
  {
    name: "object-cover | object-contain | object-fill | object-none | object-scale-down",
    type: "Object-fit utility",
    defaultValue: "fill",
    description: "Controls how an img fits inside its content box.",
  },
  {
    name: "object-{position}",
    type: "Object-position utility",
    defaultValue: "center",
    description:
      "Selects one of nine focal positions from top-left through bottom-right.",
  },
  {
    name: "bg-auto | bg-cover | bg-contain",
    type: "Background-size utility",
    defaultValue: "auto",
    description: "Controls the rendered background image size.",
  },
  {
    name: "bg-{position}",
    type: "Background-position utility",
    defaultValue: "top-left",
    description:
      "Selects one of the same nine focal positions for a background image.",
  },
  {
    name: "bg-repeat | bg-no-repeat",
    type: "Background-repeat utility",
    defaultValue: "repeat",
    description: "Enables or disables background image repetition.",
  },
];

export default () => (
  <DocPage page="Images">
    <DemoSection id="images-object-fit" title="Fit an image inside its box">
      <p>
        Set the image box dimensions, then use an <code>object-*</code> utility
        to control the fit and focal point.
      </p>
      <img
        src={imageSource}
        alt="Mountain landscape"
        class="w-full h-64 object-cover object-center"
      />
      <CodeExample code={objectFitCode} />
    </DemoSection>

    <DemoSection id="images-object-position" title="Move the image focal point">
      <p>
        Position utilities use a nine-point grid shared with background images.
      </p>
      <img
        src={imageSource}
        alt="Mountain landscape"
        class="w-full h-64 object-cover object-bottom-right"
      />
      <CodeExample code={objectPositionCode} />
    </DemoSection>

    <DemoSection id="images-background" title="Position a background image">
      <p>
        Keep the image URL in the standard <code>background-image</code> style.
        Utilities control size, position and repetition.
      </p>
      <section
        class="min-h-64 bg-cover bg-bottom-right bg-no-repeat"
        style={`background-image: url('${imageSource}')`}
        role="img"
        aria-label="Mountain landscape"
      />
      <CodeExample code={backgroundCode} />
    </DemoSection>

    <DemoSection id="images-card-media" title="Adjust card media">
      <p>
        Background utilities load after card defaults, so they can move a
        <code> data-media</code> focal point without changing the card contract.
      </p>
      <CodeExample
        code={`<section
  data-media
  class="bg-cover bg-bottom-right bg-no-repeat"
  style="background-image: url('${imageSource}')"
></section>`}
      />
    </DemoSection>

    <DemoSection id="images-api" title="API">
      <ApiTable
        caption="Image sizing, fitting, position and background utilities"
        rows={apiRows}
      />
    </DemoSection>
  </DocPage>
);
