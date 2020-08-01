import Layout from './layout';
let colors = ['primary', 'accent', 'info', 'success', 'warning', 'danger', 'default'];
function getElevations(emboss = false) {
  return Array.from(new Array(12)).map((el, index) => {
    let elevation = index + 1;
    let elevationString = `${elevation}`;
    if (emboss) {
      return <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
        <div class={`em-${elevationString} bg-white`}>class="{"em-" + elevationString}"</div>
      </div>;
    }
    return <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <div class={`el-${elevationString} bg-white`}>class="{"el-" + elevationString}"</div>
    </div>;
  });
}
export default () => <Layout>
  <h2>Elevations</h2>
  <div class="grid-gutters">
    {getElevations()}
  </div>
  <h2>Embosses</h2>
  <div class="grid-gutters">
    {getElevations(true)}
  </div>
  <h2>Utility</h2>
  <div class="grid-gutters">
    <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <div class="el-2 hover:el-12 bg-white">class="el-2 hover:el-12"</div>
    </div>
    <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <div class="el-2 active:el-12 bg-white">class="el-2 active:el-12"</div>
    </div>
    <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <input class="el-2 focus:el-12 bg-white" value={'class="el-2 focus:el-12"'}/>
    </div>
    <hr/>
    <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <div class="em-2 hover:em-12 bg-white">class="em-2 hover:em-12"</div>
    </div>
    <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <div class="em-2 active:em-12 bg-white">class="em-2 active:em-12"</div>
    </div>
    <div class="lg:w-3/12 lg:w-4/12 md:w-6/12">
      <input class="em-2 focus:em-12 bg-white" value={'class="em-2 focus:em-12"'} />
    </div>
  </div>
</Layout>;
