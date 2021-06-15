function ListElementDisplay({element, brands, invalidInputs}) {
  return (
    Object.keys(element).map((e)=>{
      switch(e){
        case 'id':
          return null
        case 'brand':
          return <div>{
            brands.length?
            brands.find((e)=>{return e.id===element['brand']}).name?
            brands.find((e)=>{return e.id===element['brand']}).name:'unbranded'
            :'unbranded'
          }</div>
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
