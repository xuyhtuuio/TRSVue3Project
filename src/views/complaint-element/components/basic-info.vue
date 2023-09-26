<script setup>
import { ref } from 'vue'
import { personLabel } from '../data/basic-info.json'
const persionType = [
  { name: '易投诉客户', id: 1 },
  { name: '普通投诉客户', id: 2 },
  { name: '恶意投诉客户', id: 3 },
  { name: '特殊客户', id: 4 }
]

const personInfo = {
  name: '谭欣雨 ',
  sex: '女',
  age: '37',
  nation: '汉族',
  income: '50w',
  idType: '居民身份证',
  area: '北京',
  address: '北京',
  telePhone: '18871723241',
  messageAddress: '北京市海淀区拓尔思集团总部北京市海淀区拓尔思集团总部',
  workUnit: '北京市海淀区。。。。',
  job: '职务',
  culture: '文化程度',
  idTelePhone: '123440200010000304'
}
const historyInfo = [
  {
    id: 1,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 2,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 3,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 4,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 5,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 5,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 5,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  },
  {
    id: 5,
    type: 1,
    updateTime: '2023.09.11',
    content:
      '客户反馈礼品_商品_奖品_设备等没有收；客户反馈礼品_商品_奖品_设备等没有收到_收到有客户反馈礼品_商品_奖品_设备等没有收到_收到有...'
  }
]

const isShow = ref(false)
const showAllInfo = () => {
  isShow.value = true
}

const isShowTwo = ref(false)
const showAll = () => {
  isShowTwo.value = true
}
</script>

<template>
  <div class="basic-info">
    <div class="left bgc-white">
      <div class="title">
        <span class="text">基本信息</span>
        <span class="btn" @click="showAllInfo">全部 ></span>
      </div>
      <img src="@/assets/image/KYC.png" alt="" />
      <div class="left-type">
        <span v-for="item in persionType" :key="item.id" :class="['type', `type-${item.id}`]">
          {{ item.name }}
        </span>
      </div>
      <div class="person-type">
        <span class="item">姓名：{{ personInfo.name }}</span>
        <span class="item">收入情况：{{ personInfo.income }}</span>
        <span class="item">证件类型：{{ personInfo.idType }}</span>
        <span class="item">常住地：{{ personInfo.address }}</span>
        <span class="item">联系方式：{{ personInfo.telePhone }}</span>
        <span class="item ellipsis_2">通讯地址：{{ personInfo.messageAddress }}</span>
      </div>
    </div>
    <div class="right bgc-white">
      <div class="top">
        <div class="item">
          <span class="item-text">12</span>
          <span>累计投诉</span>
        </div>
        <div class="item">
          <span class="item-text">12</span>
          <span>重复投诉</span>
        </div>
        <div class="item">
          <span class="item-text high-risk">12</span>
          <span>高危投诉</span>
        </div>
        <div class="item">
          <span class="item-text">12</span>
          <span>客户报备事件</span>
        </div>
        <div class="item">
          <span class="item-text">12</span>
          <span>客户所属机构消保评分</span>
        </div>
      </div>

      <div class="center">
        <el-row :gutter="32">
          <el-col :span="8" v-for="item in 3" :key="item">
            <div class="center-title">诉求偏好</div>
            <div class="center-content">
              <div class="item" style="width: 50%">
                <span class="text">50%</span>
                <span class="pos">赔礼道歉</span>
                <span class="iconfont dot">&#xe60a;</span>
              </div>
              <div class="item" style="width: 30%">
                <span class="text">30%</span>
                <span class="pos">赔礼道歉</span>
                <span class="iconfont dot">&#xe60a;</span>
              </div>
              <div class="item" style="width: 20%">
                <span class="text">20%</span>
                <span class="pos">赔礼道歉</span>
                <span class="iconfont dot">&#xe60a;</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bottom">
        <div class="head flex">
          <span class="info">历史投诉</span>
          <span class="btn primary-color" @click="showAll" style="cursor: pointer">全部</span>
        </div>
        <div class="content">
          <div class="item" v-for="item in historyInfo" :key="item.id">
            <span class="item-content" :class="[item.type === 1 && 'green']">
              <span class="cirle"></span>{{ item.type === 1 ? '进行中' : '' }}</span
            >
            <span class="item-content updateTime">{{ item.updateTime }}</span>
            <span class="item-content info ellipsis">{{ item.content }}</span>
          </div>
        </div>
      </div>
      <div class="left-top">投诉画像</div>
    </div>

    <el-dialog v-model="isShow" :modal="false" width="800" modal-class="my-dialog">
      <template #header> <div class="title">基础信息</div> </template>
      <div class="content flex" style="width: 100%">
        <img class="img" src="@/assets/image/KYC.png" alt="" />
        <div class="left-type" style="width: 100%">
          <span v-for="item in persionType" :key="item.id" :class="['type', `type-${item.id}`]">
            {{ item.name }}
          </span>
        </div>
        <div class="person-type">
          <span
            class="item"
            :class="[item.isTwo && 'item-isTwo']"
            v-for="item in personLabel"
            :key="item.value"
          >
            <p class="label">{{ item.label }}</p>
            <p class="value" :class="[item.isTwo && 'my-ellipsis']">{{ personInfo[item.value] }}</p>
          </span>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="isShowTwo" :modal="false" width="800" modal-class="my-dialog">
      <template #header> <div class="title">历史投诉</div> </template>
      <div class="content-two" style="width: 100%" >
        <div class="item" v-for="item in 6" :key="item">
          <div class="title">
            <div class="left">
              <div class="status">进行中</div>
              <div class="info">工单：<span class="blue">20201017000845CC</span></div>
            </div>
            <div class="right">2023.09.11</div>
          </div>

          <div class="identy">
            <div class="identy-item active">客户反馈收取利息_违约金_短信费_手续费等</div>
            <div class="identy-item warn">投诉</div>
            <div class="identy-item active">客户反馈收取利息_违约金_短信费_手续费等</div>
            <div class="identy-item warn">投诉</div>
          </div>
          <div class="ellipsis_3">
            {{
              '2020年10月17日 何宇锋 通过95555电话咨询，历史< 否 >有退费记录，退费年月：____年__月。扣费期数< 是 >超过13期，记单时< 否 >给客户申请退费。在我行办理了**卡，被收取了*年*月——到*年*月共计**元，要求退还全部费用。 客户诉求是：客户之前是金卡现已降级在柜台查到不止13个月的扣费，要2020年10月17日 何宇锋 通过95555电话咨询，历史< 否 >有退费记录，退费年月：____年__月。扣费期数< 是 >超过13期，记单时<'
            }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
@color-1: #505968;
@color-blue: #5784ff;
@color-black-1: #1d2128;
.basic-info {
  display: flex;
  gap: 16px;
  color: #1d2128;
  & > .left {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 400px;
    padding: 16px 24px 26px;
    .title {
      display: flex;
      justify-content: space-between;
      line-height: 22px;
      .text {
        color: @color-1;
        font-weight: 700;
      }
      .btn {
        font-size: 12px;
        color: @common_primary_color;
        cursor: pointer;
      }
    }
    &-type {
      display: flex;
      gap: 8px;
      padding: 4px 0;
      .type {
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 4px;
        &-1 {
          color: #eb5757;
          background-color: #fff1f0;
        }
        &-2 {
          color: @common_primary_color;
          background-color: #f0f6ff;
        }
        &-3 {
          color: #fa8c16;
          background-color: #fffce8;
        }
        &-4 {
          color: #6a32c9;
          background-color: #f7f0fe;
        }
      }
    }
    .person-type {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .item {
        line-height: 20px;
        width: calc(50% - 5px);
        &:last-child {
          width: 100%;
        }
      }
    }
  }
  & > .right {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 16px 24px;
    .top {
      padding-top: 8px;
      display: flex;
      gap: 12px;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        &-text {
          font-size: 20px;
          line-height: 28px;
          font-weight: 700;
          color: @common_primary_color;
          &.high-risk {
            color: @common_error_color;
          }
        }
      }
    }
    .center {
      margin: 12px 0;
      height: 72px;
      border-radius: 6px;
      background-color: #f7f8fa;
      .el-row {
        height: 100%;
        padding: 12px 16px;
      }

      .center-title {
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        margin-bottom: 8px;
      }
      .center-content {
        display: flex;
        height: 20px;
        border-radius: 10px 0px 0px 10px;
        .item {
          position: relative;
          height: 100%;
          transition: all 0.5s;
          text-align: right;
          padding-right: 5px;
          .pos {
            position: absolute;
            z-index: 2;
            right: 0;
            top: -26px;
            background-color: #f7f8fa;
            opacity: 0;
          }
          .dot {
            position: absolute;
            right: 4px;
            top: -10px;
            font-size: 12px;
            transform: scale(0.6);
            transform-origin: center;
            opacity: 0;
          }
          .text {
            opacity: 0;
            color: #fff;
          }
          &:hover {
            z-index: 3;
            transform: scale(1.1);

            .dot,
            .pos,
            .text {
              opacity: 1;
            }
          }
          &:first-child {
            border-radius: 10px 0px 0px 10px;
            background-color: #80a6ff;
            .dot {
              color: #80a6ff;
            }
          }
          &:nth-child(2) {
            background-color: #a8c5ff;
            .dot {
              color: #a8c5ff;
            }
          }
          &:last-child {
            background-color: #d1e2ff;
            .dot {
              color: #d1e2ff;
            }
          }
        }
      }
    }
    .bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .head {
        justify-content: space-between;
        line-height: 22px;

        .info {
          font-weight: 700;
          color: @color-black-1;
        }
      }
      .content {
        flex: 1;
        overflow-y: scroll;
        .item {
          &:hover {
            cursor: pointer;
            background-color: #f7f8fa;
          }
          .item-content {
            &:first-child {
              display: flex;
              align-items: center;
              gap: 6px;
              .cirle {
                width: 4px;
                height: 4px;
                border-radius: 50%;
              }
            }
            &.green {
              color: #7eb712;
              .cirle {
                background-color: #7eb712;
              }
            }
          }

          display: flex;
          align-items: center;
          gap: 16px;
          height: 36px;
          line-height: 36px;
          border-radius: 6px;
          padding: 8px;
          .updateTime {
            color: #86909c;
          }
          .info {
            flex: 1;
            color: #1d2128;
          }
        }
      }
    }
    .left-top {
      position: absolute;
      top: 0;
      right: 0;
      width: 72px;
      height: 32px;
      line-height: 32px;
      background-color: @color-blue;
      border-radius: 0px 10px 0px 20px;
      text-align: center;
      color: #ffffff;
      font-weight: 700;
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
  .content {
    flex-direction: column;
    align-items: center;
    .img {
      width: 351px;
      height: 134px;
    }
    .type {
      margin: 24px 0;
    }
    .person-type {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 4px;
      .item {
        width: calc(calc(100% - 12px) / 4);
        font-size: 12px;
        line-height: 20px;
        .label {
          color: #505968;

          &::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #505968;
            line-height: 20px;
            vertical-align: middle;
            margin-right: 6px;
          }
        }
        .value {
          padding-left: 10px;
          height: 20px;
          font-weight: 700;
          color: @color-black-1;
        }
        &-isTwo {
          width: calc(calc(100% - 4px) / 2);
        }
      }
    }
  }

  .content-two {
    height: 400px;
    overflow-y: scroll;
    display: flex;
    gap: 16px;
    flex-direction: column;
    .item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      height: 140px;
      padding: 6px 13px;
      border: 1px solid #e5e6eb;
      border-radius: 6px;
      .title {
        display: flex;
        justify-content: space-between;
        line-height: 18px;
        font-size: 12px;
        width: 120%;
        transform: scale(0.83);
        transform-origin: center left;
        .left {
          display: flex;
          gap: 16px;
          .status {
            color: #389e0d;
            &::before {
              content: '';
              position: relative;
              top: -2px;
              display: inline-block;
              margin-right: 4px;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background-color: #389e0d;
              line-height: 18px;
            }
          }
          .info {
            .blue {
              color: @color-blue;
            }
          }
        }
        .right {
          color: #505968;
          font-size: 12px;
        }
      }

      .identy {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        &-item {
          font-size: 12px;
          height: 24px;
          line-height: 20px;
          padding: 2px 10px;
          border-radius: 4px;
          &.active {
            color: #2d5cf6;
            background-color: #f0f6ff;
          }
          &.warn {
            color: #fa8c16;
            background-color: #fffce8;
          }
        }
      }
    }
  }
}

:deep(.el-dialog) {
  max-height: 500px;
  overflow: hidden;
}












</style>
