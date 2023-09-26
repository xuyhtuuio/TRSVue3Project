<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            各机构投诉量与投诉率整体情况分析
            <el-tooltip placement="top" content="集团内各机构投诉发生量与投诉发生率数据">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-chart2"></div>
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
  const myChart = echarts.init(document.getElementById('my-chart2'));
  // 指定图表的配置项和数据
  const option = {
    grid: {
      bottom: 120,
      left: 80,
      right: 80
    },
    tooltip : {
      backgroundColor: 'rgba(255,255,255,0.8)',
      trigger: 'axis',
      formatter: (serie) => {
        let params = `<p><b>${serie[0].axisValueLabel}</b></p>`;
        params += `<p class="charts-tooltip-p black"><span class="serieName"><span class="charts-tooltip-dot" style="background: #5773F9;"></span>投诉发生量 </span><span class="blue">${serie[0].data}</span></p>`;
        params += `<p class="charts-tooltip-p fontw black"><span class="serieName"><span class="charts-tooltip-dot" style="background: #F7BA1E;"></span>投诉发生率</span><span><span class="yellow">${serie[1].data}</span> ppm</span></p>`;
        return params;
      },
      axisPointer: {
        type: 'cross',
        animation: false
      }
    },
    legend: {
      data:[{
        name: '投诉发生量',
        icon: 'circle',
      },{
        name: '投诉发生率',
        itemStyle: {
          color: "#fff",
          borderColor: '#F7BA1E',
          borderWidth: 1,
        }
      }],
      bottom: '0',
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        height: 18,
        bottom: 32,
        start: 20,
        end: 80
      },
      {
        type: 'inside',
        realtime: true,
        start: 0,
        end: 30
      }
    ],
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        axisLine: {onZero: true},
        offset: 10,
        axisTick: {show: false},
        axisLabel: {
          show: true,
          interval: 0,
          rotate: 45,
        },
        data: [
          '武汉分行',
          '济南分行',
          '成都分行',
          '长沙分行',
          '重庆分行',
          '大连分行',
          '东莞分行',
          '佛山分行',
          '福州分行',
          '广州分行',
          '贵阳分行',
          '哈尔滨分行',
          '海口分行',
          '杭州分行',
          '合肥分行',
          '呼和浩特分行',
          '济南分行',
          '昆明分行',
          '兰州分行',
          '南昌分行',
          '南京分行',
          '南宁分行',
          '南通分行',
          '宁波分行',
          '青岛分行',
          '泉州分行',
          '上海分行',
          '沈阳分行',
          '深圳分行',
          '石家庄分行',
          '苏州分行',
          '太原分行',
        ]
      }
    ],
    yAxis: [
      {
        name: '笔',
        type: 'value',
        max: 3000,
        axisLine: {
          lineStyle: {
            color: '#88909B'    
          }
        }
      },
      {
        name: 'ppm',
        max: 500,
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#88909B'
          }
        }
      }
    ],
    series: [
      {
        name:'投诉发生量',
        type:'bar',
        barWidth: 10,
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
            barBorderRadius: [40, 40, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#5196FF' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2F54EB' // 100% 处的颜色
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
          2522,
          1725,
          1166,
          1221,
          1034,
          1023,
          768,
          767,
          654,
          588,
          548,
          462,
          289,
          285,
          224,
          194,
          186,
          171,
          127,
          121,
          83,
          76,
          69,
          62,
          55,
          48,
          41,
          34,
          27,
          20,
          13,
          6
        ]
      },
      {
        name:'投诉发生率',
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
          391.28,
          398.35,296.15,357.83,168.36,
          185.1,
          219.13,198.61,
          258.1,
          184.41,
          172.22,
          195.91,
          189.42,
          185.97,
          114.99,
          186,
          172.16,
          127.5,
          98.24,
          260.69,
          161.13,
          172.43,
          183.73,
          195.03,
          206.33,217.63,28.93,240.23,251.532,62.83,274.13,
          285.43
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

