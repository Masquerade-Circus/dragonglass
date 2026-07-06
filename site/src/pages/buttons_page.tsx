import Layout from "./layout";
let colors = ["primary", "accent", "info", "success", "warning", "danger", "default"];
let weights = ["-bright", "-lightest", "-light", "", "-dark", "-darkest"];

let sizes = {
  "2xs": 0.75,
  xs: 0.8, // 8px
  sm: 0.9, // 12px
  base: 1, // 16px
  lg: 1.25, // 20px
  xl: 1.5, // 24px
  "2xl": 1.965,
  "3xl": 2.25
};

export default () => (
  <Layout>
    <h1>Default Buttons</h1>
    <button>Default Button</button>
    <div v-for={colors}>{(color) => <button class={`bg-${color}`}>class="bg-{color}"</button>}</div>
    <hr />

    <h1>Raised Buttons</h1>
    <div v-for={colors}>{(color) => <button class={`bg-${color} shadow-base`}>class="bg-{color} shadow-base"</button>}</div>
    <hr />

    <h1>Outlined Buttons</h1>
    <div v-for={colors}>{(color) => <div v-for={weights}>{(weight) => <button class={`border-${color + weight}`}>class="border-{color + weight}"</button>}</div>}</div>
    <hr />

    <h1>Focus Outlines</h1>
    <div v-for={colors}>{(color) => <button class={`bg-${color} focus:outline-2 focus:outline-offset-1 focus:outline-${color}-light`}>class="bg-{color} focus:outline-2 focus:outline-offset-1 focus:outline-{color}-light"</button>}</div>
    <button class="focus:outline-none">class="focus:outline-none"</button>
    <hr />

    <h1>FAB Buttons</h1>
    <button class={`fab inline`}>+</button>
    <code>fab inline</code>
    <div v-for={colors}>{(color) => <button class={`fab bg-${color} inline`}>+</button>}</div>

    <h1>Sizes</h1>

    <div v-for={Object.keys(sizes)}>
      {(size) => (
        <div>
          <button class={`bg-primary text-${size}`}>+</button>
          <button class={`bg-primary shadow-base text-${size}`}>+</button>
          <button class={`border-primary text-${size}`}>+</button>
          <button class={`fab bg-primary inline text-${size}`}>+</button>

          <span class="text-base"> {"text-" + size}</span>
        </div>
      )}
    </div>
  </Layout>
);
