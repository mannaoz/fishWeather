<template>
  <div class="map">
    <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" class="search" />
    <baidu-map :center="center" :zoom="zoom" @ready="handler" class="map-con">
      <bm-marker
        :position="center"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
        :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"
      ></bm-marker>
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <bm-view class="map"></bm-view>
      <div class="listMap" ref="wrapper">
        <div class="minList">
          <bm-local-search :keyword="setKeyword" :auto-viewport="true" :location="site"></bm-local-search>
        </div>
      </div>
    </baidu-map>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Search } from "vant";
import Bscroll from "better-scroll";
export default {
  data: () => ({
    center: { lng: 0, lat: 0 },
    location: {},
    zoom: 3,
    boolMap: true,
    keyword: "",
    setKeyword: ""
  }),
  components: {
    // 注册自己要使用的数据
    [Search.name]: Search
  },
  methods: {
    handler({ BMap, map }) {
      this.init();
      console.log(BMap, map);
      this.center.lng = this.location.lng;
      this.center.lat = this.location.lat;
      this.zoom = 15;
    },
    init() {
      this.axios({
        method: "get",
        url: "api/jwd",
        params: {
          address: this.site,
          ak: "M84eoH8HY49NOxTDDgPGRaAWo0EhpYlR",
          output: "json"
        }
      }).then(res => {
        this.location = res.data.result.location;
      });
    },
    btn(val) {
      console.log(val);
      this.boolMap = val;
    }
  },
  mounted() {
    this.init();
    this.scroll = new Bscroll(this.$refs.wrapper,{
      click:true
    });
  },
  computed: {
    ...mapState(["site"])
  },
  watch: {
    site: {
      immediate: true, //监听自动调用一次
      handler: function() {
        this.init();
      }
    },
    keyword: {
      immediate: true, //监听自动调用一次
      handler: function(newVal) {
        this.init();
        if (newVal) {
          this.setKeyword = newVal;
        } else {
          this.setKeyword = this.site.slice(0, 1);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  z-index: 1000;
}
.map {
  height: 100%;
  height: 55vh;
  .map-con {
    height: 100%;
    width: 100%;
    padding-top: 50px;
  }
}
.listMap {
  height: 30vh;
  overflow: hidden;
}
.minList {
  // min-height: 500vh;
  width: 100%;
  overflow: auto;
}
.map-box {
  height: 100%;
  width: 100%;
}
</style>