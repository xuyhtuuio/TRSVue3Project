<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-21 11:42:54
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-09-28 14:30:42
 * @FilePath: /protection-treatment/src/views/complaint-handling/complaint-handling-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <!-- 头部 -->
    <div class="header">
        <p class="welcome"> 欢迎来到消保管控平台！</p>
        <p class="tips" v-if="pendingNums">您有 {{ pendingNums }} 笔【消保投诉】任务待处理哦。请尽快处理！</p>
    </div>
    <div class="content">
        <div class="dashboard">
            <div v-for="item in totalList" :key="item.key" @click="changeStatistics(item)"
                :class="['data-info', 'pointer', item.key === crtKey ? 'data-info-active' : '']">
                <div class="icon">
                    <img :src="item.icon" alt="">
                </div>
                <div class="name-total">
                    <span class="name">{{ item.name }}</span>
                    <span class="total">{{ item.total }}<i>个</i></span>
                </div>
            </div>
        </div>
        <div class="filter">
            <div class="floor1">
                <el-select popper-class="transaction-select" v-model="search.complaintStatus" placeholder="投诉状态" clearable
                    @clear="searchList" :suffix-icon="CaretBottom">
                    <el-option v-for="(item, index) in $field('complaint_status')" :key="index" :label="item.label"
                        :value="item.value"></el-option>

                </el-select>
                <el-select v-model="search.complaintOrigin" placeholder="投诉来源" @change="searchList" clearable
                    @clear="searchList" :suffix-icon="CaretBottom">
                    <el-option v-for="(item, index) in $field('complaint_origin')" :key="index" :label="item.label"
                        :value="item.value"></el-option></el-select>
                <el-select v-model="search.firstTime" placeholder="首次响应时间" @change="searchList" clearable
                    :suffix-icon="CaretBottom">
                    <el-option v-for="(item, index) in $field('isUrgent')" :key="index" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                <el-select v-model="search.timeLimit" placeholder="处理完成时限" @change="searchList" clearable
                    :suffix-icon="CaretBottom">
                    <el-option v-for="(item, index) in $field('isOpinions')" :key="index" :label="item.label"
                        :value="item.value" :suffix-icon="CaretBottom"></el-option>
                </el-select>
                <el-select v-model="search.updateTime2" ref="multiSelect" placeholder="排序" multiple @change="changeSort"
                    :class="search.updateTime2[1] == 'desc'
                        ? 'arrow-select descArrow'
                        : 'arrow-select ascArrow'
                        " :suffix-icon="CaretBottom">
                    <el-option-group v-for="group in $field('updateTimeGroup')" :key="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
            <div class="floor2">
                <div class="floor2-item">
                    <el-input v-model="search.no" placeholder="请输入投诉编码查询" clearable @clear="searchList"
                        @keyup.enter="searchList" :suffix-icon="Search">
                    </el-input>
                </div>
                <div class="floor2-item">
                    <el-input v-model="search.customerName" placeholder="请输入客户名称查询" clearable @clear="searchList"
                        @keyup.enter="searchList" :suffix-icon="Search">
                    </el-input>
                </div>
                <div class="floor2-item">
                    <span>投诉时间</span>
                    <el-date-picker v-model="search.productLaunchDate" value-format="yyyy-MM-dd" clearable type="daterange"
                        range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @clear="searchList"
                        @change="searchList">
                    </el-date-picker>
                </div>
                <div>
                    <el-button type="default" @click='reset'
                        style="border-radius: 6px;border: 1px solid  #A8C5FF;background: #F0F6FF;">重置</el-button>
                </div>
            </div>
        </div>
        <div v-if="tableData.length" v-loading="search.loading">
            <el-table class='trs-table' :data="tableData" style="width: 100%;margin-top: 16px;" @sort-change="sortChange">
                <el-table-column fixed type="index" label="序号" width="60" align="center">
                    <template #default="scope">
                        <span>{{ (pageValue.pageNow - 1) * pageValue.pageSize + scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed prop="no" label="投诉编码"  width="180" align="center">
                    <template #default="scope">
                        <span class="pointer series-number" @click="toDetail">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="customer_name" label="客户姓名" align="center" width="120"  />
                <el-table-column prop="source" label="投诉来源" align="center" width="188" />
                <el-table-column prop="unit_complained_against" label="被投诉单位" align="center" width="258" />
                <el-table-column prop="status" label="状态" align="center" width="100">
                    <template #default="scope">
                        <span
                            :class="{ 'tag in-handle': scope.row.status == '处理中', 'tag wait-handle': scope.row.status == '待处理', 'tag closed': scope.row.status == '已结案' }">{{
                                scope.row.status }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="complaint_time" label="投诉时间" sortable="custom" align="center" width="180" />
                <el-table-column prop="completion_time_limit" label="处理完成时限" align="center" width="180" />
                <el-table-column prop="updateTime" label="更新时间" align="center" width="180" />
                <el-table-column prop="response_time" label="首次响应时限" align="center" width="190" />
                <el-table-column label="快捷操作" width="164" align="center">
                    <template #default>
                        <div class="flex operation">
                            <el-button text size="small" @click="toDetail">查看</el-button>
                            <el-button text size="small">催办</el-button>
                            <el-button text size="small" class="close">结案</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <trs-pagination :pageSize="pageValue.pageSize" :pageNow="pageValue.pageNow" :total="pageValue.total"
                @handleCurrentChange="handleCurrentChange"></trs-pagination>
        </div>
        <el-empty description="暂无数据" v-loading="search.loading" v-else />
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue';
import { Search, CaretBottom } from '@element-plus/icons-vue';
import list from './data.json';
import TrsPagination from '@/components/trs-pagination.vue'
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
const router = useRouter();

let allData=ref([])
allData.value = [...list]
onMounted(() => {
    const dom = document
        .querySelectorAll('.arrow-select')[0]
        .querySelector('.el-select__tags');
    nextTick(() => {
        const text = search.updateTime[0] === 1 ? '发起时间' : '更新时间';
        dom.innerText = text;
    });
    search.loading = true
    setTimeout(() => {
        tableData = list.slice(0, 10);
        search.loading = false
        handleStatistics()
    }, 2000)
});
let tableData = reactive([]);
let pageValue = reactive({
    pageSize: 10,
    pageNow: 1,
    total: list.length
})
// 去详情页
let toDetail = () => {
    router.push({
        name: 'complaintElement'
    });

}
/**
 * @description: 自定义排序
 * @return {*}
 */
let sortChange = ({ prop, order }) => {
    console.log('row', prop, order)
    if (prop == 'complaint_time') {
        allData.value = allData.value.sort((a, b) => {
            return order=='ascending'? dayjs(a[prop]) - dayjs(b[prop]):dayjs(b[prop]) - dayjs(a[prop])
        })
    }

    search.loading = true
    setTimeout(() => {
        tableData = allData.value.slice(0,10)
        search.loading = false
        pageValue.pageNow = 1
    }, 1000)
}
/**
 * @description: 处理翻页
 * @return {*}
 */
let handleCurrentChange = (val) => {
    pageValue.pageNow = val
    search.loading = true
    setTimeout(() => {
        tableData = allData.value.slice((val - 1) * 10, (val) * 10)
        search.loading = false
    }, 1000)

}
// 通过ref获取dom
const multiSelect = ref(null);
/**
 * @description: 统计
 * @return {*}
 */
let crtKey = ref('all');
const totalList = reactive([
    {
        name: '全部投诉',
        total: 0,
        key: 'all',
        icon: new URL('@/assets/image/complaintHandling/all.svg', import.meta.url).href
    },
    {
        name: '待处理',
        total: 0,
        key: 'pending',
        icon: new URL('@/assets/image/complaintHandling/wait.svg', import.meta.url).href
    },
    {
        name: '处理中',
        total: 0,
        key: 'inHand',
        icon: new URL('@/assets/image/complaintHandling/handing.svg', import.meta.url).href
    }, {
        name: '已结案',
        total: 0,
        key: 'closed',
        icon: new URL('@/assets/image/complaintHandling/closed.svg', import.meta.url).href
    }

]);
/**
 * @description: 各个统计的数量
 * @return {*}
 */
const pendingNums = ref(0)
let handleStatistics = () => {
    const pendingNum = list.filter(m => {
        return m.status === '待处理'
    })?.length
    pendingNums.value = pendingNum
    const inHandNum = list.filter(m => {
        return m.status === '处理中'
    })?.length
    const closedNum = list.filter(m => {
        return m.status === '已结案'
    })?.length
    const newTotalList = totalList.map(m => {
        switch (m.name) {
            case ('待处理'):
                m.total = pendingNum
                break;
            case ('处理中'):
                m.total = inHandNum
                break;
            case ('已结案'):
                m.total = closedNum
                break;
            case ('全部投诉'):
                m.total = list.length
                break;
        }
        return m
    })
    Object.assign(totalList, newTotalList)
}
/**
 * @description: 切换顶部统计
 * @return {*}
 */
let changeStatistics = (val) => {
    crtKey.value = val.key;
};

/**
 * @description: 筛选条件
 * @return {*}
 */
let search = reactive({
    complaintStatus: '',
    complaintOrigin: '',
    firstTime: '',
    timeLimit: '',
    updateTime: [2, 'desc'],
    updateTime2: [2, 'desc'],
    no: '',
    customerName: '',
    productLaunchDate: '',
    loading: false

});
const resetValue = () => {
    return {
        complaintStatus: '',
        complaintOrigin: '',
        firstTime: '',
        timeLimit: '',
        updateTime: [2, 'desc'],
        updateTime2: [2, 'desc'],
        no: '',
        customerName: '',
        productLaunchDate: ''
    };
};

let reset = () => {
    Object.assign(search, resetValue())
}
/**
 * @description: 调用列表接口
 * @return {*}
 */
let searchList = () => {

};

/**
 * @description: 时间排序筛选
 * @return {*}
 */
let changeSort = () => {
    const lastKey = search.updateTime2[search.updateTime2.length - 1];
    if (search.updateTime2.length < 2) {
        search.updateTime2 = search.updateTime;
    } else {
        if (!isNaN(lastKey)) {
            search.updateTime[0] = lastKey;
        } else {
            search.updateTime[1] = lastKey;
        }
        nextTick(() => {
            search.updateTime2 = search.updateTime;
        });
    }
    const dom = document
        .querySelectorAll('.arrow-select')[0]
        .querySelector('.el-select__tags');
    nextTick(() => {
        const text = search.updateTime[0] === 1 ? '发起时间' : '更新时间';
        dom.innerHTML = `<el-icon><Top /></el-icon>${text}`;
        setTimeout(() => {
            multiSelect.value.blur();
        }, 50);
        searchList();
    });
};


</script>
<style scoped lang="less">
.header {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;

    .welcome {
        color: #1D2128;
        margin-bottom: 8px;
    }

    .tips {
        padding: 6px 12px;
        border-radius: 20px;
        background: #FFFCE8;
        color: #FA8C16;
        display: inline-block;
    }
}

.content {
    margin-top: 16px;
    padding: 24px;
    border-radius: 10px;
    background: #FFF;

    .dashboard {
        display: flex;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;

        .data-info {
            padding: 12px 36px;
            border-radius: 8px;
            display: flex;
            margin-right: 20px;

            .icon {
                width: 50px;
                height: 50px;
                border-radius: 50px;
                background: var(--gray-gray-3, #F2F3F5);
                margin-right: 12px;
                position: relative;

                img {
                    position: absolute;
                    top: 11px;
                    left: 6px;
                }
            }

            .name-total {
                display: flex;
                flex-direction: column;

                .total {
                    margin-top: 8px;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 28px;

                    i {
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 20px;
                        margin-left: 8px;
                    }
                }
            }
        }

        .data-info-active {
            color: #fff !important;
            background: var(--1, linear-gradient(90deg, #7B61FF 0%, #61A0FF 107.5%));
        }
    }

    .filter {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;


        :deep(.el-input__inner),
        :deep(.el-range-input) {
            border-radius: 4px;
            border: none;
            color: #1d2128;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;

            .el-range-separator {
                padding: 0;
            }
        }

        :deep(.el-input__wrapper) {
            box-shadow: none;
            border-radius: 4px;
            height: 36px;
            background: var(--gray-gray-2, #F7F8FA);
        }

        .floor1 {
            margin-bottom: 12px;
            padding-right: 16px;
            display: flex;
            justify-content: space-between;

            .el-select {
                margin-right: 16px;
                flex: 1;

                :deep(.select-trigger) {
                    width: 100% !important;
                }
            }

            .el-select:last-of-type {
                margin-right: 0;
            }



            .descArrow,
            .ascArrow {
                display: flex;
                align-items: center;

                &::before {
                    // font-family: element-icons !important;
                    font-family: "iconfont" !important;
                    content: '\e60e';
                    display: inline-block;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 12px;
                    color: #86909c;
                    z-index: 10;
                    font-size: 18px;
                }

                :deep(.el-select__tags) {
                    position: absolute;
                    left: 40px;
                    width: 0;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;
                    color: #1d2128;

                    span {
                        display: none;
                    }
                }
            }

            .descArrow {
                &::before {
                    font-family: "iconfont" !important;
                    content: '\e60f';
                    display: inline-block;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 12px;
                    color: #86909c;
                    z-index: 10;
                    font-size: 18px;
                }
            }

            .floor1-item {
                flex: 1;
                display: flex;
                margin-right: 16px;
                justify-content: space-between;

                .el-select {
                    width: 49%;
                }
            }

            .floor1-item:last-of-type {
                margin-right: 0;
            }
        }

        .floor2 {
            width: 100%;
            display: flex;
            padding-right: 16px;
            align-items: center;

            .floor2-item {
                flex: 1;
                margin-right: 16px;
                display: flex;
                align-items: center;

                .el-input,
                .el-date-editor {
                    width: 100%;
                }

                span {
                    color: #86909c;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 22px;
                    word-break: keep-all;
                    margin-right: 8px;
                }
            }

            .floor2-item:last-of-type {
                margin-right: 0;
            }

            :deep(.el-date-editor) {
                position: relative;

                .el-range-input {
                    text-align: left;
                }

                .el-icon-date,
                .el-range__icon {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .el-range__close-icon {
                    right: 18px;
                }
            }
        }
    }

    .el-table {
        .operation {
            justify-content: center;

            .el-button {
                margin: 0;
                margin-right: 16px;
                padding: 0;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: #306EF5;
            }

            .close {
                color: #EB5D78;
            }

            .el-button:last-child {
                margin-right: 0;
            }
        }

        .tag {
            border-radius: 4px;
            line-height: 20px;

            padding: 5px 16px;
            display: inline-block;


        }

        .in-handle {
            background: #FFF7E6;
            color: #FA8C16;
        }

        .wait-handle {
            background: #FFF1F0;
            color: #EB5757;

        }

        .closed {
            background: linear-gradient(0deg, #F6FFED 0%, #F6FFED 100%), #FFF1F0;
            color: #389E0D;
        }

        .series-number {
            color: #2D5CF6;
        }
    }

}
</style> 