<template>
    <a-form :model="state" v-bind="layout" name="nest-messages" class="retrievePassword-form">
        <a-form-item :name="['name']" label="用户名&nbsp;&nbsp;">
            <a-input v-model:value="state.name" />
        </a-form-item>
        <a-form-item :name="['studentId']" label="验证学号">
            <a-input v-model:value="state.studentId" />
        </a-form-item>
        <a-form-item :name="['phone']" label="验证手机">
            <a-input v-model:value="state.phone" />
        </a-form-item>
        <a-form-item :name="['password']" label="新密码&nbsp;&nbsp;">
            <a-input v-model:value="state.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
            <a-button type="primary" html-type="submit" @click="retrievePassword">找回密码</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import api from '../../api/api'
import router from '../../router';
import { message } from "ant-design-vue";

interface state {
    name: string,
    password: string,
    studentId: string,
    phone: string
}

export default defineComponent({
    name: "userRetrievePassword",

    setup() {
        const state = reactive<state>({
            name: '',
            password: '',
            studentId: '',
            phone: ''
        });

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        function retrievePassword() {
            api.retrievePassword({
                name: state.name,
                password: state.password,
                studentId: state.studentId,
                phone: state.phone
            }).then((res: any) => {
                if (res.code == 200) {
                    router.push('userLogin')
                    message.success('找回成功，请登录！')
                } else {
                    message.error(res.description)
                }
            })
        }

        return {
            state,
            layout,
            retrievePassword
        };

    },
});
</script>

<style scoped>
.retrievePassword-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 357px;
}
</style>