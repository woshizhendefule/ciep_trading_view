<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.messages"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button danger style="margin-right: 10px;" @click="deleteMessage(record)">删除留言</a-button>
            </template>
            <template v-if="column.dataIndex == 'fatherMessageName'">
                <div v-if="record.fatherMessageName != null"> {{ record.fatherMessageName }}</div>
                <div v-else style="color: #00000050;">此留言为父留言</div>
            </template>
            <template v-if="column.dataIndex == 'atUserName'">
                <div v-if="record.atUserName != null"> {{ record.atUserName }}</div>
                <div v-else style="color: #00000050;">此留言未@留言</div>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { Message } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount } from "vue";
import { message } from "ant-design-vue";

interface state {
    messages: Message[]
}

export default defineComponent({
    name: "App",

    setup() {

        const state = reactive<state>({
            messages: []
        });

        onBeforeMount(() => {
            api.getParentChildMessagesUser().then((res: any) => {
                if (res.code == 200) {
                    state.messages = res.data
                    state.messages.forEach((message: Message) => {
                        message.createTime = message.createTime.split('T')[0] + ' ' + message.createTime.split('T')[1].split('.')[0]
                    })
                } else {
                    message.error(res.description)
                }
            })
        })

        function deleteMessage(record: Message) {
            api.deleteMessage({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns = [
            { title: '用户名', dataIndex: 'userName', key: 'userName', },
            { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName', },
            { title: '留言内容', dataIndex: 'details', key: 'details', },
            { title: '留言时间', dataIndex: 'createTime', key: 'createTime', },
            { title: '父留言用户名', dataIndex: 'fatherMessageName', key: 'fatherMessageName', },
            { title: 'at留言用户名', dataIndex: 'atUserName', key: 'atUserName', },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            deleteMessage
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>