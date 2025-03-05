<template>
  <div class="videos-page">
    <el-collapse>
      <el-collapse-item v-for="(section, index) in videoSections" :key="index" :title="section.title">
        <div class="video-grid">
          <div v-for="(video, vIndex) in section.videos" :key="vIndex" class="video-item">
            <h4>{{ video.title }}</h4>
            <iframe
              :src="video.url"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'VideosPage',
  data() {
    return {
      videoSections: [
        {
          title: '研究成果展示',
          videos: [
            {
              title: '视频标题1',
              url: 'https://www.youtube.com/embed/example1'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.videos-page {
  padding: 20px;
}
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.video-item iframe {
  width: 100%;
  height: 200px;
}
</style> 