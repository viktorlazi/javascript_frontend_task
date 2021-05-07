import {observer} from 'mobx-react';

function MultioptionEditButton({props, getValue, selected}) {
  return (
    <select type="text" onChange={(e)=>{getValue(parseInt(e.target.value))}}>
      {
        props.map((e)=>{
          return <option selected={e.id === selected} value={e.id}>{e.name}</option>
        })
      }
    </select>
  );
}
export default observer(MultioptionEditButton);