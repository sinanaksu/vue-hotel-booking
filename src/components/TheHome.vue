<template>
<div class="container mt-4">

        <div v-if="topLocalCity.length">
            <div class="topCard">
            <div class="text-center mb-3">
            <h5>Popular travel destinations in Turkey.</h5>
            <hr/>
            </div>
            <VueSlickCarousel :arrows="true" :dots="true" v-bind="settings" class="pt-3 pb-3 mb-3" >
            <div v-for="(city, index) of topLocalCity" :key="index">
                <center>
                <a  type="button" @click="goHotelCity(city.cityName,city.cityId)">
                <img class="rounded-pill" width="130" :src="city.image" /> <br/>{{city.hotels}} hotels<br/><b>{{city.cityName}}</b>
                </a>
                </center>
            </div>
            </VueSlickCarousel>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div class="alert alert-danger mt-3 border-0" role="alert">
        Get the advice you need. Check the latest COVID-19 restrictions before you travel.<br/>People who will visit Turkey should get a HES code.
        </div>




        <div v-if="topWorldCity.length">
            <div class="topCard">
            <div class="text-center mb-3">
            <h5>Popular travel destinations out Turkey.</h5>
            <hr/>
            </div>
            <VueSlickCarousel :arrows="true" :dots="true" v-bind="settings" >
            <div v-for="(city, index) of topWorldCity" :key="index" >
                <center>
                    <a type="button" @click="goHotelCity(city.cityName,city.cityId)">
                    <img class="rounded-pill" width="130" :src="city.image" /> <br/>{{city.hotels}} hotels<br/><b>{{city.cityName}}</b>
                    </a>
                </center>
            </div>
            </VueSlickCarousel>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>


  </div>
</template>

<script>
import { service } from '../utils/services'
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  name: 'Home',
  props: ['topLocalCityProp','topWorldCityProp'],
  data () {
      return {
          topLocalCity: this.topLocalCityProp,
          topWorldCity: this.topWorldCityProp,
          settings: {
              "centerMode": true,
                    "dots": true,
                    "focusOnSelect": false,
                    "infinite": true,
                    "speed": 500,
                    "slidesToShow": 5,
                    "slidesToScroll": 3,
                    "touchThreshold": 5
                    }
      }
  },
  components: {
    VueSlickCarousel 
  },
    mixins: [service],
    methods: {
    goHome(){
      this.$router.push({ path: '/about', query: { id: 999}})
      },
    goHotelCity(name,city){
        this.$router.push({ path: '/hotels/' + city + '/' + city + '/' + this.toSeoUrl(name) }).catch(()=>{})
    }
  },
  watch: {

  },
  created() {
    if(!this.topLocalCity.length) {
    this.getHomeList();
    }
  },


}
</script>

<style>
.topCard {
    border-radius: 10px;
    background-color: rgb(250, 250, 250);
    border:1px solid rgb(230, 230, 230);
    padding: 1rem 1rem 3rem 1rem!important;
}
.slick-prev, .slick-next {
    background-color: #b1b1b1 !important;
    border-radius: 20px;
    padding: 5px 3px 4px 5px !important;
    width: 40px !important;
    height: 40px !important;
    z-index: 999;

}
</style>