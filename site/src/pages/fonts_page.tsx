import Layout from "./layout";

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
    <h2>Fonts</h2>
    <hr />

    <h1>
      Full example
      <small>class="text-sm italic font-light capitalize text-justify leading-loose"</small>
    </h1>
    <div class="text-base italic font-light capitalize text-justify leading-loose">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
      anim id est laborum.
    </div>
    <hr />
    <div>
      <div v-for={Object.keys(sizes)}>
        {(size) => (
          <div class={"text-" + size}>
            {"text-" + size} {sizes[size]}rem {sizes[size] * 16}px
          </div>
        )}
      </div>
      <div v-for={["normal-style", "italic", "oblique"]}>{(item) => <div class={item}>{item}</div>}</div>
      <div v-for={["font-thin", "font-extralight", "font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black"]}>{(item) => <div class={item}>{item}</div>}</div>
      <div v-for={["normal-case", "capitalize", "uppercase", "lowercase"]}>{(item) => <div class={item}>{item}</div>}</div>
      <div v-for={["leading-none", "leading-tight", "leading-snug", "leading-normal", "leading-relaxed", "leading-loose"]}>{(item) => <div class={item}>{item}</div>}</div>
      <div v-for={["left", "right", "center", "justify"]}>{(item) => <div class={"text-" + item}>{"text-" + item}</div>}</div>
    </div>
  </Layout>
);
