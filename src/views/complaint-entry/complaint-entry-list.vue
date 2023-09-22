<template>
  <div class="outter">
    <div class="item-outter">
      <div class="add-title">新建投诉任务</div>
      <div class="content">
        <div v-for="(item, index) in addList" :key="index" class="card-inner" @click="jumpHandler">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="item-outter">
      <div class="add-title">网络及Email投诉确认</div>
      <div class="content">
        <div
          v-for="(item, index) in emailList"
          :key="index"
          class="card-inner"
          @click="jumpHandler"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="item-outter">
      <div class="add-title">报备与表扬</div>
      <div class="content">
        <div
          v-for="(item, index) in praiseList"
          :key="index"
          class="card-inner"
          @click="jumpHandler"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const addList = ref([
  '人行系统转来投诉',
  '银保监护系统转来投诉',
  '国家信访系统转来投诉',
  '总分支行现场投诉',
  '其他投诉'
])
const emailList = ref(['监管部门转来Email投诉待确认', '客户Email自助网络投诉待确认'])
const praiseList = ref(['新建报备', '新建表扬'])
const jumpHandler = () => console.log('jump')
</script>

<style scoped>
.outter {
  padding: 20px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
}

.add-title {
  margin: 15px 0 15px 0;
}

.content {
  width: 98%;
  display: flex;
}

.card-inner {
  margin-right: 10px;
  flex-grow: 1;
  height: 120px;
  border-radius: 10px;
  max-width: 180px;
  background-color: rgb(237, 237, 237, 0.4);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  transition: box-shadow 0.5s;
}

.card-inner:hover {
  box-shadow: 0px 0px 20px #cacaca;
}
</style>