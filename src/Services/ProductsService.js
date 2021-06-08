class ProductsService{
  list = [];
  constructor(){    

  }
  fetchList = new Promise((res, rej)=>{  
    fetch("http://localhost:3001/products")
    .then(res=>res.json())
    .then(data=>{
      res(data);
    })
    .catch(err=>{
      rej(err);
    });
  });

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