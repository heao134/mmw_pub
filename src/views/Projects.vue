<template>
  <div class="projects-page">
    <el-row :gutter="20">
      <el-col :span="12" v-for="(project, index) in projects" :key="index">
        <el-card class="project-card">
          <img :src="project.image" class="project-image">
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <el-link type="primary" :href="project.paperLink" target="_blank">
            查看论文
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {
      projects: [
        {
          image: 'path/to/project1.jpg',
          title: '项目标题',
          summary: '项目简介',
          paperLink: 'https://example.com/paper'
        }
      ]
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding: 20px;
}
.project-card {
  margin-bottom: 20px;
}
.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style> 