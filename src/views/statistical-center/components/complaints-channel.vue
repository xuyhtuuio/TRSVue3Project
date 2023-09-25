<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            各渠道近一年投诉发生率
            <el-tooltip placement="top" content="本年各渠道大类投诉发生率统计">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content" style="position: relative;">
        <span style="position: absolute; right: 100px; top: 20px;color:#505968;">单位：ppm</span>
        <div class="my-echart" id="my-channel"></div>
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
  const myChart = echarts.init(document.getElementById('my-channel'));
  // 指定图表的配置项和数据
  const x = ['2022-09', '2022-10', '2022-11', '2022-12', '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08']
  const y1 = [0.19, 1.55, 1.24, 1.81, 1.3, 1.3, 1.28, 2.05, 1.32, 1.14, 1.14, 1.12]
  const y2 = [6.09, 48.26, 46.63, 43.16, 65.7, 57.78, 47.55, 32.76, 57.78, 49.26, 59.76, 66.18]
  const y3 = [2.17, 20.86, 19.86, 17.61, 22.52, 21.26, 19.95, 17.37, 21.26, 23.11, 20.42, 28.04]
  const y4 = [20.22, 192.32, 195.11, 187.01, 225.47, 224.33, 185.98, 136.96, 224.33, 172.59, 305.14, 349.09]
  const y5 = [0.49, 2.91, 2.8, 2.5, 4.98, 4.56, 2.96, 2.33, 4.56, 4.73, 6.95, 6.59]
  const y6 = [0.36, 2.87, 2.5, 1.88, 2.54, 0.49, 1.96, 2.13, 0.49, 0.3, 0.59, 2.07]
  const option = {
    textStyle: {
      color: '#fff',
    },
    legend: {
      show: false,
      data: ['a', 'b', 'c', 'd', 'e', 'f'],
      left:'right',
    },
    yAxis: {
      type: 'category',
      data: ['其他', '第三方渠道', '电子渠道', '营业现场', '中后台业务渠道', '自助机具'],
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#555'],
        }
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        color: '#505968',
      }
    },
    xAxis: {
        type: 'category',
        data: x,
        axisLabel: {
          color: '#505968',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#555',
          },
        },
        axisTick: {
          alignWithLabel: true
        },
    },
    series:[
        {
          name:'a',
          type: 'scatter',
          symbol: 'circle',
          silent: true,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) * 5;
          },
          label: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
            position: 'top',
          },
          itemStyle:{
            normal:{
              color:'#80A6FF'
            }  
          },
          data: x.map((item, index) => {
            return [item, '其他', y6[index]]
          })
        },
        {   
          name:'b',
          type: 'scatter',
          symbol: 'circle',
          silent: true,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) * 3;
          },
          label: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
            position: 'top'
          },
          itemStyle:{
            normal:{
              color:'#80A6FF'
            }  
          },
          data: x.map((item, index) => {
            return [item, '第三方渠道', y5[index]]
          })
        },
        {   
          name:'c',
          type: 'scatter',
          symbol: 'circle',
          silent: true,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) * 2;
          },
          label: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
            position: 'top'
          },
          itemStyle:{
            normal:{
              color:'#80A6FF'
            }  
          },
          data: x.map((item, index) => {
            return [item, '电子渠道', y4[index]]
          })
        },
        {   
          name:'d',
          type: 'scatter',
          symbol: 'circle',
          silent: true,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) * 3;
          },
          label: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
            position: 'top'
          },
          itemStyle:{
            normal:{
              color:'#80A6FF'
            }  
          },
          data: x.map((item, index) => {
            return [item, '营业现场', y3[index]]
          })
        },
        {   
          name:'e',
          type: 'scatter',
          symbol: 'circle',
          silent: true,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) * 2;
          },
          label: {
            show: true,
              formatter: function (param) {
                return param.data[2];
              },
            position: 'top'
          },
          itemStyle:{
            normal:{
              color:'#80A6FF'
            }  
          },
          data: x.map((item, index) => {
            return [item, '中后台业务渠道', y2[index]]
          })
        },
        {   
          name:'e',
          type: 'scatter',
          symbol: 'circle',
          silent: true,
          symbolSize: function (data) {
            return Math.sqrt(data[2]) * 5;
          },
          label: {
            show: true,
            formatter: function (param) {
              return param.data[2];
            },
            position: 'top'
          },
          itemStyle: {
            normal: {
              color:'#80A6FF'
            }  
          },
          data: x.map((item, index) => {
            return [item, '自助机具', y1[index]]
          })
        }
        
   ]
  };
  myChart.setOption(option);
}


</script>

<style lang="less" scoped>
.my-echart {
  width: 100%;
  height: 420px;
}
.mission-trends {
  height: 440px;
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
