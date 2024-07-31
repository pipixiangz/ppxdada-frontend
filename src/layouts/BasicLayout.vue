<template>
  <div id="basicLayout">
    <a-layout class="layout">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a
          href="https://github.com/pipixiangz/ppxdada-frontend"
          target="_blank"
          style="text-decoration: none"
        >
          皮皮翔AI答答
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank">京公网安备11010802044596号</a>
        <a> &nbsp;</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2024073488号</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(#fff, #abeffc);
}

.layout {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.header {
  box-shadow: #eee 1px 1px 5px;
}

.content {
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(
    to right,
    rgba(254, 254, 254, 0.3),
    rgba(255, 255, 255, 0.3)
  );
}

.footer {
  padding: 16px;
  text-align: center;
  background: #abeffc;
}
</style>
