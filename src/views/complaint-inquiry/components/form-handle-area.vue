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
import { getList } from '@/api/complaint-inquiry'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const data = reactive({
  list: [],
  total: 0
})
const pageSize = ref(10)
let pageNow = ref(1)
let loading = ref(false)
const getListByApi = (page) => {
  loading.value = true
  setTimeout(() => {
    getList({
      pageNow: page,
      pageSize: pageSize.value
    })
      .then((res) => {
        data.list = res.data.list
        data.total = res.data.total
        loading.value = false
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
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