<template>
  <div class="tableCard">
    <div class="head">
      <div class="left">
        <span class="iconfont right-icon">&#xe625;</span>
        <span class="content">{{ title }}</span>
      </div>
      <div class="right">
        <slot name="head-right"></slot>
      </div>
      <slot name="cardInfo"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gTableCard',
}
</script>

<script setup>
defineProps({
    title: {
      typeof: String,
      required: true
    },
})


</script>
<style lang="less" scoped>
.tableCard {
  padding: 16px 24px 12px;

  // background: rgba(255, 255, 255, 1);
  // border-radius: 10px;
  .head {
    display: flex;
    align-items: center;
    line-height: 22px;
    .left {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 700;
      .iconfont {
        color: rgb(48, 110, 245);
      }
    }

    .content {
      margin-right: 8px;
    }
  }
}
</style>
