import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  base: "/", 
  lang: "zh-CN",
  title: "Myblog",
  description: "Yama的博客",
  theme,
  head: [
    ['link', { rel: 'icon', href: '/assets/icon/yama.svg' }], // 自定义图标路径
  ],
  
  // 和 PWA 一起启用
  // shouldPrefetch: false,
  
})