import { defineClientConfig } from "vuepress/client";
import MyCard from "./components/myCard.vue";
import MyLetter from "./components/myLetter.vue";
import MapChart from "./components/MapChart.vue"
import CourseShow from "./components/CourseShow.vue";


export default defineClientConfig({
  enhance({ app }) {
    // 手动注册组件
    app.component("MyCard", MyCard);
    app.component("myLetter",MyLetter);
    app.component("MapChart",MapChart);
  },
});