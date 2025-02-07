<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

// 地图 DOM 容器
const chartRef = ref(null)

onMounted(async () => {
  const chart = echarts.init(chartRef.value) // 初始化 ECharts
  const mapJson = await fetchMapData() // 获取地图数据
  
  echarts.registerMap('china', mapJson) // 注册地图

  chart.setOption({
    title: {
      text: '中国地图示例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true
    },
    series: [
      {
        name: '数据',
        type: 'map',
        map: 'china', // 这里的名字要和 `registerMap` 一致
        roam: true,
        label: {
          show: true
        },
        data: [
          { name: '北京', value: 900 },
          { name: '上海', value: 800 },
          { name: '广东', value: 700 }
        ]
      }
    ]
  })
})

// 获取中国地图的 GeoJSON 数据
async function fetchMapData() {
  const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
  return await res.json()
}
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 500px;"></div>
</template>
