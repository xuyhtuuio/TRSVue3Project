<script setup>
import { reactive } from 'vue'
import { data, dataTwo } from '../data/fix-responsibility.json'
const formData = reactive({
  textarea: '',
  cooperation: '',
  own: '',
  sutra: ''
})
const levelOptions = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
const options = []
const rule = {
  reason: { required: true }
}
// 表格
let tableData = reactive(null)
tableData = data

let tableDataTwo = reactive()
tableDataTwo = dataTwo
</script>
<template>
  <div class="fix-responsibility">
    <el-form :model="formData" :rules="rule" class="my-form" label-width="100">
      <el-row :gutter="32">
        <el-col :span="24">
          <el-form-item label="请选择" class="my-form-item">
            <el-radio-group v-model="formData.placechange">
              <el-radio label="1">银行无过错/无责任</el-radio>
              <el-radio label="2">银行无过错/无责任</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="7">
          <el-form-item label="投诉等级" prop="complaintLevel">
            <el-select
              v-model="formData.complaintLevel"
              placeholder="请选择"
              :suffix-icon="CaretBottom"
              clearable
            >
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="经典案例" prop="sutra" class="my-form-item">
            <el-radio-group v-model="formData.sutra">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="责任人" prop="duty">
            <el-select
              v-model="formData.duty"
              placeholder="请选择或输入责任人"
              :suffix-icon="CaretBottom"
              clearable
            >
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button plain>批量上传</el-button>
        </el-col> -->
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
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
          <el-form-item label="责任人" prop="satisfaction" class="my-form-item-1">
            <el-button plain>添加责任人</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table class="trs-table" :data="tableData" style="width: 100%; margin-top: 16px">
      <el-table-column prop="propPeople" label="责任人" align="center" width="218">
        <template #default="{ row }">
          <span class="tag">{{ row.name }} | {{ row.propPeople }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="workId" label="工号" align="center" width="164" />
      <el-table-column prop="propResponse" label="责任占比" align="center" width="150">
        <template #default="{ row }">
          <span class="tag">{{ row.propResponse }} </span><span>%</span>
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

    <el-button class="my-button" type="primary">新增关联投诉单</el-button>

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
</style>
