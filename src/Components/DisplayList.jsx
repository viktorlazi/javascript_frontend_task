import './styles/listElement.css';
import {observer} from 'mobx-react';

function DisplayList(props) {
  return (
    <div>
      {
        props.children.length ? 
        <div className="table">
          {
            props.children
          }
        </div>
        : null
      }
    </div>
  );
}
export default observer(DisplayList);