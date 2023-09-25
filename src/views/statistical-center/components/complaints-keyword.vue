<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            各岗位投诉量
            <el-tooltip placement="top" content="展示过去三天的投诉关键词">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-keyword"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
onMounted(() => {
  initEcharts();
});

function initEcharts() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('my-keyword'));
  // 指定图表的配置项和数据
  const option = {
    series: [
      {
        type: 'wordCloud',
        silent: true,
        sizeRange: [12, 24], //  词典字体大小范围配置
        rotationRange: [0, 0], // 词典字体旋转角度配置，默认不旋转
        gridSize: 18, // 词典字体间距配置
        layoutAnimation: true, // 为false词典过度会阻塞
        textStyle: {
          // 词典样式配置
          color() {
            // 颜色随机渐变
            const colors = [
              '#F7BA1E',
              '#BBB7D9',
              '#B7DB57',
              '#249EFF',
              '#FA8C16',
            ]
            return colors[parseInt(Math.random() * 5)]
          }
        },
        // 渲染词典数据
        data: [
          // {
          //   value: '50', // 词典大小配置
          //   name: '场景化', // 词典名称配置
          //   textStyle: {
          //     // 单独配置某个词典样式
          //     shadowBlur: 4,
          //     shadowOffsetY: 14,
          //     color: '#BDBEFA'
          //   }
          // },
          { value: '398', name: '储蓄卡划扣' },
          { value: '189', name: 'e招贷还款' },
          { value: '629', name: 'atm存款' },
          { value: '290', name: '信用卡划扣' },
          { value: '7821', name: '储蓄卡销户' },
          { value: '30313', name: '贷款逾期' },
          { value: '3753', name: 'pos额度' },
          { value: '414', name: '车贷额度' },
          { value: '945', name: 'atm转账 ' },
          { value: '604', name: '贷款还款' },
          { value: '677', name: '信息不安全' },
          { value: '538', name: '信用卡开户' },
          { value: '561', name: '金葵花转账' },
          { value: '680', name: 'atm故障' },
          { value: '1001', name: 'atm取款' },
          { value: '4721', name: '信用卡逾期' },
          { value: '175', name: '储蓄卡年费' },
          { value: '235', name: '储蓄卡激活' },
          { value: '761', name: '储蓄卡积分' },
          { value: '987', name: '信用卡吞卡' },
          { value: '4560', name: '信用卡还款' },
          { value: '913', name: '储蓄卡开户' },
          { value: '290', name: '信用卡优惠' },
          { value: '376', name: '信用卡销户' }
        ]
      }
    ]
  }
  myChart.setOption(option);
}


</script>

<style lang="less" scoped>
.my-echart {
  width: 100%;
  height: 240px;
}
.mission-trends {
  height: 340px;
  margin-top: 16px;
  padding: 24px;
  border-radius: 10px;
  background: #FFF;
  .head {
    .left {
      display: flex;
    }
    .icon {
      width: 5px;
      height: 20px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background: #306EF5;
    }
    .content {
      margin: 0 8px;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
    }
  }
}
</style>
<style lang="less">
.charts-tooltip-p {
  text-align: left;
  min-width: 80px;
  color: '#505968';
  line-height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;

  &.black {
    color: #333;
  }

  .charts_span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #2D5CF6;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 8px;
  }

  .charts_num {
    margin-left: 6px;
  }

  // transform: scale(0.83);
  &.charts-tooltip-p {
    margin-top: 6px;
  }

  .charts-tooltip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }

  .serieName {
    display: inline-block;
    width: fit-content;
    padding-right: 15px;
  }

  .blue {
    color: #2D5CF6;
  }
  .yellow {
    color: #F7BA1E;
  }

  .bold {
    font-weight: bold;
    color: '#1D2128';
    display: inline-block;
    width: fit-content;
    padding-left: 15px;
  }
}

.charts-tooltip-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 300px;

  .w50 {
    width: 49%;
  }
}

.charts-tooltip-box-s {
  width: 220px;
}

.el-picker-panel__footer {
  display: none;
}
</style>
