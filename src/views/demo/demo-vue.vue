<template>
  <div>demo</div>
  <div>{{ useCounterStore.msg }}</div>
</template>

<script setup>
import { getNextUserOption, getNextUserOptionMock } from '@/api/aiApproval';
import { useCounterStore } from '@/stores/counter.js';
import { onMounted } from 'vue';
onMounted(() => {
  getNextUserOption({
    nodeId: '111',
    templateId: '111',
    processInstanceId: '111',
    // bool: 'Y'
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  getNextUserOptionMock({
    nodeId: '111',
    templateId: '111',
    processInstanceId: '111',
    // bool: 'Y'
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

const store = useCounterStore();
</script>

<style scoped>
</style>
