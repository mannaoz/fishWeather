<template>
  <div id="main" style="width: 100%; height:100%;" ref="min"></div>
</template>

<script>
export default {
  props: {
    //   传值设置图标属性
    option: {
      type: Object,
      required: true
    }
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    }
  },
  mounted() {
    this.myEcharts();
  },
  //   监听属性进行变化
  watch: {
    option: {
      handler: function(val) {
          this.option=val
        this.myEcharts();
      }
    }
  }
};
</script>