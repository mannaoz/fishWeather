<template>
  <div class="tip" :class="{show:isShow}">{{msg}}</div>
</template>
<script>
export default {
  name: "Tip",
  data: () => ({
    isShow: false,
    msg: "暂无消息"
  }),
  methods: {
    // 设置提示启动
    setShow(msg, time) {
      this.isShow = true;
      this.msg = msg;
      setTimeout(() => {
        this.isShow = false;
      }, time + 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.tip {
  position: absolute;
  left: 50%;
  top: -100px;
  transform: translateX(-50%);  
  transition: all 0.5s;
  width: 95%;
  height: 40px;
  background-color: rgb(235, 235, 235);
  // border-radius: 10px;
  z-index: 9999;
  // box-shadow: 0px 0px 8px rgb(218, 218, 218);
  text-align: center;
  line-height: 40px;
  color: rgb(90, 90, 90);
}
.show {
  top: 10px;
}
</style>