<template>
  <div id="homePage">
    <div class="searchBar">
      <a-input-search
        :style="{ width: '320px' }"
        placeholder="欢迎搜索答题应用"
        button-text="Search"
        v-model="formSearchParams.appName"
        size="large"
        search-button
        @search="doSearch"
      />
    </div>
    <a-list
      class="list-demo-action-layout"
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
      :bordered="false"
      :data="dataList"
      :pagination-props="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <div class="card-wrapper">
          <AppCard :app="item" />
        </div>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AppCard from "@/components/AppCard.vue";
import API from "@/api";
import { listAppVoByPageUsingPost } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { REVIEW_STATUS_ENUM } from "@/constant/app";
import ShareModal from "@/components/ShareModal.vue";

const initSearchParams = {
  current: 1,
  pageSize: 12,
};

const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams,
});
const formSearchParams = ref<API.AppQueryRequest>({});
const dataList = ref<API.AppVO[]>([]);
const total = ref<number>(0);

const loadData = async () => {
  const params = {
    reviewStatus: REVIEW_STATUS_ENUM.PASS,
    ...searchParams.value,
  };
  const res = await listAppVoByPageUsingPost(params); // 使用正确的参数
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

watchEffect(() => {
  loadData();
});

const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
  loadData(); // 手动触发数据加载
};
</script>

<style scoped>
#homePage {
}

.searchBar {
  margin-bottom: 20px;
  text-align: center;
}

.card-wrapper {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-wrapper:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-10px);
}

.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  overflow: hidden;
  border-radius: 10px; /* 修改为圆角 */
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
