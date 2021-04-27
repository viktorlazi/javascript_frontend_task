import {observer} from 'mobx-react'

function SearchField({UserInputStore}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{UserInputStore.setSearchField(e.target.value)}}
        />
    </div>
  )
}
export default observer(SearchField)