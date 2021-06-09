class ProductsService{
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
  removeListItem = (id) =>{
    return new Promise((res, rej)=>{
      fetch("http://localhost:3001/products/" + id,
      {
        method:'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{
        res(data);
      })
      .catch(err=>{
        rej(err);
      });
    });
  }
  appendList = (item) =>{
    return new Promise((res, rej)=>{
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(item);
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      fetch("http://localhost:3001/products/append", requestOptions)
      .then(response => response.text())
      .then(result => res(result))
      .catch(error => rej(error));
    });
  }
  /*



  */
  
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