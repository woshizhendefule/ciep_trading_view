<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.goodsOrders"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button danger style="margin-right: 10px;" @click="deleteComments(record)">删除评价</a-button>
            </template>
            <template v-if="column.dataIndex == 'goodsUserEvaluation'">
                <div v-if="record.goodsUserEvaluation != null"> {{ record.goodsUserEvaluation }}</div>
                <div v-else style="color: #00000050;">暂无评价</div>
            </template>
            <template v-if="column.dataIndex == 'userEvaluation'">
                <div v-if="record.userEvaluation != null"> {{ record.userEvaluation }}</div>
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
            api.getUsersGoodsOrder().then((res: any) => {
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
                    state.goodsOrders[index].goodsUserScore = 0
                    state.goodsOrders[index].goodsUserEvaluation = null
                    state.goodsOrders[index].userScore = 0
                    state.goodsOrders[index].userEvaluation = null
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns = [
            { title: '卖家用户名', dataIndex: 'goodsUserName', key: 'goodsUserName', },
            { title: '买家用户名', dataIndex: 'userName', key: 'userName', },
            { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', },
            { title: '卖家评分（五星制）', dataIndex: 'goodsUserScore', key: 'goodsUserScore', },
            { title: '卖家评价', dataIndex: 'goodsUserEvaluation', key: 'goodsUserEvaluation', },
            { title: '买家评分（五星制）', dataIndex: 'userScore', key: 'userScore', },
            { title: '买家评价', dataIndex: 'userEvaluation', key: 'userEvaluation', },
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