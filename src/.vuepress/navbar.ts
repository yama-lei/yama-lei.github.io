import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text:"人生感悟",
    icon: "/assets/icon/thinking.svg",
    link: "/thinking/",
  },
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "python",
        link: "python学习/",
      },    
      {
        text: "前端开发",
        link: "前端开发/",
      }, 
      {
        text: "科研启蒙",
        link: "科研启蒙/",
      }, 
      {
        text: "NJUCS",
        link: "NJUCS/",
        prefix: "NJUCS/",
        children:[
          {
            text: "高级程序设计",
            link:  "高级程序设计/",
          },
          {
            text: "数字逻辑与计算机组成",
            link:  "数字逻辑与计算机组成/",
          }
        ]
      },
    ],
  },

  {
    text:"前端开发",
    icon: "pen-to-square",
    link: "/posts/前端开发/"
  },


  {
    text:"NJUCS南大计算机笔记",
    icon: "/assets/icon/nju.svg",
    link: "/posts/NJUCS/"
  },
  {
    text:"科研启蒙",
    icon: "/assets/icon/nju.svg",
    link: "/posts/科研启蒙/"
  },
  
]);
