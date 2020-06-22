<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="fishtab" ref="btnClick">
      <router-link to="/fishhome" tag="div">
        <span></span>
        <p>天气</p>
      </router-link>
      <router-link to="/fishtodo" tag="div">
        <span></span>
        <p>备忘</p>
      </router-link>
      <router-link to="/fishnew" tag="div">
        <span></span>
        <p>地图</p>
      </router-link>
      <router-link to="/fishperson" tag="div">
        <span></span>
        <p>个人</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Col, Row } from "vant";
export default {
  data: () => ({
    whiteImg: [
      `url("./assets/img/fish-weather-home-white.png")`,
      `url("./assets/img/fish-weather-todo-white.png")`,
      `url("./assets/img/fish-weather-news-white.png")`,
      `url("./assets/img/fish-weather-person-white.png")`
    ]
  }),
  components: {
    [Col.name]: Col,
    [Row.name]: Row
  },
  methods: {
    setQuery() {
      let itemBox = this._$(this.$refs.btnClick);
      let item = this._$(this.$refs.btnClick).children();

      setTimeout(() => {
        if (this.$router.currentRoute.name == "fishome") {
          this._$(itemBox)
            .addClass("firstCss")
            .removeClass("seadCss threeCss fourCss");
        } else if (this.$router.currentRoute.name == "fishtodo") {
          this._$(itemBox)
            .addClass("seadCss")
            .removeClass("firstCss threeCss fourCss");
        } else if (this.$router.currentRoute.name == "fishnew") {
          this._$(itemBox)
            .addClass("threeCss")
            .removeClass("firstCss seadCss fourCss");
        } else if (this.$router.currentRoute.name == "fishperson") {
          this._$(itemBox)
            .addClass("fourCss")
            .removeClass("firstCss seadCss threeCss");
        }
      }, 200);

      this._$(item[0]).click(() => {
        this._$(itemBox)
          .addClass("firstCss")
          .removeClass("seadCss threeCss fourCss");
      });

      this._$(item[1]).click(() => {
        this._$(itemBox)
          .addClass("seadCss")
          .removeClass("firstCss threeCss fourCss");
      });

      this._$(item[2]).click(() => {
        this._$(itemBox)
          .addClass("threeCss")
          .removeClass("firstCss seadCss fourCss");
      });

      this._$(item[3]).click(() => {
        this._$(itemBox)
          .addClass("fourCss")
          .removeClass("firstCss seadCss threeCss");
      });
    },
    // 根据cookies设置登陆属性
    getIsLogin() {
      if (this.$cookies.get("_my_kk")) {
        window.sessionStorage.setItem("isLogin", true);
      } else {
        window.sessionStorage.setItem("isLogin", false);
      }
    }
  },
  mounted() {
    this.setQuery();
    this.getIsLogin();
  },
  watch: {
    $route() {
      this.getIsLogin();
    }
  }
};
</script>

<style lang='scss'>
@mixin imgWz() {
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center center;
}

.fishtab {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 10;
  // 设置默认的样式
  display: flex;
  div {
    width: 25%;
    min-height: 48px;
    // color: #9296a1;
    color: #989898;
    span {
      display: block;
      // background-color: yellow;
      height: 30px;
      width: 100%;
      background-size: 30% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    p {
      line-height: 15px;
      font-size: 13px;
    }
  }
}

.firstCss {
  background-color: rgb(108, 191, 255);
  div:nth-child(1) {
    span {
      background-image: url("./assets/img/fish-weather-home-white.png");
    }
    p {
      color: white;
    }
  }
  div:nth-child(2) {
    span {
      background-image: url("./assets/img/fish-weather-todo-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(3) {
    span {
      background-image: url("./assets/img/fish-weather-news-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(4) {
    span {
      background-image: url("./assets/img/fish-weather-person-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
}

.seadCss {
  background-color: white;
  div:nth-child(1) {
    span {
      background-image: url("./assets/img/fish-weather-home-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(2) {
    span {
      background-image: url("./assets/img/fish-weather-todo.png");
    }
    p {
      color: rgb(108, 191, 255);
    }
  }
  div:nth-child(3) {
    span {
      background-image: url("./assets/img/fish-weather-news-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(4) {
    span {
      background-image: url("./assets/img/fish-weather-person-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
}

.threeCss {
  background-color: white;
  div:nth-child(1) {
    span {
      background-image: url("./assets/img/fish-weather-home-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(2) {
    span {
      background-image: url("./assets/img/fish-weather-todo-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(3) {
    span {
      background-image: url("./assets/img/fish-weather-news.png");
    }
    p {
      color: rgb(108, 191, 255);
    }
  }
  div:nth-child(4) {
    span {
      background-image: url("./assets/img/fish-weather-person-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
}

.fourCss {
  background-color: white;
  div:nth-child(1) {
    span {
      background-image: url("./assets/img/fish-weather-home-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(2) {
    span {
      background-image: url("./assets/img/fish-weather-todo-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(3) {
    span {
      background-image: url("./assets/img/fish-weather-news-brow.png");
    }
    p {
      color: rgb(135, 135, 135);
    }
  }
  div:nth-child(4) {
    span {
      background-image: url("./assets/img/fish-weather-person.png");
    }
    p {
      color: rgb(108, 191, 255);
    }
  }
}
</style>
