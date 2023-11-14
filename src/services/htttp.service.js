import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
Axios.defaults.baseURL = API_URL;

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  get = async (url) => await this.request(this.getOptionsConfigGET("get", url));

  post = async (url, data) => await this.request(this.getOptionsConfig("post", url, data));

  put = async (url, data) => await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url, data) => await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url) => await this.request(this.getOptionsConfig("delete", url));

  getOptionsConfig = (method, url, data) => {
    return {
      method,
      url,
      data,
      headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Credentials': true },
    };
  };
  
  getOptionsConfigGET = (method, url, data) => {
    return {
      method,
      url,
      data,
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Credentials': true },
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => {
          resolve({
            status: res.status, 
            data: res.data,     
          });
        })
        .catch((ex) => {
          reject({
            status: ex.response ? ex.response.status : 500, 
            data: ex.response ? ex.response.data : null, 
          });
        });
    });
  }
}

export default new HttpService();
