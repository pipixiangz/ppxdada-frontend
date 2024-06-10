## ppxdada-frontend

### 项目描述

开发了一个基于 Spring Boot、Redis、ChatGLM、RxJava、SSE、Vue3、Arco Design 和 Pinia 的 AI 答题应用平台。用户可以通过 AI 快速生成题目并制作应用，管理员审核后，用户可以在线答题，并根据多种评分算法或 AI 得到回答总结。管理员还可以集中管理全站内容并进行统计分析。

### Vue3 项目开发

使用 Vue3 结合 Arco Design 组件库，开发了包含在线答题、应用检索和管理、应用创建、统计分析等功能的项目，共实现了 10 多个页面。

### 项目初始化和布局

通过 Vue-CLI 脚手架初始化项目，独立开发了全局页面布局和通用前端项目模板，以便于后续项目的复用。

### 编码规范

使用 TypeScript 结合 ESLint 和 Prettier 确保代码规范，并自定义了 ESLint 规则，以提高项目质量。

### 导航菜单生成

基于 Vue Router 的路由配置实现自动生成导航菜单，并通过路由的 meta 属性中的 hideInMenu 字段集中控制页面的显示与隐藏。

### 全局权限管理

通过 Vue Router 的 meta.access 字段配置权限，并使用 beforeEach 全局路由守卫进行权限校验，同时将权限管理代码封装为独立模块，简化使用。

### 全局状态管理

使用 Pinia 定义 UserStore 实现用户登录态的存储，并通过组合式 API（useStore）在各页面中访问用户信息。

### 前后端联调

使用 OpenAPI 工具根据后端 Swagger 接口文档自动生成请求代码和 TypeScript 数据模型，大幅提高开发效率。

### 应用创建

基于 Arco Design 的 Form 组件实现复杂的动态嵌套表单，支持用户自由增删题目和子选项，通过响应式对象统一接收输入。

### 应用管理

使用 Arco Design 的 Table 组件实现各管理页面，并通过自定义插槽和 Day.js 简化后端返回的日期时间数据。

### 应用搜索

使用 ref 定义搜索条件变量，并通过 watchEffect 监听，实现搜索条件变化时自动触发查询，代码简洁且易于维护。

### 应用分享

基于 QrCode 实现移动端扫码分享，并封装通用分享弹窗组件，通过 defineExpose 暴露打开弹窗的函数，父组件通过 ref 调用。

### 统计分析

后端基于 MyBatis 注解自定义 SQL 实现热门应用和回答分布的统计，前端通过 ECharts 实现数据可视化。

### 图片上传

基于 Arco Design 的 Upload 组件自定义请求，封装通用图片上传组件，可直接被 Form 组件引入，提高开发效率。

![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/homepage.jpg)

![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/UserManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/AppManagement.jpg)

![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/answer.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/createQuestions.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/createApps.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/MyAnswers.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/AnswerManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/questionManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/scoringManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/Statistics.jpg)

