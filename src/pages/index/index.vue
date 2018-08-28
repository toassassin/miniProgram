<template>
  <div>
    <view>
        <view class="navbar-top">
            <view>
                <navigator url="../logs/main" class="nav-left">请老师</navigator>
            </view>
            <view>
                <navigator url="../counter/main">当老师</navigator>
            </view>
        </view>
    </view>
    <view>
        <p class="location"><i class="icon"></i> 当前城市：<text>广州</text></p>
    </view>
    <view>
        <view class="swiper-box">
            <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" @change="change($event)">
                <block v-for="(item,index) in imgs" :key="index">
                    <swiper-item>
                        <image :src="item" class="slide-image" mode="scaleToFill" width="100%" height="100%" />
                    </swiper-item>
                </block>
            </swiper>
        </view>
    </view>
    <view class="nav-box">
        <view class="page__bd">
            <view class="weui-grids">
                <block>
                    <navitem :url="url_1" :text="11"></navitem>
                </block>
                <block>
                    <navitem :url="url_1" :text="11"></navitem>
                </block>
                <block>
                    <navitem :url="url_1" :text="11"></navitem>
                </block>
                <block>
                    <navitem :url="url_1" :text="11"></navitem>
                </block>
                <block>
                    <navitem :url="url_1" :text="22"></navitem>
                </block>
                <block>
                    <navitem :url="url_1" :text="33"></navitem>
                </block>
            </view>
        </view>
    </view>
    <view class="go">
        <img src="../../../static/img/img-go.png" alt="">
    </view>
    <view>
        <view class=" weui-cells_after-title">
            <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <view class="weui-cell__bd recommend">热门推荐</view>
                <view class="weui-cell__ft weui-cell__ft_in-access">更多</view>
            </navigator>
        </view>
        <view class="recommend-box">
            <view class="r-left">
                <img src="../../../static/img/img-f-school.png" alt="">
            </view>
            <view class="r-right">
                <view>
                    <img src="../../../static/img/img-f-school.png" alt="">
                </view>
                <view>
                    <img src="../../../static/img/img-f-school.png" alt="">
                </view>
            </view>
        </view>
    </view>
    <view>
        <view class="list-title">
            <view :class="{active:currentData==0}"  data-current = "0" @tap='checkCurrent($event)'>热门老师</view>
            <view :class="{active:currentData==1}" data-current = "1" @tap='checkCurrent($event)'>最新订单</view>
        </view>
        <swiper :current="currentData" class="swiper-list" duration="300" @change="changerlist($event)">
            <swiper-item style="height:357px;">
                <listTeacher></listTeacher>
                <listTeacher></listTeacher>
                <listTeacher></listTeacher>
                </swiper-item>
            <swiper-item><listTeacher></listTeacher></swiper-item>
        </swiper>
    </view>
  </div>
</template>

<script>
import navitem from "../../common/iconitem.vue";
import listTeacher from "../../common/list-teacher.vue";
export default {
    components: {
        navitem,
        listTeacher
    },
    data() {
        return {
            currentData: 0,
            url_1: "/static/img/p1.png",
            url_2: "/static/img/p2.png",
            // imgs:[2,4,5,6,6]
            imgs: [
                "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535385248&di=7716fc5c62cbe4cb35c49961fac20e79&src=http://pic9.photophoto.cn/20081128/0033033999061521_b.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535395199954&di=91e1a397937692f7ebaa2719d2858c12&imgtype=0&src=http%3A%2F%2Fpic23.photophoto.cn%2F20120503%2F0034034456597026_b.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535395199954&di=579371f867c3eba33130d24d8be5bff2&imgtype=0&src=http%3A%2F%2Fpic22.photophoto.cn%2F20120225%2F0034034432152602_b.jpg"
            ]
        };
    },
    onLoad() {
        this.getData();
    },
    methods: {
        checkCurrent(event) {
            // event.mp == event
            // console.log(event.target.dataset.current);
            if (this.currentData == event.target.dataset.current) {
                return false;
            } else {
                this.currentData = event.target.dataset.current;
            }
        },
        changerlist(event) {
            this.currentData = event.mp.detail.current;
        },
        change(event) {
            // console.log(event.mp.detail.current);
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
.navbar-top {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 8rpx 12rpx #f3f3f3;
    margin-bottom: 25rpx;
}
.navbar-top view {
    flex: 1;
    text-align: center;
}
.navbar-top view navigator {
    position: relative;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #404040;
}
.navbar-top view navigator.nav-left:after {
    position: absolute;
    display: block;
    content: "";
    width: 2px;
    height: 30rpx;
    right: 0;
    top: 25rpx;
    background-color: #ffc851;
}
.location {
    margin-bottom: 25rpx;
    text-align: center;
    font-size: 28rpx;
}
.location .icon {
    display: inline-block;
    width: 26rpx;
    height: 36rpx;
    background: url("../../../static/img/img-location.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
}
.location text {
    color: #83ccff;
}
.swiper-box {
    padding: 0 24rpx;
}
.swiper .slide-image {
    width: 100%;
    height: 100%;
    border-radius: 8rpx;
}
.nav-box {
    margin-top: 54rpx;
}
.weui-grids {
    padding: 10rpx 15rpx;
    border: 0;
}
.go {
    display: flex;
    justify-content: center;
    margin: 44rpx 0 70rpx;
    padding: 0 24rpx;
}
.go image {
    width: 100%;
    height: 100rpx;
    border-radius: 50rpx;
}
.weui-cell {
    font-size: 32rpx;
    color: #767676;
}
.recommend-box {
    margin: 24rpx 0 80rpx;
    padding: 0 24rpx;
    display: flex;
    justify-content: space-between;
}
.recommend-box .r-left {
    width: 372rpx;
    height: 258rpx;
}
.recommend-box .r-right {
    width: 312rpx;
    height: 258rpx;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}
.recommend-box image {
    width: 100%;
    border-radius: 8rpx;
}
.recommend-box .r-left image {
    height: 100%;
}
.recommend-box .r-right image {
    height: 120rpx;
}
.list-title {
    display: flex;
    justify-content: center;
    margin-bottom: 34rpx;
}
.list-title view {
    position: relative;
    margin: 0 36rpx;
    font-size: 32rpx;
    color: #767676;
}
.list-title view.active {
    color: #404040;
    font-weight: bold;
}
.list-title view.active:after {
    display: block;
    position: absolute;
    content: "";
    bottom: -16rpx;
    left: 0;
    width: 100%;
    height: 4rpx;
    background-color: #ffc851;
}
.swiper-list {
    height: 375px;
}
</style>
