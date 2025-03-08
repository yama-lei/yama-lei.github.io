---
article: false
sidebar: false

---
<br>

<div v-for="(letter,index) in letters">
    <Paper
        :title="letter.title"
        :time="letter.time"
        :main="letter.main"
        :imgUrls="letter.imgUrls"
    />
</div>

<script setup>
const letters=[
    {
        title:"Title",
        time:"2025-3-8",
        author:"yama",
        main:[
            "在 Vue.js 中，可以使用 v-for 指令结合排序函数来对数据进行排序并渲染。以下是一个简单的示例，展示如何根据 age 属性对数据进行排序。",
            '【vue】v-for按照字段自定义排序_vue v-for 排序-CSDN博客2021年9月27日 · v-for一个数组，按照数组里面的orderNumber字段进行排序。 解决：关键代码如下 <mputedmputed:{ sort:function(){ return ',
            'Test Para 3 hhh'
        ],
        imgUrls:['https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/a896b7a20c9d8a4cee12998faead9a9.jpg',
            'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/a896b7a20c9d8a4cee12998faead9a9.jpg',
            'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250305090935185.png',
            'https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250305090935185.png'
        ]
    },

]

</script>