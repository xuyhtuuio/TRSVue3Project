<template>
  <div>demo</div>
  <div>{{ store.msg }}</div>
</template>

<script setup>
import { getNextUserOption, getNextUserOptionMock } from '@/api/aiApproval';
import { mainStore } from '@/store/index';
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

const store = mainStore();
</script>

<style scoped>
</style>
