<script setup>
import { ref, reactive, nextTick } from 'vue'
import ComProcessItem from './com-process-item.vue'
const formInline = reactive({
  repeat: '',
  manage: []
})
const rule = {
  reason: {
    required: true,
    message: '请选择投诉原因',
    trigger: 'change'
  },
  appeal: {
    required: true,
    message: '请选择投诉诉求',
    trigger: 'change'
  },
  manage: {
    required: true,
    message: '请选择投诉监管',
    trigger: 'change'
  }
}
let formList = reactive([
  {
    uuid: +new Date(),
    disabled: false
  }
])

const deleteFormItem = (uuid) => {
  if (uuid === formList[0].uuid) return
  formList = formList.filter((item) => item.uuid !== uuid)
}

let refForms = []
const handleAddFromItem = () => {
  refForms = []
  formList.push({
    uuid: +new Date(),
    disabled: false
  })
}
const setRefForms = (el) => {
  refForms.push(el)
}
const isDisabled = ref(false)

const CheckRule = () => {
  return new Promise((resolve) => {
    const rules = []
    refForms.forEach((item) => {
      rules.push(item.checkRule())
    })
    Promise.all(rules)
      .then((res) => {
        formList.forEach((item) => {
          item.disabled = true
          item.res = res
        })
        isDisabled.value = true
        resolve(formList)
      })
      .catch((err) => [console.log(err)])
  })
}
defineExpose({ CheckRule })
</script>

<template>
  <div class="communication-processing">
    <el-form
      :model="formInline"
      class="item"
      :rules="rule"
      :label-width="100"
      :disabled="isDisabled"
    >
      <el-form-item label="重复投诉">
        <el-radio-group v-model="formInline.repeat" class="ml-4">
          <el-radio label="1" size="large">是</el-radio>
          <el-radio label="2" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="非本人投诉">
        <el-radio-group v-model="formInline.noOne" class="ml-4">
          <el-radio label="1" size="large">是</el-radio>
          <el-radio label="2" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="律师陪同">
        <el-radio-group v-model="formInline.lawyer" class="ml-4">
          <el-radio label="1" size="large">是</el-radio>
          <el-radio label="2" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <ComProcessItem
      v-for="item in formList"
      :key="item"
      :recordIndex="item.uuid"
      :disabled="item.disabled"
      :ref="setRefForms"
      @deleteFormItem="deleteFormItem"
    ></ComProcessItem>

    <el-button class="my-button" type="primary" :disabled="isDisabled" @click="handleAddFromItem"
      >新增投诉处理</el-button
    >
  </div>
</template>

<style lang="less" scoped>
.communication-processing {
  padding: 0 24px;
  .item {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;

    &.item-one {
      .el-form-item {
        &:first-child {
          :deep(.el-form-item__content) {
            background-color: #fff;
          }
        }

        &:nth-child(-n + 2) {
          align-items: flex-start;
        }

        width: 100%;

        &.half {
          width: 400px;
        }

        .tips {
          margin-left: 16px;
          color: #86909c;
        }

        .content {
          margin-top: 16px;
        }

        .record-content {
          padding: 8px 16px;
          line-height: 22px;
        }
      }
    }

    .el-form-item {
      align-items: center;
      width: calc(calc(100% - 64px) / 3);
      margin: 0;
      :deep(.el-radio) {
        height: 34px;
      }
      :deep(.el-form-item__content) {
        background-color: #f7f8fa;
        border-radius: 4px;
        padding-left: 16px;
      }

      &.double {
        :deep(.el-form-item__label) {
          display: flex;
          flex-direction: column;
          line-height: 16px;
          align-items: flex-end;

          .label-item {
            &:last-child {
              font-size: 20px;
              transform: scale(50%);
              transform-origin: right center;
            }
          }
        }

        &.is-required {
          :deep(.el-form-item__label) {
            &::before {
              content: '';
            }

            .label-item {
              &:first-child {
                &::before {
                  content: '*';
                  color: var(--el-color-danger);
                  margin-right: 4px;
                }
              }
            }
          }
        }
      }
    }
  }

  .my-button {
    margin-top: 16px;
    font-weight: normal;
    &::before {
      content: '+';
      position: relative;
      top: -1px;
      display: inline-block;
      font-size: 20px;
      margin-right: 8px;
    }
  }
}
:deep(.el-form-item__content) {
  padding-left: 16px;

  .el-select {
    width: 100%;
  }

  .el-input__wrapper {
    box-shadow: none;
    background-color: #f7f8fa;

    &.is-active {
      box-shadow: none;
    }
  }

  .el-input__inner {
    height: 34px;
  }

  .el-select {
    margin-left: -16px;
    width: calc(100% + 16px);

    &:hover {
      .el-input__wrapper {
        box-shadow: none;
      }
    }

    // .el-input.is-focus {
    //   .el-input__wrapper.is-focus {
    //     box-shadow: none !important;
    //   }
    // }
  }
}
:deep(.el-button) {
  &.is-plain {
    color: #2d5cf6;
    border-color: #80a6ff;
    background-color: #f0f6ff;
    border-radius: 6px;
    outline: 0;

    .icon {
      margin-right: 10px;
    }
  }
}

.iconfont {
  position: relative;
  top: -1px;
  &::before {
    font-size: 12px;
    margin-right: 8px;
  }
}
</style>
