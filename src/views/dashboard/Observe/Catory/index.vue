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
export default {
  data() {
    return {
      radio1:'学习'
    }
  },
  mounted() {
    let mychart=echarts.init(this.$refs.charts);
    mychart.setOption({
      
    })
  },
};
</script>

<style scoped>
  .catogory-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header{
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  .charts{
    width: 100%;
    height: 300px;
  }

</style>