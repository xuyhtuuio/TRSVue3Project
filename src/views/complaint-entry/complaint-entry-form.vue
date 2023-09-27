<template>
  <div class="outter">
    <div class="smart-fill">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">智能填写</div>
      </div>
      <el-upload class="upload-demo" drag multiple>
        <div class="top">
          <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
          <div class="intro">上传图片、文件智能识别投诉信息</div>
        </div>
        <div class="suggest">
          建议上传jpg/png/excel/docx/doc/pdf等格式的文件，建议文件大小不超过200M
        </div>
      </el-upload>
    </div>
    <div class="">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">客户基本信息</div>
      </div>
      <el-form
        :inline="true"
        :model="basicInformationList"
        size="small"
        :rules="basicRules"
        label-width="100px"
      >
        <el-row gutter="24">
          <el-col :span="8">
            <el-form-item label="客户姓名：" prop="name">
              <div class="choose-item-background">
                <el-input
                  placeholder="请输入客户姓名"
                  v-model="basicInformationList.name"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型：" prop="client">
              <div class="choose-item-background">
                <el-radio-group v-model="basicInformationList.kehuRadio" class="ml-4">
                  <el-radio label="geren" size="small"> 个人客户</el-radio>
                  <el-radio label="duigong" size="small"> 对公客户</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式：" prop="connect">
              <div class="choose-item-background">
                <el-input
                  placeholder="客户联系方式"
                  v-model="basicInformationList.connect"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="cardType">
              <div class="choose-item-background">
                <el-select
                  v-model="basicInformationList.cardType"
                  placeholder="请选择证件类型"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.cardType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="cardNum">
              <div class="choose-item-background">
                <el-input placeholder="请输入证件号码" v-model="basicInformationList.cardNum" />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="开户账号：" prop="accountNum">
              <div class="choose-item-background">
                <el-input placeholder="请输入开户账号" v-model="basicInformationList.accountNum" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱：" class="right-move">
              <div class="choose-item-background">
                <el-input placeholder="请输入电子邮箱" v-model="basicInformationList.email" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业：">
              <div class="choose-item-background">
                <el-input placeholder="请输入职业" v-model="basicInformationList.profession" />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">投诉要素</div>
      </div>

      <complaintElementArea />
      <div class="uploadMusic" style="margin-left: 32px">
        附件材料
        <el-upload
          :file-list="fileList"
          class="upload-demo"
          multiple
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
        >
          <div class="upload-button">
            <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
            <div class="upload-content">上传附件</div>
          </div>
          <div class="upload-intro">
            建议上传jpg/png/xls/txt/pptx/ppt/docx/doc/pdf等格式的文件，建议文件大小不超过200M
          </div>
        </el-upload>
      </div>
    </div>
    <div class="bottom-area">
      <div class="inner-content">
        <div class="handle-reduce-button">取消</div>
        <div class="handle-button">存草稿</div>
        <div class="handle-button">提交</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import complaintElementArea from './components/complaint-element-area.vue'
const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href

/**
 * 表单数据
 */
const basicInformationList = reactive({
  name: '',
  kehuRadio: '',
  connect: '',
  cardType: '',
  cardNum: '',
  accountNum: '',
  email: '',
  profession: ''
})

/**
 * 选项大全
 */
const totType = reactive({
  cardType: [
    {
      value: '身份证',
      label: '身份证'
    }
  ],
  complaintResource: [
    {
      value: '银保监会系统转来投诉',
      label: '银保监会系统转来投诉'
    }
  ],
  complaintWay: [
    {
      value: '电话渠道',
      label: '电话渠道'
    }
  ],
  complaintNature: [
    {
      value: '投诉',
      label: '投诉'
    }
  ],
  businessCategories: [
    {
      value: '债务催收',
      label: '债务催收'
    }
  ],
  productType: [
    {
      value: '个人住房贷款业务',
      label: '个人住房贷款业务'
    }
  ]
})

/**
 * 上部验证规则
 */
const basicRules = {
  name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
  client: [
    {
      required: true,
      message: '请选择客户类型',
      trigger: 'blur'
    }
  ],
  connect: [
    {
      required: true,
      message: '请输入客户联系方式',
      trigger: 'blur'
    }
  ],
  cardType: [
    {
      required: true,
      message: '请输入证件类型',
      trigger: 'blur'
    }
  ],
  cardNum: [
    {
      required: true,
      message: '请输入证件号码',
      trigger: 'blur'
    }
  ],
  accountNum: [
    {
      required: true,
      message: '请输入开户账号',
      trigger: 'blur'
    }
  ]
}
</script>

<style scoped>
.outter {
  padding: 20px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  /* width: 85vw; */
}

.row-item {
  display: flex;
}

:deep(.el-row) {
  width: 100%;
}
.choose-item-background {
  background-color: #f7f8fa;
  width: 100%;
  height: 30px;
  padding-left: 10px;
  border-radius: 5px;
  display: flex;
  align-content: center;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0;
  background-color: transparent;
}

.title {
  margin: 10px 0 10px 0;
}

.suggest {
  color: #a2a9b5;
}

.upload-icon-style {
  margin-right: 10px;
  width: 20px;
  height: 10px;
}

.upload-button {
  background-color: #f0f6ff;
  width: 128px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #2d5cf6;
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  color: #2d5cf6;
}

.upload-intro {
  margin-left: 20px;
  color: #a2a9b5;
}

:deep(.el-input__inner) {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
}

:deep(.el-textarea) {
  background-color: transparent;
}

.textarea-item-background {
  background-color: #f7f8fa;
  width: 77vw;
  height: 100px;
  padding-left: 10px;
  border-radius: 5px;
  display: flex;
  align-content: center;
}

.add-title {
  display: flex;
  margin: 20px 0 20px 0;
  align-content: center;
  flex-wrap: wrap;
}

.front-icon img {
  width: 20px;
  height: 20px;
}

.title-content {
  text-align: center;
  font-weight: 900;
  font-size: medium;
}

.uploadMusic {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 110%;
}

.top {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: #2d5cf6;
}

/* .right-move {
  margin-left: 10px;
}

.move-left {
  margin-left: -12px;
} */

.smart-fill {
  /* width: 84vw; */
}

.bottom-area {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.inner-content {
  display: flex;
}

.handle-reduce-button {
  width: 90px;
  height: 35px;
  border: 1px solid #2d5cf6;
  background-color: #f0f6ff;
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  color: #2d5cf6;
  border-radius: 4px;
  margin-right: 20px;
}

.handle-button {
  width: 90px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: #2d5cf6;
  color: #ffffff;
  border-radius: 4px;
  margin-right: 20px;
}

:deep(.el-textarea__inner) {
  background-color: transparent;
  border: none;
  outline: none;
  height: 100px;
}

:deep(.el-textarea__inner) {
  box-shadow: 0 0 0 0px;
}
:deep(.el-textarea__inner:hover) {
  box-shadow: 0 0 0 0px;
}
:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 0px;
}
:deep(.el-upload-dragger) {
  background-color: #f0f6ff;
}

:deep(.el-form) {
  flex-wrap: wrap;
  display: flex;
}

:deep(.el-form--inline .el-form-item) {
  /* margin-right: 40px; */
  /* flex: 1; */
  width: 100%;
}

:deep(.el-form-item--small .el-form-item__label) {
  font-size: 110%;
  font-weight: 600;
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 0px;
}

:deep(.el-select) {
  width: 100%;
}
</style>

