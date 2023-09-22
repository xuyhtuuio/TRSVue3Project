<!--
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-21 11:42:54
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-09-22 17:14:43
 * @FilePath: /protection-treatment/src/views/complaint-handling/complaint-handling-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="content">
        <div class="filter">
            <div class="select">
                <div class="floor1">
                    <div class="half2">
                        <el-select popper-class="transaction-select" v-model="search.complaintStatus" placeholder="投诉状态"
                            clearable @clear="searchList" :suffix-icon="CaretBottom">
                            <el-option v-for="(item, index) in $field('complaint_status')" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                        <el-select popper-class="transaction-select" v-model="search.orderNature" placeholder="工单性质"
                            clearable @clear="searchList" :suffix-icon="CaretBottom">
                            <el-option v-for="(item, index) in $field('complaint_status')" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="search.complaintOrigin" placeholder="投诉来源" @change="searchList" clearable
                            @clear="searchList" :suffix-icon="CaretBottom">
                            <el-option v-for="(item, index) in $field('complaint_origin')" :key="index" :label="item.label"
                                :value="item.value"></el-option></el-select>
                    </div>
                    <div class="half3">
                        <el-select v-model="search.complaintDept" placeholder="被投诉单位" @change="searchList" clearable
                            @clear="searchList" :suffix-icon="CaretBottom" class="floor1-item">
                            <el-option v-for="(item, index) in $field('complaint_origin')" :key="index" :label="item.label"
                                :value="item.value"></el-option></el-select>
                        <el-date-picker v-model="search.firstTime" type="date" placeholder="投诉时间" class="floor1-item"
                            @change="searchList" clearable value-format="YYYY-MM-DD" />
                        <el-date-picker v-model="search.timeLimit" type="date" placeholder="更新时间" class="floor1-item"
                            @change="searchList" clearable value-format="YYYY-MM-DD" />
                    </div>
                </div>
                <div class="floor2">
                    <div class="floor2-item">
                        <el-input v-model="search.no" placeholder="请输入投诉编码查询" clearable @clear="searchList"
                            @keyup.enter="searchList" :suffix-icon="Search">
                        </el-input>
                    </div>
                    <div class="floor2-item">
                        <el-input v-model="search.customerName" placeholder="请输入客户姓名查询" clearable @clear="searchList"
                            @keyup.enter="searchList" :suffix-icon="Search">
                        </el-input>
                    </div>
                    <div class="floor2-item">
                        <el-select v-model="search.nature" placeholder="投诉性质" @change="searchList" clearable
                            :suffix-icon="CaretBottom">
                            <el-option v-for="(item, index) in $field('complaint_level')" :key="index" :label="item.label"
                                :value="item.value" :suffix-icon="CaretBottom"></el-option>
                        </el-select>
                    </div>
                    <div class="floor2-item">
                        <el-select v-model="search.level" placeholder="投诉等级" @change="searchList" clearable
                            :suffix-icon="CaretBottom">
                            <el-option v-for="(item, index) in $field('complaint_level')" :key="index" :label="item.label"
                                :value="item.value" :suffix-icon="CaretBottom"></el-option>
                        </el-select>
                    </div>
                    <div class="floor2-item">
                        <el-select v-model="search.dept" placeholder="受理单位" @change="searchList" clearable
                            :suffix-icon="CaretBottom">
                            <el-option v-for="(item, index) in $field('isOpinions')" :key="index" :label="item.label"
                                :value="item.value" :suffix-icon="CaretBottom"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="btns">
                <el-button type="default">导出</el-button>
                <el-button type="default" @click='reset'>重置</el-button>
            </div>
        </div>
        <div v-if="tableData.length">
            <el-table class='trs-table' :data="tableData" style="width: 100%;margin-top: 16px;">
                <el-table-column fixed type="index" label="序号" width="60" align="center" />
                <el-table-column fixed prop="no" label="投诉编码" sortable width="180" align="center">
                    <template #default="scope">
                        <span class="pointer series-number">{{ scope.row.no }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="customerName" label="工单性质" align="center" width="120" sortable />
                <el-table-column prop="origin" label="投诉来源" align="center" width="188" />
                <el-table-column prop="origin" label="客户姓名" align="center" width="188" />
                <el-table-column prop="origin" label="投诉等级" align="center" width="188" />
                <el-table-column prop="origin" label="被投诉单位" align="center" width="188" />
                <el-table-column prop="origin" label="受理单位" align="center" width="188" />
                <el-table-column prop="status" label="状态" align="center" width="100">
                    <template #default="scope">
                        <span class="tag">{{ scope.row.status }} </span>
                    </template>
                </el-table-column>

                <el-table-column prop="origin" label="投诉时间" align="center" width="188" />
                <el-table-column prop="dept" label="处理完成时限" align="center" width="258" />

                <el-table-column prop="time" label="更新时间" sortable align="center" width="180" />
                <el-table-column prop="completionLimit" label="首次响应时限" sortable align="center" width="180" />

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
import list from '../complaint-handling/data.json';
import TrsPagination from '@/components/trs-pagination.vue'
onMounted(() => {
});
let pageValue = reactive({
    pageSize: 10,
    pageNow: 1,
    total: 100
})
/**
 * @description: 处理翻页
 * @return {*}
 */
let handleCurrentChange = (val) => {
    pageValue.pageNow = val
}

/**
 * @description: 统计
 * @return {*}
 */
let tableData = reactive([]);
tableData = list;
/**
 * @description: 筛选条件
 * @return {*}
 */
const search =reactive({
    complaintStatus: '',
    complaintOrigin: '',
    orderNature: '',
    firstTime: '',
    timeLimit: '',
    complaintDept: '',
    no: '',
    customerName: '',
    nature: '',
    level: '',
    dept: '',
    loading: true
});
/**
 * @description: 调用列表接口
 * @return {*}
 */
let searchList = () => {

};
/**
 * @description: 重置
 * @return {*}
 */
 const resetValue = () => {
  return {
    complaintStatus: '',
    complaintOrigin: '',
    orderNature: '',
    firstTime: '',
    timeLimit: '',
    complaintDept: '',
    no: '',
    customerName: '',
    nature: '',
    level: '',
    dept: '',
    loading: true
  };
};

let reset = () => {
      Object.assign(search,resetValue())
}


</script>
<style scoped lang="less">
.content {
    // padding: 24px;
    padding-top: 0px;
    border-radius: 10px;
    background: #FFF;
    display: flex;
    flex-direction: column;

    .filter {
        .btns {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-left: 1px dashed #E5E6EB;
            padding-left: 16px;

            .el-button {
                margin-bottom: 12px;
                margin-left: 0;
                border-radius: 6px;
                border: 1px solid #A8C5FF;
                background: #F0F6FF;
                font-weight: 700;
                line-height: 22px;
                font-size: 14px;
            }

            .el-button:last-of-type {
                margin-bottom: 0;
            }
        }

        display: flex;

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

            .half2 {
                flex: 2;
                display: flex;
                margin-right: 16px;

                .el-select {
                    flex: 1;
                    margin-right: 16px;
                }

                .el-select:last-of-type {
                    flex: 1.4;
                    margin-right: 0;
                }

            }

            .half3 {
                flex: 3;
                display: flex;

                .floor1-item {
                    flex: 1;
                    margin-right: 16px !important;

                }

                /deep/ .el-date-editor {
                    flex: 1;

                    .el-input__prefix {
                        position: absolute;
                        right: 4px;
                    }

                    .clear-icon {
                        position: absolute;
                        right: 32px;
                    }

                    margin-right: 16px !important;
                }

                /deep/ .el-date-editor:last-of-type {

                    margin-right: 0 !important;
                }
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
                .el-select {
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
            background: #FFF7E6;
            padding: 5px 16px;
            display: inline-block;
            color: #FA8C16;
            line-height: 20px;

        }

        .series-number {
            color: #2D5CF6;
        }
    }

}
</style> 