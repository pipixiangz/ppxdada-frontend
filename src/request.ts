import axios from "axios";
import { Message } from "@arco-design/web-vue";

const isDiv = process.env.NODE_ENV === "development";
const myAxios = axios.create({
  baseURL: isDiv ? "http://localhost:8101" : "https://ppxdada.online",
  timeout: 60000,
  // 携带cookie
  withCredentials: true,
});

// 全局请求拦截器
// Add a request interceptor
myAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截器
// Add a response interceptor
myAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    // 取得后端返回的数据
    const { data } = response;
    // 用户未登录
    if (data.code === 40100) {
      // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/user/login")
      ) {
        Message.warning("请先登录");
        // 保用户在未登录时不能访问特定页面，而是被引导到登录页面进行身份验证
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 全局导出
export default myAxios;
