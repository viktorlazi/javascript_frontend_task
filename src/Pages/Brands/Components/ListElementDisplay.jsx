function ListElementDisplay({element, invalidInputs}) {
  return (
    Object.keys(element).map((e)=>{
      switch(e){
        case 'id':
          return null
        default:
          return <div className={`${invalidInputs.includes(e) ? "invalidInput":""}`}>
            {element[e]}
          </div>
        }
      }
    )
  )
}
export default ListElementDisplay;
