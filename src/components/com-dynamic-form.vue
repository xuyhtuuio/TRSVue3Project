<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
const props = defineProps({
  data: {
    typeof: Array,
    required: true
  },
  isShowUpload: {
    typeof: Boolean,
    default: false
  },
  isDisabled: {
    typeof: Boolean,
    default: false
  }
})
const formData = reactive({})
const rule = ref([]).value


const refForm = ref()
const isCheckRule = ref(false)
const changeData = (list) => {
  list.forEach((item, index) => {
    formData[`item_${index}`] = item.value
    rule[`item_${index}`] = getRules(item, item.name)
  })
}
const checkRule = () => {
  return new Promise((resolve, reject) => {
    refForm.value.validate((valid) => {
      if (valid) {
        resolve(formData)
      } else {
        isCheckRule.value = true
        reject()
        return false
      }
    })
  })
}
defineExpose({ checkRule , formData})
watch(
  () => props.data,
  (newVal) => changeData(newVal),
  {
    immediate: true,
    deep: true
  }
)

function getRules(data, name) {
  return rulesFn(data)[name]
}
function rulesFn(data) {
  return {
    TextInput: [
      { required: true, message: `请输入${data.title}` },
      {
        min: 1,
        max: data.props?.numberOfWords || 20,
        message: `长度在 1 到 ${data.props?.numberOfWords || 20} 个字符`
      }
    ],
    TextareaInput: [
      { required: true, message: `请输入${data.title}` },
      {
        min: 1,
        max: data.props.numberOfWords || 50,
        message: `长度在 1 到 ${data.props.numberOfWords || 50} 个字符`
      }
    ],
    SelectInput: [{ required: true, message: `请选择${data.title}`, trigger: 'change' }],
    MultipleSelect: [
      {
        type: 'array',
        required: true,
        message: `请至少选择一个${data.title}`,
        trigger: 'change'
      }
    ],
    MultipleGroupsSelect: [
      {
        type: 'array',
        required: true,
        message: `请至少选择一个${data.title}`,
        trigger: 'change'
      }
    ],
    TimePicker: [
      {
        type: 'date',
        required: true,
        message: '请选择日期',
        trigger: 'change'
      }
    ],
    Cascader: [
      {
        type: 'array',
        required: true,
        message: `请选择${data.title}`,
        trigger: 'change'
      }
    ],
    FileUpload: [
      {
        validator: (() => {
          return (rule, value, callback) => {
            // if (!value.length) {
            //   callback(new Error(`至少上传一个${title}才可提交`))
            // } else
            if (value.some((item) => item.status === -2)) {
              callback(
                new Error(
                  '您当前存在上传失败的材料，可能是文件名中包含特殊字符，请重新上传后再提交'
                )
              )
            } else if (value.some((item) => item.status === -1)) {
              callback(new Error('您当前存在正在上传的材料，请等待文件上传成功后再提交'))
            } else {
              callback()
            }
          }
        })(data.title),
        trigger: 'blur'
      }
    ]
  }
}

const formItemClCpt = computed(() => {
  return (item) => {
    const name = item.name
    const expanding = item.props.expanding
    switch (name) {
      case 'FileUpload':
        return ['el-form-item-f']
      case 'SelectInput':
        return expanding && ['my-form-item']
      case 'MultipleSelect':
        return ['el-form-item-f']
    }
  }
})
</script>
<script>
export default {
  name: 'ComDynamicForm'
}
</script>

<template>
  <el-form
    ref="refForm"
    :model="formData"
    :rules="rule"
    :disabled="props.isDisabled"
    label-width="100px"
    class="ruleForm my-form"
    :class="[props.isDisabled && 'my-is-disabled']"
  >
    <el-row :gutter="16">
      <el-col
        v-for="(item, index) in props.data"
        :key="index"
        :span="item.props.exclusiveRowOrNot || item.name === 'FileUpload' ? 24 : 8"
      >
        <el-form-item :class="formItemClCpt(item)" :label="item.title" :prop="`item_${index}`">
          <el-input
            v-if="item.name === 'TextInput'"
            :disabled="item.perm === 'R'"
            v-model="formData[`item_${index}`]"
            :placeholder="item.props.placeholder"
          ></el-input>

          <el-input
            v-else-if="item.name === 'TextareaInput'"
            :disabled="item.perm === 'R'"
            type="textarea"
            v-model="formData[`item_${index}`]"
            :placeholder="item.props.placeholder"
          ></el-input>

          <el-select
            v-else-if="item.name === 'SelectInput' && !item.props.expanding"
            :disabled="item.perm === 'R'"
            v-model="formData[`item_${index}`]"
            :placeholder="item.props.placeholder"
            :suffix-icon="CaretBottom"
            clearable
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
            v-model="formData[`item_${index}`]"
          >
            <el-radio v-for="(iten, indey) in item.props.options" :key="indey" :label="iten.id">{{
              iten.value
            }}</el-radio>
          </el-radio-group>

          <el-checkbox-group
            v-else-if="item.name === 'MultipleSelect' && item.props.expanding"
            v-model="formData[`item_${index}`]"
            :disabled="item.perm === 'R'"
          >
            <el-checkbox
              v-for="(iten, indey) in item.props.options"
              :key="indey"
              :label="iten.id"
            >{{iten.value}}</el-checkbox>
          </el-checkbox-group>

          <div class="groups-select" v-else-if="item.name === 'MultipleGroupsSelect'">
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
            v-else-if="item.name === 'MultipleSelect' && !item.props.expanding"
            :disabled="item.perm === 'R'"
            v-model="formData[`item_${index}`]"
            :placeholder="item.props.placeholder"
            multiple
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option
              v-for="(iten, indey) in item.props.options"
              :key="indey"
              :label="iten.value || iten.name"
              :value="iten.id"
            ></el-option>
          </el-select>

          <el-date-picker
            v-else-if="item.name === 'TimePicker'"
            :disabled="item.perm === 'R'"
            type="date"
            :placeholder="item.props.placeholder"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="formData[`item_${index}`]"
            style="width: 100%"
          ></el-date-picker>

          <!-- <el-cascader
            v-else-if="item.name === 'Cascader'"
            v-model="formData[`item_${index}`]"
            :options="item.props.childrens"
            :props="{
              label: 'value',
              value: 'id',
              checkStrictly: true,
              multiple: item.props.multiple
            }"
            clearable
          >
          </el-cascader> -->

          <template v-else-if="item.name === 'FileUpload'">
            <ComAttachmentUpload
              ref="ref-att-upload"
              v-model:value="formData[`item_${index}`]"
              :isDisabled="props.isDisabled"
            />
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<style lang="less" scoped></style>
