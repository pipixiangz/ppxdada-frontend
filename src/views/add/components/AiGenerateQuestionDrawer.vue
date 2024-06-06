<template>
  <a-button type="outline" @click="handleClick">AI 生成题目</a-button>
  <a-drawer
    :width="340"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
  >
    <template #title> AI 生成题目</template>
    <div>
      <a-form
        :model="form"
        label-align="left"
        auto-label-width
        @submit="handleSubmit"
      >
        <a-form-item label="应用 id">
          {{ appId }}
        </a-form-item>
        <a-form-item field="questionNumber" label="题目数量">
          <a-input-number
            v-model="form.questionNumber"
            min="0"
            max="20"
            placeholder="请输入题目数量"
          />
        </a-form-item>
        <a-form-item field="optionNumber" label="选项数量">
          <a-input-number
            v-model="form.optionNumber"
            min="0"
            max="6"
            placeholder="请输入选项数量"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button
              :loading="submitting"
              type="primary"
              html-type="submit"
              style="width: 120px"
            >
              {{ submitting ? "生成中" : "一键生成" }}
            </a-button>
            <a-button
              html-type="submit"
              style="width: 120px"
              @click="handleSSESubmit"
            >
              {{ submitting ? "生成中" : "实时生成" }}
            </a-button>
          </a-space>
          <a-button
            :loading="submitting"
            type="primary"
            html-type="submit"
            style="width: 120px"
          >
            {{ submitting ? "生成中" : "一键生成" }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, withDefaults } from "vue";
import API from "@/api";
import { aiGenerateQuestionUsingPost } from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";

interface Props {
  appId: string;
  // 生成成功之后，把生成的题目传进来
  // 在生成题目成功后，将生成的题目数据传递回父组件或其他调用该组件的地方
  onSuccess?: (result: API.QuestionContentDTO[]) => void;
  onSSESuccess?: (result: API.QuestionContentDTO) => void;
  onSSEStart?: (event: any) => void;
  onSSEClose?: (event: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});

const visible = ref(false);
const submitting = ref(false);

const form = reactive({
  questionNumber: 10,
  optionNumber: 2,
} as API.AiGenerateQuestionRequest);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId) {
    return;
  }
  // 提交效果
  submitting.value = true;
  const res = await aiGenerateQuestionUsingPost({
    appId: props.appId as any,
    ...form,
  });
  if (res.data.code === 0 && res.data.data && res.data.data.length > 0) {
    if (props.onSuccess) {
      props.onSuccess(res.data.data);
    } else {
      message.success("生成题目成功");
    }
    // 关闭抽屉
    handleCancel();
  } else {
    message.error("操作失败，" + res.data.message);
  }
  submitting.value = false;
};

/**
 * 提交 (实时生成)
 */
const handleSSESubmit = async () => {
  if (!props.appId) {
    return;
  }
  // 提交效果
  submitting.value = true;
  // 创建 SSE 请求 （手动填写完整的后端地址）
  const eventSource = new EventSource(
    `http://localhost:8101/api/question/ai_generate/sse?appId=${props.appId}&optionNumber=${form.optionNumber}&questionNumber=${form.questionNumber}`
  );
  // 是否是第一道题
  let first = true;
  // 接收消息
  eventSource.onmessage = function (event) {
    if (first) {
      props.onSSEStart?.(event);
      handleCancel();
      first = !first;
    }
    props.onSSESuccess?.(JSON.parse(event.data));
  };
  // 生成结束，关闭连接
  eventSource.onerror = function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      console.log("SSE 连接已关闭");
      eventSource.close();
    } else {
      eventSource.close();
    }
  };
  /*// 建立连接, 连接打开时触发
  eventSource.onopen = function () {
    console.log("SSE 连接已打开");
    props.onSSEStart?.(event);
    handleCancel();
  };*/

  submitting.value = false;
};
</script>
