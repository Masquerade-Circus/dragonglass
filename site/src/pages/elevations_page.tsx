import Layout from "./layout";
let colors = ["primary", "accent", "info", "success", "warning", "danger", "default"];
let shadowSizes = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"];
function getElevations(emboss = false) {
  return shadowSizes.map((size) => {
    let shadowClass = `shadow-${size}`;
    let innerShadowClass = `shadow-inner-${size}`;

    if (emboss) {
      return (
        <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
          <div class={`${innerShadowClass} bg-white`}>class="{innerShadowClass}"</div>
        </div>
      );
    }
    return (
      <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <div class={`${shadowClass} bg-white`}>class="{shadowClass}"</div>
      </div>
    );
  });
}
export default () => (
  <Layout>
    <h2>Elevations</h2>
    <div class="grid-gutters">{getElevations()}</div>
    <h2>Embosses</h2>
    <div class="grid-gutters">{getElevations(true)}</div>
      <h2>Utility</h2>
      <div class="grid-gutters">
        <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <div class="shadow-base hover:shadow-3xl bg-white">class="shadow-base hover:shadow-3xl"</div>
      </div>
      <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <div class="shadow-base active:shadow-3xl bg-white">class="shadow-base active:shadow-3xl"</div>
      </div>
      <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <input class="shadow-base focus:shadow-3xl bg-white" value={'class="shadow-base focus:shadow-3xl"'} />
      </div>
      <hr />
      <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <div class="shadow-inner-base hover:shadow-inner-3xl bg-white">class="shadow-inner-base hover:shadow-inner-3xl"</div>
      </div>
      <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <div class="shadow-inner-base active:shadow-inner-3xl bg-white">class="shadow-inner-base active:shadow-inner-3xl"</div>
      </div>
      <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <input class="shadow-inner-base focus:shadow-inner-3xl bg-white" value={'class="shadow-inner-base focus:shadow-inner-3xl"'} />
      </div>
    </div>
  </Layout>
);
