<template>
  <div class="reconciliation-point" v-if="list.length">
    <g-table-card :title="data.title">
      <!-- <template v-slot:cardInfo>
        <div class="cardInfo">
          <img class="img" src="@/assets/image/apply-center/focus.svg" alt="" />
          {{ cardInfo }}
        </div>
      </template> -->
      <template v-slot:content>
        <slot name="audio"></slot>
        <div v-if="showUpload" class="uploadMusic" style="margin-left: 32px">
          <label style="color:#606266;font-size: 14px; font-weight: 400;">沟通语音</label>
          <el-upload
            class="upload-demo"
            multiple
            v-model:file-list="fileListMusic"
            :on-change="handleChangeUpload"
          >
            <div class="upload-button">
              <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
              <div class="upload-content">上传语音</div>
            </div>
          </el-upload>

          <div class="upload-intro">建议上传mp3格式的文件</div>
        </div>
        <el-form
          hide-required-asterisk
          label-width="120px"
          class="ruleForm my-form"
          ref="complaintForm"
        >
          <div class="ruleForm-item" :class="formItemCpt(item)" v-for="(item, index) in list" :key="index">
            <el-form-item>
              <template #label>
                <label :style="item.title.includes('客户视角') ? 'line-height: 1.2em' : ''">
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
                v-model.trim="item.value"
              >
                <el-radio
                  v-for="(iten, indey) in item.props.options"
                  :key="indey"
                  :label="iten.id"
                  >{{ iten.value }}</el-radio
                >
              </el-radio-group>

              <el-checkbox-group
                v-else-if="
                  item.name === 'MultipleSelect' && item.props.expanding
                "
                v-model.trim="item.value"
                :disabled="item.perm === 'R'"
              >
                <div v-for="(iten, indey) in item.props.options" :key="indey">
                  <el-checkbox :label="iten.id">{{
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
                  type="date"
                  :placeholder="item.props.placeholder"
                  :value-format="item.props.format"
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
        <slot name="materials"></slot>
        <div v-if="showUpload" class="uploadMusic" style="margin-left: 32px; top: 12px;">
          <label style="color:#606266;font-size: 14px; font-weight: 400;">附件材料</label>
          <el-upload
            class="upload-demo"
            multiple
            action="/cwo/applicationForm/fileOcrPersonInfo"
            v-model:file-list="fileList"
            :http-request="uploadFileRequest">
            <div class="upload-button">
              <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
              <div class="upload-content">上传附件</div>
            </div>
          </el-upload>

          <div class="upload-intro">
            建议上传jpg/png/xls/txt/pptx/ppt/docx/doc/pdf等格式的文件，建议文件大小不超过200M
          </div>
        </div>
      </template>
    </g-table-card>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick } from 'vue'
import { getFileOcrPersonInfo } from '@/api/complaint-entry'
import { ElMessage } from 'element-plus'
import WarnInfo from './warn-info.vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  showUpload: {
    type: Boolean,
    default: true
  }
})

const data = reactive({
  flag: 9999,
  title: '投诉要素',
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
/**
 * 文件列表
 */
const fileListMusic = ref([])
const fileList = ref([])
const handleChangeUpload = async (uploadFile) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  if (!fileListMusic.value.find((item) => item.name === uploadFile.name)) {
    fileListMusic.value.push({
      name: uploadFile.name,
      url: uploadFile.url
    })
  }
}
const handleChangeUploadFile = async (uploadFile) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  if (!fileList.value.find((item) => item.name === uploadFile.name)) {
    fileList.value.push({
      name: uploadFile.name,
      url: uploadFile.url
    })
  }
}
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
      if (item.title === '下线时间' && item.value === '永久') {
        nextTick(() => {
          this.$refs.refDatePicker1[0].$el.classList.add('my-class' + item.props.order)
        })
        if (!item.lastProps) {
          item.lastProps = JSON.parse(JSON.stringify(item.props))
        }
        item.value === ''
        item.props.placeholder = '永久'
        item.props.isRoyalty = true
      }
    } else if (item.props.numberOfWords) {
      item.isWarning = false
      item.warnInfo = [rulesFn(item)[1]]
    }
  })
}
const complaintForm = ref(null)
function complaintValidate(callback) {
  complaintForm.value.validate((valid) => {
    return callback(valid)
  })
}
const refWarn = ref(null)
function getWarnRefs() {
  return refWarn.value
}
function handleTitle(title) {
  if (title.includes('客户视角')) {
    return `<span style="font-size: 14px">${title.slice(0, -6)}</span><br/><span style="font-size: 10px">${title.slice(-6)}</span>`
  }
  return title
}



const uploadFileRequest = (param) => {
  const formData = new FormData()
  formData.append('mf', param.file)
  getFileOcrPersonInfo(formData)
  .then((res) => {
    if (res.data.data) {
      console.log(res.data.data)
      handleChangeUploadFile()
      // this.handleAvatarSuccess(res.data.data, param.file.uid);
    } else {
      ElMessage.error(res.data.msg)
    }
  })
  .catch(() => {
    param.onError(param.file.uid);
  });
}
defineExpose({
  judgeWarn,
  complaintValidate,
  getWarnRefs
})
</script>

<style lang="less" scoped>
.reconciliation-point {
  .tableCard{
    padding: 16px 0;
    :deep(.head) {
      margin-bottom: 24px;
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
.uploadMusic {
  display: flex;
  align-items: start;
  font-weight: 500;
  font-size: 110%;
  position: relative;
  left: 20px;
}
.upload-button {
  background-color: #f0f6ff;
  width: 128px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #88abff;
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  color: #3c67f6;
}

.down-suggest {
  font-size: 90%;
  font-weight: 400;
}
.upload-intro {
  margin-left: 20px;
  color: #a2a9b5;
}
.el-checkbox-group {
  display: flex;
  .el-checkbox {
    margin-right: 12px;
  }
}
</style>
<style lang="less">
.my-date-picker {
  .el-picker-panel__footer {
    .el-button {
      &:first-child {
        display: none;
      }
    }
  }
}
</style>
