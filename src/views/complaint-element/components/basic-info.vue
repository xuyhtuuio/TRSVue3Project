<template>
  <div class="basic-info">
    <div class="left bgc-white">
      <div class="title">
        <span class="text">基本信息</span>
        <span class="btn">全部 ></span>
      </div>
      <img src="@/assets/image/KYC.png" alt="" />
      <div class="left-type">
        <span v-for="item in persionType" :key="item.id" :class="['type', `type-${item.id}`]">
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="right bgc-white"></div>
  </div>
</template>

<script setup>
const persionType = [
  { name: '易投诉客户', id: 1 },
  { name: '普通投诉客户', id: 2 },
  { name: '恶意投诉客户', id: 3 },
  { name: '特殊客户', id: 4 }
];
</script>

<style lang="less" scoped>
@color-1: #505968;
.basic-info {
  .left {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 400px;
    padding: 16px 24px 26px;
    .title {
      display: flex;
      justify-content: space-between;
      line-height: 22px;
      .text {
        color: @color-1;
        font-weight: 700;
      }
      .btn {
        font-size: 12px;
        color: @common_primary_color;
        cursor: pointer;
      }
    }
    &-type {
      display: flex;
      gap: 8px;
      padding: 4px 0;
      .type {
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 4px;
        &-1 {
          color: #eb5757;
          background-color: #fff1f0;
        }
        &-2 {
          color: @common_primary_color;
          background-color: #f0f6ff;
        }
        &-3 {
          color: #fa8c16;
          background-color: #fffce8;
        }
        &-4 {
          color: #6a32c9;
          background-color: #f7f0fe;
        }
      }
    }
  }
}

</style>