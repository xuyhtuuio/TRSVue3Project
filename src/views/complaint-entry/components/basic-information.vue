<template>
  <div class="basic-information" v-if="list.length">
    <g-table-card :title="data.title">
      <!-- <template v-slot:cardInfo>
        <div class="cardInfo">
          <img class="img" src="@/assets/image/apply-center/focus.svg" alt="" />
          {{ cardInfo }}
        </div>
      </template> -->
      <template v-slot:content>
        <el-form
          hide-required-asterisk
          label-width="120px"
          class="ruleForm my-form"
          ref="basicForm"
        >
          <div class="ruleForm-item" :class="formItemCpt(item)" v-for="(item, index) in list" :key="index">
            <el-form-item>
              <template #label>
                <label>
                  <span
                    :style="{
                      color: 'red',
                      opacity: item.props.required ? 1 : 0
                    }">
                  *
                  </span>
                  <span v-html="handleTitle(item.title)"></span>
                </label>
              </template>

              <el-input
                v-if="item.name === 'TextInput'"
                :disabled="item.perm === 'R'"
                v-model.trim="item.value"
                :placeholder="item.props.placeholder"
              ></el-input>

              <el-select
                v-else-if="item.name === 'SelectInput' && !item.props.expanding"
                :disabled="item.perm === 'R'"
                v-model.trim="item.value"
                :placeholder="item.props.placeholder"
              >
                <el-option
                  v-for="(iten, indey) in item.props.options"
                  :key="indey"
                  :label="iten.value"
                  :value="iten.id"
                ></el-option>
              </el-select>

              <el-radio-group
                v-else-if="item.name === 'SelectInput' && item.props.expanding"
                :disabled="item.perm === 'R'"
                v-model="item.value"
              >
                <el-radio
                  v-for="(iten, indey) in item.props.options"
                  :key="indey"
                  :label="iten.value"
                  >{{ iten.value }}</el-radio
                >
              </el-radio-group>

              <el-checkbox-group
                v-else-if="
                  item.name === 'MultipleSelect' && item.props.expanding
                "
                v-model="item.value"
                :disabled="item.perm === 'R'"
              >
                <div v-for="(iten, indey) in item.props.options" :key="indey">
                  <el-checkbox :label="iten.value">{{
                    iten.value
                  }}</el-checkbox>
                </div>
              </el-checkbox-group>

              <div
                class="groups-select"
                v-else-if="item.name === 'MultipleGroupsSelect'"
              >
                <div v-for="iten in item.props.options" :key="iten.id">
                  <p class="group-title">{{ iten.value }}</p>
                  <el-checkbox-group
                    class="group-value"
                    v-model="item.value"
                    :disabled="item.perm === 'R'"
                  >
                    <el-checkbox
                      v-for="(itenItem, indey) in iten.children"
                      :key="indey"
                      :label="itenItem.id"
                      >{{ itenItem.value }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <el-select
                v-else-if="
                  item.name === 'MultipleSelect' && !item.props.expanding
                "
                :disabled="item.perm === 'R'"
                v-model.trim="item.value"
                :placeholder="item.props.placeholder"
                multiple
              >
                <el-option
                  v-for="(iten, indey) in item.props.options"
                  :key="indey"
                  :label="iten.value || iten.name"
                  :value="iten.id"
                ></el-option>
              </el-select>

              <template v-else-if="item.name === 'TimePicker'">
                <el-date-picker
                  :disabled="item.perm === 'R'"
                  type="datetime"
                  :placeholder="item.props.placeholder"
                  v-model.trim="item.value"
                  style="width: 100%"
                ></el-date-picker>
              </template>

              <el-input
                v-else-if="item.name === 'TextareaInput'"
                :disabled="item.perm === 'R'"
                type="textarea"
                v-model.trim="item.value"
                :placeholder="item.props.placeholder"
              ></el-input>

              <el-cascader
                v-else-if="item.name === 'Cascader'"
                v-model="item.value"
                :options="item.props.childrens"
                :props="{
                  label: 'value',
                  value: 'id',
                  checkStrictly: true,
                  multiple: item.props.multiple
                }"
                clearable
              >
              </el-cascader>

              <div class="warn" v-if="item.isWarning">
                <warn-info
                  ref="refWarn"
                  :info="judgementWarn(item)"
                ></warn-info>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </g-table-card>
  </div>
</template>

<script setup>
// eslint-disable-next-line
import * as dayjs from 'dayjs'
import { reactive, computed, watch, ref } from 'vue'
import WarnInfo from './warn-info.vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const data = reactive({
  flag: 9999,
  title: '客户基本信息',
  cardInfo: '提醒：产品类内容审查，需于在产品上线/宣传前14天进行提交。',
  checkBox: {},
  isAddPickerFoot: false,
  lastProps: {}
})
const formItemCpt = computed(() => {
  return (item) => {
    // const singleItem = ['SelectInput', 'MultipleGroupsSelect', 'MultipleSelect']
    if (item.name === 'TextareaInput') {
      return ['single-line']
    }
  }
})
watch(
  () => props.list,
  () => {
    initWarn()
  },
  { immediate: true }
)
function rulesFn(data) {
  switch (data.name) {
    case 'TextInput':
      return [
        { required: true, message: `请输入${data.title}` },
        {
          min: 3,
          max: data.props.numberOfWords,
          message: `长度在 1 到 ${data.props.numberOfWords} 个字符`
        }
      ]
    case 'TextareaInput':
      return [
        { required: true, message: `请输入${data.title}` },
        {
          min: 3,
          max: data.props.numberOfWords,
          message: `长度在 1 到 ${data.props.numberOfWords} 个字符`
        }
      ]
    case 'SelectInput':
      return [
        { required: true, message: `请选择${data.title}`, trigger: 'change' }
      ]
    case 'MultipleSelect':
      return [
        {
          type: 'array',
          required: true,
          message: `请至少选择一个${data.title}`,
          trigger: 'change'
        }
      ]
    case 'MultipleGroupsSelect':
      return [
        {
          type: 'array',
          required: true,
          message: `请至少选择一个${data.title}`,
          trigger: 'change'
        }
      ]
    case 'TimePicker':
      return [
        {
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }
      ]
    case 'Cascader':
      return [
        {
          type: 'array',
          required: true,
          message: `请选择${data.title}`,
          trigger: 'change'
        }
      ]
    default:
      return []
  }
}
// 判断警告出现
function judgementWarn(item) {
  let flag
  if (item.valueType === 'Date') {
    flag = item.value == null ? '' : String(item.value)
  } else {
    flag = item.value
  }
  if (item.title === '下线时间' && item.props.isRoyalty) {
    flag = '永久'
  }
  if (item.props.required) {
    if (!flag.length && typeof item.value !== 'number') {
      return item.warnInfo[0].message
    } else if (
      item.props.numberOfWords
      && item.value.length > item.props.numberOfWords
    ) {
      item.isWarning = true
      return item.warnInfo[1].message
    } else {
      item.isWarning = false
    }
  } else if (item.props.numberOfWords && item.value.length) {
    if (item.value.length > item.props.numberOfWords) {
      return item.warnInfo[0].message
    }
    item.isWarning = false
  } else {
    item.isWarning = false
  }
}
function judgeWarn() {
  const result = props.list.every((item) => {
    if (item.title === '下线时间' && item.props.required && !item.value && item.props.placeholder === '永久' && item.props.isRoyalty && item.lastProps) {
      return true
    } else if (item.props.required) {
      if (item.value == null) return false
      else if (item.props.numberOfWords && item.value.length !== 0) {
        return item.value.length < item.props.numberOfWords
      } else return item.value.length !== 0
    } else if (item.props.numberOfWords && item.value.length !== 0) {
      return false
    } else {
      return true
    }
  })
  if (!result) {
    props.list.forEach((item) => {
      if (item.props.required || item.props.numberOfWords) {
        item.isWarning = true
      }
    })
  }
  return result
}
function initWarn() {
  props.list.forEach((item) => {
    if (item.props.required) {
      item.isWarning = false
      item.warnInfo = rulesFn(item)
    } else if (item.props.numberOfWords) {
      item.isWarning = false
      item.warnInfo = [rulesFn(item)[1]]
    }
  })
}

// 其他输入框
// function checkRow(check, item) {
//   if (!check) {
//     data.checkBox[item.id] = ''
//   }
// }
// 判断时间
function handleDate(date = new Date(), formatText = 'YYYY-MM-DD') {
  return dayjs(date).format(formatText)
}
const basicForm = ref(null);
function basicFormValidate(callback) {
  console.log('valid', basicForm.value.validate)
  basicForm.value.validate((valid) => {
    console.log('vvv', valid)
    callback(valid)
  })
}
const refWarn = ref(null)
function getWarnRefs() {
  return refWarn.value
}
function handleTitle(title) {
  if (title.includes('客户视角')) {
    return `<span style="font-size: 12px">${title.slice(0, -6)}</span><span style="font-size: 10px">${title.slice(-6)}</span>`
  }
  return title
}
defineExpose({
  judgeWarn,
  basicFormValidate,
  getWarnRefs
})
</script>

<style lang="less" scoped>
.basic-information {
  .tableCard{
    padding: 16px 0;
    :deep(.head) {
      justify-content: flex-start;
    }
    :deep(.left) {
      font-size: 16px;
    }
  }
  .cardInfo {
    display: flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 20px;
    background: rgba(255, 252, 232, 1);
    color: rgba(250, 140, 22, 1);
    .img {
      margin-right: 8px;
    }
  }
  .ruleForm {
    padding: 16px 0 0;
    display: flex;
    flex-wrap: wrap;
    .ruleForm-item {
      width: 33%;
    }
    :deep(.el-form-item) {
      width: 100%;
      &__content {
        padding-left: 10px;
      }
    }
    .single-line {
      width: 100%;
    }
    .groups-select {
      .group-title {
        margin-top: 12px;
        line-height: 22px;
        color: #86909c;
      }
      .group-value {
        :deep(.el-checkbox) {
          min-width: 160px;
        }
      }
    }
    .checkbox-ipt {
      display: inline-block;
      width: auto;
      :deep(.el-input__inner) {
        width: 320px;
        height: 24px;
        padding-left: 10px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 6px;
        font-size: 12px;
      }
    }
  }

  .warn {
    margin-left: -16px;
    width: calc(100% + 16px);
    background: #fff;
    line-height: normal;
    font-size: 12px;
    color: rgba(235, 87, 87, 1);
  }

  :deep(.el-date-editor) {
    display: flex;
    input {
      flex: 1;
    }

    .el-input__suffix {
      right: 20px;
    }
  }
}

.my-class1 {
  :deep(.el-input__inner) {
    &::-webkit-input-placeholder{
      color: #606266;
    }
  }
}
.el-checkbox-group {
  display: flex;
  .el-checkbox {
    margin-right: 12px;
  }
}
</style>
