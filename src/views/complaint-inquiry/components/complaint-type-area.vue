<template>
  <div class="table-content">
    <div class="return" @click="branch">返回上一页 ></div>
    <div class="type-show">
      <div class="type-icon"></div>
      <div class="type-tip">投诉业务类别报表（按地区）</div>
    </div>
    <div class="TRS-table-gray">
      <el-table :data="data.list" style="width: 100%" v-loading="loading">
        <el-table-column align="center" prop="area" label="地区" width="130" />
        <el-table-column align="center" prop="all" label="投诉数量合计" width="130" />
        <el-table-column align="center" label="金融消费者投诉业务类别">
          <el-table-column align="center" prop="saveMoney" label="人民币储蓄" width="130" />
          <el-table-column align="center" label="贷款">
            <el-table-column align="center" prop="houseD" label="个人住房贷款" width="130" />
            <el-table-column align="center" prop="carD" label="个人汽车消费贷款" width="130" />
            <el-table-column align="center" prop="studyD" label="教育助学贷款" width="130" />
            <el-table-column align="center" prop="otherD" label="其他消费贷款" width="130" />
            <el-table-column
              align="center"
              prop="productD"
              label="个人生产经营性贷款"
              width="130"
            />
            <el-table-column align="center" prop="other1" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal1" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="银行卡">
            <el-table-column align="center" label="借记卡">
              <el-table-column align="center" prop="jjkzh" label="借记卡账户管理" width="130" />
              <el-table-column align="center" prop="jjkgs" label="借记卡收费及挂失" width="130" />
              <el-table-column align="center" prop="jjksy" label="借记卡使用" width="130" />
              <el-table-column
                align="center"
                prop="jjksc"
                label="借记卡市场活动及增值服务"
                width="130"
              />
              <el-table-column align="center" prop="jjkds" label="借记卡盗刷" width="130" />
              <el-table-column align="center" prop="other2" label="其他" width="130" />
              <el-table-column align="center" prop="subtotal2" label="小计" width="130" />
            </el-table-column>
            <el-table-column align="center" label="信用卡">
              <el-table-column
                align="center"
                prop="xyksq"
                label="信用卡申请、开卡及换卡"
                width="130"
              />
              <el-table-column align="center" prop="xyksy" label="信用卡使用和还款" width="130" />
              <el-table-column align="center" prop="xykzd" label="信用卡账单服务" width="130" />
              <el-table-column
                align="center"
                prop="xyksc"
                label="信用卡市场活动、积分及增值服务"
                width="130"
              />
              <el-table-column align="center" prop="xykgs" label="信用卡挂失及注销" width="130" />
              <el-table-column align="center" prop="xykds" label="信用卡盗刷" width="130" />
              <el-table-column align="center" prop="xykgr" label="信用卡个人信用信息" width="130" />
              <el-table-column align="center" prop="other3" label="其他" width="130" />
              <el-table-column align="center" prop="subtotal3" label="小计" width="130" />
            </el-table-column>
            <el-table-column
              align="center"
              prop="zdjkd"
              label="准贷记卡等其他卡类业务"
              width="130"
            />
            <el-table-column align="center" prop="subtotal4" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" prop="zylc" label="自营理财" width="130" />
          <el-table-column align="center" label="支付结算">
            <el-table-column align="center" prop="zhgl" label="账户管理" width="130" />
            <el-table-column align="center" prop="zjhh" label="资金汇划" width="130" />
            <el-table-column align="center" prop="pj" label="票据" width="130" />
            <el-table-column align="center" prop="lwhc" label="联网核查" width="130" />
            <el-table-column align="center" prop="dzzf" label="电子支付" width="130" />
            <el-table-column
              align="center"
              prop="fyhzf"
              label="非银行支付机构网络支付"
              width="130"
            />
            <el-table-column align="center" prop="hdyw" label="汇兑业务" width="130" />
            <el-table-column align="center" prop="dytyf" label="多用途预付费卡" width="130" />
            <el-table-column align="center" prop="other4" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal5" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="人民币管理">
            <el-table-column
              align="center"
              prop="csws"
              label="残损、污损币兑换（收存）"
              width="130"
            />
            <el-table-column align="center" prop="jbjdy" label="假币鉴定与收缴" width="130" />
            <el-table-column
              align="center"
              prop="xmerm"
              label="小面额人民币兑换（收存）"
              width="130"
            />
            <el-table-column align="center" prop="jnb" label="纪念币（钞）" width="130" />
            <el-table-column align="center" prop="other5" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal6" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="外汇">
            <el-table-column align="center" prop="grjsh" label="个人结售汇" width="130" />
            <el-table-column align="center" prop="grwh" label="个人外汇汇款" width="130" />
            <el-table-column align="center" prop="jrwkjy" label="个人外汇交易" width="130" />
            <el-table-column align="center" prop="grwhch" label="个人外汇储蓄" width="130" />
            <el-table-column align="center" prop="whzhgl" label="外汇账户管理" width="130" />
            <el-table-column align="center" prop="other6" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal7" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="贵金属">
            <el-table-column align="center" prop="zyswg" label="自营实物贵金属" width="130" />
            <el-table-column align="center" prop="zyzhg" label="自营账户贵金属" width="130" />
            <el-table-column align="center" prop="dlgjs" label="代理贵金属交易" width="130" />
            <el-table-column align="center" prop="other7" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal8" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="个人金融信息">
            <el-table-column align="center" prop="grxyxx" label="个人信用信息采集" width="130" />
            <el-table-column align="center" prop="grxyxxsy" label="个人信用信息使用" width="130" />
            <el-table-column
              align="center"
              prop="grxyxxyy"
              label="个人信用信息异议处理"
              width="130"
            />
            <el-table-column
              align="center"
              prop="cxyxx"
              label="除信用信息之外的个人金融信息的收集与使用"
              width="130"
            />
            <el-table-column align="center" prop="other8" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal9" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="银行代理业务">
            <el-table-column align="center" prop="dlbxyw" label="代理保险业务" width="130" />
            <el-table-column align="center" prop="dlzqyw" label="代理证券业务" width="130" />
            <el-table-column align="center" prop="dlqhyw" label="代理期货业务" width="130" />
            <el-table-column align="center" prop="dlxtyw" label="代理信托业务" width="130" />
            <el-table-column align="center" prop="dljjyw" label="代理基金业务" width="130" />
            <el-table-column align="center" prop="dlthyw" label="代理他行业务" width="130" />
            <el-table-column align="center" prop="other9" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal10" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="其他中间业务">
            <el-table-column align="center" prop="grzxzm" label="个人资信证明" width="130" />
            <el-table-column align="center" prop="bxx111" label="保险箱" width="130" />
            <el-table-column align="center" prop="dsdfyw" label="代收代付业务" width="130" />
            <el-table-column align="center" prop="other10" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal11" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="债务催收">
            <el-table-column align="center" prop="xykzwcs" label="信用卡债务催收" width="130" />
            <el-table-column align="center" prop="dkzwcs" label="贷款债务催收" width="130" />
            <el-table-column align="center" prop="other11" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal12" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="国库">
            <el-table-column align="center" prop="gz111" label="国债" width="130" />
            <el-table-column align="center" prop="ssyhz" label="税收与行政事业性收费" width="130" />
            <el-table-column align="center" prop="zjbf" label="资金拨付" width="130" />
            <el-table-column align="center" prop="other12" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal13" label="小计" width="130" />
          </el-table-column>
          <el-table-column align="center" label="其他">
            <el-table-column align="center" prop="gnlyw" label="功能类业务" width="130" />
            <el-table-column align="center" prop="qtyhyw" label="其他银行业务" width="130" />
            <el-table-column align="center" prop="hjfw" label="呼叫服务" width="130" />
            <el-table-column align="center" prop="other13" label="其他" width="130" />
            <el-table-column align="center" prop="subtotal14" label="小计" width="130" />
          </el-table-column>
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
import { getListTypeArea } from '@/api/complaint-inquiry'
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
    getListTypeArea({
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