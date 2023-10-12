<script setup>
import { reactive, watch } from 'vue'

const { isDisabled, value } = defineProps({
  isDisabled: {
    typeof: Boolean,
    default: false
  },
  value: {
    typeof: Array,
    required: true
  }
})

let fileList = reactive([])
watch(
  () => value,
  (val) => {
    fileList = val
  },
  {
    immediate: true
  }
)
const handleBefore = (file) => {
  // 上传文件之前钩子
  const type = file.name.replace(/.+\./, '')
  fileList.push({
    name: file.name,
    id: file.uid,
    status: -1,
    isClick: false,
    type
  })
}
const handleMouseEnter = (item) => {
  item.isClick = true
}
const handleMouseLeave = (item) => {
  item.isClick = false
}

const emits = defineEmits(['update:value1'])
const handleSuccess = (data, id) => {
  const item = fileList.find((item) => item.id === id)
  item.key = data.key
  item.url = data.url
  item.status = 1
  emits('update:value1')
}
const uploadBpmn = (param) => {
  const formData = new FormData()
  formData.append('mf', param.file) // 传入bpmn文件
  handleSuccess(param.file, param.file.uid)
}
const handleError = () => {}
</script>

<script>
export default {
  name: 'ComAttachmentUpload'
}
</script>
<template>
  <div class="attachment-upload">
    <template v-if="!isDisabled">
      <el-upload
        class="upload-demo"
        action=""
        multiple
        :http-request="uploadBpmn"
        :on-success="handleSuccess"
        :before-upload="handleBefore"
        :on-error="handleError"
        :show-file-list="false"
      >
        <el-button plain><span class="iconfont icon-Vector1"></span>上传附件</el-button>
        <span class="tips"
          >建议上传jpeg/jpg/png/pdf/doc/docx/xls/xlsx/ppt/pptx/txt/等格式的文件，大小不超过200M</span
        >
        <template #tip>
          <div class="content upload-list">
            <div
              class="item"
              v-for="(item, index) in fileList"
              :key="index"
              @mouseenter="handleMouseEnter(item)"
              @mouseleave="handleMouseLeave(item)"
            >
              <div class="left">{{ `${index + 1}.` }}</div>
              <div class="center">
                <file-type class="left-icon" :fileName="item.name || item.fileName"></file-type>
                {{ item.name || item.fileName }}
              </div>
              <div class="right">
                <div class="r-item progress" v-if="item.status === -1">上传中...</div>
                <div class="r-item progress" v-if="item.status === 1 && !item.isClick">
                  上传完成
                </div>
                <div class="r-item error" v-if="item.status === -2 && !item.isClick">上传失败</div>
                <div class="r-item success" v-if="item.status === 1 && item.isClick">
                  <span class="s-item" @click="handleUploadLook(item.url)">预览</span>
                  <span class="s-item" @click="handleUploadDelete(item)">删除</span>
                </div>
                <div class="r-item error" v-if="item.status === -2 && item.isClick">
                  <span class="s-item success" @click="handleUploadDelete(item, false)">删除</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-upload>
    </template>

    <div v-else class="flex">
      <div
        class="item"
        v-for="(item, index) in fileList"
        :key="index"
        @mouseenter="handleMouseEnter(item)"
        @mouseleave="handleMouseLeave(item)"
      >
        <div class="left">{{ `${index + 1}.` }}</div>
        <div class="center">
          <file-type class="left-icon" :fileName="item.name || item.fileName"></file-type>
          {{ item.name || item.fileName }}
        </div>
        <div class="right">
          <div class="r-item success" v-if="item.status === 1 && item.isClick">
            <span class="s-item" @click="handleUploadLook(item.url)">预览</span>
            <span class="s-item" @click="handleUploadDelete(item)">下载</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.attachment-upload {
  width: 100%;
  .upload-demo {
    width: 100%;
    .tips {
      margin-left: 16px;
      color: #86909c;
    }
  }

  .content {
    margin-top: 16px;
  }
  .upload-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 48%;
    max-width: 48%;
    height: 38px;
    padding: 0 12px;
    border-radius: 4px;
    border-bottom: 1px dotted rgba(229, 230, 235, 1);
    &:hover {
      background: rgba(247, 248, 250, 1);
      border-bottom: 1px dotted transparent;
    }
    &:nth-child(2n-1) {
      margin-right: 24px;
    }
    .center {
      flex: 1;
      display: flex;
      align-items: center;
      .left-icon {
        margin: 0 10px;
      }
    }
    .right {
      .r-item {
        display: flex;
      }
      .progress {
        color: rgba(134, 144, 156, 1);
      }
      .error {
        color: rgba(247, 101, 96, 1);
      }
      .success {
        color: rgba(45, 92, 246, 1);
      }
      .s-item {
        cursor: pointer;
        &:first-child {
          margin-right: 10px;
        }
      }
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
