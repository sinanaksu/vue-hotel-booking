<template>
  <div id="app">
    <TheHeader />
    <transition name="fade" mode="out-in">
    <router-view 
    @topCitys="topCity($event)" 
    :topLocalCityProp="topLocalCity" 
    :topWorldCityProp="topWorldCity" 
    />
    </transition>

    <footer id="sticky-footer" class="flex-shrink-0 mt-4 py-4 text-white">
      <div class="container text-center">
        <small>Copyright &copy; 2021</small>
      </div>
    </footer>

  </div>
</template>

<script>

import TheHeader from '/components/TheHeader.vue'

export default {
  name: 'App',
  data () {
    return {
      topLocalCity: [],
      topWorldCity: [],
    }
  },
  components: {
    TheHeader
  },
  methods: {
    topCity(v){
      this.topLocalCity = v.topLocalCity;
      this.topWorldCity = v.topWorldCity;
    }
  }
}
</script>

<style>

html, body {
  font-family: Inter !important;
}

#app {
  background-color: rgb(255, 255, 255);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

#sticky-footer {
  background-color: #070b2a;
}
</style>
