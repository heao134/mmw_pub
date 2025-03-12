<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="logo-container">
            <img src="/img/logo.jpg" alt="imobi Lab Logo" class="logo">
            <h1 class="title">imobi Lab</h1>
          </div>
          <el-menu mode="horizontal" :router="true" :default-active="activeIndex" class="nav-menu">
            <el-menu-item index="/">Home</el-menu-item>
            <el-menu-item index="/members">Members</el-menu-item>
            <el-menu-item index="/publications">Publications</el-menu-item>
            <el-menu-item index="/projects">Projects</el-menu-item>
            <el-menu-item index="/videos">Videos</el-menu-item>
            <el-menu-item index="/sponsors">Sponsors</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '/'
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
.el-header {
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: auto !important; /* 覆盖Element UI的固定高度 */
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex-wrap: nowrap;
}
.logo-container {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.logo {
  height: 40px;
  width: auto;
  margin-right: 10px;
}
.title {
  font-size: 1.5rem;
  margin: 0;
  white-space: nowrap;
}
.nav-menu {
  border-bottom: none !important;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  .logo-container {
    margin-bottom: 10px;
  }
  .nav-menu {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
