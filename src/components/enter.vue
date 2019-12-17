<template>
<!-- 应用刚进入时的页面 -->
  <div id="enter">
    <h1 class="app-name">热度</h1>
    <div class="login-and-register">
      <p @click="toLogin">登录</p>
      <p @click="toRegister">注册</p>
      <p class="btn-enter" @click="toIndex">游客浏览></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      as: "",
      cp: "",
      signature: ""
    };
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    toRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    toIndex() {
      this.$router.push({
        path: "/index"
      })
    }
  }
};
</script>

<style scoped>
#enter {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: skyblue;
}

h1 {
  text-shadow: #ff0000 0 0 10px;
  color: white;
  font-size: 60px;
}

.app-name {
  width: 100%;
  text-align: center;
  margin-top: 10rem;
}

.login-and-register {
  position: absolute;
  bottom: 5rem;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-weight: 600;
  letter-spacing: 2px;
}
</style>
