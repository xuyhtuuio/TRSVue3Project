<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BasicInfo from './components/basic-info.vue'
import ComplaintHandling from './components/complaint-handling.vue'
import ComplaintDetails from './components/complaint-details.vue'
import SystemRecommendationStrategy from './components/system-recommendation-strategy.vue'
import { getApplyForm } from '@/api/complaint-element'

let basicInfo = ref([])
let handleTree = ref([])
let handleTreeId = ref(0)
onMounted(() => {
  getApplyForm({
    formCategoryId: 22,
    formId: 17,
    nodeId: 'node_257453325911'
  }).then(({ data: res }) => {
    if (res.success) {
      // verifyThroughInvestigationList
      const { formId, formModuleVoList } = res.data
      const { formModuleItemList: basicInfoList } = formModuleVoList.find(
        (item) => item.module === '客户基本信息'
      )
      basicInfo.value = basicInfoList
      if (formModuleVoList.length > 2) {
        const data = formModuleVoList.slice(2)
        data.splice(1, 0, [
          {
            userInfo: {
              id: '1156',
              name: '吕强1',
              type: null,
              label: null,
              roleRange: null,
              sex: null,
              selected: null,
              org: null,
              institutionalInformation: ['测试二级机构1', '研发组1']
            },
            formModuleItemList: [
              {
                id: '308',
                title: '响应时间',
                name: 'TimePicker',
                module: '首次响应',
                value: '2022-03-01',
                valueType: 'Date',
                sort: 31,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  enablePrint: null,
                  placeholder: '',
                  format: 'yyyy-MM-dd HH:mm:ss',
                  gl: null,
                  order: null
                }
              },
              {
                id: '309',
                title: '响应方式',
                name: 'SelectInput',
                module: '首次响应',
                value: 'select7080309378863',
                valueType: 'String',
                sort: 32,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: 'select7080309378863',
                      value: '电话'
                    },
                    {
                      id: 'select6244309416588',
                      value: '微信'
                    },
                    {
                      id: 'select9048709419729',
                      value: 'qq'
                    }
                  ],
                  exclusiveRowOrNot: false
                }
              },
              {
                id: '310',
                title: '响应内容',
                name: 'TextareaInput',
                module: '首次响应',
                value: '234234',
                valueType: 'String',
                sort: 33,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  numberOfWords: '50'
                }
              },
              {
                id: '338',
                title: '后续处理',
                name: 'MultipleSelect',
                module: '首次响应',
                value: ['1417'],
                valueType: 'Array',
                sort: 48,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: false,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: '1417',
                      value: '管理员2'
                    },
                    {
                      id: '1459',
                      value: '张芮嘉'
                    }
                  ]
                }
              }
            ],
            processingRecordsId: null,
            groupId: 25,
            module: '首次响应',
            editPermissions: 'D'
          },
          {
            userInfo: {
              id: '1156',
              name: '吕强11',
              type: null,
              label: null,
              roleRange: null,
              sex: null,
              selected: null,
              org: null,
              institutionalInformation: ['测试二级机构11', '研发组11']
            },
            formModuleItemList: [
              {
                id: '308',
                title: '响应时间',
                name: 'TimePicker',
                module: '首次响应',
                value: '',
                valueType: 'Date',
                sort: 31,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  enablePrint: null,
                  placeholder: '',
                  format: 'yyyy-MM-dd HH:mm:ss',
                  gl: null,
                  order: null
                }
              },
              {
                id: '309',
                title: '响应方式',
                name: 'SelectInput',
                module: '首次响应',
                value: '',
                valueType: 'String',
                sort: 32,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: 'select7080309378863',
                      value: '电话'
                    },
                    {
                      id: 'select6244309416588',
                      value: '微信'
                    },
                    {
                      id: 'select9048709419729',
                      value: 'qq'
                    }
                  ],
                  exclusiveRowOrNot: false
                }
              },
              {
                id: '310',
                title: '响应内容',
                name: 'TextareaInput',
                module: '首次响应',
                value: '',
                valueType: 'String',
                sort: 33,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: true,
                  placeholder: '',
                  numberOfWords: '50'
                }
              },
              {
                id: '338',
                title: '后续处理',
                name: 'MultipleSelect',
                module: '首次响应',
                value: [],
                valueType: 'Array',
                sort: 48,
                perm: null,
                processingRecordsId: null,
                props: {
                  required: false,
                  placeholder: '',
                  expanding: false,
                  options: [
                    {
                      id: '1417',
                      value: '管理员2'
                    },
                    {
                      id: '1459',
                      value: '张芮嘉'
                    }
                  ]
                }
              }
            ],
            processingRecordsId: null,
            groupId: 25,
            module: '首次响应',
            editPermissions: 'D'
          }
        ])
        data[2] = {
          userInfo: {
            id: '1156',
            name: '吕强123',
            institutionalInformation: ['测试二级机构1', '研发组1']
          },
          formModuleItemList: [
            {
              id: '308',
              title: '响应时间',
              name: 'TimePicker',
              module: '首次响应',
              value: '2022-03-01',
              valueType: 'Date',
              sort: 31,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                enablePrint: null,
                placeholder: '',
                format: 'yyyy-MM-dd HH:mm:ss',
                gl: null,
                order: null
              }
            },
            {
              id: '309',
              title: '响应方式',
              name: 'SelectInput',
              module: '首次响应',
              value: 'select7080309378863',
              valueType: 'String',
              sort: 32,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: 'select7080309378863',
                    value: '电话'
                  },
                  {
                    id: 'select6244309416588',
                    value: '微信'
                  },
                  {
                    id: 'select9048709419729',
                    value: 'qq'
                  }
                ],
                exclusiveRowOrNot: false
              }
            },
            {
              id: '310',
              title: '响应内容',
              name: 'TextareaInput',
              module: '首次响应',
              value: '234234',
              valueType: 'String',
              sort: 33,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                numberOfWords: '50'
              }
            },
            {
              id: '338',
              title: '后续处理',
              name: 'MultipleSelect',
              module: '首次响应',
              value: ['1417'],
              valueType: 'Array',
              sort: 48,
              perm: null,
              processingRecordsId: null,
              props: {
                required: false,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: '1417',
                    value: '管理员2'
                  },
                  {
                    id: '1459',
                    value: '张芮嘉'
                  }
                ]
              }
            }
          ],
          processingRecordsId: null,
          groupId: 25,
          module: '首次响应',
          editPermissions: 'D'
        }
        data[3] = {
          userInfo: {
            id: '1156',
            name: '吕强123456',
            institutionalInformation: ['测试二级机构1', '研发组1']
          },
          formModuleItemList: [
            {
              id: '308',
              title: '响应时间',
              name: 'TimePicker',
              module: '首次响应',
              value: '2000-12-12',
              valueType: 'Date',
              sort: 31,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                enablePrint: null,
                placeholder: '',
                format: 'yyyy-MM-dd HH:mm:ss',
                gl: null,
                order: null
              }
            },
            {
              id: '309',
              title: '响应方式',
              name: 'SelectInput',
              module: '首次响应',
              value: 'select7080309378863',
              valueType: 'String',
              sort: 32,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: 'select7080309378863',
                    value: '电话'
                  },
                  {
                    id: 'select6244309416588',
                    value: '微信'
                  },
                  {
                    id: 'select9048709419729',
                    value: 'qq'
                  }
                ],
                exclusiveRowOrNot: false
              }
            },
            {
              id: '310',
              title: '响应内容',
              name: 'TextareaInput',
              module: '首次响应',
              value: '23324234',
              valueType: 'String',
              sort: 33,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                numberOfWords: '50'
              }
            },
            {
              id: '338',
              title: '后续处理',
              name: 'MultipleSelect',
              module: '首次响应',
              value: ['1417'],
              valueType: 'Array',
              sort: 48,
              perm: null,
              processingRecordsId: null,
              props: {
                required: false,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: '1417',
                    value: '管理员2'
                  },
                  {
                    id: '1459',
                    value: '张芮嘉'
                  }
                ]
              }
            }
          ],
          processingRecordsId: null,
          groupId: 25,
          module: '首次响应',
          editPermissions: 'D'
        }
        data[4] = {
          userInfo: {
            id: '1156456',
            name: '吕强123456897',
            institutionalInformation: ['测试二级机构1', '研发组1']
          },
          formModuleItemList: [
            {
              id: '308',
              title: '响应时间',
              name: 'TimePicker',
              module: '首次响应',
              value: '',
              valueType: 'Date',
              sort: 31,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                enablePrint: null,
                placeholder: '',
                format: 'yyyy-MM-dd HH:mm:ss',
                gl: null,
                order: null
              }
            },
            {
              id: '309',
              title: '响应方式',
              name: 'SelectInput',
              module: '首次响应',
              value: '',
              valueType: 'String',
              sort: 32,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: 'select7080309378863',
                    value: '电话'
                  },
                  {
                    id: 'select6244309416588',
                    value: '微信'
                  },
                  {
                    id: 'select9048709419729',
                    value: 'qq'
                  }
                ],
                exclusiveRowOrNot: false
              }
            },
            {
              id: '310',
              title: '响应内容',
              name: 'TextareaInput',
              module: '首次响应',
              value: '',
              valueType: 'String',
              sort: 33,
              perm: null,
              processingRecordsId: null,
              props: {
                required: true,
                placeholder: '',
                numberOfWords: '50'
              }
            },
            {
              id: '338',
              title: '后续处理',
              name: 'MultipleSelect',
              module: '首次响应',
              value: [],
              valueType: 'Array',
              sort: 48,
              perm: null,
              processingRecordsId: null,
              props: {
                required: false,
                placeholder: '',
                expanding: false,
                options: [
                  {
                    id: '1417',
                    value: '管理员2'
                  },
                  {
                    id: '1459',
                    value: '张芮嘉'
                  }
                ]
              }
            }
          ],
          processingRecordsId: null,
          groupId: 25,
          module: '首次响应',
          editPermissions: 'E'
        }
        handleTree.value = data
        handleTreeId.value = formId
      }
    }
  })
})
const router = useRouter()
const handleReturn = () => {
  router.go(-1)
}
const isSysShow = ref(false)
const changeShow = (flag) => {
  isSysShow.value = flag
}
</script>

<template>
  <div class="complaint-element">
    <div class="top">
      <div class="info">
        <span>投诉编号：20230601000023YH</span>
        <span>投诉来源：银保监会系统转来投诉</span>
        <span>投诉时间：2023-06-01 18：15</span>
        <span>录入人：投诉中心客服A</span>
      </div>
      <span class="btn" @click="handleReturn">返回</span>
    </div>
    <BasicInfo :data="basicInfo" style="height: 388px"></BasicInfo>
    <ComplaintDetails></ComplaintDetails>
    <ComplaintHandling :data="handleTree" :formId="handleTreeId" @changeShow="changeShow" />
    <!-- 系统推荐策略 -->
    <system-recommendation-strategy v-show="isSysShow"></system-recommendation-strategy>
  </div>
</template>

<style lang="less" scoped>
@color-1: #505968;
@common_primary_color: #2d5cf6;
.complaint-element {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .top {
    display: flex;
    justify-content: space-between;
    height: 34px;
    line-height: 34px;
    color: @color-1;
    .info {
      display: flex;
      gap: 16px;
      font-size: 12px;
    }
    .btn {
      width: 84px;
      height: 100%;
      background-color: #fff;
      border: 0;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      color: @common_primary_color;
      cursor: pointer;
    }
  }
}











</style>
