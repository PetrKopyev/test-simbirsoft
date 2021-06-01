<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style lang="scss">
$fontFamily: Avenir, Helvetica, Arial, sans-serif;


#app {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-picker-panel {
  font-family: $fontFamily;
}

.container {
  max-width: 100%;
  margin: 0 100px;

  @media screen and (max-width: 1080px) {
    margin: 0 60px;
  }

  @media screen and (max-width: 900px) {
    margin: 0 20px;
  }
}
</style>
