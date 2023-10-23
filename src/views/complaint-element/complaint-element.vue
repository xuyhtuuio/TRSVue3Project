<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import BasicInfo from './components/basic-info.vue'
import ComplaintHandling from './components/complaint-handling.vue'
import SystemRecommendationStrategy from './components/system-recommendation-strategy.vue'
import ReconciliationPoint from '@/views/complaint-entry/components/reconciliation-point.vue'
import AudioParse from './components/audio-parse.vue'
import { getApplyForm } from '@/api/complaint-element'
import WaveSurfer from 'wavesurfer.js'
import { useRoute } from 'vue-router'
import URL1 from '@/123.aac'
import bluebook from '@/assets/image/bluebook.png'
import Union from '@/assets/image/Union.png'
const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href
const route = useRoute()
const {
  orderNo,
  complaintSource,
  complaintTime,
  entryPersonName,
  formManagementId,
  recordId,
  templateId,
  nodeId,
  taskId,
  processInstanceId,
  processDefinitionId
} = route.query
const requestData = {
  templateId,
  nodeId,
  taskId,
  processInstanceId,
  formId: recordId,
  processDefinitionId
}
console.log(templateId, nodeId, taskId, processInstanceId, route.query)
let basicInfo = ref([])
let handleTree = ref([])
let handleTreeId = ref(0)
let handleTreeCreateTime = ref('')
let ComplaintDetailsData = ref([])
onMounted(() => {
  getApplyForm({
    formCategoryId: formManagementId,
    formId: recordId,
    nodeId
  }).then(({ data: res }) => {
    if (res.success) {
      const { formModuleVoList, verifyThroughInvestigationList } = res.data
      const { formModuleItemList: basicInfoList } = formModuleVoList.find(
        (item) => item.module === '客户基本信息'
      )
      basicInfo.value = basicInfoList
      const { formModuleItemList: ComplaintDetailsList } = formModuleVoList.find(
        (item) => item.module === '投诉要素'
      )
      ComplaintDetailsData.value = ComplaintDetailsList
      if (formModuleVoList.length > 2) {
        const data = formModuleVoList.slice(2)
        data.splice(1, 0, verifyThroughInvestigationList)
        handleTree.value = data
        handleTreeId.value = recordId
        handleTreeCreateTime.value = complaintTime
      }
    }
  })
})
const router = useRouter()
const handleReturn = () => {
  router.go(-1)
}
const isSysShow = ref(false)
const changeShow = (flag) => {
  isSysShow.value = flag
}

const waveform_Ref = ref()
const wavesurfer = ref()
const status = ref({
  playing: false,
  isDialog: false,
  file: null,
  url: URL1,
  content: {
    reason: ['因债务催收方式和手段引起的投诉'],
    appeal: ['停止骚扰'],
    sensitiveInformation: ['情绪激动', '舆情类', '司法类', '监管类'],
    voiceText:
      '您好，请问，有什么可以帮到您的？码头？我现在有一些情况要投诉，你是负责投诉的吗？啊？是的，请问，您是要投诉什么内容呢？我要投诉你们，银行存在暴力催收行为，现在已经严重影响到了我和我家人的生活，如果你们不能尽快解决的话，我就去有关安部门举报你们。非常抱歉，给您带来了困扰，能先麻烦您，告诉我，您是因为什么？业务被催收的吗？我去年买房子，在你们家办贷款，但是现在因为易情人银，我工作也没了，我没工资，我现在房贷肯定也还不上了，我又不是不想还钱，就是现在没钱嘛，我也没卖你们，你们银行会有一些，像，挂了，管理制度，但是你们制度包含了催，是我家里人吗？我家里人办了房贷了嘛？不能影向我家里人吧？家里上有老，下有小，老人，年龄也大了，又有小孩，万一出了一百，你们负得了责任吗？谁来负责了？你告诉我，谁来负责。啊？这位女士，我十分理解您现在的心情。啊，您先不要激动，您现在方便告诉我一下？呃，您的姓名和联系方式吗？我这里也跟我们行里的系统去核实一下这个情况。许瑞春，许诺的，许，小瑞的，瑞，春天的春。联系方式的话，就是：这个手机号儿，你能看到吗？好的，徐女士，我这边是可以看到的，麻烦您稍等一下，我先核实一下您之前办理的一个右情况。你赶紧核实吧，你处理不了的话，就让你们领导处理。麻烦您稍等一下啊！真的，十分的抱歉，耽误了您宝贵的时间，还请您耐心地等待一下。我这里也需要一点时间，去查询一下相关信息。嗯。走。嗯。嗯。呃，徐女士，我这里核实了一下，您目前名下确实有一笔贷款，他现在是逾期了三个月，这样的情况，一般。个人客户呢？他出现逾期的话，我们现在是会委托第三方公司去进行一个相关的处理，能麻烦您再描述一下，他们到底是如何暴力税收的吗？你们天天上门，又踹没，又踢门，一直不停地打骚扰电话，我们老人、小孩都吓坏了，我不管你们到底是什么，第三方，我也不清楚，你们到底拿我家里人的联系方，怎么拿到我家里人联系方式、家庭地址的？这是不是属于信息泄露？你们天天上门，又骚扰，又打电话的，我家里人，天天过提心吊胆的生活，小孩，小孩不敢上学，老人，老人不敢出门，出了意外，你们负得了责任吗？你赶紧帮我处理一下，这个问题，你处理得了吗？处理不了的的话，就赶紧找你们领导，你们领导要是处理不了的话，我就去找媒体，曝光，你们家，银行，去法院，告你们违法，我还不信，就没人管得了你们了。徐女士，您先不要激动，我已经了解到您的诉求了，这边呢，我也会尽快去帮您核实一下，如果您说的这个情况属实，那我们一定是会去严肃处理的。您看，我在今天下午五点前，去给您一个反馈，这样的处理，可以吗？行，那你尽快解决、处理吧，要是再有类似的这种行为，咱们也别沟通了，直接就法院见吧。明白！明白，我们一定会严肃去对待这个事情的，并尽快给您反馈。那，除了这件事以外，您还有其他需要处理的业务吗？没了，你就把这个事处理好了，就行了。好的，徐女士，再次抱歉，给您带来的不便，您投资的内容，我会立刻处理，祝您生活愉快！',
    abstractStr:
      '客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体或寻求法律途径。',
    bigType: ['贷款'],
    productType: ['个人住房贷款业务']
  },
  isLoading: true
}).value
const pointLoading = ref(true)
watch(
  () => waveform_Ref.value,
  () => {
    initAudio()
  }
)
async function initAudio() {
  parsingAudio(() => {
    pointLoading.value = false
  })
}

async function parsingAudio(callback) {
  const oldOptions = {
    // 波形图的容器
    container: waveform_Ref.value,
    // 已播放波形的颜色
    // progressColor: "red",
    // 未播放波形的颜色
    // waveColor: "lightgrey",
    // 波形图的高度，单位为px
    height: 40,
    with: 640,
    // barHeight: 20,
    barWidth: 1.5,
    // 波形条间的间距
    barGap: 1,
    progressColor: '#6D73FF',
    waveColor: '#6D73FF',
    // 播放进度光标条的颜色
    cursorColor: '#2D5CF6',
    // 播放进度光标条的宽度，默认为1
    cursorWidth: 2,
    normalize: false,
    // 播放进度颜色
    // progressColor: "blue",
    //  波形容器的背景颜色
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    // 音频的播放速度
    audioRate: '1',
    mediaControls: false,
    backend: 'MediaElement'
    // （与区域插件一起使用）启用所选区域的循环
    // loopSelection:false
  }
  wavesurfer.value = WaveSurfer.create(oldOptions)
  wavesurfer.value.load(URL1)
  // 点击某一个地方的时候获取当前播放时间
  wavesurfer.value.on('seek', () => {
    // const hasPlayTime = wavesurfer.value.getCurrentTime()
    // hasPlayTime.value = timeFilter(hasPlayTime * 1000)
  })
  // 播放结束
  wavesurfer.value.on('finish', () => {
    status.playing = false
    // hasPlayTime.value = '00:00'
  })
  // 播放中
  wavesurfer.value.on('audioprocess', () => {
    // const value = wavesurfer.value.getCurrentTime()
    // hasPlayTime.value = timeFilter(value * 1000)
  })
  callback?.()
}
const playWav = () => {
  // 判断是否播放完毕 如果是正在播放
  const isPlayNow = wavesurfer.value.isPlaying()
  status.playing = !isPlayNow
  wavesurfer.value.playPause()
}
const showDialog = () => {
  status.isDialog = true
}
</script>

<template>
  <div class="complaint-element">
    <div class="top">
      <div class="info">
        <span v-if="orderNo">投诉编号：{{ orderNo }}</span>
        <span v-if="complaintSource">投诉来源：{{ complaintSource }}</span>
        <span v-if="complaintTime">投诉时间：{{ complaintTime }}</span>
        <span v-if="entryPersonName">录入人：{{ entryPersonName }}</span>
      </div>
      <span class="btn" @click="handleReturn">返回</span>
    </div>
    <BasicInfo :data="basicInfo" style="height: 388px"></BasicInfo>
    <div
      class="bgc-white"
      style="padding: 16px 24px 12px; min-height: 400px"
      v-loading="pointLoading"
    >
      <ReconciliationPoint :list="ComplaintDetailsData" :isEdit="false">
        <template #audioDetail>
          <div class="audioDetail">
            <div class="play-back" :class="status.playing && 'play-pause'" @click="playWav"></div>
            <div ref="waveform_Ref" class="waveform" style="margin: 0 16px"></div>
            <el-form>
              <el-button class="my-button" plain @click="showDialog">
                <img class="img" src="@/assets/image/audio/sub.png" alt="" />
                智能语音分析</el-button
              >
            </el-form>
          </div>
        </template>
      </ReconciliationPoint>
    </div>
    <ComplaintHandling
      v-if="handleTree.length"
      :data="handleTree"
      :formId="handleTreeId"
      :createTime="handleTreeCreateTime"
      :requestData="requestData"
      @changeShow="changeShow"
    />
    <!-- 系统推荐策略 -->
    <system-recommendation-strategy v-show="isSysShow"></system-recommendation-strategy>
  </div>

  <el-dialog v-model="status.isDialog" width="1000" modal-class="my-dialog" :append-to-body="true">
    <template #header> <div class="title">智能解析</div> </template>
    <div>
      <AudioParse :url="status.url" ref="refAudioParse"></AudioParse>
    </div>
    <div class="dialog-content-middle">
      <div class="left-area">
        <div class="add-title">
          <div class="front-icon">
            <img :src="lineIcon" alt="" />
          </div>
          <div class="title-content">解析文本</div>
        </div>
        <div class="parse-content">
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
  </el-dialog>
</template>

<style lang="less" scoped>
@color-1: #505968;
@common_primary_color: #2d5cf6;
.complaint-element {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .top {
    display: flex;
    justify-content: space-between;
    height: 34px;
    line-height: 34px;
    color: @color-1;
    .info {
      display: flex;
      gap: 16px;
      font-size: 12px;
    }
    .btn {
      width: 84px;
      height: 100%;
      background-color: #fff;
      border: 0;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      color: @common_primary_color;
      cursor: pointer;
    }
  }
}
.audioDetail {
  display: flex;
  margin-left: 12px;
  .play-back {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url('@/assets/image/audio/play.png');
    background-size: contain;
    cursor: pointer;
    &.play-pause {
      background: url('@/assets/image/audio/pause.png');
      background-size: contain;
    }
  }
  .waveform {
    margin: 0 16px;
    width: 600px;
    height: 100%;
    border-radius: 40px;
    overflow: hidden;
  }
  .img {
    width: 21px;
    height: 21px;
    margin-top: 0;
    margin-right: 10px;
  }
}

.add-title {
  display: flex;
  margin: 20px 0 20px 0;
  align-content: center;
  flex-wrap: wrap;
  .front-icon img {
    width: 20px;
    height: 20px;
  }
}

.my-button {
  border: 0;
}
</style>

<style lang="less">
.my-dialog {
  .el-dialog {
    padding: 40px 60px;
    .el-dialog__body {
      padding: 0;
    }

    .el-dialog__header {
      position: relative;
      line-height: 24px;
      padding: 0 0 24px;
      margin-right: 0;
      .title {
        font-size: 16px;
        font-weight: 700;
        text-align: center;
      }
      .el-dialog__headerbtn {
        width: auto;
        height: auto;
        font-size: 24px;
      }
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
      margin-right: 24px;
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

        &::-webkit-scrollbar {
          width: 4px;
        }
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
</style>
