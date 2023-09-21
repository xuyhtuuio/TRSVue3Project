<template>
  <div class="nav">
    <div class="left flex" @click="returnHome">
      <img src="@/assets/image/logo.png" alt="" class="logo">
      消保管控平台
    </div>
    <div class="center flex">
      <template>
        <div class="nav-item" v-for="item, index in navList" :key="index" @click="handleItem(item)">
          <span :class="[activeMenu == item.sign ? 'active-menu' : '']">{{ item.title }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const navList = [
  { title: '申请中心', name: 'apply-list', sign: 'applycenter' },
  { title: '审批中心', name: 'approval-list', sign: 'approvalcenter' },
  { title: '产品图谱', name: 'productmap', sign: 'productmap' },
  { title: '统计中心', name: 'statistical-center', sign: 'statistical-center' },
  { title: '人员中心', name: 'personCenter', sign: 'personcenter' },
];
const activeMenu = ref('applycenter');
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
}

</style>
