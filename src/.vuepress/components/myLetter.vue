<template>
    <div class="stationery-container">
      <div class="paper-sheet">
        <div class="margin-line left"></div>
        <div class="margin-line right"></div>
        <article class="md-content" v-html="compiledMarkdown"></article>
      </div>
    </div>
  </template>
  
  <script>
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  
  export default {
    name: 'myLetter',
    props: {
      content: {
        type: String,
        required: true
      }
    },
    computed: {
      compiledMarkdown() {
        marked.setOptions({
          highlight: (code, lang) => {  // 改为箭头函数保持 this 指向
            return hljs.highlightAuto(code).value;
          },
          breaks: true,
          gfm: true
        });
        return marked(this.content);
      }
    },
    beforeCreate() {  // 添加字体预加载（可选）
      const fonts = [
        'https://fonts.googleapis.com/css2?family=Noto+Serif+SC&family=Playfair+Display&display=swap'
      ];
      fonts.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      });
    }
  }
  </script>
  
  <style scoped>
  .stationery-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f8f5e6;
    border-radius: 3px;
    box-shadow: 
      0 0 10px rgba(0,0,0,0.1),
      0 10px 20px -10px rgba(0,0,0,0.2);
    position: relative;
    transform: translateZ(0);
    transition: transform 0.3s ease;
  }
  
  .stationery-container:hover {
    transform: translateY(-2px);
  }
  
  .paper-sheet {
    position: relative;
    padding: 2.5rem 3rem;
    background: linear-gradient(
      to bottom,
      #fffbf3 0%,
      #fffbf3 98%,
      #f8f5e6 100%
    );
    min-height: 600px;
  }
  
  .margin-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(200, 180, 150, 0.3);
  }
  
  .margin-line.left {
    left: 30px;
  }
  
  .margin-line.right {
    right: 30px;
  }
  
  /* 修复深度选择器问题 */
  .md-content {
    font-family: 'Noto Serif SC', serif;
    color: #3a3a3a;
    line-height: 1.8;
    font-size: 1.1rem;
  }
  
  /* 使用 :deep() 替代 >>> */
  .md-content :deep(h1),
  .md-content :deep(h2) {
    font-family: 'Playfair Display', serif;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5em;
  }
  
  .md-content :deep(p) {
    margin: 1.2em 0;
    text-align: justify;
  }
  
  .md-content :deep(a) {
    color: #8b572a;
    text-decoration: underline wavy;
  }
  
  .md-content :deep(code) {
    font-family: 'Fira Code', monospace;
    background: rgba(200, 200, 200, 0.2);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  
  .md-content :deep(pre) {
    background: rgba(0, 0, 0, 0.05);
    padding: 1.2em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1.5em 0;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .md-content :deep(blockquote) {
    border-left: 4px solid #d4c8b1;
    margin: 1.5em 0;
    padding: 0.5em 1em;
    background: rgba(212, 200, 177, 0.1);
    color: #666;
  }
  </style>