<template>
    <a-button type="primary" @click="showModal1" style="position: relative; left: 1276px; bottom: 10px;">发布商品</a-button>
    <a-modal v-model:visible="visible1" title="发布商品" @ok="releaseGoods()">
        <a-input v-model:value="state.releaseGoodssName" :bordered="false" placeholder="请输入商品名称" /><br><br>
        <a-input v-model:value="state.releaseGoodssIntroduce" :bordered="false" placeholder="请输入商品介绍" /><br><br>
        <a-input v-model:value="state.releaseGoodssPrice" :bordered="false" placeholder="请输入商品价格" /><br><br>

        <a-upload name="file" :maxCount="1" :action="(file: any) => { state.releaseGoodssPicture = file }">
            <a-button>
                <upload-outlined />
                点击上传商品图片（尽量为正方形图片，便于展示）
            </a-button>
        </a-upload>

        <a-upload name="file" :maxCount="1" :action="(file: any) => { state.releaseGoodssCredential = file }"><br>
            <a-button>
                <upload-outlined />
                点击上传商品凭证（注意个人隐私保护）
            </a-button>
        </a-upload>
    </a-modal>

    <a-table class="ant-table-striped" size="middle" :columns="columns" :data-source="state.usersGoodss"
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

                <a-button type="primary" @click="showModal(record.id)" style="margin-right: 10px;"
                    :disabled="record.isRelease == 3">修改商品</a-button>
                <a-modal v-model:visible="state.visible[record.id]" title="修改商品" @ok="modifyGoods(record)">

                    <a-input v-model:value="state.modifyGoodssName" :bordered="false"
                        :placeholder="findValue(record)?.name" /><br><br>

                    <a-input v-model:value="state.modifyGoodssIntroduce" :bordered="false"
                        :placeholder="findValue(record)?.introduce" /><br><br>

                    <a-input v-model:value="state.modifyGoodssPrice" :bordered="false"
                        :placeholder="findValue(record)?.price" /><br><br>

                    <a-upload name="file" :maxCount="1" :action="(file: any) => { state.modifyGoodssPicture = file }">
                        <a-button>
                            <upload-outlined />
                            点击上传修改的商品图片
                        </a-button>
                    </a-upload>

                    <a-upload name="file" :maxCount="1"
                        :action="(file: any) => { state.modifyGoodssCredential = file }"><br>
                        <a-button>
                            <upload-outlined />
                            点击上传修改的商品凭证
                        </a-button>
                    </a-upload>

                </a-modal>

                <a-button type="primary" style="margin-right: 10px;" @click="againReleaseGoods(record)"
                    :disabled="record.isRelease != 1">重新发布</a-button>

                <a-button danger style="margin-right: 10px;" @click="deleteGoods(record)"
                    :disabled="record.isRelease == 3">删除商品</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { Goods } from "@/interface";
import api from "../api/api"
import { defineComponent, reactive, onBeforeMount, ref } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from '@ant-design/icons-vue';

interface state {
    usersGoodss: Goods[]
    url: string,
    modifyGoodssName: string,
    modifyGoodssIntroduce: string,
    modifyGoodssPrice: any,
    modifyGoodssPicture: any,
    modifyGoodssCredential: any,

    releaseGoodssName: string,
    releaseGoodssIntroduce: string,
    releaseGoodssPrice: any,
    releaseGoodssPicture: any,
    releaseGoodssCredential: any

    visible: boolean[]
}

export default defineComponent({
    name: "goodsManage",

    components: {
        UploadOutlined,
    },

    setup() {

        const state = reactive<state>({
            usersGoodss: [],
            url: process.env.VUE_APP_AXIOS_BASEURL,
            modifyGoodssName: '',
            modifyGoodssIntroduce: '',
            modifyGoodssPrice: undefined,
            modifyGoodssPicture: undefined,
            modifyGoodssCredential: undefined,

            releaseGoodssName: '',
            releaseGoodssIntroduce: '',
            releaseGoodssPrice: undefined,
            releaseGoodssPicture: undefined,
            releaseGoodssCredential: undefined,
            visible: []
        });


        const visible1 = ref<boolean>(
            false
        );

        onBeforeMount(() => {
            api.getUsersGoods().then((res: any) => {
                if (res.code == 200) {
                    state.usersGoodss = res.data
                    state.usersGoodss.forEach((goods: Goods) => {
                        goods.releaseTime = goods.releaseTime.split('T')[0] + ' ' + goods.releaseTime.split('T')[1].split('.')[0]
                        state.visible[goods.id] = false
                    })
                } else {
                    message.error('您不是卖家，请在交易后，提交卖家资质申请！')
                }
            })
        })

        const showModal = (id: number) => {
            state.visible[id] = true;
        };

        const showModal1 = () => {
            visible1.value = true;
        };

        function modifyGoods(record: Goods) {
            if (record.credential == undefined && state.releaseGoodssPrice >= 800 && state.releaseGoodssCredential == undefined) {
                message.error('在金额超过800元时，需要您上传商品凭证！')
                return
            }
            let formData = new FormData();
            formData.append("id", record.id)
            formData.append("name", state.modifyGoodssName)
            formData.append("introduce", state.modifyGoodssIntroduce)
            formData.append("price", state.modifyGoodssPrice)
            formData.append("picture", state.modifyGoodssPicture)

            formData.append("credential", state.modifyGoodssCredential)
            api.modifyGoods({
                formData: formData
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('修改成功！')
                    window.location.reload()
                } else {
                    message.error('请您检查修改商品信息！')
                }
            })
        }

        function releaseGoods() {
            if (state.releaseGoodssPrice >= 800 && state.releaseGoodssCredential == undefined) {
                message.error('在金额超过800元时，需要您上传商品凭证！')
                return
            }
            let formData = new FormData();
            formData.append("name", state.releaseGoodssName)
            formData.append("introduce", state.releaseGoodssIntroduce)
            formData.append("price", state.releaseGoodssPrice)
            formData.append("picture", state.releaseGoodssPicture)
            formData.append("credential", state.releaseGoodssCredential)
            api.releaseGoods({
                formData: formData
            }).then((res: any) => {
                if (res.code == 200) {
                    message.success('发布成功！')
                    window.location.reload()
                } else {
                    message.error('请您检查发布商品信息！')
                }
            })
        }

        function deleteGoods(record: Goods) {
            api.deleteGoods({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    delete state.usersGoodss[state.usersGoodss.lastIndexOf(record)]
                } else {
                    message.error(res.description)
                }
            })
        }

        function againReleaseGoods(record: Goods) {
            if (record.credential == undefined && record.price >= 800) {
                message.error('在金额超过800元时，需要您上传商品凭证！')
                return
            }
            api.againReleaseGoods({
                id: record.id
            }).then((res: any) => {
                if (res.code == 200) {
                    window.location.reload()
                } else {
                    message.error(res.description)
                }
            })
        }

        function beforeUpload(file: any) {
            console.log(file);
        }

        function findValue(record: Goods) {
            console.log(record);
            return state.usersGoodss.find((value: Goods) => value.id == record.id)
        }

        const columns = [
            { title: '商品名称', dataIndex: 'name', key: 'name', },
            { title: '商品介绍', dataIndex: 'introduce', key: 'introduce', },
            { title: '商品图片', dataIndex: 'picture', key: 'picture', },
            { title: '商品凭证', dataIndex: 'credential', key: 'credential', },
            { title: '商品价格', dataIndex: 'price', key: 'price', width: '73px' },
            { title: '发布时间', dataIndex: 'releaseTime', key: 'releaseTime', },
            { title: '商品状态', dataIndex: 'isRelease', key: 'isRelease', width: '73px' },
            { title: '操作', dataIndex: 'caozuo', key: 'caozuo', width: '325px' },
        ]

        return {
            state,
            columns,
            modifyGoods,
            deleteGoods,
            releaseGoods,
            visible1,
            showModal,
            showModal1,
            beforeUpload,
            findValue,
            againReleaseGoods
        };
    },

});
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
}
</style>