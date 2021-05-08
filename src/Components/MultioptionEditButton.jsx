import {observer} from 'mobx-react';

function MultioptionEditButton({options, getValue, selected}) {
  return (
    <select type="text" onChange={(e)=>{getValue(parseInt(e.target.value))}}>
      {
        options.map((e)=>{
          return <option selected={e.id === selected} value={e.id}>{e.name}</option>
        })
      }
    </select>
  );
}
export default observer(MultioptionEditButton);