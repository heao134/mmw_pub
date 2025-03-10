<template>
  <div class="team-container">
    <div class="team-header">
      <h1 class="team-title">我们的研究团队</h1>
      <p class="team-description">由一群充满激情的专业人士组成，致力于推动科学前沿</p>
    </div>

    <el-row :gutter="30">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" v-for="(member, index) in members" :key="index">
        <div
          class="member-card"
          :class="{ 'is-active': activeIndex === index }"
          @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = null"
        >
          <div class="member-avatar-container">
            <img :src="member.avatar || getRandomAvatar(index)" class="member-avatar" :alt="member.name">
            <div class="member-social">
              <i class="el-icon-message" title="发送邮件"></i>
              <i class="el-icon-link" title="个人主页"></i>
              <i class="el-icon-document" title="查看论文"></i>
            </div>
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <div class="member-title">{{ member.title || '研究员' }}</div>
            <p class="member-education">{{ member.education }}</p>
            <div class="member-research">
              <span v-for="(area, i) in member.researchAreas" :key="i" class="research-tag">
                {{ area }}
              </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TeamMembers',
  data() {
    return {
      activeIndex: null,
      members: [
        {
          avatar: '',
          name: '张教授',
          title: '首席研究员',
          education: 'Ph.D in Computer Science',
          researchAreas: ['人工智能', '机器学习']
        },
        {
          avatar: '',
          name: '李博士',
          title: '副研究员',
          education: 'Ph.D in Data Science',
          researchAreas: ['大数据分析', '计算机视觉']
        },
        {
          avatar: '',
          name: '王研究员',
          title: '助理研究员',
          education: 'Ph.D in Robotics',
          researchAreas: ['机器人学', '自动控制']
        },
        {
          avatar: '',
          name: '赵教授',
          title: '高级研究员',
          education: 'Ph.D in Engineering',
          researchAreas: ['深度学习', '神经网络']
        },
        {
          avatar: '',
          name: '陈博士',
          title: '博士后研究员',
          education: 'Ph.D in Mathematics',
          researchAreas: ['统计学', '数据挖掘']
        },
        {
          avatar: '',
          name: '周研究员',
          title: '助理研究员',
          education: 'Ph.D in AI',
          researchAreas: ['计算机视觉', '自动驾驶']
        },
        {
          avatar: '',
          name: '刘教授',
          title: '资深研究员',
          education: 'Ph.D in Quantum Computing',
          researchAreas: ['量子计算', '密码学']
        },
        {
          avatar: '',
          name: '杨博士',
          title: '博士后',
          education: 'Ph.D in Bioinformatics',
          researchAreas: ['生物信息学', '基因分析']
        }
      ]
    };
  },
  methods: {
    getRandomAvatar(index) {
      return `https://i.pravatar.cc/300?img=${index + 1}`;
    }
  }
};
</script>

<style scoped>
.team-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.team-header {
  text-align: center;
  margin-bottom: 50px;
}

.team-title {
  font-size: 36px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
}

.team-description {
  font-size: 18px;
  color: #5e6d82;
  max-width: 700px;
  margin: 0 auto;
}

.member-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #ebeef5;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.member-avatar-container {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background: #f5f7fa;
}

.member-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.member-card:hover .member-avatar {
  transform: scale(1.05);
}

.member-social {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  padding: 12px 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.member-card:hover .member-social {
  transform: translateY(0);
}

.member-social i {
  color: white;
  font-size: 20px;
  margin: 0 12px;
  cursor: pointer;
  transition: color 0.2s;
}

.member-social i:hover {
  color: #409EFF;
}

.member-info {
  padding: 20px;
}

.member-name {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 6px 0;
}

.member-title {
  color: #409EFF;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.member-education {
  color: #606266;
  font-size: 14px;
  margin-bottom: 12px;
}

.member-research {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.research-tag {
  background: #f0f2f5;
  color: #606266;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  display: inline-block;
}

@media (max-width: 768px) {
  .team-title {
    font-size: 28px;
  }

  .team-description {
    font-size: 16px;
  }
}
</style>
