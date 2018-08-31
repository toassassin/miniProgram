<template>
  <view>
    <view>
        <view class="navbar-top">
            <view>
                <navigator url="../teacher/main" open-type="switchTab" class="nav-left">请老师</navigator>
            </view>
            <view>
                <navigator url="../counter/main" open-type="switchTab">当老师</navigator>
            </view>
        </view>
    </view>
    <view>
        <p class="location"><i class="icon"></i> 当前城市：<text>{{headData.cityName}}</text></p>
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
                <block v-for="(item,index) in navborArr" :key="index">
                    <navitem :url="item.url" :text="item.text"></navitem>
                </block>
            </view>
        </view>
    </view>
    <view class="go">
        <img src="/static/img/img-go.png" alt="">
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
                <img src="/static/img/img-f-school.png" alt="">
            </view>
            <view class="r-right">
                <view>
                    <img src="/static/img/img-f-school.png" alt="">
                </view>
                <view>
                    <img src="/static/img/img-f-school.png" alt="">
                </view>
            </view>
        </view>
    </view>
    <view>
        <view class="list-title" id="test">
            <view :class="{active:currentData==0}"  data-current = "0" @tap='checkCurrent($event)'>热门老师</view>
            <view :class="{active:currentData==1}" data-current = "1" @tap='checkCurrent($event)'>最新订单</view>
        </view>
        <swiper :current="currentData" class="swiper-list" :style="{height:list_item_height>0?list_item_height+'px':auto}" duration="300" @change="changerlist($event)">
            <swiper-item>
                <scroll-view scroll-y :style="{height:list_item_height>0?list_item_height+'px':auto}">
                    <view v-for="(item,index) in hotTeacher" :key="index">
                        <listTeacher :data="item"></listTeacher>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item>
                <scroll-view scroll-y style="background-color: #eee;" :style="{height:list_item_height_r>0?list_item_height_r+'px':auto}">
                    <view v-for="(item,index) in newOrder" :key="index">
                        <listOrder :data="item"></listOrder>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
  </view>
</template>

<script>
import navitem from "../../common/iconitem.vue";
import listTeacher from "../../common/list-teacher.vue";
import listOrder from "../../common/list-order.vue";
export default {
    components: {
        navitem,
        listTeacher,
        listOrder
    },
    data() {
        return {
            list_item_height: 0,
            list_item_height_r: 0,
            headData: {},
            hotTeacher: {},
            newOrder: {},
            currentData: 0,
            navborArr: [
                { url: "/static/img/img-yw.png", text: "语文" },
                { url: "/static/img/img-sx.png", text: "数学" },
                { url: "/static/img/img-yy.png", text: "英语" },
                { url: "/static/img/img-wl.png", text: "物理" },
                { url: "/static/img/img-hx.png", text: "化学" },
                { url: "/static/img/img-more.png", text: "更多" }
            ],
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
    onReady() {},
    mounted() {},
    methods: {
        getHeightLeft() {
            var that = this;
            console.log(wx.canIUse("createSelectorQuery"));
            wx
                .createSelectorQuery()
                .selectAll(".list-item")
                .boundingClientRect(function(rects) {
                    // console.log("left=" + rects);
                    rects.forEach(function(rect) {
                        // console.log("height1=" + rect.height);
                        that.list_item_height += rect.height;
                    });
                    // console.log("left=" + that.list_item_height);
                })
                .exec();
        },
        getHeightRight() {
            var that = this;
            wx
                .createSelectorQuery()
                .selectAll(".list-item-r")
                .boundingClientRect(function(rects) {
                    // console.log("right=" + rects);
                    rects.forEach(function(rect) {
                        // console.log("height2=" + rect.height);
                        that.list_item_height_r += rect.height;
                    });
                    // console.log("right=" + that.list_item_height_r);
                })
                .exec();
        },
        checkCurrent(event) {
            // event.mp == event
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
            var that = this;
            // 头部信息
            var headData = await this.$http.get("/index/getHeader", {
                prefix: "cd"
            });
            this.headData = headData.data.data;
            // 热门老师
            var hotTeacher = await this.$http.get("/index/getTeacher", {
                prefix: "cd"
            });
            this.hotTeacher = hotTeacher.data.data;
            // 最新订单
            var newOrder = await this.$http.post(
                "/latestOrder/getLatestOrder",
                { prefix: "cd" }
            );
            this.newOrder = newOrder.data.data;
            this.$nextTick(() => {
                that.getHeightLeft();
                that.getHeightRight();
            });
        },
        bindViewTap() {
            const url = "../logs/main";
            wx.navigateTo({ url });
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: res => {
                    console.log(res);
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
</style>
