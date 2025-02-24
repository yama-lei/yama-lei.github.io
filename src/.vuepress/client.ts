import { defineClientConfig } from "vuepress/client";
import MyCard from "./components/myCard.vue";
import TimeLinePage from './components/TimeLinePage.vue'
import StoryCard from './components/StoryCard.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 手动注册组件
    app.component("MyCard", MyCard);
    app.component("TimeLinePage",TimeLinePage);
    app.component("StoryCard",StoryCard);
  },
});