import React from 'react';
import './styles/table.css';

function TableColumnNames({keys, setSortBy, sortBy}) {
  return (
    <tr className="column-names">
      {
        keys.map(e=>{
          return <th onClick={()=>{setSortBy(e)}} className={`column-name `+`${sortBy==e ? "sortBy":""}`}>{e}</th>
        })
      }
    </tr>
  );
}

export default TableColumnNames;