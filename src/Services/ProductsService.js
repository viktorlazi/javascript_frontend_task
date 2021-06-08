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
  appendList = new Promise((res, rej)=>{

  })
  /*
  removeListItem(id){
    let newList=this.list.filter(e=>{
      return e.id !== id;
    })
    this.list = newList;
  }
  editListElement(id, element){
    const index = this.list.findIndex(obj => obj.id === id);
    this.list[index] = element
  }*/
}
const productsService = new ProductsService();
export default productsService;