<script setup>
import { reactive } from 'vue'
import AttachmentUpload from './attachment-upload.vue'
const formData = reactive({
  textarea: '',
  cooperation: '',
  own: ''
})
const rule = {
  textarea: { required: true, message: '请输入结案描述' }
}
const isExistOptions = [
  '金钱赔偿',
  '赔礼道歉',
  '返还财产',
  '灰复原状',
  '优化产品流程',
  '修改完善制度',
  '处分员工',
  '建议走司法',
  '建议三方调解',
  '其他'
]
</script>

<template>
  <div class="settle-case">
    <el-form :model="formData" :rules="rule" class="my-form" label-width="100">
      <el-form-item label="结案描述" prop="textarea">
        <el-input
          v-model="formData.textarea"
          :rows="2"
          type="textarea"
          placeholder="请输入结案描述内容"
        />
      </el-form-item>
      <el-form-item label="主要措施" class="my-form-item">
        <el-checkbox-group v-model="formData.isExist">
          <el-checkbox v-for="city in isExistOptions" :key="city" rows="4" :label="city">{{
            city
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="是否接受" class="half my-form-item">
            <el-radio-group v-model="formData.repeatOne">
              <el-radio label="2" size="large">否</el-radio>
              <el-radio label="1" size="large">是（含客户主动撤销）</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户满意度" prop="satisfaction" class="my-form-item">
            <el-radio-group v-model="formData.satisfaction">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="附件材料" class="el-form-item-f">
        <AttachmentUpload class="item" ref="ref-attachment-upload" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.settle-case {
  margin-top: 16px;
  padding: 0 24px;

  :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 0;
    &:hover {
      box-shadow: 0 0 0 0;
    }
  }
}
</style>
