import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function EditButtons({removeElement, toggleEditMode, confirmDelete, isEdited}) {
  return [
    <div onClick={toggleEditMode} className="tools"><EditIcon style={{color:'var(--main-color)'}}/></div>,
    <div onClick={removeElement} className="tools">
      {
        !confirmDelete?
        <DeleteIcon style={{color:'var(--color-1)'}}/>:
        <p style={{color:'var(--color-1)'}}>Confirm</p>
      }
    </div>    
  ];
}
export default EditButtons