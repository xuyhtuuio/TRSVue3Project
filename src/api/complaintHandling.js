/*
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-10-18 09:23:52
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-10-19 09:29:57
 * @FilePath: /protection-treatment/src/api/complaintHandling.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/api/request';
export function getList(data) {
    return request({
      url: '/cwo/handling/getComplaintHanding',
      method: 'post',
      data
    });
  }
  export function getStatistics(data) {
    return request({
      url: '/cwo/handling/getComplaintHandingHeader',
      method: 'post',
      data
    });
  }