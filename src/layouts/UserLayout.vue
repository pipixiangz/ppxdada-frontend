<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/testbig.png" class="logo" />
          <div>皮皮翔 AI 答答</div>
        </a-space>
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
        </a></a-layout-footer
      >
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .logo {
  width: 48px;
  height: 48px;
}

#userLayout .header {
  margin-top: 16px;
  font-size: 21px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  text-align: center;
}
</style>
