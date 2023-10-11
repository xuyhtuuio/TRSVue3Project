<template>
  <micro-app name='management' url='http://localhost:8082/admin/manage/userManage' baseroute='/manage-page'></micro-app>
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