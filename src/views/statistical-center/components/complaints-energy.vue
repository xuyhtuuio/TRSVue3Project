<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            投诉量与来电量的趋势关系
            <el-tooltip placement="top" content="展示近一年投诉量与来电量的趋势关系，可通过鼠标的滑动查看投诉量与来电量">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-energy"></div>
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
  const myChart = echarts.init(document.getElementById('my-energy'));
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
        params += `<p class="charts-tooltip-p fontw black"><span class="serieName"><span class="charts-tooltip-dot" style="background: #F7BA1E;"></span>投诉量</span><span><span class="yellow">${serie[1].data}</span></span></p>`;
        params += `<p class="charts-tooltip-p black"><span class="serieName"><span class="charts-tooltip-dot" style="background: #5773F9;"></span>来电量</span><span class="blue">${serie[0].data}</span></p>`;
        return params;
      },
      axisPointer: {
        type: 'cross',
        animation: false
      }
    },
    legend: {
      data: [
        {
          name: '来电量',
          itemStyle: {
            color: "#fff",
            borderColor: '#2D5CF6',
            borderWidth: 1,
          }
        },
        {
          name: '投诉量',
          itemStyle: {
            color: "#fff",
            borderColor: '#F7BA1E',
            borderWidth: 1,
          }
        }
      ],
      bottom: '10'
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        axisLine: {onZero: false},
        data: [
          // '2019-04-30',
          // '2019-05-31',
          // '2019-06-30',
          // '2019-07-31',
          // '2019-08-31',
          // '2019-09-30',
          // '2019-10-31',
          // '2019-11-30',
          // '2019-12-31',
          // '2019-01-31',
          // '2019-02-28',
          // '2019-03-31',
          // '2019-04-30',
          // '2019-05-31',
          // '2019-06-30',
          // '2019-07-31',
          // '2019-08-31',
          // '2019-09-30',
          // '2019-10-31',
          // '2019-11-30',
          // '2019-12-31',
          // '2020-01-31',
          // '2020-02-28',
          // '2020-03-31',
          // '2020-04-30',
          // '2020-05-31',
          // '2020-06-30',
          // '2020-07-31',
          // '2020-08-31',
          // '2020-09-30',
          // '2020-10-31',
          // '2020-11-30',
          // '2020-12-31',
          '2020-01-31',
          '2020-02-28',
          '2020-03-31',
          '2020-04-30',
          '2020-05-31',
          '2020-06-30',
          '2020-07-31',
          '2020-08-31',
          '2020-09-30',
          '2020-10-31',
          '2020-11-30',
          '2020-12-31',
          '2021-01-31',
          '2021-02-28',
          '2021-03-31',
          '2021-04-30',
          '2021-05-31',
          '2021-06-30',
          '2021-07-31',
          '2021-08-31',
          '2021-09-30',
          '2021-10-31',
          '2021-11-30',
          '2021-12-31',
          '2022-01-31',
          '2022-02-28',
          '2022-03-31',
          '2022-04-30',
          '2022-05-31',
          '2022-06-30',
          '2022-07-31',
          '2022-08-31',
          '2022-09-30',
          '2022-10-31',
          '2022-11-30',
          '2022-12-31',
          '2023-01-31',
          '2023-02-28',
          '2023-03-31',
          '2023-04-30',
          '2023-05-31',
          '2023-06-30',
          '2023-07-31',
          '2023-08-31'
        ]
      }
    ],
    yAxis: [
      {
        name: '来电量',
        type: 'value',
        max: 40000,
        axisLine: {
          lineStyle: {
            color: '#88909B'    
          }
        }
      },
      {
        name: '投诉量',
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
        name:'来电量',
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
          10608,15980,11664,19412,15668,12392,18424,16084,12340,17592,
          11496,11772,17124,12132,24680,16968,15928,13640,21120,16136,12288,20384,16396,13276,
          13848,20180,16656,13796,12272,15252,18840,15408,11000,21852,21040,
          17020,17072,22600,16656,27228,16484,21508,26552,22704,19156
        ]
      },
      {
        name:'投诉量',
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
                color: '#fff' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(247, 186, 30, 0.41)' // 100% 处的颜色
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
          1086,2616,684,420,3360,606,1020,624,1500,
          378,810,540,804,402,174,756,816,200,768,288,666,822,246,
          654,276,972,702,270,876,708,264,852,738,312,18,444,240,768,438,
          906,120,224,690,192
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
