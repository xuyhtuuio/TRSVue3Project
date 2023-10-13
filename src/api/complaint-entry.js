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
    url: '/cpr/applicationForm/submit',
    method: 'post',
    data
  })
}

// 查询工单详情
export function externalLogicController(params) {
  return request({
    url: '/cpr/externalLogicController/getProcessDefinitionId',
    method: 'post',
    params
  })
}

// 单个流程
export function getProcess(params) {
  return request({
    url: '/cpr/admin/form/list',
    method: 'get',
    params: {
      ...params,
      pageNow: 1,
      pageSize: 10
    }
  })
}

// 获取下一节点审批人选择返回，和驳回人选择返回
export function getNextUserOption(params) {
  return request({
    url: '/cpr/externalLogicController/ruler',
    method: 'get',
    params
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

// 上传附件
export function getFileOcrPersonInfo(formData) {
  return request({
    url: '/cwo/applicationForm/fileOcrPersonInfo',
    method: 'post',
    contentType: 'multipart/form-data',
    data: formData
  })
}
