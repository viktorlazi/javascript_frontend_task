const webApiUrl = 'http://localhost:3001/products';

export default class ProductsService{
  get = async () => {
    const options = {
      method: "GET",
    }
    const request = new Request(webApiUrl, options);
    const response = await fetch(request);
    return response.json();
  }
  post = async (model) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers,
      body: JSON.stringify(model)
    }
    const request = new Request(webApiUrl, options);
    const response = await fetch(request);
    return response;
  }
  put = async (model) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json");
    var options = {
      method: "PUT",
      headers,
      body: JSON.stringify(model)
    }
    const request = new Request(webApiUrl, options);
    const response = await fetch(request);
    return response;
  }
  delete = async (id) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "DELETE",
      headers
    }
    const request = new Request(webApiUrl + "/" + id, options);
    const response = await fetch(request);
    return response;
  }
  
  /*
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
      fetch("http://localhost:3001/products", requestOptions)
      .then(response => response.text())
      .then(result => res(result))
      .catch(error => rej(error));
    });
  }
  editListItem = (id, edited) =>{
    return new Promise((res, rej)=>{
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({id, edited});
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
      };
      fetch("http://localhost:3001/products", requestOptions)
      .then(response => response.text())
      .then(result => res(result))
      .catch(error => rej(error));
    });
  }
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