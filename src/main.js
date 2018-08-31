import Vue from 'vue'
import App from './App'
import Fly from "flyio/dist/npm/wx"
var fly = new Fly
fly.config.baseURL = 'http://47.106.115.52:19091' // 配置请求基地址
Vue.prototype.$http = fly

fly.interceptors.request.use((request)=>{
	wx.showLoading({
		title:"正在加载..."
	});
});
fly.interceptors.response.use((response)=>{
	wx.hideLoading()
})

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
