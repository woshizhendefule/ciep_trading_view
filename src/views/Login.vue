<template>
  <h1>欢迎使用校园闲置电子产品交易平台！</h1>
  <a-form :model="state" name="normal_login" class="login-form" :labelCol="{ span: 1 }">
    <a-form-item label="用户名" name="name" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="state.name">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码" name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="state.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a class="login-form-forgot" href="">Forgot password</a>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button" @click="login">
        Log in
      </a-button>
      Or
      <a href="">register now!</a>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import api from '../api/api'
import router from "../router";

interface state {
  name: string,
  password: string,
}

export default defineComponent({
  name: 'Login',

  components: {
    UserOutlined,
    LockOutlined,
  },

  setup() {

    const state = reactive<state>({
      name: '',
      password: ''
    });

    function login() {
      api.login({
        name: state.name,
        password: state.password
      }).then((res: any) => {
        if (res.code == 200) {
          localStorage.setItem('token', res.data)
          router.push('adminView')
        }
      })
    }

    return {
      state,
      login
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
</style>