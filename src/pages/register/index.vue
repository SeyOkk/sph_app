<template>
  <div class="register">
    <h3>
      注册新用户
      <span class="go"
        >我有账号，去 <router-link to="/login" target="_blank">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input type="text" v-model="phone" placeholder="请输入你的手机号" />
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input type="text" v-model="code" placeholder="请输入验证码" />
      <button @click="toSmsCode" class="btn-code">获取验证码</button>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="text" v-model="password" placeholder="请输入你的登录密码" />
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input type="text" v-model="password_2" placeholder="请输入确认密码" />
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="controls">
      <input name="m1" @change="agree" type="checkbox" />
      <span>同意协议并注册《尚品汇用户协议》</span>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="btn">
      <button @click="handlerRegister">完成注册</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password_2: "",
      checked: false
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(["sendSmsCode", "register"]),
    // 发送短信验证码
    async toSmsCode() {
      if (this.phone) {
        this.code = await this.sendSmsCode({phone: this.phone})
      }
    },
    agree(event) {
      this.checked = event.target.checked
    },
    // 注册
    handlerRegister() {
      // 参数校验
      if (this.phone && this.password && this.password_2 && this.code) {
        if (this.checked) {
          if (this.password === this.password_2) {
            this.register({phone: this.phone, password: this.password_2, code: this.code})
            // 跳转登录页
            this.$router.push("/login")
          } else {
            alert("前后密码不一致")
          }
        } else {
          alert("请勾选协议")
        }
      } else {
        alert("必填参数不能为空")
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }

    .btn-code {
      height: 38px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #999;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
