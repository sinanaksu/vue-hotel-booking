<template>
<div class="container mt-4">

          <div v-if="hotel.hotelId !== undefined">

            <div class="row mb-4">
            <div class="col-12">
                <span class="fw-bold me-3">{{ hotel.hotelInfo.englishName }} </span>
                <i class="fa fa-star text-warning" v-for="iiii in parseInt(hotel.hotelInfo.starRating.value)" :key="iiii" ></i>
                <br /><span class="me-3">{{ hotel.hotelInfo.address.full }}</span>
                <hr/>
                <span class="badge bg-light me-3 text-success" v-for="(val, iii) of hotel.featuresYouLove.features" :key="iii">
                <i :class="'text-success fw-bold ficon ' + val.icon"></i><span class="ms-3" v-html="val.text"></span>
                </span>

            </div>

            </div>

            <div class="row mb-4">
              <div class="col-6 pt-4 border border-1" style="height:400px; overflow:hidden; border-radius:5px;" >
                <VueSlickCarousel :arrows="true" v-bind="settings" style="margin-left:20px;margin-right:20px;">
                <div v-for="(image, index) of hotel.mosaicInitData.images" :key="index" >
                    <center>
                        <img style="height:100%;" :src="image.locationMediumRectangle" />
                    </center>
                </div>
                </VueSlickCarousel>
              </div>
              <div class="col-6" >
                <div class="row">
                  <div class="col-11 offset-md-1 border border-1 mb-1 pe-0 " style="border-radius:5px;"
                   v-for="(room, index) of hotel.roomGridData.masterRooms" :key="index">
                    <div class="float-start fw-bold">{{room.rooms[0].name}} </div>
                    <div class="float-center">{{room.beforeDiscountPrice}}</div><br>
                    <div class="float-end"><button class="btn btn-primary me-0">Reserve</button></div><br>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <b-tabs content-class="mt-3">
                <b-tab title="Features" active>
                  

                  <div class="col-12 mb-4 mt-4" v-for="(group, ii) of hotel.aboutHotel.featureGroups" :key="ii">
                    <i :class="'text-success fw-bold ficon ficon-' + group.symbol"></i><span class="ms-3 fw-bold" v-html="group.name"></span>
                    <hr class="mt-0 mb-1" />
                    <div class="row">
                      <div class="col-4" v-for="(val, iii) of group.feature" :key="iii">
                      <i :class="'text-success fw-bold ficon ' + val.formattedIconCss"></i><span class="ms-3" v-html="val.name"></span>
                      </div>
                    </div>
                  </div>


                </b-tab>
                <b-tab title="Comments">
                  
                  <div class="row">
                    <div class="col-6 p-2 h-100" v-for="(comment, ii) of hotel.comments" :key="ii">
                      <div class="card p-3">
                          <div class="d-flex justify-content-between align-items-center">
                              <div class="user d-flex flex-row align-items-center">
                                <span>
                                  <small class="fw-bold text-primary">{{ comment.reviewerInfo.displayMemberName }} </small>
                                  <small class="text-secondary">: {{ comment.ratingText }}</small>
                                  <small class="ps-4 text-right"> {{ comment.formattedReviewDate }}</small>
                                </span>
                              </div>
                          </div>
                          <span v-if="reviewComments !== ''">{{ comment.reviewComments }}<br /></span>
                          <span v-elseif="reviewComments === '' && reviewPositives !== ''" v-html="comment.reviewPositives"><br /></span>
                          <div class="action d-flex justify-content-between mt-2 align-items-center">
                              <div class="align-items-right">
                                <span class="badge bg-primary">{{ comment.rating }}</span>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>


                </b-tab>
                <b-tab title="Map">
                  <iframe
                  :src="'https://maps.google.com/maps?q=' + hotel.mapParams.latlng[0] + ',' + hotel.mapParams.latlng[1] + '&hl=es;z=10&amp;output=embed'"
                  height="600"
                  width="100%"
                  />
                </b-tab>
              </b-tabs>
            </div>



          </div>
          <div v-else class="row bg-light p-5 border border-3 rounded-3">
            <div class="col-2">
              <div class="d-flex justify-content-center">
                  <div class="spinner-grow d-flex text-primary" role="status"></div>
              </div>
            </div>
            <div class="col">
              <span><b>Please wait.</b><br />We are looking for the best hotel options for you.  </span>
            </div>
          </div>
        





  </div>
</template>

<script>
import { service } from '../utils/services'
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  name: 'HotelView',
  data () {
    return {
      hotel: {},
      onjectId: this.$route.params.obj,
      settings: {
          "dots": false,
          "focusOnSelect": false,
          "fade": true,
          "infinite": true,
          "speed": 500,
          "slidesToShow": 1,
          "slidesToScroll": 3,
          "touchThreshold": 5,
         // "variableWidth": true
          }
    }
  },
  mixins: [service],
  components: {
    VueSlickCarousel 
  },
  methods: {
    con(val){
    this.hotel = val;
    console.log(this.hotel.hotelId)
    },
    loadHotel(){
        this.getHotel(this.$route.params.obj,"2021-11-11","2021-11-22",2,1)
    }
  },
  beforeMount(){
    this.loadHotel()
  }
}
</script>

<style scoped>
@import "../assets/ficon.css";



</style>