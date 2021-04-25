import React from 'react';
import './styles/table.css';

function TableColumnNames({keys}) {
  return (
    <tr>
      {
        keys.map(e=>{
          return <th className="column-name">{e}</th>
        })
      }
    </tr>
  );
}

export default TableColumnNames;