import Layout from './layout';

function getGrid(size) {
  return Array.from(new Array(size - 1)).map((i, idx) => {
    i = idx + 1;
    let classString = `w-${i}/${size}`;
    let classString2 = `w-${size - i}/${size}`;
    return [
      <div class={classString}><div class="el-1">class="{classString}"</div></div>,
      <div class={classString2}><div class="el-1">class="{classString2}"</div></div>
    ];
  });
}
export default () => <Layout>
  <h2>Simple grid <small>Columns without gutters</small></h2>
  <div class="grid">
    {getGrid(12)}
  </div>

  <hr></hr>
  <h2>Guttered grid <small>Columns with gutters</small></h2>
  <div class="grid-gutters">
    {getGrid(12)}
  </div>
  <hr></hr>
  <h2>Screen sizes</h2>
  <table>
    <thead>
      <tr>
        <th>Device</th>
        <th>Class</th>
        <th>Screen size</th>
      </tr>
    </thead>
    <tbody class="text-left">
      <tr>
        <td>Default mobile first</td>
        <td>class="w-{'{size}'}"</td>
        <td>&gt; 0px</td>
      </tr>
      <tr>
        <td>Small devices</td>
        <td>class="sm:w-{'{size}'}"</td>
        <td>&gt; 576px</td>
      </tr>
      <tr>
        <td>Medium devices</td>
        <td>class="md:w-{'{size}'}"</td>
        <td>&gt; 768px</td>
      </tr>
      <tr>
        <td>Large devices</td>
        <td>class="lg:w-{'{size}'}"</td>
        <td>&gt; 992px</td>
      </tr>
      <tr>
        <td>Extra large devices</td>
        <td>class="xl:w-{'{size}'}"</td>
        <td>&gt; 1200px</td>
      </tr>
    </tbody>
  </table>
  <hr></hr>
  <h2>Responsive columns</h2>
  <div class="grid-gutters">
    <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="el-1 hover:el-12">sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12</div></div>
    <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="el-1 hover:el-12">sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12</div></div>
    <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="el-1 hover:el-12">sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12</div></div>
    <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="el-1 hover:el-12">sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12</div></div>
    <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="el-1 hover:el-12">sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12</div></div>
    <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="el-1 hover:el-12">sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12</div></div>
  </div>
  <h2>Other row sizes</h2>
  {Array.from(new Array(11)).map((i, idx) => {
    i = idx + 2;

    return [
      <h3>{i} rows</h3>,
      <div class="grid-gutters">
        {getGrid(i)}
      </div>
    ];

  })}

</Layout>;
