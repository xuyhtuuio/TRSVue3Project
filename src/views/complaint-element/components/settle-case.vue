<template>
  <div class="settle-case">
    <el-form :model="formData" :rules="rule" class="my-form">
      <el-form-item label="结案描述" prop="textarea">
        <el-input v-model="formData.textarea" :rows="2" type="textarea" placeholder="请输入结案描述内容" />
      </el-form-item>
      <el-form-item label="客户满意度" prop="satisfaction">
        <el-radio-group v-model="formData.satisfaction">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const formData = reactive({
  textarea: ''
})
const rule = {
  textarea: {required: true}
}
</script>

<style lang="less" scoped>
.settle-case {
  margin-top: 16px;
  padding: 0 24px;
}
</style>
