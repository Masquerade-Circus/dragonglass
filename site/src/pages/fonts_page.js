import Layout from './layout';

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

export default () => <Layout>
  <h2>Fonts</h2>
  <hr/>

  <h1>
    Full example
    <small>class="text-sm text-style-italic text-weight-lighter text-transform-capitalize text-justify line-height-200"</small>
  </h1>
  <div class="text-md text-style-italic text-weight-lighter text-transform-capitalize text-justify line-height-200">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><br />Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
    id est laborum.
  </div>
  <hr />
  <div>
    <div v-for={Object.keys(sizes)}>
      {size => <div class={"text-" + size}>{"text-" + size} {sizes[size]}rem {sizes[size] * 16}px</div>}
    </div>
    <div v-for={['normal', 'italic', 'oblique', 'inherit']}>
      {item => <div class={"text-style-" + item}>{"text-style-" + item}</div>}
    </div>
    <div v-for={['normal', 'small-caps']}>
      {item => <div class={"text-variant-" + item}>{"text-variant-" + item}</div>}
    </div>
    <div v-for={['normal', 'bold', 'lighter', 'bolder', 100, 200, 300, 400, 500, 600, 700, 800, 900, 'inherit']}>
      {item => <div class={"text-weight-" + item}>{"text-weight-" + item}</div>}
    </div>
    <div v-for={['none', 'capitalize', 'uppercase', 'lowercase']}>
      {item => <div class={"text-transform-" + item}>{"text-transform-" + item}</div>}
    </div>
    <div v-for={[100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]}>
      {item => <div class={"line-height-" + item}>{"line-height-" + item}</div>}
    </div>
    <div v-for={['left', 'right', 'center', 'justify']}>
      {item => <div class={"text-" + item}>{"text-" + item}</div>}
    </div>
  </div>

</Layout>;
