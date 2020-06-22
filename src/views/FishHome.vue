<template>
  <div>
    <SetSite :isCeshow="isCeshow"></SetSite>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="fishview">
      <div class="fishhome" v-if="todayWeather" :class="backImgStyle">
        <van-col span="24" class="fishhome-header" :style="styleObj" @click="setisCeshow(true)">
          <transition name="movetitle">
            <!-- <div class="fishhome-title" :style="styleObj"> -->
            <h1 v-if="!hotBankFlag" key="title1">
              <span>+</span>
              {{todayWeather.basic.admin_area}} {{todayWeather.basic.parent_city}}
              <van-icon name="location" class="icon" />
            </h1>
            <h1
              v-else
              key="title2"
            >{{todayWeather.basic.admin_area}} {{todayWeather.basic.parent_city}} {{todayWeather.now.tmp}}℃</h1>
            <!-- </div> -->
          </transition>
        </van-col>
        <div class="fishhome-body">
          <!-- jkhdasjk;dhsklahdksahdklas -->
          <div class="list">
            <h1 class="temperature">
              {{todayWeather.now.tmp}}℃
              <span>{{todayWeather.now.cond_txt}}</span>
            </h1>
            <h2 class="wind">
              <span>{{todayWeather.now.wind_dir}}</span>
              <b>{{todayWeather.now.wind_sc}}级</b>
              <span>湿度</span>
              <b>{{todayWeather.now.hum}}%</b>
              <span>云量</span>
              <b>{{todayWeather.now.cloud}}%</b>
            </h2>
            <h3 class="lifestyle" v-if="lifestyle">
              <van-notice-bar :scrollable="true" class="bar" mode="link" color="white">
                <p v-for="(item,key) in lifestyle" :key="key">{{item.txt}}</p>
              </van-notice-bar>
              <b v-if="airNow">
                <van-icon name="flower-o" class="airnow-icon" :color="setAirColor" />
                <span>{{airNow.qlty|airTxt}}</span>
                {{airNow.aqi}}
              </b>
            </h3>
            <div class="twoday" v-if="forecast">
              <div class="left">
                <h1>明天</h1>
                <h2>{{forecast.daily_forecast[1].tmp_max}}℃/{{forecast.daily_forecast[1].tmp_min}}℃</h2>
                <h3>
                  <b>
                    <i class="border"></i>
                    {{forecast.daily_forecast[1].wind_dir}}
                  </b>
                  <span>{{forecast.daily_forecast[1].cond_txt_d}}转{{forecast.daily_forecast[1].cond_txt_n}}</span>
                </h3>
              </div>
              <div class="right">
                <h1>后天</h1>
                <h2>{{forecast.daily_forecast[2].tmp_max}}℃/{{forecast.daily_forecast[2].tmp_min}}℃</h2>
                <h3>
                  <b>
                    <i class="border"></i>
                    {{forecast.daily_forecast[2].wind_dir}}
                  </b>
                  <span>{{forecast.daily_forecast[2].cond_txt_d}}转{{forecast.daily_forecast[2].cond_txt_n}}</span>
                </h3>
              </div>
            </div>
            <div class="chart">
              <Chart :option="option" />
            </div>
            <div class="threeDay" v-if="forecast">
              <div class="day-list" v-for="(item,key) in forecast.daily_forecast" :key="key">
                <!-- <img src="" alt=""> -->
                <span><img :src="`https://cdn.heweather.com/cond_icon/${item.cond_code_d}.png`" alt=""></span>
                <h1>{{item.cond_txt_d}}</h1>
                <h2 class="max">{{item.tmp_max}}℃</h2>
                <h2 class="min">{{item.tmp_min}}℃</h2>
                <h1>{{item.cond_txt_n}}</h1>
                <span><img :src="`https://cdn.heweather.com/cond_icon/${item.cond_code_n}.png`" alt=""></span>
                <h3>{{item.wind_dir|windTxt}}</h3>
                <h3>{{item.wind_sc}}级</h3>
                <b></b>
              </div>
            </div>
            <div class="suggest" v-if="lifestyle">
              <h1>生活指数</h1>
              <div class="tag">
                <van-col span="6" class="tag-box">
                  <img src="../assets/img/chuanyi.png" alt />
                  <h3>{{lifestyle[1].brf}}</h3>
                  <h2>穿衣</h2>
                </van-col>
                <van-col span="6" class="tag-box">
                  <img src="../assets/img/yifa.png" alt />
                  <h3>{{lifestyle[2].brf}}</h3>
                  <h2>感冒</h2>
                </van-col>
                <van-col span="6" class="tag-box">
                  <img src="../assets/img/ziwaixian.png" alt />
                  <h3>{{lifestyle[5].brf}}</h3>
                  <h2>紫外线</h2>
                </van-col>
                <van-col span="6" class="tag-box">
                  <img src="../assets/img/xiche.png" alt />
                  <h3>{{lifestyle[6].brf}}</h3>
                  <h2>洗车</h2>
                </van-col>
                <van-col span="6" class="tag-box">
                  <img src="../assets/img/shushidu.png" alt />
                  <h3>{{lifestyle[0].brf}}</h3>
                  <h2>舒适度</h2>
                </van-col>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src
import SetSite from "../components/SetSite";
import Chart from "../components/Chart";
import { Button, Col, Row, PullRefresh, Toast, Icon, NoticeBar } from "vant";
import { mapState, mapMutations } from "vuex";
Toast.setDefaultOptions({ duration: 300 }); //刷新提示显示时间
export default {
  name: "Home",
  data: () => ({
    todayWeather: null, //今天的天气
    forecast: null, //三天的天气
    lifestyle: null, //各项提示指数
    airNow: null, //空气质量
    hourly: null, //逐小时天气

    // 上拉刷新的玩意儿
    count: 0,
    isLoading: false,

    hotBankFlag: false, //这是移动是否超过多少
    scrollTop: null, //这是滚动距离

    lifeIndex: 0 //这是轮播文字的刷新
  }),
  components: {
    // 注册自己要使用的数据
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    SetSite,
    Chart
  },
  computed: {
    // 颜色渐变处理
    styleObj() {
      if (this.scrollTop > 150) {
        return { backgroundColor: `rgba(108, 191, 255, 1)` };
      } else {
        return {
          backgroundColor: `rgba(108, 191, 255, ${this.scrollTop / 150})`
        };
      }
    },

    // 背景图片处理
    backImgStyle() {
      return "sun";
    },

    // 颜色处理
    setAirColor() {
      if (this.airNow.qlty) {
        switch (this.airNow.qlty) {
          case "优":
            return "#45b97c";
          case "良":
            return "#7fb80e";
          case "轻度污染":
            return "#87843b";
          case "中度污染":
            return "#454926";
          case "重度污染":
            return "#8f4b2e";
          case "严重污染":
            return "#aa2116";
          default:
            return "white";
        }
      } else {
        return "white";
      }
    },

    // 第一个的表格数据处理
    option() {
      let _this = this;
      if (this.hourly) {
        let setOption = {
          color: `#e0e0e0`,
          title: {
            text: `8小时温度预报   ${this.hourly[0].time.slice(
              -5
            )}到${this.hourly[7].time.slice(-5)}`,
            backgroundColor: `rgba(0,0,0,0.08)`,
            textStyle: {
              color: `#e0e0e0`
            },
            // padding:`0 150`,
            // width:10000,
            padding: [8, 350, 8, 18]
          },
          xAxis: {
            type: "category",
            name: "时间",
            nameLocation: "middle",
            data: (function() {
              let arr = [];
              for (let i = 0; i < _this.hourly.length; i++) {
                arr.push(_this.hourly[i].time.slice(11, 13));
              }
              return arr;
            })(),
            axisLine: {
              lineStyle: {
                color: "#d3d7d4",
                width: 1 //这里是为了突出显示加上的
              }
            }
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#d3d7d4",
                width: 1 //这里是为了突出显示加上的
              }
            }
          },
          series: [
            {
              data: (function() {
                let arr = [];
                for (let i = 0; i < _this.hourly.length; i++) {
                  arr.push(_this.hourly[i].tmp);
                }
                return arr;
              })(),
              type: "line",
              label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#ffd400"
                  }
                }
              }
            }
          ]
        };

        return setOption;
      } else {
        return {
          title: {
            text: "八小时天气预报",
            backgroundColor: `rgba(0,0,0,0.08)`,
            textStyle: {
              color: `#e0e0e0`
            },
            // padding:`0 150`,
            // width:10000,
            padding: [8, 350, 8, 18]
          },
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line"
            }
          ]
        };
      }
    },

    // 引入vuex的内容
    ...mapState(["hfkey", "txmapkey", "isCeshow", "site"])
  },
  methods: {
    ...mapMutations(["setisCeshow", "changeSite"]),

    // 监听滚动
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (scrollTop > 100) {
        this.hotBankFlag = true;
      } else {
        this.hotBankFlag = false;
      }
    },

    // 这个是刷新的回调函数
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.init();
        Toast("刷新成功");
      }, 1000);
    },

    // 获取当天的天气数据
    reqClimate() {
      this.axios({
        method: "get",  //请求方式get
        url: `api/s6/weather/now`, //请求的地址
        params: {  //get请求数据传参
          location: this.site,
          key: this.hfkey
        }
      }).then(res => { //then请求结束干什么  res就是请求后服务器发给你的数据
        this.todayWeather = res.data.HeWeather6[0];  //赋值给你打的数据
        // console.log(this.todayWeather);
      });
    },

    // 获取三天的天气数据
    reqForecast() {
      this.axios({
        method: "get",
        url: `api/s6/weather/forecast`,
        params: {
          location: this.site,
          key: this.hfkey
        }
      }).then(res => {
        this.forecast = res.data.HeWeather6[0];
        console.log(this.forecast);
      });
    },

    //获取天气提醒的api
    reqlifestyle() {
      this.axios({
        method: "get",
        url: `api/s6/weather/lifestyle`,
        params: {
          location: this.site,
          key: this.hfkey
        }
      }).then(res => {
        // this.forecast = res.data.HeWeather6[0];
        this.lifestyle = res.data.HeWeather6[0].lifestyle;
        // console.log(this.lifestyle);
      });
    },

    //这个是获取空气质量的api
    reqAirNow() {
      this.axios({
        method: "get",
        url: `api/s6/air/now`,
        params: {
          location: this.site,
          key: this.hfkey
        }
      }).then(res => {
        this.airNow = res.data.HeWeather6[0].air_now_city;
        // console.log(this.airNow);
      });
    },

    // 这个是获取逐小时的
    reqHourly() {
      this.axios({
        method: "get",
        url: `api/s6/weather/hourly`,
        params: {
          location: this.site,
          key: this.hfkey
        }
      }).then(res => {
        this.hourly = res.data.HeWeather6[0].hourly;
        // console.log(this.hourly);
      });
    },

    // 高德地图定位的api，获取当前定位
    reqSite() {
      this.axios({
        method: "get",
        url: "api/ip",
        params: {
          key: this.txmapkey
        }
      }).then(res => {
        // 如果存在获取到定位再使用
        if (res.data.city) {
          this.changeSite(res.data.city);
        }
      });
    },

    // 天气刷新和初始化
    init() {
      this.reqClimate();
      this.reqForecast();
      this.reqlifestyle();
      this.reqAirNow();
      this.reqHourly();
    }
  },
  filters: {
    // 图标过滤
    airTxt: val => {
      return val.slice(0, 1);
    },
    // 文字过滤
    windTxt:val=>{
      if(val.length>3){
        return val.slice(0,3)
      }else{
        return val
      }
    }
  },
  mounted() {
    // 启动的时候初始化一下获取地点
    this.reqSite();
    // this.reqlifestyle();
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);

    this.lifeTimer = setInterval(() => {
      if (this.lifeIndex == this.lifestyle.length - 1) {
        this.lifeIndex = 0;
      } else {
        this.lifeIndex++;
      }
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.lifeTimer);
  },
  watch: {
    // 监听site变化的时候调用设置
    site: {
      immediate: true, //监听自动调用一次
      handler: function() {
        this.init();
      }
    }
  }
};
</script>
<style lang="scss">
.fishhome {
  min-height: 180vh;
  // background-image: url('../assets/img/sun.jpg');
  // background-size: auto 100%;
  background-position: center center;
  .fishhome-header {
    min-height: 48px;
    position: fixed;
    z-index: 100;
    width: 100vw;
    overflow: hidden;
    h1 {
      height: 48px;
      width: 100vw;
      position: absolute;
      line-height: 48px;
      font-size: 17px;
      font-weight: 600;
      color: white;
      padding-left: 2vw;
      span {
        font-size: 20px;
      }
      .icon {
        font-size: 16px;
        padding-left: 8px;
        vertical-align: middle;
        margin-bottom: 3px;
      }
    }
  }
  .fishhome-body {
    padding: 0 3vw;
    padding-bottom: 8vh;
    .list {
      position: relative;
      z-index: 10;
      .temperature {
        padding-top: 56vh;
        font-size: 80px;
        font-weight: 300;
        color: white;
        span {
          font-size: 25px;
        }
      }
      .wind {
        color: white;
        padding-top: 5px;
        span {
          color: rgb(226, 226, 226);
          padding-left: 8px;
          padding-right: 2px;
        }
      }
      .lifestyle {
        height: 35px;
        margin-top: 10px;
        position: relative;
        .bar {
          height: 35px;
          width: 58vw;
          border-radius: 15px;
          background-color: rgba(0, 0, 0, 0.15);
          overflow: hidden;
          white-space: nowrap;
          p {
            color: rgb(238, 238, 238);
          }
        }
        b {
          height: 35px;
          line-height: 35px;
          position: absolute;
          top: 0;
          right: 0;
          display: inline-block;
          width: 25vw;
          border-radius: 15px;
          background-color: rgba(0, 0, 0, 0.15);
          color: rgb(238, 238, 238);
          text-align: center;
          span {
            padding-left: 10px;
          }
          .airnow-icon {
            // margin-top: 1px;
            font-size: 20px;
            line-height: 35px;
            font-weight: 800;
            position: absolute;
            left: 10px;
          }
        }
      }
      .twoday {
        height: 15vh;
        margin-top: 10px;
        // background-color: yellow;
        display: flex;
        width: 100%;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        div {
          width: 49.2%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          overflow: hidden;
          h1 {
            line-height: 5vh;
            padding: 0 3vw;
            font-size: 17px;
            color: #fef9f3;
          }
          h2 {
            line-height: 5vh;
            padding: 0 3vw;
            font-size: 19px;
            font-weight: 600;
            color: #fef9f3;
          }
          h3 {
            position: relative;
            bottom: 0;
            line-height: 4vh;
            margin-top: 1vh;
            background-color: rgba(0, 0, 0, 0.08);
            padding: 0 3vw;
            display: flex;
            justify-content: space-between;
            color: #e0e0e0;
            font-size: 14px;
            .border {
              display: inline-block;
              background-color: #ffc208;
              height: 2vh;
              width: 3px;
              position: relative;
              top: 2px;
            }
          }
        }
      }
      .chart {
        border-radius: 10px;
        margin-top: 15px;
        height: 38vh;
        background-color: rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }
      .threeDay {
        border-radius: 10px;
        margin-top: 15px;
        height: 40vh;
        background-color: rgba(0, 0, 0, 0.15);
        overflow: hidden;
        display: flex;
        .day-list{
          height: 100%;
          width: 20%;
          text-align: center;
          border-right: 1px solid rgb(211, 211, 211);
          position: relative;
          span{
            display: block;
            width: 100%;;
            height: 6vh;
            // background-color: yellow;
            img{
              width: 60%;
              margin-top: 20%;
            }
          }
          h1{
            color: #dcdcdc;
            line-height: 5vh;
          }
          h2{
            line-height: 4vh;
          }
          .max{
            color: #ffcc5f;
          }
          .min{
            color: #96d9ff;
          }
          h3{
            color: #dcdcdc;
            line-height: 3vh;
          }
          b{
            display: block;
            width: 18px;
            height: 5px;
            background-color: #78e293;
            border-radius: 5px;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .suggest {
        border-radius: 10px;
        margin-top: 15px;
        background-color: rgba(0, 0, 0, 0.15);
        overflow: hidden;
        position: relative;
        h1 {
          padding: 10px 10px;
          margin: 0 10px;
          font-size: 15px;
          color: #e0e0e0;
          border-bottom: 1px solid rgb(182, 182, 182);
        }
        .tag-box {
          height: 11vh;
          // border: 1px solid yellow;
          text-align: center;
          margin-top: 2vh;
          border-right: 1px solid rgb(198, 198, 198);
          img {
            height: 4vh;
          }
          h3 {
            text-align: center;
            color: #e0e0e0;
            line-height: 3vh;
            font-size: 15px;
          }
          h2 {
            text-align: center;
            color: #e0e0e0;
            line-height: 4vh;
          }
        }
      }
    }
  }
  .fishhome-body:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: rgb(82, 180, 255);
    opacity: 0.2;
    z-index: 1;
    width: 100%;
    color: #bfc2c7;
    height: 100%;
  }
}

// 天气的背景图片
.sun {
  background-image: url("../assets/img/sun.jpg");
}

/* 进入和离开的动画时间 */
.movetitle-enter-active,
.movetitle-leave-active {
  transition: all 0.5s linear;
}
/* 离开时候 */
.movetitle-leave-to {
  transform: translateY(-100%);
}
/* 进去的时候 */
.movetitle-enter {
  transform: translateY(100%);
}
</style>
