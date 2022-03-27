<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <div slot="header" class="clearfix">
        <el-tabs class="tab" v-model="activeName" >
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span class="ywd" @click="setDay">今日</span>
          <span class="ywd" @click="setWeek">本周</span>
          <span class="ywd" @click=setMonth>本月</span>
          <span class="ywd" @click=setYear>本年</span>
          <el-date-picker v-model="date"
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
              <h4>门店{{title}}排名</h4>
              <ul>
                  <li>
                      <span class="rindex">0</span>
                      <span>肯德基</span>
                      <span class="rvalue">123456</span>
                  </li>
                  <li>
                      <span class="rindex">1</span>
                      <span>麦当劳</span>
                      <span class="rvalue">123456</span>
                  </li>
                  <li>
                      <span class="rindex">2</span>
                      <span>必胜客</span>
                      <span class="rvalue">123456</span>
                  </li>
                  <li>
                      <span class="rindex">3</span>
                      <span>蜜雪冰城</span>
                      <span class="rvalue">123456</span>
                  </li>
                  <li>
                      <span class="rindex">4</span>
                      <span>CoCo</span>
                      <span class="rvalue">123456</span>
                  </li>
                  <li>
                      <span class="rindex">5</span>
                      <span>茶百道</span>
                      <span class="rvalue">123456</span>
                  </li>
                  <li>
                      <span class="rindex">6</span>
                      <span>白象</span>
                      <span class="rvalue">123456</span>
                  </li>
              </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      activeName: "sale",
      mycharts:null,
      date:[]
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title:{
          text:"销售额趋势"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",          
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
        },
      ],
    });
  },
  computed:{
      title(){
          return this.activeName=="sale"?'销售额':'访问量'
      },
      ...mapState({
        listState:state=>state.home.list
      })
  },
  watch:{
    title(){
      this.mycharts.setOption({
        title:{
          text:this.title+'趋势'
        },
        xAxis:{
          data:this.title=='销售额'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
        series:{
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear
        }
      })
    },
    listState(){  
      this.mycharts.setOption({
      title:{
          text:"销售额趋势"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",          
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
        },
      ],
    });
            
    }
  },
  methods: {
    setDay(){      
      const day=dayjs().format('YYYY-MM-DD')
      console.log(day);
      this.date=[day,day]
    },
    setWeek(){
      const start =dayjs().day(1).format('YYYY-MM-DD');
      const end =dayjs().day(7).format('YYYY-MM-DD');
      this.date=[start,end]
    },
    setMonth(){
      const start =dayjs().startOf('month').format('YYYY-MM-DD');
      const end =dayjs().endOf('month').format('YYYY-MM-DD');
      this.date=[start,end]
    },
    setYear(){
      const start =dayjs().startOf('year').format('YYYY-MM-DD');
      const end =dayjs().endOf('year').format('YYYY-MM-DD');
      this.date=[start,end]
    }
  },

};
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 250px !important;
  margin: 0px 20px;
}
.ywd {
  margin-left: 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
h4{
    margin: 0;
}
ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}
ul li{
    height: 8%;
    margin-bottom: 15px;
}
.rindex{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
    line-height: 20px;
    margin-right: 20px;
}
.rvalue{
    float: right;
}

</style>