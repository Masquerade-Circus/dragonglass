const Layout = require("./layout");
let colors = ["primary", "accent", "info", "success", "warning", "danger", "default"];
let weights = ["-bright", "-lightest", "-light", "", "-dark", "-darkest"];

let sizes = {
  xs: 0.8, // 8px
  sm: 0.9, // 12px
  md: 1, // 16px
  lg: 1.25, // 20px
  xl: 1.5, // 24px
  xl2: 1.75, // 28px
  xl3: 2, // 32px
  xl4: 2.25, // 36px
  xl5: 2.5, // 40px
  xl6: 2.75, // 44px
  xl7: 3 // 48px
};

module.exports = () => (
  <Layout>
    <h1>Default Buttons</h1>
    <button>Default Button</button>
    <div v-for={colors}>{(color) => <button class={`bg-${color}`}>class="bg-{color}"</button>}</div>
    <hr />

    <h1>Raised Buttons</h1>
    <div v-for={colors}>{(color) => <button class={`bg-${color} el-4`}>class="bg-{color} el-4"</button>}</div>
    <hr />

    <h1>Outlined Buttons</h1>
    <div v-for={colors}>{(color) => <div v-for={weights}>{(weight) => <button class={`border-${color + weight}`}>class="border-{color + weight}"</button>}</div>}</div>
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
          <button class={`bg-primary el-4 text-${size}`}>+</button>
          <button class={`border-primary text-${size}`}>+</button>
          <button class={`fab bg-primary inline text-${size}`}>+</button>

          <span class="text-md"> {"text-" + size}</span>
        </div>
      )}
    </div>
  </Layout>
);
