<template>
  <div class="waterfall-container">
    <div class="waterfall-header">
      <h1>Research Publications</h1>
    </div>
    
    <div class="waterfall-wrapper" ref="waterfallWrapper">
      <div class="waterfall-column" v-for="(column, columnIndex) in columns" :key="columnIndex">
        <div 
          v-for="item in column" 
          :key="item.id" 
          class="waterfall-item"
          :class="{ 'fade-in': item.visible }"
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
      columns: [],
      observer: null
    };
  },
  mounted() {
    this.initializeLayout();
    this.loadItems();
    
    // Set up intersection observer for infinite scrolling
    this.setupInfiniteScroll();
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    initializeLayout() {
      // Determine column count based on screen width
      if (window.innerWidth < 768) {
        this.columnCount = 1;
      } else if (window.innerWidth < 1024) {
        this.columnCount = 2;
      } else {
        this.columnCount = 3;
      }
      
      // Initialize empty columns
      this.columns = Array(this.columnCount).fill().map(() => []);
    },
    
    handleResize() {
      const oldColumnCount = this.columnCount;
      
      // Update column count based on new screen width
      if (window.innerWidth < 768) {
        this.columnCount = 1;
      } else if (window.innerWidth < 1024) {
        this.columnCount = 2;
      } else {
        this.columnCount = 3;
      }
      
      // Only redistribute items if column count changed
      if (oldColumnCount !== this.columnCount) {
        this.redistributeItems();
      }
    },
    
    redistributeItems() {
      // Flatten all columns into a single array
      const allItems = this.columns.reduce((acc, column) => [...acc, ...column], []);
      
      // Reset columns with new count
      this.columns = Array(this.columnCount).fill().map(() => []);
      
      // Redistribute all items
      allItems.forEach(item => {
        const shortestColumnIndex = this.getShortestColumnIndex();
        this.columns[shortestColumnIndex].push(item);
      });
    },
    
    getShortestColumnIndex() {
      // Find the column with the fewest items
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
    
    loadItems() {
      if (this.loading) return;
      
      this.loading = true;
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Generate mock data
        const newItems = this.generateMockItems(10);
        
        // Add new items to columns
        newItems.forEach(item => {
          const shortestColumnIndex = this.getShortestColumnIndex();
          this.columns[shortestColumnIndex].push(item);
        });
        
        this.loading = false;
        this.page++;
      }, 1000);
    },
    
    generateMockItems(count) {
      const items = [];
      const startId = (this.page - 1) * count + 1;
      
      const titles = [
        "Neural Networks for Signal Processing",
        "Deep Learning Applications in Computer Vision",
        "Generative Models for Audio Synthesis",
        "Optimization Techniques in Machine Learning",
        "Source Separation using Microphone Arrays",
        "Diffusion Models for Image Generation",
        "Latent Variable Models in NLP",
        "Bayesian Optimization for Black-Box Functions",
        "Sparse Representation in Signal Processing",
        "Transformer Architectures for Time Series"
      ];
      
      const summaries = [
        "This paper explores a novel approach to optimize high-dimensional non-convex functions using advanced sampling techniques that exploit the curvature of the optimization landscape.",
        "A new method for learning complex kernels that accurately model the structure of high-dimensional black-box functions, enabling efficient optimization.",
        "This tutorial dives into the foundations of generative models like VAEs, GANs, and Diffusion models, explaining key principles and implementation details.",
        "A human-centric black-box optimization approach that reveals information about the minimizer function to achieve lower query budgets in complex scenarios.",
        "An innovative technique for underdetetermined source separation using microphone arrays that reduces delay aliasing between two interfaces.",
        "This research presents a self-supervised speech enhancement method utilizing signals from multiple modalities to improve audio quality in noisy environments.",
        "A sample-constrained Bayesian optimization technique using human-in-the-loop to solve high-dimensional problems in audio personalization applications.",
        "A new efficient real-time wideband spectrum sensing mechanism leveraging recent advances in RF MEMS filtering for densely occupied spectrum.",
        "An approach that enables better spatial acoustics on wearable devices by estimating personalized HRTFs using mobile sensors and machine learning.",
        "A novel binaural source separation technique that improves audio quality for hearing aids and other wearable listening devices."
      ];
      
      const dates = [
        "April 2023", "February 2023", "December 2022", "October 2022", 
        "August 2022", "June 2022", "May 2022", "March 2022", 
        "January 2022", "November 2021"
      ];
      
      for (let i = 0; i < count; i++) {
        const id = startId + i;
        const colorIndex = id % 5;
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        
        items.push({
          id,
          title: titles[id % titles.length],
          summary: summaries[id % summaries.length],
          image: `https://via.placeholder.com/400x${200 + (id % 3) * 50}/${colors[colorIndex].replace('#', '')}`,
          date: dates[id % dates.length],
          visible: false
        });
      }
      
      return items;
    },
    
    setupInfiniteScroll() {
      // Create intersection observer to detect when user scrolls near bottom
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.loadItems();
        }
      }, {
        root: null,
        rootMargin: '200px',
        threshold: 0.1
      });
      
      // Observe the loading element
      this.$nextTick(() => {
        const loadingEl = document.querySelector('.loading');
        if (loadingEl) {
          this.observer.observe(loadingEl);
        }
      });
      
      // Create another observer for fade-in animation
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Find the item and make it visible
            this.columns.forEach(column => {
              column.forEach(item => {
                if (item.id.toString() === entry.target.getAttribute('data-id')) {
                  item.visible = true;
                }
              });
            });
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });
      
      // Observe all waterfall items
      this.$nextTick(() => {
        document.querySelectorAll('.waterfall-item').forEach(item => {
          item.setAttribute('data-id', item.getAttribute('key'));
          animationObserver.observe(item);
        });
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