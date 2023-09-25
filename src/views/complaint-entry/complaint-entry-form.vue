<template>
  <div class="outter">
    <div class="smart-fill">
      <div class="title">智能填写</div>
      <el-upload class="upload-demo" drag multiple>
        <div class="top">
          <el-icon class="upload-style"><upload-filled /></el-icon>
          <div class="intro">上传图片、文件智能识别投诉信息</div>
        </div>
        <div class="suggest">
          建议上传jpg/png/excel/docx/doc/pdf等格式的文件，建议文件大小不超过200M
        </div>
      </el-upload>
    </div>
    <div class="smart-fill">
      <div class="title">客户基本信息</div>
      <el-form :inline="true" :model="basicInformationList" size="small" :rules="basicRules">
        <el-form-item label="客户姓名：" prop="name">
          <div class="choose-item-background">
            <el-input placeholder="请输入客户姓名" v-model="basicInformationList.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="客户类型：" prop="client">
          <div>
            <div class="choose-item-background">
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio label="geren" size="small"> 个人客户</el-radio>
                <el-radio label="duigong" size="small"> 对公客户</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="联系方式：" prop="connect">
          <div class="choose-item-background">
            <el-input placeholder="客户联系方式"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="证件类型：" prop="cardType">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择证件类型"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="证件号码：" prop="cardNum">
          <div class="choose-item-background">
            <el-input placeholder="请输入证件号码"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="开户账号：" prop="accountNum">
          <div class="choose-item-background">
            <el-input placeholder="请输入开户账号"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="电子邮箱：" class="right-move">
          <div class="choose-item-background">
            <el-input placeholder="请输入电子邮箱"></el-input>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="smart-fill">
      <div class="title">投诉要素</div>
      <el-form
        :inline="true"
        :model="complaintElementsList"
        size="small"
        :rules="complaintElementsRules"
      >
        <el-form-item label="投诉内容" prop="complaintContent">
          <div class="textarea-item-background">
            <el-input
              type="textarea"
              v-model="complaintElementsList.content"
              maxlength="1024"
              placeholder="请输入投诉内容"
              :row="5"
              resize="none"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="投诉来源：" prop="resource">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择投诉来源"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="投诉渠道：" prop="complaintWay">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择投诉渠道"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="重复投诉：" prop="complaintRepeat">
          <div class="choose-item-background">
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="geren" size="small"> 是</el-radio>
              <el-radio label="duigong" size="small"> 否</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="监管转办：" prop="regulatoryTransfer">
          <div class="choose-item-background">
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="geren" size="small"> 是</el-radio>
              <el-radio label="duigong" size="small"> 否</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="投诉编号：" prop="complaintId">
          <div class="choose-item-background">
            <el-input placeholder="请输入投诉编号："></el-input>
          </div>
        </el-form-item>
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
        <el-form-item label="投诉性质：" prop="complaintNature">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择投诉性质"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="紧急程度：" class="right-move">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择投诉紧急程度"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="涉及网点：" prop="involvingWebsite">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择涉及网点"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="被投诉单位：" prop="complainedAgainst" style="margin-left: -3px;">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择被投诉单位"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="业务大类分类：" prop="businessCategories" class="move-left">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择业务大类分类"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="业务子类：" prop="businessSubcategory" class="right-move">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择业务子类"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item label="产品类型：" prop="productType" class="right-move">
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择产品类型"
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="投诉原因(客户视角)"
          label-width="80px"
          prop="complaintReason"
          style="margin-left: 3px;"
        >
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择产品类型："
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="投诉诉求(客户视角)"
          label-width="80px"
          prop="complaintRequest"
          style="margin-left: 3px;"
        >
          <div class="choose-item-background">
            <el-select
              v-model="cardType"
              :options="options"
              @change="handleChange"
              placeholder="请选择产品类型："
              :suffix-icon="CaretBottom"
            />
          </div>
        </el-form-item>

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
      </el-form>
      <div class="uploadMusic">
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
          <el-button type="primary" plain>上传</el-button>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'

const radio1 = ref('1')
const basicInformationList = reactive({
  name: ''
})

const complaintElementsList = reactive({
  content: '',
  complaintTime: ''
})

const basicRules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  client: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  connect: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change'
    }
  ],
  cardType: [
    {
      required: true,
      message: 'Please pick a date',
      trigger: 'change'
    }
  ],
  cardNum: [
    {
      required: true,
      message: 'Please pick a time',
      trigger: 'change'
    }
  ],
  accountNum: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change'
    }
  ]
}

const complaintElementsRules = {
  complaintContent: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintWay: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintRepeat: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  regulatoryTransfer: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintId: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintTime: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintNature: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  involvingWebsite: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintReason: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  complaintRequest: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ]
}

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
</script>

<style scoped>
.outter {
  padding: 20px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
}

.choose-item-background {
  background-color: rgb(228, 228, 228, 0.5);
  width: 240px;
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

:deep(.el-input__inner) {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
}

:deep(.el-select .el-input .el-input__inner) {
  width: 190px;
}

:deep(.el-textarea) {
  width: 1000px;
  background-color: transparent;
}

.textarea-item-background {
  background-color: rgb(228, 228, 228, 0.5);
  width: 78vw;
  height: 100px;
  background-color: rgb(228, 228, 228, 0.5);
  padding-left: 10px;
  border-radius: 5px;
  display: flex;
  align-content: center;
}

.uploadMusic {
  display: flex;
}

.top {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.right-move {
  margin-left: 10px;
}

.move-left {
  margin-left: -12px;
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
</style>

