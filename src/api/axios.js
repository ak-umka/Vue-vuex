import axios from "axios";
import {getItem} from "@/helpers/persistanceStorage";

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

axios.interceptors.request.use(config => {
  const token = getItem('accessToken');
  const authorization = token ? `Token ${token}` : '';
  if (token) {
    config.headers.Authorization = authorization;
  }
  return config
})

export default axios