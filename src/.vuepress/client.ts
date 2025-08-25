import { defineClientConfig } from "vuepress/client";
import MyCard from "./components/myCard.vue";
import TimeLinePage from './components/TimeLinePage.vue'
import StoryCard from './components/StoryCard.vue'
import storyShow from "./components/storyShow.vue";
import RepoCard from './components/RepoCard.vue';
import Paper from "./components/Paper.vue";
export default defineClientConfig({
  enhance({ app }) {
    // 手动注册组件
    app.component("MyCard", MyCard);
    app.component("TimeLinePage",TimeLinePage);
    app.component("StoryCard",StoryCard);
    app.component("storyShow",storyShow);
    app.component("RepoCard",RepoCard);
    app.component("Paper",Paper);
  },
  layouts: {
    storyShow,
  },
});