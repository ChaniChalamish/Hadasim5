import { Table } from 'react-bootstrap'

function GenericTable({ columns, data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, cidx) => (
              <td key={cidx}>{col.accessor(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default GenericTable
