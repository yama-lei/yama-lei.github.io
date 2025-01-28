import { defineClientConfig } from "vuepress/client";
import MyCard from "./components/myCard.vue";

export default defineClientConfig({
  enhance({ app }) {
    // 手动注册组件
    app.component("MyCard", MyCard);
  },
});