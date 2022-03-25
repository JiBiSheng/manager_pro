<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="catogory-header">
          <span>季毕胜花费占比</span>
          <el-radio-group v-model="radio1">
            <el-radio-button label="学习"></el-radio-button>
            <el-radio-button label="购物"></el-radio-button>
            <el-radio-button label="游戏"></el-radio-button>
            <el-radio-button label="陪对象"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div class="charts" ref="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      radio1: "学习",
    };
  },
  mounted() {
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title:{
        text:"学习",
        subtext:1048,
        left:'center',
        top:'center'
      },
      tooltip: {
        trigger: "item",
      },
      
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "学习" },
            { value: 735, name: "购物" },
            { value: 580, name: "游戏" },
            { value: 484, name: "陪对象" },            
          ],
        },
      ],
    });
    mychart.on('mouseover',  (params)=>{
      const {value ,name}=params.data;
      mychart.setOption({
        title:{
          text:name,
          subtext:value,
        }
      })
    })
    

  },
};
</script>

<style scoped>
.catogory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>