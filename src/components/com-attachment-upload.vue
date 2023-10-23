<script setup>
import { reactive, watch } from 'vue'
import { upload, remove, download } from '@/api/file-upload'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
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

let fileList
watch(
  () => value,
  (val) => {
    fileList = reactive(JSON.parse(JSON.stringify(val)))
  },
  {
    immediate: true
  }
)
const emits = defineEmits(['update:value'])
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
  emits('update:value', fileList)
}
const handleMouseEnter = (item) => {
  item.isClick = true
}
const handleMouseLeave = (item) => {
  item.isClick = false
}

const handleSuccess = (data, id) => {
  const idx = fileList.findIndex((item) => item.id === id)
  fileList[idx] = { ...fileList[idx], key: data.key, url: data.url, status: 1 }
}
const uploadBpmn = (param) => {
  const formData = new FormData()
  formData.append('mf', param.file) // 传入bpmn文件
  upload(formData)
    .then((res) => {
      if (res.data.data) {
        handleSuccess(res.data.data, param.file.uid)
      } else {
        handleError(param.file.uid)
      }
    })
    .catch(() => {
      handleError(param.file.uid)
    })
}
const handleError = () => {}
const router = useRouter()
const handleUploadLook = (url) => {
  const routeUrl = router.resolve({
    name: 'showReview',
    query: {
      url
    }
  })
  window.open(routeUrl.href, '_blank')
}
const handleUploadDelete = (item, flag = true) => {
  if (flag) {
    remove({ key: item.key }).then((res) => {
      const idx = fileList.findIndex((iten) => iten.key === item.key)
      fileList.splice(idx, 1)
      ElMessage({ type: 'success', message: res.data.data })
    })
  } else {
    const idx = fileList.findIndex((iten) => iten.id === item.id)
    fileList.splice(idx, 1)
    ElMessage({ type: 'success', message: '删除成功' })
  }
}
const handleDownload = (key, fileName) => {
  download({ key }).then((res) => {
    const url = res.data.data
    const link = document.createElement('a')
    // 将链接地址url转成blob地址，
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        link.href = URL.createObjectURL(blob)
        // 下载文件的名称
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        //在资源下载完成后 清除 占用的缓存资源
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
        ElMessage.success('下载完成')
      })
  })
}
</script>

<script>
export default {
  name: 'ComAttachmentUpload'
}
</script>
<template>
  <div class="attachment-upload">
    <el-upload
      class="upload-demo"
      v-show="!isDisabled"
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
              <span class="center-text my-ellipsis">{{ item.name || item.fileName }}</span>
            </div>
            <div class="right">
              <div class="r-item progress" v-if="item.status === -1">上传中...</div>
              <div class="r-item progress" v-if="item.status === 1 && !item.isClick">上传完成</div>
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

    <div v-show="isDisabled" class="flex" v-if="fileList.length">
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
          <span class="center-text my-ellipsis">{{ item.name || item.fileName }}</span>
        </div>
        <div class="right">
          <div class="r-item success" v-if="item.status === 1 && item.isClick">
            <span class="s-item" @click="handleUploadLook(item.url)">预览</span>
            <span class="s-item" @click="handleDownload(item.key, item.name)">下载</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="color: #909399; font-size: 12px">暂无数据</div>
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
      &-text {
        flex: 1;
      }
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
