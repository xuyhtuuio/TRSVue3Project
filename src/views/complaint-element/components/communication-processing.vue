<script setup>
import { ref, reactive, computed } from 'vue'
let firstRespond = reactive({
  refForm: ref(),
  isShow: true,
  isNext: false
})
let secondRespond = reactive([])
const secondRespondAsso = reactive({
  isNext: false
})
let threeRespond = reactive({
  refForm: ref(),
  isShow: true,
  isNext: false
})
const initData = (origin) => {
  Object.assign(firstRespond, origin[0])
  Object.assign(secondRespond, origin[1] || [])
  secondRespond.length &&
    secondRespond.forEach((item) => {
      item.refForm = ref()
    })
  Object.assign(threeRespond, origin[2] || [])
}
defineExpose({ initData })

const isSubmitCmt = computed(() => {
  return secondRespond.some((item) => item.editPermissions === 'E')
})
const emits = defineEmits(['submitTrue'])
const submit = (originData) => {
  if (originData === secondRespond) {
    const item = originData.find((item) => item.editPermissions === 'E')
    const { refForm } = item
    refForm.checkRule().then((data) => {
      emits('submitTrue', data, item.formModuleItemList, item.userInfo)
    })
  } else {
    const refForm = originData.refForm
    refForm.checkRule().then((data) => {
      emits('submitTrue', data, originData.formModuleItemList, originData.userInfo)
    })
  }
}
const saveDraft = (originData) => {
  if (originData === secondRespond) {
    const item = originData.find((item) => item.editPermissions === 'E')
    const { refForm } = item
    emits('submitTrue', refForm.formData, item.formModuleItemList, item.userInfo, false)
  } else {
    const refForm = originData.refForm
    emits('submitTrue', refForm.formData, originData.formModuleItemList, originData.userInfo, false)
  }
}

const isShowTwo = ref(true)
const handlePackUp = (originData) => {
  if (originData === secondRespond) {
    isShowTwo.value = !isShowTwo.value
  } else {
    originData.isShow = !originData.isShow
  }
}
const handleNextToggle = (originData, value) => {
  originData.isNext = value
}
</script>

<template>
  <div class="communication-processing">
    <!-- 首次响应 -->
    <div class="tableCard" v-if="Object.keys(firstRespond).length > 3">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">首次响应</span>
        </div>
        <div class="right">
          <div v-if="firstRespond.editPermissions === 'E'">
            <template v-if="!firstRespond.isNext">
              <el-button plain @click="handleClose">驳回</el-button>
              <el-button type="primary" @click="handleNextToggle(firstRespond, true)"
                >处理</el-button
              >
            </template>
            <template v-else>
              <el-button plain @click="handleNextToggle(firstRespond, false)">取消</el-button>
              <el-button type="primary" @click="saveDraft(firstRespond)">存草稿</el-button>
              <el-button type="primary" @click="submit(firstRespond)">提交</el-button>
            </template>
          </div>
          <span class="packUp" v-else @click="handlePackUp(firstRespond)">{{
            firstRespond.isShow ? '收起' : '展开'
          }}</span>
        </div>
      </div>

      <div class="person-info" v-show="firstRespond.isShow">
        <span>处理人：</span>
        <img class="img" src="@/assets/image/ocr-avatar.png" alt="" />
        <span class="name">{{ firstRespond.userInfo.name }}</span>
        <span class="info">
          <i
            class="info-item"
            v-for="(item, index) in firstRespond.userInfo.institutionalInformation"
            :key="index"
            >{{ item }}</i
          >
        </span>
      </div>
      <ComDynamicForm
        v-show="firstRespond.isShow"
        class="dynamic-form"
        :data="firstRespond.formModuleItemList"
        :isShowUpload="true"
        :isDisabled="!firstRespond.isNext || firstRespond.editPermissions !== 'E'"
        :ref="
          (el) => {
            firstRespond.refForm = el
          }
        "
      ></ComDynamicForm>
    </div>

    <div class="tableCard" v-if="Object.keys(secondRespond).length">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">调查核实</span>
        </div>
        <div class="right">
          <!-- <div v-show="isSubmitCmt">
            <el-button plain @click="handleClose">驳回</el-button>
            <el-button type="primary" @click="submit(secondRespond)">处理</el-button>
          </div> -->

          <div v-if="isSubmitCmt">
            <template v-if="!secondRespondAsso.isNext">
              <el-button plain @click="handleClose">驳回</el-button>
              <el-button type="primary" @click="handleNextToggle(secondRespondAsso, true)"
                >处理</el-button
              >
            </template>
            <template v-else>
              <el-button plain @click="handleNextToggle(secondRespondAsso, false)">取消</el-button>
              <el-button type="primary" @click="saveDraft(secondRespond)">存草稿</el-button>
              <el-button type="primary" @click="submit(secondRespond)">提交</el-button>
            </template>
          </div>
          <span class="packUp" v-else @click="handlePackUp(secondRespond)">{{
            isShowTwo ? '收起' : '展开'
          }}</span>
        </div>
      </div>

      <template v-for="(item, index) in secondRespond" :key="index">
        <div class="person-info" v-show="isShowTwo">
          <span class="num">{{ index + 1 }}</span>
          <span>处理人：</span>
          <img class="img" src="@/assets/image/ocr-avatar.png" alt="" />
          <span class="name">{{ item.userInfo.name }}</span>
          <span class="info">
            <i
              class="info-item"
              v-for="(item, index) in item.userInfo.institutionalInformation"
              :key="index"
              >{{ item }}</i
            >
          </span>
        </div>
        <ComDynamicForm
          v-show="isShowTwo"
          class="dynamic-form"
          :data="item.formModuleItemList"
          :isShowUpload="true"
          :isDisabled="!secondRespondAsso.isNext || item.editPermissions !== 'E'"
          :ref="
            (el) => {
              if (el) {
                item.refForm = el
              }
            }
          "
        ></ComDynamicForm>
      </template>
    </div>

    <!-- 回复客户 -->
    <div class="tableCard" v-if="Object.keys(threeRespond).length > 3">
      <div class="head">
        <div class="left">
          <div class="right-icon">
            <div class="icon"></div>
          </div>
          <span class="content">回复客户</span>
        </div>
        <div class="right">
          <div v-if="threeRespond.editPermissions === 'E'">
            <template v-if="!threeRespond.isNext">
              <el-button plain @click="handleClose">驳回</el-button>
              <el-button type="primary" @click="handleNextToggle(threeRespond, true)"
                >处理</el-button
              >
            </template>
            <template v-else>
              <el-button plain @click="handleNextToggle(threeRespond, false)">取消</el-button>
              <el-button type="primary" @click="saveDraft(threeRespond)">存草稿</el-button>
              <el-button type="primary" @click="submit(threeRespond)">提交</el-button>
            </template>
          </div>
          <span class="packUp" v-else @click="handlePackUp(threeRespond)">{{
            threeRespond.isShow ? '收起' : '展开'
          }}</span>
        </div>
      </div>

      <div class="person-info" v-show="threeRespond.isShow">
        <span>处理人：</span>
        <img class="img" src="@/assets/image/ocr-avatar.png" alt="" />
        <span class="name">{{ threeRespond.userInfo.name }}</span>
        <span class="info">
          <i
            class="info-item"
            v-for="(item, index) in threeRespond.userInfo.institutionalInformation"
            :key="index"
            >{{ item }}</i
          >
        </span>
      </div>
      <ComDynamicForm
        v-show="threeRespond.isShow"
        class="dynamic-form"
        :data="threeRespond.formModuleItemList"
        :isShowUpload="true"
        :isDisabled="!threeRespond.isNext || threeRespond.editPermissions !== 'E'"
        :ref="
          (el) => {
            threeRespond.refForm = el
          }
        "
      ></ComDynamicForm>
    </div>
  </div>
</template>

<style lang="less" scoped>
.communication-processing {
  padding: 0 24px;
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
      :deep(.el-radio) {
        height: 34px;
      }

      &.double {
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

  .my-button {
    margin-top: 16px;
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
// :deep(.el-form-item__content) {
//   padding-left: 16px;

//   .el-select {
//     width: 100%;
//   }

//   .el-input__wrapper {
//     box-shadow: none;
//     background-color: #f7f8fa;

//     &.is-active {
//       box-shadow: none;
//     }
//   }

//   .el-input__inner {
//     height: 34px;
//   }

//   .el-select {
//     margin-left: -16px;
//     width: calc(100% + 16px);

//     &:hover {
//       .el-input__wrapper {
//         box-shadow: none;
//       }
//     }

//     // .el-input.is-focus {
//     //   .el-input__wrapper.is-focus {
//     //     box-shadow: none !important;
//     //   }
//     // }
//   }
// }
:deep(.el-form) {
  &.my-form {
    .el-form-item__content {
      background-color: #fff;
    }
    .el-form-item-f {
      .el-form-item__content {
        background-color: transparent;
      }
    }
  }
  .el-input__wrapper {
    box-shadow: none;
    background-color: #fff;

    &.is-active {
      box-shadow: none;
    }
  }

  &.my-is-disabled {
    .el-form-item__content {
      background-color: transparent;
    }
    .el-input__wrapper {
      background-color: #f3f3f5;

      &.is-active {
        box-shadow: none;
      }
    }
    .el-textarea__inner {
      background-color: #f3f3f5;
    }
  }
  .el-select {
    width: 100%;
    &:hover {
      .el-input__wrapper {
        box-shadow: none;
      }
    }
  }
  .el-textarea__inner {
    background-color: #fff;
    box-shadow: 0 0 0 0;

    &:hover {
      box-shadow: 0 0 0 0;
    }
  }
}

:deep(.el-button) {
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

.iconfont {
  position: relative;
  top: -1px;
  &::before {
    font-size: 12px;
    margin-right: 8px;
  }
}
</style>
<style lang="less" scoped>
.tableCard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  .head {
    display: flex;
    align-items: center;
    padding: 2px 0;
    background: linear-gradient(90deg, #f7f8fa 0%, rgba(247, 248, 250, 0) 99.15%);
    .left {
      display: flex;
    }
    .right {
      margin-left: auto;
    }
    .icon {
      width: 5px;
      height: 20px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background: #306ef5;
    }
    .content {
      margin: 0 8px;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
    }
  }

  .person-info {
    display: flex;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 40px;
    .num {
      margin-right: 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #acb1b9;
      font-size: 20px;
      line-height: 32px;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin: 0 8px;
    }
    .name {
      margin-right: 16px;
      font-weight: 700;
      color: #1d2128;
    }
    .info {
      display: flex;
      gap: 8px;
      line-height: 22px;
      color: #505968;
      &-item {
        &:not(:last-child) {
          &::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 10px;
            background-color: #505968;
            margin-left: 8px;
          }
        }
      }
    }
  }

  .dynamic-form {
    padding: 12px;
    background-color: #f7f8fa;
  }

  .packUp {
    display: flex;
    align-items: center;
    height: 32px;
    color: #2d5cf6;
    cursor: pointer;
    &::after {
      content: '';
      margin-left: 6px;
      border-top: 6px solid #86909c;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }
}
</style>
