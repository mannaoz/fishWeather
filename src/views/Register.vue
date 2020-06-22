<template>
  <div class="register">
    <!-- 提示 -->
    <TipA></TipA>

    <!-- 返回页面 -->
    <div class="header-login">
      <span class="getBack" @click="getBack()">返回</span>
      注册FishWeather
    </div>

    <!-- 注册页面 -->
    <div class="form-box">
      <!-- 注册身体 -->
      <div class="body">
        <!-- 内容 -->
        <div class="body-item clearfix">
          <span class="fl item-title">邮箱</span>
          <div class="fl item-input">
            <input type="text" class="form-control" placeholder="请输入你的邮箱" v-model="userInfo.email" />
          </div>
        </div>
        <div class="body-item clearfix">
          <span class="fl item-title">昵称</span>
          <div class="fl item-input">
            <input
              type="text"
              class="form-control"
              placeholder="请输入你的昵称"
              v-model="userInfo.nickname"
            />
          </div>
        </div>
        <div class="body-item clearfix">
          <span class="fl item-title">密码</span>
          <div class="fl item-input">
            <input
              type="text"
              class="form-control"
              placeholder="请输入你的密码"
              v-model="userInfo.password"
            />
          </div>
        </div>
        <div class="body-item3 clearfix">
          <span class="fl">验证码</span>
          <div class="fl">
            <input
              type="text"
              class="form-control code-input fl"
              placeholder="输入验证码"
              v-model="userInfo.code"
            />
            <button
              class="code-button fl btn"
              :disabled="isSendCode"
              @click="getCode()"
            >{{codeText}}</button>
          </div>
        </div>
        <div class="body-item2 clearfix">
          <button @click="goLogin()">登陆</button>
          <button @click="register()" class="active">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入提示栏
import TipA from "../components/Tip.vue";
export default {
  name: "Register",
  data: () => ({
    //   用户信息
    userInfo: {
      email: "",
      nickname: "",
      password: "",
      code: ""
    },
    // 是否发送邮箱验证码
    isSendCode: false,
    // 验证码按钮文字
    codeText: "发送验证码"
  }),
  methods: {
    // 获取提示的东西
    ToastShow(msg, time) {
      this.$children[0].setShow(msg, time);
    },
    //   获取验证码
    getCode() {
      let obj = this.$utils.testNews({
        email: this.userInfo.email
      });
      //  验证邮箱信息
      if (obj.bool) {
        this.isSendCode = true;
        // 设置验证码间隔时间
        let time = 10;
        //   设置定时器
        let timer = setInterval(() => {
          if (time > 0) {
            this.codeText = `重新发送(${time}s)`;
            time--;
          } else {
            // 注销
            clearInterval(timer);
            this.isSendCode = false;
            this.codeText = `发送验证码`;
          }
        }, 1000);

        // 发送验证
        this.axios({
          method: "post",
          url: "/getCode",
          data: {
            email: this.userInfo.email
          }
        })
          .then(result => {
            if (result.data.code == 10001) {
              this.ToastShow(result.data.msg, 1000);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.ToastShow(obj.msg, 1000);
      }
    },
    //   用户注册
    register() {
      // 先验证数据
      let obj = this.$utils.testNews(this.userInfo);
      // 通过验证再来进行数据请求
      if (obj.bool) {
        // 数据请求
        this.axios({
          method: "POST",
          url: "/register",
          data: this.userInfo
        })
          .then(res => {
            // console.log(res)
            // 注册成功和失败的提醒
            if (res.data.code == 10001) {
              this.ToastShow(res.data.msg, 1000);
            } else if (res.data.code == 10000) {
              this.ToastShow(res.data.msg, 1000);
              setTimeout(() => {
                // 跳转登录页
                this.goLogin();
              }, 1200);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.ToastShow(obj.msg, 1000);
      }
    },
    // 跳转注册页
    goLogin() {
      this.$router.push({
        name: "login"
      });
    },
  
    // 返回上一页
    getBack() {
      this.$router.go(-1)
    },
  },
  components: {
    TipA
  }
};
</script>
<style lang="scss" scoped>
.header-login {
  text-align: center;
  line-height: 50px;
  background-color: white;
  font-size: 17px;
  width: 100%;
  position: relative;
  color: #212121;
  span {
    display: inline-block;
    position: absolute;
    left: 0;
    padding: 0 10px;
    font-size: 17px;
  }
}
.register {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
}
.form-box {
  position: absolute;
  width: 100%;
  margin-top: 18px;
  .body {
    .body-item {
      padding: 0 15px;
      height: 50px;
      background-color: white;
      .item-title {
        display: inline-block;
        text-align: left;
        width: 20%;
        color: #212121;
      }
      .item-input {
        display: inline-block;
        width: 70%;
        input {
          border: none;
          outline: none;
          width: 80%;
          height: 50px;
          color: rgb(105, 105, 105);
        }
        input::placeholder {
          color: rgb(160, 160, 160);
        }
      }
    }
    .body-item2 {
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      color: rgb(125, 199, 255);
      margin-top: 20px;
      .tip-txt {
        text-align: right;
      }
      button {
        width: 40%;
        margin: 0 5%;
        padding: 0;
        height: 50px;
        outline: none;
        border: 0;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid rgb(125, 199, 255);
        background-color: transparent;
        color: rgb(125, 199, 255);
      }
      .active {
        background-color: rgb(125, 199, 255);
        color: white;
      }
    }
    .body-item3 {
      padding: 0 15px;
      background-color: white;
      height: 50px;
      line-height: 50px;
      color: rgb(125, 199, 255);
      span{
        display: inline-block;
        color: #212121;
        width: 20%;
      }
      div{
        display: inline-block;
        input{
          margin: 0;
          padding: 0;
          border: 0;
          outline: none;
        }
        input::placeholder{
          color: rgb(160, 160, 160);
        }
        button{
          outline: none;
          border: none;
          background-color: transparent;
        }
      }
    }
  }
}
</style>