import Vue from 'vue'
import App from './App'
import store from './store/index'
import Fly from "flyio/dist/npm/wx"
var fly = new Fly
fly.config.baseURL = 'http://47.106.115.52:19091' // 配置请求基地址
// fly.config.baseURL = 'https://uns0w5xq.qcloud.la' // 配置请求基地址
Vue.prototype.$http = fly

Vue.prototype.$store = store

var loadingCounter = 0;

function showLoading() {
  if (loadingCounter == 0) {
    wx.showLoading({
      title: "正在加载..."
    });
  }
  loadingCounter++;
}

function hideLoading() {
  if (loadingCounter <= 0) {
    return false;
  }
  loadingCounter--;
  if (loadingCounter == 0) {
    wx.hideLoading();
  }
}
fly.interceptors.request.use((request) => {
  showLoading();
});
fly.interceptors.response.use((response) => {
  hideLoading()
})

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
