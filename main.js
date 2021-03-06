import Vue from 'vue'
import App from './App'
import {myRequest} from './common/js/request.js'

Vue.prototype.$myRequest = myRequest
Vue.filter("formatDate",(data)=>{
	const nDate=new Date(data);
	const year = nDate.getFullYear().toString().padStart(2,0);
	const month = nDate.getMonth().toString().padStart(2,0);
	const day = nDate.getDay().toString().padStart(2,0);
	return year +'-'+ month +'-'+ day
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
