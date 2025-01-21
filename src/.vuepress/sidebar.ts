import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
      collapsible: true,// 可折叠
    },
    {
      text: "个人简介",
      icon: "/assets/icon/intro.svg",
      link:"intro",
    },
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    //   collapsible: true,// 可折叠
    // },
    {
      text: "game",
      icon: "/assets/icon/game.svg",
      link: "game/",
      collapsible: true,// 可折叠
    },
    ],
});

//这里修改的是侧边栏中“Links”的部分，要想修改其他部分，需要到themme.ts中修改