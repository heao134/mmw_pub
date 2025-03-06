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
          title: "Black Box Optimization",
          image: "https://via.placeholder.com/400x300",
          summary: "We use Black Box Optimization strategies like Bayesian Optimization to optimize unknown, expensive-to-evaluate objective functions for Human-in-the-loop Personalization applications.",
          paperLink: "https://example.com/paper1"
        },
        {
          title: "Generative Models",
          image: "https://via.placeholder.com/400x300",
          summary: "We use generative models like diffusion, GANs, VAEs for various signal processing applications like audio/speech inverse problems, audio synthesis etc.",
          paperLink: "https://example.com/paper2"
        },
        {
          title: "Neural Radiance Fields",
          image: "https://via.placeholder.com/400x300",
          summary: "Our research explores novel applications of Neural Radiance Fields (NeRFs) for 3D scene reconstruction and novel view synthesis.",
          paperLink: "https://example.com/paper3"
        },
        {
          title: "Signal Processing Algorithms",
          image: "https://via.placeholder.com/400x300",
          summary: "Development of efficient signal processing algorithms for real-time applications in audio and communication systems.",
          paperLink: "https://example.com/paper4"
        },
        {
          title: "Millimeter Wave Networks",
          image: "https://via.placeholder.com/400x300",
          summary: "Research on high-frequency communication systems for next-generation wireless networks with improved bandwidth and reduced latency.",
          paperLink: "https://example.com/paper5"
        },
        {
          title: "Motion Tracking in Sports",
          image: "https://via.placeholder.com/400x300",
          summary: "Advanced motion tracking systems for sports analytics, providing real-time performance metrics and injury prevention insights.",
          paperLink: "https://example.com/paper6"
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
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .waterfall-columns {
    flex-direction: column;
  }
}
</style>