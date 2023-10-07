<script setup>
import { ref, reactive, watch, nextTick } from 'vue'
import dayjs from 'dayjs'
import WaveSurfer from 'wavesurfer.js'
const props = defineProps({
  file: {
    typeof: Object,
    default: ''
  },
  url: {
    typeof: String,
    default: ''
  }
})

watch(
  () => props.file,
  (newVal) => {
    newVal && initAudio(newVal)
  },
  { immediate: true }
)

const wavesurfer = ref(null)
const waveform_Ref = ref(null)
const hasPlayTime = ref('00:00')
const allTime = ref('00:00')
watch(
  () => props.url,
  (newVal) => {
    newVal &&
      parsingAudio('', async () => {
        await nextTick()
        const dura = parseInt(wavesurfer.value.getDuration())
        allTime.value = timeFilter(dura * 1000)
      })
  },
  { immediate: true }
)

const status = reactive({
  playing: false
})

async function initAudio(file) {
  let time = await handleTime(file)
  allTime.value = timeFilter(time * 1000)
  const newFormData = new FormData()
  newFormData.append('multipart', file.file)
  // 上传成功后 加载波形
  const audioURL = URL.createObjectURL(file.file)
  parsingAudio(audioURL)
}
async function parsingAudio(audioURL, callback) {
  await nextTick()
  wavesurfer.value = WaveSurfer.create({
    // 波形图的容器
    container: waveform_Ref.value,
    // 已播放波形的颜色
    // progressColor: "red",
    // 未播放波形的颜色
    // waveColor: "lightgrey",
    // 波形图的高度，单位为px
    height: 72,
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
    backend: 'MediaElement',
    url: props.url || ''
    // （与区域插件一起使用）启用所选区域的循环
    // loopSelection:false
  })
  if (props.url) {
    wavesurfer.value.load(props.url)
  } else {
    wavesurfer.value.load(audioURL)
  }

  // 点击某一个地方的时候获取当前播放时间
  wavesurfer.value.on('seek', () => {
    const hasPlayTime = wavesurfer.value.getCurrentTime()
    hasPlayTime.value = timeFilter(hasPlayTime * 1000)
  })
  // 播放结束
  wavesurfer.value.on('finish', () => {
    this.status.playing = false
    hasPlayTime.value = '00:00'
  })
  // 播放中
  wavesurfer.value.on('audioprocess', () => {
    const value = wavesurfer.value.getCurrentTime()
    if (Number(value) !== 0) {
      hasPlayTime.value = timeFilter(value * 1000)
    }
  })
  wavesurfer.value.on('ready', function () {
    callback && callback()
  })
  // this.conversations = conversation
  // this.conversationArr = []
  // 解析录音倒计时
  // setTimeout(() => {
  //   this.status.materialLoading = true
  //   this.showRiskList(this.conversations, 'conversationArr')
  // }, 30000)
}

// 播放
function playWav(flag = false) {
  // 判断是否播放完毕 如果是正在播放
  if (flag && wavesurfer.value.isPlaying()) {
    status.playing = !flag
    wavesurfer.value.playPause()
  } else {
    const isPlayNow = wavesurfer.value.isPlaying()
    status.playing = !isPlayNow
    wavesurfer.value.playPause()
  }
}
defineExpose({ wavesurfer, status, handleClose: () => playWav(true) })
function skipBackward(flag = true) {
  console.log(wavesurfer.value)
  flag && wavesurfer.value.skip(-15)
  !flag && wavesurfer.value.skip(15)
  const isPlayNow = wavesurfer.value.isPlaying()
  if (!isPlayNow) {
    status.playing = !isPlayNow
    wavesurfer.value.playPause()
  }
}
function handleTime(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file.file)
    const element = new Audio(url)
    element.addEventListener('loadedmetadata', () => {
      const time = Math.round(element.duration * 100) / 100
      resolve(time)
    })
    element.addEventListener('error', () => resolve(0))
  })
}
function timeFilter(time) {
  if (time == 0 || time == '--') {
    return time
  }
  const day = dayjs(0).millisecond(Number.parseInt(time))
  let str = ''
  if (day.minute() >= 0) {
    str += `0${day.minute()}`.slice(String(day.minute()).length - 1) + ':'
  }

  if (day.second() >= 0) {
    str += `0${day.second()}`.slice(String(day.second()).length - 1)
  }
  return str
}
</script>

<template>
  <div class="audio-parse">
    <div class="content">
      <div class="audio">
        <div ref="waveform_Ref" class="waveForm"></div>
        <p class="time-axis">
          <span>{{ hasPlayTime }}</span>
          <span>{{ allTime }}</span>
        </p>
      </div>
      <div class="btns">
        <p class="hasPlayTime">{{ hasPlayTime }}</p>
        <div class="play-func">
          <img src="@/assets/image/audio/fast15.png" @click="skipBackward" />
          <img
            src="@/assets/image/audio/play-audio.png"
            alt=""
            class="play"
            @click="playWav"
            v-show="!status.playing"
          />
          <img
            src="@/assets/image/audio/suspend-play.png"
            alt=""
            class="play"
            @click="playWav"
            v-show="status.playing"
          />
          <img src="@/assets/image/audio/back15.png" alt="" @click="skipBackward(false)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.audio-parse {
  .content {
    height: 180px;
    padding: 12px 0;
    border-radius: 8px;
    background: linear-gradient(95.15deg, #e2efff 0%, #f0f4ff 45.37%, #f1f1ff 98.51%);
  }

  .audio {
    display: flex;
    flex-direction: column;
    align-items: center;
    .waveForm {
      padding: 0 4px;
      width: 640px;
      height: 72px;
      border-radius: 8px;
      background: #fff;
      overflow: hidden;
    }
    // padding: 0 180px;
    .time-axis {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: Microsoft YaHei;
      line-height: 20px;
      color: '#505968';
      width: 640px;
    }
  }
  .btns {
    height: 80px;
    background: url('@/assets/image/audio/back.png');
    background-size: contain;
    .hasPlayTime {
      color: rgba(29, 33, 40, 1);
      margin-bottom: 8px;
      line-height: 28px;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
    }
    .play-func {
      display: flex;
      justify-content: center;
      gap: 24px;
      img {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
