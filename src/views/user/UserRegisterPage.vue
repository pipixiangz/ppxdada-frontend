<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">用户注册</h2>
      <a-form :model="form" @submit="handleSubmit" class="register-form">
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
        <a-form-item field="checkPassword" label="确认密码">
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请确认密码"
          />
        </a-form-item>
        <a-form-item>
          <div class="form-actions">
            <a-button type="primary" html-type="submit" class="register-button">
              注册
            </a-button>
            <a href="/user/login" class="login-link">老用户登录</a>
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
import { userRegisterUsingPost } from "@/api/userController";
import API from "@/api";

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as API.UserRegisterRequest);

const router = useRouter();
const loginUserStore = useLoginUserStore();

const handleSubmit = async () => {
  try {
    const res = await userRegisterUsingPost(form);
    if (res.data.code === 0) {
      Message.success("注册成功");
      router.push({
        path: "/user/login",
        replace: true,
      });
    } else {
      Message.error("注册失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("注册过程中发生错误");
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url("@/assets/login3.jpg") no-repeat center center fixed;
  background-size: cover;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
}

.register-title {
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.register-form {
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

.register-button {
  width: 120px;
}

.login-link {
  margin-left: 20px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #40a9ff;
}

:deep(.arco-form-item-label) {
  color: #f0f0f0 !important;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

:deep(.register-form .arco-form-item-label > label) {
  color: #f0f0f0 !important;
}

:deep(.arco-input),
:deep(.arco-input-password) {
  color: #808080;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:deep(.arco-input::placeholder),
:deep(.arco-input-password input::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

:deep(.arco-input:focus),
:deep(.arco-input-password:focus) {
  color: #808080;
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

:deep(.arco-input-password .arco-input) {
  color: #808080;
}
</style>
