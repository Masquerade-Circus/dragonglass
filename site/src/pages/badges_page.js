import Layout from './layout';

let colors = ['primary', 'accent', 'info', 'success', 'warning', 'danger', 'default'];

export default () => <Layout>
  <h2>Badges</h2>
  <hr/>
  <div>
    {colors.map(
      item => <div>
        <code>{`<div data-badge="1" class="after:bg-${item}">...</div>`}</code>
        <span data-badge="1" class={'after:bg-' + item}></span>
      </div>
    )}
  </div>

</Layout>;
