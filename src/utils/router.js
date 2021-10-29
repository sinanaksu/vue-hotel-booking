import Home from '../components/TheHome.vue'
import HotelList from '../components/HotelList.vue'
import HotelView from '../components/HotelView.vue'

export const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/hotels/:city/:obj/:name', name: 'Hotels', component: HotelList  },
    { path: '/hotel/:obj/:name', name: 'Hotel', component: HotelView  }

  ]


  