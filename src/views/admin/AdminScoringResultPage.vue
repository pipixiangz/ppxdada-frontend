<template>
  <div class="scoring-result-page">
    <a-card class="search-card" :bordered="false">
      <template #title>
        <a-typography-title :heading="6" style="margin-bottom: 0">
          <a-space>
            <icon-search />
            高级搜索
          </a-space>
        </a-typography-title>
      </template>
      <a-form :model="formSearchParams" @submit="doSearch" layout="horizontal">
        <a-row :gutter="16">
          <a-col :span="5">
            <a-form-item field="resultName" label="结果名称" hide-label>
              <a-input
                v-model="formSearchParams.resultName"
                placeholder="结果名称"
                allow-clear
              >
                <template #prefix>
                  <icon-file />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="resultDesc" label="结果描述" hide-label>
              <a-input
                v-model="formSearchParams.resultDesc"
                placeholder="结果描述"
                allow-clear
              >
                <template #prefix>
                  <icon-edit />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="appId" label="应用 ID" hide-label>
              <a-input
                v-model="formSearchParams.appId"
                placeholder="应用 ID"
                allow-clear
              >
                <template #prefix>
                  <icon-apps />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="userId" label="用户 ID" hide-label>
              <a-input
                v-model="formSearchParams.userId"
                placeholder="用户 ID"
                allow-clear
              >
                <template #prefix>
                  <icon-user />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-space>
              <a-button @click="resetSearch" status="warning">
                <template #icon>
                  <icon-refresh />
                </template>
                重置
              </a-button>
              <a-button type="primary" html-type="submit">
                <template #icon>
                  <icon-search />
                </template>
                搜索
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card class="result-card" :bordered="false">
      <template #title>
        <div class="result-card-header">
          <a-typography-title :heading="6" style="margin-bottom: 0">
            <a-space>
              <icon-list />
              评分结果列表
            </a-space>
          </a-typography-title>
          <div class="result-card-actions"></div>
        </div>
      </template>
      <a-table
        :columns="columns"
        :data="dataList"
        :loading="loading"
        :pagination="{
          showTotal: true,
          showJumper: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
        }"
        @page-change="onPageChange"
        :stripe="true"
        :bordered="{ cell: true }"
      >
        <template #resultPicture="{ record }">
          <a-image width="64" :src="record.resultPicture" />
        </template>
        <template #createTime="{ record }">
          <a-typography-text
            >{{ formatDate(record.createTime) }}
          </a-typography-text>
        </template>
        <template #updateTime="{ record }">
          <a-typography-text
            >{{ formatDate(record.updateTime) }}
          </a-typography-text>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-tooltip content="查看详情">
              <a-button type="text" size="small" @click="viewDetails(record)">
                <icon-eye />
              </a-button>
            </a-tooltip>
            <a-tooltip content="编辑">
              <a-button
                type="text"
                size="small"
                status="warning"
                @click="editRecord(record)"
              >
                <icon-edit />
              </a-button>
            </a-tooltip>
            <a-popconfirm
              content="确定要删除这条记录吗？"
              @ok="doDelete(record)"
              position="left"
            >
              <a-tooltip content="删除">
                <a-button type="text" size="small" status="danger">
                  <icon-delete />
                </a-button>
              </a-tooltip>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <!-- 添加Modal组件 -->
    <a-modal
      v-model:visible="detailModalVisible"
      title="详细信息"
      @cancel="closeDetailModal"
      @ok="closeDetailModal"
    >
      <a-descriptions :data="detailsData" :column="1" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, computed } from "vue";
import { Message } from "@arco-design/web-vue";
import {
  IconSearch,
  IconFile,
  IconEdit,
  IconApps,
  IconUser,
  IconRefresh,
  IconList,
  IconDownload,
  IconEye,
  IconDelete,
} from "@arco-design/web-vue/es/icon";
import {
  deleteScoringResultUsingPost,
  listScoringResultByPageUsingPost,
} from "@/api/scoringResultController";
import type { ScoringResultQueryRequest, ScoringResult } from "@/api/types";

const formSearchParams = ref<ScoringResultQueryRequest>({});
const initSearchParams = {
  current: 1,
  pageSize: 10,
};
const searchParams = reactive<ScoringResultQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<ScoringResult[]>([]);
const total = ref<number>(0);
const loading = ref<boolean>(false);

const loadData = async () => {
  loading.value = true;
  try {
    const res = await listScoringResultByPageUsingPost(searchParams);
    if (res.data.code === 0) {
      dataList.value = res.data.data?.records || [];
      total.value = res.data.data?.total || 0;
    } else {
      Message.error("获取数据失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("获取数据出错");
  } finally {
    loading.value = false;
  }
};

const doSearch = () => {
  Object.assign(searchParams, initSearchParams, formSearchParams.value);
};

const resetSearch = () => {
  formSearchParams.value = {};
  Object.assign(searchParams, initSearchParams);
};

const onPageChange = (page: number) => {
  searchParams.current = page;
};

const doDelete = async (record: ScoringResult) => {
  if (!record.id) return;

  try {
    const res = await deleteScoringResultUsingPost({ id: record.id });
    if (res.data.code === 0) {
      Message.success("删除成功");
      loadData();
    } else {
      Message.error("删除失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("删除出错");
  }
};

const editRecord = (record: ScoringResult) => {
  // Implement edit functionality
  console.log("Edit record:", record);
};

const formatDate = (date: string | number) => {
  return new Date(date).toLocaleString();
};

watchEffect(() => {
  loadData();
});

const columns = [
  { title: "ID", dataIndex: "id" },
  { title: "名称", dataIndex: "resultName" },
  { title: "描述", dataIndex: "resultDesc" },
  { title: "结果属性", dataIndex: "resultProp" },
  { title: "评分范围", dataIndex: "resultScoreRange" },
  { title: "应用 ID", dataIndex: "appId" },
  { title: "用户 ID", dataIndex: "userId" },
  { title: "创建时间", dataIndex: "createTime", slotName: "createTime" },
  { title: "更新时间", dataIndex: "updateTime", slotName: "updateTime" },
  { title: "操作", slotName: "optional", width: 160, fixed: "right" },
];

const detailModalVisible = ref(false);
const currentRecord = ref<ScoringResult | null>(null);

const viewDetails = (record: ScoringResult) => {
  currentRecord.value = record;
  detailModalVisible.value = true;
};

const closeDetailModal = () => {
  detailModalVisible.value = false;
  currentRecord.value = null;
};

// 计算属性来格式化详情数据
const detailsData = computed(() => {
  if (!currentRecord.value) return [];

  return [
    { label: "ID", value: currentRecord.value.id },
    { label: "名称", value: currentRecord.value.resultName },
    { label: "描述", value: currentRecord.value.resultDesc },
    { label: "结果属性", value: currentRecord.value.resultProp },
    { label: "评分范围", value: currentRecord.value.resultScoreRange },
    { label: "应用 ID", value: currentRecord.value.appId },
    { label: "用户 ID", value: currentRecord.value.userId },
    { label: "创建时间", value: formatDate(currentRecord.value.createTime) },
    { label: "更新时间", value: formatDate(currentRecord.value.updateTime) },
  ];
});
</script>

<style scoped>
.scoring-result-page {
  padding: 20px;
  background-color: var(--color-fill-2);
}

.search-card,
.result-card {
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.search-card {
  background-color: var(--color-bg-2);
}

.result-card {
  background-color: var(--color-bg-2);
}

.result-card-header {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.result-card-actions {
  display: flex;
  align-items: center;
}

:deep(.arco-form-item) {
  margin-bottom: 0;
}

:deep(.arco-input-wrapper) {
  width: 100%;
}

:deep(.arco-table-th) {
  background-color: var(--color-fill-2) !important;
}

:deep(.arco-btn-text) {
  padding: 0 4px;
}

:deep(.arco-card-header) {
  padding-right: 20px;
}
</style>
