<template>
  <div id="Login">
      <div class="login-warp">
        <ul class="menu-tab">
          <li v-for="(item,index) in menuTab" :key="index" :class="{'current':current == index}" @click="current = index">{{ item.text }}</li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      menuTab:[
        {text:'登录'},
        {text:'注册'}
      ],
      current:'0'
    }
  },
};
</script>

<style lang="scss" scoped>
#Login {
  height:100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba( 0, 0, 0, .1);
  }
}
</style>