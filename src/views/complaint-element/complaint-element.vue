<template>
  <div class="complaint-element view-box">
    <div class="top">
      <div class="info">
        <span>投诉编号：20200115000035IM</span>
        <span>投诉来源：中国人民银行管理部</span>
        <span>投诉时间：2023-01-03 18：34</span>
        <span>录入人：中国人民银行用户投诉中心客服A</span>
      </div>
      <span class="btn" @click="handleReturn">返回</span>
    </div>
    <BasicInfo style="height:388px"></BasicInfo>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import BasicInfo from './components/basic-info.vue';
onMounted(() => {});
const handleReturn = () => {
  console.log(123);
};
</script>

<style lang="less" scoped>
@color-1: #505968;
@common_primary_color: #2d5cf6;
.complaint-element {
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 34px;
    line-height: 34px;
    color: @color-1;
    .info {
      display: flex;
      gap: 16px;
      font-size: 12px;
    }
    .btn {
      width: 84px;
      height: 100%;

      background-color: #fff;
      border: 0;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      color: @common_primary_color;
    }
  }
}

</style>
