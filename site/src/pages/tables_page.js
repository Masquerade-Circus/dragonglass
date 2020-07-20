import Layout from './layout';

let primaryColors = [
  'primary',
  'accent',
  'success',
  'info',
  'warning',
  'danger',
  'default'
];

const Table = props => <table {...props}>
  <caption>Food Details</caption>
  <thead>
    <tr>
      <th class="text-left">Type of Food</th>
      <th>Calories</th>
      <th>Tasty Factor</th>
      <th>Average Price</th>
      <th>Rarity</th>
      <th>Average Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of Food" class="text-left">Slice of Pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Tasty Factor">95%</td>
      <td data-label="Average Price">$5.00</td>
      <td data-label="Rarity" class="text-left">Common</td>
      <td data-label="Average Rating">8/10</td>
    </tr>
    <tr>
      <td data-label="Type of Food" class="text-left">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Tasty Factor">87%</td>
      <td data-label="Average Price">$3.50</td>
      <td data-label="Rarity" class="text-left">Common</td>
      <td data-label="Average Rating">7.5/10</td>
    </tr>
    <tr>
      <td data-label="Type of Food" class="text-left">Slice of Pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Tasty Factor">95%</td>
      <td data-label="Average Price">$5.00</td>
      <td data-label="Rarity" class="text-left">Common</td>
      <td data-label="Average Rating">8/10</td>
    </tr>
  </tbody>
</table>;
;

export default () => <Layout>
  <h2>Tables</h2>
  <hr/>
  <div>
    <h2>Simple table <small>(responsive by default)</small></h2>
    <Table />
    <hr/>
    <h2>Colors</h2>
    <code>{'<table class="ui-{color}>...</table>'}</code>
    <div v-for={primaryColors}>
      {item => <Table class={`ui-${item}`} />}
    </div>
  </div>

</Layout>;
