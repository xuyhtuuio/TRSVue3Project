<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            审查任务趋势
            <el-tooltip placement="top" content="全行范围内因对我行业务或服务不满的客户提出诉求的发生量及重要渠道发生量">
              <i class="iconfont icon-tishi1 top-icon">？</i>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-chart1"></div>
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
  const myChart = echarts.init(document.getElementById('my-chart1'));
  // 指定图表的配置项和数据
  const option = {
    grid: {
      bottom: 80
    },
    tooltip : {
      backgroundColor: 'rgba(255,255,255,0.8)',
      trigger: 'axis',
      formatter: (serie) => {
        let params = `<p><b>${serie[0].axisValueLabel}</b></p>`;
        params += `<p class="charts-tooltip-p fontw black"><span class="serieName"><span class="charts-tooltip-dot" style="background: #F7BA1E;"></span>重要渠道投诉量</span><span><span class="yellow">${serie[1].data}</span></span></p>`;
        params += `<p class="charts-tooltip-p black"><span class="serieName"><span class="charts-tooltip-dot" style="background: #5773F9;"></span> 全行投诉量</span><span class="blue">${serie[0].data}</span></p>`;
        return params;
      },
      axisPointer: {
        type: 'cross',
        animation: false
      }
    },
    legend: {
      data:['全行投诉量','重要渠道投诉量'],
      bottom: '10'
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        axisLine: {onZero: false},
        data : new Array(45).fill(1).map(function (str, index) {
                return str + index;
            })
      }
    ],
    yAxis: [
      {
        name: '全行投诉量',
        type: 'value',
        max: 40000,
        axisLine: {
          lineStyle: {
            color: '#88909B'    
          }
        }
      },
      {
        name: '重要渠道投诉量',
        nameLocation: 'start',
        max: 8000,
        type: 'value',
        inverse: true,
        axisLine: {
          lineStyle: {
            color: '#88909B'
          }
        }
      }
    ],
    series: [
      {
        name:'全行投诉量',
        type:'line',
        symbol: 'none',
        hoverAnimation: false,
        areaStyle: {
          normal: {}
        },
        lineStyle: {
          normal: {
            width: 1
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(55, 128, 243, 0.10)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ]), // 背景渐变色
            lineStyle: {
              // 系列级个性化折线样式
              color: '#2D5CF6'
            }
          }
        },
        smooth: true,
        data:[
          3848,2080,6656,3796,22672,5928,3640,29120,5252,8840,5408,13000,7852,1040,
          10608,5980,1664,9412,5668,2392,8424,6084,2340,7592,6136,2288,7384,6396,3276,
          7020,7072,2600,6656,7228,2496,5772,7124,2132,4680,6968,3484,1508,6552,2704,156
        ]
      },
      {
        name:'重要渠道投诉量',
        type:'line',
        yAxisIndex: 1,
        symbol: 'none',
        hoverAnimation: false,
        areaStyle: {
          normal: {}
        },
        lineStyle: {
          normal: {
            width: 1
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(247, 186, 30, 0.41)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ]), // 背景渐变色
            lineStyle: {
              // 系列级个性化折线样式
              color: '#F7BA1E'
            }
          }
        },
        smooth: true,
        data: [
          378,810,816,200,768,288,666,822,246,540,804,402,174,756,
          312,18,444,240,768,438,2616,684,420,3360,606,1020,624,1500,
          906,120,1224,690,192,1086,654,276,972,702,270,876,708,264,852,738
        ]
      }
    ]
  };
  myChart.setOption(option);
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
  margin-right: 16px;
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

