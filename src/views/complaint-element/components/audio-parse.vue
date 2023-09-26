<script setup>
import { ref, watch, nextTick } from 'vue'
import dayjs from 'dayjs'
import WaveSurfer from 'wavesurfer.js'
const props = defineProps({
  file: {
    typeof: Object,
    default: ''
  }
})
const initAudio = async (file) => {
  let time = await handleTime(file)
  time = timeFilter(time * 1000)
  const newFormData = new FormData()
  newFormData.append('multipart', file.file)
  // 上传成功后 加载波形
  const audioURL = URL.createObjectURL(file.file)
  parsingAudio(audioURL)
}
watch(
  () => props.file,
  (newVal) => {
    console.log(newVal)
    initAudio(newVal)
  },
  { immediate: true }
)

const wavesurfer = ref(null)
const waveform_Ref = ref(null)
const hasPlayTime = ref(0)
async function parsingAudio(audioURL) {
  await nextTick()
  wavesurfer.value = WaveSurfer.create({
    // 波形图的容器
    container: waveform_Ref.value,
    // 已播放波形的颜色
    // progressColor: "red",
    // 未播放波形的颜色
    // waveColor: "lightgrey",
    // 波形图的高度，单位为px
    height: 45,
    with: 640,
    // barHeight: 20,
    // barWidth: 1.5,
    // 波形条间的间距
    barGap: 1,
    progressColor: '#6D73FF',
    waveColor:
      'linear-gradient(180deg, rgba(151, 153, 255, 0) 0%, #9799FF 25.98%, #E29DFF 79.88%, rgba(226, 157, 255, 0) 100%)',
    // 播放进度光标条的颜色
    cursorColor: '#2D5CF6',
    // 播放进度光标条的宽度，默认为1
    cursorWidth: 2,
    // 播放进度颜色
    // progressColor: "blue",
    //  波形容器的背景颜色
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    // 音频的播放速度
    audioRate: '1',
    mediaControls: false,
    waveColor: '#409EFF',
    backend: 'MediaElement'
    // （与区域插件一起使用）启用所选区域的循环
    // loopSelection:false
  })
  wavesurfer.value.load(audioURL)
  // 点击某一个地方的时候获取当前播放时间
  wavesurfer.value.on('seek', () => {
    const hasPlayTime = wavesurfer.value.getCurrentTime()
    hasPlayTime.value = timeFilter(hasPlayTime * 1000)
  })
  // 播放结束
  wavesurfer.value.on('finish', () => {
    this.status.playing = false
    hasPlayTime.value = '00:00:00'
  })
  // 播放中
  wavesurfer.value.on('audioprocess', () => {
    const hasPlayTime = wavesurfer.value.getCurrentTime()
    hasPlayTime.value = timeFilter(hasPlayTime * 1000)
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
function playWav() {
  // 判断是否播放完毕 如果是正在播放
  console.log(wavesurfer.value)
  wavesurfer.value.isPlaying()
  // this.status.playing = !isPlayNow
  wavesurfer.value.playPause()
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
  console.log()
  if (day.minute() >= 0) {
    str += `0${day.minute()}`.slice(day.minute - 1) + ':'
  }

  if (day.second() >= 0) {
    str += day.second()
  }
  return str
}
</script>

<template>
  <div class="audio-parse">
    <div ref="waveform_Ref"></div>
    <div @click="playWav">播放</div>
  </div>
</template>

<style lang="less" scoped></style>
