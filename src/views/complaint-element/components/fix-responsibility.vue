<script setup>
import { reactive, ref } from 'vue'
import { Search, CaretBottom } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import secondaryConfirmation from '../../../components/secondaryConfirmation.vue'
import { dataTwo, dataThree } from '../data/fix-responsibility.json'
const formData = reactive({
  textarea: '',
  cooperation: '',
  own: '',
  sutra: ''
})

const reasonOptions = [
  '营业秩序问题',
  '营销宣传问题',
  '贷款放款问题',
  '贷款还款问题',
  '贷款催收问题',
  '贷款征信问题',
  '定价收费问题',
  '信息安全问题',
  '礼品、商品等质量及退换货问题',
  '申购赎回规则问题',
  '产品收益问题',
  '产品操作交易问题',
  '诈骗问题',
  '账务处理问题',
  '工作人员业务不熟练问题'
]

const rule = {
  reason: { required: true, message: '请选择投诉原因' }
}
// 表格
let tableData = reactive([])

let tableDataTwo = reactive([])

// 添加责任人
const responsiblePersonForm = reactive({
  search: ''
})
const personList = reactive([
  {
    name: '谭新宇',
    id: '1'
  },
  {
    name: '谭新',
    id: '2'
  },
  {
    name: '刘红',
    id: '3'
  }
  // {
  //   name: '刘伟',
  //   id: '4'
  // },
  // {
  //   name: '刘秀',
  //   id: '5'
  // }
])
const responsiblePerson = ref(null)
const addResponsiblePerson = () => {
  responsiblePerson.value.openDialog()
}
const searchList = () => {}
const handleAddResponsiblePerson = () => {
  const exist = personList.find((item) => item.name === responsiblePersonForm.search)
  if (!exist) {
    personList.unshift({
      name: responsiblePersonForm.search,
      id: personList.length + ''
    })
  } else {
    ElMessage({
      message: '该负责人已添加',
      type: 'warning'
    })
  }
}
const handleDeletePerson = (id) => {
  const index = personList.findIndex((item) => item.id === id)
  personList.splice(index, 1)
}
const saveResponsiblePerson = () => {
  tableData.push({
    name: '谭新宇',
    propPeople: '分行大堂经理助理',
    workId: '12345678910511',
    propResponse: '0',
    remark: []
  })
  responsiblePerson.value.closeDialog()
}
// 新增关联投诉单
const relevanceForm = reactive({
  search: '',
  username: '',
  businessType: '',
  complaintChannel: '',
  complaintDept: ''
})
const tableDataRelevance = reactive(dataThree)
const relevance = ref(null)
const addRelevance = () => {
  relevance.value.openDialog()
}
const searchRelevanceList = () => {}
const handleResetRelevanceFilter = () => {}
const handleAddRelevance = (row) => {
  if (row.op) {
    row.op = false
  } else {
    row.op = true
  }
}
const saveAddRelevance = () => {
  tableDataTwo.push(dataTwo[0])
  relevance.value.closeDialog()
}

const isDisabled = ref(false)
const refForm = ref(null)
const CheckRule = () => {
  return new Promise((resolve, reject) => {
    refForm.value.validate((valid) => {
      if (valid) {
        isDisabled.value = true
        resolve(formData)
      } else {
        reject()
        return false
      }
    })
  })
}
defineExpose({ CheckRule })
</script>
<template>
  <div class="fix-responsibility">
    <el-form
      :model="formData"
      :rules="rule"
      ref="refForm"
      :disabled="isDisabled"
      class="my-form"
      label-width="100"
    >
      <el-row :gutter="32">
        <el-col :span="24">
          <el-form-item label="请选择" class="my-form-item">
            <el-radio-group v-model="formData.placechange">
              <el-radio label="1">银行无过错/无责任</el-radio>
              <el-radio label="2">银行无过错/无责任</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item prop="reason" class="my-label">
            <template #label>
              <p class="label-item">投诉原因</p>
              <p class="label-item">(行方)</p>
            </template>
            <el-select
              v-model="formData.reason"
              placeholder="请选择投诉原因"
              :suffix-icon="CaretBottom"
              clearable
              size="large"
            >
              <el-option v-for="item in reasonOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产生舆情" class="my-form-item">
            <el-radio-group v-model="formData.lawyer" class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button plain @click="addResponsiblePerson">添加责任人</el-button>
          <secondaryConfirmation
            title="添加责任人"
            ref="responsiblePerson"
            @save="saveResponsiblePerson"
          >
            <div>
              <div>
                <el-input
                  v-model="responsiblePersonForm.search"
                  placeholder="请输入责任人姓名"
                  clearable
                  style="margin-right: 16px; width: 80%"
                  @clear="searchList"
                  @keyup.enter="searchList"
                  :suffix-icon="Search"
                >
                </el-input>
                <el-button plain @click="handleAddResponsiblePerson">添加</el-button>
              </div>
              <ul class="person-list trs-scroll">
                <li class="person-list-li" v-for="item in personList" :key="item.id">
                  <span class="name">{{ item.name }}</span>
                  <span class="delete" @click="handleDeletePerson(item.id)">删除</span>
                </li>
              </ul>
            </div>
          </secondaryConfirmation>
        </el-col>
      </el-row>

      <el-table class="trs-table" :data="tableData" style="width: 100%; margin-top: 16px">
        <el-table-column prop="propPeople" label="责任人" align="center" width="218">
          <template #default="{ row }">
            <span class="tag">{{ row.name }} | {{ row.propPeople }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="workId" label="工号" align="center" width="164" />
        <el-table-column prop="propResponse" label="责任占比" align="center" width="150">
          <template #default="{ row }">
            <el-row style="align-items: center" class="tag">
              <el-col :span="20"
                ><el-input v-model="row.propResponse">{{ row.propResponse }} </el-input>
              </el-col>
              <el-col :span="4"> % </el-col>
            </el-row>
            <!-- <span class="tag"></span><span>%</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" sortable>
          <template #default="{ row }">
            <div class="flex">
              <div class="left">
                <p v-for="(item, index) in row.remark" :key="item">{{ index + 1 }}.{{ item }}</p>
              </div>
              <div class="right">清除责任人</div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-col :span="7" class="my-form complain">
        <el-form-item label="是否集体投诉" class="my-form-item">
          <el-radio-group v-model="formData.sutra">
            <el-radio label="1" size="large">是</el-radio>
            <el-radio label="2" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-button class="my-button" type="primary" @click="addRelevance">新增关联投诉单</el-button>
      <secondaryConfirmation
        title="添加关联投诉单"
        width="70%"
        ref="relevance"
        @save="saveAddRelevance"
      >
        <div class="floor2">
          <div class="floor2-item">
            <el-select
              v-model="relevanceForm.businessType"
              placeholder="业务类型"
              @change="searchRelevanceList"
              clearable
              @clear="searchRelevanceList"
              :suffix-icon="CaretBottom"
            >
              <el-option
                v-for="(item, index) in $field('methods_origin')"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="floor2-item">
            <el-select
              v-model="relevanceForm.complaintChannel"
              placeholder="投诉办法渠道"
              @change="searchRelevanceList"
              clearable
              @clear="searchRelevanceList"
              :suffix-icon="CaretBottom"
            >
              <el-option
                v-for="(item, index) in $field('complaint_channel')"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="floor2-item">
            <el-select
              v-model="relevanceForm.complaintDept"
              placeholder="投诉机构"
              @change="searchRelevanceList"
              clearable
              @clear="searchRelevanceList"
              :suffix-icon="CaretBottom"
            >
              <el-option
                v-for="(item, index) in $field('complaint_body')"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="floor2">
          <div class="floor2-item">
            <el-input
              v-model="relevanceForm.search"
              placeholder="请输入投诉编码查询"
              clearable
              style="margin-right: 16px"
              @clear="searchRelevanceList"
              @keyup.enter="searchRelevanceList"
              :suffix-icon="Search"
            >
            </el-input>
          </div>
          <div class="floor2-item">
            <el-input
              v-model="relevanceForm.username"
              placeholder="请输入客户姓名查询"
              clearable
              style="margin-right: 16px"
              @clear="searchRelevanceList"
              @keyup.enter="searchRelevanceList"
              :suffix-icon="Search"
            >
            </el-input>
            <el-button plain @click="handleResetRelevanceFilter">重置</el-button>
          </div>
        </div>
        <el-table
          class="trs-table"
          :data="tableDataRelevance"
          style="width: 100%; margin-top: 16px"
        >
          <el-table-column label="操作" width="60" align="center">
            <template #default="scope">
              <span
                v-if="scope.row.op"
                class="pointer table-ops table-ops-red"
                @click="handleAddRelevance(scope.row)"
                >删除</span
              >
              <span
                v-else
                class="pointer table-ops table-ops-blue"
                @click="handleAddRelevance(scope.row)"
                >添加</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="no" label="投诉编码" sortable width="160" align="center">
            <template #default="scope">
              <span class="pointer series-number">{{ scope.row.no }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="客户姓名" sortable align="center" width="120" />
          <el-table-column prop="reason" label="投诉来源" align="center" width="200" />
          <el-table-column prop="orgName" label="投诉单位" align="center" />
          <el-table-column prop="status" label="状态" align="center" width="100">
            <template #default="scope">
              <el-tag class="ml-2" type="warning">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </secondaryConfirmation>

      <el-table class="trs-table" :data="tableDataTwo" style="width: 100%; margin-top: 16px">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="no" label="投诉编码" sortable width="160" align="center">
          <template #default="scope">
            <span class="pointer series-number">{{ scope.row.no }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="投诉时间" sortable align="center" width="180" />
        <el-table-column prop="businessType" label="业务类型" sortable align="center" width="180" />
        <el-table-column
          prop="manageChannel"
          label="投诉办理渠道"
          align="center"
          width="200"
          sortable
        />
        <el-table-column prop="reason" label="投诉原因" align="center" width="300" sortable />
        <el-table-column prop="orgName" label="投诉机构名称" width="180" align="center" />
      </el-table>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.fix-responsibility {
  margin-top: 16px;
  padding: 0 24px;
  .flex {
    align-items: center;
    .left {
      flex: 1;
      padding: 12px 16px;
      border-radius: 4px;
      background-color: #f7f8fa;
      line-height: 22px;
    }
    .right {
      margin-left: 28px;
      width: 100px;
      color: #2d5cf6;
    }
  }

  .complain {
    margin: 16px 0;
  }

  .my-button {
    font-weight: normal;
    &::before {
      content: '+';
      position: relative;
      top: -1px;
      display: inline-block;
      font-size: 20px;
      margin-right: 8px;
    }
  }
}
.my-label {
  :deep(.el-form-item__label) {
    display: flex;
    flex-direction: column;
    line-height: 16px;
    align-items: flex-end;

    .label-item {
      &:last-child {
        font-size: 20px;
        transform: scale(50%);
        transform-origin: right center;
      }
    }
  }
  &.is-required {
    :deep(.el-form-item__label) {
      &::before {
        content: '' !important;
      }

      .label-item {
        &:first-child {
          &::before {
            content: '*';
            color: var(--el-color-danger);
            margin-right: 4px;
          }
        }
      }
    }
  }
}

.my-form-item-1 {
  :deep(.el-form-item__content) {
    background-color: #fff;
  }
}
.person-list {
  margin-top: 24px;
  max-height: 200px;
  overflow: auto;
  &-li {
    display: flex;
    padding: 8px 12px;
    justify-content: space-between;
    gap: 10px;
    align-self: stretch;
    border-radius: 4px;
    border-bottom: 1px dashed #e5e6eb;
    .delete {
      color: #ffffff;
      pointer-events: none;
    }
    &:hover {
      background: #f7f8fa;
      .delete {
        color: #2d5cf6;
        cursor: pointer;
        pointer-events: auto;
      }
    }
  }
}
.table-ops {
  &-red {
    color: #eb5757;
  }
  &-blue {
    color: #2d5cf6;
  }
}
.floor2 {
  width: 100%;
  display: flex;
  padding-right: 16px;
  align-items: center;
  :deep(.el-input__wrapper) {
    box-shadow: none;
    background-color: #f7f8fa;
  }

  .floor2-item {
    flex: 1;
    margin-right: 16px;
    display: flex;
    align-items: center;
    .el-select {
      width: 100%;
      margin-bottom: 16px;
    }
    .el-input {
      width: 100%;
    }

    span {
      color: #86909c;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      word-break: keep-all;
      margin-right: 8px;
    }
  }

  .floor2-item:last-of-type {
    margin-right: 0;
  }
}




</style>
