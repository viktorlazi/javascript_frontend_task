import './styles/listElement.css'
import {observer} from 'mobx-react'

function DisplayList(props) {
  return (
    <div>
      {
        props.children.length ? 
        <div class="table">
          {
            props.children
          }
        </div>
        : <h4>No results</h4>
      }
    </div>
  )
}
export default observer(DisplayList)