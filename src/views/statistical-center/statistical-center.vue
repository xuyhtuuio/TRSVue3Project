<template>
  <div class="statistical">
    <div class="filter">
      <div class="select-item">
        <span>选择机构</span>
        <el-select v-model="search.institution" placeholder="请选择机构" @change="searchList" clearable>
          <el-option v-for="(item, index) in institutionList" :key="index" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="select-item">
        <span>投诉时间</span>
        <el-date-picker
          style="width: 256px;"
          v-model="startDate"
          type="daterange"
          @change="searchList"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </div>
      <div class="buttons">
        <el-button type="primary">
          <!-- <el-icon :size="20" class="no-inherit">
            <Refresh />
          </el-icon> -->
          重置</el-button>
        <el-button type="primary">导出数据</el-button>
      </div>
    </div>
    <div class="apply-center-box">
      <div class="data-statistics">
        <div v-for="(item, index) in dataStatistics" :key="index" class="data-statistics-item">
          <div class="item-top">
            <div class="icon">
              <img :src="item.icon" class="default-icon" />
            </div>
            <div class="name-count">
              <span class="name">
                {{ item.name }}
                <el-tooltip placement="top" :content="item.tooltip">
                  <i class="iconfont icon-tishi1 top-icon">？</i>
                </el-tooltip>
              </span>
              <span class="count" :style="{ color: item.color }"><i>{{ item.count }}</i></span>
            </div>
          </div>
          <div class="footer">
            <span class="first">年同比</span>
            <span class="second">{{ item.rate }}</span>
            <span class="third">
              <img :src="item.increase" class="default-icon" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <!-- 近一年投诉发生量趋势 -->
    <div class="row">
      <ComplaintsLine style="width: 70%"/>
      <ComplaintsRadar style="width: 30%"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Img1 from '@/assets/image/statistical/投诉发生量.svg';
import Img2 from '@/assets/image/statistical/重要渠道投诉发生量.svg';
import Img3 from '@/assets/image/statistical/投诉发生率.svg';
import Img4 from '@/assets/image/statistical/升级投诉量.svg';
import arrowUp from '@/assets/image/statistical/arrow-up.svg';
import arrowDown from '@/assets/image/statistical/arrow-down.svg';
import ComplaintsLine from './components/complaints-line.vue';
import ComplaintsRadar from './components/complaints-radar.vue';

onMounted(() => {

});
const search = reactive({
  institution: ''
});
const startDate = ref('');
const institutionList = reactive([
  {
    label: '研发部',
    value: '研发部'
  },
  {
    label: '财务部',
    value: '财务部'
  }
]);
const searchList = () => {

};

const dataStatistics = reactive([
  {
    name: '投诉发生量',
    count: 570599,
    color: '#EB5757',
    rate: '14%',
    tooltip: '客户投诉的建工单总数',
    increase: arrowUp,
    icon: Img1
  },
  {
    name: '重要渠道投诉发生量',
    count: 25275,
    color: '#FFA940',
    rate: '-18%',
    tooltip: '我行转办、直接受理等重要渠道的接收的客户投诉量',
    increase: arrowDown,
    icon: Img2
  },
  {
    name: '投诉发生率',
    count: '3258 ppm',
    color: '#2D5CF6',
    rate: '4%',
    tooltip: '全行投诉发生量/全行所有客户数量（单位：ppm）的比值',
    increase: arrowDown,
    icon: Img3
  },
  {
    name: '升级投诉量',
    color: '#2D5CF6',
    count: 6048,
    rate: '7%',
    tooltip: '',
    increase: arrowDown,
    icon: Img4
  },
]);
</script>

<style scoped lang="less">
.statistical {
  position: relative;
  padding: 24px 80px;
}
.filter {
  display: flex;
  .buttons {
    position: absolute;
    right: 80px;
  }
}
.select-item {
  margin-right: 16px;
  display: flex;
  align-items: center;

  .el-input,
  .el-date-editor {
    width: 100%;
  }

  span {
    color: #86909c;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    word-break: keep-all;
    margin-right: 8px;
  }
}
.apply-center-box {
  padding: 24px 0;
}

.data-statistics {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;

  &-item {
    width: 308px;
    margin-right: 24px;
    padding: 12px;
    padding-left: 24px;
    background: #FFFFFF;
    border-radius: 10px;
    &:last-child {
      margin-right: 0;
    }
    .item-top {
      display: flex;
      .icon {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background: #f2f3f5;
        margin-right: 12px;
        position: relative;

        img {
          width: 36px;
          height: 36px;
        }

        .active-icon,
        .default-icon {
          position: absolute;
          top: 8px;
          left: 8px;
        }
      }
      .name-count {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        color: #505968;
        display: flex;
        flex-direction: column;

        .name {
          margin-bottom: 8px;
          word-break: keep-all;
        }

        .count {
          color: #1d2128;
          word-break: keep-all;
          display: flex;
          flex-wrap: nowrap;
          align-items: flex-end;

          i {
            font-weight: 700;
            line-height: 28px;
            font-size: 20px;
            margin-right: 8px;
          }
        }
      }
    }
    .footer {
      margin-top: 16px;
      .first {
        display: inline-block;
        width: 64px;
      }
      .second {
        margin: 0 8px;
        font-weight: 700;
      }
    }
  }

  .new-apply {
    width: 120px !important;

    img {
      margin-bottom: 8px;
      width: 32px;
      height: 32px;
    }

    margin-right: 0;
    display: flex;
    padding: 6px 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    color: #2d5cf6;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    /* 157.143% */
  }

  .new-apply:hover {
    background: linear-gradient(90deg,
        rgba(123, 97, 255, 0.07) 0%,
        rgba(97, 160, 255, 0.07) 100%);

    img {
      transform: scale(1.2);
      transition: all 0.2s ease;
      margin-bottom: 8px;
    }
  }
}
.row {
  display: flex;
}
</style>
