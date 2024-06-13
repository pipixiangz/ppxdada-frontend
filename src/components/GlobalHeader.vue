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
            <div class="title">皮皮翔答答</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "匿名用户" }}
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
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

// 引入和初始化用户状态管理
const loginUserStore = useLoginUserStore();

// 引入和初始化路由器， 从 Vue Router 中获取 useRouter 钩子，用于访问路由器实例
const router = useRouter();

// Tab 栏选中菜单项， 创建一个响应式变量 selectedKeys，并初始化为一个包含根路径 "/" 的数组。这个数组表示当前选中的菜单项
const selectedKeys = ref(["/"]);

// 路由跳转后，执行对应逻辑（更新选中的菜单项）
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 路由跳转事件,点击菜单跳转到对应页面
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 点击图标或标题跳转到首页
const goToHomePage = () => {
  router.push({
    path: "/",
  });
};
</script>

<style scoped>
#globalHeader {
}

.titleBar {
  display: flex;
  align-items: center;
  cursor: pointer; /* 添加鼠标指针效果 */
}

.title {
  margin-left: 16px;
  color: black;
}

.logo {
  height: 48px;
}
</style>
