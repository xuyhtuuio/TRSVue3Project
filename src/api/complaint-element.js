import request from '@/api/request';

export function getApplyForm(params) {
  return request({
    url: '/cwo/applicationForm/getApplyForm',
    params
  });
}


export function agree(data) {
  return request({
    url: '/cwo/workspace/agree',
    method: 'post',
    data
  });
}