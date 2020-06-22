<template>
  <div>
    <van-calendar v-model="show" @confirm="onConfirm" color="#6cbfff" />
    <div class="fishtodo">
      <div class="todo-header">
        <h1 class="header-text">待办事项</h1>
        <van-search v-model="todoSearchTxt" placeholder="请输入搜索关键词" input-align="center" @input="searchInput()"/>
        <van-cell title="选择单个日期" :value="date" @click="show = true"/>

        <div :class="{'add-list':true,'textinput':isTextInputShow}" @click="isTextInput(true)">
          <i v-show="!isTextInputShow">+</i>
          <div class="text-input" v-show="isTextInputShow">
            <h1 class="text-input-tittle">添加备忘录</h1>
            <textarea type="text" v-model="todoTxt" />
            <div class="text-input-button">
              <button @click.stop="isTextInput(false)">关闭</button>
              <button @click.stop="addTodo()">添加</button>
            </div>
          </div>
        </div>
      </div>
      <div class="todo-body">
        <div class="todo-body-list" v-if="!isShow">
          <p class="todo-body-text" v-show="Arrlist[date]" v-for="(item,key) in Arrlist[date]" :key="key" ref="itemArr">{{item.text}}</p>
        </div>
        <div class="todo-body-list" v-if="isShow">
          <p class="todo-body-text" v-show="Arrlist[date]" v-for="(item,key) in arrList" :key="key" ref="itemArr">{{item.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, Cell, Search } from "vant";
export default {
  data: () => ({
    today: new Date(), //设置日期
    date: "", //本身日期
    show: false, //是否显示日历表
    Arrlist: {}, //备忘录
    todoSearchTxt: null, //搜索框的文字
    todoTxt: null, //添加备忘录的文字
    isTextInputShow: false,
    isShow:false
  }),
  components: {
    // vant引入的组件
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [Search.name]: Search
  },
  methods: {
    // 改变日历显示
    formatDate(date) {
      let list = `${date.getMonth() + 1}/${date.getDate()}`;
      //  添加属性
      if (!this.Arrlist[list]) {
        this.$set(this.Arrlist, list, new Array());
      }
      return list;
    },
    // 改变选中日期
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    // 显示变换样式
    isTextInput(bool) {
      this.isTextInputShow = bool;
      console.log(this.isTextInputShow);
    },
    // 添加备忘录
    addTodo() {
      let obj = {};
      obj.text = this.todoTxt;
      this.Arrlist[this.date].push(obj);
      this.isTextInput(false);
      this.todoTxt = null;
    },
    // 自己测试
    test() {
      this.Arrlist[this.date].push("nigger");
      console.log(this.Arrlist);
    },
    // 搜索显示
    searchInput(){
     let bool =/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(this.todoSearchTxt);
     this.isShow=bool
    }
  },
  mounted() {
    // 开始加载选中今天
    this.onConfirm(this.today);
  },
  computed: {
    arrList(){
      for(let key in this.Arrlist){
        console.log(this.arrList[key])
      }
      return []
    }
  },
};
</script>

<style lang="scss">
.fishtodo {
  position: relative;
  .todo-header {
    .header-text {
      height: 4vh;
      line-height: 4vh;
      font-size: 18px;
      text-align: center;
      color: #757575;
      font-weight: 600;
    }
    .add-list {
      position: fixed;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: rgb(152, 210, 255);
      color: white;
      font-size: 30px;
      bottom: 80px;
      right: 20px;
      z-index: 2000;
      transition: all 0.3s;
      i {
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
    .textinput {
      right: 50%;
      bottom: 50%;
      width: 80vw;
      height: 60vh;
      background-color: rgb(251, 251, 251);
      border-radius: 5px;
      border: 1px solid rgb(193, 193, 193);
      transform: translate(50%, 50%);
      color: black;
    }
    .text-input {
      position: relative;
      h1 {
        text-align: center;
        font-size: 18px;
        line-height: 5vh;
        color: rgb(79, 79, 79);
        font-weight: 600;
      }
      textarea {
        color: black;
        border: none;
        width: 79vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        height: 45vh;
        border: 1px solid rgb(209, 209, 209);
      }
      .text-input-button {
        display:flex;
        justify-content: space-around;
        height: 8vh;
        button {
          height: 5vh;
          margin-top: 1.5vh;
          border: none;
          color: white;
          border-radius: 5px;
          background-color: #98d2ff;
        }
      }
    }
    position: fixed;
    width: 100vw;
    background-color: white;
  }
  .todo-body {
    .todo-body-list {
      padding-top: 18vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .todo-body-text {
        display: inline-block;
        width: 43vw;
        min-height: 20vw;
        max-height: 70vw;
        // border-radius: 10px;
        border: 1px solid #d1d1d1;
        color: rgb(111, 111, 111);
        margin: 5px;
        overflow: hidden;
        white-space: wrap;
        word-wrap:break-word;
        text-align: left;
        line-height: 20px;
        padding: 0 1vw;
      }
    }
  }
}

</style>