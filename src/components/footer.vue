<template>
  <footer class="footer">
    <div class="footer-bottom">
      <div class="wrap">
        <div class="link-friend">
          友情链接：
          <a href="http://www.xinba.com/" target="_blank">辛巴数据</a>
        </div>
        <div class="copyright">
          <p>©2017 All Rights Reserved.</p>
          <p>信息产业部备案号：<a href="http://www.miitbeian.gov.cn">苏ICP备17037124号-2</a></p>
          <p>徐州稻壳信息科技有限公司（辛巴数据)版权所有</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

  export default {
    data() {
      return {


      }
    },
    mounted() {

    },
    methods: {

    },
    watch: {

    }
  }

</script>
<style scoped>
  /* footer */
  .footer {
    width: 100%;
    height: 100px;
    background-color: #0E1833;
    font-size: 14px;
  }
  .footer .footer-bottom {
    padding: 10px 0;
    color: #fff;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }
  .footer .footer-bottom .link-friend {
    font-size: 14px;
  }
  .footer .footer-bottom a {
    color: #fff;
    font-size: 14px;
  }
  .footer .footer-bottom .copyright p {
    display: inline-block;
  }
</style>
