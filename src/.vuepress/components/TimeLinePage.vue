<template>
    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div v-for="(story, index) in stories" :key="index" class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="time">{{ story.time }}</div>
          <StoryCard
            :imageSrc="story.imageSrc"
            :title="story.title"
            :description="story.description"
            :link="story.link"
            :time="story.time"
            :comments="story.comments"
            :showComments="story.showComments"
          />
          <div class="comments" v-show="story.showComments">
            {{ story.comments}}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import StoryCard from './StoryCard.vue' // Adjust the path if necessary
  
  const props = defineProps({
    stories: Array
  })
  </script>
  
  <style scoped>
  .timeline-container {
    position: relative;
    padding: 20px 0;
  }
  
  .time{
    text-align:left;
    font-size: larger;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
  .comments{
    text-align:left;
  }

  .timeline-line {
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #ccc;
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 120px;
    padding-left: 40px;
  }
  
  .timeline-item::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 15px;
    width: 20px;
    height: 2px;
    background-color: #ccc;
  }
  
  .timeline-marker {
    position: absolute;
    left: 15px;
    top: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #666;
  }
  
  .timeline-content {
    /* Add styles if needed */
  }
  </style>