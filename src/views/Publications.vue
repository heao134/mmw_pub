<template>
  <div class="publications-page">
    <el-timeline>
      <el-timeline-item
        v-for="(pub, index) in publications"
        :key="index"
        :timestamp="pub.date"
        placement="top"
      >
        <el-card>
          <h4>{{ pub.title }}</h4>
          <p>{{ pub.authors }}</p>
          <p>{{ pub.journal }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'PublicationsPage',
  data() {
    return {
      publications: [
        {
          date: '2024-03',
          title: '示例论文标题',
          authors: '作者1, 作者2, 作者3',
          journal: '期刊名称'
        }
      ]
    }
  }
}
</script>

<style scoped>
.publications-page {
  padding: 20px;
}
</style> 