## ppxdada-frontend

### 项目描述

https://ppxdada-online.vercel.app/

开发了一个基于 Spring Boot、Redis、ChatGLM、RxJava、SSE、Vue3、Arco Design 和 Pinia 的 AI 答题应用平台。用户可以通过 AI 快速生成题目并制作应用，管理员审核后，用户可以在线答题，并根据多种评分算法或 AI 得到回答总结。管理员还可以集中管理全站内容并进行统计分析。

An AI quiz application platform was developed using Spring Boot, Redis, ChatGLM, RxJava, SSE, Vue3, Arco Design, and Pinia. Users can quickly generate questions and create applications through AI. After administrator approval, users can take quizzes online and receive summarized answers based on various scoring algorithms or AI. Administrators can centrally manage site content and perform statistical analysis.

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
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/appDetails.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/answer.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/createQuestions.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/createApps.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/MyAnswers.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/AnswerManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/questionManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/scoringManagement.jpg)
![image](https://github.com/pipixiangz/ppxdada-frontend/blob/main/img/Statistics.jpg)


### Vue3 Project Development
Utilized Vue3 combined with the Arco Design component library to develop a project featuring online quizzes, application retrieval and management, application creation, and statistical analysis, with over 10 pages implemented.

### Vue3 Project Development
Project Initialization and Layout
Initialized the project using the Vue-CLI scaffold and independently developed global page layouts and a common front-end project template for future project reuse.

### Vue3 Project Development
Coding Standards
Ensured code quality using TypeScript combined with ESLint and Prettier, and customized ESLint rules to enhance project quality.

### Vue3 Project Development
Navigation Menu Generation
Implemented automatic navigation menu generation based on Vue Router's route configuration, and controlled page visibility through the hideInMenu field in the route's meta attribute.

### Vue3 Project Development
Global Permission Management
Configured permissions through the meta.access field of Vue Router, and used the beforeEach global route guard for permission checks. Permission management code was encapsulated into an independent module for simplicity.

### Vue3 Project Development
Global State Management
Defined UserStore using Pinia to manage user login states, and accessed user information on various pages through the composable API (useStore).

### Vue3 Project Development
Frontend-Backend Integration
Significantly improved development efficiency using the OpenAPI tool to automatically generate request code and TypeScript data models based on the backend Swagger interface documentation.

### Vue3 Project Development
Application Creation
Implemented complex dynamic nested forms using the Form component from Arco Design, allowing users to freely add and remove questions and sub-options. Inputs were received uniformly through reactive objects.

### Vue3 Project Development
Application Management
Implemented management pages using the Table component from Arco Design, and simplified the backend's date and time data using custom slots and Day.js.

### Vue3 Project Development
Application Search
Defined search condition variables using ref and automatically triggered queries when search conditions changed through watchEffect, resulting in concise and maintainable code.

### Vue3 Project Development
Application Sharing
Implemented mobile scan sharing based on QrCode and encapsulated a common sharing popup component. The function to open the popup was exposed using defineExpose, allowing the parent component to call it through ref.

### Vue3 Project Development
Statistical Analysis
Performed statistical analysis of popular applications and answer distributions using custom SQL with MyBatis annotations on the backend, and visualized data on the frontend using ECharts.

### Vue3 Project Development
Image Upload
Customized requests based on the Upload component from Arco Design, encapsulating a common image upload component that can be directly integrated into the Form component, enhancing development efficiency.

