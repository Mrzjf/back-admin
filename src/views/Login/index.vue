<template>
  <div id="Login">
    <div class="login-warp">
      <!-- TAB切换按钮 -->
      <ul class="menu-tab">
        <li
          v-for="(item,index) in menuTab"
          :key="index"
          :class="{'current':current == index}"
          @click="tabRest(index)"
        >{{ item.text }}</li>
      </ul>
      <!-- 登录 -->
      <div class="login-from" style="margin-top:20px" v-if="!current">
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
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="18"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <label>验证码</label>
            <div class="flex">
              <el-input v-model.number="ruleForm.code" style="margin-right:20px" type="text"></el-input>
              <el-button @click="GetSms1()" type="success" :disabled="isBtnActive">获取验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submitForm('ruleForm')"
              class="LoginBtn"
              type="primary"
              :disabled="!isBtnActive"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 注册 -->
      <div class="register-from" v-else>
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
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="18"></el-input>
          </el-form-item>
          <el-form-item prop="pass2">
            <label>再次输入密码</label>
            <el-input type="password" v-model="ruleForm.pass2" autocomplete="off" maxlength="18"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <label>验证码</label>
            <div class="flex">
              <el-input v-model.number="ruleForm.code" style="margin-right:20px"></el-input>
              <el-button type="success" :disabled="isBtnActive">获取验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submitForm('ruleForm')"
              class="LoginBtn"
              type="success"
              :disabled="!isBtnActive"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSms } from "../../api/login.js";
import { reactive, ref, onMounted, computed } from "@vue/composition-api";
import { filter } from "../../common/testInput.js";

export default {
  setup(props, { rers,root }) {
    //验证
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      callback();
    };
    var validateEmail = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("输入邮箱格式有误"));
      } else {
        if (ruleForm.pass !== "") {
          refs.ruleForm.validateField("pass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    //数据
    const menuTab = reactive([{ text: "登录" }, { text: "注册" }]);
    const current = ref(0);
    const ruleForm = reactive({
      email: "",
      pass: "",
      pass2: "",
      code: ""
    });
    const rules = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      pass: [{ validator: validatePass, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });
    const isBtnActive = ref(false);

    //方法
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          alert("输入正确");
          //实现登录验证请求
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const GetSms1 = () => {
      // if (!ruleForm.email) {
      //   root.$message.error("邮箱不能为空");
      //   return false;
      // }
      let json = {
        username: ruleForm.email
      };
      GetSms(json).then(res => {
        if (!res.data.resCode) {
          root.$message({
            message: "验证码发送成功",
            type: "success"
          });
          isBtnActive.value = true;
        }
      });
    };

    const tabRest = index => {
      current.value = index;
      isBtnActive.value = false;
    };

    //生命周期
    onMounted(function() {});

    return {
      menuTab,
      current,
      ruleForm,
      rules,
      submitForm,
      tabRest,
      GetSms1,
      isBtnActive
    };
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

.register-from {
  label {
    color: #fff;
  }
  .LoginBtn {
    width: 100%;
  }
}
</style>