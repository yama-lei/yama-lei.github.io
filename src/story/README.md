---
sidebar: false
article: false
navbar: false
---

<br>

<TimeLinePage :stories="myStories"/>

<script setup>
   const myStories = [
    {
      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/202503011126097.jpg',
      title: '嘉禾一中宣讲',
      description: '去嘉禾一中宣讲，南京大学win麻了，宣讲就是win win win！',
      link:'jhyz',
      time:'2025-1-19',
      comments:'comments',
      showComments:false,
      },    
      {
      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/202503011126096.png',
      title: '红山动物园玩去了',
      description: '逛了一上午，真的看腻了',
      link:'RedMountainZoo',
      time:'2024-10-5',
      comments:'comments',
      showComments:false,
      },      
      {
      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/202503011147039.jpg',
      title: '除夕随便写点',
      description: '烟花只在除夕晚上好看，因为不用担心扰民',
      link:'NewYearEve',
      time:'2025-1-28',
      comments:'comments',
      showComments:false,
      },   
      { 
      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/202503011145059.png',
      title: '寒假社会实践结束了',
      description: '其实我觉得这次社会实践更像是面向ai编程范式的实践',
      link:'SocialPractice',
      time:'2025-1-28',
      comments:'comments',
      showComments:false,
      },{
	      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/20250307201030.png',
      title: '程序设计OJ又没过',
      description: '很简单的题目，在机房死活过不去，回来重写一遍就过了。',
      link:'',
      time:'2025-3-7',
      comments:'comments',
      showComments:false,
      },{
	      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/a896b7a20c9d8a4cee12998faead9a9.jpg',
      title: '记录一下这半年多来写过的信',
      description: '和别人写信应该有5、6次了，想着这也是我思想的载体，好好保存',
      link:'Letters',
      time:'2025-3-8',
      comments:'comments',
      showComments:false,
      }
    // Add more stories as needed
  ]
</script>