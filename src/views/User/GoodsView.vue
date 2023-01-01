<template>
    <div style="background-color: #eae8eb; width: 100%;">
        <div style="height: 30px; width: 100%;"></div>
        <div style="text-align: center;margin-bottom: 30px;">
            <img src="../../assets/logoForCiepTrading.png"
                style="cursor: pointer;position: absolute; top: 30px;left: 460px;" @click="toHomeView">
        </div>
        <div class="div_main_imgAndUserName">
            <div style="height: 577px;">
                <img class="img_goods_picture" :src="state.url + '/' + state.goodsInfo?.picture"><br>


                <div>
                    <div v-if="state.goodsInfo?.credential != null">
                        <a-button style="margin: 18px 0 0 18px;" type="primary"
                            @click="() => setVisible(true)">此商品凭证</a-button>
                        <a-image :width="200" :style="{ display: 'none' }"
                            :preview="{ visible, onVisibleChange: setVisible }"
                            :src="state.url + '/' + state.goodsInfo?.credential" />
                    </div>
                    <div v-else
                        style="margin: 18px 0 0 18px; font-size: 14px; font-weight: 400; height: 32px; color: #00000050;">
                        暂无凭证
                    </div>
                </div>

                <div class="div_main_userName">
                    {{ state.goodsInfo?.userName }}
                </div>
                <div style="font-size: 18px; font-weight: 300; position: relative; top: 105px;left: 18px;">
                    <div v-if="state.goodsInfo?.goodsUserScore != null">
                        卖家评分: {{ state.goodsInfo?.goodsUserScore }}
                    </div>
                    <div v-else>
                        卖家评分: 暂无评分
                    </div>

                </div>
            </div>
            <div>
                <div style="margin: 18px;height: 348px; width: 792px;">
                    <div style="font-size: 36px;font-weight: 600;overflow: hidden;margin: 4px 0 2px 0;">
                        {{ state.goodsInfo?.name }}
                    </div>
                    <div style="font-size: 18px;font-weight: 600;overflow: hidden;margin: 4px 0 2px 0;">
                        {{ state.goodsInfo?.introduce }}
                    </div>
                    <div class="div_main_price">
                        ￥{{ state.goodsInfo?.price }}
                    </div>
                </div>
                <div style="margin: 18px;height: 175px; width: 792px;display: flex;">
                    <div v-if="forEachFlag()">
                        <button class="button_yishoucang" @click="goodsCollection">
                            已收藏
                        </button>
                    </div>
                    <div v-else>
                        <button class="button_shoucang" @click="goodsCollection">
                            收&nbsp;&nbsp;藏
                        </button>
                    </div>

                    <button class="button_lijigoumai" @click="createOrders">
                        立即购买
                    </button>
                </div>
            </div>
            <div style="height: 18px; width: 100%;"></div>
        </div>
        <div class="div_lanyanqiuAndLiuyan">

            <div style="width: 348px;">
                <a-textarea v-model:value="state.messageInfoDetailsReply" placeholder="这里是留言区;-)"
                    :auto-size="{ minRows: 2, maxRows: 5 }" style="margin: 18px 0 0 18px; width: 366px;" />
                <button class="button_fabu" @click="postMessage(undefined, undefined)">发布</button>
            </div>

            <div>

                <div style="padding: 18px 0  0 18px; margin-left: 18px; width: 828px;"
                    v-for="messageInfo, index in state.messageInfos" :key="messageInfo.id">
                    <div style="font-size: 18px;font-weight: 300;margin-bottom: 5px;">
                        {{ messageInfo.userName }}
                    </div>
                    <div style="font-size: 18px;font-weight: 400; margin-left: 10px;">
                        {{ messageInfo.details }}
                    </div>
                    <div style="font-size: 14px;font-weight: 300; margin-left: 10px;display: inline;color: #a299ac;">
                        {{ messageInfo.createTime }}
                    </div>
                    <div class="div_messageInfos_huiFu" @click="replyMessage(index)">
                        回复
                    </div>
                    <div style="width: 348px;" v-if="state.replyMessageIndex[index] != undefined">
                        <a-textarea v-model:value="state.messageInfoDetailsReplyFather"
                            :placeholder="`回复 ${messageInfo.userName} : &nbsp;`" :auto-size="{ minRows: 2, maxRows: 5 }"
                            style="margin: 18px 0 0 18px; width: 366px;" />
                        <button class="button_fabu" @click="postMessageFather(messageInfo.id, undefined)">发布</button>
                    </div>
                    <div class="div_dianJiChaKanHuiFu"
                        @click="getChildMessagesUser(state.goodsInfo?.id, messageInfo.id, index)">
                        点击查看回复
                    </div>
                    <div style="margin-left: 18px;" v-for="childMessageInfo, index2 in state.childMessageInfos[index]"
                        :key="childMessageInfo.id">
                        <div style="font-size: 18px;font-weight: 300;margin-bottom: 5px;margin-left: 10px;">
                            {{ childMessageInfo.userName }}
                        </div>
                        <div v-if="childMessageInfo.atUserId == null"
                            style="font-size: 18px;font-weight: 400; margin-left: 20px;">
                            {{ childMessageInfo.details }}
                        </div>
                        <div v-if="childMessageInfo.atUserId != null"
                            style="font-size: 18px;font-weight: 500; margin-left: 20px;">
                            <div style="display: inline;font-size: 18px;font-weight: 300;">
                                回复 {{ childMessageInfo.atUserName }} : &nbsp;
                            </div>
                            <div style="display: inline;font-size: 18px;font-weight: 400;">
                                {{ childMessageInfo.details }}
                            </div>
                        </div>
                        <div
                            style="font-size: 14px;font-weight: 300; margin-left: 20px;display: inline;color: #a299ac;">
                            {{ childMessageInfo.createTime }}
                        </div>
                        <div class="div_childMessInfos_huiFu" @click="replyChildMessage(index, index2)">
                            回复
                        </div>
                        <div style="width: 348px;"
                            v-if="state.replyChildMessageIndex[index] != undefined ? state.replyChildMessageIndex[index][index2] != undefined : false">

                            <a-textarea v-model:value="state.messageInfoDetailsReplyChild"
                                :placeholder="`回复 ${childMessageInfo.userName} : &nbsp;`"
                                :auto-size="{ minRows: 2, maxRows: 5 }" style="margin: 18px 0 0 18px; width: 366px;" />
                            <button class="button_fabu"
                                @click="postMessageChild(childMessageInfo.fatherMessageId, childMessageInfo.userId)">发布</button>
                        </div>
                    </div>

                </div>
            </div>
            <div style="height: 18px; width: 100%;"></div>
        </div>
        <div style="height: 60px; width: 100%;"></div>
        <div style="height: 30px; width: 100%;bottom: 0; position: fixed; background-color: #fff; line-height: 30px;">
            <text style="margin-left: 10px;">联系客服：180-xxxx-8731</text>
            <b style="color: #ddd; margin: 0 7px;">|</b>
            <text class="text_fixed_toAdminLogin" @click="toAdminLogin">平台管理系统入口</text>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, ref } from "vue";
import router from "@/router";
import { CollectionInfo, GoodsInfo, MessageInfo, UserInfo } from "@/interface";
import api from "../../api/api";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";

interface state {
    goodsInfo: GoodsInfo | undefined,
    url: string,
    userInfo: UserInfo | undefined,
    messageInfos: MessageInfo[],
    childMessageInfos: any[],
    messageInfoDetailsReply: string | null,
    messageInfoDetailsReplyFather: string | null,
    messageInfoDetailsReplyChild: string | null,
    replyMessageIndex: any[],
    replyChildMessageIndex: any[],
    usersCollections: CollectionInfo[]
}

export default defineComponent({
    name: "goodsView",

    setup() {
        const state = reactive<state>({
            goodsInfo: undefined,
            url: process.env.VUE_APP_AXIOS_BASEURL,
            userInfo: undefined,
            messageInfos: [],
            childMessageInfos: [],
            messageInfoDetailsReply: '',
            messageInfoDetailsReplyFather: '',
            messageInfoDetailsReplyChild: '',
            replyMessageIndex: [],
            replyChildMessageIndex: [],
            usersCollections: []
        });

        const visible = ref<boolean>(
            false
        );

        const route = useRoute();

        onBeforeMount(() => {
            if (localStorage.getItem('token') != '' && localStorage.getItem('token') != undefined) {
                api.toViewUserInfo().then((res: any) => {
                    if (res.code == 200) {
                        state.userInfo = res.data
                    } else {
                        message.error(res.description)
                    }
                })
            }
            api.toViewGoods({
                id: route.query.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.goodsInfo = res.data
                } else {
                    message.error(res.description)
                }
            })
            api.getParentMessagesUser({
                goodsId: route.query.id
            }).then((res: any) => {
                if (res.code == 200) {
                    state.messageInfos = res.data
                    state.messageInfos!.forEach((messageInfo: MessageInfo) => {
                        if (messageInfo.createTime != null) {
                            messageInfo.createTime = messageInfo.createTime.split('T')[0] + ' ' + messageInfo.createTime.split('T')[1].split('.')[0]
                        }
                    })
                } else {
                    message.error(res.description)
                }
            })
            if (localStorage.getItem('token') != '' && localStorage.getItem('token') != undefined) {
                api.getUsersCollection().then((res: any) => {
                    if (res.code == 200) {
                        state.usersCollections = res.data
                    } else {
                        message.error(res.description)
                    }
                })
            }
        })

        function toHomeView() {
            router.push({
                name: 'homeView'
            })
        }

        function getChildMessagesUser(goodsId: number | undefined, fatherMessageId: number, index: any) {
            api.getChildMessagesUser({
                goodsId: goodsId,
                fatherMessageId: fatherMessageId
            }).then((res: any) => {
                if (res.code == 200) {
                    if (res.data.length > 0) {
                        state.childMessageInfos[index] = res.data
                        state.childMessageInfos[index]!.forEach((messageInfo: MessageInfo) => {
                            if (messageInfo.createTime != null) {
                                messageInfo.createTime = messageInfo.createTime.split('T')[0] + ' ' + messageInfo.createTime.split('T')[1].split('.')[0]
                            }
                        })
                    } else {
                        message.info('暂无留言')
                    }

                } else {
                    message.error(res.description)
                }
            })
        }

        function postMessage(fatherMessageId: number | undefined, atUserId: number | undefined) {
            api.postMessage({
                userId: state.userInfo?.id,
                goodsId: state.goodsInfo?.id,
                details: state.messageInfoDetailsReply,
                fatherMessageId: fatherMessageId,
                atUserId: atUserId
            }).then((res: any) => {
                if (res.code == 200) {
                    state.messageInfos = res.data
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function postMessageFather(fatherMessageId: number | undefined, atUserId: number | undefined) {
            api.postMessage({
                userId: state.userInfo?.id,
                goodsId: state.goodsInfo?.id,
                details: state.messageInfoDetailsReplyFather,
                fatherMessageId: fatherMessageId,
                atUserId: atUserId
            }).then((res: any) => {
                if (res.code == 200) {
                    state.messageInfos = res.data
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function postMessageChild(fatherMessageId: number | undefined, atUserId: number | undefined) {
            api.postMessage({
                userId: state.userInfo?.id,
                goodsId: state.goodsInfo?.id,
                details: state.messageInfoDetailsReplyChild,
                fatherMessageId: fatherMessageId,
                atUserId: atUserId
            }).then((res: any) => {
                if (res.code == 200) {
                    state.messageInfos = res.data
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        const setVisible = (value: any): void => {
            visible.value = value;
        };

        function toAdminLogin() {
            router.push({
                name: 'adminLogin'
            })
        }

        function replyMessage(index: any) {
            state.replyMessageIndex[index] = true
        }

        function replyChildMessage(index: any, index2: any) {
            state.replyChildMessageIndex[index] = []
            state.replyChildMessageIndex[index][index2] = true
        }

        function goodsCollection() {
            api.goodsCollection({
                goodsId: state.goodsInfo?.id
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('收藏成功！')
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function createOrders() {
            api.createOrders({
                goodsId: state.goodsInfo?.id
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('成功创建订单！')
                    router.push({
                        name: 'goodsOrderManage'
                    })
                } else {
                    message.error(res.description)
                }
            })
        }

        function forEachFlag() {
            let flag = false
            state.usersCollections.forEach((collectionInfo: CollectionInfo) => {
                if (collectionInfo.goodsId == state.goodsInfo?.id) {
                    flag = true
                }
            })
            return flag
        }

        return {
            state,
            toHomeView,
            getChildMessagesUser,
            postMessage,
            postMessageFather,
            postMessageChild,
            visible,
            setVisible,
            toAdminLogin,
            replyMessage,
            replyChildMessage,
            goodsCollection,
            createOrders,
            forEachFlag
        };
    },
});
</script>

<style>
.img_goods_picture {
    width: 348px;
    height: 348px;
    margin: 18px 0 0 18px;
    object-fit: cover;
    border-radius: 12px;
}

.div_main_imgAndUserName {
    background-color: #ffffff;
    width: 1194px;
    margin: auto;
    border-radius: 18px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 104px;
}

.div_main_userName {
    font-size: 18px;
    font-weight: 300;
    position: relative;
    top: 98px;
    left: 18px;
}

.text_fixed_toAdminLogin {
    text-decoration: underline;
    color: #888888;
    cursor: pointer;
}

.button_yishoucang {
    margin-right: 10px;
    border-radius: 21px;
    height: 42px;
    width: 84px;
    font-size: 18px;
    font-weight: 500;
    border: solid #eae8eb;
    background-color: #eae8eb;
    color: #fff;
    cursor: pointer;
    position: relative;
    top: 151px;
    left: 599px;
}

.button_shoucang {
    margin-right: 10px;
    border-radius: 21px;
    height: 42px;
    width: 84px;
    font-size: 18px;
    font-weight: 500;
    border: solid #fd0338;
    background-color: #fd0338;
    color: #fff;
    cursor: pointer;
    position: relative;
    top: 151px;
    left: 599px;
}

.button_lijigoumai {
    border-radius: 12px;
    border-radius: 21px;
    height: 42px;
    width: 98px;
    font-size: 18px;
    font-weight: 500;
    border: solid #fd0338;
    background-color: #fd0338;
    color: #fff;
    cursor: pointer;
    position: relative;
    top: 151px;
    left: 599px;
}

.div_lanyanqiuAndLiuyan {
    background-color: #ffffff;
    width: 1194px;
    margin: auto;
    border-radius: 18px;
    margin-top: 18px;
    display: flex;
    flex-wrap: wrap;
}

.div_main_price {
    font-size: 27px;
    font-weight: 600;
    color: #fd0338;
    overflow: hidden;
    margin: 4px 0 2px 0;
    position: absolute;
    top: 459px;
}

.div_dianJiChaKanHuiFu {
    font-size: 14px;
    font-weight: 300;
    margin-left: 10px;
    width: 84px;
    color: #a299ac;
    cursor: pointer;
}

.div_dianJiChaKanHuiFu:hover {
    color: #fd0338;
}

.div_messageInfos_huiFu {
    font-size: 14px;
    font-weight: 300;
    margin-left: 15px;
    display: inline;
    color: #a299ac;
    cursor: pointer;
}

.div_messageInfos_huiFu:hover {
    color: #fd0338;
}

.div_childMessInfos_huiFu {
    font-size: 14px;
    font-weight: 300;
    margin-left: 15px;
    display: inline;
    color: #a299ac;
    cursor: pointer;
}

.div_childMessInfos_huiFu:hover {
    color: #fd0338;
}

.button_fabu {
    margin: 18px 0 0 18px;
    border-radius: 17px;
    border: solid #fd0338;
    background-color: #fd0338;
    color: #fff;
    cursor: pointer;
    position: relative;
    left: 282px;
    margin-bottom: 18px;
    width: 66px;
    height: 33px;
}
</style>