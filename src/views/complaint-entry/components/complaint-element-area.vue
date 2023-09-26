<template>
   <el-form
        :inline="true"
        :model="complaintElementsList"
        size="small"
        :rules="complaintElementsRules"
      >
        <div class="uploadMusic right-move">
          沟通语音
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
              <div class="upload-content">上传语音</div>
            </div>
            <div class="upload-intro">建议上传mp3格式的文件</div>
          </el-upload>
        </div>
        <el-form-item label="投诉内容" prop="complaintContent">
          <div class="textarea-item-background" style="margin-left: 13px">
            <el-input
              type="textarea"
              v-model="complaintElementsList.content"
              placeholder="请输入投诉内容"
              :row="5"
              resize="none"
            ></el-input>
          </div>
        </el-form-item>
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
        <el-form-item label="重复投诉：" prop="complaintRepeat">
          <div class="choose-item-background">
            <el-radio-group v-model="complaintElementsList.complaintRepeat" class="ml-4">
              <el-radio label="1" size="small"> 是</el-radio>
              <el-radio label="0" size="small"> 否</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="监管转办：" prop="regulatoryTransfer">
          <div class="choose-item-background">
            <el-radio-group v-model="complaintElementsList.regulatoryTransfer" class="ml-4">
              <el-radio label="1" size="small"> 是</el-radio>
              <el-radio label="0" size="small"> 否</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="投诉编号：" prop="complaintId">
          <div class="choose-item-background">
            <el-input
              placeholder="请输入投诉编号："
              v-model="complaintElementsList.complaintId"
            ></el-input>
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
        <el-form-item label="被投诉单位：" prop="complainedAgainst" style="margin-left: -3px">
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
        <el-form-item
          label="投诉原因(客户视角)"
          label-width="90px"
          prop="complaintReason"
          style="margin-left: 3px"
        >
          <div class="choose-item-background">
            <el-input
              placeholder="请输入投诉原因"
              v-model="complaintElementsList.complaintReason"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="投诉诉求(客户视角)"
          label-width="90px"
          prop="complaintRequest"
          style="margin-left: 3px"
        >
          <div class="choose-item-background">
            <el-input
              placeholder="请输入投诉诉求"
              v-model="complaintElementsList.complaintRequest"
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
</template>


<script setup>

import {reactive } from 'vue'
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

</script>

<style scoped>
.uploadMusic {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 110%;
}

.choose-item-background {
  background-color: #F7F8FA;
  width: 240px;
  height: 30px;
  padding-left: 10px;
  border-radius: 5px;
  display: flex;
  align-content: center;
}

.right-move {
  margin-left: 10px;
}

</style>