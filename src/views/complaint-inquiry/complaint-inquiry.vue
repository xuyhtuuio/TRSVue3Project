<template>
  <div class="complaint">
    <div class="type-tab">
      <div class="tab-item" :class="{ 'tab-active': activeTab === '投诉查询' }">
        <div class="item-title" @click="changeTab('投诉查询')">投诉查询</div>
        <div class="item-line"></div>
      </div>
      <div class="tab-item" :class="{ 'tab-active': activeTab === '多维报表' }">
        <div class="item-title" @click="changeTab('多维报表')">多维报表</div>
        <div class="item-line"></div>
      </div>
    </div>
    <inquiry-list v-if="activeTab === '投诉查询'"></inquiry-list>
    <div class="tab-body" v-if="activeTab === '多维报表'">
      <div class="type-show">
        <div class="type-icon"></div>
        <div class="type-tip">监管报表</div>
      </div>
      <div class="enter-body">
        <div class="enter-item" @click="toPath(item)" v-for="(item, index) in typeIocnList" :key="'icon' + index">
          <img :src="item.url" alt="" />
          <div class="enter-tip">{{ item.name }}</div>
        </div>
      </div>
      <div class="type-show">
        <div class="type-icon"></div>
        <div class="type-tip">行内报表</div>
      </div>
      <div class="enter-body">
        <div
          class="enter-item enter-item-not-allow"
          :class="{ 'enter-item-none': item.name === '' }"
          v-for="(item, index) in typeImgList"
          :key="'icon' + index"
        >
          <img :src="item.url" alt="" />
          <div class="enter-tip">{{ item.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import icon1 from '@/assets/image/complaint-inquiry/icon1.png'
import icon2 from '@/assets/image/complaint-inquiry/icon2.png'
import icon3 from '@/assets/image/complaint-inquiry/icon3.png'
import icon4 from '@/assets/image/complaint-inquiry/icon4.png'
import icon5 from '@/assets/image/complaint-inquiry/icon5.png'
import icon6 from '@/assets/image/complaint-inquiry/icon6.png'

import img1 from '@/assets/image/complaint-inquiry/img1.png'
import img2 from '@/assets/image/complaint-inquiry/img2.png'
import img3 from '@/assets/image/complaint-inquiry/img3.png'
import img4 from '@/assets/image/complaint-inquiry/img4.png'
import img5 from '@/assets/image/complaint-inquiry/img5.png'
import img6 from '@/assets/image/complaint-inquiry/img6.png'
import img7 from '@/assets/image/complaint-inquiry/img7.png'
import img8 from '@/assets/image/complaint-inquiry/img8.png'
import img9 from '@/assets/image/complaint-inquiry/img9.png'
import img10 from '@/assets/image/complaint-inquiry/img10.png'
import img11 from '@/assets/image/complaint-inquiry/img11.png'
import img12 from '@/assets/image/complaint-inquiry/img12.png'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

import InquiryList from './inquiry-list.vue'
let activeTab = ref('投诉查询')
let changeTab = (type) => {
  activeTab.value = type
}

let typeIocnList = reactive([
  {
    name: '投诉业务办理渠道报表（按地区）',
    url: icon1,
    path: 'form-handle'
  },
  {
    name: '投诉业务类别报表（按地区）',
    url: icon2,
    path: 'complaint-type-area'
  },
  {
    name: '投诉原因报表（按地区）',
    url: icon3,
    path: ''
  },
  {
    name: '投诉业务办理渠道报表（按分行）',
    url: icon4,
    path: 'form-handle-branch'
  },
  {
    name: '投诉业务类别报表（按分行）',
    url: icon5,
    path: ''
  },
  {
    name: '投诉原因报表（按分行）',
    url: icon6,
    path: ''
  }
])
let typeImgList = reactive([
  {
    name: '客户投诉台账',
    url: img1,
    path: ''
  },
  {
    name: '表扬报表',
    url: img2,
    path: ''
  },
  {
    name: '监管来源（重要来源）统计表',
    url: img3,
    path: ''
  },
  {
    name: '投诉处理时效汇总',
    url: img4,
    path: ''
  },
  {
    name: '按业务条线岗位统计投诉分析表',
    url: img5,
    path: ''
  },
  {
    name: '非零售客户投诉',
    url: img6,
    path: ''
  },
  {
    name: '零售客户投诉',
    url: img7,
    path: ''
  },
  {
    name: '投诉发生率',
    url: img8,
    path: ''
  },
  {
    name: '转办超三次预警表',
    url: img9,
    path: ''
  },
  {
    name: '监管来源（重要来源）投诉处理时效汇总',
    url: img10,
    path: ''
  },
  {
    name: '首次响应超时投诉',
    url: img11,
    path: ''
  },
  {
    name: '处理完成超时投诉',
    url: img12,
    path: ''
  },
  {
    name: '',
    url: img12,
    path: ''
  },
  {
    name: '',
    url: img12,
    path: ''
  },
  {
    name: '',
    url: img12,
    path: ''
  }
])
const router = useRouter();
const toPath = (item) => {
  router.push(item.path);
}
</script>

<style scoped lang="less">
.complaint {
  border-radius: 10px;
  background: #fff;
  padding: 24px;
  .type-tab {
    display: flex;
    align-items: center;
    height: 28px;
    margin-bottom: 16px;
    .tab-item {
      margin-right: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .item-title {
        color: #505968;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 22px;
      }
      .item-line {
        height: 2px;
        width: 100%;
        border-radius: 2px;
        background: transparent;
        margin-top: 4px;
      }
    }
    .tab-active {
      .item-title {
        color: #2d5cf6;
      }
      .item-line {
        background: #2d5cf6;
      }
    }
  }
  .tab-body {
    .type-show {
      display: flex;
      align-items: center;
      height: 22px;
      margin-bottom: 16px;
      .type-icon {
        width: 5px;
        height: 18px;
        margin-right: 8px;
        border-radius: 0px 10px;
        background: #306ef5;
      }
      .type-tip {
        color: #1d2128;
        font-size: 14px;
        font-weight: 700;
        line-height: 22px;
      }
    }
    .enter-body {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .enter-item {
        width: 19%;
        margin: 0 0.5%;
        height: 100px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        background: linear-gradient(0deg, #fafafa 0%, #fafafa 100%),
          linear-gradient(0deg, #f0f6ff 0%, #f0f6ff 100%), #fafafa;
        cursor: pointer;
        img {
          width: 32px;
          height: 32px;
          margin-bottom: 12px;
        }
        .enter-tip {
          color: rgba(80, 89, 104, 1);
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: 20px;
          text-align: center;
        }
      }
      .enter-item-none {
        opacity: 0;
        cursor: default;
      }
      .enter-item-not-allow {
        cursor: not-allowed;
      }
    }
  }
}
</style>
