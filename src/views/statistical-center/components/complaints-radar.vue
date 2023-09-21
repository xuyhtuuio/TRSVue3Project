<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            投诉处理指标
            <el-tooltip placement="top" content="全行投诉处理过程中的处理时效，满意度等情况进行实时统计，形成结果评价指标">
              <i class="iconfont icon-tishi1 top-icon">？</i>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="radar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
onMounted(() => {
  initEcharts([100, 100, 100, 95, 25]);
});
// 雷达图
function initEcharts(values) {
  const chartDom = document.getElementById('radar');
  const chart = echarts.init(chartDom);
  const option = {
    radar: {
      // shape: 'circle',
      radius: '50%',
      splitNumber: 4,
      axisLabel: {
        show: true,
        showMinLabel: false,
        // padding: 4,
        // backgroundColor: '#FFFFFF',
        // shadowColor: 'rgba(84, 110, 122)',
        // borderRadius: 1
      },
      indicator: [
        { name: '一次办结率', max: 100, value: values[0] },
        { name: '按时响应率', max: 100, value: values[1],axisLabel:{show:false} },
        { name: '有效转办率', max: 100, value: values[2],axisLabel:{show:false} },
        { name: '按时反馈率', max: 100, value: values[3],axisLabel:{show:false} },
        { name: '满意度', max: 100, value: values[4],axisLabel:{show:false} }
      ],
      axisName: { // 指示器样式
        color: '#505968', // 指示器的文字颜色
        lineHeight: 16, // 指示器行高
        formatter(a, b) {
          return a + `\n {a|${b.value}%}`;
        },
        rich: {
          a: {
            color: '#FFFFFF',
            padding: [4, 8],
            borderRadius: 6,
            fontSize: 12,
            backgroundColor: '#2D5CF6',
            lineHeight: 24,
            fontWeight: 700,
            align: 'center'
          }
        }
      },
    },
    series: [
      {
        name: '',
        type: 'radar',
        data: [
          {
            symbol: 'circle',
            symbolSize: 6,
            value: values,
            name: '',
            areaStyle: {
              color: 'rgba(45, 92, 246, 0.4)'
            }
          }
        ]
      }
    ]
  };
  chart.setOption(option, true);
  }


</script>

<style lang="less" scoped>
.my-echart {
  width: 100%;
  height: 400px;
}
.mission-trends {
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

