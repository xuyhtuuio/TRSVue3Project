<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            各客户诉求投诉量
            <el-tooltip placement="top" content="本年按客户诉求分组统计的投诉发生量">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-client"></div>
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
  const myChart = echarts.init(document.getElementById('my-client'));
  // 指定图表的配置项和数据
  const option = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: '各客户诉求投诉量',
        type: 'pie',
        radius: ["0%", "55%"],
        center: ["50%", "50%"],
        // itemStyle: {
        //   borderColor: '#fff',
        //   borderWidth: 1
        // },
        data: [
          { value: 398, name: '客户要求协商分期还款' },
          { value: 523, name: '客户要求停止骚扰' },
          { value: 11521, name: '客户要求核实原因' },
          { value: 9154, name: '客户要求答复' },
          { value: 2658, name: '客户要求加快处理' },
          { value: 154, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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
