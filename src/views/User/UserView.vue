<template>
    <a-layout style="height: 100%;">
        <a-layout-header class="header" style="background-color: #fd0338;">
            <span style="display: flex;">
                <h1 style="color: #fff;width: 378px;">校园闲置电子产品交易平台个人管理中心</h1>
                <div style="flex: auto; text-align: right;">
                    <button @click="toHomeViewAndClearToken"
                        style="background-color: #001529; color: #fff;background-color: #fd0338;border: #fd0338;">退出登录</button>
                    <button @click="toHomeView"
                        style="background-color: #001529; color: #fff;background-color: #fd0338;border: #fd0338;">返回首页</button>
                </div>
            </span>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu :style="{ height: '100%', borderRight: 0, padding: '5px 10px' }">
                    <a-menu-item key="1" @click="toUserManage">
                        <span>
                            <user-outlined />
                            用户管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="2" @click="toCollectionManage">
                        <span>
                            <star-outlined />
                            收藏管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="3" @click="toGoodsOrderManage">
                        <span>
                            <unordered-list-outlined />
                            订单管理
                        </span>
                    </a-menu-item>

                    <a-menu-item key="4" @click="toGoodsManage">
                        <span>
                            <appstore-outlined />
                            商品管理
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
import { UserOutlined, AppstoreOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons-vue';
import router from "@/router";

// interface state {

// }

export default defineComponent({
    name: "userView",

    components: {
        UserOutlined,
        AppstoreOutlined,
        StarOutlined,
        UnorderedListOutlined
    },

    setup() {
        // const state = reactive<state>({});

        function toHomeView() {
            router.push({
                name: 'homeView'
            })
        }
        function toHomeViewAndClearToken() {
            router.push({
                name: 'homeView'
            })
            localStorage.setItem('token', '')
        }

        function toUserManage() {
            router.push({
                name: 'userManage'
            })
        }

        function toGoodsManage() {
            router.push({
                name: 'goodsManage'
            })
        }

        function toCollectionManage() {
            router.push({
                name: 'collectionManage'
            })
        }

        function toGoodsOrderManage() {
            router.push({
                name: 'goodsOrderManage'
            })
        }

        return {
            toHomeView,
            toHomeViewAndClearToken,
            toUserManage,
            toGoodsManage,
            toCollectionManage,
            toGoodsOrderManage
        };
    },
});
</script>

<style scoped>

</style>
  