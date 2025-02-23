import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite';
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
  bundler: viteBundler(),
  // 和 PWA 一起启用
  // shouldPrefetch: false,
  
})