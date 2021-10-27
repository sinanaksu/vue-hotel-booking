<template>
  <div>
    <header>

      <nav class="navbar navbar-expand-lg nav-blue">
          <div class="container">
            <router-link to="/" class="navbar-brand fw-bold"> <i class="fas fa-bed"></i> HOTEL</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbars">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <b-row>
                  <b-col class="text-end"><span  class="me-3 text-dark">Register</span> <span class="ms-3 text-dark">Sign In</span></b-col>
                </b-row>
            </div>
          </div>
        </nav>

      <div class="container mt-4 ">
        <div class="d-flex h-100 align-items-center">
          <div class="w-100 text-white mt-4">
            <p class="fs-3 mb-3 mt-4 fw-bold text-dark">Where are you going?</p>
            <div class="row searchBar d-flex ">
              <div class="col-3 v-autocomplete">
                <div class="v-autocomplete-input-group">
                <input type="text" v-model="searchText" v-on:keyup="autoComplateShow" placeholder="City, Hotel"  class="form-control">
                </div>
                <div class="v-autocomplete-list" v-if="searchShow">
                  <div class="d-flex align-items-center m-2 fs-6 text" v-if="searchLoad">
                    Loading...
                    <div class="spinner-border ms-auto spinner-search" role="status" aria-hidden="true"></div>
                  </div>
                  <ul class="list-group list-group-flush">
                    <button type="button" class="list-group-item list-group-item-action" 
                    v-for="(search, index) of searchList" :key="index" @click="selectSearch(search.name,search.cityId,search.ObjectId)">{{search.name}}</button>
                  </ul>
                </div>
              </div>
              <div class="col-3 ps-0">
                <HotelDatePicker :hoveringTooltip="false"></HotelDatePicker>
              </div>
              <div class="col-3 ps-0">

                  <b-dropdown text="1 Adult, 0 Child, 1 Room" block variant="primary" menu-class="w-100" toggle-class="d-block w-100 text-black bg-white personButton">
                  Select guest
                </b-dropdown>

              </div>
              <div class="col-1 ps-0">
                  <span class="btn btn-warning d-block" @click="goHotelSearch">Search</span>
              </div>
              <div class="col-2 ps-0">
                  <span class="btn btn-warning d-block" >I'm Feeling Lucky</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
    
  </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker'
import { service } from '../utils/services'
export default {
  name: 'theHeader',
    props: {
    msg: String
  },
  data() {
    return {
      searchText: "",
      searchCity: 0,
      searchObject: 0,
      searchList: [],
      searchShow: false,
      searchLoad: false,
      searchTime: false
    }
  },
  mixins: [service],
  components: {
    HotelDatePicker
  },
  methods:{
        autoComplateShow () {
          this.searchList = []
          this.searchLoad = true
          this.searchShow = true
          this.getSearch(this.searchText);
          this.searchLoad = false;
        },
        selectSearch (select,cityId,ObjectId) {
            if(select) { this.searchText = select; this.searchCity = cityId; this.searchObject = ObjectId;  }
            this.searchList = []
            this.searchLoad = false
            this.searchShow = false
        },
        goHotelSearch(){
          this.selectSearch(false)
          this.$router.push({ path: '/hotels/' + this.searchCity + '/' + this.searchObject + '/' + this.toSeoUrl(this.searchText) }).catch(()=>{})
        }

  },
    computed: {
      
  },
  watch: {
    
  },
  mounted() {
    this.getUserCity();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.navbar-brand {
  font-family: 'Inter', sans-serif !important;
  font-weight: 900 !important;
  font-size: 22px !important;

}
.personButton {
      border: 1px solid #ced4da !important;
}
  .spinner-search {
      width: 1rem !important;
      height: 1rem !important;
  }
  .v-autocomplete {
    position: relative;
    z-index: 999;
  }
  .v-autocomplete .v-autocomplete-list {
    position: absolute;
    background-color: #fff;
    color:#000;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    border:1px solid #ccc;
    width: 90%;
    margin-top:-1px;
    padding:0;
  }
  .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item {
    cursor: pointer;
  }
  .v-autocomplete .v-autocomplete-list .v-autocomplete-list-item.v-autocomplete-item-active {
    background-color: #f3f6fa;
  }

header {
  position: relative;
  background-color: black;
  height: 350px;
  min-height: 10rem;
  width: 100%;
  background-image: url("../assets/searchBg2.jpg");
  background-size: cover;
  background-position: center;

}



.vhd__datepicker__wrapper {
    border-radius: 0.25rem !important;
    height: 2.3em !important;
}

.vhd__datepicker__dummy-wrapper {
    border-radius: 0.25rem !important;
    border: 0 !important;

}

.vhd__datepicker__input {
  line-height: 2.7em !important;
  height: 2.6em !important;
}
.vhd__datepicker {
    position: absolute;
    top: 2.3em !important;
    border-radius: 0.25rem !important;
}

.vhd__datepicker__month-day--first-day-selected, .vhd__datepicker__month-day--last-day-selected {
    background: #0B69FF !important;
}

.vhd__datepicker__month-day--selected {
    background-color: rgba(58, 120, 255, 0.7) !important;
}

.vhd__datepicker__month-day--today .vhd__datepicker__month-day-wrapper {
    border: 1px solid #0B69FF !important;
    color: #000000 !important;
}

.vhd__datepicker__month-button {
    border: 1px solid #4a8efc !important;
}


.nav-blue {
border-top: 5px solid #0B69FF;
color:#0B69FF !important;
background-color: #fff !important;
box-shadow: 1px 11px 27px -8px rgba(0,0,0,0.7);
-webkit-box-shadow: 1px 11px 27px -8px rgba(0,0,0,0.7);
-moz-box-shadow: 1px 11px 27px -8px rgba(0,0,0,0.7);

}

.searchBar {
  background: rgb(36,127,255);
  background: linear-gradient(0deg, rgba(36,127,255,1) 0%, rgba(105,167,255,1) 100%);
  padding: 15px 5px;
  border-radius: 8px;
  box-shadow: 1px 11px 27px -8px rgba(0,0,0,0.3);
  -webkit-box-shadow: 1px 11px 27px -8px rgba(0,0,0,0.3);
  -moz-box-shadow: 1px 11px 27px -8px rgba(0,0,0,0.3);
}

</style>
