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
        ref="basicInformationListRef"
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
                <el-radio-group v-model="basicInformationList.client" class="ml-4">
                  <el-radio label="1" size="small"> 个人客户</el-radio>
                  <el-radio label="0" size="small"> 对公客户</el-radio>
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
            <el-form-item label="职业：">
              <div class="choose-item-background">
                <el-input placeholder="请输入职业" v-model="basicInformationList.profession" />
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
            <el-form-item label="文化程度：">
              <div class="choose-item-background">
                <el-select
                  v-model="basicInformationList.educationLevel"
                  placeholder="请选文化程度"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.educationLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位：">
              <div class="choose-item-background">
                <el-input placeholder="请输入工作单位" v-model="basicInformationList.profession" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收入情况：">
              <div class="choose-item-background">
                <el-select
                  v-model="basicInformationList.income"
                  placeholder="请选收入情况"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.income"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="常住地：">
              <div class="choose-item-background">
                <el-select
                  v-model="basicInformationList.permanentResidence"
                  placeholder="请选择常住地"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.permanentResidence"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通讯地址：">
              <div class="choose-item-background">
                <el-input placeholder="请输入通讯地址" v-model="basicInformationList.profession" />
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
        <el-upload
          class="upload-demo"
          multiple
          v-model:file-list="fileListMusic"
          :on-change="handleChangeUpload"
        >
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
        ref="complaintElementsListRef"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="投诉描述：" prop="content">
              <div class="textarea-item-background">
                <el-input
                  type="textarea"
                  v-model="complaintElementsList.content"
                  placeholder="请输入投诉内容"
                  :row="5"
                  resize="none"
                ></el-input>
                <div class="bottom-area-smart">
                  <el-icon size="12"><InfoFilled /></el-icon>
                  <div class="smart-fill-button" @click="smartBtnHandler">智能填写</div>
                </div>
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
                  v-model="complaintElementsList.complaintTime"
                  type="date"
                  placeholder="请选择投诉时间"
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                />
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="投诉性质：" prop="complaintNature">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.complaintNature"
                  placeholder="请选择投诉性质"
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
                  v-model="complaintElementsList.emergencyLevel"
                  placeholder="请选择紧急程度"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.emergencyLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="涉及网点：">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.involvedOutlets"
                  placeholder="请选择涉及网点"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.involvedOutlets"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="被投诉单位：" prop="complainedAgainst">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.complaintedUnit"
                  placeholder="请选择投诉单位"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.complaintedUnit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="业务大类：" prop="businessCategories">
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
                  v-model="complaintElementsList.businessSubcategory"
                  placeholder="请选择业务子类"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.businessSubcategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
                <el-select
                  v-model="complaintElementsList.complaintReason"
                  placeholder="请选择投诉原因"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.complaintReason"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
                <el-select
                  v-model="complaintElementsList.complaintRequest"
                  placeholder="请选择投诉诉求"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.complaintRequest"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="敏感信息：" class="right-move">
              <div class="choose-item-background">
                <el-select
                  v-model="complaintElementsList.sensitiveInformation"
                  placeholder="请选择敏感信息"
                  :suffix-icon="CaretBottom"
                >
                  <el-option
                    v-for="item in totType.sensitiveInformation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="被投诉人员：">
              <div class="choose-item-background">
                <el-select
                  @change="handleChange"
                  placeholder="请选择被投诉人员"
                  :suffix-icon="CaretBottom"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="uploadMusic" style="margin-left: 32px">
        附件材料
        <el-upload
          class="upload-demo"
          multiple
          v-model:file-list="fileList"
          :on-change="handleChangeUploadFile"
        >
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
        <el-button class="handle-button" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="parseDialogVisible"
    center
    align-center
    :show-close="false"
    style="width: 500px; height: 162px"
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

  <el-dialog
    v-model="status.isDialog"
    :modal="false"
    width="1000"
    class="my-dialog"
    :before-close="handleBeforeClose"
    :show-close="false"
  >
    <template #header> <div class="title">智能解析</div> </template>
    <div v-loading="status.isLoading">
      <AudioParse :file="status.file" :url="status.url" ref="refAudioParse"></AudioParse>
    </div>
    <div class="dialog-content-middle">
      <div class="left-area">
        <div class="add-title">
          <div class="front-icon">
            <img :src="lineIcon" alt="" />
          </div>
          <div class="title-content">解析文本</div>
        </div>
        <div class="parse-content">
          您好，请问有什么可以帮到您的吗。我现在有些情况要投诉啊，你是负责投诉吗。是的，请问您是要投诉什么内容呢？我要投诉你们银行，存在暴力催收行为，现在已经严重影响到我和我家人的生活，如果你们不能尽快解决的话，我就去有关部门举报你们。非常抱歉给您带来了困扰，能先麻烦您告诉我，你是因为什么业务被催收的吗。我去年买房子，在你们家办贷款，但是现在因为疫情原因啊，我工作也没了，我没工资，我现在房价肯定也还不上了，我又不是不想还钱，就是现在没钱买我也明白，你们，你们银行会有一些相关的管理制度，但是你们制度包含了催收，我家里人吗，我家里人罢了，房贷的话不能印象我家里人吧，家里上有老下有小，老人年龄也大了，也有小孩，万一出了意外，你们负了责任吗，谁来负责，你告诉我谁来负责啊。这位女士我十分理解您现在的心情啊，您先不要激动，你现在方便告诉我一下您的姓名和联系方式吗，我这里也跟我们行里的系统去核实一下这个情况。徐瑞春，许诺的许小瑞瑞春天的春，联系方式的话就是这个手机号，你能看到吧。嗯好的，徐女士，我这边是可以看到的，麻烦您稍等一下，我先核实一下，您之前办理的一个又情况。你赶紧核实吧，你处理不了的话，就让你领导处理啊，真的十分的抱歉，耽误了您宝贵的时间，还请您耐心的等待一下，我这里也需要一点时间，去查询一下相关信息。
          嗯徐女士我这里核实了一下，您目前名下是有一笔贷款，他现在是逾期了三个月，这样的情况，一般个人客户呢他出现逾期的话，我们现在是会委托第三方公司去进行一个相关的处理，能麻烦您再描述一下他们到底是如何暴力催收的吗。你们天天上门，又踹门有踢门，一直不停地打骚扰电话，我们老人小孩都吓坏了，我不管你们到底是什么，第三方我也不清楚你们到底拿我家里人的联系方式，怎么拿到我家里人联系方式，家庭地址，的这是不是属于信息泄露啊，你们天天上门又骚扰又打电话了，我家里人天天过得提心吊胆的生活，小孩小孩不敢上学了，让老人不敢出门出了，意外你们负了责任吗，你赶紧帮我处理一下这个问题，你处理了吗，处理不了的话，就赶紧找找领导，你们领导要是处理不了的话，我就去找媒体曝光你们家银行，去法院告你们违法，我还不信就没人管得了你们了啊。徐女士，您先不要激动，我已经了解到您的诉求了这边呢，我也会尽快去帮您核实一下，如果说到这个情况，属实那我们一定是会去严肃处理的，您看我在今天下午5点前去给您一个反馈这样的处理可以吗，行，那你尽快解决处理吧，要是再有类似这种行为咱们也别沟通了直接就法院见吧。明白明白我们一定会严肃去对待这个事情的并尽快给您反馈那除了这件事以外您还有其他需要处理的业务吗。没啦你就把这个事处理好了就行了。
          好的去女士，再次抱歉您带来的不便您投诉的内容我会立刻处理祝您生活愉快
        </div>
      </div>
      <div class="right-area">
        <div class="add-title">
          <div class="front-icon">
            <img :src="lineIcon" alt="" />
          </div>
          <div class="title-content">要素提取</div>
        </div>

        <div class="complaint-summary">
          <div class="add-title" style="margin: 0px; margin-bottom: 5px">
            <div class="front-icon">
              <img :src="bluebook" alt="" style="width: 15px; height: 15px; margin-right: 10px" />
            </div>
            <div class="title-content" style="font-weight: 700; font-size: 12px; margin-top: 3px">
              要素提取
            </div>
          </div>
          客户投诉银行存在暴力催收行为，已经严重影响到客户和家人的生活。客户因为疫情原因失去工作，无法偿还贷款。客户认为银行的催收行为涉及到家里人，且存在信息泄露问题。客户要求银行停止对家人的催收行为、提及要领导为其解决问题。否则将举报、曝光媒体或寻求法律途径。
        </div>
        <div class="parse-intro">
          <div class="add-title" style="margin: 0px;margin-bottom: 5px">
            <div class="front-icon">
              <img :src="Union" alt="" style="width: 15px; height: 15px; margin-right: 10px" />
            </div>
            <div class="title-content" style="font-weight: 700; font-size: 12px; margin-top: 3px">
              信息提取
            </div>
           
          </div>
          <p>投诉原因（客户视角）：因债务催收方式和手段引起的投诉</p>
            <p>投诉诉求（客户视角）：停止骚扰</p>
            <p>敏感信息：情绪激动、舆情类、司法类、监管类</p>
            <p>业务大类：贷款</p>
            <p>产品类型：个人住房贷款业务</p>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer-music">
        <el-button @click="status.isDialog = false" style="width: 88px; height: 34px"
          >取消</el-button
        >
        <el-button type="primary" @click="handleSmartFill" style="width: 88px; height: 34px">
          智能填写
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import telegram from '@/assets/image/telegram.png'
import loading from '@/assets/image/loading.png'
import bluebook from '@/assets/image/bluebook.png'
import Union from '@/assets/image/Union.png'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import AudioParse from '../../views/complaint-element/components/audio-parse.vue'
import WaveSurfer from 'wavesurfer.js'
import URL1 from '@/投诉语音.aac'

const lineIcon = new URL('@/assets/image/line-left.svg', import.meta.url).href

const router = useRouter()
const parseDialogVisible = ref(false)
const formDialogVisible = ref(false)
const smartFillDialogVisible = ref(false)
const basicInformationListRef = ref(null)
const complaintElementsListRef = ref(null)
const recordBasic = ref()
const recordComplaint = ref()

const status = reactive({
  playing: false,
  isDialog: true,
  file: null,
  content: '',
  url: URL1
})

function showDialog() {
  status.isDialog = true
  setTimeout(() => {
    status.content = `<div>
        <div style="text-indent: 2em">您好，请问有什么可以帮到您的吗。我现在有些情况要投诉啊，你是负责投诉吗。是的，请问您是要投诉什么内容呢？我要投诉你们银行，存在暴力催收行为，现在已经严重影响到我和我家人的生活，如果你们不能尽快解决的话，我就去有关部门举报你们。非常抱歉给您带来了困扰，能先麻烦您告诉我，你是因为什么业务被催收的吗。我去年买房子，在你们家办贷款，但是现在因为疫情原因啊，我工作也没了，我没工资，我现在房价肯定也还不上了，我又不是不想还钱，就是现在没钱买我也明白，你们，你们银行会有一些相关的管理制度，但是你们制度包含了催收，我家里人吗，我家里人罢了，房贷的话不能印象我家里人吧，家里上有老下有小，老人年龄也大了，也有小孩，万一出了意外，你们负了责任吗，谁来负责，你告诉我谁来负责啊。这位女士我十分理解您现在的心情啊，您先不要激动，你现在方便告诉我一下您的姓名和联系方式吗，我这里也跟我们行里的系统去核实一下这个情况。徐瑞春，许诺的许小瑞瑞春天的春，联系方式的话就是这个手机号，你能看到吧。嗯好的，徐女士，我这边是可以看到的，麻烦您稍等一下，我先核实一下，您之前办理的一个又情况。你赶紧核实吧，你处理不了的话，就让你领导处理啊，真的十分的抱歉，耽误了您宝贵的时间，还请您耐心的等待一下，我这里也需要一点时间，去查询一下相关信息。</div>
        <div style="text-indent: 2em">嗯徐女士我这里核实了一下，您目前名下是有一笔贷款，他现在是逾期了三个月，这样的情况，一般个人客户呢他出现逾期的话，我们现在是会委托第三方公司去进行一个相关的处理，能麻烦您再描述一下他们到底是如何暴力催收的吗。你们天天上门，又踹门有踢门，一直不停地打骚扰电话，我们老人小孩都吓坏了，我不管你们到底是什么，第三方我也不清楚你们到底拿我家里人的联系方式，怎么拿到我家里人联系方式，家庭地址，的这是不是属于信息泄露啊，你们天天上门又骚扰又打电话了，我家里人天天过得提心吊胆的生活，小孩小孩不敢上学了，让老人不敢出门出了，意外你们负了责任吗，你赶紧帮我处理一下这个问题，你处理了吗，处理不了的话，就赶紧找找领导，你们领导要是处理不了的话，我就去找媒体曝光你们家银行，去法院告你们违法，我还不信就没人管得了你们了啊。徐女士，您先不要激动，我已经了解到您的诉求了这边呢，我也会尽快去帮您核实一下，如果说到这个情况，属实那我们一定是会去严肃处理的，您看我在今天下午5点前去给您一个反馈这样的处理可以吗，行，那你尽快解决处理吧，要是再有类似这种行为咱们也别沟通了直接就法院见吧。明白明白我们一定会严肃去对待这个事情的并尽快给您反馈那除了这件事以外您还有其他需要处理的业务吗。没啦你就把这个事处理好了就行了</div>
        <div style="text-indent: 2em">好的去女士，再次抱歉您带来的不便您投诉的内容我会立刻处理祝您生活愉快</div>
        <span>`
  }, 2000)
}

const waveform_Ref = ref()
const wavesurfer = ref(null)

onMounted(() => {
  initAudio()
})
async function initAudio() {
  parsingAudio()
}
async function parsingAudio() {
  await nextTick()
  const oldOptions = {
    // 波形图的容器
    container: waveform_Ref.value,
    // 已播放波形的颜色
    // progressColor: "red",
    // 未播放波形的颜色
    // waveColor: "lightgrey",
    // 波形图的高度，单位为px
    height: 40,
    with: 640,
    // barHeight: 20,
    barWidth: 1.5,
    // 波形条间的间距
    barGap: 1,
    progressColor: '#6D73FF',
    waveColor: '#6D73FF',
    // 播放进度光标条的颜色
    cursorColor: '#2D5CF6',
    // 播放进度光标条的宽度，默认为1
    cursorWidth: 2,
    normalize: false,
    // 播放进度颜色
    // progressColor: "blue",
    //  波形容器的背景颜色
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    // 音频的播放速度
    audioRate: '1',
    mediaControls: false,
    backend: 'MediaElement'
    // （与区域插件一起使用）启用所选区域的循环
    // loopSelection:false
  }
  wavesurfer.value = WaveSurfer.create(oldOptions)
  wavesurfer.value.load(URL1)
  // 点击某一个地方的时候获取当前播放时间
  wavesurfer.value.on('seek', () => {
    // const hasPlayTime = wavesurfer.value.getCurrentTime()
    // hasPlayTime.value = timeFilter(hasPlayTime * 1000)
  })
  // 播放结束
  wavesurfer.value.on('finish', () => {
    status.playing = false
    // hasPlayTime.value = '00:00'
  })
  // 播放中
  wavesurfer.value.on('audioprocess', () => {
    // const value = wavesurfer.value.getCurrentTime()
    // hasPlayTime.value = timeFilter(value * 1000)
  })
}

// const isDisabled = ref(true)
// 播放
function playWav() {
  // 判断是否播放完毕 如果是正在播放
  const isPlayNow = wavesurfer.value.isPlaying()
  status.playing = !isPlayNow
  wavesurfer.value.playPause()
}
const refAudioParse = ref()
const handleBeforeClose = (done) => {
  const { handleClose } = refAudioParse.value
  handleClose()
  done()
}

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
 * 文件列表
 */
const fileListMusic = ref([])
const fileList = ref([])

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

const handleChangeUpload = async (uploadFile) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  if (!fileListMusic.value.find((item) => item.name === uploadFile.name)) {
    fileListMusic.value.push({
      name: uploadFile.name,
      url: uploadFile.url
    })
  }
}

const handleChangeUploadFile = async (uploadFile) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  if (!fileList.value.find((item) => item.name === uploadFile.name)) {
    fileList.value.push({
      name: uploadFile.name,
      url: uploadFile.url
    })
  }
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
 * 智能填写
 */
const smartBtnHandler = () => (smartFillDialogVisible.value = true)

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
  recordBasic.value = false
  recordComplaint.value = false
  basicInformationListRef.value.validate((valid) => {
    if (valid) {
      recordBasic.value = true
    }
    complaintElementsListRef.value.validate((valid) => {
      if (valid) {
        recordComplaint.value = true
        ElMessage({
          message: '提交成功',
          type: 'success'
        })
        router.back()
      }
    })
  })
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
  }, 4000)
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
 * 选项大全
 */
const totType = reactive({
  cardType: [
    {
      value: '身份证',
      label: '身份证'
    }
  ],
  emergencyLevel: [
    {
      value: 'I级',
      label: 'I级'
    },
    {
      value: 'II级',
      label: 'II级'
    },
    {
      value: 'III级',
      label: 'III级'
    }
  ],
  sensitiveInformation: [
    {
      value: '监管类',
      label: '监管类'
    },
    {
      value: '舆情类',
      label: '舆情类'
    },
    {
      value: '司法类',
      label: '司法类'
    },
    {
      value: '信访',
      label: '信访'
    },
    {
      value: '过激行为',
      label: '过激行为'
    },
    {
      value: '情绪激动',
      label: '情绪激动'
    },
    {
      value: '特殊群体',
      label: '特殊群体'
    },
    {
      value: '特殊职业',
      label: '特殊职业'
    }
  ],
  businessSubcategory: [
    {
      value: '借记卡使用',
      label: '借记卡使用'
    },
    {
      value: '借记卡市场活动及增值服务',
      label: '借记卡市场活动及增值服务'
    },
    {
      value: '借记卡盗刷',
      label: '借记卡盗刷'
    },
    {
      value: '账户管理',
      label: '账户管理'
    },
    {
      value: '资金汇划',
      label: '资金汇划'
    },
    {
      value: '票据',
      label: '票据'
    },
    {
      value: '电子支付',
      label: '电子支付'
    },
    {
      value: '非银行支付机构网络支付',
      label: '非银行支付机构网络支付'
    },
    {
      value: '汇兑业务',
      label: '汇兑业务'
    },
    {
      value: '其他',
      label: '其他'
    }
  ],
  involvedOutlets: [
    {
      value: '江阴支行',
      label: '江阴支行'
    },
    {
      value: '宜兴支行',
      label: '宜兴支行'
    },
    {
      value: '北京金宝街支行',
      label: '北京金宝街支行'
    },
    {
      value: '北京长虹桥支行',
      label: '北京长虹桥支行'
    },
    {
      value: '北京丰台支行',
      label: '北京丰台支行'
    },
    {
      value: '北京朝阳支行',
      label: '北京朝阳支行'
    },
    {
      value: '北京五方支行',
      label: '北京五方支行'
    },
    {
      value: '上海分行营业部',
      label: '上海分行营业部'
    },
    {
      value: '上海闸北支行',
      label: '上海闸北支行'
    },
    {
      value: 'ATM(上海奉贤支行)',
      label: 'ATM(上海奉贤支行)'
    },
    {
      value: '24小时自助银行(北京分行）',
      label: '24小时自助银行(北京分行）'
    }
  ],
  complaintResource: [
    {
      value: '银保监会系统转来投诉',
      label: '银保监会系统转来投诉'
    },
    {
      value: '电话投诉-客服系统接入',
      label: '电话投诉-客服系统接入'
    },
    {
      value: '信用卡投诉',
      label: '信用卡投诉'
    },
    {
      value: '人行系统转来投诉',
      label: '人行系统转来投诉'
    },
    {
      value: '国家信访系统转来投诉',
      label: '国家信访系统转来投诉'
    },
    {
      value: '总分支行现场投诉',
      label: '总分支行现场投诉'
    },
    {
      value: '其他投诉（邮箱、信件等）',
      label: '其他投诉（邮箱、信件等）'
    }
  ],
  complaintWay: [
    {
      value: '电话渠道',
      label: '电话渠道'
    },
    {
      value: '营业现场',
      label: '营业现场'
    },
    {
      value: '自助机具',
      label: '自助机具'
    },
    {
      value: '网银渠道',
      label: '网银渠道'
    },
    {
      value: '移动客户端',
      label: '移动客户端'
    },
    {
      value: '网络公众平台',
      label: '网络公众平台'
    },
    {
      value: '短信渠道',
      label: '短信渠道'
    },
    {
      value: '第三方渠道',
      label: '第三方渠道'
    },
    {
      value: '中、后台业务渠道',
      label: '中、后台业务渠道'
    },
    {
      value: '其他',
      label: '其他'
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
      value: '银行卡',
      label: '银行卡'
    },
    {
      value: '债务催收',
      label: '债务催收'
    },

    {
      value: '贷款',
      label: '贷款'
    },
    {
      value: '其他',
      label: '其他'
    },
    {
      value: '支付结算',
      label: '支付结算'
    },
    {
      value: '自营理财',
      label: '自营理财'
    },
    {
      value: '其他中间业务',
      label: '其他中间业务'
    },
    {
      value: '银行代理业务',
      label: '银行代理业务'
    },
    {
      value: '个人金融信息',
      label: '个人金融信息'
    },
    {
      value: '外汇',
      label: '外汇'
    },
    {
      value: '人民币储蓄',
      label: '人民币储蓄'
    },
    {
      value: '贵金属',
      label: '贵金属'
    },
    {
      value: '国库',
      label: '国库'
    },
    {
      value: '人民币管理',
      label: '人民币管理'
    }
  ],
  productType: [
    {
      value: '存款',
      label: '存款'
    },
    {
      value: '个人住房贷款业务',
      label: '个人住房贷款业务'
    },
    {
      value: '投资理财',
      label: '投资理财'
    },
    {
      value: '支付结算',
      label: '支付结算'
    },
    {
      value: '托管',
      label: '托管'
    },
    {
      value: '代理业务',
      label: '代理业务'
    },
    {
      value: '担保承诺',
      label: '担保承诺'
    },
    {
      value: '资金交易',
      label: '资金交易'
    },
    {
      value: '银行卡及账户',
      label: '银行卡及账户'
    },
    {
      value: '数字银行',
      label: '数字银行'
    }
  ],
  complaintedUnit: [
    {
      value: '武汉分行',
      label: '武汉分行'
    },
    {
      value: '济南分行',
      label: '济南分行'
    },
    {
      value: '成都分行',
      label: '成都分行'
    },
    {
      value: '长沙分行',
      label: '长沙分行'
    },
    {
      value: '重庆分行',
      label: '重庆分行'
    },
    {
      value: '大连分行',
      label: '大连分行'
    },

    {
      value: '东莞分行',
      label: '东莞分行'
    },
    {
      value: '佛山分行',
      label: '佛山分行'
    },
    {
      value: '福州分行',
      label: '福州分行'
    },
    {
      value: '广州分行',
      label: '广州分行'
    },
    {
      value: '贵阳分行',
      label: '贵阳分行'
    },
    {
      value: '重庆分行',
      label: '重庆分行'
    },
    {
      value: '哈尔滨分行',
      label: '哈尔滨分行'
    },
    {
      value: '海口分行',
      label: '海口分行'
    },
    {
      value: '杭州分行',
      label: '杭州分行'
    },
    {
      value: '合肥分行',
      label: '合肥分行'
    },
    {
      value: '呼和浩特分行',
      label: '呼和浩特分行'
    },
    {
      value: '济南分行',
      label: '济南分行'
    },
    {
      value: '昆明分行',
      label: '昆明分行'
    },
    {
      value: '兰州分行',
      label: '兰州分行'
    },
    {
      value: '南昌分行',
      label: '南昌分行'
    },
    {
      value: '南京分行',
      label: '南京分行'
    },
    {
      value: '南宁分行',
      label: '南宁分行'
    },
    {
      value: '宁波分行',
      label: '宁波分行'
    },
    {
      value: '青岛分行',
      label: '青岛分行'
    },
    {
      value: '泉州分行',
      label: '泉州分行'
    },
    {
      value: '上海分行',
      label: '上海分行'
    },
    {
      value: '沈阳分行',
      label: '沈阳分行'
    },
    {
      value: '深圳分行',
      label: '深圳分行'
    },
    {
      value: '石家庄分行',
      label: '石家庄分行'
    },
    {
      value: '苏州分行',
      label: '苏州分行'
    },
    {
      value: '太原分行',
      label: '太原分行'
    }
  ],
  complaintReason: [
    {
      value: '因服务态度及服务质量引起的投诉',
      label: '因服务态度及服务质量引起的投诉'
    },
    {
      value: '因金融机构服务设施、设备、业务系统引起的投诉',
      label: '因金融机构服务设施、设备、业务系统引起的投诉'
    },
    {
      value: '身份因金融机构管理制度、业务规则与流程引起的投诉证',
      label: '身份因金融机构管理制度、业务规则与流程引起的投诉证'
    },
    {
      value: '因金融机构管理制度、业务规则与流程引起的投诉',
      label: '因金融机构管理制度、业务规则与流程引起的投诉'
    },
    {
      value: '因营销方式和手段引起的投诉',
      label: '因营销方式和手段引起的投诉'
    },
    {
      value: '因信息披露引起的投诉',
      label: '因信息披露引起的投诉'
    },
    {
      value: '因定价收费引起的投诉',
      label: '因定价收费引起的投诉'
    },
    {
      value: '因产品收益引起的投诉',
      label: '因产品收益引起的投诉'
    },
    {
      value: '因合同条款引起的投诉',
      label: '因合同条款引起的投诉'
    },
    {
      value: '因消费者资金安全引起的投诉',
      label: '因消费者资金安全引起的投诉'
    },
    {
      value: '因消费者信息安全引起的投诉',
      label: '因消费者信息安全引起的投诉'
    },
    {
      value: '因债务催收方式和手段引起的投诉',
      label: '因债务催收方式和手段引起的投诉'
    }
  ],
  complaintRequest: [
    {
      value: '申请退费',
      label: '申请退费'
    },
    {
      value: '核实原因',
      label: '核实原因'
    },
    {
      value: '答复',
      label: '答复'
    },
    {
      value: '查询',
      label: '查询'
    },
    {
      value: '补偿',
      label: '补偿'
    },
    {
      value: '停止骚扰',
      label: '停止骚扰'
    },
    {
      value: '加快处理',
      label: '加快处理'
    },
    {
      value: '恢复使用',
      label: '恢复使用'
    }
  ],
  educationLevel: [
    {
      value: '本科',
      label: '本科'
    }
  ],
  income: [
    {
      value: '5000-10000',
      label: '5000-10000'
    }
  ],
  permanentResidence: [
    {
      value: '北京',
      label: '北京'
    }
  ]
})

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

<style scoped lang="less">
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

