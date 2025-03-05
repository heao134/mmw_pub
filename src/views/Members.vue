<template>
  <div class="members">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(member, index) in members" :key="index">
        <el-card class="member-card">
          <img :src="member.avatar" class="avatar">
          <h3>{{ member.name }}</h3>
          <p>{{ member.education }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MembersPage',
  data() {
    return {
      members: [
        {
          avatar: 'path/to/avatar1.jpg',
          name: '张教授',
          education: 'Ph.D in Computer Science'
        },
        // 添加更多成员...
      ]
    }
  }
}
</script>

<style scoped>
.members {
  padding: 20px;
}
.member-card {
  margin-bottom: 20px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style> 