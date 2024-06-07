<template>
  <a-card class="appCard" hoverable @click="doCardClick">
    <template #actions>
      <span class="icon-hover"> <IconThumbUp /> </span>
      <span class="icon-hover" @click="doShare"> <IconShareInternal /> </span>
    </template>
    <template #cover>
      <div
        :style="{
          height: '204px',
          overflow: 'hidden',
        }"
      >
        <img
          :style="{ width: '100%', transform: 'translateY(-20px)' }"
          :alt="app.appName"
          :src="app.appIcon"
        />
      </div>
    </template>
    <a-card-meta :title="app.appName" :description="app.appDesc">
      <template #avatar>
        <div
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-avatar
            :size="24"
            :image-url="app.user?.userAvatar"
            :style="{ marginRight: '8px' }"
          />
          <a-typography-text
            >{{ app.user?.userName ?? "无名氏" }}
          </a-typography-text>
        </div>
      </template>
    </a-card-meta>
  </a-card>
  <ShareModal ref="shareModalRef" :link="shareLink" title="应用分享" />
</template>

<script setup lang="ts">
import { IconThumbUp, IconShareInternal } from "@arco-design/web-vue/es/icon";
import API from "@/api";
import { withDefaults, defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import ShareModal from "@/components/ShareModal.vue";

interface Props {
  app: API.AppVO;
}

// Vue 3 的 Composition API 提供的一种方式，用来定义组件的 props，且指定了类型为 Props
// withDefaults：这是一个辅助函数，用于为 defineProps 定义的 props 提供默认值。
const props = withDefaults(defineProps<Props>(), {
  // 一个对象，用来指定 Props 中每个字段的默认值。这里为 app 字段提供了一个默认值，即一个返回空对象的函数
  app: () => {
    return {};
  },
});

const router = useRouter();

const doCardClick = () => {
  router.push(`/app/detail/${props.app.id}`);
};

// 分享弹窗引用
const shareModalRef = ref();
// 分享链接
const shareLink = `${window.location.protocol}//${window.location.host}/app/detail/${props.app.id}`;
// 分享
const doShare = (e: Event) => {
  if (shareModalRef.value) {
    shareModalRef.value.openModal();
  }
  // 阻止事件冒泡，防止跳转到详情页
  e.stopPropagation();
};
</script>

<style scoped>
.appCard {
  cursor: pointer;
}

.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
}

.icon-hover:active {
  background-color: rgb(var(--gray-2));
}
</style>
