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
          avatar: "/img/member/2.png",
          name: "周安福",
          title: "长聘教授",
          education: "Ph.D",
          researchAreas: ["毫米波感知", "毫米波传输", "AI-driven 低延迟视频传输"]
        },
        {
          avatar: "/img/member/16.png",
          name: "张欢欢",
          title: "研究员",
          education: "Ph.D",
          researchAreas: ["低延迟视频传输", "交互视频传输", "云控自动驾驶"]
        },
        {
          avatar: "/img/member/32.png",
          name: "徐冬竹",
          title: "博士后",
          education: "Ph.D",
          researchAreas: ["无线网络系统", "视频物联网", "时间敏感网络"]
        },
        {
          avatar: "/img/member/3.jpeg",
          name: "郑子新",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波健康感知"]
        },
        {
          avatar: "/img/member/4.jpeg",
          name: "吕锐",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波健康感知"]
        },
        {
          avatar: "/img/member/17.png",
          name: "安聪凯",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["视频传输", "网络拥塞控制", "交互视频流传输", "云控自动驾驶"]
        },
      {
          avatar: "/img/member/6.jpeg",
          name: "张峰霖",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波人员健康与活动感知"]
        },
        {
          avatar: "/img/member/7.jpeg",
          name: "李亚轩",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波人员活动感知"]
      },
        {
          avatar: "/img/member/8.jpeg",
          name: "梁琨",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波人员活动与心理健康感知"]
        },
        {
          avatar: "/img/member/9.png",
          name: "阙章志",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["时间敏感网络", "车联网"]
        },
      {
          avatar: "/img/member/10.png",
          name: "康乐",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波健康感知"]
      },
      {
          avatar: "/img/member/15.jpeg",
          name: "宋登辉",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["太赫兹感知", "类人感知计算"]
      },
      {
          avatar: "/img/member/18.jpeg",
          name: "孟凡涵",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["云控自动驾驶"]
      },
      {
          avatar: "/img/member/24.jpeg",
          name: "宋泽霖",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["云控自动驾驶"]
      },
      {
          avatar: "/img/member/27.jpeg",
          name: "林睿",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["车联网", "车路协同"]
      },
      {
          avatar: "/img/member/29.png",
          name: "赵明月",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["智能运维", "视频物联网"]
      },
      {
          avatar: "/img/member/31.jpeg",
          name: "杨天宇",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["智能运维", "视频物联网"]
      },
      {
          avatar: "/img/member/35.jpeg",
          name: "张展",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["太赫兹类人触觉感知"]
      },
      {
          avatar: "/img/member/36.png",
          name: "郝赫",
          title: "博士生",
          education: "Ph.D Candidate",
          researchAreas: ["毫米波健康感知"]
      },
      {
          avatar: "/img/member/11.png",
          name: "黄奕文",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波健康感知"]
      },
      {
          avatar: "/img/member/12.png",
          name: "徐路明",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波人员活动感知"]
      },
      {
          avatar: "/img/member/13.jpeg",
          name: "曾泓力",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波人员活动感知"]
      },
      {
          avatar: "/img/member/14.jpeg",
          name: "侯妍秀",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波人员健康与活动感知"]
      },
      {
          avatar: "/img/member/21.png",
          name: "王士博",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["交互视频流传输"]
      },
      {
          avatar: "/img/member/23.jpeg",
          name: "卢勇芙",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["交互视频流传输"]
      },
      {
          avatar: "/img/member/30.png",
          name: "兰克锋",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["智能运维", "视频物联网"]
      },
      {
          avatar: "/img/member/33.png",
          name: "于洋洋",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["时间敏感网络"]
      },
      {
          avatar: "/img/member/34.png",
          name: "石伟",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["物联网"]
      },
      {
          avatar: "/img/member/38.png",
          name: "李骁伦",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["智能运维", "视频物联网"]
      },
      {
          avatar: "/img/member/39.jpg",
          name: "闫昊楠",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波健康感知"]
      },
      {
          avatar: "/img/member/40.png",
          name: "吴承霖",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波人员健康与活动感知"]
      },
      {
          avatar: "/img/member/41.png",
          name: "华有伟",
          title: "硕士生",
          education: "M.S. Candidate",
          researchAreas: ["毫米波健康感知"]
      },
      {
          avatar: "/img/member/19.png",
          name: "张龙",
          title: "硕士生",
          education: "B.S. Candidate",
          researchAreas: ["云控自动驾驶"]
      },
      {
          avatar: "/img/member/20.png",
          name: "陈育堃",
          title: "本科生",
          education: "B.S. Candidate",
          researchAreas: ["云控自动驾驶"]
      },
      {
          avatar: "/img/member/22.png",
          name: "康京旸",
          title: "本科生",
          education: "B.S. Candidate",
          researchAreas: ["交互视频流传输"]
      },
      {
          avatar: "/img/member/25.png",
          name: "张鹏程",
          title: "本科生",
          education: "B.S. Candidate",
          researchAreas: ["云控自动驾驶"]
      },
      {
          avatar: "/img/member/26.png",
          name: "刘烨磊",
          title: "本科生",
          education: "B.S. Candidate",
          researchAreas: ["交互视频流传输"]
      },
      {
          avatar: "/img/member/37.png",
          name: "吉奥博",
          title: "本科生",
          education: "B.S. Candidate",
          researchAreas: ["车联网", "车路协同"]
      }
    ]
}
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
  width: 100%;      /* 确保宽度填满列 */
  height: 430px;    /* 设置固定高度 */
  display: flex;
  flex-direction: column;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.member-avatar-container {
  width: 200px;
  height: 200px;
  margin: 20px auto 0;
  position: relative;
  overflow: hidden;
  background: #f5f7fa;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;         /* 添加 flex 布局 */
  align-items: center;   /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.member-avatar {
  width: auto;          /* 改为自动宽度 */
  height: auto;         /* 改为自动高度 */
  max-width: 100%;      /* 限制最大宽度 */
  max-height: 100%;     /* 限制最大高度 */
  object-fit: contain;  /* 改为 contain 模式 */
  position: relative;   /* 改为相对定位 */
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
  text-align: center;
  flex-grow: 1;        /* 允许信息区域伸展 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  /* 从顶部开始排列内容 */
  overflow: hidden;    /* 防止内容溢出 */
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
  margin-top: auto;    /* 将研究领域推到底部 */
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;  /* 标签居中对齐 */
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
