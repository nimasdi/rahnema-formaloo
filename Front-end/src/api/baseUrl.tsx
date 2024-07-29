import axios from "axios";
import { toast } from "react-toastify";
import api from "./config.json";

const serverApi = axios.create({
  baseURL: api.api,
  headers : {
    "Access-Control-Allow-Headers": "http://localhost:3000/",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"      
}

});
serverApi.defaults.headers.post["Content-Type"] = "application/json";

export const setAuthToken = (token:string) => {
  if (token) {
    serverApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
  }
};
serverApi.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
    });
  }
  return Promise.reject(error);
});
export default serverApi;
