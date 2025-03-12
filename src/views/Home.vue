<template>
  <div class="waterfall-container">
    <div class="waterfall-header">
      <h1>Research Publications</h1>
      <div class="header-underline"></div>
    </div>
    
    <div class="waterfall-wrapper" ref="waterfallWrapper">
      <div 
        class="waterfall-column" 
        v-for="(column, columnIndex) in columns" 
        :key="'column-' + columnIndex"
      >
        <div 
          v-for="item in column" 
          :key="'item-' + item.id" 
          class="waterfall-item"
          :class="{ 'fade-in': true }"
        >
          <div class="waterfall-image">
            <img :src="item.image" :alt="item.title">
            <div class="image-overlay">
              <span class="view-details">View Details</span>
            </div>
          </div>
          <div class="waterfall-content">
            <div class="content-category"></div>
            <h3 class="waterfall-title">{{ item.title }}</h3>
            <p class="waterfall-summary">{{ item.summary }}</p>
            <div class="waterfall-footer">
              <span class="waterfall-date">{{ item.date }}</span>
              <div class="waterfall-tags">
                <span class="tag">AI</span>
                <span class="tag">Research</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="loading" v-if="loading">
      <div class="loading-spinner"></div>
      <span>Loading more publications...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaterfallLayout',
  data() {
    return {
      items: [],
      loading: false,
      columnCount: 3,
      page: 1,
      columns: [[], [], []],
      observer: null
    };
  },
  async mounted() {
    await this.initializeLayout();
    await this.loadItems();
    
    this.setupInfiniteScroll();
    
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async initializeLayout() {
      if (window.innerWidth < 768) {
        this.columnCount = 1;
      } else if (window.innerWidth < 1024) {
        this.columnCount = 2;
      } else {
        this.columnCount = 3;
      }
      
      this.columns = Array(this.columnCount).fill().map(() => []);
    },
    
    handleResize() {
      const oldColumnCount = this.columnCount;
      
      if (window.innerWidth < 768) {
        this.columnCount = 1;
      } else if (window.innerWidth < 1024) {
        this.columnCount = 2;
      } else {
        this.columnCount = 3;
      }
      
      if (oldColumnCount !== this.columnCount) {
        this.redistributeItems();
      }
    },
    
    redistributeItems() {
      const allItems = this.columns.reduce((acc, column) => [...acc, ...column], []);
      
      this.columns = Array(this.columnCount).fill().map(() => []);
      
      allItems.forEach(item => {
        const shortestColumnIndex = this.getShortestColumnIndex();
        this.columns[shortestColumnIndex].push(item);
      });
    },
    
    getShortestColumnIndex() {
      let shortestIndex = 0;
      let shortestLength = this.columns[0].length;
      
      for (let i = 1; i < this.columns.length; i++) {
        if (this.columns[i].length < shortestLength) {
          shortestIndex = i;
          shortestLength = this.columns[i].length;
        }
      }
      
      return shortestIndex;
    },
    
    async loadItems() {
      if (this.loading) return;
      
      this.loading = true;
      
      try {
        const newItems = this.generateMockItems(10);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        newItems.forEach(item => {
          const shortestColumnIndex = this.getShortestColumnIndex();
          if (this.columns[shortestColumnIndex]) {
            this.columns[shortestColumnIndex].push({
              ...item,
              visible: true
            });
          }
        });
        
        this.page++;
      } catch (error) {
        console.error('Error loading items:', error);
      } finally {
        this.loading = false;
      }
    },
    
    generateMockItems(count) {
      const items = [];
      const startId = (this.page - 1) * count + 1;
      
      const projectItems = [
        {
          id: 1,
          title: "AirTac: Non-Contact Tactile Perception for Material and Roughness via Terahertz Sensing",
          summary: "Proposes a terahertz-based system using M-Net and R-Net neural networks to decouple material and roughness features, achieving 97.43% accuracy in material classification and 91.46% in fine-grained roughness detection.",
          date: "November 2024",
          color: '#3498db',
          imageHeight: 250,
          image: '/img/home/airTac.png'
        },
        {
          id: 2,
          title: "mmTAA: Contactless Thoracoabdominal Asynchrony Measurement via mmWave Sensing",
          summary: "Develops a non-invasive TAA monitoring system using mmWave radar and TAANet, achieving a mean error of 1.56° and MAE of 4.01°, outperforming traditional methods requiring physical contact.",
          date: "December 2024",
          color: '#e74c3c',
          imageHeight: 200,
          image: '/img/home/mmtaa.png'
        },
        {
          id: 3,
          title: "mmArrhythmia: Contactless Arrhythmia Detection via mmWave Sensing",
          summary: "Leverages raw IQ-domain mmWave signals and an encoder-decoder network to detect cardiac anomalies with 97.32% accuracy, addressing label imbalance through multi-channel ensemble learning.",
          date: "April 2024",
          color: '#2ecc71',
          imageHeight: 300,
          image: '/img/home/mmArrhythmia.png'
        },
        {
          id: 4,
          title: "BP3: Cuff-less Blood Pressure Monitoring via mmWave and Physiological Fusion",
          summary: "Integrates mmWave pulse waves with physiological factors through a Physio-Pulse Attention module, reducing systolic/diastolic errors to -1.57±9.77/-0.34±7.93 mmHg on a 1,012-subject dataset.",
          date: "December 2024",
          color: '#f39c12',
          imageHeight: 200,
          image: '/img/home/airBP.png'
        },
        {
          id: 5,
          title: "IoT+ Cross-Disciplinary Innovations: Sensing Technologies for Emerging Applications",
          summary: "Summarizes key challenges in IoT sensing for interdisciplinary services, covering wireless perception security, human-cyber-physical systems, and AI-driven IoT intrusion detection frameworks.",
          date: "November 2024",
          color: '#9b59b6',
          imageHeight: 250,
          image: '/img/home/iot.jpg'
        },
        {
          id: 6,
          title: "mmStress: Contact-less Stress Monitoring via Millimeter-wave Sensing",
          summary: "Proposes a novel mmStress system using millimeter-wave radar and neural networks to detect human stress through displacement activities in daily life. Overcomes quasi-static limitations of existing solutions with 83% accuracy validated through 30-day deployment experiments.",
          date: "October 2023",
          color: '#3498db',
          imageHeight: 200,
          image: '/img/home/mmStress.png' 
        },
        {
          id: 7,
          title: "Smart Home Control with Millimeter-wave Perception",
          summary: "Demonstrates a privacy-preserving air conditioning control system using millimeter-wave sensing technology. Awarded Best Creative Design for highlighting non-contact measurement advantages and industrial application potential in smart home scenarios.",
          date: "April 2024",
          color: '#e74c3c',
          imageHeight: 250,
          image: '/img/home/haier.png'
        },
        {
          id: 8,
          title: "Contactless Blood Pressure Monitoring via Millimeter-wave Sensing",
          summary: "Presents medical-engineering crossover research on non-invasive continuous blood pressure measurement. Validated through clinical trials, this approach offers new perspectives for hypertension monitoring and cardiovascular disease prevention.",
          date: "April 2024",
          color: '#2ecc71',
          imageHeight: 300,
          image: '/img/home/yixuehui.jpg'
        }
      ];
      
      for (let i = 0; i < count; i++) {
        const id = startId + i;
        const projectIndex = id % projectItems.length;
        const project = projectItems[projectIndex];
        
        items.push({
          id: id,
          title: project.title,
          summary: project.summary,
          image: project.image || `https://via.placeholder.com/400x${project.imageHeight}/${project.color.replace('#', '')}`,
          date: project.date,
          visible: false
        });
      }
      
      return items;
    },
    
    setupInfiniteScroll() {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.loading) {
          this.loadItems();
        }
      }, {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      });
      
      this.$nextTick(() => {
        const loadingEl = document.querySelector('.loading');
        if (loadingEl) {
          this.observer.observe(loadingEl);
        }
      });
    }
  }
}
</script>

<style>
.waterfall-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

.waterfall-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.waterfall-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
}

.header-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  margin: 0 auto;
  border-radius: 2px;
}

.waterfall-wrapper {
  display: flex;
  gap: 24px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.waterfall-item {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0;
  transform: translateY(20px);
  position: relative;
}

.waterfall-item.fade-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.waterfall-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.waterfall-image {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.waterfall-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.waterfall-item:hover .waterfall-image img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.waterfall-item:hover .image-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.view-details:hover {
  background: white;
  color: #333;
}

.waterfall-content {
  padding: 20px;
}

.content-category {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #3498db;
  font-weight: 600;
  margin-bottom: 8px;
}

.waterfall-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #1a1a2e;
  line-height: 1.4;
}

.waterfall-summary {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.waterfall-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 16px;
  margin-top: 8px;
}

.waterfall-date {
  font-size: 13px;
  color: #777;
  font-weight: 500;
}

.waterfall-tags {
  display: flex;
  gap: 6px;
}

.tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 30px;
  background-color: #f0f4f8;
  color: #555;
  font-weight: 500;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(52, 152, 219, 0.1);
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.loading span {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive styles */
@media (max-width: 1024px) {
  .waterfall-wrapper {
    gap: 20px;
  }
  
  .waterfall-column {
    gap: 20px;
  }
  
  .waterfall-header h1 {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .waterfall-wrapper {
    flex-direction: column;
  }
  
  .waterfall-column {
    width: 100%;
  }
  
  .waterfall-header {
    margin-bottom: 30px;
  }
  
  .waterfall-content {
    padding: 16px;
  }
}
</style>