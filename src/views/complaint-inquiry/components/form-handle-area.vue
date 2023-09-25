<template>
  <div class="table-content">
    <div class="return" @click="branch">返回上一页 ></div>
    <div class="type-show">
      <div class="type-icon"></div>
      <div class="type-tip">投诉业务办理渠道报表（按地区）</div>
    </div>
    <div class="TRS-table-gray">
      <el-table :data="data.list" style="width: 100%" v-loading="loading">
        <el-table-column align="center" prop="area" label="地区" width="120" />
        <el-table-column align="center" prop="all" label="投诉量合计" width="130" />
        <el-table-column align="center" label="金融消费者投诉业务办理渠道">
          <el-table-column align="center" label="前台业务渠道">
            <el-table-column align="center" prop="business" label="营业现场" width="130" />
            <el-table-column align="center" prop="own" label="自助机具" width="130" />
            <el-table-column align="center" label="电子渠道">
              <el-table-column align="center" prop="webMoney" label="网银渠道" width="130" />
              <el-table-column align="center" prop="telephone" label="电话渠道" width="130" />
              <el-table-column align="center" prop="mobile" label="移动客户端" width="130" />
              <el-table-column align="center" prop="webAll" label="网络公众平台" width="130" />
              <el-table-column align="center" prop="message" label="短信渠道" width="130" />
              <el-table-column align="center" prop="other1" label="其他" width="130" />
              <el-table-column align="center" prop="subtotal1" label="小计" width="130" />
            </el-table-column>
            <el-table-column align="center" prop="three" label="第三方渠道" width="130" />
            <el-table-column align="center" prop="other2" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal2" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" prop="middle" label="中、后台业务渠道" width="150" />
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="data.total !== 0">
        <el-pagination
          class="pagination noBg el-pagination is-background"
          v-model:current-page="pageNow"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="data.total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { getList } from '@/api/complaint-inquiry'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const data = reactive({
  list: [],
  total: 0
})
const complaintAreaList = [
  {
    "area": "总行本级",
    "all": 12877,
    "business": 1362,
    "own": 159,
    "webMoney": 102,
    "telephone": 1375,
    "mobile": 9328,
    "webAll": 13,
    "message": 69,
    "other1": 21,
    "subtotal1": 10908,
    "three": 104,
    "other2": 97,
    "subtotal2": 12630,
    "middle": 247
  },
  {
    "area": "信用卡中心",
    "all": 26359,
    "business": 623,
    "own": 19,
    "webMoney": 159,
    "telephone": 13789,
    "mobile": 556,
    "webAll": 10,
    "message": 35,
    "other1": 3272,
    "subtotal1": 17821,
    "three": 333,
    "other2": 206,
    "subtotal2": 19002,
    "middle": 7357
  },
  {
    "area": "北京",
    "all": 162,
    "business": 71,
    "own": 2,
    "webMoney": 0,
    "telephone": 8,
    "mobile": 38,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 46,
    "three": 0,
    "other2": 1,
    "subtotal2": 120,
    "middle": 42
  },
  {
    "area": "天津",
    "all": 53,
    "business": 21,
    "own": 1,
    "webMoney": 0,
    "telephone": 6,
    "mobile": 24,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 30,
    "three": 0,
    "other2": 1,
    "subtotal2": 53,
    "middle": 0
  },
  {
    "area": "河北",
    "all": 30,
    "business": 13,
    "own": 0,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 11,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 13,
    "three": 0,
    "other2": 0,
    "subtotal2": 26,
    "middle": 4
  },
  {
    "area": "山西",
    "all": 26,
    "business": 17,
    "own": 3,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 4,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 4,
    "three": 2,
    "other2": 0,
    "subtotal2": 26,
    "middle": 0
  },
  {
    "area": "内蒙古",
    "all": 19,
    "business": 7,
    "own": 0,
    "webMoney": 0,
    "telephone": 1,
    "mobile": 9,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 10,
    "three": 1,
    "other2": 0,
    "subtotal2": 18,
    "middle": 1
  },
  {
    "area": "辽宁",
    "all": 104,
    "business": 48,
    "own": 2,
    "webMoney": 0,
    "telephone": 3,
    "mobile": 46,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 49,
    "three": 0,
    "other2": 0,
    "subtotal2": 99,
    "middle": 5
  },
  {
    "area": "吉林",
    "all": 18,
    "business": 13,
    "own": 0,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 4,
    "webAll": 0,
    "message": 1,
    "other1": 0,
    "subtotal1": 5,
    "three": 0,
    "other2": 0,
    "subtotal2": 18,
    "middle": 0
  },
  {
    "area": "黑龙江",
    "all": 58,
    "business": 35,
    "own": 0,
    "webMoney": 0,
    "telephone": 4,
    "mobile": 14,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 18,
    "three": 0,
    "other2": 0,
    "subtotal2": 53,
    "middle": 5
  },
  {
    "area": "上海",
    "all": 222,
    "business": 71,
    "own": 4,
    "webMoney": 0,
    "telephone": 17,
    "mobile": 84,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 101,
    "three": 10,
    "other2": 1,
    "subtotal2": 187,
    "middle": 35
  },
  {
    "area": "江苏",
    "all": 181,
    "business": 83,
    "own": 2,
    "webMoney": 1,
    "telephone": 7,
    "mobile": 76,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 84,
    "three": 6,
    "other2": 0,
    "subtotal2": 175,
    "middle": 6
  },
  {
    "area": "浙江",
    "all": 98,
    "business": 55,
    "own": 0,
    "webMoney": 1,
    "telephone": 6,
    "mobile": 25,
    "webAll": 0,
    "message": 0,
    "other1": 1,
    "subtotal1": 33,
    "three": 2,
    "other2": 0,
    "subtotal2": 90,
    "middle": 8
  },
  {
    "area": "安徽",
    "all": 39,
    "business": 25,
    "own": 0,
    "webMoney": 0,
    "telephone": 6,
    "mobile": 8,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 14,
    "three": 0,
    "other2": 0,
    "subtotal2": 39,
    "middle": 0
  },
  {
    "area": "福建",
    "all": 36,
    "business": 14,
    "own": 1,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 12,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 14,
    "three": 4,
    "other2": 0,
    "subtotal2": 33,
    "middle": 3
  },
  {
    "area": "江西",
    "all": 43,
    "business": 25,
    "own": 0,
    "webMoney": 0,
    "telephone": 4,
    "mobile": 10,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 14,
    "three": 0,
    "other2": 2,
    "subtotal2": 41,
    "middle": 2
  },
  {
    "area": "山东",
    "all": 174,
    "business": 58,
    "own": 5,
    "webMoney": 0,
    "telephone": 11,
    "mobile": 34,
    "webAll": 1,
    "message": 0,
    "other1": 1,
    "subtotal1": 47,
    "three": 4,
    "other2": 1,
    "subtotal2": 115,
    "middle": 59
  },
  {
    "area": "河南",
    "all": 35,
    "business": 20,
    "own": 1,
    "webMoney": 1,
    "telephone": 3,
    "mobile": 9,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 13,
    "three": 1,
    "other2": 0,
    "subtotal2": 35,
    "middle": 0
  },
  {
    "area": "湖北",
    "all": 222,
    "business": 118,
    "own": 2,
    "webMoney": 1,
    "telephone": 14,
    "mobile": 53,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 68,
    "three": 0,
    "other2": 1,
    "subtotal2": 189,
    "middle": 33
  },
  {
    "area": "湖南",
    "all": 40,
    "business": 27,
    "own": 0,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 6,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 8,
    "three": 1,
    "other2": 0,
    "subtotal2": 36,
    "middle": 4
  },
  {
    "area": "广东",
    "all": 181,
    "business": 72,
    "own": 1,
    "webMoney": 2,
    "telephone": 11,
    "mobile": 72,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 85,
    "three": 3,
    "other2": 2,
    "subtotal2": 163,
    "middle": 18
  },
  {
    "area": "广西",
    "all": 18,
    "business": 7,
    "own": 0,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 5,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 5,
    "three": 0,
    "other2": 0,
    "subtotal2": 12,
    "middle": 6
  },
  {
    "area": "海南",
    "all": 14,
    "business": 13,
    "own": 0,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 0,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 0,
    "three": 1,
    "other2": 0,
    "subtotal2": 14,
    "middle": 0
  },
  {
    "area": "重庆",
    "all": 62,
    "business": 29,
    "own": 1,
    "webMoney": 0,
    "telephone": 5,
    "mobile": 20,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 25,
    "three": 0,
    "other2": 0,
    "subtotal2": 55,
    "middle": 7
  },
  {
    "area": "四川",
    "all": 151,
    "business": 110,
    "own": 2,
    "webMoney": 1,
    "telephone": 4,
    "mobile": 29,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 34,
    "three": 2,
    "other2": 1,
    "subtotal2": 149,
    "middle": 2
  },
  {
    "area": "贵州",
    "all": 18,
    "business": 11,
    "own": 1,
    "webMoney": 0,
    "telephone": 1,
    "mobile": 3,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 4,
    "three": 1,
    "other2": 0,
    "subtotal2": 17,
    "middle": 1
  },
  {
    "area": "云南",
    "all": 46,
    "business": 30,
    "own": 0,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 11,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 13,
    "three": 0,
    "other2": 0,
    "subtotal2": 43,
    "middle": 3
  },
  {
    "area": "西藏",
    "all": 0,
    "business": 0,
    "own": 0,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 0,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 0,
    "three": 0,
    "other2": 0,
    "subtotal2": 0,
    "middle": 0
  },
  {
    "area": "陕西",
    "all": 82,
    "business": 51,
    "own": 3,
    "webMoney": 1,
    "telephone": 5,
    "mobile": 20,
    "webAll": 1,
    "message": 0,
    "other1": 0,
    "subtotal1": 27,
    "three": 0,
    "other2": 0,
    "subtotal2": 81,
    "middle": 1
  },
  {
    "area": "甘肃",
    "all": 20,
    "business": 11,
    "own": 3,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 4,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 6,
    "three": 0,
    "other2": 0,
    "subtotal2": 20,
    "middle": 0
  },
  {
    "area": "青海",
    "all": 6,
    "business": 5,
    "own": 0,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 0,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 0,
    "three": 1,
    "other2": 0,
    "subtotal2": 6,
    "middle": 0
  },
  {
    "area": "宁夏",
    "all": 7,
    "business": 1,
    "own": 0,
    "webMoney": 0,
    "telephone": 3,
    "mobile": 2,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 5,
    "three": 0,
    "other2": 0,
    "subtotal2": 6,
    "middle": 1
  },
  {
    "area": "新疆",
    "all": 25,
    "business": 19,
    "own": 0,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 4,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 6,
    "three": 0,
    "other2": 0,
    "subtotal2": 25,
    "middle": 0
  },
  {
    "area": "大连",
    "all": 30,
    "business": 20,
    "own": 0,
    "webMoney": 0,
    "telephone": 1,
    "mobile": 6,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 7,
    "three": 3,
    "other2": 0,
    "subtotal2": 30,
    "middle": 0
  },
  {
    "area": "宁波",
    "all": 24,
    "business": 9,
    "own": 0,
    "webMoney": 0,
    "telephone": 4,
    "mobile": 10,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 14,
    "three": 0,
    "other2": 0,
    "subtotal2": 23,
    "middle": 1
  },
  {
    "area": "厦门",
    "all": 29,
    "business": 7,
    "own": 2,
    "webMoney": 0,
    "telephone": 2,
    "mobile": 14,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 16,
    "three": 1,
    "other2": 0,
    "subtotal2": 26,
    "middle": 3
  },
  {
    "area": "青岛",
    "all": 56,
    "business": 38,
    "own": 2,
    "webMoney": 0,
    "telephone": 0,
    "mobile": 13,
    "webAll": 0,
    "message": 0,
    "other1": 0,
    "subtotal1": 13,
    "three": 2,
    "other2": 0,
    "subtotal2": 55,
    "middle": 1
  },
  {
    "area": "深圳",
    "all": 183,
    "business": 92,
    "own": 0,
    "webMoney": 2,
    "telephone": 11,
    "mobile": 64,
    "webAll": 0,
    "message": 1,
    "other1": 0,
    "subtotal1": 78,
    "three": 1,
    "other2": 0,
    "subtotal2": 171,
    "middle": 12
  }
]
const pageSize = ref(10)
let pageNow = ref(1)
let loading = ref(false)
const getListByApi = (page) => {
  loading.value = true
  setTimeout(() => {
    // getList({
    //   pageNow: page,
    //   pageSize: pageSize.value
    // })
    //   .then((res) => {
    //     data.list = res.data.list
    //     data.total = res.data.total
    //     loading.value = false
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     loading.value = false
    //   })
    data.list = complaintAreaList.slice((page - 1) * pageSize.value, page * pageSize.value);
    data.total = complaintAreaList.length;
    loading.value = false
  }, 1000)
}
onBeforeMount(() => {
  getListByApi(1)
})
const handleCurrentChange = (page) => {
  getListByApi(page)
}
const router = useRouter()
const branch = () => {
  router.push('/complaint-inquiry')
}
</script>

<style lang="less" scoped>
.table-content {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
  overflow-y: scroll;
  .return {
    color: #2d5cf6;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .type-show {
    display: flex;
    align-items: center;
    height: 22px;
    margin-bottom: 16px;
    .type-icon {
      width: 5px;
      height: 18px;
      margin-right: 8px;
      border-radius: 0px 10px;
      background: #306ef5;
    }
    .type-tip {
      color: #1d2128;
      font-size: 14px;
      font-weight: 700;
      line-height: 22px;
    }
  }
  .pagination {
    justify-content: flex-end;
  }
}
</style>