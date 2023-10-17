<script>
export default {
  name: 'file-preview'
}
</script>
<script setup>
import '@/utils/base64.min'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const { url } = defineProps({
  url: {
    type: String,
    default: ''
  }
})
const route = useRoute()

const iframeUrl = computed(() => {
  const encondeUrl = encodeURIComponent(Base64.encode(url || route.query.url))
  return 'http://192.168.210.52:31400/onlinePreview?url=' + encondeUrl
})
</script>

<template>
  <iframe
    v-if="url || route.query.url"
    class="iframe"
    id="iframe"
    frameborder="no"
    border="0"
    ref="iframe"
    :src="iframeUrl"
  ></iframe>
</template>

<style lang="less" scoped>
.iframe {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}


</style>
