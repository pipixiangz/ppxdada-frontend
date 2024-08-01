<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="titleBar" @click="goToHomePage">
            <img class="logo" src="../assets/testbig.png" />
            <div class="title">皮皮翔AI答答</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="120px">
      <div
        v-if="loginUserStore.loginUser.id"
        class="user-info"
        @click="goToLoginPage"
      >
        <a-avatar :size="32" :image-url="loginUserStore.loginUser.userAvatar">
          {{ loginUserStore.loginUser.userName ? loginUserStore.loginUser.userName[0].toUpperCase() : 'U' }}
        </a-avatar>
        <span class="user-name">{{
          loginUserStore.loginUser.userName ?? "匿名用户"
        }}</span>
      </div>
      <div v-else>
        <a-button type="primary" @click="goToLoginPage">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";

const loginUserStore = useLoginUserStore();
const router = useRouter();
const selectedKeys = ref(["/"]);

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const goToHomePage = () => {
  router.push({
    path: "/",
  });
};

const goToLoginPage = () => {
  router.push({
    path: "/user/login",
  });
};
</script>

<style scoped>
#globalHeader {
  padding: 0 20px;
  background-color: rgba(255, 255, 255);
  backdrop-filter: blur(10px); /* 添加模糊效果，增强可读性 */
}

.titleBar {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.title {
  margin-left: 16px;
  color: black;
  font-weight: bold;
}

.logo {
  height: 48px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-name {
  margin-left: 8px;
  font-weight: bold;
}

/* 加粗导航栏字体 */
:deep(.arco-menu-item) {
  font-weight: bold;
}

/* 确保选中的菜单项字体颜色清晰可见 */
:deep(.arco-menu-selected) {
  color: rgb(var(--primary-6));
}
</style>
