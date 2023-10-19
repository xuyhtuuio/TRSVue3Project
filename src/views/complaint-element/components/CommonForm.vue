<script setup>
import { ref, reactive, watch } from 'vue'
const formItemData = reactive({
  refForm: ref(),
  // isSubmit: false,
  isShow: true,
  isNext: false
})
const props = defineProps({
  data: {
    typeof: Object,
    default: () => {}
  }
})
watch(
  () => props.data,
  (val) => {
    initData(val)
  },
)
const initData = (data) => {
  Object.assign(formItemData, data)
}
const refForm = ref()
const CheckRule = () => {
  return new Promise((resolve) => {
    refForm.value.checkRule().then((res) => {
    resolve([res, formItemData.formModuleItemList, formItemData.userInfo])
  })
  })
}
const saveDeft = (callback) => {
  callback([...refForm.value.formData, formItemData.formModuleItemList, formItemData.userInfo])
}
defineExpose({
  initData,
  CheckRule,
  saveDeft
})
</script>
<template>
  <div class="common-form" v-if="Object.keys(formItemData).length > 3">
    <ComDynamicForm
      class="dynamic-form"
      :data="formItemData.formModuleItemList"
      :isShowUpload="true"
      :isDisabled="formItemData.editPermissions !== 'E'"
      ref="refForm"
    ></ComDynamicForm>
  </div>
</template>

<style lang="less" scoped>
.common-form {
  padding: 16px 24px;
}
</style>
