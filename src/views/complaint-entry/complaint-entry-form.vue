<template>
  <div class="outter">
  <div class="smart-fill">
    <div class="title">
      智能填写
    </div>
    
  </div>
  <div class="smart-fill">
    <div class="title">
      客户基本信息
    </div>
    <el-form :inline="true" :model="listQuery" size="small" >
          <el-form-item label="客户姓名：">
            <div class="choose-item-background">
               <el-input  placeholder="请输入客户姓名" v-model="listQuery.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="客户类型：">
            <div>
              <div class="choose-item-background">
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio label="geren" size="small"> 个人客户</el-radio>
                <el-radio label="duigong" size="small"> 对公客户</el-radio>
              </el-radio-group>
            </div>
            </div>
          </el-form-item>
          <el-form-item label="商品货号：">
          <div class="choose-item-background">
            <el-input   placeholder="客户联系方式"></el-input>
          </div>

          </el-form-item>
          <el-form-item label="商品分类：">
            <div class="choose-item-background">
            <el-cascader
              clearable
              :options="textSelection">
            </el-cascader>
          </div>
          </el-form-item>
    </el-form>
    
  </div>
  <div class="smart-fill">
    <div class="title">
      投诉要素
    </div>
    
  </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const radio1 = ref('1')
const listQuery = reactive({
    name: ''
})
</script>

<style>
.outter {
  padding: 20px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
}

.choose-item-background {
  background-color: rgb(228, 228, 228, 0.5);
  width: 250px;
  padding-left: 10px;
  border-radius: 5px;
  display: flex;
  align-content: center;
}

.el-input__wrapper {
  box-shadow: 0 0 0 0;
  background-color: transparent;
}

.title {
  margin: 10px 0 10px 0;
}

</style>