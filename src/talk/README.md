---
sidebar: false
article: false
navbar: false
---

<TimeLinePage :stories="myStories"/>
<br/>



<script setup>
   const myStories = [{
      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/14038cbc6297c3e6bc90719f92ca674.jpg',
      title: '关关难过关关过',
      description: '人生中第一次答辩，碰上了学期中第二忙的一周；从稿子到ppt，我准备了近一周，背一遍稿子做一题微积分，同时复习vjf，离散',
      link:'',
      time:'2025-4-16',
      comments:'',
      showComments:false,
      },{
      imageSrc: '',
      title: '',
      description: '好尴尬,今天去交奖学金材料,办公室里有两个我认识的同学,然而老师还当众夸了我,好尴尬;让我很难堪,因为这个学期我感觉学习压力也挺大的,大概率是不会有上学期那么好了',
      link:'',
      time:'2025-4-7',
      comments:'',
      showComments:false,
      },{
      imageSrc: '',
      title: '',
      description: '突然想到一句好笑的话，外表不够吸引人没什么不好的，起码可以收获到很纯洁的异性友谊',
      link:'',
      time:'2025-4-5',
      comments:'',
      showComments:false,
      },{
      imageSrc: '',
      title: '',
      description: '一个很牛逼的前端效果，真帅啊，用这个来做行迹图该有多牛哇https://walkkumano.com/koyabound/',
      link:'',
      time:'2025-4-4',
      comments:'',
      showComments:false,
      },{
      imageSrc: '',
      title: '数字逻辑和计算机组成--依托答辩',
      description: '计组的实验报告就是傻逼，非要学生在这种没有用处的东西上面浪费时间？你是TM抖M吗？非得用这种东西浪费被人时间？ 我就想问问你，我能从中学到什么？或者说，我能从中学到的东西我不能通过别的途径来学吗？  情绪宣泄完了，开始对这门课进行一点点评： 1. 不清不楚的实验细节。几乎没有给学生任何的指导，哪怕是有手册告诉学生，PMOS和NMOS是可以在左边调的，位宽是可以改的，上面那个大框框里面的东西叫引脚，通过一个隧道和外面相连，如果你想调试，就拿起你的小手手在上面点一点，鲜绿色就变成了深绿色，就像魔法一样。然而，所有的东西都要自己来摸索。 2. 没有重点的ppt和教学大纲。 如果说实验不清不楚，学生还能从中锻炼自己摸索的能力，那么没有合理结构的PPT，更是这门课垃圾的原因之一。上课念ppt，“不同班进度区别由老师念ppt的进度决定”，如果没有预习，一定是跟不上--各种莫名奇妙的缩写，模糊的细节。',
      link:'',
      time:'2025-3-30',
      comments:'',
      showComments:false,
      },{
      imageSrc: '',
      title: '',
      description: '我突然想到，初中的有一个女同学，在初二转学去了乡下中学，成绩一落千丈，那年疫情，她的父母都失业了，只能供她弟弟读珠泉中学。我忘记她的名字了。那年疫情我爸癌症晚期走了。那个时候还是梅菊教我们，两个班主任给她们家说凑1000块也没去，后来听说来嘉禾一中读了。我在嘉禾一中好像见过她，但是没打招呼，我不知道是不是她，她可能也不知道是不是我。但我想不起来她名字了。 好奇怪，很喜欢这种恍惚感。',
      link:'',
      time:'2025-3-21',
      comments:'',
      showComments:false,
      },{
      imageSrc: '',
      title: '人生愿望清单+1',
      description: '我想做一个打印在powershell里面的游戏，比如飞机大战，命令行版植物大战僵尸，或者格斗小游戏',
      link:'',
      time:'2025-3-21',
      comments:'',
      showComments:false,
      }, 
            {
      imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/a975d6877e1351c1008927d00a2fa1d.jpg',
      title: '来信',
      description: '收到了好多礼物，好开心！ヾ(≧▽≦*)o',
      link:'2025_3_13',
      time:'2025-3-13',
      comments:'',
      showComments:false,
      }, 
        {
      imageSrc: '',
      title: '立一个flag',
      description: '我要在暑假做一个说说平台，让不同的博客之间能够用一套平台，类似QQ空间一样',
      link:'',
      time:'2025-3-13',
      comments:'反正也没说是哪个暑假',
      showComments:true,
      }, 
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
      },
      {
	    imageSrc: 'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/a896b7a20c9d8a4cee12998faead9a9.jpg',
      title: '记录一下这半年多来写过的信',
      description: '和别人写信应该有5、6次了，想着这也是我思想的载体，好好保存',
      link:'Letters',
      time:'2025-3-8',
      comments:'comments',
      showComments:false,
      likesNum:1
      }
    // Add more stories as needed
  ]
</script>