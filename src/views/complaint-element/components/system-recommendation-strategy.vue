<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-26 11:36:39
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-09-26 15:11:22
 * @FilePath: /protection-treatment/src/views/complaint-element/components/system-recommendation-strategy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEtemplate
-->
<template>
  <div class="system-strategy">
    <p class="title">
      <span class="iconfont" style="color: #306ef5; margin-right: 4px">&#xe625;</span>系统推荐策略
    </p>
    <div class="strategy">
      <div class="strategy-box">
        <div class="title" style="justify-content: space-between; align-items: center">
          <div class="flex" style="justify-content: space-between; align-items: center">
            <span class="icon"> <img src="@/assets/image/strategy.svg" alt="" /></span>
            要点与处理意见
          </div>
          <span class="flex pointer" style="align-items: center">
            <el-icon style="color: #2d5cf6">
              <Refresh />
            </el-icon>
            <i class="pointer" style="margin-left: 4px">换一换</i></span
          >
        </div>
        <div class="strategy-content">
          <p class="key-point">应对要点：</p>
          <p class="point-value">
            保持冷静，倾听客户，表达同情，提供解决方案，给予适当奖励。
          </p>
          <p class="key-point">推荐处理意见：</p>
          <div class="opinions">
            <div class="key-point" v-for="(item, index) in suggestions" :key="index" style="margin-bottom: 0">
              <span class="step step-title" v-if="item.setup"><i class="circle"></i>{{ item.setup }}</span>
              <div class="step step-value">
                <div>{{ index > 0 ? index + '. ' : '' }}</div>
                <div>{{ item.setupValue }}</div>
              </div>
            </div>
            <!-- <p class="flod pointer" @click="unfold('suggestion')">
              {{ !suggestionFold ? '展开' : '收起' }}
            </p> -->
          </div>
        </div>
      </div>
      <div class="strategy-box">
        <div class="title" style="justify-content: space-between">
          <div class="flex" style="justify-content: space-between; align-items: center">
            <span class="icon"> <img src="@/assets/image/strategy.svg" alt="" /></span>
            相似案例
          </div>
          <span class="flex pointer" style="align-items: center">
            <el-icon style="color: #2d5cf6">
              <Refresh />
            </el-icon>
            <i class="pointer" style="margin-left: 4px">换一换</i></span
          >
        </div>
        <div class="strategy-content" v-for="(item, index) in similarData" :key="index">
          <div class="tags">
            <span v-for="tag in item.tag" :key="tag"> {{ tag }}</span>
          </div>
          <div
            :class="{ 'case-value pointer': true, 'ellipsis ellipsis_2': item.fold }"
            @click="unfold('caseItem', item, index)"
          >
            {{ item.content }}
          </div>
        </div>
        <!-- <p class="flod pointer" style="margin-top: 8px" @click="unfold('similar')">
          {{ !similarFold ? '展开' : '收起' }}
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import opinion from '../data/opinions.js'
import { ref, onMounted } from 'vue'
let suggestions = ref([])
let suggestionFold = ref(false)
let similarFold = ref(false)

let similarData = ref([])
opinion.similarCase = opinion.similarCase.map((v) => {
  return {
    ...v,
    fold: true
  }
})
onMounted(() => {
  suggestions.value = opinion.opinions
  similarData.value = opinion.similarCase
})
let unfold = (key, item, index) => {
  if (key == 'suggestion') {
    suggestionFold.value
      ? (suggestions.value = opinion.opinions.slice(0, 1))
      : (suggestions.value = opinion.opinions)
    suggestionFold.value = !suggestionFold.value
  }
  if (key == 'caseItem') {
    item.fold = !item.fold
    similarData.value[index] = item
    similarData.value = [...similarData.value]
  }
  if (key == 'similar') {
    similarData.value = similarFold.value
      ? opinion.similarCase.slice(0, 2)
      : similarData.value.concat(opinion.similarCase.slice(2))
    similarFold.value = !similarFold.value
  }
}
</script>
<style lang="less" scoped>
.system-strategy {
  padding: 24px;
  border-radius: 10px;
  background: #fff;

  .title {
    display: flex;
    line-height: 22px;
    color: #1d2128;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    width: 100%;
    align-items: center;

    .icon {
      display: inline-block;
      width: 48px;
      height: 48px;
      background: #f2f3f5;
      border-radius: 50%;
      margin-right: 6px;
      position: relative;

      img {
        position: absolute;
        top: 58%;
        left: 54%;
        transform: translate(-50%, -50%);
      }
    }

    i {
      text-align: right;
      color: #505968;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
    }
  }

  .strategy {
    margin-top: 16px;
    display: flex;

    .strategy-box {
      padding: 16px 24px;
      flex: 1;
      border-radius: 8px;
      background: #f7f8fa;
    }

    .strategy-box:first-of-type {
      margin-right: 40px;
    }

    .strategy-content {
      border-radius: 6px;
      background: #fff;
      margin-top: 8px;
      padding: 12px;
    }

    .key-point {
      color: #1d2128;
      font-weight: 700;
      line-height: 20px;
      margin-bottom: 9px;
    }

    .point-value {
      color: #2d5cf6;
      font-weight: 400;
      line-height: 22px;
      margin-bottom: 9px;
    }

    .opinions {
      .step {
        display: block;
        color: #1d2128;
        font-weight: 700;
        line-height: 20px;
        display: flex;
        align-items: center;
      }

      .circle {
        width: 3px;
        height: 3px;
        display: inline-block;
        border-radius: 50%;
        background: #1d2128;
        margin-right: 4px;
      }

      .step-value {
        display: flex;
        align-items: flex-start;
        font-weight: 400;
      }
    }

    .tags {
      span {
        display: inline-block;
        border-radius: 4px;
        padding: 2px 10px;
        margin-right: 4px;
        margin-bottom: 4px;
        line-height: 20px;
      }

      span:nth-of-type(-n + 2) {
        color: #fa8c16;
        background: linear-gradient(0deg, #fffce8 0%, #fffce8 100%), #e8f7fe;
      }

      span:nth-of-type(n + 3) {
        color: #2d5cf6;
        background: #f0f6ff;
      }
    }

    .case-value {
      color: #1d2128;
    }

    .flod {
      text-align: right;
      color: #2d5cf6;
    }
  }
}


</style>
