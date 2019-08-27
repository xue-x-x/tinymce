<template>
  <div id="app">
    <headerV></headerV>
    <section>
      <router-view/>
    </section>
    <!--<footerV></footerV>-->
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
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
