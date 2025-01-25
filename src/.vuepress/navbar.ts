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
        text: "cpp高程/算法",
        link: "算法/",
      },      
      {
        text: "前端开发",
        link: "前端开发/",
      },
    ],
  },

  {
    text:"前端开发",
    icon: "pen-to-square",
    link: "/posts/前端开发/"
  },


  {
    text:"算法学习",
    icon: "pen-to-square",
    link: "/posts/算法/"
  },
  
  
]);
