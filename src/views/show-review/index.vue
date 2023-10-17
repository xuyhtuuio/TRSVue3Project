<template>
  <div class="show-review">
    <FilePreview :url="url"></FilePreview>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import FilePreview from '@/components/filePreview.vue';
  const route = useRoute()
  let url = ref('')
  url.value = route.query.url
</script>

<style lang="less" scoped>
.show-review {
  width: 100%;
  height: 100%;
}
</style>
