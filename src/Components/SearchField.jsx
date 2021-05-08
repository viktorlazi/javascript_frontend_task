import {observer} from 'mobx-react';

function SearchField({setSearchField}) {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."
        onChange={(e)=>{setSearchField(e.target.value)}}
        />
    </div>
  );
}
export default observer(SearchField);