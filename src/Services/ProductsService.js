import {toJS} from 'mobx'

class ProductsService{
  list = [];
  constructor(){    
    //preset elements
    this.list.push({
        id:0,
        brand:4,
        type:'stratocaster',
        colour:'blue',
        cost:4200      
      },
      {
        id:1,
        brand:4,
        type:'telecaster',
        colour:'black',
        cost:4300      
      },
      {
        id:2,
        brand:3,
        type:'singlecut',
        colour:'sunburn',
        cost:3301 
      },
      { 
        id:3,
        brand:2,
        type:'singlecut',
        colour:'yellow',
        cost:3300     
      }    
    );
  }
  fetchList(){
    return this.list;
  }
  fetchListItems(ids){
    return this.list.filter(e=>{return ids.includes(e.id)})
  }
  appendList(list){
    list.forEach(e => {
      this.list.push(e)
    });
  }
  removeListItem(id){
    let newList=this.list.filter(e=>{
      return e.id !== id;
    })
    this.list = newList;
  }
  resetList(){
    this.list = [];
  }
  editListElement(id, element){
    const index = this.list.findIndex(obj => obj.id === id);
    this.list[index] = element
  }
}
const productsService = new ProductsService();
export default productsService;