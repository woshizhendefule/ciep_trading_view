<template>
    <div style="background-color: #eae8eb; width: 100%;">
        <div style="height: 30px; width: 100%;"></div>
        <div style="text-align: center;margin-bottom: 30px;">
            <img src="../../assets/logoForCiepTrading.png" style="margin-right: 50px;cursor: pointer;"
                @click="toHomeView">
            <input type="text" class="input_sousuo" v-model="state.searchName" placeholder="请输入关键字"
                style="border-radius: 18px;height: 42px; width: 528px; border: 2px solid #fd0338;padding-left: 15px; ">
            <button class="button_sousuo" @click="searchGoods">搜索</button>
        </div>
        <div
            style="background-color: #ffffff; width: 1194px; margin: auto; border-radius: 18px; display: flex; flex-wrap: wrap;min-height: 74vh;">

            <div style="display: flex; width: 784px;flex-wrap: wrap;">
                <div class="div_goods_card" style="display: flex;cursor: pointer;"
                    v-for="goodsInfo in state.goodsInfos.slice(0, 4)" :key="goodsInfo.id"
                    @click="toGoodsView(goodsInfo.id)">
                    <div>
                        <img class="img_goods_card" :src="state.url + '/' + goodsInfo.picture">
                    </div>
                    <div style="margin: 18px;position: relative;">
                        <div
                            style="font-size: 18px;font-weight: 600;overflow: hidden;max-height: 56px;margin: 4px 0 2px 0;">
                            {{
        goodsInfo.name
}}</div>
                        <div style="font-size: 14px;font-weight: 300;position: absolute;bottom: 0;">{{
        goodsInfo.userName
}}</div>
                    </div>
                </div>
            </div>

            <div style="width: 374px; height: 366px; margin-left: auto; border-radius: 12px; margin: 18px 0 0 18px;">
                <div style="text-align: center;height: 198px;padding-top: 27.5%;">欢迎使用校园闲置电子产品交易平台！</div><br>

                <div style="text-align: center;">
                    <div v-if="state.userInfo?.name == undefined">
                        <button class="text_user_caozuo" @click="toUserLogin">登录</button>
                        <button class="text_user_caozuo" style="margin-left: 18px;"
                            @click="toUserRegistered">注册</button>
                    </div>
                    <div v-else>
                        <text>Hi！</text>
                        <text style="text-decoration: underline; cursor: pointer;" @click="toUserRegistered">
                            {{ state.userInfo?.name }}
                        </text>
                    </div>

                </div><br>

                <div style=" text-align: center; display: flex;margin-top: 5px;">
                    <div style="margin-left: 65px;">
                        <star-outlined style="cursor: pointer;" /><br>
                        <text class="text_user_caozuo_more" style="cursor: pointer;">宝贝收藏</text>
                    </div>
                    <div style="margin-left: 39px;">
                        <unordered-list-outlined style="cursor: pointer;" /><br>
                        <text class="text_user_caozuo_more" style="cursor: pointer;">我的订单</text>
                    </div>
                    <div style="margin-left: 39px;">
                        <appstore-outlined style="cursor: pointer;" /><br>
                        <text class="text_user_caozuo_more" style="cursor: pointer;">商品管理</text>
                    </div>
                </div>
            </div>

            <div style="display: flex; width: 1194px;flex-wrap: wrap;">
                <div class="div_goods_card" style="display: flex;cursor: pointer;"
                    v-for="goodsInfo in state.goodsInfos.slice(4)" :key="goodsInfo.id"
                    @click="toGoodsView(goodsInfo.id)">
                    <div>
                        <img class="img_goods_card" :src="state.url + '/' + goodsInfo.picture">·
                    </div>
                    <div style="margin: 18px;position: relative;">
                        <div
                            style="font-size: 18px;font-weight: 600;overflow: hidden;max-height: 56px;margin: 4px 0 2px 0;">
                            {{
        goodsInfo.name
}}</div>
                        <div style="font-size: 14px;font-weight: 300;position: absolute;bottom: 0;">{{
        goodsInfo.userName
}}</div>
                    </div>
                </div>
            </div>
            <div style="height: 18px; width: 100%;"></div>
        </div>
        <div style="height: 60px; width: 100%;"></div>
        <div style="height: 30px; width: 100%;bottom: 0; position: fixed; background-color: #fff; line-height: 30px;">
            <text style="margin-left: 10px;">联系客服：180-xxxx-8731</text>
            <b style="color: #ddd; margin: 0 7px;">|</b>
            <text style="text-decoration: underline;color: #888888; cursor: pointer;"
                @click="toAdminLogin">平台管理系统入口</text>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from "vue";
import { UnorderedListOutlined, AppstoreOutlined, StarOutlined } from '@ant-design/icons-vue';
import router from "@/router";
import { GoodsInfo, UserInfo } from "@/interface";
import api from "../../api/api";
import { message } from "ant-design-vue";

interface state {
    goodsInfos: GoodsInfo[]
    url: string,
    searchName: string,
    userInfo: UserInfo | undefined
}

export default defineComponent({
    name: "homeView",

    components: {
        StarOutlined,
        UnorderedListOutlined,
        AppstoreOutlined
    },

    setup() {
        const state = reactive<state>({
            goodsInfos: [],
            url: process.env.VUE_APP_AXIOS_BASEURL,
            searchName: '',
            userInfo: undefined
        });

        onBeforeMount(() => {
            api.getAllGoodsOrderByDesc().then((res: any) => {
                if (res.code == 200) {
                    state.goodsInfos = res.data
                } else {
                    message.error(res.description)
                }
            })
            if (localStorage.getItem('token') != null) {
                api.toViewUserInfo().then((res: any) => {
                    if (res.code == 200) {
                        state.userInfo = res.data
                    } else {
                        message.error(res.description)
                    }
                })
            }
        })

        function searchGoods() {
            api.searchGoods({
                name: state.searchName
            }).then((res: any) => {
                if (res.code == 200) {
                    router.push({
                        path: 'searchView',
                        query: {
                            name: state.searchName
                        }
                    })
                } else {
                    message.error(res.description)
                }
            })
        }

        function toGoodsView(goodsInfoId: number) {
            router.push({
                path: 'goodsView',
                query: {
                    id: goodsInfoId
                }
            })
        }

        function toHomeView() {
            router.push({
                name: 'homeView'
            })
        }

        function toUserLogin() {
            router.push({
                name: 'userLogin'
            })
        }

        function toUserRegistered() {
            router.push({
                name: 'userRegistered'
            })
        }

        function toAdminLogin() {
            router.push({
                name: 'adminLogin'
            })
        }

        return {
            state,
            searchGoods,
            toGoodsView,
            toHomeView,
            toUserLogin,
            toUserRegistered,
            toAdminLogin
        };
    },
});
</script>

<style>
.input_sousuo:focus-visible {
    outline: none;
}

.text_user_caozuo {
    border-radius: 20px;
    height: 42px;
    width: 80px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    border: solid #fd0338;
    background-color: #fd0338;
    color: #fff;
}

.text_user_caozuo_more {
    font-size: 14px;
    font-weight: 500;
}

.div_goods_card {
    width: 374px;
    height: 174px;
    border: 1px solid #f7f9fa;
    background-color: #f7f9fa;
    margin: 18px 0 0 18px;
    border-radius: 12px;
}

.div_goods_card:hover {
    border: 1px solid #fd0338;
}

.img_goods_card {
    width: 138px;
    height: 138px;
    margin: 18px 0 0 18px;
    object-fit: cover;
    border-radius: 12px;
}

.button_sousuo {
    margin-left: 10px;
    border-radius: 18px;
    height: 42px;
    width: 80px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    border: solid #fd0338;
    background-color: #fd0338;
    color: #fff;
}
</style>