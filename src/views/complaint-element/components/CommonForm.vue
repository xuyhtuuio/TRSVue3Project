<script setup>
import { ref, reactive, watch } from 'vue'
import { agree } from '@/api/complaint-element'
const formItemData = reactive({
  refForm: ref(),
  // isSubmit: false,
  isShow: true,
  isNext: false
})
const formId1 = ref('')
const props = defineProps({
  data: {
    typeof: Object,
    default: () => {}
  },
  formId: {
    typeof: Object,
    default: () => {}
  }
})
watch(
  () => props.data,
  (val) => {
    console.log(val)
    initData(val)
  },
  { deep: true }
)
const initData = (data, id = formId1.value) => {
  Object.assign(formItemData, data)
  formId1.value = id
}
const refForm = ref()
const submitTrue = (formData, originData, userInfo) => {
  const approvalSubmissionDto = { formItemDataList: [], formId: formId1.value || '17' }
  Object.values(formData).forEach((item, index) => {
    const itemData = originData[index]
    approvalSubmissionDto.formItemDataList.push({
      formItemId: itemData.id,
      value: item,
      valueType: itemData.valueType
    })
  })
  const data = {
    approvalSubmissionDto,
    processInstanceId: '58bde15a-6ca0-11ee-8bf8-b26473adf234',
    taskId: '59b3d96f-6ca0-11ee-8bf8-b26473adf234',
    nodeId: 'node_845932503923',
    templateId: '1701419093933596672',
    currentUserInfo: {
      id: userInfo.id,
      name: userInfo.name
    }
  }
  agree(data).then((res) => {
    console.log(res)
  })
}
const CheckRule = () => {
  refForm.value.checkRule().then((res) => {
    console.log(res)
    submitTrue(res, formItemData.formModuleItemList, formItemData.userInfo)
  })
}
defineExpose({
  initData,
  CheckRule
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
