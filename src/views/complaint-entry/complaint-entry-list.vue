<template>
  <div class="outter">
    <div class="item-outter">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">新建投诉任务</div>
      </div>
      <div class="content">
        <div v-for="(item, index) in addList" :key="index" class="card-inner" @click="jumpHandler">
          <div class="card-item-inner">
            <div class="top-img">
              <img :src="item.img" alt="" />
            </div>
            <div class="bottom-area">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-outter">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">网络及Email投诉确认</div>
      </div>
      <div class="content">
        <div
          v-for="(item, index) in emailList"
          :key="index"
          class="card-inner"
          @click="jumpHandler"
        >
          <div class="card-item-inner">
            <div class="top-img">
              <img :src="item.img" alt="" />
            </div>
            <div class="bottom-area">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-outter">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">报备与表扬</div>
      </div>
      <div class="content">
        <div
          v-for="(item, index) in praiseList"
          :key="index"
          class="card-inner"
          @click="jumpHandler"
        >
          <div class="card-item-inner">
            <div class="top-img">
              <img :src="item.img" alt="" />
            </div>
            <div class="bottom-area">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import icon1 from '@/assets/image/purplebook.png'
import icon2 from '@/assets/image/Frame.png'
import icon3 from '@/assets/image/Frame2.png'
import icon4 from '@/assets/image/lingdang.png'
import icon5 from '@/assets/image/people.png'
import icon6 from '@/assets/image/computer.png'
import icon7 from '@/assets/image/document.png'
import { ref } from 'vue'

const addList = ref([
  {
    label: '人行投诉系统',
    img: icon1
  },
  {
    label: '银保监护系统转来投诉',
    img: icon2
  },
  {
    label: '国家信访系统转来投诉',
    img: icon3
  },
  {
    label: '总分支行现场投诉',
    img: icon4
  },
  {
    label: '其他投诉',
    img: icon5
  }
])
const emailList = ref([
  {
    label: '监管部门转来Email投诉待确认',
    img: icon6
  },
  {
    label: '客户Email自助网络投诉待确认',
    img: icon7
  }
])
const praiseList = ref([
  {
    label: '新建报备',
    img: icon6
  },
  {
    label: '新建表扬',
    img: icon2
  }
])

const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href
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
  display: flex;
  margin: 20px 0 20px 0;
  align-content: center;
  flex-wrap: wrap;
}

.title-content {
  text-align: center;
  font-weight: 900;
  font-size: medium;
}

.content {
  width: 98%;
  display: flex;
}

.card-inner {
  margin-right: 10px;
  flex: 1;
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

.top-img img {
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
}

.front-icon img {
  width: 20px;
  height: 20px;
}

.bottom-area {
  font-weight: 800;
}

.card-item-inner {
  /* margin: 10px; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-item-inner > p {
  font-size: 12px;
  color: #333333;
}
</style>