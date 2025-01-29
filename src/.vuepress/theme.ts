import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://github.com/yama-lei/yama-lei.github.io",
  author: {
    name: "Yama-lei",
    url: "/underbuilding.html",
  },
  
  logo: "/assets/icon/yamasun.svg",

  repo: "https://github.com/yama-lei/yama-lei.github.io",

  docsDir: "src",
  
  // 导航栏
  //参考https://theme-hope.vuejs.press/zh/guide/layout/navbar.html#%E5%A4%96%E8%A7%82%E5%BC%B9%E7%AA%97
  navbar,
  navbarLayout: {
    start: ["Brand","Outlook"],
    center: ["Links", "Search"],
    end: ["Language", "Repo", "Outlook"],
  },
  // 侧边栏
  sidebar,

  // 页脚
  footer: "",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "你可以叫我亚麻",
    intro: "/intro.html",
    medias: {
      BiliBili: "/underbuilding.html",
      Email: "/underbuilding.html",
      Facebook: "/underbuilding.html",
      Gitee: "/underbuilding.html",
      GitHub: "/underbuilding.html",
      Gitlab: "/underbuilding.html",
      Gmail: "/underbuilding.html",
      Instagram: "/underbuilding.html",
      Lines: "/underbuilding.html",
      QQ: "/underbuilding.html",
      Steam: "/underbuilding.html",
      Twitter: "/underbuilding.html",
      Wechat: "/underbuilding.html",
      Weibo: "/underbuilding.html",
      Youtube: "/underbuilding.html",
      Zhihu: "/underbuilding.html",
  },
  },
  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/thinking/myOldDays.html":["********","password","请输入密码"],
      "/New/":["1234"],
      "/friendsLink":["1234"],
      "/story/love":["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // markdownMath: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    revealjs: {
      plugins: ["highlight", "math", "search", "notes", "zoom"],
    },

    // 在启用之前安装 chart.js
    chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },
    components: {
      components: ["Badge", "VPCard","PDF","BiliBili"],
    },

    icon: {
      assets: "fontawesome-with-brands",
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
