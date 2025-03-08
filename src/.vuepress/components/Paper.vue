<template>
  <div class="stack">
    <div class="card">
      <div class="content">
        <div class="avator">
          <img
            src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/%E6%A0%A1%E6%A0%87-%E9%80%8F%E6%98%8E%20(1).png"
            alt="Avatar"
          />
        </div>
        <div class="title">
          {{ title }}
        </div>

        <div class="para" v-for="(para, index) in main" :key="index">
          {{ para }}
        </div>
        <div class="author">
          {{ author }}
        </div>
        <div class="time">
          {{ time }}
        </div>
        <br />
        <!-- 图片展示区域 -->
        <div class="image-container" ref="imageContainer">
          <div
            class="image-item"
            v-for="(url, index) in imgUrls"
            :key="index"
          >
            <img :src="url" alt="Gallery Image" class="gallery-image" />
          </div>
        </div>
      </div>
      <div class="slogan">
        <img
          class="slogan"
          src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/nju-name.png"
          alt="Slogan"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  main: Array,
  time: String,
  author: String,
  imgUrls: Array,
});
</script>

<style scoped>
/* 引入中文字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

body {
  font-family: 'Noto Serif SC', serif;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: 'Noto Serif SC', serif;
}

.para {
  padding: 10px;
  text-indent: 2rem;
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #ff6b6b;
  padding-left: 1rem;
  transition: border-color 0.3s ease;
  font-family: 'Noto Serif SC', serif;
}

.para:hover {
  border-color: #4ecdc4;
}

.author,
.time {
  text-align: end;
  margin: 10px;
  font-size: 1rem;
  color: #777;
  font-family: 'Noto Serif SC', serif;
}

.stack {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  transition: transform 0.25s ease;
}

.stack:hover {
  transform: rotate(1deg) scale(1.02);
}

.card {
  aspect-ratio: 3 / 2;
  border: 4px solid #ff6b6b;
  background-color: color-mix(in srgb, rgb(236, 31, 31) 40%, white);
  position: relative;
  transition: all 0.15s ease;
  cursor: pointer;
  padding: 5% 5% 10% 5%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card:before,
.card:after {
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  border: 4px solid #4ecdc4;
  background-color: #fff;
  transform-origin: center center;
  z-index: -1;
  transition: all 0.15s ease;
  top: 0;
  left: 0;
}

.card:before {
  transform: translatey(-2%) rotate(-6deg);
}

.card:after {
  transform: translatey(2%) rotate(6deg);
}

.card:hover:before {
  transform: translatey(-4%) rotate(-8deg);
}

.card:hover:after {
  transform: translatey(4%) rotate(8deg);
}

.content {
  width: 100%;
  border: 4px solid #4ecdc4;
  background-color: #f9f9f9;
  aspect-ratio: 1 / 1;
  position: relative;
  padding: 1.5rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.avator {
  position: absolute;
  right: 10px;
  top: 10px;
}

.slogan {
  position: absolute;
  right: 10px;
  bottom: 20px;
  z-index: 1000;
}

.slogan img,
.avator img {
  width: 80px;
  transition: transform 0.3s ease;
}

.slogan img:hover,
.avator img:hover {
  transform: scale(1.1);
}

/* 图片展示区域样式 */
.image-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  margin-bottom: 1rem;
  padding-bottom: 10px; /* 防止滚动条遮挡内容 */
}

.image-item {
  flex: 0 0 auto;
}

.image-item img {
  height: 300px;
  width: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-item img:hover {
  transform: scale(1.05);
}

/* 自定义滚动条样式 */
.image-container::-webkit-scrollbar {
  height: 10px; /* 滚动条高度 */
}

.image-container::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道背景 */
  border-radius: 5px;
}

.image-container::-webkit-scrollbar-thumb {
  background: #ff6b6b; /* 滚动条 thumb 颜色 */
  border-radius: 5px;
  transition: background 0.3s ease;
}

.image-container::-webkit-scrollbar-thumb:hover {
  background: #e64a4a; /* 滚动条 thumb 悬停颜色 */
  
}
</style>