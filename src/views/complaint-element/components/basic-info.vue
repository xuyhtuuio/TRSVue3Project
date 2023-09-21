<template>
  <div class="basic-info ">
    <div class="left bgc-white">
      <div class="title">
        <span class="text">基本信息</span>
        <span class="btn">全部 ></span>
      </div>
    </div>
    <div class="right bgc-white"></div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
@color-1:#505968;
.basic-info {
  .left {
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
        color: @color-1;
        cursor: pointer;
      }
    }
  }
}
</style>