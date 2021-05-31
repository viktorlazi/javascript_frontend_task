class BrandsService{
  list = [];
  constructor(){    
    //preset elements
    this.list.push({
        id:1,
        name:'unbranded',
        numberOfProducts: 0
      },
      {
        id:2,
        name:'epiphone',
        numberOfProducts: 0
      },
      {
        id:3,
        name:'cort',
        numberOfProducts: 0
      },
      {
        id:4,
        name:'fender',
        numberOfProducts: 1
      },
      {
        id:5,
        name:'yamaha',
        numberOfProducts: 0
      } 
    );
  }
  fetchList(){
    return this.list;
  }
  fetchListItems(ids){
    return this.list.filter(e=>{return [ids].includes(e.id)});
  }
  appendList(list){
    list.forEach(e => {
      this.list.push(e);
    });
  }
  removeListItem(id){
    this.list.splice(id, 1);
  }
  resetList(){
    this.list = [];
  }
  editListElement(id, element){
    this.list[this.list.find(e=>e===id)] = element;
  }
}
const brandsService = new BrandsService();
export default brandsService;