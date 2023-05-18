import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//??
import store from "./store/index";

import VueLazyload  from "vue-lazyload";


Vue.config.productionTip = false

// Vue.use(ElementUI,{size:"small"});
Vue.use(VueLazyload)



new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

