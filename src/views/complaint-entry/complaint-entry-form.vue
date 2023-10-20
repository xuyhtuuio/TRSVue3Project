<template>
  <div class="outter" v-loading="data.isGLoading">
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
        v-model:file-list="fileList"
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
        @audioParse="handleAudioParse"
        @setFileUploadValue="setFileUploadValue"/>
    </div>
    <div class="bottom-area">
      <div class="inner-content">
        <el-button class="handle-reduce-button">取消</el-button>
        <el-button class="handle-button" @click="submitTrue(false)">存草稿</el-button>
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
              <div class="parse-form-value">{{ personInfo.complaintResource || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉渠道</div>
              <div class="parse-form-value">{{ personInfo.complaintChannel || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉编码</div>
              <div class="parse-form-value">{{ personInfo.complaintCode || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">客户姓名</div>
              <div class="parse-form-value">{{ personInfo.name || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">客户类型</div>
              <div class="parse-form-value">{{ personInfo.customType || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">监管转办</div>
              <div class="parse-form-value">{{ personInfo.transfer || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">证件类型</div>
              <div class="parse-form-value">{{ personInfo.documentType || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">证件号码</div>
              <div class="parse-form-value">{{ personInfo.documentNum || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">联系方式</div>
              <div class="parse-form-value">{{ personInfo.phoneNumber || '-' }}</div>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉描述</div>
              <div class="parse-form-value">
                {{ personInfo.complaintContent || '-' }}
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
  <el-dialog
    class="loadingDialog"
    v-model="data.submitDialogVisible"
    width="500px"
    append-to-body
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    center
  >
    <div class="item" style="text-align: center;">
      <img class="img" src="@/assets/image/telegram.png" style="width: 44px;" alt="" />
    </div>
    <div class="item" style="text-align: center;">
      <span class="text">正在提交申请，请耐心等待</span>
      <img class="img" src="@/assets/image/gif/loading.gif" style="width: 100px;" alt="" />
    </div>
    <div class="item" style="text-align: center;color: #86909c;">提交成功后可在投诉查询查看，了解工单审批进度</div>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, nextTick } from 'vue'
import telegram from '@/assets/image/telegram.png'
import loading from '@/assets/image/loading.png'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import {
  getCurrentUserInfo,
  getNextUserOption,
  getApplyForm,
  externalLogicController,
  getProcess,
  uploadFile,
  getFileOcrPersonInfo,
  updateRuleCode,
  ocrApprovalSubmission,
  saveDraft,
  processStart
} from '@/api/complaint-entry'
import { timestampToDateTime } from '@/utils/utils.js'
import BasicInformation from './components/basic-information.vue';
import ReconciliationPoint from './components/reconciliation-point.vue';

const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href

const route = useRoute()
const router = useRouter()
const loadingData = reactive({
  isLoading: true,
})
const data = reactive({
  isGLoading: false,
  submitDialogVisible: false,
  promotionChannels: [],
  basicInformation: [],
  keyPointsForVerification: [],
  reviewMaterials: [],
  templateId: null,
  nodeSelectUserList: null,
  formId: '',
  processDefinitionId: null,
  currentRow: null,
  currentRowInfo: null,
  userId: null,
  username: null
})
const fileList = ref([])
onMounted(() => {
  getForm()
})
// 获取用户信息
getCurrentUserInfo().then(res => {
  data.userId = res.data.id
  data.username = res.data.username
})
// 获取动态表单 审查事项类型
async function getForm() {
  const id = route.query.id;
  clearForm();
  await handleAllListprefix(id);
  const { data: result } = await getNextUserOption({ nodeId: 'root', templateId: data.templateId })

  if (result.success) {
    if (result.data.selectObject === '1') {
      const options = result.data.nodeSelectUserList
      const { nextNodeId } = result.data
      // TODO: 选择审批人（关联后台流程配置）
      const data1 = {
        id: '-1',
        title: '审批人',
        name: 'MultipleSelect',
        module: '基本信息',
        value: [],
        valueType: 'Array',
        props: {
          required: true,
          placeholder: '因选择渠道涉及总行，请选择总行对应业务部门的审批人',
          expanding: false,
          options
        },
        nextNodeId
      }
      data.nodeSelectUserList = data1
    } else {
      data.nodeSelectUserList = null
    }
  }
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
      message: '请输入投诉描述',
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
 * 智能解析
 */
 const musicParseFill = () => {
  status.isDialog = false

  /**
   * 将表单里的数据插入到表格里
   */
  const smartIn = () => {
    complaintElementsList.complaintReason = '因债务催收方式和手段引起的投诉'
    complaintElementsList.complaintRequest = '停止骚扰'
    complaintElementsList.businessCategories = '贷款'
    complaintElementsList.productType = '个人住房贷款业务'
    complaintElementsList.sensitiveInformation = '情绪激动、舆情类、司法类、监管类'
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
  let validFail = false;
  if (!basicInformationListRef.value.judgeWarn()) {
    await new Promise((resolve) => {
      nextTick(() => {
        const refs = basicInformationListRef.value.getWarnRefs()|| [];
        result0.value = refs.length;
        if (refs.length) {
          console.log(refs)
          let { offsetTop } = document.querySelector('.basic-information');
          rollTo(offsetTop + 60);
          validFail = true
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
            console.log(refs1)
            let { offsetTop } = document.querySelector('.reconciliation-point');
            rollTo(offsetTop + 60);
            validFail = true
          }
        }
        resolve()
      });
    })
  }
  // 提交
  setTimeout(() => {
    if (!validFail) {
      submitTrue(true)
    }
  }, 300)
}
async function submitTrue(flag = true, success) {
  const submitDto = {
    formId: data.formId || '',
    formManagementId: route.query.id,
    userId: data.userId,
    formItemDataList: []
  };
  const list = ['basicInformation', 'keyPointsForVerification'];
  list.forEach((key) => {
    data[key].forEach(item => {
      submitDto.formItemDataList.push({
        formItemId: item.id,
        value: item.value,
        valueType: item.valueType
      })
      if(item.title === '客户姓名') {
        submitDto.customerName = item.value
      } else if (item.title === '投诉来源') {
        submitDto.complaintSource  = item.value
      } else if (item.title === '被投诉单位') {
        submitDto.unitComplainedAgainst  = item.value
      } else if (item.title === '投诉时间') {
        submitDto.complaintTime  = item.value
      }
    })
  });
  // 音频材料
  submitDto.formItemDataList.push({
    formItemId: -1,
    valueType: 'File',
    value: complaintElementsListRef.value.getAudioFileList()
  });
  if (flag) {
    if (data.submitDialogVisible) return;
    data.submitDialogVisible = true;
    const user = JSON.parse(window.localStorage.getItem('user_name'))
    let res = {};
    const postData = {
      submitDto,
      ocessInstanceId: data.formBasicInfo?.processInstanceId,
      taskId: data.formBasicInfo?.taskId,
      templateId: data.templateId,
      nodeId: data.formBasicInfo?.nodeId,
      currentUserInfo: {
        id: user.id,
        name: user.fullname
      }
    }
    if (data.formBasicInfo?.submitted === 1) {
      // 暂不考虑这块逻辑
      res = await ocrApprovalSubmission(postData).catch(() => {
        data.submitDialogVisible = false;
      });
    } else {
      const nodeList = data.nodeSelectUserList
      if (nodeList) {
        const dataObj = []
        nodeList.value.forEach(item => dataObj.push({ id: item }))
        await updateRuleCode({
          nextNodeId: nodeList.nextNodeId || '',
          nextUserInfo: dataObj || [],
          templateId: data.templateId,
          nodeId: 'root'
        })
      }
      res = await processStart({
        templateId: data.templateId,
        processDefinitionId: data.processDefinitionId,
        startUserInfo: {
          id: data.formBasicInfo?.id || user.id,
          name: data.formBasicInfo?.name || user.username,
        },
        submitDto
      }).catch(() => {
        data.submitDialogVisible = false;
      });
    }
    const { success: sus, msg: message } = res.data;
    if (sus) {
      data.submitDialogVisible = false;
      ElMessage({ type: 'success', message: '提交成功' });
      router.push({ name: 'complaintHandling'});
    } else {
      ElMessage({ type: 'error', message });
      data.submitDialogVisible = false;
    }
  } else {
    if (data.isGLoading) return;
    data.isGLoading = true;
    saveDraft(submitDto).then((res) => {
      data.formId = res.data.data;
      ElMessage({ type: 'success', message: '保存成功' });
      rollTo(0);
      data.isGLoading = false;
      typeof success === 'function' && success();
    }).finally(() => {
      data.isGLoading = false;
    });
  }
}
function rollTo(offsetTop) {
  document
    .querySelector('.web-body')
    .scrollTo({ top: +offsetTop - 100, behavior: 'smooth' });
}
let formData = null
let personInfo = reactive({})
const uploadFileRequest = (param) => {
  formData = new FormData()
  formData.append('mf', param.file)
  uploadInfo.value = '上传中'
  parseDialogVisible.value = true
  uploadFile(formData)
  .then((res) => {
    if (res.data.data) {
      handleChangeUploadFile(res.data.data)
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
const handleChangeUploadFile = async (uploadFile) => {
  const index = fileList.value.findIndex((item) => item.name === uploadFile.fileName)
  if (index !== -1) {
    fileList.value[index].url = uploadFile.url
    fileList.value[index].key = uploadFile.key
    fileList.value[index].fileName = uploadFile.fileName
    complaintElementsListRef.value.addFileList(fileList.value[index])
  }
}
/**
 * 智能解析 弹窗开启与关闭
 */
const handleChange = () => {
  uploadInfo.value = '智能解析中，请耐心等待'
  const { resource } = route.query
  const isTransfer = ['人行系统转来投诉', '银保监会系统转来投诉', '国家信访系统转来投诉'].includes(resource)
  formData.append('resource', resource)
  formData.append('transfer', isTransfer ? 1 : 0)
  getFileOcrPersonInfo(formData).then((res) => {
    if (res.data.data) {
      personInfo = res.data.data
      parseDialogVisible.value = false
      formDialogVisible.value = true
    } else {
      personInfo = {}
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
    // 基本信息
    const autoComlapteField = ['客户姓名', '证件类型', '证件号码', '联系方式', '客户类型']
    const personInfoKey = ['name', 'documentType', 'documentNum', 'phoneNumber', 'customType']
    data.basicInformation.map((item) => {
      const index = autoComlapteField.findIndex(t => item.title.includes(t))
      if (index !== -1) {
        if (personInfo[personInfoKey[index]] !== null) {
          item.value = personInfo[personInfoKey[index]]
        }
      }
    })
    // 投诉信息
    const autoComlapteField1 = ['投诉来源', '投诉渠道', '监管转办', '投诉编号', '投诉描述']
    const personInfoKey1 = ['complaintResource', 'complaintChannel', 'transfer', 'complaintCode', 'complaintContent']
    data.keyPointsForVerification.map((item) => {
      const index = autoComlapteField1.findIndex(t => item.title.includes(t))
      console.log(autoComlapteField1, item.title, index)
      if (index !== -1) {
        if (personInfo[personInfoKey1[index]] !== null) {
          item.value = personInfo[personInfoKey1[index]]
          console.log(item.value)
        }
      }
    })
  }

  parseIn()
  ElMessage({
    message: '录入成功',
    type: 'success'
  })
}
function setFileUploadValue({index, value}) {
  console.log(data.keyPointsForVerification, index, value)
  data.keyPointsForVerification[index].value = value
}
// 语音智能录入
function handleAudioParse(content) {
  // 投诉信息
  const autoComlapteField1 = ['投诉原因', '投诉诉求', '敏感信息', '业务大类', '产品类型']
  const personInfoKey1 = ['reason', 'appeal', 'sensitiveInformation', 'bigType', 'productType']
  data.keyPointsForVerification.map((item) => {
    const index = autoComlapteField1.findIndex(t => item.title.includes(t))
    if (index !== -1) {
      if (content[personInfoKey1[index]] !== null) {
        item.value = content[personInfoKey1[index]]
      }
    }
  })
  ElMessage({
    message: '录入成功',
    type: 'success'
  })
}
/**
 * 弹窗关闭
 */
const handleClose = () => {
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
<style lang="less" scoped>
.loadingDialog {
  .el-dialog {
    padding: 40px 60px;
    border-radius: 10px;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
      text-align: center;

      .item {
        position: relative;
        z-index: 2;
        .text {
          position: relative;
          z-index: 2;
        }
        .img {
          position: relative;
          left: 16px;
          top: 4px;
          width: 28px;
          height: 20px;
          transform: scale(4);
        }
        &:not(:first-child) {
          margin-top: 16px;
        }
        &:last-child {
          line-height: 20px;
          font-size: 12px;
          color: #86909c;
        }
      }
    }
  }
}
</style>
<style scoped>
.outter {
  padding: 20px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  /* width: 85vw; */
}

.waveform {
  margin: 0 16px;
  width: 600px;
  height: 100%;
  border-radius: 40px;
  overflow: hidden;
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

.my-dialog {
  :deep(.el-dialog__body) {
    padding: 0;
  }
  .el-dialog__header {
    line-height: 24px;
    .title {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
  }
  .dialog-content {
    margin-top: 24px;
    padding: 16px;
    border-radius: 6px;
    background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);
    color: rgba(29, 33, 40, 1);
  }

  .dialog-content-middle {
    height: 405px;
    display: flex;

    .left-area {
      margin-right: 100px;
      .parse-content {
        margin-top: 20px;
        background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);
        height: 347px;
        width: 428px;
        overflow-y: scroll;
        padding: 15px;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
      }
    }

    .right-area {
      .complaint-summary {
        padding: 15px;
        width: 428px;
        height: 170px;
        background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }

      .parse-intro {
        padding: 15px;
        width: 428px;
        height: 170px;
        background: linear-gradient(180deg, #f8faff 0%, rgba(247, 248, 250, 0) 100%);

        p {
          line-height: 22px;
          text-align: left;
        }
      }
    }
  }
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

  p {
    position: relative;
    bottom: 2px;
    display: flex;
    align-items: center;
  }
}
.dialog-footer {
  position: relative;
  bottom: 90px;
}

.dialog-footer-music {
  position: relative;
  bottom: 10px;
  right: 380px;
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
