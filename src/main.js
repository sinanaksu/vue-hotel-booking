import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import { routes } from './utils/routers'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

Vue.use(VueSlickCarousel)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuelidate)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

