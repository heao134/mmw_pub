<template>
  <div class="research-container">
    <!-- Research Module 1 -->
    <div class="research-module">
      <h2>Earable Computing</h2>
      <p>Projects around sensing and signal processing using the microphones and IMUs in today's earphones and glasses.</p>
      
      <div class="video-container">
        <div v-if="activeVideo !== 'mute-video'" class="thumbnail-wrapper" @click="playVideo('mute-video')">
          <img src="https://img.youtube.com/vi/dP15zlyra3c/hqdefault.jpg" alt="MUTE: Bringing IoT to Noise Cancellation" class="video-thumbnail">
          <div class="play-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="64" height="64">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
        </div>
        <iframe 
          v-if="activeVideo === 'mute-video'" 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/dP15zlyra3c?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      
      <p>MUTE exploits the velocity gap between RF and sound to improve active noise cancellation.</p>
      
      <div class="paper-links">
        <a href="https://example.com/paper1" class="paper-link">Paper</a> in ACM SIGCOMM 2018 
        [<a href="https://example.com/slides1">Slides</a>]
      </div>
    </div>

    <!-- Research Module 2 -->
    <div class="research-module">
      <h2>Acoustics and Vibration</h2>
      <p>We explore new modalities of communication (and attacks) using inaudible audio and physical vibrations.</p>
      
      <div class="video-container">
        <div v-if="activeVideo !== 'backdoor-video'" class="thumbnail-wrapper" @click="playVideo('backdoor-video')">
          <img src="https://img.youtube.com/vi/yz7HW8Hj_oE/hqdefault.jpg" alt="Inaudible BackDoor Sound" class="video-thumbnail">
          <div class="play-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="64" height="64">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
        </div>
        <iframe 
          v-if="activeVideo === 'backdoor-video'" 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/yz7HW8Hj_oE?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      
      <p>Backdoor shows high-frequency ultrasonic sounds can be designed to be recordable by unmodified smartphone microphones while remaining inaudible to humans.</p>
      
      <div class="paper-links">
        <a href="https://example.com/paper2" class="paper-link">Paper</a> in ACM MobiSys 2017 
        [<a href="https://example.com/slides2">Slides</a>]
      </div>
    </div>

    <!-- Research Module 3 -->
    <div class="research-module">
      <h2>Ripple Authentication</h2>
      <p>Novel authentication methods using physical vibration as a new modality for information transfer.</p>
      
      <div class="video-container">
        <div v-if="activeVideo !== 'ripple-video'" class="thumbnail-wrapper" @click="playVideo('ripple-video')">
          <img src="https://img.youtube.com/vi/9-tGmJI1Lkg/hqdefault.jpg" alt="Ripple-2 Demo: Authentication" class="video-thumbnail">
          <div class="play-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="64" height="64">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
        </div>
        <iframe 
          v-if="activeVideo === 'ripple-video'" 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/9-tGmJI1Lkg?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      
      <p>Ripple shows the feasibility of using physical vibration as a new modality for information transfer, where we perform user authentication through a ring.</p>
      
      <div class="paper-links">
        <a href="https://example.com/paper3" class="paper-link">Paper</a> in NSDI 2015 
        [<a href="https://example.com/slides3">Slides</a>]
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearchProjects',
  data() {
    return {
      activeVideo: null
    }
  },
  methods: {
    playVideo(videoId) {
      this.activeVideo = videoId;
    }
  }
}
</script>

<style scoped>
.research-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.research-module {
  margin-bottom: 60px;
}

h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  line-height: 1.5;
  color: #444;
  margin-bottom: 15px;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 20px 0;
}

.video-thumbnail {
  width: 100%;
  display: block;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  transition: opacity 0.2s;
}

.video-container:hover .play-button {
  opacity: 1;
}

.paper-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: bold;
}

.paper-link:hover {
  text-decoration: underline;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.thumbnail-wrapper {
  position: relative;
  cursor: pointer;
}

iframe {
  display: block;
  aspect-ratio: 16/9;
}
</style>