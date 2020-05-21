import Vue from 'vue'
//引入composition-api
import VueCompositionApi from '@vue/composition-api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);
Vue.use(VueCompositionApi);


Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
