<template>
  <header class="header">
    <div class="wrap">
      <div class="fl  logo">
        <a href="javascript:;">
          <div class="logo-img">
            <img src="../assets/logo.png" alt="">
          </div>
          <div class="fs_18 logo-font">自媒体工具</div>
        </a>
      </div>
      <div class="fr header-list">
        <nav class="nav">
          <ul class="list-ul">
            <li><a :href="urlList.original">原创分析</a></li>
            <li><a :href="urlList.profanity">违禁词检测</a></li>
            <li><a :href="urlList.article_list">文章编辑器</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>

  export default {
    data() {
      return {
        url:'http://tools.xinba.com',
        urlList:{
          original:'/inspection/original',
          profanity:'/inspection/profanity',
          article_list:'/inspection/article_list',
          login:'/inspection/login',
          register:'/inspection/register',
        }
      }
    },
    mounted() {
/*      this.url=location.host;
      this.urlList={
        original:this.url+'/inspection/original',
        profanity:this.url+'/inspection/profanity',
        article_list:this.url+'/inspection/article_list',
        login:this.url+'/inspection/login',
        register:this.url+'/inspection/register',

      }*/
    },
    methods: {

    },
    watch: {

    }
  }

</script>
<style scoped>
  /* header */
  .header {
    background-color: #338cff;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  }
  .header a {
    color: #fff;
  }
  .header .wrap {
    height: 64px;
    line-height: 64px;
  }
  .header .logo {
    position: relative;
  }
  .header .logo .logo-img {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 30px;
  }
  .header .logo .logo-font {
    padding-left: 50px;
  }
  .header .header-list {
    display: flex;
  }
  .header .header-list .nav ul {
    display: flex;
    justify-content: space-around;
  }
  .header .header-list .nav ul a {
    text-align: center;
  }
  .header .header-list .nav .list-ul {
    width: 360px;
  }
  .header .header-list .nav .register-ul {
    position: relative;
    padding: 0 5px;
    width: 170px;
    height: 100%;
  }
  .header .header-list .nav .register-ul:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 1px;
    height: 20px;
    background-color: #ccc;
  }
  .header .header-list .nav .register-ul li:first-child {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    left: 5px;
  }
  .header .header-list .nav .register-ul li a {
    display: block;
    width: 76px;
    height: 32px;
    line-height: 32px;
  }
  .header .header-list .nav .register-nav {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
    background: #fff;
    border-radius: 4px;
  }
  .header .header-list .nav .register-nav a {
    color: #006FFF;
  }
</style>
