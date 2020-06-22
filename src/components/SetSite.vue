<template>
  <div class="view">
    <van-popup v-model="isCeshow" position="left" :style="{ width: '100%' ,height:'100%'}">
      <!-- <button @click="setisCeshow(false)">关闭</button> -->
      <!-- <input type="text" v-model="searchInput" />
      <button @click="SearchSite">搜索</button>-->

      <div class="setsite-view">
        <div class="header">
          <!-- 标题页面 -->
          <h1 class="setsite-top">
            <van-icon name="cross" class="icon" @click="setisCeshow(false)" />城市管理
          </h1>
          <!-- 搜索页面 -->
          <van-search
            v-model="searchInput"
            show-action
            label="地址"
            placeholder="请输入搜索关键词"
            @search="SearchSite"
            @input="SearchSite"
            class="setsite-header"
          >
            <template #action>
              <div @click="SearchSite">搜索</div>
            </template>
          </van-search>
        </div>
        <!-- 中间显示的身体区域 -->
        <div class="sbody">
          <div class="setsite-body" v-if="searchInput">
            <div class="sitearr-list" v-if="setSiteArr">
              <div
                class="sitearr-list-view"
                v-for="(item,key) in setSiteArr"
                :key="key"
                @click="showSite(item)"
              >{{item.name}}</div>
            </div>
            <!-- <div class="sitearr-list-null" v-if="!setSiteArr">搜索不到地区，请输入正确的省市</div> -->
          </div>
          <div class="setsite-bodyArr" v-if="!searchInput">
            <div
              class="sitearr-list-view"
              v-for="(item,key) in siteArr"
              :key="key"
              @click="changeSiteKey(item,key)"
              :class="{checked:key==siteKey}"
            >
              <van-icon
                name="cross"
                class="del-icon"
                v-if="!buttonShow&&key!=siteKey"
                @click.stop="delSiteArr(key)"
              />
              {{item}}
              <van-icon name="location" class="icon" v-show="key==siteKey" />
            </div>
          </div>
        </div>
        <!-- 底部的编辑区域 -->
        <div class="sfooteer" v-if="!searchInput">
          <div class="setsite-footer">
            <div class="setsite-change" @click="changeButtonShow()">{{buttonShow?'编辑城市':'完成'}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Search, Icon } from "vant";
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    isCeshow: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    searchInput: null,
    searchSiteArr: null,
    siteArr: [],
    siteKey: 0,
    buttonShow: true
  }),
  components: {
    [Popup.name]: Popup,
    [Search.name]: Search,
    [Icon.name]: Icon
  },
  computed: {
    // 计算返回的值，排除省份和地级市
    setSiteArr() {
      if (this.searchSiteArr) {
        let arr = [];
        for (let i = 0; i < this.searchSiteArr.length; i++) {
          if (this.searchSiteArr[i].level == "province") {
            arr = arr.concat(this.searchSiteArr[i].districts);
          } else if (this.searchSiteArr[i].level == "city") {
            arr.push(this.searchSiteArr[i]);
          }
        }
        return arr;
      } else {
        return null;
      }
    },
    ...mapState(["txmapkey", "site"])
  },
  methods: {
    ...mapMutations(["setisCeshow", "changeSite"]),
    // 地点搜索
    SearchSite() {
      // console.log(this.searchInput,this.txmapkey)
      this.axios
        .get("api/search", {
          params: {
            keywords: this.searchInput,
            key: this.txmapkey
          }
        })
        .then(res => {
          this.searchSiteArr = res.data.districts;
          console.log(res.data.districts);
        });
    },
    // 添地点方法
    showSite(item) {
      this.searchSiteArr = null;
      this.searchInput = null;
      if (this.siteArr.indexOf(item.name) == -1) {
        this.siteArr.push(item.name);
      } else {
        console.log("该地区已经存在");
      }
    },
    // 更换定位的方法
    changeSiteKey(val, key) {
      if (this.buttonShow) {
        this.siteKey = key;
        this.changeSite(val);
        this.setisCeshow(false);
      }
    },
    // 更改编辑页面显示
    changeButtonShow() {
      this.buttonShow = !this.buttonShow;
    },
    // 编辑数组方法
    delSiteArr(val) {
      this.siteArr.splice(val, 1);
    }
  },
  watch: {
    // 监听site对的变化进行数据绑定的点修改
    site: function(val) {
      this.siteArr[this.siteKey] = val;
    },
    // 监听数组变化
    siteArr:function(){
      this.siteKey=this.siteArr.indexOf(this.site)
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
.setsite-view {
  height: 100vh;
  width: 100vw;
  .setsite-top {
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
    color: rgb(105, 105, 105);
    .icon {
      float: left;
      line-height: 40px;
      font-size: 20px;
    }
  }
  .setsite-body {
    .sitearr-list {
      .sitearr-list-view {
        line-height: 30px;
        font-size: 18px;
        text-align: center;
        color: rgb(133, 133, 133);
        border-bottom: 1px solid rgb(235, 235, 235);
        margin: 0 10px;
      }
    }
    .sitearr-list-null {
    }
  }
  .setsite-bodyArr {
    .sitearr-list-view {
      line-height: 50px;
      font-size: 20px;
      margin: 5px 15px;
      border-radius: 10px;
      padding-left: 20px;
      background-color: white;
      border-bottom: 1px solid rgb(221, 221, 221);
      color: rgb(117, 117, 117);
      &.checked {
        background-color: #f5f5f5;
      }
    }
    .del-icon {
      position: relative;
      background-color: red;
      color: white;
      border-radius: 50%;
      height: 18px;
      width: 18px;
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      text-align: center;
      top: -1px;
    }
  }
}
.setsite-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100vw;
  z-index: 3000;
  .setsite-change {
    height: 50px;
    width: 70%;
    background-color: yellow;
    line-height: 50px;
    text-align: center;
    margin: 0 auto;
    border-radius: 10px;
    color: white;
    background-color: rgb(85, 189, 253);
  }
}
</style>