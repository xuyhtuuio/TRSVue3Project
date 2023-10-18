<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import BasicInfo from './components/basic-info.vue'
import ComplaintHandling from './components/complaint-handling.vue'
import SystemRecommendationStrategy from './components/system-recommendation-strategy.vue'
import ReconciliationPoint from '@/views/complaint-entry/components/reconciliation-point.vue'
import { getApplyForm } from '@/api/complaint-element'
import WaveSurfer from 'wavesurfer.js'
import URL from '@/123.aac'
let basicInfo = ref([])
let handleTree = ref([])
let handleTreeId = ref(0)
let ComplaintDetailsData = ref([])
onMounted(() => {
  getApplyForm({
    formCategoryId: 22,
    formId: 17,
    nodeId: 'node_257453325911'
  }).then(({ data: res }) => {
    if (res.success) {
      // verifyThroughInvestigationList
      const { formId, formModuleVoList } = res.data
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
        data.splice(1, 0, [
          {
            userInfo: {
              id: '1156',
              name: '吕强1',
              type: null,
              label: null,
              roleRange: null,
              sex: null,
              selected: null,
              org: null,
              institutionalInformation: ['测试二级机构1', '研发组1']
            },
            formModuleItemList: [
              {
                id: '308',
                title: '响应时间',
                name: 'TimePicker',
                module: '首次响应',
                value: '2022-03-01',
                valueType: 'Date',
                sort: 31,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  enablePrint: null,
                  placeholder: '',
                  format: 'yyyy-MM-dd HH:mm:ss',
                  gl: null,
                  order: null
                }
              },
              {
                id: '309',
                title: '响应方式',
                name: 'SelectInput',
                module: '首次响应',
                value: 'select7080309378863',
                valueType: 'String',
                sort: 32,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: 'select7080309378863',
                      value: '电话'
                    },
                    {
                      id: 'select6244309416588',
                      value: '微信'
                    },
                    {
                      id: 'select9048709419729',
                      value: 'qq'
                    }
                  ],
                  exclusiveRowOrNot: false
                }
              },
              {
                id: '310',
                title: '响应内容',
                name: 'TextareaInput',
                module: '首次响应',
                value: '234234',
                valueType: 'String',
                sort: 33,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  numberOfWords: '50'
                }
              },
              {
                id: '338',
                title: '后续处理',
                name: 'MultipleSelect',
                module: '首次响应',
                value: ['1417'],
                valueType: 'Array',
                sort: 48,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: false,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: '1417',
                      value: '管理员2'
                    },
                    {
                      id: '1459',
                      value: '张芮嘉'
                    }
                  ]
                }
              }
            ],
            processingRecordsId: null,
            groupId: 25,
            module: '首次响应',
            editPermissions: 'D'
          },
          {
            userInfo: {
              id: '1156',
              name: '吕强11',
              type: null,
              label: null,
              roleRange: null,
              sex: null,
              selected: null,
              org: null,
              institutionalInformation: ['测试二级机构11', '研发组11']
            },
            formModuleItemList: [
              {
                id: '308',
                title: '响应时间',
                name: 'TimePicker',
                module: '首次响应',
                value: '',
                valueType: 'Date',
                sort: 31,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  enablePrint: null,
                  placeholder: '',
                  format: 'yyyy-MM-dd HH:mm:ss',
                  gl: null,
                  order: null
                }
              },
              {
                id: '309',
                title: '响应方式',
                name: 'SelectInput',
                module: '首次响应',
                value: '',
                valueType: 'String',
                sort: 32,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: 'select7080309378863',
                      value: '电话'
                    },
                    {
                      id: 'select6244309416588',
                      value: '微信'
                    },
                    {
                      id: 'select9048709419729',
                      value: 'qq'
                    }
                  ],
                  exclusiveRowOrNot: false
                }
              },
              {
                id: '310',
                title: '响应内容',
                name: 'TextareaInput',
                module: '首次响应',
                value: '',
                valueType: 'String',
                sort: 33,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  numberOfWords: '50'
                }
              },
              {
                id: '338',
                title: '后续处理',
                name: 'MultipleSelect',
                module: '首次响应',
                value: [],
                valueType: 'Array',
                sort: 48,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: false,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: '1417',
                      value: '管理员2'
                    },
                    {
                      id: '1459',
                      value: '张芮嘉'
                    }
                  ]
                }
              }
            ],
            processingRecordsId: null,
            groupId: 25,
            module: '首次响应',
            editPermissions: 'D'
          }
        ])
        data[2] = {
          userInfo: {
            id: '1156',
            name: '吕强123',
            institutionalInformation: ['测试二级机构1', '研发组1']
          },
          formModuleItemList: [
            {
              id: '308',
              title: '响应时间',
              name: 'TimePicker',
              module: '首次响应',
              value: '2022-03-01',
              valueType: 'Date',
              sort: 31,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                enablePrint: null,
                placeholder: '',
                format: 'yyyy-MM-dd HH:mm:ss',
                gl: null,
                order: null
              }
            },
            {
              id: '309',
              title: '响应方式',
              name: 'SelectInput',
              module: '首次响应',
              value: 'select7080309378863',
              valueType: 'String',
              sort: 32,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: 'select7080309378863',
                    value: '电话'
                  },
                  {
                    id: 'select6244309416588',
                    value: '微信'
                  },
                  {
                    id: 'select9048709419729',
                    value: 'qq'
                  }
                ],
                exclusiveRowOrNot: false
              }
            },
            {
              id: '310',
              title: '响应内容',
              name: 'TextareaInput',
              module: '首次响应',
              value: '234234',
              valueType: 'String',
              sort: 33,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                numberOfWords: '50'
              }
            },
            {
              id: '338',
              title: '后续处理',
              name: 'MultipleSelect',
              module: '首次响应',
              value: ['1417'],
              valueType: 'Array',
              sort: 48,
              perm: null,
              processingRecordsId: null,
              props: {
                required: false,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: '1417',
                    value: '管理员2'
                  },
                  {
                    id: '1459',
                    value: '张芮嘉'
                  }
                ]
              }
            }
          ],
          processingRecordsId: null,
          groupId: 25,
          module: '首次响应',
          editPermissions: 'D'
        }
        data[3] = {
          userInfo: {
            id: '1156',
            name: '吕强123456',
            institutionalInformation: ['测试二级机构1', '研发组1']
          },
          formModuleItemList: [
            {
              id: '308',
              title: '响应时间',
              name: 'TimePicker',
              module: '首次响应',
              value: '2000-12-12',
              valueType: 'Date',
              sort: 31,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                enablePrint: null,
                placeholder: '',
                format: 'yyyy-MM-dd HH:mm:ss',
                gl: null,
                order: null
              }
            },
            {
              id: '309',
              title: '响应方式',
              name: 'SelectInput',
              module: '首次响应',
              value: 'select7080309378863',
              valueType: 'String',
              sort: 32,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: 'select7080309378863',
                    value: '电话'
                  },
                  {
                    id: 'select6244309416588',
                    value: '微信'
                  },
                  {
                    id: 'select9048709419729',
                    value: 'qq'
                  }
                ],
                exclusiveRowOrNot: false
              }
            },
            {
              id: '310',
              title: '响应内容',
              name: 'TextareaInput',
              module: '首次响应',
              value: '23324234',
              valueType: 'String',
              sort: 33,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                numberOfWords: '50'
              }
            },
            {
              id: '338',
              title: '后续处理',
              name: 'MultipleSelect',
              module: '首次响应',
              value: ['1417'],
              valueType: 'Array',
              sort: 48,
              perm: null,
              processingRecordsId: null,
              props: {
                required: false,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: '1417',
                    value: '管理员2'
                  },
                  {
                    id: '1459',
                    value: '张芮嘉'
                  }
                ]
              }
            }
          ],
          processingRecordsId: null,
          groupId: 25,
          module: '首次响应',
          editPermissions: 'D'
        }
        data[4] = {
          userInfo: {
            id: '1156456',
            name: '吕强123456897',
            institutionalInformation: ['测试二级机构1', '研发组1']
          },
          formModuleItemList: [
            {
              id: '308',
              title: '响应时间',
              name: 'TimePicker',
              module: '首次响应',
              value: '',
              valueType: 'Date',
              sort: 31,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                enablePrint: null,
                placeholder: '',
                format: 'yyyy-MM-dd HH:mm:ss',
                gl: null,
                order: null
              }
            },
            {
              id: '309',
              title: '响应方式',
              name: 'SelectInput',
              module: '首次响应',
              value: '',
              valueType: 'String',
              sort: 32,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: 'select7080309378863',
                    value: '电话'
                  },
                  {
                    id: 'select6244309416588',
                    value: '微信'
                  },
                  {
                    id: 'select9048709419729',
                    value: 'qq'
                  }
                ],
                exclusiveRowOrNot: false
              }
            },
            {
              id: '310',
              title: '响应内容',
              name: 'TextareaInput',
              module: '首次响应',
              value: '',
              valueType: 'String',
              sort: 33,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                numberOfWords: '50'
              }
            },
            {
              id: '338',
              title: '后续处理',
              name: 'MultipleSelect',
              module: '首次响应',
              value: [],
              valueType: 'Array',
              sort: 48,
              perm: null,
              processingRecordsId: null,
              props: {
                required: false,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: '1417',
                    value: '管理员2'
                  },
                  {
                    id: '1459',
                    value: '张芮嘉'
                  }
                ]
              }
            }
          ],
          processingRecordsId: null,
          groupId: 25,
          module: '首次响应',
          editPermissions: 'E'
        }
        handleTree.value = data
        handleTreeId.value = formId
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
  content: '',
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
  parsingAudio(()=> {
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
  wavesurfer.value.load(URL)
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
</script>

<template>
  <div class="complaint-element">
    <div class="top">
      <div class="info">
        <span>投诉编号：20230601000023YH</span>
        <span>投诉来源：银保监会系统转来投诉</span>
        <span>投诉时间：2023-06-01 18：15</span>
        <span>录入人：投诉中心客服A</span>
      </div>
      <span class="btn" @click="handleReturn">返回</span>
    </div>
    <BasicInfo :data="basicInfo" style="height: 388px"></BasicInfo>
    <!-- <ComplaintDetails></ComplaintDetails> -->
    <div class="bgc-white" style="padding: 16px 24px 12px;min-height: 400px" v-loading="pointLoading">
      <ReconciliationPoint :list="ComplaintDetailsData" :isEdit="false">
        <template #audioDetail>
          <div class="audioDetail">
            <div class="play-back" :class="status.playing && 'play-pause'" @click="playWav"></div>
            <div ref="waveform_Ref" class="waveform" style="margin: 0 16px"></div>
            <el-form>
              <el-button plain @click="showDialog">
                <img class="img" src="@/assets/image/audio/sub.png" alt="" />
                智能语音分析</el-button
              >
            </el-form>
          </div>
        </template>
      </ReconciliationPoint>
    </div>
    <ComplaintHandling :data="handleTree" :formId="handleTreeId" @changeShow="changeShow" />
    <!-- 系统推荐策略 -->
    <system-recommendation-strategy v-show="isSysShow"></system-recommendation-strategy>
  </div>
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






</style>
