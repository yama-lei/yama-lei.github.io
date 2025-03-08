<!-- Timeline.vue -->
<template>
  <div class="timeline-container">
    <div class="timeline-line"></div>
    <!-- 修改为使用 sortedStories -->
    <div v-for="(story, index) in sortedStories" :key="index" class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="time">{{ story.time }}</div>
        <StoryCard
          :imageSrc="story.imageSrc"
          :title="story.title"
          :description="story.description"
          :link="story.link"
          :commets="story.comments"
          :likesNum="story.likesNum"
        />
        <transition name="fade">
          <div v-if="story.showComments" class="comments">
            {{ story.comments }}
          </div>
        </transition>
      </div>
    </div>


  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue' // 添加computed
import StoryCard from './StoryCard.vue'
import Paper from './Paper.vue'

const props = defineProps({
  stories: Array
})

// 新增排序逻辑
const sortedStories = computed(() => {
  return [...props.stories].sort((a, b) => {
    return new Date(b.time) - new Date(a.time) // 倒序排列
  })
})
</script>

<style scoped>
.timeline-container {
  position: relative;
  padding: 40px 0;
  max-width: 800px;
  margin: 0 auto;
}

.time {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 500;
  position: relative;
  left: -20px;
  padding: 4px 12px;
  background: #f7fafc;
  border-radius: 20px;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.timeline-line {
  position: absolute;
  left: 32px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #c3dafe 0%, #4299e1 50%, #c3dafe 100%);
}

.timeline-item {
  position: relative;
  margin-bottom: 80px;
  padding-left: 70px;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.2);
  background: #4299e1;
}

.timeline-marker {
  position: absolute;
  left: 26px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #4299e1;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(66, 153, 225, 0.3);
}

.comments {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid #4299e1;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>