import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

function EditButtons({edit, toggleEditMode}) {
  return [
    <div onClick={edit} className="tools"><CheckIcon style={{color:'var(--main-color)'}} /></div>,
    <div onClick={toggleEditMode} className="tools"><CancelIcon style={{color:'var(--color-1)'}}/></div>
  ];
}
export default EditButtons;