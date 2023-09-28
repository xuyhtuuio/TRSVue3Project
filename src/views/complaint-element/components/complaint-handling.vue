<script setup>
import { ref, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

import CommunicationProcessing from './communication-processing.vue'
import SettleCase from './settle-case.vue'
import FixResponsibility from './fix-responsibility.vue'
import AdditionalRecording from './additional-recording.vue'
import Reconciliation from './reconciliation.vue'
import dayjs from 'dayjs'
const mainTabs = reactive([
  {
    id: 1,
    icon: 'icon-xianxingtubiao1',
    time: '2023-06-01 18:15:13',
    value: '开始处理',
    isActive: true
  },
  {
    id: 2,
    icon: 'icon-xianxingtubiao-1',
    time: '2023-06-01 18:15:13',
    value: '沟通处理',
    isActive: true,
    refEl: null,
    isShowSave: true
  },
  {
    id: 3,
    icon: 'icon-xianxingtubiao2',
    time: '2023-06-01 18:15:13',
    value: '定责',
    isActive: true,
    isShowSave: true
  },
  {
    id: 4,
    icon: 'icon-Vector-11',
    time: '2023-06-01 18:15:13',
    value: '结案',
    isActive: false,
    isShowSave: true
  },
  {
    id: 5,
    icon: 'icon-Vector-1',
    time: '',
    value: '补录',
    isActive: false,
    isShowSave: true
  },
  {
    id: 6,
    icon: 'icon-Vector-2',
    time: '',
    value: '和解',
    isActive: false,
    isShowSave: true
  }
])
const mainTabsCurrentIndex = ref(0)
const emits = defineEmits(['changeShow'])
const handleTabToggle = (idx) => {
  emits('changeShow', idx === 1 ? true : false)
  if (idx === 0) return
  mainTabsCurrentIndex.value = idx
}

const saveDraft = () => {
  ElMessage({
    type: 'success',
    message: '保存草稿成功'
  })
}

const handling = ref()
const refList = [ref(), ref(), ref(), ref(), ref(), ref()]
// 取消
const handleClose = () => {
  // mainTabsCurrentIndex.value = index - 1
}

const submit = async (idx) => {
  await nextTick()
  refList[idx].value.CheckRule().then((data) => {
    mainTabs[idx].isShowSave = false
    mainTabs[idx].isActive = true
    mainTabs[idx].data = data
    if (idx !== 3) {
      ElMessage({
        type: 'success',
        message: '提交成功'
      })
    } else {
      ElMessage({
        type: 'success',
        message: '已结案成功，系统已自动为您生成投诉处理意见书'
      })
    }

    mainTabs[idx].time = dayjs().format('YYYY-MM-DD HH：mm：ss')
    if (idx !== 5 && idx !== 3) {
      handleTabToggle(idx + 1)
    }
    rollTo()
    //
    if (idx <= 2) {
      mainTabs[3].isActive = true
    } else if (idx === 3) {
      mainTabs[4].isActive = true
      mainTabs[5].isActive = true
    }
  })
}

function rollTo() {
  document.querySelector('.complaint-handling').scrollIntoView()
}

const opinionDialog = reactive({
  isDialog: false
})
const showOpinionBookDialog = () => {
  opinionDialog.isDialog = true
}
</script>

<template>
  <div
    class="complaint-handling"
    :class="[
      (mainTabsCurrentIndex === 0 ||
        (mainTabsCurrentIndex === 3 && !mainTabs[mainTabsCurrentIndex].isShowSave)) &&
        'active'
    ]"
  >
    <div class="handling bgc-white" ref="handling">
      <header class="header">
        <span class="iconfont" style="color: #306ef5">&#xe625;</span>
        投诉处理树
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
        <div
          class="cnt-header"
          v-show="
            (mainTabsCurrentIndex === 3 && mainTabs[mainTabsCurrentIndex].isShowSave) ||
            (mainTabsCurrentIndex !== 0 && mainTabsCurrentIndex !== 3)
          "
        >
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
          :ref="refList[1]"
        ></CommunicationProcessing>
        <FixResponsibility
          v-show="mainTabsCurrentIndex === 2"
          :ref="refList[2]"
        ></FixResponsibility>
        <SettleCase
          v-show="mainTabsCurrentIndex === 3 && mainTabs[mainTabsCurrentIndex].isShowSave"
          :ref="refList[3]"
        ></SettleCase>
        <AdditionalRecording
          v-show="mainTabsCurrentIndex === 4"
          :ref="refList[4]"
        ></AdditionalRecording>
        <Reconciliation v-show="mainTabsCurrentIndex === 5" :ref="refList[5]"></Reconciliation>
      </div>

      <div class="btns">
        <template v-if="mainTabsCurrentIndex === 0">
          <el-button plain>转办</el-button>
          <el-button type="primary" @click="mainTabsCurrentIndex = 1">沟通处理</el-button>
          <el-button type="primary" @click="mainTabsCurrentIndex = 2">定责</el-button>
        </template>
        <template v-else>
          <template v-if="mainTabsCurrentIndex !== 3">
            <div v-show="mainTabs[mainTabsCurrentIndex].isShowSave">
              <el-button plain @click="handleClose(mainTabsCurrentIndex)">取消</el-button>
              <el-button type="primary" @click="saveDraft(mainTabsCurrentIndex)">存草稿</el-button>
              <el-button type="primary" @click="submit(mainTabsCurrentIndex)">提交</el-button>
            </div>
          </template>
          <template v-if="mainTabsCurrentIndex === 3">
            <div v-if="mainTabs[mainTabsCurrentIndex].isShowSave">
              <el-button plain @click="handleClose(mainTabsCurrentIndex)">取消</el-button>
              <el-button type="primary" @click="saveDraft(mainTabsCurrentIndex)">存草稿</el-button>
              <el-button type="primary" @click="submit(mainTabsCurrentIndex)">提交</el-button>
            </div>
            <div v-else>
              <el-button plain @click="handleTabToggle(4)">补录</el-button>
              <el-button plain @click="handleTabToggle(5)">和解</el-button>
              <el-button type="primary" @click="showOpinionBookDialog"
                >查看投诉处理意见书</el-button
              >
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>

  <el-dialog v-model="opinionDialog.isDialog" :modal="false" width="800" modal-class="my-dialog">
    <template #header> <div class="title">投诉处理意见书</div> </template>

    <div class="header">
      针对该笔投诉，消费者权益保护中心/办公室
      经过与内部相关部门调查核实，并在5个工作日内回复客户，与客户协商达成一致后，给出以下处理意见：
    </div>
    <div class="dialog-content">
      <div class="item" v-if="mainTabs[1].data">
        <div class="top">
          <div class="text">核实与处理</div>
          <span class="line"></span>
        </div>
        <div class="content-item" v-for="(item, index) in mainTabs[1].data[0].res" :key="index">
          <span class="circle"></span>
          <span class="cnt-item">{{ item.message }}</span>
          <span class="cnt-item">{{ item.org }}</span>
          <span class="cnt-item my-ellipsis ellipsis_1">{{ item.record }}</span>
        </div>
      </div>
      <div class="item">
        <div class="top">
          <div class="text">结案</div>
          <span class="line"></span>
        </div>
        <div class="content-item my-item">
          <div class="item-content">
            <span class="desc">结案描述： </span>
            <span class="main">{{ mainTabs[3].data.textarea }}</span>
          </div>
          <div class="item-content">
            <span class="desc">主要措施： </span>
            <div class="main">
              <span v-for="item in mainTabs[3].data.isExist" :key="item">{{ item }}</span>
            </div>
          </div>
          <div class="item-content">
            <span class="desc">客户满意度： </span>
            <span class="main">{{ mainTabs[3].data.satisfaction }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" style="text-align: right">
      <p>消费者权益保护中心</p>
      <p>2021-09-08 12：20：30</p>
    </div>
  </el-dialog>
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

.my-dialog {
  .el-dialog__header {
    line-height: 24px;
    .title {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
  }

  .dialog-content {
    margin: 0 40px;
    padding: 16px;
    border-radius: 6px;
    background: #f7f8fa;
    color: rgba(29, 33, 40, 1);
    .item {
      .top {
        display: flex;
        gap: 8px;
        line-height: 20px;
        .text {
          &::before {
            display: inline-block;
            width: 8px;
            height: 10px;
            content: '';
            margin-right: 8px;
            background: url(/src/assets/image/arrow.png);
            /* background-position: right; */
            background-size: contain;
          }
        }
        .line {
          flex: 1;
          position: relative;
          top: 10px;
          height: 0px;
          border-bottom: 1px dotted #a8c5ff;
        }
      }

      .content-item {
        margin-top: 8px;
        padding: 8px 16px;
        display: flex;
        gap: 8px;
        align-items: center;
        &.my-item {
          flex-direction: column;
        }
        .circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid #2d5cf6;
          background-color: #d1e2ff;
        }
        .cnt-item {
          &:nth-of-type(2) {
            color: #2d5cf6;
          }
          &:last-child {
            flex: 1;
            display: block;
          }
        }
      }
      .item-content {
        width: 100%;
        display: flex;
        line-height: 22px;
        gap: 8px;
        width: 100%;
        .desc {
          flex-shrink: 0;
        }
        .main {
          flex: 1;
          word-break: break-all;
          display: flex;
          gap: 8px;
        }
      }

      &:not(:first-child) {
        margin-top: 16px;
      }
    }
  }

  .header {
    text-indent: 2em;
    margin: -10px 40px 16px;
  }

  .bottom {
    margin: 16px 40px 0;
  }
}
</style>
