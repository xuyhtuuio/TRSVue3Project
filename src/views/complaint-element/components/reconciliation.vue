<script setup>
import { ref,reactive } from 'vue'
import AttachmentUpload from './attachment-upload.vue'
const formData = reactive({
  textarea: '',
  cooperation: '',
  own: ''
})
const rule = {
  textarea: { required: true,message: '请输入和解说明' }
}
const isDisabled = ref(false)
const refForm = ref(null)
const CheckRule = () => {
  return new Promise((resolve, reject) => {
    refForm.value.validate((valid) => {
      if (valid) {
        isDisabled.value = true
        resolve(formData)
      } else {
        reject()
        return false
      }
    })
  })
}
defineExpose({ CheckRule })
</script>

<template>
  <div class="reconciliation">
    <el-form :model="formData" :rules="rule" ref="refForm" :disabled="isDisabled" class="my-form" label-width="80">
      <el-form-item label="和解说明" prop="textarea" class="el-form-item-1">
        <el-input
          v-model="formData.textarea"
          :rows="4"
          type="textarea"
          placeholder="请输入和解说明"
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
