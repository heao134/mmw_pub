<template>
  <div class="waterfall-container">
    <div class="waterfall-header">
      <h1>Research Publications</h1>
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
          </div>
          <div class="waterfall-content">
            <h3 class="waterfall-title">{{ item.title }}</h3>
            <p class="waterfall-summary">{{ item.summary }}</p>
            <div class="waterfall-footer">
              <span class="waterfall-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="loading" v-if="loading">
      <div class="loading-spinner"></div>
      <span>Loading more items...</span>
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
          title: "Neural Networks for Signal Processing",
          summary: "This paper explores a novel approach to optimize high-dimensional non-convex functions using advanced sampling techniques that exploit the curvature of the optimization landscape.",
          date: "April 2023",
          color: '#3498db',
          imageHeight: 200
        },
        {
          id: 2,
          title: "Deep Learning Applications in Computer Vision",
          summary: "A new method for learning complex kernels that accurately model the structure of high-dimensional black-box functions, enabling efficient optimization.",
          date: "February 2023",
          color: '#e74c3c',
          imageHeight: 250
        },
        {
          id: 3,
          title: "Generative Models for Audio Synthesis",
          summary: "This tutorial dives into the foundations of generative models like VAEs, GANs, and Diffusion models, explaining key principles and implementation details.",
          date: "December 2022",
          color: '#2ecc71',
          imageHeight: 300
        },
        {
          id: 4,
          title: "Optimization Techniques in Machine Learning",
          summary: "A human-centric black-box optimization approach that reveals information about the minimizer function to achieve lower query budgets in complex scenarios.",
          date: "October 2022",
          color: '#f39c12',
          imageHeight: 200
        },
        {
          id: 5,
          title: "Source Separation using Microphone Arrays",
          summary: "An innovative technique for underdetetermined source separation using microphone arrays that reduces delay aliasing between two interfaces.",
          date: "August 2022",
          color: '#9b59b6',
          imageHeight: 250
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
          image: `https://via.placeholder.com/400x${project.imageHeight}/${project.color.replace('#', '')}`,
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
  font-family: Arial, sans-serif;
}

.waterfall-header {
  text-align: center;
  margin-bottom: 30px;
}

.waterfall-header h1 {
  font-size: 28px;
  color: #333;
}

.waterfall-wrapper {
  display: flex;
  gap: 20px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.waterfall-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.waterfall-item.fade-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.waterfall-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.waterfall-image {
  width: 100%;
  overflow: hidden;
}

.waterfall-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.waterfall-item:hover .waterfall-image img {
  transform: scale(1.05);
}

.waterfall-content {
  padding: 16px;
}

.waterfall-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333;
  line-height: 1.3;
}

.waterfall-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.waterfall-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 12px;
  margin-top: 8px;
}

.waterfall-date {
  font-size: 12px;
  color: #999;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  width: 100%;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive styles */
@media (max-width: 1024px) {
  .waterfall-wrapper {
    gap: 15px;
  }
  
  .waterfall-column {
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .waterfall-wrapper {
    flex-direction: column;
  }
  
  .waterfall-column {
    width: 100%;
  }
}
</style>