import request from '@/api/request';
export function upload(data) {
  return request({
    url: '/cwo/file/upload',
    method: 'post',
    data,
    contentType: 'multipart/form-data',
  });
}
export function remove(params) {
  return request({
    url: '/cpr/file/remove',
    method: 'post',
    params,
  })
}

export function download(params) {
  return request({
    url: '/cwo/file/download',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: params
  })
}