import React from 'react'

function TableRow({props}) {
  return (
    <tr>
      {
        props?
        Object.keys(props).map((e)=>{
          return <th>{props[e]}</th>
        })
        :
        null
      }
    </tr>
  )
}

export default TableRow
