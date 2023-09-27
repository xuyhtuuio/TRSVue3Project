import { ref, reactive, nextTick } from 'vue'
import dayjs from 'dayjs'
import WaveSurfer from 'wavesurfer.js'

export default function useAudio() {
  const wavesurfer = ref(null)
  const waveform_Ref = ref(null)
  const hasPlayTime = ref('00:00')
  const allTime = ref('00:00')
  const status = reactive({
    playing: false
  })

  async function initAudio(file, refEl) {
    let time = await handleTime(file)
    allTime.value = timeFilter(time * 1000)
    const newFormData = new FormData()
    newFormData.append('multipart', file.file)
    // 上传成功后 加载波形
    const audioURL = URL.createObjectURL(file.file)
    return audioURL
  }

  async function parsingAudio(audioURL, options, refEl) {
    await nextTick()
    const oldOptions = {
      // 波形图的容器
      container: refEl,
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
      backend: 'MediaElement'
      // （与区域插件一起使用）启用所选区域的循环
      // loopSelection:false
    }
    wavesurfer.value = WaveSurfer.create({ ...oldOptions, ...options })
    wavesurfer.value.load(audioURL)
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
      hasPlayTime.value = timeFilter(value * 1000)
    })
  }
  // 播放
  function playWav() {
    // 判断是否播放完毕 如果是正在播放
    const isPlayNow = wavesurfer.value.isPlaying()
    status.playing = !isPlayNow
    wavesurfer.value.playPause()
  }

  // 快进/后退
  function skipBackward(flag = true, second = 15) {
    flag && wavesurfer.value.skip(-second)
    !flag && wavesurfer.value.skip(15)
    const isPlayNow = wavesurfer.value.isPlaying()
    if (!isPlayNow) {
      status.playing = !isPlayNow
      wavesurfer.value.playPause()
    }
  }

  return { playWav, parsingAudio, initAudio, skipBackward }
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
