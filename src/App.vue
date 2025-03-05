<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" :router="true" :default-active="activeIndex">
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/members">Members</el-menu-item>
          <el-menu-item index="/publications">Publications</el-menu-item>
          <el-menu-item index="/projects">Projects</el-menu-item>
          <el-menu-item index="/videos">Videos</el-menu-item>
          <el-menu-item index="/sponsors">Sponsors</el-menu-item>
        </el-menu>
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
}
</style>
