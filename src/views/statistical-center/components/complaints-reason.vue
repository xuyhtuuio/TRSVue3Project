<template>
  <div class="mission-trends common">
    <div class="tableCard">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">
            各投诉原因投诉量
            <el-tooltip placement="top" content="本年按投诉原因分组统计的投诉发生量">
              <img src="@/assets/image/statistical/问号.svg"/>
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="content">
        <div class="my-echart" id="my-reason"></div>
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
  const myChart = echarts.init(document.getElementById('my-reason'));
  // 指定图表的配置项和数据
  const option = {
    tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
      trigger: 'axis',
      backgroundColor: 'rgba(32, 33, 36,.7)',
      borderColor: 'rgba(32, 33, 36,0.20)',
      borderWidth: 1,
      textStyle: { // 文字提示样式
        color: '#fff',
        fontSize: '12'
      },
      axisPointer: { // 坐标轴虚线
        type: 'cross',
        label: {
            backgroundColor: '#6a7985'
        }
      },
    },
    angleAxis: {
        interval: 1,
        type: 'category',
        data: [
          '因服务态度及服务质量引起的投诉',
          '因金融机构服务设施、设备、业务系统引起的投诉',
          '因金融机构管理制度、业务规则与流程引起的投诉',
          '因营销方式和手段引起的投诉',
          '因信息披露引起的投诉',
          '因自主选择权引起的投诉',
          '因定价收费引起的投诉',
          '因产品收益引起的投诉',
          '因合同条款引起的投诉',
          '因消费者资金安全引起的投诉',
          '因消费者信息安全引起的投诉',
          '因债务催收方式和手段引起的投诉'
        ],
        z: 0,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#c9cdd3",
            width: 2,
            type: "solid"
          },
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: "#505968",
          margin: 12,
          fontSize: 10,
          width: '10%',
          formatter: (value) => {
            return value.slice(0, 5) + '...'
          }
        },
    },
    radiusAxis: {
        min: 0,
        max: 10,
        interval: 2,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#e5e6eb",
            width: 1,
            type: "solid"
          },
        },
        axisLabel: {
          formatter: '{value}',
          show: true,
          z: 1000,
          padding: [0, 0, 20, 0],
          color: "#253238",
          fontSize: 12
        },
        splitLine: {
          z: 1,
          lineStyle: {
            color: "#e5e6eb",
            width: 1,
            type: "solid"
          }
        }
    },
    polar: {
      center:['50%', '50%'],
      radius:['2%', '55%'],
    },
    series: [{
        type: 'bar',
        data: [{
                value: 8,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 7,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 3,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 4,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 5,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 6,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 7,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 8,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 9,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 10,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 1,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            },
            {
                value: 1,
                itemStyle: {
                    normal: {
                        color: "#229eff"
                    }
                }
            }
        ],
        coordinateSystem: 'polar',
    }],
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
