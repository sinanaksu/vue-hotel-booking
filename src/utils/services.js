
  import axios from "axios";

  export const service = {
    data() {
        return {
            apiURL: "https://sinanaksu.com/r/api/hotels?"
        }
    },
    methods: {
        getUserCity() {
            axios
            .get("http://ip-api.com/json/")
            .then(response => {
                this.getSearch(response.data.regionName,true)
                this.searchText = response.data.city
            })
            
        },
        getSearch(str,start = false) {
            axios
            .get(this.apiURL + "q=" + str)
            .then(response => {
                start ? this.searchText = Object.values(response.data.data)[0].name :''
                this.searchList = response.data.data
                this.searchCity = Object.values(response.data.data)[0].cityId
                this.searchObject = Object.values(response.data.data)[0].ObjectId
            })
        },
        getHomeList() {
            axios
            .get(this.apiURL + "h=1")
            .then(response => {
                this.topLocalCity = response.data.data.local
                this.topWorldCity = response.data.data.world
                this.$emit("topCitys", {"topLocalCity":response.data.data.local, "topWorldCity":response.data.data.world});
            })
        },
        getHotelList(cityId,objectId,checkIn,checkOut,adults,child) {
            this.hotelList = []
            axios
            .get(this.apiURL + "cid=" + cityId + "&oid=" + objectId + "&in=" + checkIn + "&out=" + checkOut + "&adults=" + adults + "&child=" + child + "&childAge=")
            .then(response => {
                this.hotelList = response.data.data
            })
        },
        getHotel(objectId,checkIn,checkOut,adults,child) {
            axios
            .get(this.apiURL + "hid=" + objectId + "&in=" + checkIn + "&out=" + checkOut + "&adults=" + adults + "&child=" + child + "&childAge=")
            .then(response => {
                this.con(response.data.data)
            })
        },

        toSeoUrl(url) {
            var encodedUrl = url.toString().toLowerCase();       
            encodedUrl = encodedUrl.split(/&+/).join("-and-")
            encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       
            encodedUrl = encodedUrl.split(/-+/).join("-");
            encodedUrl = encodedUrl.trim('-'); 
            return encodedUrl;
        }
      }
}