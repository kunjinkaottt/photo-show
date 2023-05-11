<template>
  <div id="app">
    <Header />
    <Tab/>
    <!-- <WaterFall/> -->
    <!-- <HelloWorld/> -->
    <LocalImg/> 
    <Dialog/> 

  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tab from "./components/Tab.vue";
// import HelloWorld from './components/HelloWorld.vue'
// import WaterFall from "./components/WaterFall.vue";
import LocalImg from "./components/LocalImg.vue";
import Dialog from "./components/Dialog.vue";


// 随机图片api
// https://source.unsplash.com/random 

export default {
  name: 'App',
  components: {
    Header,
    Tab,
    // HelloWorld,
    // WaterFall,
    LocalImg,
    Dialog
  },

}
</script>

<style>

</style>
