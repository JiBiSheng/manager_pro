<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{spu.spuName}} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input placeholder="价格（元）" v-model="skuInfo.price"  type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input placeholder="价格（千克）" v-model="skuInfo.weight" ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc" ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" v-for="(attrValue ,index) in attr.attrValueList" :key="attrValue.id" :value='`${attr.id}:${attrValue.id}`'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" width="80px">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width:100px;height:100px" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0"  @click="changeDefalut(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button  @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        category3Id: 0,
        price: 0,
        spuId: 0,
        tmId: 0,
        skuName: "",
        weight: "",
        skuDesc: "",
        skuDefaultImg: "",  
        skuAttrValueList: [
          {            
            attrId: 0,
            valueId: 0,
          },
        ],              
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],        
        skuSaleAttrValueList: [],                
      },
      spu:{},
      imageList:[]
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      this.skuInfo.category3Id=spu.category3Id;
      this.skuInfo.spuId=spu.id;
      this.skuInfo.tmId=spu.tmId;
      this.spu=spu;
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      if(result.code==200){
        let list=result.data;
        list.forEach(item=>{
          item.isDefault=0;
        });
        this.spuImageList =list;
      }
      
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      this.spuSaleAttrList = result1.data;
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      this.attrInfoList = result2.data;
    },
    handleSelectionChange(params){
      this.imageList=params;
    },
    changeDefalut(row){
      this.spuImageList.forEach(item=>{
        item.isDefault=0;
      });
      row.isDefault=1;
      this.skuInfo.skuDefaultImg=row.imgUrl;
    },
    cancel(){      
      this.$emit("changeScenes",0)
      Object.assign(this._data,this.$options.data())
    },
    async save(){
      //整理平台属性
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList}=this;
      skuInfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          let [attrId ,valueId]=item.attrIdAndValueId.split(':');
          prev.push({attrId ,valueId});
        }
        return prev;
      },[]);
      //整理销售属性
      skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          let [saleAttrId ,saleAttrValueId]=item.attrIdAndValueId.split(':');          
          prev.push({saleAttrId ,saleAttrValueId});
        }
        return prev;
      },[]);
      //整理图片数据
      skuInfo.skuImageList=imageList.map(item=>{
        return{
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id,
        }
      });
      let result=await this.$API.spu.reqAddSku(skuInfo);
      if(result.code==200){
        this.$message({type:'success',message:'添加成功'})
        this.$emit("changeScenes",0)
        Object.assign(this._data,this.$options.data())
      }
    }
  },
};
</script>

<style>
</style>