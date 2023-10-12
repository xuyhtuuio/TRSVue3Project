<template>
  <micro-app name='management' :url='url' baseroute='/manage-page'></micro-app>
</template>

<script setup>
import config from '../../../url-config'
import { ref } from "vue";

const url = ref('');
url.value = config.preDetatl
</script>

<style lang="less" scoped>
#iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>