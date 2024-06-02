<template>
  <a-form
    :model="formSearchParams"
    :style="{ marginBottom: '20px' }"
    layout="inline"
    @submit="doSearch"
  >
    <a-form-item field="userName" label="用户名">
      <a-input v-model="formSearchParams.userName" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item field="userProfile" label="用户简介">
      <a-input
        v-model="formSearchParams.userProfile"
        placeholder="请输入用户简介"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" style="width: 100px">
        搜索
      </a-button>
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total: Number(total),
    }"
    @page-change="onPageChange"
  >
    <!--头像插槽-->
    <template #userAvatar="{ record }">
      <a-image :src="record.userAvatar" width="50" height="50" />
    </template>
    <!--头像插槽-->
    <template #optional="{ record }">
      <a-space>
        <a-button status="danger" @click="doDelete(record)">删除</a-button>
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
} from "@/api/userController";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";

const initSearchParams = {
  // 初始值，到时候可以还原回来(不应该被修改)
  current: 1,
  pageSize: 10,
};
const searchParams = ref<API.UserQueryRequest>({
  ...initSearchParams,
});
const formSearchParams = ref<API.UserQueryRequest>({});

// 用户列表
const dataList = ref<API.User[]>([]);
// 总共页面有多少条
const total = ref<number>(0);

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await listUserByPageUsingPost(searchParams.value);
  if (res.data.code == 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数组失败，" + res.data.message);
  }
};

/**
 * 监听searchParams变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 删除函数
 * @param record
 */
const doDelete = async (record: API.User) => {
  const res = await deleteUserUsingPost({ id: record.id });
  if (res.data.code == 0) {
    loadData();
  } else {
    message.error("删除失败，" + res.data.message);
  }
};

/**
 * 执行搜索
 */
const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
};

const columns = [
  { title: "id", dataIndex: "id" },
  { title: "账号", dataIndex: "userAccount" },
  { title: "用户昵称", dataIndex: "userName" },
  { title: "用户头像", dataIndex: "userAvatar", slotName: "userAvatar" },
  { title: "用户简介", dataIndex: "userProfile" },
  { title: "权限", dataIndex: "userRole" },
  { title: "创建时间", dataIndex: "createTime" },
  { title: "更新时间", dataIndex: "updateTime" },
  { title: "操作", slotName: "optional" },
];
</script>

<style scoped></style>
