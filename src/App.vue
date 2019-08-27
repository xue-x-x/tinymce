<template>
  <div id="app">
    <headerV></headerV>
    <el-container class="content-box">
      <el-aside style="width: 25%">
        <router-view name="style" :contentHeight="contentHeight"></router-view>
      </el-aside>
      <el-aside  style="width: 75%" :height="tinymceHeight">
        <router-view v-model="msg"
                     :disabled="disabled"
                     @onClick="onClick"
                     ref="editor"
                     :contentHeight="tinymceHeight"
        >
        </router-view>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import footerV from './components/footer'
  import headerV from './components/header'
export default {
  name: 'App',
  components: {
    headerV,
    footerV
  },
  data() {
    return {
      msg: '123123',
      disabled: false,
      contentHeight:0,
      tinymceHeight:0
    }
  },
  methods: {
    //鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked');
      console.log(e);
      console.log(editor);
    },
    //清空内容
    clear() {
      this.$refs.editor.clear()
    }
  },
  mounted(){
    const _this=this;
//      _this.contentHeight = document.documentElement.clientHeight - 73.992;
    _this.contentHeight = document.documentElement.clientHeight;

    window.onresize = function temp() {
      _this.contentHeight = document.documentElement.clientHeight;

    };
    _this.tinymceHeight=_this.contentHeight - 73.99;
  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
/*}*/
.content-box{
  margin-top: 10px;
}
</style>
