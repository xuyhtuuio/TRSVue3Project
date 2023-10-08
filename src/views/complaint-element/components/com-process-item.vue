<script setup>
import { ref, reactive, nextTick } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import AttachmentUpload from './attachment-upload.vue'

import AudioParse from './audio-parse.vue'
const formModel = reactive({
  org: ''
})
const rule = {
  message: [{ required: true, message: '请选择处理事项' }],
  org: [{ required: true, message: '请选择处理机构' }],
  record: [{ required: true, message: '请填写处理记录' }]
}

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
    analyze.content = `<div>
        <div style="text-indent: 2em">您好，请问有什么可以帮到您的吗。我现在有些情况要投诉啊，你是负责投诉吗。是的，请问您是要投诉什么内容呢？我要投诉你们银行，存在暴力催收行为，现在已经严重影响到我和我家人的生活，如果你们不能尽快解决的话，我就去有关部门举报你们。非常抱歉给您带来了困扰，能先麻烦您告诉我，你是因为什么业务被催收的吗。我去年买房子，在你们家办贷款，但是现在因为疫情原因啊，我工作也没了，我没工资，我现在房价肯定也还不上了，我又不是不想还钱，就是现在没钱买我也明白，你们，你们银行会有一些相关的管理制度，但是你们制度包含了催收，我家里人吗，我家里人罢了，房贷的话不能印象我家里人吧，家里上有老下有小，老人年龄也大了，也有小孩，万一出了意外，你们负了责任吗，谁来负责，你告诉我谁来负责啊。这位女士我十分理解您现在的心情啊，您先不要激动，你现在方便告诉我一下您的姓名和联系方式吗，我这里也跟我们行里的系统去核实一下这个情况。徐瑞春，许诺的许小瑞瑞春天的春，联系方式的话就是这个手机号，你能看到吧。嗯好的，徐女士，我这边是可以看到的，麻烦您稍等一下，我先核实一下，您之前办理的一个又情况。你赶紧核实吧，你处理不了的话，就让你领导处理啊，真的十分的抱歉，耽误了您宝贵的时间，还请您耐心的等待一下，我这里也需要一点时间，去查询一下相关信息。</div>
        <div style="text-indent: 2em">嗯徐女士我这里核实了一下，您目前名下是有一笔贷款，他现在是逾期了三个月，这样的情况，一般个人客户呢他出现逾期的话，我们现在是会委托第三方公司去进行一个相关的处理，能麻烦您再描述一下他们到底是如何暴力催收的吗。你们天天上门，又踹门有踢门，一直不停地打骚扰电话，我们老人小孩都吓坏了，我不管你们到底是什么，第三方我也不清楚你们到底拿我家里人的联系方式，怎么拿到我家里人联系方式，家庭地址，的这是不是属于信息泄露啊，你们天天上门又骚扰又打电话了，我家里人天天过得提心吊胆的生活，小孩小孩不敢上学了，让老人不敢出门出了，意外你们负了责任吗，你赶紧帮我处理一下这个问题，你处理了吗，处理不了的话，就赶紧找找领导，你们领导要是处理不了的话，我就去找媒体曝光你们家银行，去法院告你们违法，我还不信就没人管得了你们了啊。徐女士，您先不要激动，我已经了解到您的诉求了这边呢，我也会尽快去帮您核实一下，如果说到这个情况，属实那我们一定是会去严肃处理的，您看我在今天下午5点前去给您一个反馈这样的处理可以吗，行，那你尽快解决处理吧，要是再有类似这种行为咱们也别沟通了直接就法院见吧。明白明白我们一定会严肃去对待这个事情的并尽快给您反馈那除了这件事以外您还有其他需要处理的业务吗。没啦你就把这个事处理好了就行了</div>
        <div style="text-indent: 2em">好的去女士，再次抱歉您带来的不便您投诉的内容我会立刻处理祝您生活愉快</div>
        <span>`
  }, 2000)
}
const { recordIndex, uuid } = defineProps({
  recordIndex: {
    typeof: String,
    required: true
  },
  disabled: {
    typeof: Boolean,
    default: false
  },
  uuid: {
    typeof: String,
    required: true
  }
})
const emits = defineEmits(['deleteFormItem'])
const deleteFormItem = () => {
  emits('deleteFormItem', recordIndex)
}
const fileList = reactive([])
// 音频
const addForm = reactive({
  path: ''
})
const originOptions = {
  message: ['首次响应', '调查核实', '回复客户'],
  org: [
    '总行',
    '信用卡中心',
    '北京管理部',
    '广州分行',
    '上海分行',
    '深圳分行',
    '武汉分行',
    '太原分行',
    '大连分行',
    '杭州分行',
    '南京分行',
    '重庆分行',
    '西安分行',
    '福州分行',
    '济南分行'
  ]
}
const refForm = ref()
const checkRule = async () => {
  await nextTick()
  return new Promise((resolve, reject) => {
    refForm.value.validate((valid) => {
      if (valid) {
        resolve(formModel)
      } else {
        reject()
        return false
      }
    })
  })
}
defineExpose({
  uuid,
  checkRule
})
const refAudioParse = ref()
const handleBeforeClose = (done) => {
  const { handleClose } = refAudioParse.value
  handleClose()
  done()
}
</script>
<template>
  <div class="com-process">
    <div class="title">
      <span class="text">处理事项</span>
      <span class="line"></span>
      <span class="delete" @click="deleteFormItem" style="cursor: pointer">删除</span>
    </div>

    <el-form :model="formModel" class="form" :rules="rule" ref="refForm" :disabled="disabled">
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
                v-for="item in originOptions.message"
                :key="item"
                :label="item"
                :value="item"
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
                v-for="item in originOptions.org"
                :key="item"
                :label="item"
                :value="item"
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

  <el-dialog
    v-model="analyze.showAnalyze"
    :modal="false"
    width="800"
    modal-class="my-dialog"
    :before-close="handleBeforeClose"
  >
    <template #header> <div class="title">智能解析</div> </template>
    <div v-loading="analyze.isdialog">
      <AudioParse :file="analyze.file" ref="refAudioParse"></AudioParse>
      <div class="dialog-content"><span v-html="analyze.content"></span></div>
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
    gap: 8px;
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
    .line {
      flex: 1;
      position: relative;
      top: 10px;
      height: 0px;
      border-top: 1px dotted #e5e6eb;
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
