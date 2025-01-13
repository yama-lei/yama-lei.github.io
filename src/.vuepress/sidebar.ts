import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
      collapsible: true,// 可折叠
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
      collapsible: true,// 可折叠
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
      collapsible: true,// 可折叠
    },
    {
      text: "game",
      icon: "/assets/icon/game.svg",
      link: "#",
      collapsible: true,// 可折叠
    }
  ],
});
