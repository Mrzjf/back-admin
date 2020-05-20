<template>
  <div id="Login">
    <div class="login-warp">
      <!-- TAB切换按钮 -->
      <ul class="menu-tab">
        <li
          v-for="(item,index) in menuTab"
          :key="index"
          :class="{'current':current == index}"
          @click="current = index"
        >{{ item.text }}</li>
      </ul>
      <!-- 登录 -->
      <div class="login-from" style="margin-top:20px" v-if="current == 0">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          size="medium"
        >
          <el-form-item prop="email">
            <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <label>密码</label>
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <label>验证码</label>
            <div class="flex">
              <el-input v-model.number="ruleForm.code" style="margin-right:20px"></el-input>
              <el-button @click="resetForm('ruleForm')" type="success" :disabled="isBtn">获取验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" class="LoginBtn" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 注册 -->
      <div class="register-from" v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入验证码"));
        } else {
            callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (this.ruleForm.pass !== "") {
          this.$refs.ruleForm.validateField("pass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [{ text: "登录" }, { text: "注册" }],
      current: 0,
      ruleForm: {
        email: "",
        pass: "",
        code: ""
      },
      rules: {
        email: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }]
      },
      isBtn:false,//禁用按钮关闭
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("输入正确");
          //实现登录验证请求
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if(!this.isBtn) {
        this.isBtn = !this.isBtn
      }
    }
  }
};
</script>

<style lang="scss">
#Login {
  height: 100vh;
  background-color: #344a5f;
}
.login-warp {
  width: 330px;
  margin: auto;
}
.menu-tab {
  padding-top: 100%;
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
    background-color: rgba(0, 0, 0, 0.1);
    color: rgb(6, 174, 252);
  }
}

.login-from {
  label {
    color: #fff;
  }
  .LoginBtn {
    width: 100%;
  }
}
</style>