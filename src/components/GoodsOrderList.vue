<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.goodsOrders"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'status'">
                <div v-if="record.status == 0">未交付</div>
                <div v-if="record.status == 1">已交付</div>
                <div v-if="record.status == 2">已取消</div>
                <div v-if="record.status == 3">待取消</div>
            </template>
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button danger style="margin-right: 10px;" :disabled="!(record.status == 3)"
                    @click="cancelOrders(record)">取消订单</a-button>
            </template>
            <template v-if="column.dataIndex == 'completeTime'">
                <div v-if="record.completeTime != null"> {{ record.completeTime }}</div>
                <div v-else style="color: #00000050;">订单暂未完成</div>
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
                    state.goodsOrders.forEach((goodsOrder: GoodsOrder) => {
                        if (goodsOrder.createTime != null) {
                            goodsOrder.createTime = goodsOrder.createTime.split('T')[0] + ' ' + goodsOrder.createTime.split('T')[1].split('.')[0]
                        }
                        if (goodsOrder.completeTime != null) {
                            goodsOrder.completeTime = goodsOrder.completeTime.split('T')[0] + ' ' + goodsOrder.completeTime.split('T')[1].split('.')[0]
                        }
                    })
                } else {
                    message.error(res.description)
                }
            })
        })

        function cancelOrders(record: GoodsOrder) {
            api.cancelOrders({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.goodsOrders[state.goodsOrders.lastIndexOf(record)].status = 2
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns = [
            { title: '卖家用户名', dataIndex: 'goodsUserName', key: 'goodsUserName', },
            { title: '买家用户名', dataIndex: 'userName', key: 'userName', },
            { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', },
            { title: '订单开始时间', dataIndex: 'createTime', key: 'createTime', },
            { title: '订单状态', dataIndex: 'status', key: 'status', },
            { title: '订单完成时间', dataIndex: 'completeTime', key: 'completeTime', },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            cancelOrders
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>