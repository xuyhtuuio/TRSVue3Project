<template>
  <micro-app name='management' url='http://192.168.210.57:31608/admin/manage/formManage' baseroute='/manage-page'></micro-app>
</template>

<script setup>
import { ref } from "vue";

const url = ref('');
console.log(import.meta.env);
</script>

<style lang="less" scoped>
#iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>