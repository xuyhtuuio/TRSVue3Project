import request from '@/api/request';
export function getList(data) {
    return request({
      url: '/cwo/handling/getComplaintHanding',
      method: 'post',
      data
    });
  }