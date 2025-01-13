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
        icon: "/assets/icon/book.svg",
        link: "python学习/",
      },
      {
        text: "cpp高程/算法",
        icon: "pen-to-square",
        link: "算法/",
      },
    ],
  },
]);
