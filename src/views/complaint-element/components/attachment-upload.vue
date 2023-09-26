<template>
  <div class="attachment-upload">
    <el-upload
      :file-list="fileList"
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
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const fileList = reactive([
  { name: '1231321.ppt', status: 1, isClick: false },
  { name: '1231321.pdf', status: -1, isClick: false },
  { name: '1231321.png', status: -2, isClick: false },
  { name: '1231321.txt', status: 1, isClick: true }
])
const handleMouseEnter = (item) => {
  item.isClick = true
}
const handleMouseLeave = (item) => {
  item.isClick = false
}
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
const handleSuccess = (data, id) => {
  fileList.forEach((item) => {
    if (item.id === id) {
      item.key = data.key
      item.url = data.url
      item.status = 1
    }
  })
}
const uploadBpmn = (param) => {
  const formData = new FormData()
  formData.append('mf', param.file) // 传入bpmn文件
  // getFormGroups(formData)
  //   .then((res) => {
  //     if (res.data.success) {
  //       // param.onSuccess(res.data.data)
  //       this.handleSuccess(res.data.data, param.file.uid)
  //     } else {
  //       this.$message.error(res.data.msg)
  //       this.handleError(param.file.uid)
  //     }
  //   })
  //   .catch(() => {
  //     this.handleError(param.file.uid)
  //   })
}
const handleError = () => {}
</script>

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
    margin-top: 28px;
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
