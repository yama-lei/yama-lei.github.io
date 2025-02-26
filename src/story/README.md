---
sidebar: false
article: false
navbar: false
---
这一页还在测试当中，因此有很多的重复内容。

>   其实是就写了框架，样式还要调整，还要补充很多的故事  

<TimeLinePage :stories="myStories"/>

<script setup>
   const myStories = [
    {
      imageSrc: './images.assets/image1.jpg',
      title: '嘉禾一中宣讲',
      description: '去嘉禾一中宣讲，南京大学win麻了，宣讲就是win win win！',
      link:'jhyz',
      time:'2025-1-19',
      comments:'comments',
      showComments:false,
      },    
      {
      imageSrc: './images.assets/红山动物园.png',
      title: '红山动物园玩去了',
      description: '逛了一上午，真的看腻了',
      link:'RedMountainZoo',
      time:'2024-10-5',
      comments:'comments',
      showComments:false,
      },      
      {
      imageSrc: './images.assets/除夕.jpg',
      title: '除夕随便写点',
      description: '烟花只在除夕晚上好看，因为不用担心扰民',
      link:'NewYearEve',
      time:'2022-1-28',
      comments:'comments',
      showComments:false,
      },   
      { 
      imageSrc: './images.assets/除夕.jpg',
      title: '寒假社会实践结束了',
      description: '其实我觉得这次社会实践更像是面向ai编程范式的实践',
      link:'SocialPractice',
      time:'2022-1-28',
      comments:'comments',
      showComments:false,
      },
    // Add more stories as needed
  ]
</script>