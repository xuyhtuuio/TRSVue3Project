<script setup>
import { ref, computed } from 'vue'
const persionType = [
  { name: '易投诉客户', id: 1 },
  // { name: '普通投诉客户', id: 2 },
  // { name: '恶意投诉客户', id: 3 },
  { name: '特殊客户', id: 4 }
]

const props = defineProps({
  data: {
    typeof: Array,
    default: []
  }
})
// watch(
//   () => data,
//   (val) => {
//     console.log(val)
//   },
// )
const isLoading = computed(() => {
  return Boolean(!props.data.length)
})
const historyInfo = [
  {
    id: 1,
    type: 2,
    updateTime: '2023.06.01',
    workId: '20201017000845CC',
    content: '投诉；电话渠道；客户反馈无力还款_对催收方式不满_信息被泄露；客户要求转接领导；',
    content1:
      '客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。',
    keywords: [
      { label: '投诉', value: '1' },
      { label: '电话渠道', value: '1' },
      { label: '客户反馈无力还款_对催收方式不满_信息被泄露', value: '2' },
      { label: '客户要求转接领导', value: '2' }
    ]
  },
  {
    id: 2,
    type: 2,
    workId: '20201017000845CC',
    updateTime: '2023.05.28',
    content: '投诉；电话渠道；客户反馈无力还款_信息被泄露；客户要求停止催收；',
    content1:
      '客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体、向相关监管部门投诉或寻求法律途径。',
    keywords: [
      { label: '投诉', value: '1' },
      { label: '电话渠道', value: '1' },
      { label: '客户反馈无力还款_信息被泄露', value: '2' },
      { label: '客户要求停止催收', value: '2' }
    ]
  },
  {
    id: 3,
    type: 1,
    workId: '20201017000845CC',
    updateTime: '2023.05.23',
    content: '投诉；第三方渠道；客户反馈对催收方式不满_信息被泄露；客户要求加快处理；',
    content1:
      '客户因为疫情原因失去工作，无法偿还贷款。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体、向相关监管部门投诉或寻求法律途径。',
    keywords: [
      { label: '投诉', value: '1' },
      { label: '电话渠道', value: '1' },
      { label: '客户反馈对催收方式不满_信息被泄露', value: '2' },
      { label: '客户要求加快处理', value: '2' }
    ]
  },
  {
    id: 4,
    type: 1,
    workId: '20201017000845CC',
    updateTime: '2023.05.20',
    content: '投诉；第三方渠道；客户反馈对催收方式不满；客户要求停止催收；',
    content1:
      '客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体、向相关监管部门投诉或寻求法律途径。',
    keywords: [
      { label: '投诉', value: '1' },
      { label: '电话渠道', value: '1' },
      { label: '客户反馈对催收方式不满', value: '2' },
      { label: '客户要求停止催收', value: '2' }
    ]
  }
]
const preferenceInfo = [
  {
    title: '诉求偏好',
    value: [
      {
        label: '停止骚扰',
        value: '50%'
      },
      {
        label: '加快处理',
        value: '25%'
      },
      {
        label: '答复',
        value: '25%'
      }
    ]
  },
  {
    title: '渠道偏好',
    value: [
      {
        label: '电话渠道',
        value: '80%'
      },
      {
        label: '第三方',
        value: '20%'
      }
    ]
  },
  {
    title: '原因偏好',
    value: [
      {
        label: '债务催收方式和手段',
        value: '70%'
      },
      {
        label: '信息披露',
        value: '20%'
      },
      {
        label: '无力还款',
        value: '10%'
      }
    ]
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

const handleValue = (item) => {
  if (item.name === 'TimePicker') {
    console.log(item.value)
    return item.value.split(' ')[0] || '-'
  } else {
    return item.value || '-'
  }
}
</script>

<template>
  <div class="basic-info" v-loading="isLoading">
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
        <!-- <span class="item">姓名：{{ personInfo.name }}</span>
        <span class="item">收入情况：{{ personInfo.income }}</span>
        <span class="item">证件类型：{{ personInfo.idType }}</span>
        <span class="item">常住地：{{ personInfo.address }}</span>
        <span class="item">联系方式：{{ personInfo.telePhone }}</span>
        <span class="item">职业：{{ personInfo.job }}</span>
        <span class="item ellipsis_2">通讯地址：{{ personInfo.messageAddress }}</span> -->
        <span v-for="(item, index) in props.data.slice(0, 7)" :key="index" class="item">
          {{ item.title }}：{{ handleValue(item) }}
        </span>
      </div>
    </div>
    <div class="right bgc-white">
      <div class="top">
        <div class="item">
          <span class="item-text">4</span>
          <span>累计投诉</span>
        </div>
        <div class="item">
          <span class="item-text">2</span>
          <span>重复投诉</span>
        </div>
        <div class="item">
          <span class="item-text high-risk">0</span>
          <span>高危投诉</span>
        </div>
        <div class="item">
          <span class="item-text">0</span>
          <span>客户报备事件</span>
        </div>
        <div class="item">
          <span class="item-text">32</span>
          <span>客户所属机构消保评分</span>
        </div>
      </div>

      <div class="center">
        <el-row :gutter="32">
          <el-col :span="8" v-for="item in preferenceInfo" :key="item">
            <div class="center-title">{{ item.title }}</div>
            <div class="center-content">
              <div
                class="item"
                v-for="iten in item.value"
                :key="iten.value"
                :style="{ width: iten.value }"
              >
                <span class="text">{{ iten.value }}</span>
                <span class="pos my-ellipsis">{{ iten.label }}</span>
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
            <span class="item-content" :class="[item.type === 1 ? 'green' : 'orange']">
              <span class="cirle"></span>{{ item.type === 1 ? '已结案' : '处理中' }}</span
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
          <!-- <span
            class="item"
            :class="[item.isTwo && 'item-isTwo']"
            v-for="item in personLabel"
            :key="item.value"
          >
            <p class="label">{{ item.label }}</p>
            <p class="value" :class="[item.isTwo && 'my-ellipsis']">{{ personInfo[item.value] }}</p>
          </span> -->
          <span
            class="item"
            :class="[item.isTwo && 'item-isTwo']"
            v-for="(item, index) in props.data"
            :key="index"
          >
            <p class="label">{{ item.title }}</p>
            <p class="value" :class="[item.isTwo && 'my-ellipsis']">{{ handleValue(item) }}</p>
          </span>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="isShowTwo" :modal="false" width="800" modal-class="my-dialog">
      <template #header> <div class="title">历史投诉</div> </template>
      <div class="content-two" style="width: 100%">
        <div class="item" v-for="item in historyInfo" :key="item">
          <div class="title">
            <div class="left">
              <span class="status" :class="[item.type === 1 ? 'green' : 'orange']">
                <span class="cirle"></span>{{ item.type === 1 ? '已结案' : '处理中' }}</span
              >
              <!-- <div class="status">进行中</div> -->
              <div class="info">
                工单：<span class="blue">{{ item.workId }}</span>
              </div>
            </div>
            <div class="right">{{ item.updateTime }}</div>
          </div>

          <div class="identy">
            <div
              v-for="(iten, indey) in item.keywords"
              :key="indey"
              class="identy-item"
              :class="[iten.value === '1' ? 'warn' : 'active']"
            >
              {{ iten.label }}
            </div>
          </div>
          <div class="ellipsis_3">
            {{ item.content1 }}
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

    .person-type {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .item {
        line-height: 20px;
        width: calc(50% - 5px);
        // &:last-child {
        //   width: 100%;
        // }
      }
    }
  }
  .left-type {
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
            width: 50px;
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
            z-index: 2;
            transform: scale(1.1);
            border-radius: 10px 0px 0px 10px;
            background-color: #80a6ff;
            .dot {
              color: #80a6ff;
            }
            .dot,
            .pos,
            .text {
              opacity: 1;
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
            &:hover {
              .pos {
                width: 60px;
              }
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
            &.orange {
              color: #fa8c16;
              .cirle {
                background-color: #fa8c16;
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
      width: 100%;
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
            &.orange {
              color: #fa8c16;
              &::before {
                background-color: #fa8c16;
              }
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
