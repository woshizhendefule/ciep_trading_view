<template>
    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.users"
        :row-class-name="(_record: any, index: any) => (index % 2 === 1 ? 'table-striped' : null)" bordered>
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'isSeller'">
                <div v-if="record.isSeller == 0">买家</div>
                <div v-if="record.isSeller == 1">卖家</div>
                <div v-if="record.isSeller == 2">待审核</div>
            </template>
            <template v-if="column.dataIndex == 'goodsUserScore'">
                <div v-if="record.goodsUserScore != -1"> {{ record.goodsUserScore }}</div>
                <div v-else style="color: #00000050;">暂无评分</div>
            </template>
            <template v-if="column.dataIndex == 'userScore'">
                <div v-if="record.userScore != -1"> {{ record.userScore }}</div>
                <div v-else style="color: #00000050;">暂无评分</div>
            </template>
            <template v-if="column.dataIndex == 'caozuo'">
                <a-button type="primary" style="margin-right: 10px;" :disabled="!(record.isSeller == 2)"
                    @click="sellerQualificationCheckPass(record)">审核通过</a-button>
                <a-button style="margin-right: 10px;" :disabled="!(record.isSeller == 2)"
                    @click="sellerQualificationCheckNotPass(record)">审核未通过</a-button>
                <a-button danger style="margin-right: 10px;" @click="deleteUser(record)">删除用户</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { User } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount } from "vue";
import { message } from "ant-design-vue";

interface state {
    users: User[]
}

export default defineComponent({
    name: "App",

    setup() {

        const state = reactive<state>({
            users: []
        });

        onBeforeMount(() => {
            api.getAllUser().then((res: any) => {
                if (res.code == 200) {
                    state.users = res.data
                } else {
                    message.error(res.description)
                }
            })
        })

        function sellerQualificationCheckPass(record: User) {
            api.sellerQualificationCheckPass({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.users[state.users.lastIndexOf(record)].isSeller = 1
                    // let id = record.id
                    // state.users.forEach((user: User) => {
                    //     if (id == user.id) {
                    //         user.isSeller = 1
                    //     }
                    // });
                } else {
                    message.error(res.description)
                }
            })
        }

        function sellerQualificationCheckNotPass(record: User) {
            api.sellerQualificationCheckNotPass({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.users[state.users.lastIndexOf(record)].isSeller = 0
                } else {
                    message.error(res.description)
                }
            })
        }

        function deleteUser(record: User) {
            api.deleteUser({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    delete state.users[state.users.lastIndexOf(record)]
                } else {
                    message.error(res.description)
                }
            })
        }

        const columns = [
            { title: '用户名', dataIndex: 'name', key: 'name', },
            { title: '学号', dataIndex: 'studentId', key: 'studentId', },
            { title: '手机', dataIndex: 'phone', key: 'phone', },
            { title: '用户类型', dataIndex: 'isSeller', key: 'isSeller', },
            { title: '卖家评分', dataIndex: 'goodsUserScore', key: 'goodsUserScore', },
            { title: '买家评分', dataIndex: 'userScore', key: 'userScore', },
            { title: '操作（根据评分审核用户类型）', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            sellerQualificationCheckPass,
            sellerQualificationCheckNotPass,
            deleteUser
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>