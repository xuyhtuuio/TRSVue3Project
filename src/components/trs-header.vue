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
      <div class="png-icon" @click="toManagePage" style="margin-right: 32px">
        <img class="png-icon" src="@/assets/image/set.png"/>
      </div>
      <!-- 个人中心 -->
      <el-popover placement="bottom" trigger="click" width="320" @show="updateInfo">
        <div class="userInfo">
          <img class="ocr-avatar" src="@/assets/image/ocr-avatar.png" alt="" />
          <p>
            <span class="nickname"> {{ userInfo.info && userInfo.info.fullname }}{{ userInfo.info && ` / ${userInfo.info.id}` }} </span>
            <span class="role" v-if="userInfo.info.role">{{ userInfo.info.role }}</span>
          </p>
          <p class="orgs">
            <i class="iconfont icon-dept"></i>
            {{ userInfo?.info?.org?.join('/') }}
          </p>
          <el-button class="logout" @click="logout"><i class="iconfont icon-tuichudenglu"></i> 退出登录</el-button>
        </div>
        <template #reference>
          <img class="png-icon" src="@/assets/image/person.png"/>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const navList = [
  // { title: '首页', name: 'apply-list', sign: 'home' },
  { title: '投诉录入', name: 'complaintEntry', sign: 'complaintEntry' },
  { title: '投诉处理', name: 'complaintHandling-list', sign: 'complaintHandling-list' },
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
const toManagePage = () => {
  router.push({
    name: 'manage-page'
  });
}
const changeAcitve = (router) => {
  const { fullPath } = router;
  activeMenu.value = '';
  if (fullPath.indexOf('home') !== -1) {
    activeMenu.value = 'home';
  } else if (fullPath.indexOf('complaintHandling') !== -1) {
    activeMenu.value = 'complaintHandling-list'
  } else if (fullPath.indexOf('complaintEntry') !== -1) {
    activeMenu.value = 'complaintEntry'
  } else if (fullPath.indexOf('complaint-inquiry') !== -1) {
    activeMenu.value = 'complaint-inquiry'
  } else if (fullPath.indexOf('statistical-center') !== -1) {
    activeMenu.value = 'statistical-center'
  }
}
const logout = () => {
  router.push({
    name: 'login'
  })
};
const userInfo = reactive({
  info: {}
});
const updateInfo = () => {
  const user = JSON.parse(window.localStorage.getItem('user_name'))
  const org = user.orgs?.[0] ? getOrgs(user.orgs[0], []) : ''
  const role = user.roles.filter(item => item.clientId === 'cpr')
  userInfo.info = {
    ...user,
    org,
    role: role?.[0]?.name?.split('-')?.[1]
  }
}
const getOrgs = (item, org) => {
  org.push(item.name)
  if (item?.child?.name) {
    return this.getOrgs(item.child, org)
  } else {
    return org;
  }
}
watch(
  () => router.currentRoute.value,
  (newValue) => {
    changeAcitve(newValue);
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
    .png-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    .icon3 {
      font-size: 21px !important;
    }
  }
}

.userInfo {
  padding: 4px 12px;

  .ocr-avatar {
    width: 32px;
  }

  p {
    margin: 8px 0;
  }

  .nickname {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: #1D2128;
  }

  .role {
    margin-left: 8px;
    padding: 4px 12px;
    background: linear-gradient(180deg, #FFF7E6 0%, rgba(255, 247, 230, 0) 100%);
    color: #FA8C16;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
  }

  .orgs {
    display: flex;
    background: linear-gradient(180deg, #F7F8FA 0%, rgba(247, 248, 250, 0) 100%);
    padding: 8px;
    border-radius: 4px;
    color: #505968;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    gap: 10px;

    .icon-dept {
      color: #2D5CF6;
      font-size: 22px;
    }
  }

  .logout {
    width: 100%;
    border: none;
    background: #F7F8FA;
    color: #1D2128;
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;

    &:hover {
      background: #F7F8FA;
      color: #1D2128;
    }

    :deep(span) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-tuichudenglu {
      color: #2D5CF6;
      margin-right: 8px;
      font-size: 18px;
    }
  }
}
</style>
