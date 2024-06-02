import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginUserUsingGet } from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 登录用户信息全局状态
 */

// 定义一个新的 store，名称为 "loginUser"
export const useLoginUserStore = defineStore("loginUser", () => {
  // 定义一个响应式变量 loginUser，初始值为一个包含 userName 属性的对象，默认值为 "未登录"
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  // 定义一个异步函数 fetchLoginUser，用于从服务器获取登录用户信息
  async function fetchLoginUser() {
    // 调用 API 获取登录用户信息, 并使用 await 等待请求完成
    // await异步变同步
    const res = await getLoginUserUsingGet();
    // 判断 API 返回结果，如果返回码为 0 且数据存在，更新 loginUser 的值
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      // 失败了，userrole还是未登录
      loginUser.value = { userRole: ACCESS_ENUM.NOT_LOGIN };
      /*// 测试代码
      setTimeout(() => {
        loginUser.value = {
          id: 1,
          userName: "已登录",
          userRole: ACCESS_ENUM.ADMIN,
        };
      }, 3000);*/
    }
  }

  // 定义一个函数 setLoginUser，用于手动设置登录用户信息
  function setLoginUser(newLoginUser: API.LoginUserVO) {
    // 更新 loginUser 的值
    loginUser.value = newLoginUser;
  }

  // 返回定义的响应式变量和方法，以便在其他地方使用
  return { loginUser, setLoginUser, fetchLoginUser };
});
