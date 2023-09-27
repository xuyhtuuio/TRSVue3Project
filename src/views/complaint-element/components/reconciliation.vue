<script setup>
import { reactive } from 'vue'
import AttachmentUpload from './attachment-upload.vue'
const formData = reactive({
  textarea: '',
  cooperation: '',
  own: ''
})
const rule = {
  textarea: { required: true }
}
</script>

<template>
  <div class="reconciliation">
    <el-form :model="formData" :rules="rule" class="my-form" label-width="80">
      <el-form-item label="和解说明" prop="textarea" class="el-form-item-1">
        <el-input
          v-model="formData.textarea"
          :rows="4"
          type="textarea"
          placeholder="请输入和解内容"
        />
      </el-form-item>
      <el-form-item label="附件材料" class="el-form-item-f">
        <AttachmentUpload class="item" ref="ref-attachment-upload" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.reconciliation {
  margin-top: 16px;
  padding: 0 24px;
  :deep(.el-form-item__label) {
    text-align: right;
    line-height: 22px;
  }
  :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 0;
    &:hover {
      box-shadow: 0 0 0 0;
    }
  }
}
</style>
