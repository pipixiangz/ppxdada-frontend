<template>
  <div class="about-wrapper">
    <div class="about">
      <h1>About this project</h1>
      <a-card class="about-card">
        <div class="content-container">
          <div class="content-section">
            <a-typography-title level="3" class="section-title"
              >你好，我是皮皮翔。
            </a-typography-title>
            <a-typography-paragraph>
              这是一个基于以下技术的 AI 答题应用平台：
            </a-typography-paragraph>
            <a-list class="tech-list">
              <a-list-item v-for="(item, index) in techStack" :key="index">
                <a-list-item-meta>
                  <template #title>{{ item }}</template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <a-typography-paragraph>
              用户可以通过 AI
              快速生成题目并制作应用，管理员审核后，用户可以在线答题，并根据多种评分算法或
              AI 得到回答总结。管理员还可以集中管理全站内容并进行统计分析。
            </a-typography-paragraph>
          </div>
          <div class="content-section">
            <a-typography-title level="3" class="section-title"
              >Hi, I'm pipixiang.
            </a-typography-title>
            <a-typography-paragraph>
              This is an AI quiz application platform:
            </a-typography-paragraph>
            <a-list class="tech-list">
              <a-list-item v-for="(item, index) in techStackEn" :key="index">
                <a-list-item-meta>
                  <template #title>{{ item }}</template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <a-typography-paragraph>
              Users can quickly generate questions and create applications
              through AI. After administrator approval, users can take quizzes
              online and receive summarized answers based on various scoring
              algorithms or AI. Administrators can centrally manage site content
              and perform statistical analysis.
            </a-typography-paragraph>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { useLoginUserStore } from "@/store/userStore";

const loginUserStore = useLoginUserStore();

const techStack = [
  "Spring Boot",
  "Redis",
  "ChatGLM",
  "RxJava",
  "SSE",
  "Vue3",
  "Arco Design",
  "Pinia",
];

const techStackEn = [
  "Spring Boot",
  "Redis",
  "ChatGLM",
  "RxJava",
  "SSE",
  "Vue3",
  "Arco Design",
  "Pinia",
];
</script>

<style scoped>
.about-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 20px;
  color: #3b3b3b;
}

.about {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(66, 66, 66, 0.1);
}

.about-card {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(to right, #ffffff, #f0f2f5);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.content-section {
  flex: 1;
  min-width: 300px;
  padding: 10px;
}

.section-title {
  margin-bottom: 10px;
  color: #1e3a8a;
}

a-typography-paragraph {
  color: #4b5563;
  font-size: 16px;
  line-height: 1.6;
}

.tech-list {
  margin: 10px 0;
  padding-left: 20px;
}

.tech-list a-list-item-meta {
  margin-bottom: 5px;
  color: #2563eb;
  font-weight: bold;
}

a-list-item-meta::before {
  color: #3b82f6;
  font-size: 20px;
  vertical-align: middle;
  content: "• ";
}
</style>
