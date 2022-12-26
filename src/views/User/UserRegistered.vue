<template>
    <a-form :model="state" v-bind="layout" name="nest-messages" class="registered-form">
        <h2>欢迎注册校园闲置电子产品交易平台！</h2><br>
        <a-form-item :name="['name']" label="用户名">
            <a-input v-model:value="state.name" />
        </a-form-item>
        <a-form-item :name="['password']" label="密&nbsp;&nbsp;&nbsp;&nbsp;码">
            <a-input v-model:value="state.password" />
        </a-form-item>
        <a-form-item :name="['studentId']" label="学&nbsp;&nbsp;&nbsp;&nbsp;号">
            <a-input v-model:value="state.studentId" />
        </a-form-item>
        <a-form-item :name="['phone']" label="手&nbsp;&nbsp;&nbsp;&nbsp;机">
            <a-input v-model:value="state.phone" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
            <a-button type="primary" html-type="submit" @click="registered">注册</a-button>
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
    name: "userRegistered",

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

        function registered() {
            api.registered({
                name: state.name,
                password: state.password,
                studentId: state.studentId,
                phone: state.phone
            }).then((res: any) => {
                if (res.code == 200) {
                    router.push('userLogin')
                    message.success('注册成功，请登录！')
                } else {
                    message.error(res.description)
                }
            })
        }

        return {
            state,
            layout,
            registered
        };

    },
});
</script>

<style scoped>
.registered-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 357px;
}
</style>