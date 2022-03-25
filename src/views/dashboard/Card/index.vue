<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126561">
              <template slot="charts">
                  <span>周同比 56.67 <svg t="1648128119992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3229" width="16" height="16"><path d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z" p-id="3230" fill="#d81e06"></path></svg></span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>日同比 54.74 <svg t="1648128197244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3466" width="16" height="16"><path d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z" p-id="3467" fill="#1afa29"></path></svg></span>
              </template>
              <template slot="footer">
                  <span>日销售额     ￥125421</span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88461">
              <template slot="charts">
                <lineCharts></lineCharts>
              </template>
              <template slot="footer">
                  <span>日访问量125421</span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88461">
            <template slot="charts">
                <barCharts></barCharts>
              </template>
              <template slot="footer">
                  <span>转化率65%</span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
             <template slot="charts">
                <progressCharts></progressCharts>
              </template>
              <template slot="footer">
                  <span>周同比 56.67 <svg t="1648128119992" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3229" width="16" height="16"><path d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z" p-id="3230" fill="#d81e06"></path></svg></span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>日同比 54.74 <svg t="1648128197244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3466" width="16" height="16"><path d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z" p-id="3467" fill="#1afa29"></path></svg></span>
              </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from './lineChart'
import barCharts from './barChart'
import progressCharts from './progressCharts'
export default {
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  },
};
</script>

<style>
</style>