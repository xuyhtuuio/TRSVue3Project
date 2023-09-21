<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-21 11:37:50
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-09-21 14:08:02
 * @FilePath: /protection-treatment/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
