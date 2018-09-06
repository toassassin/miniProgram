<template>
  <view>
    <view>
        <view class="navbar-top">
            <view>
                <navigator url="../yuyue/main" class="nav-left">请老师</navigator>
            </view>
            <view>
                <navigator url="../student/main" open-type="switchTab">当老师</navigator>
            </view>
        </view>
    </view>
    <view>
        <p class="location"><i class="icon"></i> 当前城市：<text @tap="bindViewTap('../citylist/main')">{{headData.cityName}}</text></p>
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
        <navigator url="../yuyue/main" hover-class="none" style="width:100%;">
            <img src="/static/img/img-go.png" alt="">
        </navigator>
    </view>
    <view>
        <view class=" weui-cells_after-title">
            <navigator url="../teacher/main" open-type="switchTab" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <view class="weui-cell__bd recommend">热门推荐</view>
                <view class="weui-cell__ft weui-cell__ft_in-access">更多</view>
            </navigator>
        </view>
        <view class="recommend-box">
            <navigator url="../school/main" class="r-left">
                <img src="/static/img/f-school.png" alt="">
            </navigator>
            <view class="r-right">
                <view style="margin-bottom:18rpx;">
                    <navigator url="../student/main" open-type="switchTab" style="width:100%">
                        <img src="/static/img/f-student.png" alt="">
                    </navigator>
                </view>
                <view>
                    <navigator url="../yuyue/main" style="width:100%">
                        <img src="/static/img/f-teacher.png" alt="">
                    </navigator>
                </view>
            </view>
        </view>
    </view>
    <view>
        <view class="list-title">
            <view :class="{active:currentData==0}"  data-current = "0" @tap='checkCurrent($event)'>热门老师</view>
            <view :class="{active:currentData==1}" data-current = "1" @tap='checkCurrent($event)'>最新订单</view>
        </view>
        <swiper :current="currentData" class="swiper-list" :style="{height:currentData==0?list_item_height+'px':list_item_height_r+'px'}" duration="300" @change="changerlist($event)">
            <swiper-item>
                <scroll-view scroll-y :style="{height:list_item_height>0?list_item_height+'px':auto}">
                    <view v-for="(item,index) in hotTeacher" :key="index">
                        <listTeacher :data="item"></listTeacher>
                    </view>
                </scroll-view>
            </swiper-item>
            <swiper-item>
                <scroll-view scroll-y style="background-color:#eee;" :style="{height:list_item_height_r>0?list_item_height_r+'px':auto}">
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
import { mapMutations } from "vuex";
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
            flag: true,
            prefix: "",
            scrollTop: 0,
            top: 0,
            menuFixed: false,
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
                "/static/img/banner1.png",
                "/static/img/banner2.png",
                "/static/img/banner3.png"
            ]
        };
    },
    onLoad() {
        this.prefix = this.$store.state.prefix;
        this.getData();
    },
    onShow() {
        if (this.$store.state.refresh == 1) {
            this.list_item_height = 0;
            this.list_item_height_r = 0;
            this.prefix = this.$store.state.prefix;
            this.getData();
        }
    },
    onReady() {},
    onReachBottom() {
        var that = this;
        if (this.list_item_height == 0 && this.flag) {
            this.flag = false;
            this.$http
                .get("/index/getTeacher", {
                    prefix: this.prefix
                })
                .then(res => {
                    that.hotTeacher = res.data.data;
                });
        }
    },
    methods: {
        ...mapMutations({
            refresh: "SET_REFRESH_FLAG"
        }),
        getHeightLeft() {
            var that = this;
            wx
                .createSelectorQuery()
                .selectAll(".list-item")
                .boundingClientRect(function(rects) {
                    rects.forEach(function(rect) {
                        that.list_item_height += rect.height;
                    });
                    console.log(that.list_item_height);
                })
                .exec();
        },
        getHeightRight() {
            var that = this;
            wx
                .createSelectorQuery()
                .selectAll(".list-item-r")
                .boundingClientRect(function(rects) {
                    rects.forEach(function(rect) {
                        that.list_item_height_r += rect.height;
                    });
                    that.list_item_height_r+=100;
                })
                .exec();
        },
        getTop() {
            var that = this;
            wx
                .createSelectorQuery()
                .select(".list-title")
                .boundingClientRect(function(rect) {
                    that.top = rect.top;
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
        change(event) {},
        async getData() {
            var that = this;
            // 热门老师
            var hotTeacher = await this.$http.get("/index/getTeacher", {
                prefix: this.prefix
            });
            this.hotTeacher = hotTeacher.data.data;
            // 最新订单
            var newOrder = await this.$http.post(
                "/latestOrder/getLatestOrder",
                { prefix: this.prefix }
            );
            this.newOrder = newOrder.data.data;
            // 头部信息
            var headData = await this.$http.get("/index/getHeader", {
                prefix: this.prefix
            });
            this.headData = headData.data.data;
            this.$nextTick(() => {
                that.getHeightLeft();
                that.getHeightRight();
                that.getTop();
                that.refresh(0);
                // wx.hideLoading();
            });
        },
        bindViewTap(url) {
            wx.navigateTo({ url: url });
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
    margin: 0 24rpx;
    box-shadow: 0 0 50rpx #D3D3D3;
}
.swiper{

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
    margin: 34rpx 0 50rpx;
    padding: 0 24rpx;
}
.go image {
    float: left;
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
    float: left;
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
    padding-bottom: 16rpx;
}
.list-title.fixed {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 5;
}
.list-title.show {
    display: flex;
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
