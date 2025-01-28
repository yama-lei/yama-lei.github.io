<template>
    <div 
      class="card" 
      @click="openLink" 
      @mouseover="hover = true" 
      @mouseleave="hover = false"
    >
      <img :src="logo" alt="logo" class="card-logo" />
      <div class="card-content">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-desc">{{ desc }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyCard",
    props: {
      logo: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        hover: false,
      };
    },
    methods: {
      openLink() {
        window.open(this.link, "_blank");
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 16px;
    border: 2px solid #ddd;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .card-logo {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  
  .card-content {
    text-align: center;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 8px 0;
    color: #333;
  }
  
  .card-desc {
    font-size: 0.9rem;
    color: #666;
  }
  </style>
  