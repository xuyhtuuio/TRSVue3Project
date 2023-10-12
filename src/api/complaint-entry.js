import request from '@/api/request'
// 获取 新建投诉任务列表
export function getComplaintTaskList() {
  return request({
    url: '/cpr/applicationForm/getFormCategoryAssociated',
    method: 'get'
  })
}

export function getApplyForm(params) {
  return request({
    url: '/cpr/applicationForm/getApplyForm',
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