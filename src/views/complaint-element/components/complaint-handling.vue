<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

import CommunicationProcessing from './communication-processing.vue'
import SettleCase from './settle-case.vue'
import FixResponsibility from './fix-responsibility.vue'
import AdditionalRecording from './additional-recording.vue'
import Reconciliation from './reconciliation.vue'

const mainTabs = reactive([
  {
    id: 1,
    icon: 'icon-xianxingtubiao1',
    time: '2020-01-05  18:08:58',
    value: '开始处理',
    isActive: true
  },
  {
    id: 2,
    icon: 'icon-xianxingtubiao-1',
    time: '2020-01-05  18:08:58',
    value: '沟通处理',
    isActive: true,
    refEl: null,
    isShowSave: true
  },
  {
    id: 3,
    icon: 'icon-xianxingtubiao2',
    time: '2020-01-05  18:08:58',
    value: '定责',
    isActive: true,
    isShowSave: true
  },
  {
    id: 4,
    icon: 'icon-Vector-11',
    time: '2020-01-05  18:08:58',
    value: '结案',
    isActive: false,
    isShowSave: true
  },
  {
    id: 5,
    icon: 'icon-Vector-1',
    time: '2020-01-05  18:08:58',
    value: '补录',
    isActive: false,
    isShowSave: true
  },
  {
    id: 6,
    icon: 'icon-Vector-2',
    time: '2020-01-05  18:08:58',
    value: '和解',
    isActive: false,
    isShowSave: true
  }
])
const mainTabsCurrentIndex = ref(0)
const handleTabToggle = (idx) => {
  if (idx === 0) return
  mainTabsCurrentIndex.value = idx
}

const handleClose = (index) => {
  mainTabsCurrentIndex.value = index - 1
}
const saveDraft = () => {
  ElMessage({
    type: 'success',
    message: '保存草稿成功'
  })
}

const refCom1 = ref()
const refCom2 = ref()
const refCom3 = ref()
const refCom4 = ref()
const refCom5 = ref()
const refCom6 = ref()
const refList = [refCom1, refCom2, refCom3, refCom4, refCom5, refCom6]
const handling = ref()
const submit = async (idx) => {
  await nextTick()
  refList[idx].value.CheckRule().then(() => {
    mainTabs[idx].isShowSave = false
    rollTo()
    if (idx !== 5) {
      handleTabToggle(idx + 1)
    } else {
      handleTabToggle(1)
    }

    //
    if (idx <= 2) {
      mainTabs[3].isActive = true
    }
    console.log(mainTabs[idx])
  })
}

function rollTo() {
  document.querySelector('.complaint-handling').scrollIntoView()
}
</script>

<template>
  <div class="complaint-handling" :class="[mainTabsCurrentIndex === 0 && 'active']">
    <div class="handling bgc-white" ref="handling">
      <header class="header">
        <span class="iconfont" style="color: #306ef5">&#xe625;</span>
        投诉处理数
      </header>
      <main class="main">
        <div
          class="tab"
          v-for="(item, index) in mainTabs"
          :key="item.id"
          :class="[
            mainTabsCurrentIndex + 1 === item.id &&
              mainTabsCurrentIndex > 0 &&
              item.isActive &&
              'active',
            !item.isActive && 'no-active'
          ]"
          @click="handleTabToggle(index)"
        >
          <div class="wrap">
            <div class="left">
              <div>
                <div class="icon">
                  <span class="iconfont" :class="[item.icon]"></span>
                </div>
                <p class="value">{{ item.value }}</p>
              </div>
              <p class="arrow">></p>
            </div>
            <div class="right">
              <p class="time">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div class="content bgc-white">
      <div class="cnt-main">
        <div class="cnt-header" v-show="mainTabsCurrentIndex !== 0">
          <span class="item">{{ mainTabs[mainTabsCurrentIndex].value }}</span>
          <span class="item">
            <span>处理人：</span>
            <img class="img" src="@/assets/image/ocr-avatar.png" alt="" />
            <span class="name">谭欣雨</span>
            <span class="info">
              <i class="info-item">总行</i>
              <i class="info-item"> 投诉处理部门</i>
              <i class="info-item">投诉处理部门</i>
            </span>
          </span>
          <span class="item">更新时间： {{ mainTabs[mainTabsCurrentIndex].time }} </span>
        </div>
        <CommunicationProcessing
          v-show="mainTabsCurrentIndex === 1"
          ref="refCom2"
        ></CommunicationProcessing>
        <FixResponsibility v-show="mainTabsCurrentIndex === 2" ref="refCom3"></FixResponsibility>
        <SettleCase v-show="mainTabsCurrentIndex === 3" ref="refCom4"></SettleCase>
        <AdditionalRecording
          v-show="mainTabsCurrentIndex === 4"
          ref="refCom5"
        ></AdditionalRecording>
        <Reconciliation v-show="mainTabsCurrentIndex === 5" ref="refCom6"></Reconciliation>
      </div>

      <div class="btns">
        <template v-if="mainTabsCurrentIndex === 0">
          <el-button plain>转办</el-button>
          <el-button type="primary" @click="mainTabsCurrentIndex = 1">沟通处理</el-button>
          <el-button type="primary" @click="mainTabsCurrentIndex = 2">定责</el-button>
        </template>
        <template v-else>
          <el-button plain @click="handleClose(mainTabsCurrentIndex)">取消</el-button>
          <el-button type="primary" @click="saveDraft(mainTabsCurrentIndex)">存草稿</el-button>
          <el-button
            v-show="mainTabs[mainTabsCurrentIndex].isShowSave"
            type="primary"
            @click="submit(mainTabsCurrentIndex)"
            >提交</el-button
          >
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.complaint-handling {
  font-size: 14px;

  &.active {
    background-color: #fff;
    border-radius: 6px;
  }
  .handling {
    padding: 24px 24px 0;
    margin-bottom: 16px;
  }
  .header {
    margin-bottom: 16px;
    font-weight: 700;
  }

  .main {
    display: flex;
    padding: 0 50px;

    .tab {
      flex: 1;

      border-radius: 6px;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      .wrap {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        height: calc(100% - 1px);
        padding: 12px 16px 10px;
      }
      &:not(:first-child) {
        &:not(&.no-active) {
          &:not(&.active) {
            &:hover {
              background: linear-gradient(90deg, #7b61ff 0%, #61a0ff 107.5%);

              .wrap {
                position: relative;
                background: linear-gradient(90deg, #e9e6f6, #e7ecf6 107.5%);
              }

              .value,
              .arrow {
                color: #2d5cf6;
              }
              .right {
                &::after {
                  content: '';
                  position: absolute;
                  left: 50%;
                  transform: translate(-50%);
                  display: block;
                  bottom: -11px;
                  width: 0;
                  height: 0;
                  border-right-width: 5px;
                  border-left-width: 5px;
                  border-top-width: 8px;
                  border-style: solid;
                  border-color: #707fff transparent transparent transparent;
                }
              }
            }
          }
        }
      }

      .left {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        line-height: 24px;

        & > div {
          display: flex;
          gap: 12px;
        }

        .icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(90deg, #7b61ff 0%, #61a0ff 107.5%);
          text-align: center;
          color: #fff;
        }

        .value {
          font-weight: 700;
          color: #1d2128;
        }

        .arrow {
          color: #86909c;
        }

        .iconfont {
        }
      }

      .right {
        .time {
          margin-left: 26px;
          width: 100%;
          line-height: 18px;
          font-size: 10px;
          transform: scale(0.83333);
          transform-origin: 0 0;
        }
      }

      &.active {
        background: linear-gradient(90deg, #7b61ff 0%, #61a0ff 107.5%);
        position: relative;

        .left {
          .icon {
            color: @common_primary_color;
            background: #fff;
          }

          .value {
            color: #fff;
          }

          .arrow {
            color: #fff;
          }
        }

        .time {
          color: #fff;
        }

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          display: block;
          bottom: -10px;
          width: 0;
          height: 0;
          border-right-width: 5px;
          border-left-width: 5px;
          border-top-width: 8px;
          border-style: solid;
          border-color: #707fff transparent transparent transparent;
        }
      }
      &.no-active {
        color: #86909c;
        .icon {
          color: #86909c;
          background: #f7f8fa;
        }
        .value {
          color: #86909c;
        }
      }
    }
  }

  .content {
    .cnt-header {
      padding: 24px 24px 16px;
      display: flex;
      border-bottom: 1px solid #e5e6eb;
      .item {
        display: flex;
        align-items: center;
        .img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin: 0 8px;
        }
        .name {
          margin-right: 16px;
          font-weight: 700;
          color: #1d2128;
        }
        .info {
          display: flex;
          gap: 8px;
          line-height: 22px;
          color: #505968;
          &-item {
            &:not(:last-child) {
              &::after {
                content: '';
                display: inline-block;
                width: 1px;
                height: 10px;
                background-color: #505968;
                margin-left: 8px;
              }
            }
          }
        }
        &:first-child {
          margin-right: 32px;
          font-size: 16px;
          font-weight: 700;
          color: #1d2128;
        }
        &:nth-child(2) {
          height: 32px;
          background-color: #f7f8fa;
          padding: 0 16px;
          border-radius: 40px;
        }
        &:last-child {
          margin-left: auto;
          color: #86909c;
        }
      }
    }
    .btns {
      display: flex;
      justify-content: center;
      padding: 24px 0;

      .el-button + .el-button {
        margin-left: 24px;
      }

      .el-button {
        &:first-child {
          color: var(--el-button-hover-text-color);
          border-color: var(--el-button-hover-border-color);
          background-color: var(--el-button-hover-bg-color);
          outline: 0;
        }
      }
    }
  }
}
</style>
