<template>
  <a-form :model="state" name="normal_login" class="login-form">
    <h2 style="text-align: center;">欢迎使用校园闲置电子产品交易平台管理系统！</h2><br>
    <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '请输入您的用户名!' }]" style="margin-left: 17%;">
      <a-input v-model:value="state.name" style="width: 200px;">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码" name="password" :rules="[{ required: true, message: '请输入您的密码!' }]"
      style="margin-left: 17%;">
      <a-input-password v-model:value="state.password" style="width: 200px;">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item><br>
    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" @click="adminLogin"
        style="width: 64%;margin-left: 18%;">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import api from '../../api/api'
import router from '../../router';
import { message } from "ant-design-vue";

interface state {
  name: string,
  password: string,
}

export default defineComponent({
  name: 'adminLogin',

  components: {
    UserOutlined,
    LockOutlined,
  },

  setup() {

    const state = reactive<state>({
      name: '',
      password: ''
    });

    function adminLogin() {
      api.adminLogin({
        name: state.name,
        password: state.password
      }).then((res: any) => {
        if (res.code == 200) {
          localStorage.setItem('token', res.data)
          router.push('adminView')
        } else {
          message.error(res.description)
        }
      })
    }

    const disabled = computed(() => {
      return !(state.name && state.password);
    });

    return {
      state,
      adminLogin,
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
  width: 441px;
}
</style>