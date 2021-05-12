import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function EditButtons({removeElement, toggleEditMode}) {
  return [
    <div onClick={toggleEditMode} className="tools"><EditIcon style={{color:'var(--main-color)'}}/></div>,
    <div onClick={removeElement} className="tools"><DeleteIcon style={{color:'var(--color-1)'}}/></div>
  ];
}
export default EditButtons