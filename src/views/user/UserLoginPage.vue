<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">用户登录</h2>
      <a-form :model="form" @submit="handleSubmit" class="login-form">
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.userAccount" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item
          field="userPassword"
          tooltip="密码不少于 8 位"
          label="密码"
        >
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item>
          <div class="form-actions">
            <a-button type="primary" html-type="submit" class="login-button">
              登录
            </a-button>
            <a href="/user/register" class="register-link">新用户注册</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useLoginUserStore } from "@/store/userStore";
import { userLoginUsingPost } from "@/api/userController";
import API from "@/api";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as API.UserLoginRequest);

const router = useRouter();
const loginUserStore = useLoginUserStore();

const handleSubmit = async () => {
  try {
    const res = await userLoginUsingPost(form);
    if (res.data.code === 0) {
      await loginUserStore.fetchLoginUser();
      Message.success("登录成功");
      router.push({
        path: "/",
        replace: true,
      });
    } else {
      Message.error("登录失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("登录过程中发生错误");
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url("@/assets/login3.jpg") no-repeat center center fixed;
  background-size: cover;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
}

.login-title {
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.login-button {
  width: 120px;
}

.register-link {
  margin-left: 20px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #40a9ff;
}

:deep(.arco-form-item-label) {
  color: #ffffff;
}

:deep(.arco-input),
:deep(.arco-input-password) {
  color: #808080; /* 将输入框文字颜色改为灰色 */
  background: rgba(255, 255, 255, 0.2);
  border: none;
}

:deep(.arco-input::placeholder),
:deep(.arco-input-password input::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.arco-input:focus),
:deep(.arco-input-password:focus) {
  color: #808080;
}

:deep(.arco-input-password .arco-input) {
  color: #808080;
}
</style>
