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
          <slot name="audioDetail">
            <el-upload
            class="upload-demo"
            :show-file-list="false"
            v-model:file-list="fileListMusic"
            :http-request="uploadAudioFileRequest"
          >
            <div class="upload-button">
              <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
              <div class="upload-content">上传语音</div>
            </div>
            <template #tip>
              <div class="el-upload__tip" v-if="fileListMusic.length">
                <span class="name">{{ fileListMusic[0].name }}</span>
                <span class="status">
                  <img v-if="musicStatus.startsWith('上传中')" src="@/assets/image/上传中.svg" alt="" style="width: 20px;"/>
                  <img v-else-if="musicStatus.startsWith('上传成功')" src="@/assets/image/解析中.svg" alt="" style="width: 20px;"/>
                  <img v-else-if="musicStatus.startsWith('智能解析')" src="@/assets/image/成功了.svg" alt="" style="width: 20px;"/>
                  {{ musicStatus }}
                </span>
                <span v-if="musicStatus.startsWith('智能解析')" class="name pointer" @click="previewAudioDialog">点击查看</span>
              </div>
            </template>
          </el-upload>
          <div class="upload-intro">建议上传mp3格式的文件</div>
          </slot>
        </div>
        <el-form
          hide-required-asterisk
          label-width="120px"
          class="ruleForm my-form"
          ref="complaintForm"
          :disabled="!isEdit"
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
                  :value="iten.value"
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
                  :label="iten.value"
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
                      :label="itenItem.value"
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
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option
                  v-for="(iten, indey) in item.props.options"
                  :key="indey"
                  :label="iten.value || iten.name"
                  :value="iten.value"
                ></el-option>
              </el-select>

              <template v-else-if="item.name === 'TimePicker'">
                <el-date-picker
                  :disabled="item.perm === 'R'"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm"
                  value-format="YYYY-MM-DD HH:mm"
                  :placeholder="item.props.placeholder"
                  :default-value="setCurrentTime(item)"
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
                  value: 'value',
                  checkStrictly: true,
                  multiple: item.props.multiple
                }"
                clearable
              >
              </el-cascader>
              <template v-else-if="item.name === 'FileUpload'">
                <div class="uploadMusic" style="top: 12px;">
                  <el-upload
                    class="upload-demo"
                    multiple
                    action="/cwo/applicationForm/fileOcrPersonInfo"
                    v-model:file-list="fileList"
                    :show-file-list="false"
                    :http-request="uploadFileRequest">
                    <div class="upload-button" style="margin-left: -15px;">
                      <el-icon class="upload-icon-style" size="20" style="top: 5px;"><upload-filled /></el-icon>
                      <div class="upload-content" style="font-size: 13px;">上传附件</div>
                    </div>
                  </el-upload>
                  <div class="upload-intro" style="left: 130px;">
                    建议上传jpg/png/xls/txt/pptx/ppt/docx/doc/pdf等格式的文件，建议文件大小不超过200M
                  </div>
                </div>
                <div class="upload-list">
                  <div
                    class="item"
                    v-for="(item, index) in fileList"
                    :key="index"
                    @mouseenter="handleMouseEnter(item)"
                    @mouseleave="handleMouseLeave(item)"
                  >
                    <div class="left">{{ `${index + 1}.` }}</div>
                    <div class="center">
                      <file-type
                        class="left-icon"
                        :fileName="item.name || item.fileName"
                      ></file-type>
                      {{ item.name || item.fileName }}
                    </div>
                    <div class="right">
                      <div class="r-item progress" v-if="item.status === -1">
                        上传中...
                      </div>
                      <div
                        class="r-item progress"
                        v-if="item.status === 1 && !item.isClick"
                      >
                        上传完成
                      </div>
                      <div
                        class="r-item error"
                        v-if="item.status === -2 && !item.isClick"
                      >
                        上传失败
                      </div>
                      <div
                        class="r-item success"
                        v-if="item.status === 1 && item.isClick"
                      >
                        <span class="s-item" @click="handleUploadLook(item.url)"
                          >预览</span
                        >
                        <span class="s-item" @click="handleUploadDelete(item)"
                          >删除</span
                        >
                      </div>
                      <div
                        class="r-item error"
                        v-if="item.status === -2 && item.isClick"
                      >
                        <span
                          class="s-item success"
                          @click="handleUploadDelete(item, false)"
                          >删除</span
                        >
                      </div>
                    </div>
                    <el-progress
                      class="my-progress"
                      v-if="item.status === -1"
                      :percentage="item.percentage"
                      :stroke-width="2"
                      :show-text="false"
                    ></el-progress>
                  </div>
                </div>
              </template>
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
      </template>
    </g-table-card>
  </div>
  <el-dialog
    v-model="status.isDialog"
    :modal="false"
    width="1000"
    class="my-dialog audio-dialog"
  >
    <template #header> <div class="title">智能解析</div> </template>
    <div v-loading="status.isLoading">
      <AudioParse :url="data.URL1" ref="refAudioParse"></AudioParse>
    </div>
    <div class="dialog-content-middle">
      <div class="left-area">
        <div class="add-title">
          <div class="front-icon">
            <img :src="lineIcon" alt="" />
          </div>
          <div class="title-content">解析文本</div>
        </div>
        <div class="parse-content trs-scroll">
          {{ status.content.voiceText }}
        </div>
      </div>
      <div class="right-area">
        <div class="add-title">
          <div class="front-icon">
            <img :src="lineIcon" alt="" />
          </div>
          <div class="title-content">要素提取</div>
        </div>

        <div class="complaint-summary">
          <div class="add-title" style="margin: 0px; margin-bottom: 5px">
            <div class="front-icon">
              <img :src="bluebook" alt="" style="width: 15px; height: 15px; margin-right: 10px" />
            </div>
            <div class="title-content" style="font-weight: 700; font-size: 12px; margin-top: 3px">
              投诉摘要
            </div>
          </div>
          {{ status.content.abstractStr }}
        </div>
        <div class="parse-intro">
          <div class="add-title" style="margin: 0px; margin-bottom: 5px">
            <div class="front-icon">
              <img :src="Union" alt="" style="width: 15px; height: 15px; margin-right: 10px" />
            </div>
            <div class="title-content" style="font-weight: 700; font-size: 12px; margin-top: 3px">
              信息提取
            </div>
          </div>
          <p>投诉原因（客户视角）：{{ status.content.reason?.join(';') || '-' }}</p>
          <p>投诉诉求（客户视角）：{{ status.content.appeal?.join(';') || '-' }}</p>
          <p>敏感信息：{{ status.content.sensitiveInformation?.join(';') || '-' }}</p>
          <p>业务大类：{{ status.content.bigType?.join(';') || '-' }}</p>
          <p>产品类型：{{ status.content.productType?.join(';') || '-' }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer-music">
        <el-button @click="status.isDialog = false" style="width: 88px; height: 34px"
          >取消</el-button
        >
        <el-button type="primary" @click="musicParseFill" style="width: 88px; height: 34px">
          智能填写
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick } from 'vue'
import { getMp3FileAnalysis, uploadFile, deleteFormGroups } from '@/api/complaint-entry'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import WarnInfo from './warn-info.vue'
import AudioParse from '@/views/complaint-element/components/audio-parse.vue'
const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href
import bluebook from '@/assets/image/bluebook.png'
import Union from '@/assets/image/Union.png'
import dayjs from 'dayjs'
import URL1 from '@/123.aac'
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  showUpload: {
    type: Boolean,
    default: true
  },
  isEdit: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['audioParse', 'setFileUploadValue'])
const router = useRouter()
const data = reactive({
  flag: 9999,
  title: '投诉要素',
  cardInfo: '提醒：产品类内容审查，需于在产品上线/宣传前14天进行提交。',
  checkBox: {},
  isAddPickerFoot: false,
  lastProps: {},
  URL1
})
const formItemCpt = computed(() => {
  return (item) => {
    // const singleItem = ['SelectInput', 'MultipleGroupsSelect', 'MultipleSelect']
    if (item.name === 'TextareaInput' || item.name === 'FileUpload') {
      return ['single-line', item.name]
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
function setCurrentTime(item) {
  const isCurrentTime = item.props.isCurrentTime
  if (isCurrentTime) {
    item.value = dayjs().format('YYYY-MM-DD HH:mm')
  }
}
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
  
}
const handleChangeUploadFile = async (uploadFile) => {
  console.log(fileList.value, uploadFile)
  const index = fileList.value.findIndex((item) => item.name === uploadFile.fileName)
  if (index !== -1) {
    fileList.value[index].status = 1
    fileList.value[index].url = uploadFile.url
    fileList.value[index].key = uploadFile.key
    fileList.value[index].name = uploadFile.fileName
    const indexFileUpload = props.list.findIndex(item => item.name === 'FileUpload')
    emit('setFileUploadValue', {
      index: indexFileUpload,
      value: getFileList()
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
    case 'FileUpload':
      return [
        {
          type: 'array',
          required: true,
          message: `请上传${data.title}`,
          trigger: ['change', 'blur']
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
  if (item.props.required) {
    if (!flag.length && typeof item.value !== 'number') {
      return item.warnInfo[0]?.message
    } else if (
      item.props.numberOfWords
      && item.value.length > item.props.numberOfWords
    ) {
      item.isWarning = true
      return item.warnInfo[1]?.message
    } else {
      item.isWarning = false
    }
  } else if (item.props.numberOfWords && item.value.length) {
    if (item.value.length > item.props.numberOfWords) {
      return item.warnInfo[0]?.message
    }
    item.isWarning = false
  } else {
    item.isWarning = false
  }
}
function judgeWarn() {
  const result = props.list.every((item) => {
    if (item.props.required) {
      if (item.value == null) return false
      else if (item.props.numberOfWords && item.value.length !== 0) {
        return item.value.length < item.props.numberOfWords
      } else return item.value.length !== 0
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

// 上传语音
const status = reactive({
  playing: false,
  isDialog: false,
  file: null,
  content: ''
})

const musicStatus = ref('')
const uploadAudioFileRequest = (param) => {
  const formData = new FormData()
  formData.append('mf', param.file)
  musicStatus.value = '上传中...'
  setTimeout(() => {
    musicStatus.value = '上传成功，智能解析中...'
    setTimeout(() => {
      musicStatus.value = '智能解析成功，'
      status.content = {
        abstractStr: '用户许瑞春投诉银行暴力催收，影响家庭生活。她称银行委托第三方公司上门催收，骚扰家人，导致孩子不敢上学，老人不敢出门。银行承诺下午五点前给予反馈，严肃处理此事。',
        appeal: [],
        bigType: null,
        productType: null,
        reason: ['客户对催收方式不满'],
        sensitiveInformation: ['特殊职业', '情绪过激', '过激行为', '特殊群体'],
        voiceText: '您好，请问，有什么可以帮到您的？码头？我现在有一些情况要投诉，你是负责投诉的吗？啊？是的，请问，您是要投诉什么内容呢？我要投诉你们，银行存在暴力催收行为，现在已经严重影响到了我和我家人的生活，如果你们不能尽快解决的话，我就去有关安部门举报你们。非常抱歉，给您带来了困扰，能先麻烦您，告诉我，您是因为什么？业务被催收的吗？我去年买房子，在你们家办贷款，但是现在因为易情人银，我工作也没了，我没工资，我现在房贷肯定也还不上了，我又不是不想还钱，就是现在没钱嘛，我也没卖你们，你们银行会有一些，像，挂了，管理制度，但是你们制度包含了催，是我家里人吗？我家里人办了房贷了嘛？不能影向我家里人吧？家里上有老，下有小，老人，年龄也大了，又有小孩，万一出了一百，你们负得了责任吗？谁来负责了？你告诉我，谁来负责。啊？这位女士，我十分理解您现在的心情。啊，您先不要激动，您现在方便告诉我一下？呃，您的姓名和联系方式吗？我这里也跟我们行里的系统去核实一下这个情况。许瑞春，许诺的，许，小瑞的，瑞，春天的春。联系方式的话，就是：这个手机号儿，你能看到吗？好的，徐女士，我这边是可以看到的，麻烦您稍等一下，我先核实一下您之前办理的一个右情况。你赶紧核实吧，你处理不了的话，就让你们领导处理。麻烦您稍等一下啊！真的，十分的抱歉，耽误了您宝贵的时间，还请您耐心地等待一下。我这里也需要一点时间，去查询一下相关信息。嗯。走。嗯。嗯。呃，徐女士，我这里核实了一下，您目前名下确实有一笔贷款，他现在是逾期了三个月，这样的情况，一般。个人客户呢？他出现逾期的话，我们现在是会委托第三方公司去进行一个相关的处理，能麻烦您再描述一下，他们到底是如何暴力税收的吗？你们天天上门，又踹没，又踢门，一直不停地打骚扰电话，我们老人、小孩都吓坏了，我不管你们到底是什么，第三方，我也不清楚，你们到底拿我家里人的联系方，怎么拿到我家里人联系方式、家庭地址的？这是不是属于信息泄露？你们天天上门，又骚扰，又打电话的，我家里人，天天过提心吊胆的生活，小孩，小孩不敢上学，老人，老人不敢出门，出了意外，你们负得了责任吗？你赶紧帮我处理一下，这个问题，你处理得了吗？处理不了的的话，就赶紧找你们领导，你们领导要是处理不了的话，我就去找媒体，曝光，你们家，银行，去法院，告你们违法，我还不信，就没人管得了你们了。徐女士，您先不要激动，我已经了解到您的诉求了，这边呢，我也会尽快去帮您核实一下，如果您说的这个情况属实，那我们一定是会去严肃处理的。您看，我在今天下午五点前，去给您一个反馈，这样的处理，可以吗？行，那你尽快解决、处理吧，要是再有类似的这种行为，咱们也别沟通了，直接就法院见吧。明白！明白，我们一定会严肃去对待这个事情的，并尽快给您反馈。那，除了这件事以外，您还有其他需要处理的业务吗？没了，你就把这个事处理好了，就行了。好的，徐女士，再次抱歉，给您带来的不便，您投资的内容，我会立刻处理，祝您生活愉快！'
      }
    }, 4000)
  }, 3000)
  // uploadFile(formData)
  // .then((res) => {
  //   if (res.data.data) {
  //     const uploadFile = res.data.data
  //     fileListMusic.value[0].url = uploadFile.url
  //     fileListMusic.value[0].key = uploadFile.key
  //     fileListMusic.value[0].name = uploadFile.fileName
  //     status.file = param
  //     musicStatus.value = '上传成功，智能解析中...'
  //     getMp3FileAnalysis(formData)
  //     .then((res) => {
  //       if (res.data.data) {
  //         status.content = res.data.data
  //         musicStatus.value = '智能解析成功，'
  //       } else {
  //         ElMessage.error(res.data.msg)
  //       }
  //     })
  //     .catch(() => {
  //       param.onError(param.file.uid);
  //     });
  //   } else {
  //     ElMessage.error(res.data.msg)
  //   }
  // })
}
// 查看语音解析弹框
const previewAudioDialog = () => {
  status.isDialog = true
}
function musicParseFill() {
  emit('audioParse', status.content)
  status.isDialog = false
}
// 上传附件
const uploadFileRequest = (param) => {
  const formData = new FormData()
  formData.append('mf', param.file)
  console.log(param)
  const index = fileList.value.findIndex((item) => item.name === param.file.name)
  let timer = null
  if (index !== -1) {
    fileList.value[index].status = -1
    timer = setInterval(() => {
      if (fileList.value[index].percentage < 99) {
        fileList.value[index].percentage++
      }
    }, 70)
  }
  uploadFile(formData)
  .then((res) => {
    if (res.data.data) {
      handleChangeUploadFile(res.data.data)
      fileList.value[index].percentage = 100
    } else {
      ElMessage.error(res.data.msg)
    }
    clearInterval(timer)
  })
  .catch(() => {
    clearInterval(timer)
    fileList.value[index].status = -2
    param.onError(param.file.uid);
  });
}
function handleMouseEnter(item) {
  item.isClick = true
}
function handleMouseLeave(item) {
  item.isClick = false
}
function handleUploadLook(url) {
  // const routeUrl = router.resolve({
  //   name: 'showReview',
  //   query: {
  //     url
  //   }
  // })
  window.open(url, '_blank')
}
// 删除图片
function handleUploadDelete(item, flag = true) {
  if (flag) {
    deleteFormGroups({ key: item.key }).then((res) => {
      const idx = fileList.value.findIndex((iten) => iten.key === item.key)
      fileList.value.splice(idx, 1)
      ElMessage({ type: 'success', message: res.data.data })
    })
  } else {
    const idx = fileList.value.findIndex((iten) => iten.id === item.id)
    fileList.value.splice(idx, 1)
    ElMessage({ type: 'success', message: '删除成功' })
  }
}
function getAudioFileList() {
  return fileListMusic.value.map(item => {
    console.log(item)
    return {
      fileName: item.name,
      key: item.key,
      url: item.url
    };
  })
}
function getFileList() {
  return fileList.value.map(item => {
    return {
      fileName: item.name,
      key: item.key,
      url: item.url
    };
  })
}
defineExpose({
  judgeWarn,
  complaintValidate,
  getWarnRefs,
  getFileList,
  getAudioFileList
})
</script>

<style lang="less" scoped>
.reconciliation-point {
  .my-form .ruleForm-item:not(.FileUpload) :deep(.el-form-item__content) {
    border-radius: 4px;
    background-color: #f7f8fa;
  }
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
:deep(.el-input.is-disabled .el-input__wrapper) {
  box-shadow: none !important;
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
.el-upload__tip {
  .name {
    margin-right: 10px;
    color: #3c67f6;
  }
  .status {
    color: #86909C;
  }
}
.down-suggest {
  font-size: 90%;
  font-weight: 400;
}
.upload-intro {
  position: absolute;
  left: 230px;
  width: 545px;
  font-size: 12px;
  color: #a2a9b5;
}
.el-checkbox-group {
  display: flex;
  .el-checkbox {
    margin-right: 12px;
  }
}
.upload-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 14px;
  .item {
    position: relative;
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
    .my-progress {
      position: absolute;
      bottom: 0;
      left: 12px;
      right: 12px;
    }
  }
}
.my-dialog {
  :deep(.el-dialog__body) {
    padding: 30px 60px !important;
  }
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

  .dialog-content-middle {
    height: 405px;
    display: flex;

    .left-area {
      margin-right: 20px;
      .parse-content {
        margin-top: 20px;
        background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);
        height: 347px;
        width: 428px;
        overflow-y: scroll;
        padding: 15px;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
      }
    }

    .right-area {
      .complaint-summary {
        padding: 15px;
        width: 428px;
        height: 170px;
        background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }

      .parse-intro {
        padding: 15px;
        width: 428px;
        height: 170px;
        background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);

        p {
          line-height: 22px;
          text-align: left;
        }
      }
    }
  }
}
.add-title {
  display: flex;
  margin: 20px 0 20px 0;
  align-content: center;
  flex-wrap: wrap;
}

.front-icon img {
  width: 20px;
  height: 20px;
}

.title-content {
  text-align: center;
  font-weight: 900;
  font-size: medium;
}
.dialog-footer-music {
  position: relative;
  bottom: -60px;
  right: 380px;
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
.audio-dialog {
  .el-dialog__body {
    padding: 30px 60px !important;
  }
}
</style>
