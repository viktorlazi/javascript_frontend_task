import React from 'react';
import BrandsStore from '../Stores/BrandsStore';
import './styles/table.css';


function TableRow({props}) {
  return (
    <tr>
      {
        props?
        Object.keys(props).map((e)=>{
          switch(e){
            case 'id':
              return null
            case 'brand':
              const brands = BrandsStore.list
              return <p>{(brands.find((e)=>{return e.id===props['brand']})||{}).name || 'unbranded'}</p>
            default:
              return <p>{props[e]}</p>
            }
          }
        )
        :
        null
      }
    </tr>
  )
}

export default TableRow;