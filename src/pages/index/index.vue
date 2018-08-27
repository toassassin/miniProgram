<template>
  <div>
    <section>
        <div class="navbar-top">
            <div>
                <navigator url="../logs/main">请老师</navigator>
            </div>
            <div>
                <navigator url="../counter/main">当老师</navigator>
            </div>
        </div>
    </section>
    <section>
        <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" @change="change($event)">
            <block v-for="(item,index) in imgs" :index="index" :key="key">
                <swiper-item>
                    <image :src="item" class="slide-image" mode="scaleToFill" width="100%" height="100%" />
                </swiper-item>
            </block>
        </swiper>
    </section>
    <section>
        <view class="nav-box">
            <navitem :url="url_1" :text="11"></navitem>
            <navitem :url="url_2" :text="22"></navitem>
            <navitem :url="url_2" :text="22"></navitem>
            <navitem :url="url_2" :text="22"></navitem>
        </view>
        <view class="nav-box">
            <navitem :url="url_1" :text="11"></navitem>
            <navitem :url="url_2" :text="22"></navitem>
            <navitem :url="url_2" :text="22"></navitem>
            <navitem :url="url_2" :text="22"></navitem>
        </view>
    </section>
  </div>
</template>

<script>
import navitem from "../../common/iconitem.vue";
export default {
    components:{
        navitem
    },
    data() {
        return {
            url_1:"/static/img/p1.png",
            url_2:"/static/img/p2.png",
            // imgs:[2,4,5,6,6]
            imgs:["https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535385248&di=7716fc5c62cbe4cb35c49961fac20e79&src=http://pic9.photophoto.cn/20081128/0033033999061521_b.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535395199954&di=91e1a397937692f7ebaa2719d2858c12&imgtype=0&src=http%3A%2F%2Fpic23.photophoto.cn%2F20120503%2F0034034456597026_b.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535395199954&di=579371f867c3eba33130d24d8be5bff2&imgtype=0&src=http%3A%2F%2Fpic22.photophoto.cn%2F20120225%2F0034034432152602_b.jpg"
            ]
        };
    },
    onLoad() {
        this.getData();
    },
    methods: {
        change(event){
            console.log(event.mp.detail.current)
        },
        async getData() {
            var data = await this.$http.get(
                "http://47.106.115.52:19091/index/getHeader?prefix=cd"
            );
            console.log(data);
        },
        bindViewTap() {
            const url = "../logs/main";
            wx.navigateTo({ url });
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                        }
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
.navbar-top{
    display: flex;
    justify-content: space-between;
    /*box-shadow: 0 5px 10px rgba(0,0,0,.3);*/
}
.navbar-top>div{
    flex: 1;
    text-align: center;
}
.navbar-top>div navigator{
    height: 80rpx;
    line-height: 80rpx;
}
.swiper .slide-image{
    width: 100%;
    height: 100%;
}
.nav-box{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
