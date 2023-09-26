<script setup>
import { ref, reactive } from 'vue'
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
  file: {}
})
const handleAnalyze = () => {
  analyze.showAnalyze = true
}
const fileUploadHandler = (file) => {
  analyze.file = file
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
            v-model="addForm.path"
            :http-request="fileUploadHandler"
            :multiple="false"
            :show-file-list="false"
          >
            <el-button plain><span class="iconfont icon-Vector1"></span>上传附件</el-button>
          </el-upload>

          <span class="item">附件附件附件1<span class="suffix">.mp3</span></span>
          <span class="item" style="cursor: pointer" @click="handleAnalyze">智能语音分析</span>
        </div>
      </el-form-item>
      <el-form-item label="沟通处理" class="my-form-item-1">
        <AttachmentUpload ref="ref-attachment-upload" />
      </el-form-item>
    </el-form>
  </div>

  <el-dialog v-model="analyze.showAnalyze" :modal="false" width="800" modal-class="my-dialog">
    <template #header> <div class="title">基础信息</div> </template>
    <AudioParse :file="analyze.file"></AudioParse>
  </el-dialog>
</template>

<style lang="less" scoped>
.com-process {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
</style>
