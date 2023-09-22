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

      <div class="center"></div>
      <div class="bottom">
        <div class="head flex">
          <span class="info">历史投诉</span>
          <span class="btn primary-color">全部</span>
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
  </div>
</template>

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
</script>

<style lang="less" scoped>
@color-1: #505968;
@color-blue: #5784ff;
@color-black-1: #1d2128;
.basic-info {
  display: flex;
  gap: 16px;
  color: #1d2128;
  .left {
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
  .right {
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
}


</style>