<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.goodsOrders"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button danger style="margin-right: 10px;" @click="deleteComments(record)">删除评价</a-button>
            </template>
            <template v-if="column.dataIndex == 'goodsUserScore'">
                <div v-if="record.goodsUserScore != -1"> {{ record.goodsUserScore }}</div>
                <div v-else style="color: #00000050;">暂无评分</div>
            </template>
            <template v-if="column.dataIndex == 'goodsUserEvaluation'">
                <div v-if="record.goodsUserEvaluation != ''"> {{ record.goodsUserEvaluation }}</div>
                <div v-else style="color: #00000050;">暂无评价</div>
            </template>
            <template v-if="column.dataIndex == 'userScore'">
                <div v-if="record.userScore != -1"> {{ record.userScore }}</div>
                <div v-else style="color: #00000050;">暂无评分</div>
            </template>
            <template v-if="column.dataIndex == 'userEvaluation'">
                <div v-if="record.userEvaluation != ''"> {{ record.userEvaluation }}</div>
                <div v-else style="color: #00000050;">暂无评价</div>
            </template>

        </template>
    </a-table>
</template>

<script lang="ts">
import { GoodsOrder } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount } from "vue";
import { message } from "ant-design-vue";

interface state {
    goodsOrders: GoodsOrder[]
}

export default defineComponent({
    name: "App",

    setup() {

        const state = reactive<state>({
            goodsOrders: []
        });

        onBeforeMount(() => {
            api.getAllGoodsOrder().then((res: any) => {
                if (res.code == 200) {
                    state.goodsOrders = res.data
                } else {
                    message.error(res.description)
                }
            })
        })

        function deleteComments(record: GoodsOrder) {
            api.deleteComments({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    let index = state.goodsOrders.lastIndexOf(record)
                    state.goodsOrders[index].goodsUserScore = -1
                    state.goodsOrders[index].goodsUserEvaluation = ''
                    state.goodsOrders[index].userScore = -1
                    state.goodsOrders[index].userEvaluation = ''
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns = [
            { title: '买家用户名', dataIndex: 'userName', key: 'userName', },
            { title: '卖家用户名', dataIndex: 'goodsUserName', key: 'goodsUserName', },
            { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', },
            { title: '对卖家的评分（五分制）', dataIndex: 'goodsUserScore', key: 'goodsUserScore', },
            { title: '对卖家的评价', dataIndex: 'goodsUserEvaluation', key: 'goodsUserEvaluation', },
            { title: '对买家的评分（五分制）', dataIndex: 'userScore', key: 'userScore', },
            { title: '对买家的评价', dataIndex: 'userEvaluation', key: 'userEvaluation', },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            deleteComments
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>