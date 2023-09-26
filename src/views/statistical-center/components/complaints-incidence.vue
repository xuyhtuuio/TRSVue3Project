<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            各客群投诉发生率对比分析
            <el-tooltip placement="top" content="不同持卡(普卡、金卡、金葵花等)客户投诉发生率">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-incidence"></div>
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
  const myChart = echarts.init(document.getElementById('my-incidence'));
  // 指定图表的配置项和数据
  const zData = ['普卡', '金卡', '金葵花', '钻石', '私人银行', '其他'];
  const lc = [23, 15.6, 4.3, 0.6, 0.7, 8];
  const option = {
    // backgroundColor: "#001736",
    tooltip: {
      show: true,
      align: 'center',
      trigger: "axis",
      backgroundColor: 'rgba(17,95,182,0.5)', //设置背景颜色
      textStyle: {
        color: '#fff',
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 11, 34, .2)',
        },
      },
      formatter: '{b}：{c}ppm',
    },
    grid: {
      right: '4%',
      top: '18%',
      left: '2%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: zData,
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        //	margin:15,
        textStyle: {
          color: '#1D2128',
          fontStyle: 'normal',
          fontSize: 12,
          align: 'center',
        },
      },
      axisTick: {
        //坐标轴刻度相关设置。
        show: false,
      },
      axisLine: {
        //坐标轴轴线相关设置
        lineStyle: {
          color: 'white',
        },
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：ppm',
        position:'right',
        splitNumber: 5,
        axisLabel: {
          textStyle: {
            color: 'white',
            fontStyle: 'normal',
            fontSize: 12,
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#86909C',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#F3F3F5',
            type: 'solid',
          },
        },
      },
    ],
    series: [
      {
        type: 'pictorialBar',
        stack: '数量',
        barWidth: '66%',
        // symbolOffset: [10, 0],
        label: {
          normal: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },
          },
        },
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color:  '#A8C5FF', // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: '#A8C5FF', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            }, //渐变颜色
            borderColor: '#A8C5FF',
            borderWidth: 0,
          },
        },
        symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
        data: lc,
      },
    ],
  };
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
