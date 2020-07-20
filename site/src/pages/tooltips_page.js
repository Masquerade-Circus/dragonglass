import Layout from './layout';

let colors = ['primary', 'accent', 'info', 'success', 'warning', 'danger', 'default'];
let directions = ['left', 'right', 'top'];

export default () => <Layout>
  <h2>Tooltips</h2>
  <hr/>
  <div>
    <h2>Default tooltip</h2>
    <hr />
    <span data-tooltip="This is a tooltip" class="inline">This element has a tooltip</span>
    <br />
    <code>{`<div data-tooltip="This is a tooltip">...</div>`}</code>
    <h2>Colors</h2>
    <hr />
    {colors.map(
      item => <div>
        <span data-tooltip="This is a tooltip" class={'inline after:bg-' + item}>This element has a <span class={`color-${item}`}>{item}</span> tooltip</span>
      </div>
    )}
    <code>{`<div data-tooltip="This is a tooltip" class="after:bg-{color}">...</div>`}</code>
    <h2>Directions</h2>
    {directions.map(
      item => <div><span data-tooltip="This is a tooltip" class={'inline u-ml-xl8 ui-' + item}>This element has a <span class={`color-info`}>{item}</span> tooltip</span></div>
    )}
    {directions.map(
      item => <div>
        <code>{`<div data-tooltip="This is a tooltip" class="ui-${item}">...</div>`}</code>
      </div>
    )}


  </div>

</Layout>;
