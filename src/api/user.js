import request from '@/api/request';
export function checkToken(data) {
  return request({
    url: '/cpr/oauth/check_token',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data
  });
}