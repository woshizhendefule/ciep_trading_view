<template>
    <a-layout style="height: 100%;">
        <a-layout-header class="header">
            <span style="display: flex;">
                <h1 style="color: #fff;width: 350px;">校园闲置电子产品交易平台管理系统</h1>
                <div style="flex: auto; text-align: right;">
                    <button @click="toLogin" style="background-color: #001529; color: #fff;;">注销</button>
                </div>
            </span>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu :style="{ height: '100%', borderRight: 0, padding: '5px 10px' }">
                    <a-menu-item key="1" @click="toUserList">
                        <span>
                            <user-outlined />
                            用户管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="2" @click="toGoodsList">
                        <span>
                            <appstore-outlined />
                            商品管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="3" @click="toMessageList">
                        <span>
                            <comment-outlined />
                            留言管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="4" @click="toEvaluationList">
                        <span>
                            <like-outlined />
                            评价管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="5" @click="toGoodsOrderList">
                        <span>
                            <gift-outlined />
                            订单管理
                        </span>
                    </a-menu-item>

                </a-menu>
            </a-layout-sider>
            <a-layout style="padding: 24px 24px 24px">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <RouterView />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserOutlined, AppstoreOutlined, CommentOutlined, LikeOutlined, GiftOutlined } from '@ant-design/icons-vue';
import router from "@/router";
// interface state {

// }
export default defineComponent({
    name: "Adminview",

    components: {
        UserOutlined,
        AppstoreOutlined,
        CommentOutlined,
        LikeOutlined,
        GiftOutlined
    },

    setup() {
        // const state = reactive<state>({});


        function toLogin() {
            router.push({
                name: 'login'
            })
            localStorage.setItem('token', '')
        }

        function toUserList() {
            router.push({
                name: 'userList'
            })
        }

        function toGoodsList() {
            router.push({
                name: 'goodsList'
            })
        }

        function toMessageList() {
            router.push({
                name: 'messageList'
            })
        }

        function toEvaluationList() {
            router.push({
                name: 'evaluationList'
            })
        }

        function toGoodsOrderList() {
            router.push({
                name: 'goodsOrderList'
            })
        }

        return {
            toLogin,
            toUserList,
            toGoodsList,
            toMessageList,
            toEvaluationList,
            toGoodsOrderList
        };
    },
});
</script>

<style scoped>

</style>
  