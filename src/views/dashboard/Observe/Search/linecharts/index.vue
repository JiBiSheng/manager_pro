<template>
  <div >
      <div class="header">
          <span class="search-header">搜索用户数</span>
          <svg t="1648126117352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2336" width="26" height="26"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="2337"></path></svg>
      </div>
      <div class="main">
          <span class="main-title">1545</span>
          <span class="main-content">545</span>
          <svg t="1648128119992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3229" width="16" height="16"><path d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z" p-id="3230" fill="#d81e06"></path></svg>
          <svg t="1648128197244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3466" width="16" height="16"><path d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z" p-id="3467" fill="#1afa29"></path></svg>
      </div>
      <div class="footer">
          <div class="charts" ref="charts"></div>
      </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [19, 15, 20, 63, 24, 57, 32, 87],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "skyblue",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "skyblue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth:true
        },
      ],
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
    .header{
        display: flex;
        align-items: center;
    }
    .search-header{
        margin-right: 20px;
        color: #aaa;
    }
    .main-title{
        margin-right: 30px;
    }
    .main{
        display: flex;
        align-items: center;
        margin: 10px 0px;
    }
    .main-content{
        margin-right: 20px;
    }
    .charts{
        width: 100%;
        height: 50px;
    }
</style>