import request from '@/api/request';
export function getList(data) {
  return request({
    url: '/getList',
    method: 'post',
    data
  });
}

export function getListBranch(data) {
  return request({
    url: '/getListBranch',
    method: 'post',
    data
  });
}

export function getListTypeArea(data) {
  return request({
    url: '/getListTypeArea',
    method: 'post',
    data
  });
}