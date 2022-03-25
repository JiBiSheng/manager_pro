<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></categorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 3px 20px"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                type="success"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <div>
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateAttr(row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form
          :inline="true"
          ref="form"
          style="margin-left: -25px"
          label-width="80px"
        >
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          :data="attrInfo.attrValueList"
          border
          style="width: 100%; margin: 20px 0px"
        >
          <el-table-column
            algin="center"
            type="index"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row,$index }">              
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      //收集新增|修改属性
      attrInfo: {
        attrName: "", //收集到的属性名
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    //自定义事件回调
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
        this.getAttrList();
      }
    },
    addAttr() {
      //添加属性按钮的回调
      this.isShowTable = false;
      //清除数据
      this.attrInfo = {
        attrName: "", //收集到的属性名
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    //失去焦点的事件
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      //新增的属性值不能与已有的属性值冲突
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("已有该属性");
        return;
      }
      row.flag = false;
    },
    //点击span的回调,变为编辑模式
    toEdit(row, $index) {
      row.flag = true;
      //获取iput节点,点击span的时候重绘一个input需要耗费时间，不可能立马获取到input
      this.$nextTick(() => {
        this.$refs[$index].focus();
      });
    },
    addAttrValue() {
      //向属性值的数组里添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //获取平台属性的数据
    async getAttrList() {
      //获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //气泡确认框，确认按钮回调
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    //保存按钮
    async addOrUpdateAttr(){
      //整理参数
      this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          delete item.flag;
          return true;
        }
      });
      //发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.$message({type:'success',message:'保存成功'});
        //保存成功以后需要再次发送请求
        this.getAttrList();
        this.isShowTable=true;
      } catch (error) {
        this.$message('保存失败');
      }
    }
  },
};
</script>

<style>
</style>