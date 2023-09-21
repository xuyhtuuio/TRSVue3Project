<template>
  <TrsHeader></TrsHeader>
  <div class="web-body">
    <router-view></router-view>
  </div>
</template>

<script setup>
import TrsHeader from '@/components/trs-header.vue';
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  text-align: left;
  display: flex;
  flex-direction: column;
  .web-body {
    width: 100%;
    flex: 1;
    padding:16px 80px 24px 80px;
  }
}
</style>
