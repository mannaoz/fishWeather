<template>
  <div class="register">
    <!-- 提示 -->
    <TipA></TipA>
    <!-- 返回页面 -->
    <div class="header-login">
      <span class="getBack" @click="getBack()">返回</span>
      登陆FishWeather
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
          <span class="fl item-title">密码</span>
          <div class="fl item-input">
            <input
              type="password"
              class="form-control"
              placeholder="请输入你的密码"
              v-model="userInfo.password"
            />
          </div>
        </div>
        <div class="body-item2 clearfix">
          <div class="fr tip-txt">忘记密码</div>
        </div>
        <div class="body-item2 clearfix">
          <button @click="goRegister()">注册</button>
          <button @click="login()" class="active">登陆</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入提示栏
import TipA from "../components/Tip.vue";
export default {
  name: "login",
  data: () => ({
    //   用户信息
    userInfo: {
      email: "",
      password: ""
    }
  }),
  methods: {
    // 获取提示的东西
    ToastShow(msg, time) {
      this.$children[0].setShow(msg, time);
    },
    // 登陆
    login() {
      let obj = this.$utils.testNews(this.userInfo);
      if (obj.bool) {
        this.axios({
          method: "post",
          url: "/login",
          data: this.userInfo
        })
          .then(res => {
            // 请求成功
            if (res.data.code == 10001) {
              this.ToastShow(res.data.msg, 1000);
            } else if (res.data.code == 10000) {
              this.$cookies.set("_my_kk", res.data.token, "7d");
              window.sessionStorage.setItem("isLogin", true);
              this.goPerson()
            }
          })
          .catch(err => {
            this.ToastShow("登陆错误", 1000);
            console.log(err);
          });
      } else {
        this.ToastShow(obj.msg, 1000);
      }
    },
    // 提示登陆
    tipLogin() {
      setTimeout(() => {
        if (this.$route.params.id == 1) {
          this.ToastShow("首页需要登陆", 1000);
        }
      }, 100);
    },
    // 返回上一页
    getBack() {
      this.$router.go(-1)
    },
    goPerson(){
      this.$router.push({
        name:'fishperson'
      })
    },
    goRegister(){
      this.$router.push({
        name:'register'
      })
    }
  },
  components: {
    TipA
  },
  mounted() {
    this.tipLogin();
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
        color:rgb(125, 199, 255);
      .tip-txt {
        text-align: right;
      }
      button{
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
        color:rgb(125, 199, 255);
      }
      .active{
        background-color: rgb(125, 199, 255);
        color: white;
      }
    }
  }
}
</style>