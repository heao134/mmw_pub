<template>
  <div class="sponsors-page">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(sponsor, index) in sponsors" :key="index">
        <el-card class="sponsor-card">
          <img :src="sponsor.logo" class="sponsor-logo">
          <div class="sponsor-name">{{ sponsor.name }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SponsorsPage',
  data() {
    return {
      sponsors: [
        {
          logo: 'path/to/logo1.png',
          name: '赞助商名称'
        }
      ]
    }
  }
}
</script>

<style scoped>
.sponsors-page {
  padding: 20px;
}
.sponsor-card {
  margin-bottom: 20px;
  text-align: center;
}
.sponsor-logo {
  max-width: 100%;
  height: auto;
}
.sponsor-name {
  margin-top: 10px;
}
</style> 