<template>
<div class="container mt-4">
    <div class="row mb-4">
      <div class="col">
        Search results for <span class="fw-bold">{{ this.$route.params.name.replaceAll("-"," ").toUpperCase() }}</span>
        <hr/>
      </div>
    </div>

          <div v-if="hotelList.length">
            <div class="row">
              <div v-for="(hotel, index) of hotelList" :key="index" class="col-12" >

                <div class="hotel-card bg-white rounded-lg shadow overflow-hidden d-block mb-3 d-lg-flex" style="border-radius:15px;">
                  <div class="hotel-card_images" style="border-radius:15px;">
                    <div :id="'bootstrapCarousel' + index" :ref="'bootstrapCarousel' + index" class="carousel slide h-100" data-ride="carousel">
                      <div class="carousel-inner h-100">
                        <div class="carousel-item h-100" :class="{ 'active': ii === 0 }" v-for="(image, ii) of hotel.content.images.hotelImages" :key="ii" v-bind:style="{ backgroundImage: 'url(' + image.urls[0].value + ')' }" >
                        </div>
                      </div>
                      <a class="carousel-control-prev" :ref="'#bootstrapCarousel' + index" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" :ref="'#bootstrapCarousel' + index" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                  <div class="hotel-card_info p-4">
                    <div class="d-flex align-items-center mb-2">
                      <h5 class="mb-0 mr-2 fw-bold">{{hotel.content.informationSummary.displayName}} </h5>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="hotel-card_details">
                      <div>
                        <i class="fa fa-star text-warning" v-for="iiii in parseInt(hotel.content.informationSummary.rating)" :key="iiii" ></i>
                      </div>
                        <div class="text-muted mb-2"><i class="fas fa-map-marker-alt"></i> {{hotel.content.informationSummary.address.city.name}} / {{hotel.content.informationSummary.address.area.name}} </div>
                        <div class="mb-2" v-if="hotel.content.reviews.cumulative"><span class="badge bg-primary"> {{ hotel.content.reviews.cumulative.score }} </span> {{ hotel.content.reviews.cumulative.reviewCount }} reviews </div>
                        <ul class="hotel-checklist pl-0 mb-0">
                          <li v-for="(fac, iii) of hotel.enrichment.roomInformation.facilities" :key="iii" >
                            <i :class="'text-success ficon ficon-' + fac.symbol"></i> {{ fac.propertyFacilityName }}</li>
                        </ul>
                      </div>
                      <div v-if="hotel['isAvailable'] == true" class="hotel-card_pricing text-center">
                        <h4>$ {{ hotel["inPrice"].toFixed(2)  }} </h4>
                        <h3>$ {{ hotel["exPrice"].toFixed(2)  }} </h3>
                        <h6 class="text-success text-center">  {{ hotel["disPrice"].toFixed(2)  }}% off</h6>
                        <button class="btn btn-primary" @click="goHotel(hotel.content.informationSummary.displayName,hotel.propertyId)">Select Room</button>
                      </div>
                      <div v-else class="hotel-card_pricing text-center">
                        <h3 class="text-danger">Sold</h3>
                        <button class="btn btn-primary disabled" disabled>Select Room</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
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

export default {
  name: 'hotelList',
  data () {
    return {
      hotelList: [],
      cityId: this.$route.params.city,
      onjectId: this.$route.params.obj,
    }
  },
  mixins: [service],
  components: {

  },
  methods: {
    con(val){
console.log(val);
    },

    goHotel(name,objectId){
        this.$router.push({ path: '/hotel/' + objectId + '/' + this.toSeoUrl(name) }).catch(()=>{})
    },
    listRefresh(){
        this.getHotelList(this.$route.params.city,this.$route.params.obj,"2021-11-11","2021-11-22",2,1)
        console.log(this.$route)
    }
  },
  mounted(){
    this.listRefresh()
  },
  watch: {
    '$route' (){
        this.listRefresh()
    }
}
  /*
  afterRouteUpdate(to, from, next) {
    this.listRefresh()
    next();
  },
  */

}
</script>

<style scoped>
@import "../assets/ficon.css";

.shadow {
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.06) !important;
  margin-bottom:30px !important;
  border:1px solid rgb(228, 228, 228);
}
.shadow:hover {
	box-shadow: 0 5px 19px rgba(0, 0, 0, 0.3) !important;
}

.hotel-card .hotel-card_images {
	flex: 2;
}
.hotel-card .hotel-card_images .carousel-item  {
	object-fit: cover;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-size:cover;
}


.hotel-card .hotel-card_info {
	flex: 3;
}

.hotel-card .amnities img {
	max-height: 20px;
}

.hotel-card .hotel-checklist {
	list-style-type: none;
}

.hotel-card_pricing h4{
color: red;
font-size: 18px;
text-decoration:line-through;
}


.carousel .carousel-control-prev {
	background: linear-gradient(to right, #333333bb, #33333300);
}

.carousel .carousel-control-next {
	background: linear-gradient(to left, #333333bb, #33333300);
}
</style>