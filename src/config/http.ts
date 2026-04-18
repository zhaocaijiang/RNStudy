import axios from "axios";
import Config from 'react-native-config';
// 127.0.0.1 或 localhost 指向的是设备本身，而不是你的开发机器   需要使用本地 IP 地址。
axios.defaults.baseURL = Config.API_URL;

axios.interceptors.request.use(
  config => {
    // 在发送请求之前做一些处理，例如添加认证 token
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`; 
    // }
    // console.log('请求URL:', `${config.baseURL || ''}${config.url || ''}`);
    return config;
  },   
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
    response => {
      // 在响应成功后做一些处理，例如检查响应状态码
      return response;
    },
    error => {
      // 处理响应错误，例如处理 401 错误并跳转到登录页面等
      if (error.response && error.response.status === 401) {
        // 跳转到登录页面或其他处理逻辑
        console.log('Unauthorized');
      }
      return Promise.reject(error);
    }
);
export default axios;