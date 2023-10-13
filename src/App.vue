<template>
  <TrsHeader v-if="$route.name !== 'login'"></TrsHeader>
  <div class="web-body" :class="noPadding.includes(route.name) ? 'padding-none' : ''" :style="{
        'height': $route.name === 'login' ? '100vh' : 'calc(100vh - 48px)'
      }">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { checkToken } from '@/api/user'
import TrsHeader from '@/components/trs-header.vue';
import { useRoute, useRouter } from 'vue-router';
const noPadding = ['manage-page', 'login'];
const route = useRoute();
const router = useRouter();
const checkTokenApi = () => {
  if (window.localStorage.getItem('AI_token') == null) {
    router.push({
      name: 'login'
    });
    return;
  }
  const data = {
    token: window.localStorage.getItem('AI_token'),
    timer: Date.now()
  }
  const res = checkToken(data).catch(() => {
    router.push({
      name: 'login'
    });
  })
  if (res && res.user_name) {
    localStorage.setItem('userObj', res.user_name);
  }
}
checkTokenApi();
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
