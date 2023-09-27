<template>
  <el-dialog
    v-model="centerDialogVisible"
    :width="width"
    destroy-on-close
    center
  >
  <template #title>
    <strong class="title">{{ title }}</strong>
  </template>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false" class="dafalut">取消</el-button>
        <el-button type="primary" @click="handleSave">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  title: String,
  width: {
    type: String,
    default: '40%'
  }
})
const emit = defineEmits(['save'])

const centerDialogVisible = ref(false)
const openDialog = () => {
  centerDialogVisible.value = true
}
const closeDialog = () => {
  centerDialogVisible.value = false
}
const handleSave = () => {
  emit('save')
}
defineExpose({
  closeDialog,
  openDialog
})
</script>
<style scoped lang="less">
.title {
  color: #1D2128;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}

.dialog-footer {
  button {
    width: 108px;
  }
  button:first-child {
    margin-right: 10px;
  }
}
</style>
