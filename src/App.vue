<template>
  <TrsHeader></TrsHeader>
  <div class="web-body" :class="noPadding.includes(route.name) ? 'padding-none' : ''">
    <router-view></router-view>
  </div>
</template>

<script setup>
import TrsHeader from '@/components/trs-header.vue';
import { useRoute } from 'vue-router';
const noPadding = ['manage-page']
const route = useRoute();
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  text-align: left;
  .web-body {
    width: 100%;
    height: calc(100vh - 48px);
    padding:16px 80px 24px 80px;
    overflow-y: scroll;
  }
  .padding-none {
    padding: 0;
  }
}
</style>
