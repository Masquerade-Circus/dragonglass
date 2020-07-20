import Layout from './layout';
let colors = ['primary', 'accent', 'info', 'success', 'warning', 'danger', 'default'];
let weights = ['-bright', '-lightest', '-light', '', '-dark', '-darkest'];

export default () => <Layout>
  <h2>Colors</h2>
  <div class="grid">
    {colors.map(color => {
      return <div class="md:w-1/4 lg:w-1/7">
        <div class="el-2">
          {weights.map((weight) => {
            return <div style="padding: 10px" class={`bg-${color}${weight}`}>
              {`bg-${color}${weight}`}
            </div>;
          })}
          {weights.map((weight) => {
            return <div style="padding: 10px" class={`color-${color}${weight}`}>
              {`${color}${weight}`}
            </div>;
          })}
        </div>
      </div>;
    })}
  </div>
  <h2>Utility</h2>
  <div class="grid-gutters">
    <div class="md:w-1/3 lg:w-1/4">
      <div class="color-primary-dark hover:color-primary">class="color-primary-dark hover:color-primary"</div>
    </div>
    <div class="md:w-1/3 lg:w-1/4">
      <div class="color-primary-dark active:color-primary">class="color-primary-dark active:color-primary"</div>
    </div>
    <div class="md:w-1/3 lg:w-1/4">
      <input class="color-primary-dark focus:color-primary" value={'class="color-primary-dark focus:color-primary"'} />
    </div>
  </div>
  <div class="grid-gutters">
    <div class="md:w-1/3 lg:w-1/4">
      <div style="padding: 10px" class="bg-primary-dark hover:bg-primary">class="bg-primary-dark hover:bg-primary"</div>
    </div>
    <div class="md:w-1/3 lg:w-1/4">
      <div style="padding: 10px" class="bg-primary-dark active:bg-primary">class="bg-primary-dark active:bg-primary"</div>
    </div>
    <div class="md:w-1/3 lg:w-1/4">
      <input style="padding: 10px" class="bg-primary-dark focus:bg-primary" value={'class="bg-primary-dark focus:bg-primary"'} />
    </div>
  </div>
</Layout>;
