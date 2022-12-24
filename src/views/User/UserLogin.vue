<template>
    <a-form :model="state" name="normal_login" class="login-form">
        <h2>欢迎使用校园闲置电子产品交易平台！</h2><br>
        <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入您的用户名!' }]"
            style="margin-left: 10%;">
            <a-input v-model:value="state.name" style="width: 200px;">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码" name="password"
            :rules="[{ required: true, message: '请输入您的密码!' }]" style="margin-left: 10%;">
            <a-input-password v-model:value="state.password" style="width: 200px;">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>
        <a-form-item>
            <a class="login-form-forgot" href="" style="margin-left: 74.5%;">找回密码</a>
        </a-form-item>
        <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button"
                @click="userLogin" style="width: 80%;margin-left: 10%;">
                登录
            </a-button><br>
            <text style="margin-left: 10%;">或</text>
            <a href="" style="margin-left: 2%;">现在注册!</a>
        </a-form-item>
    </a-form>
</template>
  
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import api from '../../api/api'
import router from '../../router';

interface state {
    name: string,
    password: string,
}

export default defineComponent({
    name: 'userLogin',

    components: {
        UserOutlined,
        LockOutlined,
    },

    setup() {

        const state = reactive<state>({
            name: '',
            password: ''
        });

        function userLogin() {
            api.userLogin({
                name: state.name,
                password: state.password
            }).then((res: any) => {
                if (res.code == 200) {
                    localStorage.setItem('token', res.data)
                    router.push('adminView')
                }
            })
        }

        const disabled = computed(() => {
            return !(state.name && state.password);
        });

        return {
            state,
            userLogin,
            disabled
        };
    },
});
</script>
  
<style>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}

.login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 357px;
}
</style>