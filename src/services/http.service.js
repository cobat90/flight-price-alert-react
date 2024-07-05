  import Axios from "axios";

  const API_URL_FLIGHT = process.env.REACT_APP_API_URL_FLIGHT;
  const API_URL_USER = process.env.REACT_APP_API_URL_USER;

  export const flightAxiosInstance = Axios.create({
    baseURL: API_URL_FLIGHT,
  });

  export const userAxiosInstance = Axios.create({
    baseURL: API_URL_USER,
  });

  export class HttpService {
    _axios = Axios.create();

    addRequestInterceptor = (onFulfilled, onRejected) => {
      this._axios.interceptors.request.use(onFulfilled, onRejected);
    };

    addResponseInterceptor = (onFulfilled, onRejected) => {
      this._axios.interceptors.response.use(onFulfilled, onRejected);
    };

    post = async (url, data, config) => await this.request(this.getOptionsConfig("post", url, data, config));

    getOptionsConfig = (method, url, data, config) => {
      return {
        method,
        url,
        data,
        ...config,
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
