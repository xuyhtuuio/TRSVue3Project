<script setup>
import { ref } from 'vue'
import CommunicationProcessing from './communication-processing.vue'
import SettleCase from './settle-case.vue'
import FixResponsibility from './fix-responsibility.vue'
import AdditionalRecording from './additional-recording.vue'
import Reconciliation from './reconciliation.vue'

const mainTabs = [
  { id: 1, icon: 'icon-xianxingtubiao1', time: '2020-01-05  18:08:58', value: '开始处理' },
  { id: 2, icon: 'icon-xianxingtubiao-1', time: '2020-01-05  18:08:58', value: '沟通处理' },
  { id: 3, icon: 'icon-Vector2', time: '2020-01-05  18:08:58', value: '定责' },
  { id: 4, icon: 'icon-Vector-1', time: '2020-01-05  18:08:58', value: '结案' },
  { id: 5, icon: 'icon-Vector-1', time: '2020-01-05  18:08:58', value: '补录' },
  { id: 6, icon: 'icon-Vector-2', time: '2020-01-05  18:08:58', value: '和解' }
]
const mainTabsCurrentIndex = ref(1)
const handleTabToggle = ({ id }) => {
  if (id === 1) return
  mainTabsCurrentIndex.value = id
}

const handleClose = (index) => {
  mainTabsCurrentIndex.value = index - 1
}
</script>

<template>
  <div class="complaint-handling" :class="[mainTabsCurrentIndex === 1 && 'active']">
    <div class="handling bgc-white">
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
            mainTabsCurrentIndex === item.id &&
              mainTabsCurrentIndex > 1 &&
              mainTabsCurrentIndex < 5 &&
              'active',
            index >= 4 && 'no-active'
          ]"
          @click="handleTabToggle(item)"
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
      <div>
        <div class="cnt-header" v-show="mainTabsCurrentIndex !== 1">
          <span class="item">{{ mainTabs[mainTabsCurrentIndex - 1].value }}</span>
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
          <span class="item">更新时间： {{ mainTabs[mainTabsCurrentIndex - 1].time }} </span>
        </div>
        <CommunicationProcessing v-show="mainTabsCurrentIndex === 2"></CommunicationProcessing>
        <FixResponsibility v-show="mainTabsCurrentIndex === 3"></FixResponsibility>
        <SettleCase v-show="mainTabsCurrentIndex === 4"></SettleCase>
        <AdditionalRecording v-show="mainTabsCurrentIndex === 5"></AdditionalRecording>
        <Reconciliation v-show="mainTabsCurrentIndex === 6"></Reconciliation>
      </div>

      <div class="btns">
        <template v-if="mainTabsCurrentIndex === 1">
          <el-button plain>转办</el-button>
          <el-button type="primary" @click="mainTabsCurrentIndex = 2">沟通处理</el-button>
          <el-button type="primary" @click="mainTabsCurrentIndex = 4">定责</el-button>
        </template>
        <template v-else>
          <el-button plain @click="handleClose(mainTabsCurrentIndex)">取消</el-button>
          <el-button type="primary">存草稿</el-button>
          <el-button type="primary">提交</el-button>
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
      border-bottom: 2px solid transparent;
      .wrap {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        height: calc(100% - 2px);
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
                  bottom: -12px;
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
