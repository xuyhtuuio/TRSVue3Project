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
    <el-form :inline="true" :model="listQuery" size="small" :rules="rules">
          <el-form-item label="客户姓名：" prop="name">
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
          <el-form-item label="联系方式：" >
          <div class="choose-item-background">
            <el-input  placeholder="客户联系方式"></el-input>
          </div>

          </el-form-item>
          <el-form-item label="商品分类：">
            <div class="choose-item-background">
              <el-input  placeholder="客户联系方式"></el-input>
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

const rules = ({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
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

.el-input__inner {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: #F3F6FB;
}

</style>