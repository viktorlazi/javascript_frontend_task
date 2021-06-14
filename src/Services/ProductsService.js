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
}