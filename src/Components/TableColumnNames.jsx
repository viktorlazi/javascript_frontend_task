import React from 'react';
import './styles/table.css';

function TableColumnNames({keys, sortBy}) {
  return (
    <tr>
      {
        keys.map(e=>{
          return <th onClick={()=>{sortBy(e)}} className="column-name">{e}</th>
        })
      }
    </tr>
  );
}

export default TableColumnNames;