<template>
  <div class="communication-processing">
    <gTableCard :title="title" class="title-item">
      <template #content>
        <el-form :model="formInline" class="item" ref="ref-form" :rules="rule" :label-width="100">
          <el-form-item label="重复投诉">
            <el-radio-group v-model="formInline.repeat" class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="非本人投诉">
            <el-radio-group v-model="formInline.noOne" class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="律师陪同">
            <el-radio-group v-model="formInline.lawyer" class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="double" prop="reason">
            <template #label>
              <p class="label-item">投诉原因</p>
              <p class="label-item">(行方)</p>
            </template>
            <el-select
              v-model="formInline.reason"
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
          <el-form-item class="double" prop="appeal">
            <template #label>
              <p class="label-item">投诉诉求</p>
              <p class="label-item">(行方)</p>
            </template>
            <el-select
              v-model="formInline.appeal"
              :suffix-icon="CaretBottom"
              clearable
              placeholder="请选择投诉诉求"
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
          <el-form-item label="产生舆情">
            <el-radio-group v-model="formInline.lawyer" class="ml-4">
              <el-radio label="1" size="large">是</el-radio>
              <el-radio label="2" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="double" prop="manage">
            <template #label>
              <p class="label-item">投诉诉求</p>
              <p class="label-item">(监管)</p>
            </template>
            <el-checkbox-group v-model="formInline.manage">
              <el-checkbox v-for="city in manage" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
    </gTableCard>
    <gTableCard title="处理过程" class="title-item">
      <template #content>
        <el-form
          :model="formInline"
          class="item item-one"
          ref="ref-form-one"
          :rules="ruleOne"
          :label-width="100"
        >
          <el-form-item label="沟通语音">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action=""
              multiple
              :limit="3"
            >
              <el-button plain
                ><el-icon class="icon"> <UploadFilled /> </el-icon>重新上传</el-button
              >
              <span class="tips">建议上传mp3格式的文件</span>
              <template #tip>
                <div class="content">jpg/png files with a size less than 500KB.</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="沟通记录">
            <div class="record-content">
              这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述
              这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述这里是投诉内容描述
              这里做多展示5行内容，溢出用滚动条展示
            </div>
          </el-form-item>
          <el-form-item label="主要措施">
            <el-checkbox-group v-model="formInline.manageOne">
              <el-checkbox v-for="city in manageOne" :key="city" :label="city">{{
                city
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="客户是否接受" class="half">
            <el-radio-group v-model="formInline.repeatOne">
              <el-radio label="2" size="large">否</el-radio>
              <el-radio label="1" size="large">是（含客户主动撤销）</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </gTableCard>
    <gTableCard title="相关材料">
      <template #content>
        <AttachmentUpload class="item" ref="ref-attachment-upload" />
      </template>
    </gTableCard>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import AttachmentUpload from './attachment-upload.vue'
const title = '投诉核实'
const formInline = reactive({
  repeat: '',
  manage: []
})
const rule = {
  name: '1231',
  reason: {
    required: true,
    message: '请选择投诉原因',
    trigger: 'blur'
  },
  appeal: {
    required: true,
    message: '请选择投诉诉求',
    trigger: 'blur'
  },
  manage: {
    required: true,
    message: '请选择投诉监管',
    trigger: 'blur'
  }
}
const options = [
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
const manage = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
const manageOne = [
  '沟通赔偿',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉',
  '赔礼道歉'
]
</script>

<style lang="less" scoped>
.communication-processing {
  .item {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;

    &.item-one {
      .el-form-item {
        &:first-child {
          :deep(.el-form-item__content) {
            background-color: #fff;
          }
        }

        &:nth-child(-n + 2) {
          align-items: flex-start;
        }

        width: 100%;

        &.half {
          width: 400px;
        }

        .tips {
          margin-left: 16px;
          color: #86909c;
        }

        .content {
          margin-top: 16px;
        }

        .record-content {
          padding: 8px 16px;
          line-height: 22px;
        }
      }
    }

    .el-form-item {
      align-items: center;
      width: calc(calc(100% - 64px) / 3);
      margin: 0;

      &:last-child {
        width: 100%;
      }
      :deep(.el-radio) {
        height: 34px;
      }
      :deep(.el-form-item__content) {
        background-color: #f7f8fa;
        border-radius: 4px;
        padding-left: 16px;
      }

      &.double {
        :deep(.el-form-item__label){
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
          :deep(.el-form-item__label)
 {
            &::before {
              content: '';
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
    }
  }
}
:deep(.el-form-item__content) 
 {
  padding-left: 16px;

  .el-select {
    width: 100%;
  }

  .el-input__wrapper {
    box-shadow: none;
    background-color: #f7f8fa;

    &.is-active {
      box-shadow: none;
    }
  }

  .el-input__inner {
    height: 34px;
  }

  .el-select {
    margin-left: -16px;
    width: calc(100% + 16px);

    &:hover {
      .el-input__wrapper {
        box-shadow: none;
      }
    }

    // .el-input.is-focus {
    //   .el-input__wrapper.is-focus {
    //     box-shadow: none !important;
    //   }
    // }
  }
}
:deep(.el-button) .el-button {
  &.is-plain {
    color: #2d5cf6;
    border-color: #80a6ff;
    background-color: #f0f6ff;
    border-radius: 6px;
    outline: 0;

    .icon {
      margin-right: 10px;
    }
  }
}
</style>
