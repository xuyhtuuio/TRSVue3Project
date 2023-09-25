<template>
  <div class="complaint-handling">
    <div class="handling bgc-white">
      <header class="header">
        <span class="iconfont" style="color: #306EF5">&#xe625;</span>
        投诉处理数
      </header>
      <main class="main  ">
        <div class="tab" v-for="item in mainTabs" :key="item.id"
          :class="[mainTabsCurrentIndex === item.id && mainTabsCurrentIndex !== 1 && 'active']"
          @click="handleTabToggle(item)">
          <div class="left">
            <div>
              <div class="icon">
                <span class="iconfont">{{ item.icon }}</span>
              </div>
              <p class="value">{{ item.value }}</p>
            </div>
            <p class="arrow">></p>
          </div>
          <div class="right">
            <p class="time">{{ item.time }}</p>
          </div>
        </div>

      </main>
    </div>
    <div class="content  bgc-white">
      <div>
        <div class="cnt-header"  v-show="mainTabsCurrentIndex !== 1">
          <span class="item">{{ mainTabs[mainTabsCurrentIndex-1].value }}</span>
          <span class="item">
            <span >处理人：</span>
            <img class="img" src="@/assets/image/ocr-avatar.png" alt="">
            <span class="name">谭欣雨</span>
            <span class="info">
              <i class="info-item">总行</i>
              <i class="info-item"> 投诉处理部门</i>
              <i class="info-item">投诉处理部门</i>
            </span>
          </span>
          <span class="item">更新时间： {{ mainTabs[mainTabsCurrentIndex-1].time  }} </span>
        </div>
        <CommunicationProcessing v-show="mainTabsCurrentIndex === 2"></CommunicationProcessing>
        <SettleCase v-show="mainTabsCurrentIndex === 3"></SettleCase>
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

<script setup>
import { ref } from 'vue';
import CommunicationProcessing from './communication-processing.vue'
import SettleCase from './settle-case.vue'
const mainTabs = [
  {id: 1,icon: '',time: '2020-01-05  18:08:58',value: '开始处理'},
  {id: 2,icon: '',time: '2020-01-05  18:08:58',value: '沟通处理'},
  {id: 3,icon: '',time: '2020-01-05  18:08:58',value: '结案'},
  {id: 4,icon: '',time: '2020-01-05  18:08:58',value: '定责'},
  {id: 5,icon: '',time: '2020-01-05  18:08:58',value: '补录'},
  {id: 6,icon: '',time: '2020-01-05  18:08:58',value: '和解'},
]
const mainTabsCurrentIndex = ref(1)
const handleTabToggle = ({id}) => {
  if(id === 1) return
  mainTabsCurrentIndex.value = id
}


const handleClose = (index) => {
  mainTabsCurrentIndex.value = index-1
}
</script>

<style lang="less" scoped>
.complaint-handling {
  font-size: 14px;
  
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
      padding: 12px 16px;
      border-radius: 6px;
      cursor: pointer;


      &:not(:first-child) {
        &:hover {
          // border-bottom: 1px solid #ccc;
        }
      }

      .left {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        line-height: 24px;

        &>div {
          display: flex;
          gap: 12px;
        }

        .icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(90deg, #7B61FF 0%, #61A0FF 107.5%);
        }


        .value {
          font-weight: 700;
          color: #1D2128;
        }

        .arrow {
          color: #86909C;
        }

        .iconfont {}
      }

      .right {


        .time {
          margin-left: 26px;
          width: 100%;
          line-height: 18px;
          font-size: 10px;
          transform: scale(0.83333);
          transform-origin: 0 0
        }
      }

      &.active {
        background: linear-gradient(90deg, #7B61FF 0%, #61A0FF 107.5%);
        position: relative;

        .left {
          .icon {
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
          bottom: -8px;
          width: 0;
          height: 0;
          border-right-width: 5px;
          border-left-width: 5px;
          border-top-width: 8px;
          border-style: solid;
          border-color: #707FFF transparent transparent transparent;

        }
      }

    }


  }

  .content {

    .cnt-header {
    
      padding: 24px 24px 16px;
      display: flex;
      border-bottom: 1px solid #E5E6EB;
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
            color: #1D2128;
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
                  margin-left:8px;
                }
              }
            }
          }
        &:first-child {
          margin-right: 32px;
          font-size: 16px;
          font-weight: 700;
          color: #1D2128;

          
          
        }
        &:nth-child(2) {
          height: 32px; 
          background-color: #F7F8FA;
          padding: 0 16px;
          border-radius: 40px;
        }
        &:last-child {
          margin-left: auto;
          color: #86909C;
        }
      }
    }
    .btns {
      display: flex;
      justify-content: center;
      padding: 24px 0;

      .el-button+.el-button {
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