<template>
  <div class="waterfall-container">
    <div class="waterfall-columns">
      <div class="waterfall-column">
        <div v-for="(item, index) in leftColumn" :key="index" class="card">
          <div class="card-image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-summary">{{ item.summary }}</p>
            <div class="contributors">
              <span v-for="(contributor, i) in item.contributors" 
                    :key="i" 
                    class="contributor">{{ contributor }}</span>
            </div>
            <a :href="item.paperLink" class="paper-link" target="_blank">Paper</a>
          </div>
        </div>
        <div v-if="loading" class="loading-indicator">Loading...</div>
      </div>
      <div class="waterfall-column">
        <div v-for="(item, index) in rightColumn" :key="index" class="card">
          <div class="card-image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-summary">{{ item.summary }}</p>
            <div class="contributors">
              <span v-for="(contributor, i) in item.contributors" 
                    :key="i" 
                    class="contributor">{{ contributor }}</span>
            </div>
            <a :href="item.paperLink" class="paper-link" target="_blank">Paper</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsView',
  data() {
    return {
      items: [],
      page: 1,
      loading: false,
      allItemsLoaded: false
    };
  },
  computed: {
    leftColumn() {
      return this.items.filter((_, index) => index % 2 === 0);
    },
    rightColumn() {
      return this.items.filter((_, index) => index % 2 === 1);
    }
  },
  mounted() {
    this.loadItems();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Load more items when user scrolls to bottom (with a buffer of 200px)
      if (scrollTop + clientHeight >= scrollHeight - 200 && !this.loading && !this.allItemsLoaded) {
        this.loadItems();
      }
    },
    loadItems() {
      if (this.loading || this.allItemsLoaded) return;
      
      this.loading = true;
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Mock data - in a real app, this would be an API call
        const newItems = this.getMockItems(this.page);
        
        if (newItems.length === 0) {
          this.allItemsLoaded = true;
        } else {
          this.items = [...this.items, ...newItems];
          this.page += 1;
        }
        
        this.loading = false;
      }, 800);
    },
    getMockItems(page) {
      // Mock data generator - replace with actual API call in production
      const mockData = [
    {
      title: "非接触式类人触觉感知",
      image: '/img/pro/3.png',
      summary: "利用太赫兹波高频率、大带宽的特性，实现材料、亚微米级纹理等多维度触觉特征的感知，赋能虚拟现实触感仿真、元宇宙触感交互、智能机器人实时环境探索等前沿领域，解锁非接触式触觉感知革命。",
      paperLink: "https://example.com/paper2",
      contributors: ["张展"]
    },
    {
      title: "基于毫米波的心理压力监测",
      image: '/img/pro/4.png',
      summary: "长期处于压力之下会损害人类的心理健康甚至身体健康，而压力监测在预防、诊断和管理精神疾病和慢性病方面的重要性日益凸显。然而，目前的压力监测方法要么繁琐，要么具有侵扰性，阻碍了其在实践中的广泛应用。在本文中，我们提出了一种非接触式、非侵入式的解决方案——毫米波雷达，它采用毫米波雷达感应受试者的日常生活活动，从中提取出人体压力。",
      paperLink: "https://example.com/paper3",
      contributors: ["梁琨"]
    },
    {
      title: "基于毫米波的人员追踪和姿态检测",
      image: '/img/pro/5.png',
      summary: "基于毫米波点云和扩展卡尔曼滤波，对感知范围内的人员进行追踪并检测他们的姿态（走、坐、站、跌倒），支持多人场景",
      paperLink: "https://example.com/paper4",
      contributors: ["梁琨", "李亚轩", "徐路明", "曾泓力"]
    },
    {
      title: "基于毫米波的呼吸活动感知",
      image: '/img/pro/6.png',
      summary: "基于毫米波雷达对细粒度运动的高精度感知能力，结合先进的信号处理算法和深度学习框架，我们实现了对多自由度呼吸运动的深度解析。其中涵盖了平静呼吸时的肺功能参数测量、呼吸疾病分析以及夜间睡眠监测等关键应用。最终，我们的目标是构建一种普适化、无感知、全天候的呼吸疾病监测系统，为健康管理提供更加智能、高效的解决方案。",
      paperLink: "https://example.com/paper5",
      contributors: ["张峰霖", "侯妍秀", "吴承霖"]
    },
    {
      title: "车载系统时间敏感网络传输",
      image: '/img/pro/7.png',
      summary: "",
      paperLink: "https://example.com/paper6",
      contributors: ["徐冬竹", "阙章志", "于洋洋", "沈旭"]
    },
    {
      title: "高速移动场景下5G低时延传输",
      image: '/img/pro/8.png',
      summary: "移动边缘计算 (MEC) 技术将服务器部署在更靠近用户的位置，如基站背后。但实际运营时，5G网络与MEC松耦合，导致视频流传输时延过长。为了解决这一问题，提出了5G RAN与MEC耦合的低时延传输架构，通过深度神经网络模型学习上层服务需求，调控云边端资源并发供给，并设计轻量化且标准兼容的通信协议，促进云边端跨层交互，将视频流的传输延迟平均降低了61%。目前，项目组拟探究高速移动场景下自适应编码视频流的传输性能与网络波动的适配程度，设计确定性5G网络低时延传输方法，进一步保障视频流的传输质量",
      paperLink: "https://example.com/paper7",
      contributors: ["徐冬竹", "阙章志", "石伟", "林睿", "沈旭"]
    },
    {
      title: "车路协同场景下多模态数据感传优化",
      image: '/img/pro/9.png',
      summary: "自动驾驶技术的快速发展正在重塑未来交通格局，但其可靠性与安全性仍面临挑战。当前自动驾驶系统依托激光雷达、毫米波雷达和摄像头等传感器实现环境感知，然而这些设备存在两大固有局限：其一，光线直线传播特性导致不透明遮挡物后方形成感知盲区；其二，随着目标距离增加，传感器分辨率显著下降，影响远距离目标识别精度。针对上述问题，智能路侧基础设施（如集成多类传感器的智慧灯杆）成为突破瓶颈的创新方向。此类设施通过部署路侧传感器网络与车载系统协同工作，可突破单车传感器的物理局限，将路端全局视角与车辆局部感知深度融合。目前，本项目组的目标是深入分析车路协同场景下影响感知效果和数据传输速率的关键因素，进一步设计稳定且高精度的多模态感知融合模型，以确保车路协同系统的实时性和鲁棒性。",
      paperLink: "https://example.com/paper8",
      contributors: ["徐冬竹", "林睿", "吉奥博"]
    },
    {
      title: "基于毫米波的脉搏感知与血压测量",
      image: '/img/pro/10.png',
      summary: "传统的血压设备带来不舒适的测量体验，本项目旨在拓展毫米波对微米级生理运动的感知能力，融合先进的信号处理与深度学习算法，实现无感的可穿戴式/非接触式血压监测系统。团队与医院开展深度合作，在千人规模的心血管数据集上进行了验证，为舒适精准医疗提供创新解决方案。",
      paperLink: "https://example.com/paper9",
      contributors: ["郑子新", "郝赫", "黄奕文"]
    },
    {
      title: "面向强交互视频流的细粒度丢包恢复算法设计",
      image: '/img/pro/11.jpg',
      summary: "云游戏、VR、XR等强交互视频流对传输算法提出了极为苛刻的要求：从玩家操作到画面响应的交互延迟稳定在100毫秒以内，1080P甚至更高的视频画质等。该项目在商用云游戏环境中进行大规模测量活动，基于云游戏视频流特性设计每帧自适应FEC算法，充分考虑视频帧长和网络丢包模式的实时变化来调节流媒体冗余度，大幅提高视频交互QoE。",
      paperLink: "https://example.com/paper10",
      contributors: ["张欢欢", "安聪凯", "康京旸", "王士博", "刘烨磊", "卢勇芙"]
    },
    {
      title: "云控自动驾驶场景下的数据传输算法设计",
      image: '/img/pro/12.jpg',
      summary: "在云控自动驾驶场景下，单车感知能力受限于局部环境，导致信息不完整，增加行驶风险。本项目旨在研究多车感知数据的融合传输技术，并通过云端对全局数据进行实时分析，突破单车视野局限，为自动驾驶提供更安全的决策支持。",
      paperLink: "https://example.com/paper11",
      contributors: ["张欢欢", "安聪凯", "孟凡涵", "张龙", "陈育堃"]
    },
    {
      title: "云控自动驾驶场景下面向任务的视频流传输优化",
      image: '/img/pro/13.png',
      summary: "云控自动驾驶场景中，由于载具处于高速移动的状态，摄像头的画面经常呈现剧烈运动的情况，且网络状况出现波动，传统视频传输方法并不能胜任。本项目旨在研究面向云控自动驾驶任务场景的视频传输算法，为自动驾驶场景提供更可靠的视频流。",
      paperLink: "https://example.com/paper12",
      contributors: ["张欢欢", "安聪凯", "宋泽霖", "张鹏程"]
    },
    {
      title: "太赫兹味觉感知",
      image: '/img/pro/14.png',
      summary: "利用太赫兹分子级感知能力，设计数字化味蕾模型。通过识别被水稀释的微弱味觉分子特征和消除不同味觉分子之间的影响，实现对样品味道的感知，其感知能力超越人体感知极限，可用于食品安全、牛奶腐败、药品药效、水质检测等领域",
      paperLink: "https://example.com/paper13",
      contributors: ["宋登辉"]
    },
    {
      title: "食用油掺杂检测",
      image: '/img/pro/15.png',
      summary: "利用太赫兹分子级感知能力和宽频带特性，实现对食用油种类、掺杂油类型以及掺杂比例的检测，亦可用于食用油污染监测等",
      paperLink: "https://example.com/paper14",
      contributors: ["宋登辉"]
    },
    {
      title: "毫米波心率失常监测",
      image: '/img/pro/16.png',
      summary: "通过毫米波感知技术，实现对心率失常疾病的无感连续监测，解决现有心电监测手段所带来的各种不适",
      paperLink: "https://example.com/paper15",
      contributors: ["吕锐", "闫昊楠", "冯浩", "吴承霖", "朱苏捷"]
    }
      ];
      
      // Return 6 items per page, up to 3 pages (18 items total)
      if (page <= 3) {
        return mockData;
      } else {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.waterfall-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.waterfall-columns {
  display: flex;
  gap: 20px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
  display: block;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 16px;
}

.card-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-summary {
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}

.paper-link {
  display: inline-block;
  padding: 6px 12px;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.paper-link:hover {
  background-color: #3a7bc8;
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  color: #666;
}

.contributors {
  margin-bottom: 12px;
}

.contributor {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 6px;
  margin-bottom: 6px;
  background-color: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .waterfall-columns {
    flex-direction: column;
  }
}
</style>