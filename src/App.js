import './App.css';
import Display from './Components/Display';
import ToggleMode from './Components/ToggleMode';
import UserMode from './Stores/UserMode'
import {observer} from 'mobx-react'


function App() {
  return (
    <div className="App">
      <Display isInEditMode={UserMode.isInEditMode} />
      <ToggleMode UserMode={UserMode} />
    </div>
  );
}

export default observer(App);
