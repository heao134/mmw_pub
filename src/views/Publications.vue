<template>
  <div class="publications-container">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <div 
        v-for="(category, index) in categories" 
        :key="index"
        :class="['sidebar-item', activeCategory === category.id ? 'active' : '']"
        @click="setActiveCategory(category.id)"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- Publications Content -->
    <div class="publications-content">
      <div v-for="year in sortedYears" :key="year" class="year-section">
        <h2 class="year-heading">{{ year }}</h2>
        
        <div v-for="(pub, index) in groupedPublications[year]" :key="index" class="publication-item">
          <div class="publication-title">
            <a :href="pub.url" target="_blank">{{ pub.title }}</a>
            <div class="tags">
              <span 
                v-for="(tag, tagIndex) in pub.tags" 
                :key="tagIndex" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="publication-authors">{{ pub.authors }}</div>
          <div class="publication-journal">
            <span class="journal-name">{{ pub.journal }}</span>, {{ pub.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicationsPage',
  data() {
    return {
      activeCategory: 'all',
      categories: [
      { id: 'all', name: 'All Papers' },
      { id: 'mmWave', name: 'mmWave Sensing' },
      { id: 'Healthcare', name: 'Healthcare' },
      { id: 'AI', name: 'AI Applications' },
      { id: 'Networking', name: 'Network Systems' },
      { id: 'Sensors', name: 'Advanced Sensors' },
      { id: 'Security', name: 'Security Systems' }
      ],
      publications: [
        // 2025年
      {
        year: 2025,
        title: "mmTAA: A Contact-Less Thoracoabdominal Asynchrony Measurement System Based on mmWave Sensing",
        authors: "Fenglin Zhang, Zhebin Zhang, Le Kang, Anfu Zhou, Huadong Ma",
        journal: "IEEE Transactions on Mobile Computing",
        date: "April 2025",
        tags: ["mmWave", "Healthcare"],
        category: ["mmWave", "Healthcare"],
        url: "https://ieeexplore.ieee.org/document/10700839/"
      },
      // 2024年
      {
        year: 2024,
        title: "mmArrhythmia: Contactless Arrhythmia Detection via mmWave Sensing",
        authors: "Lanzcheng Zhao, Bui Lyu, Qi Lin, Anfu Zhou, Huazhuan Zhang, Huadong Ma, Jingjia Wang, Chunli Shao, Yida Tang",
        journal: "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
        date: "March 2024",
        tags: ["mmWave", "Cardiology"],
        category: ["mmWave", "Healthcare"],
        url: "https://dl.acm.org/doi/10.1145/3643549"
      },
      {
        year: 2024,
        title: "airTrac: A Contactless Digital Tactile Receptor for Detecting Material and Roughness via Terahertz Sensing",
        authors: "Zhan Zhang, Donghui Song, Anfu Zhou, Huadong Ma",
        journal: "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
        date: "June 2024",
        tags: ["Terahertz", "Material Sensing"],
        category: ["Wireless", "Sensors"],
        url: "https://dl.acm.org/doi/10.1145/3678586"
      },
      {
        year: 2024,
        title: "AirECG: Contactless Electrocardiogram for Cardiac Disease Monitoring via mmWave Sensing and Cross-domain Diffusion Model",
        authors: "Langzheng Zhuo, Bui Lyu, Jiang Liu, Anfu Zhou, Huadong Ma, Jingjia Wang, Xiangbin Meng",
        journal: "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
        date: "September 2024",
        tags: ["AI", "Cardiology"],
        category: ["AI", "Healthcare"],
        url: "https://dl.acm.org/doi/10.1145/3678550"
      },
      {
        year: 2024,
        title: "Minasterx: A Mobile System for Fine-Grained Alcohol Sensing",
        authors: "Yumeng Liang, Puo Guo, Zhan Zheng, Lingyu Po, Anfu Zhou, Huadong Ma",
        journal: "IEEE Transactions on Mobile Computing",
        date: "July 2024",
        tags: ["Mobile Sensing", "Biometrics"],
        category: ["Mobile", "Healthcare"],
        url: "https://ieeexplore.ieee.org/document/10342706/"
      },
      {
        year: 2024,
        title: "TrafAda: Cost-Aware Traffic Adaptation for Maximizing Live Streaming Bitrates",
        authors: "Yizong Wang, Dong Zhao, Chenghao Huang, Fuyu Yang, Tong Gao, Anfu Zhou, Huazhuan Zhang, Huadong Ma, Yang Du, Aiyan Cheng",
        journal: "IEEE/ACM Transactions on Networking",
        date: "January 2024",
        tags: ["Networking", "QoE"],
        category: ["Networking", "AI"],
        url: "https://ieeexplore.ieee.org/document/10399376"
      },
      {
        year: 2024,
        title: "Toward Optimal Live Video Streaming QoE: A Deep Feature-Tailored Approach",
        authors: "Huazhuan Zhang, Anfu Zhou, Guangqing Wang, Chaoyue Li, Huadong Ma",
        journal: "IEEE/ACM Transactions on Networking",
        date: "July 2024",
        tags: ["Deep Learning", "QoE"],
        category: ["AI", "Networking"],
        url: "https://ieeexplore.ieee.org/document/10399376/"
      },
      {
        year: 2024,
        title: "Reviving P2P Networking for Scalable Crowdsourced Live Streaming",
        authors: "Huazhuan Zhang, Congkai Jin, Anfu Zhou, Chaoyue Li, Xi Liu, Jialiang Pei, Yifan Zhu, Liang Liu, Huadong Ma",
        journal: "IEEE/ACM Transactions on Networking",
        date: "October 2024",
        tags: ["P2P", "Streaming"],
        category: ["Networking", "AI"],
        url: "https://ieeexplore.ieee.org/document/10480302/"
      },
      {
        year: 2024,
        title: "mmCare: A Nursing Care Activity Monitoring via mmWave Sensing",
        authors: "Peilin Pan, Fenglin Zhang, Anfu Zhou, Huadong Ma, Huazhuan Jia",
        journal: "ACM Transactions on Ubiquitous Computing",
        date: "2024",
        tags: ["Activity Recognition", "mmWave"],
        category: ["mmWave", "Healthcare"],
        url: "https://dl.acm.org/doi/10.1145/3674399.3674413"
      },
      {
        year: 2024,
        title: "Aortic Stenosis Detection via Improved Iteration Convolution Network",
        authors: "Ruotong Yang, Le Kang, Anfu Zhou, Hao Cui, Huadong Ma",
        journal: "IEEE International Conference on Parallel and Distributed Systems",
        date: "December 2024",
        tags: ["Medical Imaging", "AI"],
        category: ["AI", "Healthcare"],
        url: "https://ieeexplore.ieee.org/document/10763653/"
      },
      {
        year: 2024,
        title: "AraLive: Automatic Reward Adaptation for Learning-Based Live Streaming",
        authors: "Huazhuan Zhang, Liu Zhao, Haogian Li, Anfu Zhou, Chuannning Wang, Huadong Ma",
        journal: "ACM Multimedia Conference",
        date: "2024",
        tags: ["Reinforcement Learning", "Streaming"],
        category: ["AI", "Networking"],
        url: "https://dl.acm.org/doi/10.1145/3664647.3681499"
      },
      {
        year: 2024,
        title: "Venus: Multi-Flow Viewer Assistance for Crowdsourced Live Streaming",
        authors: "Huazhuan Zhang, Congkai Jin, Anfu Zhou, Yifan Zhu, Weilin Sun, Yixuan Lu, Jiahao Chen, Liang Liu, Huadong Ma",
        journal: "ACM MobiCom",
        date: "2024",
        tags: ["Crowdsourcing", "Optimization"],
        category: ["Networking", "AI"],
        url: "https://dl.acm.org/doi/10.1145/3636534.3649354"
      },
      {
        year: 2024,
        title: "BP3: Improving Cuffless Blood Pressure Monitoring via mmWave Sensing",
        authors: "Yuan Zhong, Yumeng Liang, Bui Lyu, Junjie Bao, Yiwen Huang, Anfu Zhou, Huadong Ma, Jingjia Wang, Xiangbin Meng, Chunli Shao, Yida Tang, Yan Zhang",
        journal: "IEEE Sensors Journal",
        date: "2024",
        tags: ["Blood Pressure", "Non-invasive"],
        category: ["Healthcare", "mmWave"],
        url: "https://dl.acm.org/doi/10.1145/3666025.3699370"
      },
      {
        year: 2024,
        title: "Adversarial Contrastive Learning for Cuffless Blood Pressure Estimation",
        authors: "Bui Wang, Mengshi Qi, Yingxia Shao, Anfu Zhou, Huadong Ma",
        journal: "arXiv Preprint",
        date: "2024",
        tags: ["Contrastive Learning", "Biometrics"],
        category: ["AI", "Healthcare"],
        url: "https://arxiv.org/abs/2408.08488"
      },
      // 2023年
      {
          year: 2023,
          title: "FineAP: FineGrained Access Point Deployment Strategy for 60 GHz MillimeterWave Wireless Networks",
          authors: "Yi Yang, Anfu Zhou, Huadong Ma",
          journal: "IEEE Commun. Lett. 27(1): 381-385",
          date: "2023",
          tags: ["Networking", "mmWave"],
          category: ["Networking", "mmWave"],
          url: "https://ieeexplore.ieee.org/document/9915601/"
        },
        {
          year: 2023,
          title: "Midas: Generating mmWave Radar Data from Videos for Training Pervasive and Privacy-preserving Human Sensing Tasks",
          authors: "Kaikai Deng, Dong Zhao, Qiaoyue Han, Zihan Zhang, Shuyue Wang, Anfu Zhou, Huadong Ma",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 7(1): 91-926",
          date: "2023",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://dl.acm.org/doi/10.1145/3580872"
        },
        {
          year: 2023,
          title: "mmStress: Distilling Human Stress from Daily Activities via Contact-less Millimeter-wave Sensing",
          authors: "Kun Liang, Anfu Zhou, Zhan Zhang, Hao Zhou, Huadong Ma, Chenshu Wu",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 7(3): 1110-1136",
          date: "2023",
          tags: ["mmWave", "Healthcare"],
          category: ["mmWave", "Healthcare"],
          url: "https://dl.acm.org/doi/10.1145/3610926"
        },
        {
          year: 2023,
          title: "Let Iot Know You Better: User Identification and Emotion Recognition Through Millimeter-Wave Sensing",
          authors: "Huanpu Yin, Shuhui Yu, Yingshuo Zhang, Anfu Zhou, Xin Wang, Liang Liu, Huadong Ma, Jianhua Liu, Ning Yang",
          journal: "IEEE Internet Things J. 10(2): 1149-1161",
          date: "2023",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://ieeexplore.ieee.org/document/9878260/"
        },
        {
          year: 2023,
          title: "Robust Respiratory Rate Monitoring Using Smartwatch Photoplethysmography",
          authors: "Langcheng Zhao, Fenglin Zhang, Huanhuan Zhang, Yumeng Liang, Anfu Zhou, Huadong Ma",
          journal: "IEEE Internet Things J. 10(6), March 15: 4830-4844",
          date: "2023",
          tags: ["Healthcare", "Sensors"],
          category: ["Healthcare", "Sensors"],
          url: "https://ieeexplore.ieee.org/document/9940441/"
        },
        {
          year: 2023,
          title: "airBP: Monitor Your Blood Pressure with Millimeter-Wave in the Air",
          authors: "Yumeng Liang, Anfu Zhou, Xinhe Wen, Wei Huang, Pu Shi, Lingyu Pu, Huanhuan Zhang, Huadong Ma",
          journal: "ACM Trans. Internet Things. 4(4): 28:1-28:32",
          date: "2023",
          tags: ["mmWave", "Healthcare"],
          category: ["mmWave", "Healthcare"],
          url: "https://dl.acm.org/doi/10.1145/3614439"
        },
        {
          year: 2023,
          title: "Improving Mobile Interactive Video QoE via Two-Level Online Cooperative Learning",
          authors: "Huanhuan Zhang, Anfu Zhou, Huadong Ma",
          journal: "IEEE Trans. Mob. Comput. 22(10): 5900-5917",
          date: "2023",
          tags: ["Networking", "AI"],
          category: ["Networking", "AI"],
          url: "https://ieeexplore.ieee.org/document/9786839/"
        },
        {
          year: 2023,
          title: "Octopus: Exploiting the Edge Intelligence for Accessible SG Mobile Performance Enhancement",
          authors: "Congkai An, Anfu Zhou, Jialiang Li, Xi Luo, Dongzhu Xu, Liang Liu, Huadong Ma",
          journal: "IEEE/ACM Trans. Netw. 31(6): 2454-2469",
          date: "2023",
          tags: ["Networking", "AI"],
          category: ["Networking", "AI"],
          url: "https://ieeexplore.ieee.org/document/9998491"
        },
        {
          year: 2023,
          title: "Efficient Environment Mapping Using a Commodity Millimeter-Wave Robot",
          authors: "Dongzhu Xu, Anfu Zhou, Yi Yang, Huadong Ma",
          journal: "IEEE Trans. Wirel. Commun. 22(7): 4858-4872",
          date: "2023",
          tags: ["mmWave", "Robotics"],
          category: ["mmWave", "Robotics"],
          url: "https://ieeexplore.ieee.org/document/9997565/"
        },
        {
          year: 2023,
          title: "Physical Layer Identity Information Protection Against Malicious Millimeter Wave Sensing",
          authors: "Zhen Meng, Yiming Shi, Yumeng Liang, Xinhe Wen, Anfu Zhou, Huadong Ma, Hairong Qian",
          journal: "ISCC 2023: 837-843",
          date: "2023",
          tags: ["Security", "mmWave"],
          category: ["Security", "mmWave"],
          url: "https://ieeexplore.ieee.org/document/10217982/"
        },
        // 2022年
        {
          year: 2022,
          title: "mTransSense: Enabling Environment-Independent mmWave Sensing Based Gesture Recognition via Transfer Learning",
          authors: "Haipeng Liu, Kening Cui, Kaiyuan Hu, Yuheng Wang, Anfu Zhou, Liang Liu, Huadong Ma",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 6(1): 23:1-23:28",
          date: "2022",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://dl.acm.org/doi/10.1145/3517231"
        },
        {
          year: 2022,
          title: "Geryon: Edge Assisted Real-time and Robust Object Detection on Drones via mmWave Radar and Camera Fusion",
          authors: "Kaikai Deng, Dong Zhao, Qiaoyue Han, Shuyue Wang, Zihan Zhang, Anfu Zhou, Huadong Ma",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 6(3): 109:1-109:27",
          date: "2022",
          tags: ["mmWave", "Robotics"],
          category: ["mmWave", "Robotics"],
          url: "https://dl.acm.org/doi/10.1145/3550298"
        },
        {
          year: 2022,
          title: "M-Gesture: Person-Independent Real-Time In-Air Gesture Recognition Using Commodity Millimeter Wave Radar",
          authors: "Haipeng Liu, Anfu Zhou, Zhe Dong, Yungang Sun, Jiahe Zhang, Liang Liu, Huadong Ma, Jianhua Liu, Ning Yang",
          journal: "IEEE Internet Things J. 9(5): 3397-3415",
          date: "2022",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://ieeexplore.ieee.org/document/9490685/"
        },
        {
          year: 2022,
          title: "MDSR: Multi-Dimensional Spatial Reuse Enhancement for Directional Millimeter-Wave Wireless Networks",
          authors: "Yi Yang, Anfu Zhou, Dongzhu Xu, Kun Liang, Huadong Ma, Teng Wei, Jianhua Liu",
          journal: "IEEE Trans. Mob. Comput. 21(12): 4439-4455",
          date: "2022",
          tags: ["Networking", "mmWave"],
          category: ["Networking", "mmWave"],
          url: "https://ieeexplore.ieee.org/document/9437959/"
        },
        {
          year: 2022,
          title: "Scalable 3D Beam-Steering for Directional Millimeter Wave Wireless Networks",
          authors: "Yi Yang, Anfu Zhou, Leilei Wu, Shaoqing Wu, Huadong Ma, Teng Wei, Xinyu Zhang",
          journal: "IEEE Trans. Wirel. Commun. 21(1): 696-709",
          date: "2022",
          tags: ["Networking", "mmWave"],
          category: ["Networking", "mmWave"],
          url: "https://ieeexplore.ieee.org/document/9500055/"
        },
        {
          year: 2022,
          title: "Increase the Range of Millimeter-Wave Breath Monitoring by Multi-Channel Signal Fusion",
          authors: "Shuhui Yu, Huanpu Yin, Le Kang, Anfu Zhou",
          journal: "BigCom 2022: 217-223",
          date: "2022",
          tags: ["mmWave", "Healthcare"],
          category: ["mmWave", "Healthcare"],
          url: "https://ieeexplore.ieee.org/document/10064421/"
        },
        {
          year: 2022,
          title: "MM-HAT: Transformer for Millimeter-Wave Sensing Based Human Activity Recognition",
          authors: "Jie Yan, Xianlin Zeng, Anfu Zhou, Huadong Ma",
          journal: "GLOBECOM 2022: 547-553",
          date: "2022",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://ieeexplore.ieee.org/document/10000673/"
        },
        {
          year: 2022,
          title: "PAR: Improving Video Bitrate Adaptation via Payload-Aware Throughput Prediction",
          authors: "Jialiang Li, Congkai An, Anfu Zhou, Liang Liu, Huadong Ma",
          journal: "ICME 2022: 1-6",
          date: "2022",
          tags: ["Networking", "AI"],
          category: ["Networking", "AI"],
          url: "https://ieeexplore.ieee.org/document/9860000"
        },
        {
          year: 2022,
          title: "Tutii: coupling 5G NR and mobile edge computing for latency-critical video analytics",
          authors: "Dongzhu Xu, Anfu Zhou, Guixian Wang, Huanhuan Zhang, Xiangyu Li, Jialiang Pei, Huadong Ma",
          journal: "MobiCom 2022: 729-742",
          date: "2022",
          tags: ["Networking", "AI"],
          category: ["Networking", "AI"],
          url: "https://dl.acm.org/doi/10.1145/3495243.3560538"
        },
        // 2021年
        {
          year: 2021,
          title: "Study on feasibility of remote mental detection using millimeter wave radar for convenient and efficient security check",
          authors: "Yixuan Lu, Weixi Chen, Haipeng Liu, Anfu Zhou",
          journal: "CCF Trans. Pervasive Comput. Interact. 3(3): 284-299",
          date: "2021",
          tags: ["mmWave", "Security"],
          category: ["mmWave", "Security"],
          url: "https://link.springer.com/article/10.1007/s42486-021-00067-1"
        },
        {
          year: 2021,
          title: "FG-Liquid: A Contact-less Fine-grained Liquid Identifier by Pushing the Limits of Millimeter-wave Sensing",
          authors: "Yumeng Liang, Anfu Zhou, Huanhuan Zhang, Xinhe Wen, Huadong Ma",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 5(3): 1116-1126",
          date: "2021",
          tags: ["mmWave", "Sensors"],
          category: ["mmWave", "Sensors"],
          url: "https://dl.acm.org/doi/10.1145/3478075"
        },
        {
          year: 2021,
          title: "Arsenal: Understanding Learning-Based Wireless Video Transport via In-Depth Evaluation",
          authors: "Huanhuan Zhang, Anfu Zhou, Ruoxuan Ma, Jiamu Lu, Huadong Ma",
          journal: "IEEE Trans. Veh. Technol. 70(10): 10832-10844",
          date: "2021",
          tags: ["Networking", "AI"],
          category: ["Networking", "AI"],
          url: "https://ieeexplore.ieee.org/document/9516990/"
        },
        {
          year: 2021,
          title: "eRRGe: Balancing Accuracy and Efficiency of Respiratory Monitoring Using Smart Watch by Combining Peak Detection and Regression Model",
          authors: "Fenjin Zhang, Langcheng Zhao, Anfu Zhou, Huadong Ma",
          journal: "CWSN 2021: 111-122",
          date: "2021",
          tags: ["Healthcare", "Sensors"],
          category: ["Healthcare", "Sensors"],
          url: "https://link.springer.com/chapter/10.1007/978-981-16-8174-5_9"
        },
        {
          year: 2021,
          title: "m-Activity: Accurate and Real-Time Human Activity Recognition via Millimeter Wave Radar",
          authors: "Yuheng Wang, Haipeng Liu, Kening Cui, Anfu Zhou, Wensheng Li, Huadong Ma",
          journal: "ICASSP 2021: 8298-8302",
          date: "2021",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://ieeexplore.ieee.org/document/9414686/"
        },
        {
          year: 2021,
          title: "Loki: improving long tail performance of learning-based real-time video adaptation by fusing rule-based models",
          authors: "Huanhuan Zhang, Anfu Zhou, Yuhao Lu, Chaoyue Li, Guangping Wang, Xinyu Zhang, Huadong Ma, Leilei Wu, Aiyuan Chen, Changhui Wu",
          journal: "MobiCom 2021: 775-788",
          date: "2021",
          tags: ["Networking", "AI"],
          category: ["Networking", "AI"],
          url: "https://dl.acm.org/doi/10.1145/3447993.3483259"
        },
        // 2020年
        {
          year: 2020,
          title: "Learning to Recognize Handwriting Input with Acoustic Features",
          authors: "Huanpu Yin, Anfu Zhou, Guangyuan Su, Bo Chen, Liang Liu, Huadong Ma",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 4(2): 64:1-64:26",
          date: "2020",
          tags: ["AI", "Sensors"],
          category: ["AI", "Sensors"],
          url: "https://dl.acm.org/doi/10.1145/3397334"
        },
        {
          year: 2020,
          title: "Real-time Arm Gesture Recognition in Smart Home Scenarios via Millimeter Wave Sensing",
          authors: "Haipeng Liu, Yuheng Wang, Anfu Zhou, Hanyu He, Wei Wang, Kunpeng Wang, Pailin Pan, Yixuan Lu, Liang Liu, Huadong Ma",
          journal: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol. 4(4): 140:1-140:28",
          date: "2020",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://dl.acm.org/doi/10.1145/3432235"
        },
        {
          year: 2020,
          title: "Robotic Millimeter-Wave Wireless Networks",
          authors: "Anfu Zhou, Shaoqing Xu, Song Wang, Jingqi Huang, Shaojun Yang, Teng Wei, Xinju Zhang, Huadong Ma",
          journal: "IEEE/ACM Trans. Netw. 28(4): 1534-1549",
          date: "2020",
          tags: ["Networking", "Robotics"],
          category: ["Networking", "Robotics"],
          url: "https://ieeexplore.ieee.org/document/9096528"
        },
        {
          year: 2020,
          title: "Gait Recognition for Co-Existing Multiple People Using Millimeter Wave Sensing",
          authors: "Zhen Meng, Song Xu, Jie Yan, Hongyuan Liang, Anfu Zhou, Shilin Zhu, Huadong Ma, Jianhua Liu, Ning Yang",
          journal: "AAAI 2020: 849-856",
          date: "2020",
          tags: ["mmWave", "AI"],
          category: ["mmWave", "AI"],
          url: "https://ojs.aaai.org/index.php/AAAI/article/view/5430"
        }
      ]
    }
  },
  
  computed: {
    filteredPublications() {
      if (this.activeCategory === 'all') {
        return this.publications;
      }
      
      return this.publications.filter(pub => 
        pub.category.includes(this.activeCategory)
      );
    },
    
    groupedPublications() {
      const grouped = {};

      this.filteredPublications.forEach(pub => {
        const year = pub.year;
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(pub);
      });

      // 对每个年份组内的论文按日期降序排序
      Object.keys(grouped).forEach(year => {
        grouped[year].sort((a, b) => new Date(b.date) - new Date(a.date));
      });

      return grouped; // 这里只返回分组，不排序
    },
    
    // 新增计算属性，用于获取已排序的年份列表
    sortedYears() {
      // 按照从大到小排序年份（降序）
      return Object.keys(this.groupedPublications)
        .map(year => Number(year))
        .sort((a, b) => b - a);
    }
  },
  methods: {
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
    }
  }
}
</script>

<style scoped>
.publications-container {
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.sidebar {
  width: 180px;
  background-color: #f0f0f0;
  padding: 0;
  flex-shrink: 0;
}

.sidebar-item {
  padding: 15px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s;
  font-weight: 500;
}

.sidebar-item:hover {
  background-color: #e0e0e0;
}

.sidebar-item.active {
  background-color: #4a5568;
  color: white;
}

.publications-content {
  flex: 1;
  padding: 20px 30px;
  background-color: #f8f8f8;
}

.year-heading {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.publication-item {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
}

.publication-title {
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.publication-title a {
  font-size: 18px;
  font-weight: 500;
  color: #3182ce;
  text-decoration: none;
  flex: 1;
}

.publication-title a:hover {
  text-decoration: underline;
}

.publication-authors {
  margin-bottom: 5px;
  color: #4a5568;
}

.publication-journal {
  color: #718096;
}

.journal-name {
  color: #e53e3e;
  font-weight: 500;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: #e2e8f0;
  color: #4a5568;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .publications-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  
  .sidebar-item {
    flex: 1;
    min-width: 120px;
  }
  
  .publication-title {
    flex-direction: column;
  }
  
  .tags {
    margin-top: 8px;
  }
}
</style>

