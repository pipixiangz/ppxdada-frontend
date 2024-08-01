<template>
  <div class="app-management-container">
    <h1 class="page-title">应用管理</h1>
    <a-card class="search-card">
      <a-form :model="formSearchParams" layout="horizontal" @submit="doSearch">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="appName" label="应用名称">
              <a-input
                v-model="formSearchParams.appName"
                placeholder="请输入应用名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="appDesc" label="应用描述">
              <a-input
                v-model="formSearchParams.appDesc"
                placeholder="请输入应用描述"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
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
          </a-col>
        </a-row>
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
        <template #appIcon="{ record }">
          <a-avatar :size="64" :image-url="record.appIcon" />
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
        <template #reviewStatus="{ record }">
          <a-tag :color="getReviewStatusColor(record.reviewStatus)">
            {{ REVIEW_STATUS_MAP[record.reviewStatus] }}
          </a-tag>
        </template>
        <template #reviewTime="{ record }">
          <a-typography-text>
            {{
              record.reviewTime &&
              dayjs(record.reviewTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </a-typography-text>
        </template>
        <template #createTime="{ record }">
          <a-typography-text>
            {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
          </a-typography-text>
        </template>
        <template #updateTime="{ record }">
          <a-typography-text>
            {{ dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
          </a-typography-text>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              v-if="record.reviewStatus !== REVIEW_STATUS_ENUM.PASS"
              type="primary"
              status="success"
              size="small"
              @click="doReview(record, REVIEW_STATUS_ENUM.PASS, '')"
            >
              通过
            </a-button>
            <a-button
              v-if="record.reviewStatus !== REVIEW_STATUS_ENUM.REJECT"
              type="primary"
              status="warning"
              size="small"
              @click="
                doReview(record, REVIEW_STATUS_ENUM.REJECT, '不符合上架要求')
              "
            >
              拒绝
            </a-button>
            <a-popconfirm
              content="确定要删除这个应用吗？"
              @ok="doDelete(record)"
            >
              <a-button type="primary" status="danger" size="small">
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  deleteAppUsingPost,
  listAppByPageUsingPost,
  doAppReviewUsingPost,
} from "@/api/appController";
import API from "@/api";
import { Message } from "@arco-design/web-vue";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import {
  APP_SCORING_STRATEGY_MAP,
  APP_TYPE_MAP,
  REVIEW_STATUS_ENUM,
  REVIEW_STATUS_MAP,
} from "@/constant/app";

const formSearchParams = ref<API.AppQueryRequest>({});
const initSearchParams = {
  current: 1,
  pageSize: 10,
};
const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.App[]>([]);
const total = ref<number>(0);
const loading = ref<boolean>(false);

const loadData = async () => {
  loading.value = true;
  try {
    const res = await listAppByPageUsingPost(searchParams.value);
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

const doDelete = async (record: API.App) => {
  if (!record.id) return;

  try {
    const res = await deleteAppUsingPost({ id: record.id });
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

const doReview = async (
  record: API.App,
  reviewStatus: number,
  reviewMessage?: string
) => {
  if (!record.id) return;

  try {
    const res = await doAppReviewUsingPost({
      id: record.id,
      reviewStatus,
      reviewMessage,
    });
    if (res.data.code === 0) {
      Message.success("审核成功");
      loadData();
    } else {
      Message.error("审核失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("审核失败，请稍后重试");
  }
};

const getAppTypeColor = (appType: number) => {
  const colors = ["blue", "green", "orange", "purple"];
  return colors[appType % colors.length];
};

const getScoringStrategyColor = (scoringStrategy: number) => {
  const colors = ["cyan", "lime", "gold", "magenta"];
  return colors[scoringStrategy % colors.length];
};

const getReviewStatusColor = (reviewStatus: number) => {
  switch (reviewStatus) {
    case REVIEW_STATUS_ENUM.PASS:
      return "green";
    case REVIEW_STATUS_ENUM.REJECT:
      return "red";
    default:
      return "blue";
  }
};

watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 80,
  },
  {
    title: "名称",
    dataIndex: "appName",
    width: 150,
  },
  {
    title: "描述",
    dataIndex: "appDesc",
    width: 200,
    ellipsis: true,
  },
  {
    title: "图标",
    dataIndex: "appIcon",
    slotName: "appIcon",
    width: 100,
  },
  {
    title: "应用类型",
    dataIndex: "appType",
    slotName: "appType",
    width: 120,
  },
  {
    title: "评分策略",
    dataIndex: "scoringStrategy",
    slotName: "scoringStrategy",
    width: 120,
  },
  {
    title: "审核状态",
    dataIndex: "reviewStatus",
    slotName: "reviewStatus",
    width: 100,
  },
  {
    title: "审核信息",
    dataIndex: "reviewMessage",
    width: 150,
    ellipsis: true,
  },
  {
    title: "审核时间",
    dataIndex: "reviewTime",
    slotName: "reviewTime",
    width: 180,
  },
  {
    title: "审核人 ID",
    dataIndex: "reviewerId",
    width: 100,
  },
  {
    title: "用户 ID",
    dataIndex: "userId",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
    width: 180,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
    width: 180,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 200,
    fixed: "right",
  },
];
</script>

<style scoped>
.app-management-container {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
}

.search-card {
  margin-bottom: 20px;
}

.table-card {
  background-color: #fff;
}
</style>
