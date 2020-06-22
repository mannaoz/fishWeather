<template>
  <div class="person">
    <div class="top">
      <h1>个人页面</h1>
    </div>
    <div class="header" v-if="userData">
      <div class="headerImg">
        <img src="http://47.106.85.2:3389/header.png" alt />
      </div>
      <div class="headerTitle">
        <h1>{{userData.nickname}}</h1>
        <h2>{{userData.email}}</h2>
      </div>
    </div>
    <div class="personbody">
      <div class="personbody-title">
        <h1>暂无动态</h1>
      </div>
      <div class="personbody-footer">
        <button @click="tuichu()">退出账号</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    userData: null
  }),
  methods: {
    getLoginPerson() {
      this.axios({
        method: "post",
        url: "/getLoginPerson"
      }).then(result => {
        if (result.data.code == 10000) {
          this.userData = result.data.result[0];
        }
      });
    },
    tuichu() {
      this.$cookies.remove("_my_kk");
      this.$router.push({ name: "login" });
    }
  },
  created() {
    this.getLoginPerson();
  }
};
</script>

<style lang="scss" scoped>
.person {
  width: 100%;
  height: 100vh;
  .top {
    height: 35px;
    width: 100%;
    background-color: rgb(160, 214, 255);
    line-height: 35px;
    color: white;
    h1 {
      text-align: center;
    }
  }
  .header {
    height: 30%;
    width: 100%;
    background-color: rgb(125, 199, 255);
    position: relative;
    .headerImg {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: white;
      position: absolute;
      bottom: 10px;
      left: 10px;
      overflow: hidden;
      display: inline-block;
      img {
        height: 100%;
      }
    }
    .headerTitle {
      display: inline-block;
      position: absolute;
      width: calc(100% - 130px);
      bottom: 10px;
      right: 10px;
      h1{
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        color: white;
      }
      h2{
        height: 40px;
        line-height: 40px;
        color: rgb(243, 243, 243);
      }
    }
  }
  .personbody{
    width: 100%;
    height: 58%;
    position: relative;
    .personbody-title{
      h1{
        line-height: 60px;
        text-align: center;
        font-size: 25px;
        color: rgb(177, 177, 177);
      }
    }
    .personbody-footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      button{
        outline: none;
        border: none;
        width: 80%;
        padding: 12px;
        color: white;
        display: block;
        margin: 0 auto;
        font-size: 20px;
        background-color: rgb(35, 204, 255);
        border-radius: 5px;
      }
    }
  }
}
</style>