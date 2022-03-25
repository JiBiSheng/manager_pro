<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></categorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <!-- 展示spu列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="300px">
            <template slot-scope="{ row, $index }">
              <div style="text-align: center">
                <HintButton
                  title="添加sku"
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  @click="addSku(row)"
                ></HintButton>
                <HintButton
                  title="修改spu"
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateSpu(row)"
                ></HintButton>
                <HintButton
                  title="显示当前spu全部sku列表"
                  type="info"
                  icon="el-icon-info"
                  @click="handle(row)"
                  size="mini"
                ></HintButton>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @onConfirm="deleteSpu(row)"
                >
                  <HintButton
                    title="删除spu"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    slot="reference"
                  ></HintButton>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 7]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes ,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        @changeScenes="changeScenes"
        ref="sku"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的Sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close">
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column  label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px" alt="">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>


<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList:[],
      loading:true
    };
  },
  components: {
    SpuForm,
    SkuForm,
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发请求获取平台属性
        this.getSpuList();
      }
    },
    //获取SPU列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //分页器展示数据的数量的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加SPU按钮的回调
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpudata(this.category3Id);
    },
    //修改SPU按钮回调
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    //spuform自定义事件
    changeScene({ scene, flag }) {
      //切换场景
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    changeScenes(secne) {
      this.scene = secne;
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    async handle(spu) {
      (this.dialogTableVisible = true), (this.spu = spu);
      let result = await this.$API.spu.reqSkuList(spu.id);
      if(result.code==200){
        this.skuList=result.data;
        this.loading=false;
      }
    },
    close(done){
      this.loading=true;
      this.skuList=[];
      done();
    }
  },
};
</script>

<style>
</style>