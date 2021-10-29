import Home from '../components/theHome.vue'
import hotelList from '../components/hotelList.vue'
import hotelView from '../components/hotelView.vue'

export const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/hotels/:city/:obj/:name', name: 'Hotels', component: hotelList  },
    { path: '/hotel/:obj/:name', name: 'Hotel', component: hotelView  }

  ]


  