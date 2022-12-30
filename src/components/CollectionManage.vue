<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.collectionInfos"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button danger @click="deleteCollection(record)">删除收藏</a-button>
            </template>

            <template v-if="column.dataIndex == 'goodsName'">
                <text danger style="cursor: pointer;" @click="toGoodsView(record.goodsId)">
                    {{ record.goodsName }}
                </text>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount } from "vue";
import { message } from "ant-design-vue";
import { CollectionInfo } from "@/interface";
import router from "@/router";

interface state {
    collectionInfos: CollectionInfo[]
}

export default defineComponent({
    name: "collectionManage",

    setup() {

        const state = reactive<state>({
            collectionInfos: []
        });

        onBeforeMount(() => {
            api.getUsersCollection().then((res: any) => {
                if (res.code == 200) {
                    state.collectionInfos = res.data
                } else {
                    message.error(res.description)
                }
            })
        })

        function deleteCollection(record: CollectionInfo) {
            api.deleteCollection({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    delete state.collectionInfos[state.collectionInfos.lastIndexOf(record)]
                } else {
                    message.error(res.description)
                }
            })
        }


        function toGoodsView(goodsInfoId: number) {
            router.push({
                path: '../goodsView',
                query: {
                    id: goodsInfoId
                }
            })
        }

        const columns = [
            { title: '商品名称（可点击查看商品详情）', dataIndex: 'goodsName', key: 'goodsName', width: '300px' },
            { title: '商品介绍', dataIndex: 'goodsIntroduce', key: 'goodsIntroduce', },
            { title: '商品价格', dataIndex: 'goodsPrice', key: 'goodsPrice', width: '300px' },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            toGoodsView,
            deleteCollection
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>