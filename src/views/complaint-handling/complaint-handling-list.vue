<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-21 11:42:54
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-09-21 15:43:59
 * @FilePath: /protection-treatment/src/views/complaint-handling/complaint-handling-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <!-- 头部 -->
    <div class="header">
        <p class="welcome"> 欢迎来到消保管控平台！</p>
        <p class="tips">您有 2 笔【消保投诉】任务待处理哦。请尽快处理！</p>
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
        <!-- <div class="filter">
            <div class="floor1">
                <el-select popper-class="transaction-select" v-model="search.complaintStatus" placeholder="投诉状态"
                    @change="changeArrrovalType" clearable @clear="searchList">
                    <el-option v-for="(item, index) in transactionTypes" :key="index" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                <el-select v-model="search.complaintOrigin" placeholder="投诉来源" @change="searchList" clearable
                    @clear="searchList">
                    <el-option v-for="(item, index) in approvalPhases" :key="index" :label="item.label"
                        :value="item.value"></el-option></el-select>
                <el-select v-model="search.firstTime" placeholder="首次响应时间" @change="searchList" clearable>
                    <el-option v-for="(item, index) in $field('isUrgent')" :key="index" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                <el-select v-model="search. timeLimit" placeholder="处理完成时限" @change="searchList" clearable>
                    <el-option v-for="(item, index) in $field('isOpinions')" :key="index" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                <el-select v-model="search.updateTime" ref="multiSelect" placeholder="排序" multiple @change="changeSort"
                    :class="search.updateTime[1] == 'desc'
                        ? 'arrow-select descArrow'
                        : 'arrow-select ascArrow'
                        ">
                    <el-option-group v-for="group in $field('updateTimeGroup')" :key="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
            <div class="floor2">
                <div class="floor2-item">
                    <el-input v-model="search.no" placeholder="请输入投诉编码查询" clearable @clear="searchList"
                        @keyup.enter="searchList">
                        <i slot="suffix" class="el-input__icon el-icon-search pointer" @click="searchList"></i>
                    </el-input>
                </div>
                <div class="floor2-item">
                    <el-input v-model="search.customerName" placeholder="请输入客户名称查询" clearable @clear="searchList"
                        @keyup.enter="searchList">
                        <i slot="suffix" class="el-input__icon el-icon-search pointer" @click="searchList"></i>
                    </el-input>
                </div>
                <div class="floor2-item">
                    <span>投诉时间</span>
                    <el-date-picker v-model="search.productLaunchDate" value-format="yyyy-MM-dd" clearable type="daterange"
                        range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @clear="searchList"
                        @change="searchList">
                    </el-date-picker>
                </div>
            </div>


        </div> -->
        <div class="list"></div>

    </div>
    <!--  -->
    <!--  -->
</template>

<script setup>
import { ref, reactive, } from 'vue';
/**
 * @description: 统计
 * @return {*}
 */
let crtKey = ref('pending');
const totalList = reactive([
    {
        name: '待处理',
        total: 125,
        key: 'pending',
        icon: new URL('@/assets/image/complaintHandling/wait.svg', import.meta.url).href

    },
    {
        name: '处理中',
        total: 125,
        key: 'inHand',
        icon: new URL('@/assets/image/complaintHandling/handing.svg', import.meta.url).href


    }, {
        name: '已结案',
        total: 125,
        key: 'closed',
        icon: new URL('@/assets/image/complaintHandling/closed.svg', import.meta.url).href

    },
    {
        name: '全部投诉',
        total: 125,
        key: 'all',
        icon: new URL('@/assets/image/complaintHandling/all.svg', import.meta.url).href


    }
]);
/**
 * @description: 切换顶部统计
 * @return {*}
 */
let changeStatistics = (val) => {
    crtKey.value = val.key;
};

//筛选条件
let search = reactive({
    complaintStatus:'',
    complaintOrigin:'',
    firstTime:'',
    timeLimit:'',
    updateTime: [2, 'desc'],
    no:'',
    customerName:'',
    productLaunchDate:''

});


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
}
</style>