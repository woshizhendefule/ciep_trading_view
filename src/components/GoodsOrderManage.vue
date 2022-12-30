<template>
    <div v-if="state.userInfo?.isSeller != 1">
        <a-table class="ant-table-striped" size="middle" :columns="columns1" :data-source="state.goodsOrders"
            :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex == 'status'">
                    <div v-if="record.status == 0">未交付</div>
                    <div v-if="record.status == 1">已交付</div>
                    <div v-if="record.status == 2">已取消</div>
                    <div v-if="record.status == 3">待取消</div>
                </template>
                <template v-if="column.dataIndex == 'caozuo'">
                    <a-button danger style="margin-right: 10px;" :disabled="!(record.status == 0)"
                        @click="completeOrders(record)">完成订单</a-button>
                    <a-button type="primary" @click="showModal" style="margin: 0 0 10px 0;"
                        :disabled="!(record.status == 1) || record.goodsUserEvaluation != null">对卖家评价</a-button>
                    <a-modal v-model:visible="visible" title="修改用户名" @ok="commentGoodsUser(record)">
                        <a-input v-model:value="state.inputGoodsUserScore" :bordered="false"
                            placeholder="请输入本次交易的评分（五分制）" />
                        <a-input v-model:value="state.inputGoodsUserEvaluation" :bordered="false"
                            placeholder="请输入本次交易的评价" />
                    </a-modal>
                    <a-button danger style="margin-right: 10px;" :disabled="!(record.status == 0)"
                        @click="cancelOrdersApply(record)">取消订单申请</a-button>
                </template>
                <template v-if="column.dataIndex == 'completeTime'">
                    <div v-if="record.completeTime != null"> {{ record.completeTime }}</div>
                    <div v-else style="color: #00000050;">订单暂未完成</div>
                </template>
                <template v-if="column.dataIndex == 'goodsUserEvaluation'">
                    <div v-if="record.goodsUserEvaluation != null"> {{ record.goodsUserEvaluation }}</div>
                    <div v-else style="color: #00000050;">暂无评价</div>
                </template>
                <template v-if="column.dataIndex == 'goodsUserScore'">
                    <div v-if="record.userEvaluation != null"> {{ record.goodsUserScore }}</div>
                    <div v-else style="color: #00000050;">暂无评分</div>
                </template>
            </template>
        </a-table>
    </div>
    <div v-if="state.userInfo?.isSeller == 1">
        <a-table class="ant-table-striped" size="middle" :columns="columns2" :data-source="state.goodsOrders"
            :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex == 'status'">
                    <div v-if="record.status == 0">未交付</div>
                    <div v-if="record.status == 1">已交付</div>
                    <div v-if="record.status == 2">已取消</div>
                    <div v-if="record.status == 3">待取消</div>
                </template>
                <template v-if="column.dataIndex == 'caozuo'">
                    <a-button type="primary" @click="showModal1" style="margin: 0;margin-right: 10px;"
                        :disabled="!(record.status == 1) || record.userEvaluation != null">对买家评价</a-button>
                    <a-modal v-model:visible="visible1" title="修改用户名" @ok="commentUser(record)">
                        <a-input v-model:value="state.inputUserScore" :bordered="false" placeholder="请输入本次交易的评分（五分制）" />
                        <a-input v-model:value="state.inputUserEvaluation" :bordered="false" placeholder="请输入本次交易的评价" />
                    </a-modal>
                    <a-button danger :disabled="!(record.status == 3)" @click="cancelOrders(record)">取消订单</a-button>
                </template>
                <template v-if="column.dataIndex == 'completeTime'">
                    <div v-if="record.completeTime != null"> {{ record.completeTime }}</div>
                    <div v-else style="color: #00000050;">订单暂未完成</div>
                </template>
                <template v-if="column.dataIndex == 'userEvaluation'">
                    <div v-if="record.userEvaluation != null"> {{ record.userEvaluation }}</div>
                    <div v-else style="color: #00000050;">暂无评价</div>
                </template>
                <template v-if="column.dataIndex == 'userScore'">
                    <div v-if="record.userEvaluation != null"> {{ record.userScore }}</div>
                    <div v-else style="color: #00000050;">暂无评分</div>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { GoodsOrder, UserInfo } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount, ref } from "vue";
import { message } from "ant-design-vue";

interface state {
    goodsOrders: GoodsOrder[],
    userInfo: UserInfo | undefined,
    inputGoodsUserScore: string,
    inputGoodsUserEvaluation: string,
    inputUserScore: string,
    inputUserEvaluation: string
}

export default defineComponent({
    name: "goodsOrderManage",

    setup() {
        const state = reactive<state>({
            goodsOrders: [],
            userInfo: undefined,
            inputGoodsUserScore: '',
            inputGoodsUserEvaluation: '',
            inputUserScore: '',
            inputUserEvaluation: ''
        });

        const visible = ref<boolean>(
            false
        );

        const visible1 = ref<boolean>(
            false
        );

        onBeforeMount(() => {
            api.toViewUserInfo().then((res: any) => {
                if (res.code == 200) {
                    state.userInfo = res.data
                } else {
                    message.error(res.description)
                }
            }).finally(() => {
                if (state.userInfo?.isSeller != 1) {
                    api.getUsersGoodsOrder({
                        userId: state.userInfo?.id
                    }).then((res: any) => {
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
                }
                if (state.userInfo?.isSeller == 1) {
                    api.getGoodsUsersGoodsOrder({
                        goodsUserId: state.userInfo?.id
                    }).then((res: any) => {
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
                }
            })
        })

        const showModal = () => {
            visible.value = true;
        };

        const showModal1 = () => {
            visible1.value = true;
        };

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

        function completeOrders(record: GoodsOrder) {
            api.completeOrders({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.goodsOrders[state.goodsOrders.lastIndexOf(record)].status = 1
                } else {
                    message.error(res.description)
                }
            })
        }

        function commentGoodsUser(record: GoodsOrder) {
            api.commentGoodsUser({
                id: record.id,
                goodsUserScore: state.inputGoodsUserScore,
                goodsUserEvaluation: state.inputGoodsUserEvaluation
            }).then((res: any) => {
                if (res.code == 200) {
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function commentUser(record: GoodsOrder) {
            api.commentUser({
                id: record.id,
                userScore: state.inputUserScore,
                userEvaluation: state.inputUserEvaluation
            }).then((res: any) => {
                if (res.code == 200) {
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function cancelOrdersApply(record: GoodsOrder) {
            api.cancelOrdersApply({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    message.info('申请已提交至卖家，等待卖家通过；若超出14天，请致电客服！')
                    state.goodsOrders[state.goodsOrders.lastIndexOf(record)].status = 3
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns1 = [
            { title: '卖家用户名', dataIndex: 'goodsUserName', key: 'goodsUserName', },
            { title: '卖家手机', dataIndex: 'goodsUserPhone', key: 'goodsUserPhone', },
            { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', },
            { title: '订单开始时间', dataIndex: 'createTime', key: 'createTime', },
            { title: '订单状态', dataIndex: 'status', key: 'status', },
            { title: '订单完成时间', dataIndex: 'completeTime', key: 'completeTime', },
            { title: '卖家评分（五分制）', dataIndex: 'goodsUserScore', key: 'goodsUserScore', },
            { title: '卖家评价', dataIndex: 'goodsUserEvaluation', key: 'goodsUserEvaluation', },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        const columns2 = [
            { title: '买家用户名', dataIndex: 'userName', key: 'userName', },
            { title: '买家手机', dataIndex: 'userPhone', key: 'userPhone', },
            { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', },
            { title: '订单开始时间', dataIndex: 'createTime', key: 'createTime', },
            { title: '订单状态', dataIndex: 'status', key: 'status', },
            { title: '订单完成时间', dataIndex: 'completeTime', key: 'completeTime', },
            { title: '买家评分（五星制）', dataIndex: 'userScore', key: 'userScore', },
            { title: '买家评价', dataIndex: 'userEvaluation', key: 'userEvaluation', },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns1,
            columns2,
            cancelOrders,
            completeOrders,
            commentGoodsUser,
            commentUser,
            cancelOrdersApply,
            visible,
            visible1,
            showModal,
            showModal1
        };
    },
});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>