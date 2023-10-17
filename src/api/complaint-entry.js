import request from '@/api/request'
// 获取 新建投诉任务列表
export function getComplaintTaskList() {
  return request({
    url: '/cwo/applicationForm/getFormCategoryArray',
    method: 'get'
  })
}

export function getApplyForm(params) {
  return request({
    url: '/cwo/applicationForm/getApplyForm',
    method: 'get',
    params
  })
}

// 提交表单
export function submit(data) {
  return request({
    url: '/cwo/applicationForm/submit',
    method: 'post',
    data
  })
}

// 查询工单详情
export function externalLogicController(params) {
  return request({
    url: '/cwo/externalLogicController/getProcessDefinitionId',
    method: 'post',
    params
  })
}

// 单个流程
export function getProcess(params) {
  return request({
    url: '/cwo/admin/form/list',
    method: 'get',
    params: {
      ...params,
      pageNow: 1,
      pageSize: 10
    }
  })
}

// 保存草稿
export function saveDraft(data) {
  return request({
    url: '/cwo/applicationForm/saveDraft',
    method: 'post',
    data
  })
}

// 获取下一节点审批人选择返回，和驳回人选择返回
export function getNextUserOption(params) {
  return request({
    url: '/cwo/externalLogicController/ruler',
    method: 'get',
    params
  })
}

// 更新下一节点审批人配置
export function updateRuleCode(param) {
  return request({
    url: '/cwo/workspace/updateRuleCode',
    method: 'post',
    // contentType : 'application/x-www-form-urlencoded;charset=utf-8',
    data: param
  })
}

// ocr审批提交
export function ocrApprovalSubmission(param) {
  return request({
    url: '/cpr/workspace/agree',
    method: 'post',
    data: param
  })
}

// 上传
export function uploadFile(formData) {
  return request({
    url: '/cwo/file/upload',
    method: 'post',
    contentType: 'multipart/form-data',
    data: formData
  })
}
// 智能语音分析
export function getMp3FileAnalysis(formData) {
  return request({
    url: '/cwo/applicationForm/mp3FileAnalysis',
    method: 'post',
    contentType: 'multipart/form-data',
    data: formData
  })
}

// 解析pdf
export function getFileOcrPersonInfo(formData) {
  return request({
    url: '/cwo/applicationForm/fileOcrPersonInfo',
    method: 'post',
    contentType: 'multipart/form-data',
    data: formData
  })
}
// 删除文件
export function deleteFormGroups(params) {
  return request({
    url: '/cwo/file/remove',
    method: 'post',
    params,
  })
}
// 获取当前登录用户信息
export function getCurrentUserInfo() {
  return request({
    url: '/cwo/user/getCurrentUser',
    method: 'get'
  })
}
// 启动流程
export function processStart(data) {
  return request({
    url: '/cwo/workspace/process/start',
    method: 'post',
    data
  })
}
