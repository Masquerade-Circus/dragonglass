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

export default () => <Layout>
  <h2>Progress</h2>
  <hr/>
  <div>
    <progress value="50" max="100">50%</progress>
  </div>

</Layout>;
