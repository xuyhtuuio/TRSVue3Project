<template>
  <div class="nav">
    <div class="left flex" @click="returnHome">
      <img src="@/assets/image/logo.png" alt="" class="logo">
      消保投诉智能处理
    </div>
    <div class="center flex">
      <div class="nav-item" v-for="item, index in navList" :key="index" @click="handleItem(item)">
        <span :class="[activeMenu == item.sign ? 'active-menu' : '']">{{ item.title }}</span>
      </div>
    </div>
    <div class="right flex">
      <!-- <i v-for="(item, index) in iconList" :key="index" @click="toManagePage(item)"
        :class="['iconfont', item.href, `icon${index + 1}`]"></i> -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const navList = [
  { title: '首页', name: 'apply-list', sign: 'home' },
  { title: '投诉处理', name: 'complaintHandling-list', sign: 'complaintHandling-list' },
  { title: '投诉录入', name: 'complaintEntry', sign: 'complaintEntry' },
  { title: '投诉查询', name: 'complaint-inquiry', sign: 'complaint-inquiry' },
  { title: '统计中心', name: 'statistical-center', sign: 'statistical-center' },
];
const router = useRouter();
let activeMenu = ref('home');
const handleItem = (item) => {
  activeMenu.value = item.sign;
  router.push({
    name: item.sign
  });
};

watch(
  () => router.currentRoute.value,
  (newValue) => {
    console.log('newValue',newValue)
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 48px;
  background: #374160;
  font-size: 14px;
  color: #fff;
  .icon-my {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  .flex {
    display: flex;
    align-items: center;
    align-items: center;
  }

  .left {
    font-weight: 700;
    cursor: pointer;

    .logo {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }

  .center {
    flex: 1;
    display: flex;
    align-items: center;

    .nav-item {
      padding: 0px 20px 0px 20px;
      width: 104px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 10px;
      gap: 8px;
      cursor: pointer;
    }

    .active-menu {
      position: relative;
      width: 100%;
      font-weight: 700;

    }

    .active-menu::after {
      content: '';
      width: 100%;
      height: 2px;
      border-radius: 10px;
      background: var(--unnamed, #FFF);
      position: absolute;
      left: 0;
      bottom: -14px;
    }
  }

  .right {
    .iconfont {
      margin-left: 32px;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }

    .icon3 {
      font-size: 21px !important;
    }
  }
}

</style>
