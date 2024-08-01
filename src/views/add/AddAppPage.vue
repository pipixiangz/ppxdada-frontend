<template>
  <div class="app-creation-page">
    <div class="content-wrapper">
      <div class="form-section">
        <h1 class="page-title">{{ props.id ? "编辑应用" : "创建新应用" }}</h1>
        <p class="page-description">
          填写下面的表单来{{
            props.id ? "修改已有" : "创建新的"
          }}应用。所有字段都是必填的。
        </p>

        <a-form :model="form" @submit="handleSubmit" layout="vertical">
          <a-form-item field="appName" label="应用名称" required>
            <a-input
              v-model="form.appName"
              placeholder="输入一个独特的应用名称"
            >
              <template #prefix>
                <icon-app />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item field="appDesc" label="应用描述" required>
            <a-textarea
              v-model="form.appDesc"
              placeholder="详细描述您的应用功能和特点"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-item>

          <a-form-item field="appIcon" label="应用图标" required>
            <a-input v-model="form.appIcon" placeholder="输入应用图标的URL">
              <template #prefix>
                <icon-image />
              </template>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="appType" label="应用类型" required>
                <a-select v-model="form.appType" placeholder="选择应用类型">
                  <a-option
                    v-for="(value, key) of APP_TYPE_MAP"
                    :key="key"
                    :value="Number(key)"
                  >
                    {{ value }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="scoringStrategy" label="评分策略" required>
                <a-select
                  v-model="form.scoringStrategy"
                  placeholder="选择评分策略"
                >
                  <a-option
                    v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
                    :key="key"
                    :value="Number(key)"
                  >
                    {{ value }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <div class="form-actions">
            <a-button type="primary" html-type="submit" :loading="submitting">
              {{ props.id ? "保存修改" : "创建应用" }}
            </a-button>
            <a-button @click="handleReset" :disabled="submitting"
              >重置
            </a-button>
          </div>
        </a-form>
      </div>

      <div class="info-section">
        <div class="info-card">
          <icon-bulb class="info-icon" />
          <h3>创建优秀应用的小贴士Tips!</h3>
          <ul>
            <li>选择一个简洁而有描述性的名称</li>
            <li>提供清晰详细的应用描述</li>
            <li>选择一个吸引人的应用图标</li>
            <li>仔细斟酌应用类型和评分策略</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import API from "@/api";
import {
  addAppUsingPost,
  editAppUsingPost,
  getAppVoByIdUsingGet,
} from "@/api/appController";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";
import { withDefaults, defineProps } from "vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const oldApp = ref<API.AppVO>();
const submitting = ref(false);

const loadData = async () => {
  if (!props.id) return;

  try {
    const res = await getAppVoByIdUsingGet({ id: props.id as any });
    if (res.data.code === 0 && res.data.data) {
      oldApp.value = res.data.data;
      form.value = res.data.data;
    } else {
      Message.error("获取数据失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("获取数据失败，请稍后重试");
  }
};

watchEffect(() => {
  loadData();
});

const form = ref<API.AppAddRequest>({
  appDesc: "",
  appIcon: "",
  appName: "",
  appType: undefined,
  scoringStrategy: undefined,
});

const router = useRouter();

const handleSubmit = async () => {
  submitting.value = true;
  try {
    let res: any;
    if (props.id) {
      res = await editAppUsingPost({ ...form.value, id: props.id as any });
    } else {
      res = await addAppUsingPost(form.value);
    }

    if (res.data.code === 0) {
      Message.success("操作成功，即将跳转到应用详情页");
      setTimeout(() => {
        router.push(`/app/detail/${props.id || res.data.data}`);
      }, 2000);
    } else {
      Message.error("操作失败，" + res.data.message);
    }
  } catch (error) {
    Message.error("操作失败，请稍后重试");
  } finally {
    submitting.value = false;
  }
};

const handleReset = () => {
  form.value = {
    appDesc: "",
    appIcon: "",
    appName: "",
    appType: undefined,
    scoringStrategy: undefined,
  };
};
</script>

<style scoped>
.app-creation-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 40px 20px;
}

.content-wrapper {
  display: flex;
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-section {
  flex: 1;
  padding: 40px;
}

.page-title {
  margin-bottom: 10px;
  color: #333;
  font-size: 32px;
}

.page-description {
  margin-bottom: 30px;
  color: #666;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  margin-top: 30px;
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  padding: 40px;
  background: #f8f9fa;
}

.info-card {
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.info-icon {
  margin-bottom: 20px;
  color: #667eea;
  font-size: 40px;
}

.info-card h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
}

.info-card ul {
  padding-left: 20px;
  color: #666;
}

.info-card li {
  margin-bottom: 10px;
}

:deep(.arco-form-item-label-col) {
  font-weight: 500;
}

:deep(.arco-btn-primary) {
  background: #667eea;
  border-color: #667eea;
}

:deep(.arco-btn-primary:hover) {
  background: #5a6fd9;
  border-color: #5a6fd9;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .info-section {
    width: 100%;
  }
}
</style>
