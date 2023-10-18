<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-22 10:25:59
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-10-18 10:38:39
 * @FilePath: /protection-treatment/src/components/trs-pagination.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-pagination  :currentPage="pageNow" :pageSize="pageSize" layout="prev, pager, next, jumper"
    :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
<script setup>
import { defineProps,} from 'vue';
// eslint-disable-next-line
const props = defineProps({
  pageNow: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  }
})
/**
 * @description: 翻页
 * @return {*}
 */
const emit = defineEmits(["handleCurrentChange"])
let handleCurrentChange = (val) => {
  emit("handleCurrentChange", val);
}

</script>
<style lang="less" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;

  :deep(.el-pager) {


    .number {
      border-radius: 2px;
      background: #F7F8FA;
      color: #292B34;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      margin: 0 8px;
    }

    .is-active {
      background: #2D5CF6;
      border-radius: 2px;
      color: #FFF;
      text-align: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      padding: 4px 8px;

    }
  }
}
</style>