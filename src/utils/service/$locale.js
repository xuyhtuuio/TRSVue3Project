/*
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-08-29 13:49:23
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-10-18 09:52:51
 * @FilePath: /consumer-preview/src/utils/service/$locale.js
 * @Description:
 */
// eslint-disable-next-line
export default (function () {
  // eslint-disable-next-line
  let locales = {}
  // eslint-disable-next-line
  let fields = {}
  // eslint-disable-next-line
  let messages = {}
  locales.FIELDS = fields
  locales.MESSAGES = messages
  fields.isUrgent = [
    { label: '普通', value: '0' },
    { label: '加急', value: '1' }
  ]
  fields.isOpinions = [
    { label: '无', value: '0' },
    { label: '有', value: '1' }
  ]
  fields.adoptionSituations = [
    { label: '未采纳', value: '0' },
    { label: '已采纳', value: '1' }
  ]
  fields.isOncePass = [
    { label: '一次通过', value: '1' },
    { label: '不是一次通过', value: '0' }
  ]
  fields.isReject = [
    { label: '驳回', value: '1' },
    { label: '未驳回', value: '0' }
  ]
  fields.complaint_status = [
    { label: '待处理', value: '待处理' },
    { label: '处理中', value: '处理中' },
    { label: '已结案', value: '已结案' }
  ]
  fields.complaint_origin = [
    { label: '电话投诉-客服系统接入', value: '电话投诉-客服系统接入' },
    { label: '信用卡投诉', value: '信用卡投诉' },
    { label: '人行系统转来投诉', value: '人行系统转来投诉' },
    { label: '银保监会系统转来投诉', value: '银保监会系统转来投诉' },
    { label: '国家信访系统转来投诉', value: '国家信访系统转来投诉' },
    { label: '总分支行现场投诉', value: '总分支行现场投诉' },
    { label: '其他投诉（邮箱、信件等）', value: '其他投诉（邮箱、信件等）' }
  ]
  fields.complaint_level = [
    { label: '普通投诉', value: '普通投诉' },
    { label: '复杂投诉', value: '复杂投诉' },
    { label: '重大投诉', value: '重大投诉' }
  ]
  fields.complaint_nature = [{ label: '投诉', value: '投诉' }]
  fields.complaint_reason = [
    { label: '产品收益', value: '产品收益' },
    { label: '信息披露', value: '信息披露' },
    { label: '债务催收方式和手段', value: '债务催收方式和手段' },
    { label: '合同条款', value: '合同条款' },
    { label: '定价收费', value: '定价收费' },
    { label: '服务态度及服务质量', value: '服务态度及服务质量' },
    { label: '消费者信息安全', value: '消费者信息安全' },
    { label: '自主选择权', value: '自主选择权' },
    { label: '营销方式和手段', value: '营销方式和手段' },
    { label: '金融机构服务设施、设备、业务系统', value: '金融机构服务设施、设备、业务系统' },
    { label: '金融机构管理制度、业务规则与流程', value: '金融机构管理制度、业务规则与流程' }
  ]
  fields.complaint_appeal = [
    { label: '申请退费', value: '申请退费' },
    { label: '核实原因', value: '核实原因' },
    { label: '答复', value: '答复' },
    { label: '查询', value: '查询' },
    { label: '补偿', value: '补偿' },
    { label: '停止骚扰', value: '停止骚扰' },
    { label: '加快处理', value: '加快处理' },
    { label: '恢复使用', value: '恢复使用' }
  ]
  fields.updateTimeGroup = [
    {
      options: [
        {
          value: 1,
          label: '发起时间'
        },
        {
          value: 2,
          label: '更新时间'
        }
      ]
    },
    {
      options: [
        {
          value: 'asc',
          label: '升序'
        },
        {
          value: 'desc',
          label: '降序'
        }
      ]
    }
  ]
  fields.methods_origin = [
    '银行卡',
    '债务催收',
    '贷款',
    '其他',
    '支付结算',
    '自营理财',
    '其他中间业务',
    '银行代理业务',
    '个人金融信息',
    '外汇',
    '人民币储蓄',
    '贵金属',
    '国库',
    '人民币管理'
  ]
  fields.complaint_channel = [
    '营业现场',
    '自助机具',
    '网银渠道',
    '电话渠道',
    '移动客户端',
    '网络公众平台',
    '短信渠道',
    '第三方渠道',
    '中、后台业务渠道',
    '其他'
  ]
  fields.complaint_body = [
    '武汉分行',
    '济南分行',
    '成都分行',
    '长沙分行',
    '重庆分行',
    '大连分行',
    '东莞分行',
    '佛山分行',
    '福州分行',
    '广州分行',
    '贵阳分行',
    '哈尔滨分行',
    '海口分行',
    '杭州分行',
    '合肥分行',
    '呼和浩特分行',
    '济南分行',
    '昆明分行',
    '兰州分行',
    '南昌分行',
    '南京分行',
    '南宁分行',
    '南通分行',
    '宁波分行',
    '青岛分行',
    '泉州分行',
    '上海分行',
    '沈阳分行',
    '深圳分行',
    '石家庄分行',
    '苏州分行',
    '太原分行'
  ]

  messages['NodeStatus'] = {
    1: '待处理',
    2: '处理中',
    4: '已完成',
  }
  return locales
  // eslint-disable-next-line
})()
