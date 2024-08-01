<template>
  <div class="user-answer-page">
    <h1 class="page-title">用户答题记录</h1>

    <a-card class="search-card">
      <a-form :model="formSearchParams" layout="inline" @submit="doSearch">
        <a-form-item field="resultName" label="结果名称">
          <a-input
            v-model="formSearchParams.resultName"
            placeholder="请输入结果名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="resultDesc" label="结果描述">
          <a-input
            v-model="formSearchParams.resultDesc"
            placeholder="请输入结果描述"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="appId" label="应用 ID">
          <a-input
            v-model="formSearchParams.appId"
            placeholder="请输入应用 ID"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="resetSearch">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card class="table-card">
      <a-table
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          showJumper: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
        }"
        :loading="loading"
        @page-change="onPageChange"
      >
        <template #resultPicture="{ record }">
          <a-image width="64" :src="record.resultPicture" />
        </template>
        <template #appType="{ record }">
          <a-tag :color="getAppTypeColor(record.appType)">
            {{ APP_TYPE_MAP[record.appType] }}
          </a-tag>
        </template>
        <template #scoringStrategy="{ record }">
          <a-tag :color="getScoringStrategyColor(record.scoringStrategy)">
            {{ APP_SCORING_STRATEGY_MAP[record.scoringStrategy] }}
          </a-tag>
        </template>
        <template #createTime="{ record }">
          {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              type="primary"
              status="danger"
              size="small"
              @click="confirmDelete(record)"
            >
              <template #icon>
                <icon-delete />
              </template>
              删除
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  deleteUserAnswerUsingPost,
  listMyUserAnswerVoByPageUsingPost,
} from "@/api/userAnswerController";
import API from "@/api";
import { Message, Modal } from "@arco-design/web-vue";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";

const formSearchParams = ref<API.UserAnswerQueryRequest>({});
const initSearchParams = {
  current: 1,
  pageSize: 10,
};
const searchParams = ref<API.UserAnswerQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.UserAnswerVO[]>([]);
const total = ref<number>(0);
const loading = ref<boolean>(false);

const loadData = async () => {
  loading.value = true;
  try {
    const res = await listMyUserAnswerVoByPageUsingPost(searchParams.value);
    if (res.data.code === 0) {
      dataList.value = res.data.data?.records || [];
      total.value = res.data.data?.total || 0;
    } else {
      Message.error("获取数据失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("获取数据失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
};

const resetSearch = () => {
  formSearchParams.value = {};
  doSearch();
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const confirmDelete = (record: API.UserAnswer) => {
  Modal.warning({
    title: "确认删除",
    content: "您确定要删除这条记录吗？此操作不可撤销。",
    okText: "确认",
    cancelText: "取消",
    onOk: () => doDelete(record),
  });
};

const doDelete = async (record: API.UserAnswer) => {
  if (!record.id) return;

  try {
    const res = await deleteUserAnswerUsingPost({ id: record.id });
    if (res.data.code === 0) {
      Message.success("删除成功");
      loadData();
    } else {
      Message.error("删除失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("删除失败，请稍后重试");
  }
};

const getAppTypeColor = (appType: number) => {
  const colors = ["#165DFF", "#00B42A", "#FF7D00", "#7816FF"];
  return colors[appType % colors.length];
};

const getScoringStrategyColor = (scoringStrategy: number) => {
  const colors = ["#16CFF7", "#7BF058", "#FFD400", "#FF16D8"];
  return colors[scoringStrategy % colors.length];
};

watchEffect(() => {
  loadData();
});

const columns = [
  { title: "ID", dataIndex: "id", width: 80 },
  { title: "选项", dataIndex: "choices", width: 120 },
  { title: "结果 ID", dataIndex: "resultId", width: 100 },
  { title: "名称", dataIndex: "resultName", width: 150 },
  { title: "描述", dataIndex: "resultDesc", width: 200, ellipsis: true },
  { title: "得分", dataIndex: "resultScore", width: 80 },
  { title: "应用 ID", dataIndex: "appId", width: 100 },
  { title: "应用类型", dataIndex: "appType", slotName: "appType", width: 120 },
  {
    title: "评分策略",
    dataIndex: "scoringStrategy",
    slotName: "scoringStrategy",
    width: 120,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
    width: 180,
  },
  { title: "操作", slotName: "optional", width: 100, fixed: "right" },
];
</script>

<style scoped>
.user-answer-page {
  min-height: 100vh;
  padding: 32px;
}

.page-title {
  margin-bottom: 32px;
  color: #1d2129;
  font-weight: 600;
  font-size: 32px;
  text-align: center;
}

.search-card {
  margin-bottom: 32px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.search-card :deep(.arco-form) {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.search-card :deep(.arco-form-item) {
  flex: 1;
  min-width: 200px;
  margin-bottom: 0;
}

.search-card :deep(.arco-form-item-layout-inline) {
  margin-right: 0;
}

.search-card :deep(.arco-input-wrapper) {
  width: 100%;
}

.table-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

:deep(.arco-table-th) {
  font-weight: 600;
  background-color: #f2f3f5;
}

:deep(.arco-table-tr:nth-child(even)) {
  background-color: #f9fafc;
}

:deep(.arco-form-item-label-col) {
  font-weight: 500;
}

:deep(.arco-btn-primary) {
  background-color: #165dff;
  border-color: #165dff;
  transition: all 0.3s ease;
}

:deep(.arco-btn-primary:hover) {
  background-color: #306fff;
  border-color: #306fff;
}

:deep(.arco-tag) {
  padding: 2px 8px;
  font-weight: 500;
  border-radius: 4px;
}

:deep(.arco-input) {
  border-radius: 4px;
}

:deep(.arco-btn) {
  border-radius: 4px;
}

:deep(.arco-card) {
  transition: box-shadow 0.3s ease;
}

:deep(.arco-card:hover) {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
</style>
