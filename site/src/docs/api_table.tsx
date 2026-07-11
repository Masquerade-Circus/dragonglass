type ApiTableRow = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

type ApiTableProps = {
  caption: string;
  rows: ApiTableRow[];
};

const ApiTable = ({ caption, rows }: ApiTableProps) => (
  <table>
    <caption>{caption}</caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Default</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr>
          <td data-label="Name">{row.name}</td>
          <td data-label="Type">{row.type}</td>
          <td data-label="Default">{row.defaultValue}</td>
          <td data-label="Description">{row.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ApiTable;
export { type ApiTableProps, type ApiTableRow };
