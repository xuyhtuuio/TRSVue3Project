<script setup>
import { reactive } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import AttachmentUpload from './attachment-upload.vue'
const formData = reactive({
  textarea: '',
  cooperation: '',
  own: ''
})
const rule = {
  textarea: { required: true },
  type: { required: true }
}
const levelOptions = ['调查核实', '回复客户']
</script>

<template>
  <div class="additional-recording">
    <el-form :model="formData" :rules="rule" class="my-form" label-width="80">
      <el-col :span="8">
        <el-form-item label="补录类型" prop="type" :rule="{ required: true }">
          <el-select
            v-model="formData.type"
            placeholder="请选择"
            :suffix-icon="CaretBottom"
            clearable
          >
            <el-option v-for="item in levelOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-form-item label="结案信息补录" prop="textarea">
        <el-input
          v-model="formData.textarea"
          :rows="4"
          type="textarea"
          placeholder="请输入结案描述内容"
        />
      </el-form-item>
      <el-form-item label="附件材料" class="el-form-item-f">
        <AttachmentUpload class="item" ref="ref-attachment-upload" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.additional-recording {
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
