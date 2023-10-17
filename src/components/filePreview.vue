<template>
  <iframe v-if="url" class="iframe" id="iframe" frameborder="no" border="0" ref="iframe" :src="iframeUrl"></iframe>
</template>

<script setup>
import { computed } from 'vue'
import '@/utils/base64.min';
defineProps({
  url: {
    type: String,
    default: () => ''
  }
})
const iframeUrl = computed(() => {
  // eslint-disable-next-line
  const encondeUrl = encodeURIComponent(Base64.encode(this.url))
  return 'http://192.168.210.52:31400/onlinePreview?url=' + encondeUrl
})

</script>
<style lang="less" scoped>
.iframe {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
