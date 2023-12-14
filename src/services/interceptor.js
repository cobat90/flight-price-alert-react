import { flightAxiosInstance, userAxiosInstance } from "./http.service";

export const setupAxiosInterceptors = (onUnauthenticated) => {
  const onRequestSuccess = async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    console.info("config: ", config);
    return config;
  };

  const onRequestFail = (error) => Promise.reject(error);

  flightAxiosInstance.interceptors.request.use(onRequestSuccess, onRequestFail);
  userAxiosInstance.interceptors.request.use(onRequestSuccess, onRequestFail);

  const onResponseSuccess = (response) => response;

  const onResponseFail = (error) => {
    const status = error.status || error.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }

    return Promise.reject(error);
  };

  flightAxiosInstance.interceptors.response.use(onResponseSuccess, onResponseFail);
  userAxiosInstance.interceptors.response.use(onResponseSuccess, onResponseFail);
};