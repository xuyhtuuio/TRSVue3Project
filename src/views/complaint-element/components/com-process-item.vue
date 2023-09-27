<script setup>
import { reactive } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import AttachmentUpload from './attachment-upload.vue'

import AudioParse from './audio-parse.vue'
const formModel = reactive({
  manage: '',
  org: ''
})
const rule = {
  message: [{ required: true, message: '请选择处理事项' }],
  org: [{ required: true, message: '请选择处理机构' }],
  record: [{ required: true, message: '请填写处理记录' }]
}
const manageOptions = [
  {
    value: 'zxc1',
    label: 'zxc12'
  },
  {
    value: 'zxc2',
    label: 'zxc1'
  },
  {
    value: 'zxc3',
    label: 'zxc2'
  },
  {
    value: 'zxc4',
    label: 'zxc3'
  }
]
const orgOptions = [
  {
    value: 'zxc1',
    label: 'zxc12'
  },
  {
    value: 'zxc2',
    label: 'zxc1'
  },
  {
    value: 'zxc3',
    label: 'zxc2'
  },
  {
    value: 'zxc4',
    label: 'zxc3'
  }
]

// 分析
const analyze = reactive({
  showAnalyze: false,
  file: {},
  fileName: '',
  fileSuffix: '',
  isdialog: true,
  content: ''
})
const handleAnalyze = () => {
  analyze.showAnalyze = true
}
const fileUploadHandler = (file) => {
  const [name, suffix] = file.file.name.split('.')
  analyze.fileName = name
  analyze.fileSuffix = suffix
  console.log(file)
  analyze.file = file
  setTimeout(() => {
    analyze.isdialog = false
    analyze.content =
      '您好，请问有什么可以帮到您的吗。我现在有些情况要投诉啊，你是负责投诉吗。是的，请问您是要投诉什么内容呢？我要投诉你们银行，存在暴力催收行为，现在已经严重影响到我和我家人的生活，如果你们不能尽快解决的话，我就去有关部门举报你们，非常抱歉给您带来了困扰，能先麻烦您告诉我，你是因为什么业务被催收的吗？我去年买房子，在你们家办贷款，但是现在因为疫情原因啊，我工作也没了，我没工资，我现在房价肯定也还不上了，我又不是不想还钱，就是现在没钱嘛，我也明白你们，你们银行会有一些相关的管理制度，但是你们制度包含了催收，我家里人吗，我家里人罢了，房贷的话不能印象我家里人吧，家里上有老下有小，老人年龄也大了，也有小孩，万一出了意外，你们负了责任吗，谁来负责，你告诉我谁来负责啊'
  }, 2000)
}
const { recordIndex } = defineProps({
  recordIndex: {
    typeof: String,
    required: true
  }
})
const emits = defineEmits(['deleteFormItem'])
const deleteFormItem = () => {
  emits('deleteFormItem', recordIndex)
}

// 音频
const addForm = reactive({
  path: ''
})
</script>
<template>
  <div class="com-process">
    <div class="title">
      <span class="text">处理事项</span>
      <span class="delete" @click="deleteFormItem" style="cursor: pointer">删除</span>
    </div>

    <el-form :model="formModel" class="form" :rules="rule">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="处理事项" prop="message">
            <el-select
              v-model="formModel.message"
              placeholder="请选择处理事项"
              :suffix-icon="CaretBottom"
              clearable
              size="large"
            >
              <el-option
                v-for="item in manageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处理机构" prop="org">
            <el-select
              v-model="formModel.org"
              placeholder="请选择处理机构"
              :suffix-icon="CaretBottom"
              clearable
              size="large"
            >
              <el-option
                v-for="item in orgOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
        <el-form-item label="处理记录" class="my-form-item-1" prop="record">
          <el-input
            v-model="formModel.record"
            :rows="4"
            type="textarea"
            placeholder="请输入处理记录"
          />
        </el-form-item>
      </el-col>
      <el-form-item label="沟通处理" class="my-form-item-1">
        <div class="content">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            :limit="1"
            :action="addForm.path"
            :http-request="fileUploadHandler"
            :multiple="false"
            :show-file-list="false"
          >
            <el-button plain><span class="iconfont icon-Vector1 icon"></span>上传附件</el-button>
          </el-upload>

          <template v-if="analyze.fileName">
            <span class="item"
              >{{ analyze.fileName }}<span class="suffix">.{{ analyze.fileSuffix }}</span></span
            >
            <span class="item" style="cursor: pointer" @click="handleAnalyze">智能语音分析</span>
          </template>
        </div>
      </el-form-item>
      <el-form-item label="沟通处理" class="my-form-item-1">
        <AttachmentUpload ref="ref-attachment-upload" />
      </el-form-item>
    </el-form>
  </div>

  <el-dialog v-model="analyze.showAnalyze" :modal="false" width="800" modal-class="my-dialog">
    <template #header> <div class="title">智能解析</div> </template>
    <div v-loading="analyze.isdialog">
      <AudioParse :file="analyze.file"></AudioParse>
      <div class="dialog-content">{{ analyze.content }}</div>
    </div>
  </el-dialog>
</template>

<style lang="less" scoped>
.com-process {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  background-color: #f7f8fa;
  font-size: 14px;
  .title {
    display: flex;
    justify-content: space-between;
    line-height: 22px;
    .text {
      color: #2d5cf6;
      &::before {
        display: inline-block;
        width: 8px;
        height: 10px;
        content: '';
        margin-right: 8px;
        background: url(/src/assets/image/arrow.png);
        /* background-position: right; */
        background-size: contain;
      }
    }
    .delete {
      color: #eb5757;
    }
  }

  .form {
    :deep(.el-input__wrapper) {
      background-color: #fff;
    }
    :deep(.el-textarea__inner) {
      box-shadow: 0 0 0 0;
      &:hover {
        box-shadow: 0 0 0 0;
      }
    }

    .my-form-item-1 {
      .content {
        display: flex;
        gap: 16px;
      }
      .item {
        &:first-child {
          color: #1d2128;
          .suffix {
            color: #505968;
          }
        }
        &:last-child {
          display: flex;
          align-items: center;
          color: #2d5cf6;
          &::before {
            content: '';
            display: inline-block;
            margin-right: 4px;
            width: 21px;
            height: 21px;
            background: url('@/assets/image/a.png');
            background-size: contain;
          }
        }
      }
      :deep(.el-form-item__content) {
        padding: 0;
      }
    }
  }
}

.my-dialog {
  .el-dialog__header {
    line-height: 24px;
    .title {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
  }
  .dialog-content {
    margin-top: 24px;
    padding: 16px;
    height: 200px;
    border-radius: 6px;
    background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);
    color: rgba(29, 33, 40, 1);
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
