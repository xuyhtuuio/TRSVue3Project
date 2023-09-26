<script setup>
import { reactive } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
const formInline = reactive({
  content:
    '客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体、向相关监管部门投诉或寻求法律途径。银行工作人员表示会下午5点前反馈，需尽快核实并处理问题。'
})

const sourceOptions = [
  { label: '123', value: '2' },
  { label: '1234', value: '21' },
  { label: '1235', value: '12' },
  { label: '1236', value: '22' }
]
const rule = {
  source: [{ required: true, message: '请选择投诉来源' }],
  repeat: [{ required: true, message: '请选择重复投诉' }],
  turnTo: [{ required: true, message: '请选择监管转办' }],
  channel: [{ required: true, message: '请选择投诉渠道' }],
  lv: [{ required: true, message: '请选择投诉等级' }],
  time: [{ required: true, message: '请选择投诉时间' }],
  dot: [{ required: true, message: '请选择涉及网点' }],
  reason: [{ required: true, message: '请选择投诉原因' }],
  appeal: [{ required: true, message: '请选择投诉诉求' }]
}
</script>
<template>
  <div class="complaint-details bgc-white">
    <gTableCard title="投诉要素" class="title-item">
      <template #head-right>
        <span style="margin-right: 8px; color: #86909c">更新时间：2023-02-09 11：55：00</span>
        <el-button type="primary" style="font-weight: 700; padding: 0 30px">编辑</el-button>
      </template>
      <template #content>
        <div class="content">
          <el-form label-width="100" class="my-form" :model="formInline" :rules="rule">
            <el-form-item label="沟通语音" class="my-form-item-1"> </el-form-item>
            <el-form-item label="投诉内容">
              <div class="gray">
                <el-input
                  v-model="formInline.content"
                  :rows="4"
                  type="textarea"
                  resize="none"
                  placeholder="请输入处理记录"
                />
                <div class="btn"><span class="text">智能填写</span></div>
              </div>
            </el-form-item>

            <el-row :gutter="32">
              <el-col :span="8">
                <el-form-item label="投诉来源" prop="source">
                  <el-select
                    v-model="formInline.source"
                    placeholder="请选择投诉来源"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="重复投诉" class="my-form-item" prop="repeat">
                  <el-radio-group v-model="formInline.repeat">
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="监管转办" class="my-form-item" prop="turnTo">
                  <el-radio-group v-model="formInline.turnTo">
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投诉渠道" prop="channel">
                  <el-select
                    v-model="formInline.channel"
                    placeholder="请选择投诉渠道"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投诉等级" prop="lv">
                  <el-select
                    v-model="formInline.lv"
                    placeholder="请选择投诉等级"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="紧急程度" prop="exigency">
                  <el-select
                    v-model="formInline.exigency"
                    placeholder="请选择紧急程度"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投诉时间" prop="time">
                  <el-date-picker
                    v-model="formInline.time"
                    type="date"
                    placeholder="更新时间"
                    class="floor1-item"
                    clearable
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="涉及网点" prop="dot">
                  <el-select
                    v-model="formInline.dot"
                    placeholder="请选择涉及网点"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被投诉单位" prop="beComplained">
                  <el-select
                    v-model="formInline.beComplained"
                    placeholder="请选择被投诉单位"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务大类分类" prop="sort">
                  <el-select
                    v-model="formInline.sort"
                    placeholder="请选择业务大类分类"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务子类" prop="subclass">
                  <el-select
                    v-model="formInline.subclass"
                    placeholder="请选择业务子类"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品类型" prop="product">
                  <el-select
                    v-model="formInline.product"
                    placeholder="请选择产品类型"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="double" prop="reason">
                  <template #label>
                    <p class="label-item">投诉原因</p>
                    <p class="label-item">(客户视角)</p>
                  </template>
                  <el-select
                    v-model="formInline.reason"
                    placeholder="请选择投诉原因"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="" class="double" prop="appeal">
                  <template #label>
                    <p class="label-item">投诉诉求</p>
                    <p class="label-item">(客户视角)</p>
                  </template>
                  <el-select
                    v-model="formInline.appeal"
                    placeholder="请选择投诉诉求"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="敏感信息" prop="sensitiveness">
                  <el-select
                    v-model="formInline.sensitiveness"
                    placeholder="请选择敏感信息"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被投诉人员" prop="people">
                  <el-select
                    v-model="formInline.people"
                    placeholder="请选择被投诉人员"
                    :suffix-icon="CaretBottom"
                    clearable
                    size="large"
                  >
                    <el-option
                      v-for="item in sourceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
    </gTableCard>
    <gTableCard title="投诉相关附件" class="my-table-card" style="margin-top: -28px">
      <template #content>
        <img class="img" src="@/assets/image/no-data.png" alt="" />
      </template>
    </gTableCard>
  </div>
</template>

<style lang="less" scoped>
.complaint-details {
  .my-form {
    .my-form-item-1 {
      :deep(.el-form-item__content) {
        background-color: #fff;
      }
    }
    .gray {
      width: 100%;
      padding: 8px;
      line-height: 22px;

      .btn {
        color: #2d5cf6;
        font-size: 12px;
        text-align: right;
        &:before {
          content: '';
          display: inline-block;
          margin-right: 6px;
          width: 16px;
          height: 16px;
          background: url('@/assets/image/warn.png');
          background-size: cover;
          vertical-align: sub;
        }
        .text {
          line-height: 28px;
          padding: 4px 12px;
          border-radius: 4px;
          background-color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
  .content {
    margin: 16px 0 0;
  }
  .img {
    display: block;
    margin-top: 16px;
    padding: 0 6px;
    width: 100%;
    height: 154px;
  }
}
:deep(.el-date-editor) {
  flex: 1;

  .el-input__prefix {
    position: absolute;
    right: 4px;
  }

  .clear-icon {
    position: absolute;
    right: 32px;
  }
}
</style>