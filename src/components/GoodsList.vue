<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.goodss"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'isRelease'">
                <div v-if="record.isRelease == 0">已发布</div>
                <div v-if="record.isRelease == 1">未发布</div>
                <div v-if="record.isRelease == 2">待审核</div>
                <div v-if="record.isRelease == 3">订单中 / 已交付</div>
            </template>
            <template v-if="column.dataIndex == 'picture'">
                <a-image :width="150" :src="state.url + '/' + record.picture" v-if="record.picture != null" />
                <div v-else style="color: #00000050;">暂无图片</div>
            </template>
            <template v-if="column.dataIndex == 'credential'">
                <a-image :width="150" :src="state.url + '/' + record.credential" v-if="record.credential != null" />
                <div v-else style="color: #00000050;">暂无凭证</div>
            </template>
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button type="primary" style="margin-right: 10px;" :disabled="!(record.isRelease == 2)"
                    @click="releaseQualificationCheckPass(record)">审核通过</a-button>
                <a-button style="margin-right: 10px;" :disabled="!(record.isRelease == 2)"
                    @click="releaseQualificationCheckNotPass(record)">审核未通过</a-button>
                <a-button danger style="margin-right: 10px;" @click="deleteGoods(record)"
                    :disabled="record.isRelease == 3">删除商品</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { Goods } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount } from "vue";
import { message } from "ant-design-vue";

interface state {
    goodss: Goods[]
    url: string
}

export default defineComponent({
    name: "App",

    setup() {

        const state = reactive<state>({
            goodss: [],
            url: process.env.VUE_APP_AXIOS_BASEURL
        });

        onBeforeMount(() => {
            api.getAllGoodsOrderByAsc().then((res: any) => {
                if (res.code == 200) {
                    state.goodss = res.data
                    state.goodss.forEach((goods: Goods) => {
                        goods.releaseTime = goods.releaseTime.split('T')[0] + ' ' + goods.releaseTime.split('T')[1].split('.')[0]
                    })
                } else {
                    message.error(res.description)
                }
            })
        })

        function releaseQualificationCheckPass(record: Goods) {
            api.releaseQualificationCheckPass({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.goodss[state.goodss.lastIndexOf(record)].isRelease = 0
                } else {
                    message.error(res.description)
                }
            })
        }

        function releaseQualificationCheckNotPass(record: Goods) {
            api.releaseQualificationCheckNotPass({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.goodss[state.goodss.lastIndexOf(record)].isRelease = 1
                } else {
                    message.error(res.description)
                }
            })
        }

        function deleteGoods(record: Goods) {
            api.deleteGoods({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    delete state.goodss[state.goodss.lastIndexOf(record)]
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns = [
            { title: '用户名', dataIndex: 'userName', key: 'userName', },
            { title: '商品名称', dataIndex: 'name', key: 'name', },
            { title: '商品介绍', dataIndex: 'introduce', key: 'introduce', },
            { title: '商品图片', dataIndex: 'picture', key: 'picture', },
            { title: '商品凭证', dataIndex: 'credential', key: 'credential', },
            { title: '商品价格', dataIndex: 'price', key: 'price', },
            { title: '发布时间', dataIndex: 'releaseTime', key: 'releaseTime', },
            { title: '商品状态', dataIndex: 'isRelease', key: 'isRelease', },
            { title: '操作（根据商品凭证审核商品状态）', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            releaseQualificationCheckPass,
            releaseQualificationCheckNotPass,
            deleteGoods
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>