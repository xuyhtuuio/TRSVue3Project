<template>
  <div class="outter">
    <div class="smart-fill" v-loading="loadingData.isLoading">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">智能填写</div>
      </div>
      <el-upload
        class="upload-demo"
        drag
        multiple
        action="/cwo/file/upload"
        :show-file-list="false"
        :http-request="uploadFileRequest">
        <div class="top">
          <el-icon class="upload-icon-style" size="20">
            <upload-filled/>
          </el-icon>
          <div class="intro">上传图片、文件智能识别投诉信息</div>
        </div>
        <div class="suggest">
          建议上传jpg/png/excel/docx/doc/pdf等格式的文件，建议文件大小不超过200M
        </div>
      </el-upload>
    </div>
    <div>
      <BasicInformation class="cnt-item" ref="basicInformationListRef" :list="data.basicInformation" />
      <ReconciliationPoint class="cnt-item" ref="complaintElementsListRef" :list="data.keyPointsForVerification"
        />
    </div>
    <div class="bottom-area">
      <div class="inner-content">
        <el-button class="handle-reduce-button">取消</el-button>
        <el-button class="handle-button">存草稿</el-button>
        <el-button class="handle-button" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="parseDialogVisible"
    center
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    style="width: 500px; height: 162px"
  >
    <div class="inner-dialog-content">
      <div class="top-img">
        <img :src="telegram" alt="" />
      </div>
      <div class="bottom-area-inner">
        <div class="bottom-content">
          <div class="bottom-word">{{ uploadInfo }}</div>
          <div class="loading-img"><img :src="loading" alt="" /></div>
        </div>
      </div>
    </div>
  </el-dialog>

  <el-dialog
    v-model="formDialogVisible"
    center
    align-center
    :before-close="handleClose"
    style="width: 800px; height: 470px"
  >
    <div class="inner-dialog-content">
      <div class="form-title">智能识别</div>
      <div class="bottom-area-inner">
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉来源</div>
              <div class="parse-form-value">银保监会系统转来投诉</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉渠道</div>
              <div class="parse-form-value">电话渠道</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉编码</div>
              <div class="parse-form-value">YH2023020921</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">客户姓名</div>
              <div class="parse-form-value">洪燕如</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">客户类型</div>
              <div class="parse-form-value">个人客户</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">监管转办</div>
              <div class="parse-form-value">是</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">证件类型</div>
              <div class="parse-form-value">身份证</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">证件号码</div>
              <div class="parse-form-value">340306197804050865</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">联系方式</div>
              <div class="parse-form-value">15829471667</div>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉内容</div>
              <div class="parse-form-value">
                客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体或寻求法律途径。
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="formDialogVisible = false" style="width: 138px; height: 38px"
          >取消填写</el-button
        >
        <el-button type="primary" @click="handleParse" style="width: 138px; height: 38px">
          确认填写
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="smartFillDialogVisible"
    center
    align-center
    :show-close="false"
    style="width: 800px; height: 302px"
  >
    <div class="inner-dialog-content">
      <div class="form-title">智能填写内容</div>
      <div class="bottom-area-inner">
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉原因（客户视角）</div>
              <div class="parse-form-value">因债务催收方式和手段引起的投诉</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉诉求（客户视角）</div>
              <div class="parse-form-value">停止骚扰</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">敏感信息</div>
              <div class="parse-form-value">情绪激动、舆情类、司法类、监管类</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">业务大类</div>
              <div class="parse-form-value">贷款</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">产品类型</div>
              <div class="parse-form-value">个人住房贷款业务</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="smartFillDialogVisible = false" style="width: 138px; height: 38px"
          >取消填写</el-button
        >
        <el-button type="primary" @click="handleSmartFill" style="width: 138px; height: 38px">
          确认填写
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, nextTick } from 'vue'
import { CaretBottom, InfoFilled } from '@element-plus/icons-vue'
import telegram from '@/assets/image/telegram.png'
import loading from '@/assets/image/loading.png'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import BasicInformation from './components/basic-information.vue';
import ReconciliationPoint from './components/reconciliation-point.vue';
import { getApplyForm, externalLogicController, getProcess, uploadFile, getMp3FileAnalysis } from '@/api/complaint-entry'

const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href

const route = useRoute()
const loadingData = reactive({
  isLoading: true,
})
const data = reactive({
  promotionChannels: [],
  basicInformation: [],
  keyPointsForVerification: [],
  reviewMaterials: [],
  templateId: null,
  nodeSelectUserList: null,
  formId: null,
  processDefinitionId: null,
  currentRow: null,
  currentRowInfo: null
})
onMounted(() => {
  getForm()
})

// 获取动态表单 审查事项类型
async function getForm() {
  const id = route.query.id;
      clearForm();
      await handleAllListprefix(id);
      // const { data: result } = await getNextUserOption({ nodeId: 'root', templateId: data.templateId })

      // if (result.success) {
      //   if (result.data.selectObject === '1') {
      //     const options = result.data.nodeSelectUserList
      //     const { nextNodeId } = result.data
      //     // TODO: 选择审批人（关联后台流程配置）
      //     const data1 = {
      //       id: '-1',
      //       title: '审批人',
      //       name: 'MultipleSelect',
      //       module: '基本信息',
      //       value: [],
      //       valueType: 'Array',
      //       props: {
      //         required: true,
      //         placeholder: '因选择渠道涉及总行，请选择总行对应业务部门的审批人',
      //         expanding: false,
      //         options
      //       },
      //       nextNodeId
      //     }
      //     data.nodeSelectUserList = data1
      //   } else {
      //     data.nodeSelectUserList = null
      //   }
      // }
      getApplyForm({
        formId: data.formId,
        processTemplateId: data.templateId,
        nodeId: 'root',
        formCategoryId: id
      }).then(({ data: { data: res, success } }) => {
        if (success) {
          const [, basicInformation, keyPointsForVerification] = res.formModuleVoList;
          data.basicInformation = basicInformation.formModuleItemList
          data.keyPointsForVerification = keyPointsForVerification.formModuleItemList;
        } else {
          clearForm();
        }
      }).finally(() => {
      loadingData.isLoading = false;
    });
}
function handleAllListprefix(id) {
  return Promise.all([externalLogicController({ formId: id }), getProcess({ formId: id })])
    .then(([res1, res2]) => {
      // loadingData.isLoading = false;
      let flag = true;
      const {
        data: { data: result1, success: success1 }
      } = res1;
      if (success1) {
        data.templateId = result1.templateId;
        data.processDefinitionId = result1.processDefinitionId;
      } else {
        data.templateId = '';
        flag = false;
      }
      const {
        data: { data: result2, msg: msg2, success: success2 }
      } = res2;
      if (success2) {
        data.currentRow = result2.list.length ? result2.list[0] : null;
      } else {
        data.currentRow = null;
        data.currentRowInfo = msg2;
      }
      if (!flag) {
        return Promise.reject()
      }
    })
    .finally(() => {
      // loadingData.isLoading = false;
    });
}
function clearForm() {
  data.promotionChannels = [];
  data.basicInformation = [];
  data.keyPointsForVerification = [];
  data.reviewMaterials = [];
}





const parseDialogVisible = ref(false)
const uploadInfo = ref('')
const formDialogVisible = ref(false)
const smartFillDialogVisible = ref(false)

const basicInformationListRef = ref(null)
const complaintElementsListRef = ref(null)

const complaintElementsList = reactive({
  content: '',
  complaintTime: '',
  resource: '',
  complaintWay: '',
  complaintRepeat: '0',
  regulatoryTransfer: '',
  complaintId: '',
  complaintNature: '',
  businessCategories: '',
  productType: '',
  complaintReason: '',
  complaintRequest: '',
  complaintedUnit: '',
  businessSubcategory: '',
  involvedOutlets: '',
  emergencyLevel: '',
  sensitiveInformation: ''
})

/**
 * 表单数据
 */
const basicInformationList = reactive({
  name: '',
  client: '',
  connect: '',
  cardType: '',
  cardNum: '',
  accountNum: '',
  email: '',
  profession: '',
  educationLevel: '',
  income: '',
  permanentResidence: ''
})

const complaintElementsRules = {
  content: [
    {
      required: true,
      message: '请输入投诉内容',
      trigger: 'blur'
    }
  ],
  resource: [
    {
      required: true,
      message: '请选择投诉来源',
      trigger: 'change'
    }
  ],
  complaintWay: [
    {
      required: true,
      message: '请输入投诉渠道',
      trigger: 'blur'
    }
  ],
  complaintRepeat: [
    {
      required: true,
      message: '是否重复投诉',
      trigger: 'blur'
    }
  ],
  regulatoryTransfer: [
    {
      required: true,
      message: '是否监管转办',
      trigger: 'blur'
    }
  ],
  complaintId: [
    {
      required: true,
      message: '请输入投诉编号',
      trigger: 'blur'
    }
  ],
  complaintTime: [
    {
      required: true,
      message: '请输入投诉时间',
      trigger: 'blur'
    }
  ],
  complaintNature: [
    {
      required: true,
      message: '请选择投诉性质',
      trigger: 'blur'
    }
  ],
  complaintReason: [
    {
      required: true,
      message: '请输入投诉原因',
      trigger: 'blur'
    }
  ],
  complaintRequest: [
    {
      required: true,
      message: '请输入投诉诉求',
      trigger: 'blur'
    }
  ]
}

/**
 * 智能填写
 */
const handleSmartFill = () => {
  smartFillDialogVisible.value = false

  /**
   * 将表单里的数据插入到表格里
   */
  const smartIn = () => {
    complaintElementsList.complaintReason = '因产品收益引起的投诉'
    complaintElementsList.complaintRequest = '补偿'
    complaintElementsList.businessCategories = '贷款'
    complaintElementsList.productType = '个人住房贷款业务'
    complaintElementsList.sensitiveInformation = '情绪激动、司法类'
  }
  smartIn()
  ElMessage({
    message: '填写成功',
    type: 'success'
  })
}
/**
 * 提交
 */
const handleSubmit = async () => {
  let result0 = ref(true);
  let result1 = ref(true);
  if (!basicInformationListRef.value.judgeWarn()) {
    await new Promise((resolve) => {
      nextTick(() => {
        const refs = basicInformationListRef.value.getWarnRefs()|| [];
        result0.value = refs.length;
        if (refs.length) {
          let { offsetTop } = document.querySelector('.basic-information');
          rollTo(offsetTop + 60);
        }
        resolve()
      });
    })
  }
  if (!complaintElementsListRef.value.judgeWarn()) {
    await new Promise((resolve) => {
      nextTick(() => {
        const refs = complaintElementsListRef.value.getWarnRefs() || [];
        result1.value = refs.length === 0 || false;
        if (refs.length) {
          const refs1 = basicInformationListRef.value.getWarnRefs()|| [];
          if (!refs1.length) {
            let { offsetTop } = document.querySelector('.reconciliation-point');
            rollTo(offsetTop + 60);
          }
        }
        resolve()
      });
    })
  }
}
function rollTo(offsetTop) {
  document
    .querySelector('.web-body')
    .scrollTo({ top: +offsetTop - 100, behavior: 'smooth' });
}
let formData = null
const uploadFileRequest = (param) => {
  console.log(param.file)
  formData = new FormData()
  formData.append('mf', param.file)
  uploadInfo.value = '上传中'
  parseDialogVisible.value = true
  uploadFile(formData)
  .then((res) => {
    if (res.data.data) {
      uploadInfo.value = '上传成功！'
      setTimeout(() => {
        handleChange()
      }, 2000);
    } else {
      parseDialogVisible.value = false
      ElMessage.error(res.data.msg)
    }
  })
  .catch(() => {
    param.onError(param.file.uid);
  });
}
/**
 * 智能解析 弹窗开启与关闭
 */
const handleChange = () => {
  uploadInfo.value = '智能解析中，请耐心等待'
  getMp3FileAnalysis(formData).then((res) => {
    if (res.data.data) {
      parseDialogVisible.value = false
      formDialogVisible.value = true
    } else {
      parseDialogVisible.value = false
      ElMessage.error(res.data.msg)
    }
  })
}

/**
 * 录入成功
 */
const handleParse = async () => {
  formDialogVisible.value = false

  /**
   * 将parse-form里的数据插入到表单里
   */
  const parseIn = () => {
    basicInformationList.name = '洪燕如'
    basicInformationList.connect = '15829471667'
    basicInformationList.cardType = '身份证'
    basicInformationList.cardNum = '340306197804050865'
    basicInformationList.client = '1'

    complaintElementsList.complaintId = 'YH2023020921'
    complaintElementsList.regulatoryTransfer = '1'
    complaintElementsList.resource = '银保监会系统转来投诉'
    complaintElementsList.complaintWay = '电话渠道'
    complaintElementsList.content =
      '客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体或寻求法律途径。'
  }

  parseIn()
  ElMessage({
    message: '录入成功',
    type: 'success'
  })
}

/**
 * 弹窗关闭
 */
const handleClose = () => {
  console.log('关闭弹窗')
  formDialogVisible.value = false
}

/**
 * 上部验证规则
 */
const basicRules = {
  name: [
    {
      required: true,
      message: '请输入客户姓名',
      trigger: 'blur'
    }
  ],
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
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    }
  ],
  profession: [
    {
      required: true,
      message: '请输入职业',
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

.top-img {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.top-img img {
  width: 60px;
  height: 60px;
}

.bottom-area-inner {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.inner-dialog-content {
  position: relative;
  bottom: 50px;
}

.form-title {
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 40px;
  color: #1d2128;
  line-height: 24px;
  margin-top: 25px;
}

.parse-form-item {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 40px;
}

.parse-form-label {
  color: #505968;
  font-size: 12px;
  text-align: start;
  position: relative;
  right: 6px;
}

.parse-form-label::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #505968;
  position: relative;
  right: 8px;
  bottom: 2px;
}

:deep(.el-dialog__footer) {
  position: relative;
  bottom: 80px;
}

.parse-form-value {
  color: #1d2128;
  font-weight: 900;
  font-size: 12px;
}

.bottom-content {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  font-size: 160%;
  font-weight: 400;
}

.bottom-word {
  display: flex;
  align-items: end;
  font-size: 20px;
}

.bottom-area-smart {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;
  right: 30px;
}

.bottom-area-smart {
  color: #2d5cf6;
  position: relative;
  right: 20px;
  top: 40px;
  display: flex;
  align-items: center;
  height: 30px;
}

.smart-fill-button {
  background-color: #ffffff;
  width: 72px;
  height: 28px;
  color: #2d5cf6;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-left: 5px;
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
  height: 17px;
}

.upload-button {
  background-color: #f0f6ff;
  width: 128px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #88abff;
  margin-left: 24px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  color: #3c67f6;
}

.down-suggest {
  font-size: 90%;
  font-weight: 400;
}
.upload-intro {
  margin-left: 20px;
  color: #a2a9b5;
}
.dialog-footer {
  position: relative;
  bottom: 90px;
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
  align-items: start;
  font-weight: 500;
  font-size: 110%;
  position: relative;
  left: 20px;
}

.top {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: #2d5cf6;
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

:deep(.el-dialog--center .el-dialog__footer) {
  position: relative;
  bottom: 80px;
}

:deep(.el-textarea__inner) {
  background-color: transparent;
  border: none;
  outline: none;
  height: 100px;
  font-size: 14px;
  font-weight: 400;
  color: #1d2128;
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

:deep(.el-upload) {
  position: relative;
  bottom: 10px;
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

:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-input) {
  --el-input-focus-border: rgba(0, 0, 0, 0);
  --el-input-transparent-border: 0 0 0 0px;
  --el-input-border-color: rgba(0, 0, 0, 0);
  --el-input-hover-border: 0px !important;
  --el-input-hover-border-color: rgba(0, 0, 0, 0);
  --el-input-focus-border-color: rgba(0, 0, 0, 0);
  --el-input-clear-hover-color: rgba(0, 0, 0, 0);
  box-shadow: 0 0 0 0px !important;
  --el-input-border: 0px;
}
:deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 0px !important;
}

:deep(.el-select .el-input__wrapper) {
  position: relative;
  top: 2px;
}
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 0px !important;
}
:deep(.el-select) {
  --el-select-border-color-hover: rgba(0, 0, 0, 0);
}

:deep(.el-form-item.is-error .el-textarea__inner) {
  box-shadow: none;
}
</style>

