<template>
    <a-descriptions title="个人信息" bordered>
        <a-descriptions-item label="用户名" :span="3">{{ state.userInfo?.name }}</a-descriptions-item>
        <a-descriptions-item label="学号" :span="2">{{ state.userInfo?.studentId }}</a-descriptions-item>
        <a-descriptions-item label="手机" :span="2">{{ state.userInfo?.phone }}</a-descriptions-item>
        <a-descriptions-item label="卖家评分" :span="2">
            <div v-if="state.userInfo?.goodsUserScore != null">{{ state.userInfo?.goodsUserScore }}</div>
            <div v-else style="color: #00000050;">暂无卖家评分</div>
        </a-descriptions-item>
        <a-descriptions-item label="买家评分" :span="2">
            <div v-if="state.userInfo?.userScore != null">{{ state.userInfo?.userScore }}</div>
            <div v-else style="color: #00000050;">暂无买家评分</div>
        </a-descriptions-item>
        <a-descriptions-item label="用户类型" :span="3">
            <div v-if="state.userInfo?.isSeller == 0">买家</div>
            <div v-if="state.userInfo?.isSeller == 1">卖家</div>
            <div v-if="state.userInfo?.isSeller == 2">待审核</div>
        </a-descriptions-item>
    </a-descriptions>
    <div style="position: relative; left: 933px;display: flex;">
        <a-button type="primary" @click="showModal" style="margin: 18px 18px 0 0;">修改用户名</a-button>
        <a-modal v-model:visible="visible" title="修改用户名" @ok="modifyUserName">
            <a-input v-model:value="state.inputNewName" :bordered="false" :placeholder="state.userInfo?.name" />
        </a-modal>

        <a-button type="primary" @click="showModal1" style="margin: 18px 18px 0 0;">修改手机</a-button>
        <a-modal v-model:visible="visible1" title="修改手机" @ok="modifyUserPhone">
            <a-input v-model:value="state.inputNewPhone" :bordered="false" :placeholder="state.userInfo?.phone" />
        </a-modal>

        <a-button type="primary" @click="showModal2" style="margin: 18px 18px 0 0;">修改密码</a-button>
        <a-modal v-model:visible="visible2" title="修改密码" @ok="changePassword">
            <a-input v-model:value="state.inputNewPassword" :bordered="false" placeholder="请输入新的密码" />
        </a-modal>

        <div style="margin-top: 18px;">
            <div v-if="state.userInfo?.isSeller != 0">
                <a-button disabled type="primary" @click="sellerQualificationApply">卖家资质申请</a-button>
            </div>
            <div v-else>
                <a-button type="primary" @click="sellerQualificationApply">卖家资质申请</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount } from "vue";
import api from "../api/api";
import { UserInfo, GoodsOrder } from "@/interface";
import { message } from "ant-design-vue";
import router from "@/router";

interface state {
    userInfo: UserInfo | undefined,
    inputNewPhone: string
    inputNewName: string,
    inputNewPassword: string,
    goodsOrders: GoodsOrder[]
}

export default defineComponent({
    name: "userManage",

    setup() {
        const state = reactive<state>({
            userInfo: undefined,
            inputNewPhone: '',
            inputNewName: '',
            inputNewPassword: '',
            goodsOrders: []
        });

        const visible = ref<boolean>(
            false
        );

        const visible1 = ref<boolean>(
            false
        );

        const visible2 = ref<boolean>(
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

        const showModal2 = () => {
            visible2.value = true;
        };

        function modifyUserName() {
            api.modifyUserName({
                newName: state.inputNewName
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('修改成功！')
                    visible.value = false;
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function modifyUserPhone() {
            api.modifyUserPhone({
                newPhone: state.inputNewPhone
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('修改成功！')
                    visible1.value = false;
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function changePassword() {
            api.changePassword({
                newPassword: state.inputNewPassword
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('修改成功，请登录！')
                    visible2.value = false;
                    localStorage.setItem('token', '')
                    toHomeView()
                } else {
                    message.error(res.description)
                }
            })
        }

        function toHomeView() {
            router.push({
                name: 'homeView'
            })
        }

        function sellerQualificationApply() {
            if (state.goodsOrders.length == 0 || state.goodsOrders[0].userScore == -1 || state.goodsOrders[0].userEvaluation == '') {
                message.error('请在交易后，提交卖家资质申请！')
                return
            }
            api.sellerQualificationApply().then((res: any) => {
                if (res.code == 200) {
                    message.success('申请成功！')
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        return {
            state,
            visible,
            visible1,
            visible2,
            showModal,
            showModal1,
            showModal2,
            modifyUserName,
            modifyUserPhone,
            changePassword,
            sellerQualificationApply
        };
    },
});
</script>

<style scoped>

</style>