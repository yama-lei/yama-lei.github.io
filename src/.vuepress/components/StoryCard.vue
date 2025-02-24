<template>
    <div class="story-card">
        <div class="left">
      <a :href="link" target="_blank" ><img :src="imageSrc" alt="Story image" /></a>
      <h3 class="title">{{ title }}</h3>
        </div>
      <p class="description">{{ description }}</p>
    </div>
  </template>
  <script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    imageSrc: String,
    title: String,
    description: String,
    link: String,
    time:String,
    commets:String,
    showComments:Boolean,
  })

  </script>
  
  <style scoped>

  .story-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.story-card img:hover{
    cursor: pointer;
    
}
    .left{
        display: flex;  
        flex-direction: column;
        justify-content:space-between;
        width:70%;
        .title{
            text-align: left;
            margin-bottom: 0;
        }
    }
  .story-card img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  .description{
    width: auto;
    text-align: left;
    max-width: 20%;
    margin-left: 5%;
    margin-right: 5%;
}
  </style>