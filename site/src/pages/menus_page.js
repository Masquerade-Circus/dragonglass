import Layout from './layout';

let DataList = <dl>
  <dt>
    <button>
      <i class="material-icons bg-info" >person</i>
      <span>Bryan Cranston <small>Bryan Cranston played the role of Walter in Breaking Bad. </small></span>
    </button>
    <button><i class="material-icons">star</i></button>
  </dt>
</dl>;


export default () => <Layout>
  <h2>Menus</h2>
  <hr/>
  <div>
    <details data-trigger>
      <summary>Menu</summary>
      <menu>{DataList}</menu>
    </details>

    <details data-trigger>
      <summary>Menu top</summary>
      <menu class="ui-top">{DataList}</menu>
    </details>

    <details data-trigger>
      <summary>Menu right</summary>
      <menu class="ui-right">{DataList}</menu>
    </details>

    <details data-trigger>
      <summary>Menu top right</summary>
      <menu class="ui-top ui-right">{DataList}</menu>
    </details>
  </div>

</Layout>;
