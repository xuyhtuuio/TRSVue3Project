<template>
  <div class="outter">
    <div class="smart-fill">
      <div class="add-title">
        <div class="front-icon">
          <img :src="lineIcon" alt="" />
        </div>
        <div class="title-content">智能填写</div>
      </div>
      <el-upload class="upload-demo" drag multiple :on-change="handleChange">
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
        label-width="130px"
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

      <div class="uploadMusic" style="margin-left: 32px">
        沟通语音
        <el-upload class="upload-demo" multiple :limit="3" :on-exceed="handleExceed">
          <div class="upload-button">
            <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
            <div class="upload-content">上传语音</div>
          </div>
        </el-upload>
        <div class="upload-intro">建议上传mp3格式的文件</div>
      </div>
      <el-form
        :inline="true"
        :model="complaintElementsList"
        size="small"
        :rules="complaintElementsRules"
        label-width="130px"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="投诉内容：" prop="complaintContent">
              <div class="textarea-item-background">
                <el-input
                  type="textarea"
                  v-model="complaintElementsList.content"
                  placeholder="请输入投诉内容"
                  :row="5"
                  resize="none"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投诉来源：" prop="resource">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.resource"
                  placeholder="请选择投诉来源"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.complaintResource"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投诉渠道：" prop="complaintWay">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.complaintWay"
                  placeholder="请选择投诉渠道"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.complaintWay"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="重复投诉：" prop="complaintRepeat">
              <div class="choose-item-background">
                <el-radio-group v-model="complaintElementsList.complaintRepeat" class="ml-4">
                  <el-radio label="1" size="small"> 是</el-radio>
                  <el-radio label="0" size="small"> 否</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="监管转办：" prop="regulatoryTransfer">
              <div class="choose-item-background">
                <el-radio-group v-model="complaintElementsList.regulatoryTransfer" class="ml-4">
                  <el-radio label="1" size="small"> 是</el-radio>
                  <el-radio label="0" size="small"> 否</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投诉编号：" prop="complaintId">
              <div class="choose-item-background">
                <el-input
                  placeholder="请输入投诉编号："
                  v-model="complaintElementsList.complaintId"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投诉时间：" prop="complaintTime">
              <div class="choose-item-background">
                <el-date-picker
                  v-model="complaintElementsList.comcomplaintTime"
                  type="date"
                  placeholder="请选择投诉时间"
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                  :size="size"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投诉性质：" prop="complaintNature">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.complaintNature"
                  placeholder="请选择投诉渠道"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.complaintNature"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="紧急程度：" class="right-move">
              <div class="choose-item-background">
                <el-select
                  v-model="cardType"
                  @change="handleChange"
                  placeholder="请选择紧急程度"
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="涉及网点：" prop="involvingWebsite">
              <div class="choose-item-background">
                <el-select
                  v-model="cardType"
                  @change="handleChange"
                  placeholder="请选择涉及网点"
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="被投诉单位：" prop="complainedAgainst">
              <div class="choose-item-background">
                <el-select
                  v-model="cardType"
                  @change="handleChange"
                  placeholder="请选择被投诉单位"
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="业务大类分类：" prop="businessCategories">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.businessCategories"
                  placeholder="请选择业务大类分类"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.businessCategories"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="业务子类：" prop="businessSubcategory" class="right-move">
              <div class="choose-item-background">
                <el-select
                  v-model="cardType"
                  @change="handleChange"
                  placeholder="请选择业务子类"
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="产品类型：" prop="productType" class="right-move">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.productType"
                  placeholder="请选择产品类型"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.productType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="complaintReason">
              <template #label>
                <div class="label-outter">
                  <div class="top-title">投诉原因</div>
                  <div class="down-suggest">(客户视角)</div>
                </div>
              </template>
              <div class="choose-item-background">
                <el-input
                  placeholder="请输入投诉原因"
                  v-model="complaintElementsList.complaintReason"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item prop="complaintRequest">
              <template #label>
                <div class="label-outter">
                  <div class="top-title">投诉诉求</div>
                  <div class="down-suggest">(客户视角)</div>
                </div>
              </template>
              <div class="choose-item-background">
                <el-input
                  placeholder="请输入投诉诉求"
                  v-model="complaintElementsList.complaintRequest"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="敏感信息：" class="right-move">
              <div class="choose-item-background">
                <el-select
                  v-model="cardType"
                  :options="options"
                  @change="handleChange"
                  placeholder="请选择敏感信息："
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="被投诉人员：">
              <div class="choose-item-background">
                <el-select
                  v-model="cardType"
                  :options="options"
                  @change="handleChange"
                  placeholder="请选择被投诉人员："
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="uploadMusic" style="margin-left: 32px">
        附件材料
        <el-upload class="upload-demo" multiple :limit="3">
          <div class="upload-button">
            <el-icon class="upload-icon-style" size="20"><upload-filled /></el-icon>
            <div class="upload-content">上传附件</div>
          </div>
        </el-upload>
        <div class="upload-intro">
          建议上传jpg/png/xls/txt/pptx/ppt/docx/doc/pdf等格式的文件，建议文件大小不超过200M
        </div>
      </div>
    </div>
    <div class="bottom-area">
      <div class="inner-content">
        <el-button class="handle-reduce-button">取消</el-button>
        <el-button class="handle-button">存草稿</el-button>
        <el-button class="handle-button">提交</el-button>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="parseDialogVisible"
    width="50%"
    center
    align-center
    :close-delay="2000"
    :show-close="false"
  >
    <div class="inner-dialog-content">
      <div class="top-img">
        <img :src="telegram" alt="" />
      </div>
      <div class="bottom-area-inner">
        <div class="bottom-content">
          <div class="bottom-word">智能解析中，请耐心等待</div>
          <div class="loading-img"><img :src="loading" alt="" /></div>
        </div>
      </div>
    </div>
  </el-dialog>

  <el-dialog
    v-model="formDialogVisible"
    width="80%"
    center
    align-center
    :before-close="handleClose"
  >
    <div class="inner-dialog-content">
      <div class="form-title">智能填写内容</div>
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
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉原因</div>
              <div class="parse-form-value">债务催收方式和手段</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">投诉诉求</div>
              <div class="parse-form-value">停止骚扰</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">业务大类分类</div>
              <div class="parse-form-value">债务催收</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">产品类型</div>
              <div class="parse-form-value">个人住房贷款业务</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="parse-form-item">
              <div class="parse-form-label">敏感信息</div>
              <div class="parse-form-value">情绪激动、舆情类、司法类、监管类</div>
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
</template>

<script setup>
import { reactive, ref } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import telegram from '@/assets/image/telegram.png'
import loading from '@/assets/image/loading.png'
import { ElMessage } from 'element-plus'
const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href

const parseDialogVisible = ref(false)
const formDialogVisible = ref(true)

const complaintElementsList = reactive({
  content: '',
  complaintTime: '',
  resource: '',
  complaintWay: '',
  complaintRepeat: '',
  regulatoryTransfer: '',
  complaintId: '',
  complaintNature: '',
  businessCategories: '',
  productType: '',
  complaintReason: '',
  complaintRequest: ''
})

const complaintElementsRules = {
  complaintContent: [
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
      message: 'Please select activity resource',
      trigger: 'blur'
    }
  ],
  complaintRepeat: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'blur'
    }
  ],
  regulatoryTransfer: [
    {
      required: true,
      message: 'Please select activity resource',
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
      message: 'Please select activity resource',
      trigger: 'blur'
    }
  ],
  involvingWebsite: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'blur'
    }
  ],
  complaintReason: [
    {
      required: true,
      message: '',
      trigger: 'blur'
    }
  ],
  complaintRequest: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'blur'
    }
  ]
}

/**
 * 最近天数
 */
const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}
/**
 * 弹窗开启与关闭
 */
const handleChange = () => {
  console.log('文件已经提交')
  parseDialogVisible.value = true
  setTimeout(() => {
    parseDialogVisible.value = false
    formDialogVisible.value = true
  }, 2000)
}

/**
 * 录入成功
 */
const handleParse = async () => {
  console.log('录入成功')
  formDialogVisible.value = false

  /**
   * 将parse-form里的数据插入到表单里
   */
  const parseIn = () => {
    basicInformationList.name = '洪燕如'
    basicInformationList.connect = '15829471667'
    basicInformationList.cardType = '身份证'
    basicInformationList.cardNum = '340306197804050865'
    basicInformationList.accountNum = '6228480402564890018'

    complaintElementsList.complaintId = 'YH2023020921'
    complaintElementsList.resource = '银保监会系统转来投诉'
    complaintElementsList.complaintWay = '电话渠道'
    complaintElementsList.complaintNature = '投诉'
    complaintElementsList.businessCategories = '债务催收'
    complaintElementsList.productType = '个人住房贷款业务'
    complaintElementsList.complaintReason = '债务催收方式和手段'
    complaintElementsList.complaintRequest = '停止骚扰'
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
  margin-bottom: 20px;
}

.form-title {
  text-align: center;
  font-size: xx-large;
  font-weight: 900;
  margin-bottom: 40px;
  color: #1d2128;
}

.parse-form-item {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 40px;
}

.parse-form-label {
  color: #505968;
  font-size: 20px;
  text-align: start;
}

.parse-form-label::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #505968;
  position: relative;
  right: 15px;
  bottom: 2px;
}

.parse-form-value {
  color: #1d2128;
  font-weight: 900;
  font-size: 20px;
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

:deep(.dialog-footer) {
  margin-bottom: 30px;
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
  position: relative;
  left: 20px;
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

