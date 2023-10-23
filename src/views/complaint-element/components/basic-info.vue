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
    updateTime: '2023-06-01 18：15',
    complainId: '20230601000023',
    complainSource: '电话投诉',
    workId: '20201017000845CC',
    content:
      '投诉；电话渠道；因金融机构服务设施、设备、业务系统引起的投诉；核实原因，重新转账；情绪激动',
    content1:
      '来电反应：4月10日操作转账2万到其个人账户，款项汇出被对冲退回，原因“企业银行服务，待银行审核”。客户表示其是下午4点汇的，抱怨以前汇出都是实时到账的。客户提供了其对公账户户名：上海斌昇医疗科技中心，卡号开头是29尾号是7056。客户诉求是：要求5月15号帮其跟相关部门核实原因，并重新给客户转到其个人卡上。',
    keywords: [
      { label: '电话渠道', value: '1' },
      { label: '因金融机构服务设施、设备、业务系统引起的投诉', value: '2' },
      { label: '核实原因，重新转账', value: '2' },
      { label: '情绪激动', value: '3' }
    ],
    verifyProcess: [
      {
        name: '首次响应',
        content:
          '处理记录：尊敬的客户，您反映的投诉事项已进入投诉处理流程，后续会有工作人员与您联系，请您耐心等待。如需进一步沟通，可致电13300000105。'
      },
      {
        name: '调查核实',
        content:
          '经核查该客户的汇款记录，确实存在该记录，因该笔汇款金额较大，需行内工作人员审核，故为待审核状态。'
      }
    ]
  },
  {
    id: 2,
    type: 2,
    complainId: '20230528000023',
    workId: '20201017000845CC',
    updateTime: '2023-05-28 09：45',
    complainSource: '电话投诉',
    content: '信用卡投诉；电话渠道；因债务催收方式和手段引起的投诉；客户要求核实原因；情绪激动',
    content1:
      '来电反映：在天桥区天东小区附近的信用卡，信用卡使用5万余元，疫情困难多次找银行协商办理分期，银行不同意，让一次还钱，银行一直未给来电人打电话，银行打电话告知不还款要起诉或查封账户，向12345市民热线投诉，要求协商给予办理分期，接济南12345转办，客户要求协商还款。 ',
    keywords: [
      { label: '信用卡投诉', value: '1' },
      { label: '电话渠道', value: '1' },
      { label: '因债务催收方式和手段引起的投诉', value: '2' },
      { label: '客户要求核实原因', value: '2' },
      { label: '情绪激动', value: '3' }
    ],
    verifyProcess: [
      {
        name: '首次响应',
        content:
          '处理记录：尊敬的客户，您反映的投诉事项已进入投诉处理流程，后续会有工作人员与您联系，请您耐心等待。如需进一步沟通，可致电13300000105。'
      },
      {
        name: '调查核实',
        content: `
          调查情况：客户提供收入证明已核实所述情况，现有收入无法覆盖债务还款，但仍持有可出售财产，可弥补部分欠款。<br/>处理依据：《浙商银行客户投诉处理和监督评估办法》<br/>处理决定：协商还款`
      },
      {
        name: '回复客户',
        content: `
        尊敬的客户，您反映的投诉事项，我行高度重视，根据监管规范及我行投诉管理制度，已组织调查核实并作出处理决定，特发送短信予以告知，您可致电13300000090联系我行工作人员，了解投诉处理情况。如有需要，您可通过申请核查、调解、仲裁、诉讼等救济途径反馈诉求。感谢您对浙商银行提出的宝贵意见和建议`
      }
    ]
  },
  {
    id: 3,
    type: 1,
    complainId: '20230523000023',
    workId: '20201017000845CC',
    complainSource: '电话投诉',
    updateTime: '2023-05-23 12：24',
    content:
      '投诉；第三方渠道；因债务催收方式和手段引起的投诉；客户要求停止骚扰；转接领导；情绪激动；监管类；司法类',
    content1:
      '客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体、向相关监管部门投诉或寻求法律途径。',
    keywords: [
      { label: '电话渠道', value: '1' },
      { label: '因债务催收方式和手段引起的投诉', value: '2' },
      { label: '客户要求停止骚扰', value: '2' },
      { label: '转接领导', value: '2' },
      { label: '情绪激动；监管类；司法类', value: '3' }
    ],
    verifyProcess: [
      {
        name: '首次响应',
        content:
          '处理记录：尊敬的客户，您反映的投诉事项已进入投诉处理流程，后续会有工作人员与您联系，请您耐心等待。如需进一步沟通，可致电13300000105。'
      },
      {
        name: '调查核实',
        content: `
        调查情况：已核实催收部门进行处理<>
        处理依据：《浙商银行客户投诉处理和监督评估办法》
        处理决定：协商还款并停止催收`
      },
      {
        name: '回复客户',
        content: `
        尊敬的客户，您反映的投诉事项，我行高度重视，根据监管规范及我行投诉管理制度，已组织调查核实并作出处理决定，特发送短信予以告知，您可致电13300000090联系我行工作人员，了解投诉处理情况。如有需要，您可通过申请核查、调解、仲裁、诉讼等救济途径反馈诉求。感谢您对浙商银行提出的宝贵意见和建议`
      }
    ]
  },
  {
    id: 4,
    type: 1,
    complainId: '20230523000023',
    workId: '20201017000845CC',
    complainSource: '电话投诉',
    updateTime: '2023-05-23 12：24',
    content: '投诉；第三方渠道；因债务催收方式和手段引起的投诉；客户要求停止骚扰；',
    content1:
      '客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。要求银行立即停止对家人的骚扰。',
    keywords: [
      { label: '电话渠道', value: '1' },
      { label: '因债务催收方式和手段引起的投诉', value: '2' },
      { label: '客户要求停止骚扰', value: '2' }
    ],
    verifyProcess: [
      {
        name: '首次响应',
        content:
          '处理记录：尊敬的客户，您反映的投诉事项已进入投诉处理流程，后续会有工作人员与您联系，请您耐心等待。如需进一步沟通，可致电13300000105。'
      },
      {
        name: '调查核实',
        content: `
        已核实催收主管部门：核实该客户入催以来的催收情况，明确第三方催收公司的催收行为存在一定问题；并要求停止催收。`
      },
      {
        name: '回复客户',
        content: `
        尊敬的客户，您反映的投诉事项，我行高度重视，根据监管规范及我行投诉管理制度，已组织调查核实并作出处理决定，特发送短信予以告知，您可致电13300000090联系我行工作人员，了解投诉处理情况。如有需要，您可通过申请核查、调解、仲裁、诉讼等救济途径反馈诉求。感谢您对浙商银行提出的宝贵意见和建议`
      }
    ]
  }
]
const preferenceInfo = ref([
  {
    title: '诉求偏好',
    centerIndex: 0,
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
    centerIndex: 0,
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
    centerIndex: 0,
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
]).value

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

const opinionDialog = ref({
  isDialog: false,
  currentIndex: 0
}).value
const showHisDialog = (idx) => {
  opinionDialog.isDialog = true
  opinionDialog.currentIndex = idx
}

// 
const centerHover = (data,idy) => {
  if(data.centerIndex === idy) return
  data.centerIndex = idy
}
const centerLeave = (data) => {
  if(data.centerIndex !== 0) data.centerIndex = 0
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
                v-for="iten,indey in item.value"
                :class="[item.centerIndex===indey && 'hover']"
                :key="iten.value"
                @mouseover="centerHover(item,indey)"
                @mouseleave="centerLeave(item)"
                :style="{ width: iten.value }"
              >
                <span class="text">{{ iten.value }}</span>
                <span class="pos">{{ iten.label }}</span>
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
          <div
            class="item"
            v-for="(item, index) in historyInfo"
            :key="item.id"
            @click="showHisDialog(index)"
          >
            <span class="item-content" :class="[item.type === 1 ? 'green' : 'orange']">
              <span class="cirle"></span>{{ item.type === 1 ? '已结案' : '处理中' }}</span
            >
            <span class="item-content updateTime">{{ item.updateTime.split(' ')[0] }}</span>
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
              :class="[iten.value === '1' ? 'warn' : iten.value === '2' ? 'active' : 'error']"
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

    <el-dialog v-model="opinionDialog.isDialog" width="800" modal-class="my-dialog">
      <template #header> <div class="title">历史投诉</div> </template>
      <div class="info">
        <span>投诉编号：{{ historyInfo[opinionDialog.currentIndex].complainId }}</span>
        <span>投诉来源：{{ historyInfo[opinionDialog.currentIndex].complainSource }}</span>
        <span>投诉时间：{{ historyInfo[opinionDialog.currentIndex].updateTime }}</span>
        <span
          class="item-content"
          :class="[historyInfo[opinionDialog.currentIndex].type === 1 ? 'green' : 'orange']"
        >
          <span class="cirle"></span
          >{{ historyInfo[opinionDialog.currentIndex].type === 1 ? '已结案' : '处理中' }}</span
        >
      </div>
      <div class="header">
        {{ historyInfo[opinionDialog.currentIndex].content1 }}
      </div>
      <div class="identy opinion-identy">
        <span
          v-for="(iten, indey) in historyInfo[opinionDialog.currentIndex].keywords"
          :key="indey"
          class="identy-item"
          :class="[iten.value === '1' ? 'warn' : iten.value === '2' ? 'active' : 'error']"
        >
          {{ iten.label }}
        </span>
      </div>
      <div class="dialog-content">
        <div class="item">
          <div class="top">
            <div class="text">核实与处理</div>
            <span class="line"></span>
          </div>
          <div
            class="content-item"
            v-for="(item, index) in historyInfo[opinionDialog.currentIndex].verifyProcess"
            :key="index"
          >
            <span class="circle"></span>
            <span class="cnt-item">{{ item.name }}</span>
            <span class="cnt-item">{{ item.content }}</span>
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
            // background-color: #f7f8fa;
            opacity: 0;
            white-space :nowrap;
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
          // &:hover {
          //   z-index: 3;
          //   transform: scale(1.1);

          //   .dot,
          //   .pos,
          //   .text {
          //     opacity: 1;
          //   }
          // }
          &:first-child {
            border-radius: 10px 0px 0px 10px;
            background-color: #80a6ff;
            .dot {
              color: #80a6ff;
            }
            .dot,
            .pos,
            .text {
              opacity: 0;
            }
          }
          &.hover {
            z-index: 2;
            transform: scale(1.1);
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
                // width: 60px;
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
    }
  }

  .info {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
    font-size: 12px;
    color: #505968;
    .item-content {
      display: flex;
        align-items: center;
        gap: 6px;
      .cirle {
        width: 4px;
        height: 4px;
        border-radius: 50%;
      }
    }
  }
  .dialog-content {
    margin-top: 16px;
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
            margin-left: 8px;
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
    font-weight: 700;
    line-height: 22px;
    color: #1d2128;
  }
  .identy.opinion-identy {
    margin-top: 8px;
  }
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
    &.error {
      color: #eb5757;
      background-color: #fff1f0;
    }
  }
}
:deep(.el-dialog) {
  // max-height: 500px;
  overflow: hidden;
}
</style>
